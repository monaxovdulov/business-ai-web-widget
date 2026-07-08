import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const dist = resolve(root, "dist");

await mkdir(dist, { recursive: true });
await copyFile(resolve(root, "design-tokens.json"), resolve(dist, "design-tokens.json"));

const indexTypes = await readFile(resolve(dist, "types/index.d.ts"), "utf8");
const publicTypes = indexTypes
  .replaceAll("./components/", "./types/components/")
  .replaceAll("./types/public", "./types/types/public")
  .replace("//# sourceMappingURL=index.d.ts.map", "//# sourceMappingURL=site-widget.d.ts.map");

await writeFile(resolve(dist, "site-widget.d.ts"), publicTypes, "utf8");
await writeFile(
  resolve(dist, "site-widget.d.ts.map"),
  JSON.stringify({
    version: 3,
    file: "site-widget.d.ts",
    sourceRoot: "",
    sources: ["types/index.d.ts"],
    names: [],
    mappings: ""
  }),
  "utf8"
);
