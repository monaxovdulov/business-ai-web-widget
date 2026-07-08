import { createReadStream, existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const port = Number(process.env.PORT || process.argv.find((arg) => arg.startsWith("--port="))?.slice(7) || 4173);
const host = process.env.HOST || "127.0.0.1";

const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".png": "image/png"
};

const server = createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${host}:${port}`);
  const pathname = decodeURIComponent(url.pathname);

  if (pathname === "/") {
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.end(await readLocalIndex());
    return;
  }

  const filePath = resolvePath(pathname);
  if (!filePath || !existsSync(filePath)) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  response.writeHead(200, { "Content-Type": mime[extname(filePath)] || "application/octet-stream" });
  createReadStream(filePath).pipe(response);
});

server.listen(port, host, () => {
  console.log(`@granit/site-widget local server: http://${host}:${port}/`);
});

function resolvePath(pathname) {
  const localPath = pathname.startsWith("/site-widget/v1/")
    ? join(root, "dist", pathname.slice("/site-widget/v1/".length))
    : join(root, pathname);
  const normalized = normalize(localPath);
  return normalized.startsWith(root) ? normalized : undefined;
}

async function readLocalIndex() {
  const readme = await readFile(join(root, "README.md"), "utf8");
  const firstParagraph = readme.split("\n\n").slice(0, 2).join("\n");

  return `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>@granit/site-widget local smoke</title>
    <style>
      body {
        margin: 0;
        min-height: 100vh;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: linear-gradient(180deg, #f7f3ef, #fff);
        color: #2f2d2a;
      }
      main {
        max-width: 860px;
        padding: 72px 40px;
      }
      a {
        color: #7c6047;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>@granit/site-widget</h1>
      <p>${escapeHtml(firstParagraph)}</p>
      <p><a href="/examples/plain-html.html">Plain HTML canonical example</a></p>
    </main>
    <script
      async
      src="/site-widget/v1/loader.js"
      data-granit-site-widget-loader
      data-mock="true"
      data-widget-instance-id="local-smoke">
    </script>
  </body>
</html>`;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
