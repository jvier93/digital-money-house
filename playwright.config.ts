import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    /* Test desktop viewports */
    {
      name: "desktop-chrome",
      use: { 
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 720 }
      },
    },
    {
      name: "desktop-firefox",
      use: { 
        ...devices["Desktop Firefox"],
        viewport: { width: 1280, height: 720 }
      },
    },
    {
      name: "desktop-safari",
      use: { 
        ...devices["Desktop Safari"],
        viewport: { width: 1280, height: 720 }
      },
    },
    /* Test tablet viewports */
    {
      name: "tablet-chrome",
      use: {
        ...devices["iPad Air"],
        browserName: "chromium",
      },
    },
    /* Test mobile viewports */
    {
      name: "mobile-chrome",
      use: {
        ...devices["Pixel 5"],
      },
    },
    {
      name: "mobile-safari",
      use: {
        ...devices["iPhone 12"],
      },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
