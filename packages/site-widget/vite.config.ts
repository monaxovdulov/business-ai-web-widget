import { defineConfig } from "vitest/config";

export default defineConfig({
  publicDir: false,
  build: {
    target: "es2021",
    sourcemap: true,
    minify: false
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"]
  }
});
