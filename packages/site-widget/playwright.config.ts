import { defineConfig, devices } from "playwright/test";

const port = 4175;
const baseURL = `http://127.0.0.1:${port}`;
const isCI = Boolean(
  (globalThis as typeof globalThis & { process?: { env?: Record<string, string | undefined> } }).process?.env?.CI
);

export default defineConfig({
  testDir: "./tests/browser",
  outputDir: "./test-results",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  reporter: isCI ? [["line"], ["html", { open: "never" }]] : "line",
  timeout: 15_000,
  expect: {
    timeout: 4_000
  },
  use: {
    baseURL,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    video: "off"
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ],
  webServer: {
    command: `npm run dev -- --port ${port} --strictPort`,
    url: `${baseURL}/tests/fixtures/message-scroller.html`,
    reuseExistingServer: !isCI,
    timeout: 120_000
  }
});
