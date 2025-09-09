import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/home.page";

test.describe("Home Page", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test("should load home page successfully", async ({ page }) => {
    // Verify that the page loads with all main sections
    await expect(await homePage.isHeroSectionVisible()).toBeTruthy();
    await expect(await homePage.isServiceSectionVisible()).toBeTruthy();
    await expect(await homePage.isFooterVisible()).toBeTruthy();

    // Get current viewport size
    const viewport = page.viewportSize();
    console.log(`Running test on viewport: ${viewport?.width}x${viewport?.height}`);

    // Additional viewport-specific checks can be added here
    if (viewport && viewport.width <= 640) {
      // Mobile specific tests
      console.log('Running mobile specific tests');
    } else if (viewport && viewport.width <= 1024) {
      // Tablet specific tests
      console.log('Running tablet specific tests');
    } else {
      // Desktop specific tests
      console.log('Running desktop specific tests');
    }
  });
});
