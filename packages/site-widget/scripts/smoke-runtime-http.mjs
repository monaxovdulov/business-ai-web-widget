import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { createServer } from "node:http";
import {
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  stat,
  writeFile
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

import { assertSafeArchivePath, parseAndValidateZip } from "./build-runtime-release.mjs";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(scriptDirectory, "..");
const artifactsDirectory = join(packageRoot, "release-artifacts");
const stubApiOrigin = "https://api.staging.granit.example";
const widgetInstanceId = "runtime-http-smoke";

function sha256(data) {
  return createHash("sha256").update(data).digest("hex");
}

async function readPackageMetadata() {
  const packageJson = JSON.parse(await readFile(join(packageRoot, "package.json"), "utf8"));
  assert.equal(typeof packageJson.name, "string", "package.json name is required");
  assert.ok(packageJson.name.length > 0, "package.json name is required");
  assert.equal(typeof packageJson.version, "string", "package.json version is required");
  assert.match(packageJson.version, /^[0-9A-Za-z][0-9A-Za-z.+-]*$/);
  return { name: packageJson.name, version: packageJson.version };
}

async function assertRegularFile(filePath) {
  let fileStats;
  try {
    fileStats = await stat(filePath);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(`Runtime release artifact is missing: ${filePath}`, { cause: error });
    }
    throw error;
  }
  assert.ok(fileStats.isFile(), `Expected a regular file: ${filePath}`);
}

async function extractRuntimeZip(zipPath, extractionRoot, expectedNames) {
  const zipBuffer = await readFile(zipPath);
  const entries = parseAndValidateZip(zipBuffer, expectedNames);

  for (const entry of entries) {
    const targetPath = assertSafeArchivePath(extractionRoot, entry.name);
    await mkdir(dirname(targetPath), { recursive: true });
    await writeFile(targetPath, entry.data, { flag: "wx" });
  }

  return zipBuffer;
}

async function assertExactExtractedTree(extractionRoot, versionDirectory) {
  const rootEntries = await readdir(extractionRoot, { withFileTypes: true });
  assert.equal(rootEntries.length, 1, "Runtime ZIP must extract to exactly one top-level directory");
  assert.equal(rootEntries[0].name, versionDirectory);
  assert.ok(rootEntries[0].isDirectory(), "Runtime ZIP top-level entry must be a directory");

  const runtimeEntries = await readdir(join(extractionRoot, versionDirectory), {
    withFileTypes: true
  });
  runtimeEntries.sort((left, right) => left.name.localeCompare(right.name, "en"));
  assert.deepEqual(
    runtimeEntries.map(({ name }) => name),
    ["loader.js", "manifest.json", "site-widget.esm.js"]
  );
  assert.ok(runtimeEntries.every((entry) => entry.isFile()), "Runtime entries must be regular files");
}

function createSmokePage(versionDirectory) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Granit site widget runtime HTTP smoke</title>
    <script
      defer
      src="/${versionDirectory}/loader.js"
      data-granit-site-widget-loader
      data-widget-instance-id="${widgetInstanceId}"
      data-api-base-url="${stubApiOrigin}"
      data-open="true"
    ></script>
  </head>
  <body>
    <main><h1>Runtime HTTP smoke</h1></main>
  </body>
</html>
`;
}

function createRuntimeServer(extractionRoot, versionDirectory, serverErrors) {
  const routes = new Map([
    [
      `/${versionDirectory}/loader.js`,
      {
        filePath: join(extractionRoot, versionDirectory, "loader.js"),
        contentType: "application/javascript; charset=utf-8"
      }
    ],
    [
      `/${versionDirectory}/site-widget.esm.js`,
      {
        filePath: join(extractionRoot, versionDirectory, "site-widget.esm.js"),
        contentType: "application/javascript; charset=utf-8"
      }
    ],
    [
      `/${versionDirectory}/manifest.json`,
      {
        filePath: join(extractionRoot, versionDirectory, "manifest.json"),
        contentType: "application/json; charset=utf-8"
      }
    ]
  ]);
  const smokePage = Buffer.from(createSmokePage(versionDirectory), "utf8");

  return createServer((request, response) => {
    void (async () => {
      if (request.method !== "GET") {
        response.writeHead(405, { "content-type": "text/plain; charset=utf-8" });
        response.end("Method not allowed\n");
        return;
      }

      const requestUrl = new URL(request.url ?? "/", "http://127.0.0.1");
      if (requestUrl.pathname === "/") {
        response.writeHead(200, {
          "cache-control": "no-store",
          "content-length": smokePage.length,
          "content-type": "text/html; charset=utf-8"
        });
        response.end(smokePage);
        return;
      }

      const route = routes.get(requestUrl.pathname);
      if (!route) {
        response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
        response.end("Not found\n");
        return;
      }

      const body = await readFile(route.filePath);
      response.writeHead(200, {
        "cache-control": "no-store",
        "content-length": body.length,
        "content-type": route.contentType
      });
      response.end(body);
    })().catch((error) => {
      serverErrors.push(error);
      if (!response.headersSent) {
        response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
      }
      response.end("Internal server error\n");
    });
  });
}

async function listenOnEphemeralPort(server) {
  await new Promise((resolvePromise, rejectPromise) => {
    const onError = (error) => rejectPromise(error);
    server.once("error", onError);
    server.listen(0, "127.0.0.1", () => {
      server.off("error", onError);
      resolvePromise();
    });
  });

  const address = server.address();
  assert.ok(address && typeof address === "object", "HTTP server did not expose an address");
  return `http://127.0.0.1:${address.port}`;
}

async function closeServer(server) {
  if (!server?.listening) return;
  await new Promise((resolvePromise, rejectPromise) => {
    server.close((error) => (error ? rejectPromise(error) : resolvePromise()));
  });
}

async function runBrowserSmoke({ origin, versionDirectory, expectedManifest }) {
  const runtimePaths = [
    `/${versionDirectory}/loader.js`,
    `/${versionDirectory}/site-widget.esm.js`
  ];
  const runtimeResponses = new Map();
  const browserErrors = [];
  const unexpectedNetworkRequests = [];
  const interceptedApiRequests = [];

  let browser;
  let context;
  let page;
  let result;
  let failure;
  const cleanupErrors = [];

  try {
    browser = await chromium.launch({ headless: true });
    context = await browser.newContext();
    page = await context.newPage();

    await page.route(`${stubApiOrigin}/**`, async (route) => {
      interceptedApiRequests.push(route.request().url());
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        headers: {
          "access-control-allow-headers": "content-type",
          "access-control-allow-methods": "GET, POST, OPTIONS",
          "access-control-allow-origin": origin
        },
        body: JSON.stringify({
          public_session_id: "sws_runtime_http_smoke",
          automation: { status: "fallback" }
        })
      });
    });

    page.on("console", (message) => {
      if (message.type() === "error") browserErrors.push(`console: ${message.text()}`);
    });
    page.on("pageerror", (error) => browserErrors.push(`pageerror: ${error.message}`));
    page.on("requestfailed", (request) => {
      browserErrors.push(
        `requestfailed: ${request.url()} (${request.failure()?.errorText ?? "unknown failure"})`
      );
    });
    page.on("request", (request) => {
      const requestOrigin = new URL(request.url()).origin;
      if (requestOrigin !== origin && requestOrigin !== stubApiOrigin) {
        unexpectedNetworkRequests.push(request.url());
      }
    });
    page.on("response", (response) => {
      const responseUrl = new URL(response.url());
      if (responseUrl.origin === origin && runtimePaths.includes(responseUrl.pathname)) {
        runtimeResponses.set(responseUrl.pathname, {
          status: response.status(),
          contentType: response.headers()["content-type"] ?? ""
        });
      }
    });

    await page.goto(`${origin}/`, { waitUntil: "networkidle" });
    assert.equal(new URL(page.url()).protocol, "http:", "Runtime smoke must use http://, not file://");

    const widgets = page.locator("granit-site-widget");
    await widgets.first().waitFor({ state: "attached", timeout: 10_000 });
    await page.waitForTimeout(100);
    assert.equal(await widgets.count(), 1, "Loader must mount exactly one granit-site-widget");

    const widgetState = await widgets.first().evaluate((widget) => ({
      apiBaseUrl: widget.getAttribute("api-base-url"),
      instanceId: widget.getAttribute("widget-instance-id"),
      hasShadowRoot: Boolean(widget.shadowRoot)
    }));
    assert.equal(widgetState.apiBaseUrl, stubApiOrigin);
    assert.equal(widgetState.instanceId, widgetInstanceId);
    assert.equal(widgetState.hasShadowRoot, true, "Mounted widget must render its shadow root");

    const manifestResponse = await page.evaluate(async (manifestPath) => {
      const response = await fetch(manifestPath);
      return {
        status: response.status,
        contentType: response.headers.get("content-type") ?? "",
        body: await response.json()
      };
    }, `/${versionDirectory}/manifest.json`);
    assert.equal(manifestResponse.status, 200, "manifest.json must return HTTP 200");
    assert.match(
      manifestResponse.contentType,
      /^application\/json(?:\s*;|$)/i,
      "manifest.json must use an application/json MIME type"
    );
    assert.deepEqual(manifestResponse.body, expectedManifest, "HTTP manifest differs from ZIP manifest");

    const stubApiResponse = await page.evaluate(async (apiOrigin) => {
      const response = await fetch(`${apiOrigin}/runtime-http-smoke`, {
        headers: { accept: "application/json" }
      });
      return { status: response.status, body: await response.json() };
    }, stubApiOrigin);
    assert.equal(stubApiResponse.status, 200, "Stub API route must return HTTP 200");
    assert.equal(interceptedApiRequests.length, 1, "Stub API request must be intercepted exactly once");

    for (const runtimePath of runtimePaths) {
      const response = runtimeResponses.get(runtimePath);
      assert.ok(response, `Browser did not receive ${runtimePath}`);
      assert.equal(response.status, 200, `${runtimePath} must return HTTP 200`);
      assert.match(
        response.contentType,
        /^application\/javascript(?:\s*;|$)/i,
        `${runtimePath} must use a JavaScript MIME type`
      );
    }

    assert.deepEqual(unexpectedNetworkRequests, [], "Runtime smoke attempted unexpected network access");
    assert.deepEqual(browserErrors, [], "Runtime smoke emitted browser errors");

    result = { runtimeResponses, manifestResponse, interceptedApiRequests };
  } catch (error) {
    failure = error;
  } finally {
    for (const [label, close] of [
      ["page", () => page?.close()],
      ["browser context", () => context?.close()],
      ["browser", () => browser?.close()]
    ]) {
      try {
        await close();
      } catch (error) {
        cleanupErrors.push(new Error(`Cannot close Playwright ${label}: ${error.message}`, { cause: error }));
      }
    }
  }

  if (failure && cleanupErrors.length > 0) {
    throw new AggregateError([failure, ...cleanupErrors], "Runtime browser smoke and cleanup failed");
  }
  if (failure) throw failure;
  if (cleanupErrors.length > 0) {
    throw new AggregateError(cleanupErrors, "Runtime browser smoke cleanup failed");
  }
  return result;
}

async function main() {
  const packageMetadata = await readPackageMetadata();
  const versionDirectory = `v${packageMetadata.version}`;
  const zipName = `granit-site-widget-v${packageMetadata.version}.zip`;
  const zipPath = join(artifactsDirectory, zipName);
  const checksumPath = `${zipPath}.sha256`;
  const expectedNames = [
    `${versionDirectory}/loader.js`,
    `${versionDirectory}/manifest.json`,
    `${versionDirectory}/site-widget.esm.js`
  ];

  await assertRegularFile(zipPath);
  await assertRegularFile(checksumPath);

  const extractionRoot = await mkdtemp(join(tmpdir(), "granit-site-widget-http-smoke-"));
  let server;
  let smokeResult;
  let manifest;
  let origin;
  let failure;
  const cleanupErrors = [];
  const serverErrors = [];

  try {
    const zipBuffer = await extractRuntimeZip(zipPath, extractionRoot, expectedNames);
    const checksum = await readFile(checksumPath, "utf8");
    assert.equal(checksum, `${sha256(zipBuffer)}  ${zipName}\n`, "ZIP checksum does not match");
    await assertExactExtractedTree(extractionRoot, versionDirectory);

    manifest = JSON.parse(
      await readFile(join(extractionRoot, versionDirectory, "manifest.json"), "utf8")
    );
    assert.equal(manifest.packageName, packageMetadata.name);
    assert.equal(manifest.version, packageMetadata.version);
    assert.match(manifest.gitCommit, /^[0-9a-f]{40}([0-9a-f]{24})?$/);

    server = createRuntimeServer(extractionRoot, versionDirectory, serverErrors);
    origin = await listenOnEphemeralPort(server);
    smokeResult = await runBrowserSmoke({
      origin,
      versionDirectory,
      expectedManifest: manifest
    });
    assert.deepEqual(serverErrors, [], "Runtime HTTP server emitted errors");
  } catch (error) {
    failure = error;
  } finally {
    if (server) {
      try {
        await closeServer(server);
      } catch (error) {
        cleanupErrors.push(new Error(`Cannot close runtime HTTP server: ${error.message}`, { cause: error }));
      }
    }
    try {
      await rm(extractionRoot, { recursive: true, force: true });
    } catch (error) {
      cleanupErrors.push(new Error(`Cannot remove runtime smoke temp directory: ${error.message}`, { cause: error }));
    }
  }

  if (failure) throw failure;
  if (cleanupErrors.length > 0) throw new AggregateError(cleanupErrors, "Runtime smoke cleanup failed");

  const responseSummary = [...smokeResult.runtimeResponses]
    .map(([path, response]) => `${path}=${response.status} ${response.contentType}`)
    .join(", ");
  process.stdout.write(
    [
      `Runtime HTTP smoke passed at ${origin}/`,
      `Artifact ${zipPath}`,
      `Manifest gitCommit=${manifest.gitCommit}${manifest.dirtyRuntime ? " dirtyRuntime=true (NOT RC)" : ""}`,
      `Responses ${responseSummary}`,
      `Manifest response=${smokeResult.manifestResponse.status} ${smokeResult.manifestResponse.contentType}`,
      `Stub API ${stubApiOrigin} interceptedRequests=${smokeResult.interceptedApiRequests.length}`,
      "Mounted exactly one granit-site-widget with no console or page errors"
    ].join("\n") + "\n"
  );
}

await main();
