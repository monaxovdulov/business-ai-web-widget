import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { lstat, mkdir, mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(scriptDirectory, "..");
const defaultReportPath = resolve(packageRoot, "release-artifacts", "package-composition.json");

function findNpmInvocation() {
  if (process.platform !== "win32") return { command: "npm", prefixArguments: [] };

  const candidates = [
    process.env.npm_execpath,
    resolve(dirname(process.execPath), "node_modules", "npm", "bin", "npm-cli.js"),
    resolve(dirname(process.execPath), "..", "lib", "node_modules", "npm", "bin", "npm-cli.js")
  ].filter(Boolean);
  const npmCliPath = candidates.find((candidate) => existsSync(candidate));
  assert(npmCliPath, "Cannot locate npm-cli.js next to the active Node.js installation");
  return { command: process.execPath, prefixArguments: [npmCliPath] };
}

const npmInvocation = findNpmInvocation();

const requiredExports = [
  { key: ".", specifierSuffix: "", execute: true },
  { key: "./site-widget.esm", specifierSuffix: "/site-widget.esm", execute: true },
  { key: "./iife", specifierSuffix: "/iife", execute: false },
  { key: "./loader", specifierSuffix: "/loader", execute: false },
  { key: "./tokens", specifierSuffix: "/tokens", execute: false }
];

const secretSignatures = [
  { id: "private-key", pattern: /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/ },
  { id: "github-token", pattern: /\bgh[pousr]_[A-Za-z0-9]{30,}\b/ },
  { id: "github-fine-grained-token", pattern: /\bgithub_pat_[A-Za-z0-9_]{40,}\b/ },
  { id: "npm-token", pattern: /\bnpm_[A-Za-z0-9]{30,}\b/ },
  { id: "npm-auth-token", pattern: /(?:^|\n)\s*(?:_authToken|npmAuthToken)\s*=\s*(?!\$\{)[^\s#]+/i },
  { id: "aws-access-key", pattern: /\bAKIA[0-9A-Z]{16}\b/ },
  { id: "google-api-key", pattern: /\bAIza[0-9A-Za-z_-]{30,}\b/ }
];

function fail(message) {
  throw new Error(message);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function parseArguments(argv) {
  let reportPath = defaultReportPath;

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];

    if (argument === "--no-report") {
      reportPath = null;
      continue;
    }

    if (argument === "--report") {
      const value = argv[index + 1];
      assert(value && !value.startsWith("--"), "--report requires a path");
      reportPath = isAbsolute(value) ? value : resolve(packageRoot, value);
      index += 1;
      continue;
    }

    if (argument?.startsWith("--report=")) {
      const value = argument.slice("--report=".length);
      assert(value, "--report requires a path");
      reportPath = isAbsolute(value) ? value : resolve(packageRoot, value);
      continue;
    }

    if (argument === "--help" || argument === "-h") {
      return { help: true, reportPath };
    }

    fail(`Unknown argument: ${argument}`);
  }

  return { help: false, reportPath };
}

function printHelp() {
  process.stdout.write(
    [
      "Usage: node scripts/verify-package.mjs [--report <path> | --no-report]",
      "",
      "Validates the already-built npm package and smoke-installs its tarball.",
      "Relative report paths are resolved from the package directory.",
      `Default report: ${relative(packageRoot, defaultReportPath).split(sep).join("/")}`,
      ""
    ].join("\n")
  );
}

function commandError(command, args, code, stdout, stderr) {
  const details = [
    `Command failed (${code ?? "no exit code"}): ${command} ${args.join(" ")}`,
    stderr.trim(),
    stdout.trim()
  ].filter(Boolean);
  return new Error(details.join("\n").slice(0, 16_000));
}

function run(command, args, options = {}) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(command, args, {
      cwd: options.cwd ?? packageRoot,
      env: {
        ...process.env,
        npm_config_audit: "false",
        npm_config_fund: "false",
        npm_config_update_notifier: "false",
        ...options.env
      },
      shell: false,
      windowsHide: true
    });

    let stdout = "";
    let stderr = "";

    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", reject);
    child.on("close", (code, signal) => {
      if (code === 0) {
        resolvePromise({ stdout, stderr });
        return;
      }

      reject(commandError(command, args, signal ? `signal ${signal}` : code, stdout, stderr));
    });
  });
}

function runNpm(args, options = {}) {
  return run(npmInvocation.command, [...npmInvocation.prefixArguments, ...args], options);
}

function parsePackResult(stdout, label) {
  let parsed;
  try {
    parsed = JSON.parse(stdout);
  } catch (error) {
    throw new Error(`${label} did not return valid JSON: ${error.message}`);
  }

  assert(Array.isArray(parsed) && parsed.length === 1, `${label} must describe exactly one package`);
  const result = parsed[0];
  assert(result && typeof result === "object", `${label} returned an invalid package record`);
  assert(typeof result.name === "string" && result.name, `${label} did not report a package name`);
  assert(typeof result.version === "string" && result.version, `${label} did not report a package version`);
  assert(typeof result.filename === "string" && result.filename, `${label} did not report a tarball filename`);
  assert(Number.isSafeInteger(result.size) && result.size > 0, `${label} reported an invalid packed size`);
  assert(
    Number.isSafeInteger(result.unpackedSize) && result.unpackedSize > 0,
    `${label} reported an invalid unpacked size`
  );
  assert(Array.isArray(result.files) && result.files.length > 0, `${label} reported an empty file list`);

  const paths = new Set();
  for (const file of result.files) {
    assert(file && typeof file === "object", `${label} contains an invalid file record`);
    assert(typeof file.path === "string" && file.path, `${label} contains a file without a path`);
    assert(Number.isSafeInteger(file.size) && file.size >= 0, `${label} contains an invalid size for ${file.path}`);
    validateArchivePath(file.path);
    assert(!paths.has(file.path), `${label} contains duplicate path ${file.path}`);
    paths.add(file.path);
  }

  return result;
}

function validateArchivePath(path) {
  assert(!path.includes("\\"), `Archive path must use forward slashes: ${path}`);
  assert(!path.startsWith("/"), `Archive path must be relative: ${path}`);
  const segments = path.split("/");
  assert(segments.every((segment) => segment && segment !== "." && segment !== ".."), `Unsafe archive path: ${path}`);
}

function canonicalPackRecord(result) {
  return {
    name: result.name,
    version: result.version,
    filename: result.filename,
    size: result.size,
    unpackedSize: result.unpackedSize,
    files: result.files.map(({ path, size, mode }) => ({ path, size, mode: mode ?? null }))
  };
}

function assertPackRecordsMatch(dryRun, actual) {
  const dryRecord = JSON.stringify(canonicalPackRecord(dryRun));
  const actualRecord = JSON.stringify(canonicalPackRecord(actual));
  assert(dryRecord === actualRecord, "npm pack --dry-run composition differs from the real tarball composition");
}

function selectExportTarget(value, preferredConditions = ["import", "default", "node", "browser", "types"]) {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    for (const candidate of value) {
      const target = selectExportTarget(candidate, preferredConditions);
      if (target) return target;
    }
    return null;
  }
  if (!value || typeof value !== "object") return null;

  for (const condition of preferredConditions) {
    if (Object.hasOwn(value, condition)) {
      const target = selectExportTarget(value[condition], preferredConditions);
      if (target) return target;
    }
  }

  for (const candidate of Object.values(value)) {
    const target = selectExportTarget(candidate, preferredConditions);
    if (target) return target;
  }
  return null;
}

function getRootExport(exportsField) {
  if (!exportsField || typeof exportsField !== "object" || Array.isArray(exportsField)) return exportsField;
  return Object.hasOwn(exportsField, ".") ? exportsField["."] : exportsField;
}

function resolvePackageTarget(root, target, description) {
  assert(typeof target === "string" && target.startsWith("./"), `${description} must be a relative package target`);
  const resolvedTarget = resolve(root, ...target.slice(2).split("/"));
  const targetRelative = relative(root, resolvedTarget);
  assert(
    targetRelative && targetRelative !== ".." && !targetRelative.startsWith(`..${sep}`) && !isAbsolute(targetRelative),
    `${description} escapes the package directory`
  );
  return resolvedTarget;
}

async function assertFile(path, description) {
  let fileStat;
  try {
    fileStat = await lstat(path);
  } catch (error) {
    if (error?.code === "ENOENT") fail(`${description} is missing: ${path}`);
    throw error;
  }
  assert(fileStat.isFile(), `${description} is not a regular file: ${path}`);
  assert(fileStat.size > 0, `${description} is empty: ${path}`);
  return fileStat;
}

async function readPackageJson(root) {
  const path = resolve(root, "package.json");
  let parsed;
  try {
    parsed = JSON.parse(await readFile(path, "utf8"));
  } catch (error) {
    throw new Error(`Cannot read ${path}: ${error.message}`);
  }
  assert(parsed && typeof parsed === "object", `Invalid package.json in ${root}`);
  return parsed;
}

async function assertBuiltDist(packageJson) {
  const distPath = resolve(packageRoot, "dist");
  let distStat;
  try {
    distStat = await stat(distPath);
  } catch (error) {
    if (error?.code === "ENOENT") fail(`Built dist is required; run npm run build before this check: ${distPath}`);
    throw error;
  }
  assert(distStat.isDirectory(), `Built dist is not a directory: ${distPath}`);

  const exportsField = packageJson.exports;
  assert(exportsField && typeof exportsField === "object", "package.json must define exports");

  for (const expected of requiredExports) {
    const exportValue = expected.key === "." ? getRootExport(exportsField) : exportsField[expected.key];
    assert(exportValue !== undefined, `package.json is missing export ${expected.key}`);
    const target = selectExportTarget(exportValue);
    const targetPath = resolvePackageTarget(packageRoot, target, `Export ${expected.key}`);
    assert(relative(packageRoot, targetPath).split(sep)[0] === "dist", `Export ${expected.key} must point into dist`);
    await assertFile(targetPath, `Built export ${expected.key}`);
  }

  const typeTarget = packageJson.types ?? selectExportTarget(getRootExport(exportsField), ["types"]);
  assert(typeof typeTarget === "string" && typeTarget.endsWith(".d.ts"), "package root must expose a .d.ts declaration");
  const typePath = resolvePackageTarget(packageRoot, typeTarget, "Root type declaration");
  assert(relative(packageRoot, typePath).split(sep)[0] === "dist", "Root type declaration must be in dist");
  await assertFile(typePath, "Root type declaration");

  return typeTarget;
}

function classifyProhibitedPath(path) {
  const segments = path.split("/");
  const lowerSegments = segments.map((segment) => segment.toLowerCase());
  const basename = lowerSegments.at(-1);

  if (
    lowerSegments.some((segment) =>
      /^(?:tests?|__tests__|fixtures?|__fixtures__|test-artifacts|test-results|playwright-report|coverage)$/.test(segment)
    ) ||
    /(?:^|\.)(?:test|spec)\.[cm]?[jt]sx?$/.test(basename) ||
    /\.snap$/.test(basename) ||
    /^(?:vitest|jest|playwright)\.config\./.test(basename)
  ) {
    return "test-or-fixture";
  }
  if (lowerSegments.some((segment) => /^(?:tmp|temp|\.tmp|\.temp|\.cache|release-artifacts)$/.test(segment))) {
    return "temporary-or-release-artifact";
  }
  if (/\.(?:log|tmp|temp|bak|swp|swo|orig|rej)$/.test(basename) || basename.endsWith("~")) {
    return "temporary-file";
  }
  if (/^(?:\.ds_store|thumbs\.db|desktop\.ini)$/.test(basename)) {
    return "operating-system-artifact";
  }
  if (
    /^(?:\.env(?:\..+)?|\.npmrc|\.yarnrc(?:\.yml)?|credentials?(?:\..+)?|secrets?(?:\..+)?|id_(?:rsa|dsa|ecdsa|ed25519)(?:\..+)?)$/.test(
      basename
    ) || /\.(?:pem|key|p12|pfx|jks|keystore)$/.test(basename)
  ) {
    return "secret-bearing-file";
  }
  return null;
}

async function scanComposition(files) {
  const prohibitedPaths = [];
  const secretFindings = [];

  for (const file of files) {
    const reason = classifyProhibitedPath(file.path);
    if (reason) prohibitedPaths.push({ path: file.path, reason });

    const sourcePath = resolve(packageRoot, ...file.path.split("/"));
    const sourceRelative = relative(packageRoot, sourcePath);
    assert(
      sourceRelative && !sourceRelative.startsWith(`..${sep}`) && !isAbsolute(sourceRelative),
      `Packed file escapes package directory: ${file.path}`
    );
    await assertFile(sourcePath, `Packed source file ${file.path}`);
    const contents = (await readFile(sourcePath)).toString("utf8");
    for (const signature of secretSignatures) {
      if (signature.pattern.test(contents)) secretFindings.push({ path: file.path, signature: signature.id });
    }
  }

  assert(
    prohibitedPaths.length === 0,
    `Prohibited package paths found: ${prohibitedPaths.map(({ path, reason }) => `${path} (${reason})`).join(", ")}`
  );
  assert(
    secretFindings.length === 0,
    `Potential secrets found: ${secretFindings.map(({ path, signature }) => `${path} (${signature})`).join(", ")}`
  );

  return {
    scannedFileCount: files.length,
    prohibitedPaths,
    secretFindings,
    sourceMaps: files.filter((file) => file.path.endsWith(".map")).map((file) => file.path)
  };
}

function packageInstallPath(projectRoot, packageName) {
  const segments = packageName.split("/");
  const validUnscoped = segments.length === 1 && segments[0] && !segments[0].startsWith("@");
  const validScoped = segments.length === 2 && segments[0]?.startsWith("@") && segments[0].length > 1 && segments[1];
  assert(validUnscoped || validScoped, `Unsupported package name: ${packageName}`);
  assert(segments.every((segment) => segment !== "." && segment !== ".."), `Unsafe package name: ${packageName}`);
  return resolve(projectRoot, "node_modules", ...segments);
}

async function validateInstalledExports(installedRoot, packageJson) {
  const exportsField = packageJson.exports;
  assert(exportsField && typeof exportsField === "object", "Installed package has no exports map");
  const result = {};

  for (const expected of requiredExports) {
    const value = expected.key === "." ? getRootExport(exportsField) : exportsField[expected.key];
    assert(value !== undefined, `Installed package is missing export ${expected.key}`);
    const target = selectExportTarget(value);
    const targetPath = resolvePackageTarget(installedRoot, target, `Installed export ${expected.key}`);
    await assertFile(targetPath, `Installed export ${expected.key}`);
    result[expected.key] = target;
  }

  const typeTarget = packageJson.types ?? selectExportTarget(getRootExport(exportsField), ["types"]);
  assert(typeof typeTarget === "string" && typeTarget.endsWith(".d.ts"), "Installed package has no root .d.ts declaration");
  await assertFile(resolvePackageTarget(installedRoot, typeTarget, "Installed root type declaration"), "Installed root type declaration");

  return { exports: result, typeTarget };
}

async function runImportSmoke(projectRoot, packageName) {
  const jsdomEntry = resolve(packageRoot, "node_modules", "jsdom", "lib", "api.js");
  await assertFile(jsdomEntry, "jsdom browser smoke dependency (run npm ci before package verification)");
  const smokePath = resolve(projectRoot, "smoke.mjs");
  const specifiers = requiredExports.map(({ key, specifierSuffix, execute }) => ({
    key,
    specifier: `${packageName}${specifierSuffix}`,
    execute
  }));
  const source = `
import { access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { JSDOM } from ${JSON.stringify(pathToFileURL(jsdomEntry).href)};

const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  pretendToBeVisual: true,
  url: "https://package-smoke.invalid/"
});
for (const name of [
  "window",
  "document",
  "customElements",
  "HTMLElement",
  "Element",
  "Node",
  "Document",
  "ShadowRoot",
  "CSSStyleSheet",
  "CustomEvent",
  "Event",
  "DOMException",
  "navigator",
  "localStorage",
  "requestAnimationFrame",
  "cancelAnimationFrame"
]) {
  const value = name === "window" ? dom.window : dom.window[name];
  Object.defineProperty(globalThis, name, { configurable: true, writable: true, value });
}

const specifiers = ${JSON.stringify(specifiers)};
const resolutions = {};
for (const { key, specifier } of specifiers) {
  const url = import.meta.resolve(specifier);
  if (!url.startsWith("file:")) throw new Error(\`Unexpected resolution for \${specifier}: \${url}\`);
  await access(fileURLToPath(url));
  resolutions[key] = url.slice(url.lastIndexOf("/") + 1);
}

for (const { specifier, execute } of specifiers) {
  if (!execute) continue;
  const namespace = await import(specifier);
  for (const exportName of ["GranitSiteWidgetElement", "SITE_WIDGET_TAG_NAME", "defineSiteWidget", "mountSiteWidget"]) {
    if (!(exportName in namespace)) throw new Error(\`\${specifier} is missing \${exportName}\`);
  }
}

dom.window.close();
process.stdout.write(JSON.stringify({ resolutions, imported: specifiers.filter(({ execute }) => execute).map(({ key }) => key) }));
`;
  await writeFile(smokePath, source.trimStart(), "utf8");
  const { stdout } = await run(process.execPath, [smokePath], { cwd: projectRoot });
  return JSON.parse(stdout);
}

async function runTypeSmoke(projectRoot, packageName) {
  const typescriptBin = resolve(packageRoot, "node_modules", "typescript", "bin", "tsc");
  await assertFile(typescriptBin, "TypeScript compiler (run npm ci before package verification)");

  const sourcePath = resolve(projectRoot, "smoke.ts");
  const source = `
import {
  GranitSiteWidgetElement,
  SITE_WIDGET_TAG_NAME,
  defineSiteWidget,
  mountSiteWidget,
  type MountSiteWidgetOptions
} from ${JSON.stringify(packageName)};

const options: MountSiteWidgetOptions = {};
const elementConstructor: typeof GranitSiteWidgetElement = GranitSiteWidgetElement;
const mount: typeof mountSiteWidget = mountSiteWidget;
defineSiteWidget(SITE_WIDGET_TAG_NAME);
void options;
void elementConstructor;
void mount;
`;
  await writeFile(sourcePath, source.trimStart(), "utf8");
  await run(
    process.execPath,
    [
      typescriptBin,
      "--noEmit",
      "--strict",
      "--target",
      "ES2021",
      "--module",
      "ESNext",
      "--moduleResolution",
      "Bundler",
      "--lib",
      "ES2021,DOM,DOM.Iterable",
      sourcePath
    ],
    { cwd: projectRoot }
  );
}

async function verifyPackage() {
  const sourcePackageJson = await readPackageJson(packageRoot);
  assert(typeof sourcePackageJson.name === "string" && sourcePackageJson.name, "package.json must define a name");
  assert(typeof sourcePackageJson.version === "string" && sourcePackageJson.version, "package.json must define a version");
  await assertBuiltDist(sourcePackageJson);

  const dryRunOutput = await runNpm(["pack", "--dry-run", "--json", "--ignore-scripts"], {
    cwd: packageRoot
  });
  const dryRun = parsePackResult(dryRunOutput.stdout, "npm pack --dry-run");
  assert(dryRun.name === sourcePackageJson.name, "npm pack --dry-run package name differs from package.json");
  assert(dryRun.version === sourcePackageJson.version, "npm pack --dry-run version differs from package.json");
  const compositionScan = await scanComposition(dryRun.files);

  const temporaryRoot = await mkdtemp(join(tmpdir(), "site-widget-package-verify-"));
  let report;
  try {
    const packDirectory = resolve(temporaryRoot, "pack");
    const projectRoot = resolve(temporaryRoot, "consumer");
    await mkdir(packDirectory, { recursive: true });
    await mkdir(projectRoot, { recursive: true });

    const actualOutput = await runNpm(["pack", packageRoot, "--json", "--ignore-scripts"], {
      cwd: packDirectory
    });
    const actual = parsePackResult(actualOutput.stdout, "npm pack");
    assertPackRecordsMatch(dryRun, actual);

    const tarballPath = resolve(packDirectory, actual.filename);
    const tarballRelative = relative(packDirectory, tarballPath);
    assert(
      tarballRelative && !tarballRelative.startsWith(`..${sep}`) && !isAbsolute(tarballRelative),
      "npm pack returned an unsafe tarball filename"
    );
    const tarballStat = await assertFile(tarballPath, "Packed tarball");
    assert(tarballStat.size === actual.size, "Tarball size on disk differs from npm pack metadata");

    await writeFile(
      resolve(projectRoot, "package.json"),
      `${JSON.stringify({ name: "site-widget-package-smoke", version: "0.0.0", private: true, type: "module" }, null, 2)}\n`,
      "utf8"
    );
    await runNpm(
      [
        "install",
        "--ignore-scripts",
        "--no-audit",
        "--no-fund",
        "--package-lock=false",
        "--save-exact",
        tarballPath
      ],
      { cwd: projectRoot }
    );
    await runNpm(["ls", "--omit=dev", "--all", "--json"], { cwd: projectRoot });

    const installedRoot = packageInstallPath(projectRoot, actual.name);
    const installedPackageJson = await readPackageJson(installedRoot);
    assert(installedPackageJson.name === actual.name, "Installed package name differs from packed package");
    assert(installedPackageJson.version === actual.version, "Installed package version differs from packed package");
    const installedValidation = await validateInstalledExports(installedRoot, installedPackageJson);
    const importSmoke = await runImportSmoke(projectRoot, actual.name);
    await runTypeSmoke(projectRoot, actual.name);

    const paths = actual.files.map((file) => file.path);
    const topLevelEntries = [...new Set(paths.map((path) => path.split("/")[0]))].sort();
    const topLevelFiles = paths.filter((path) => !path.includes("/")).sort();
    const topLevelDirectories = topLevelEntries.filter((entry) => !topLevelFiles.includes(entry));

    report = {
      schemaVersion: 1,
      ok: true,
      package: {
        name: actual.name,
        version: actual.version
      },
      composition: {
        filename: actual.filename,
        packedSize: actual.size,
        unpackedSize: actual.unpackedSize,
        shasum: actual.shasum,
        integrity: actual.integrity,
        fileCount: actual.files.length,
        topLevelEntries,
        topLevelFiles,
        topLevelDirectories,
        files: actual.files.map(({ path, size, mode }) => ({ path, size, mode: mode ?? null }))
      },
      validation: {
        builtDistRequired: true,
        dryRunMatchesTarball: true,
        prohibitedPaths: compositionScan.prohibitedPaths,
        secretScan: {
          scannedFileCount: compositionScan.scannedFileCount,
          findings: compositionScan.secretFindings
        },
        sourceMaps: {
          allowedInNpmTarball: true,
          count: compositionScan.sourceMaps.length,
          files: compositionScan.sourceMaps
        },
        tarballInstalledInEmptyProject: true,
        runtimeDependencyTreeValid: true,
        rootEsmImportPassed: true,
        resolvedExports: importSmoke.resolutions,
        importedExports: importSmoke.imported,
        exportTargets: installedValidation.exports,
        typeDeclarations: {
          target: installedValidation.typeTarget,
          typescriptResolutionPassed: true
        },
        temporaryDirectoryRemoved: true,
        tarballRetained: false
      }
    };
  } finally {
    await rm(temporaryRoot, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
  }

  return report;
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }

  const report = await verifyPackage();
  const serialized = `${JSON.stringify(report, null, 2)}\n`;
  if (options.reportPath) {
    await mkdir(dirname(options.reportPath), { recursive: true });
    await writeFile(options.reportPath, serialized, "utf8");
  }
  process.stdout.write(serialized);
}

main().catch((error) => {
  process.stderr.write(
    `${JSON.stringify(
      {
        schemaVersion: 1,
        ok: false,
        error: {
          message: error instanceof Error ? error.message : String(error)
        }
      },
      null,
      2
    )}\n`
  );
  process.exitCode = 1;
});
