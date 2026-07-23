import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  publicDir: false,
  build: {
    target: "es2021",
    sourcemap: true,
    minify: false
  },
  test: {
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "tests/browser/**"],
    globals: true,
    setupFiles: ["./tests/setup.ts"]
  }
});
