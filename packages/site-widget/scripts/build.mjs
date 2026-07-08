import { build } from "vite";
import { resolve } from "node:path";

const root = process.cwd();
const common = {
  configFile: resolve(root, "vite.config.ts"),
  publicDir: false,
  logLevel: "info"
};

await build({
  ...common,
  build: {
    outDir: "dist",
    emptyOutDir: false,
    target: "es2021",
    sourcemap: true,
    minify: "esbuild",
    lib: {
      entry: resolve(root, "src/site-widget.esm.ts"),
      formats: ["es"],
      fileName: () => "site-widget.esm.js"
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      }
    }
  }
});

await build({
  ...common,
  build: {
    outDir: "dist",
    emptyOutDir: false,
    target: "es2021",
    sourcemap: true,
    minify: "esbuild",
    lib: {
      entry: resolve(root, "src/index.ts"),
      formats: ["es"],
      fileName: () => "index.js"
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      }
    }
  }
});

await build({
  ...common,
  build: {
    outDir: "dist",
    emptyOutDir: false,
    target: "es2021",
    sourcemap: true,
    minify: "esbuild",
    lib: {
      entry: resolve(root, "src/site-widget.iife.ts"),
      name: "GranitSiteWidget",
      formats: ["iife"],
      fileName: () => "site-widget.iife.js"
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      }
    }
  }
});

await build({
  ...common,
  build: {
    outDir: "dist",
    emptyOutDir: false,
    target: "es2021",
    sourcemap: true,
    minify: "esbuild",
    lib: {
      entry: resolve(root, "src/loader.ts"),
      name: "GranitSiteWidgetLoader",
      formats: ["iife"],
      fileName: () => "loader.js"
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      }
    }
  }
});
