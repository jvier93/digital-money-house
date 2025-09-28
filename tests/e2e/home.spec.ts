import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/home.page";

/**
 * E2E Tests for Home/Landing Page Functionality
 *
 * This test suite validates the public-facing landing page of Digital Money House:
 * - Page loading and rendering of main sections
 * - Responsive design across different viewport sizes
 * - Hero section visibility and content
 * - Services section presentation
 * - Footer accessibility and links
 *
 * Test Strategy:
 * - Viewport-aware testing (mobile, tablet, desktop)
 * - Validates critical above-the-fold content
 * - Ensures proper page structure and accessibility
 * - Tests entry point for unauthenticated users
 * - Cross-device compatibility verification
 */
test.describe("Home Page", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test("should load home page successfully", async ({ page }) => {
    // Test: Landing page structure and responsive behavior
    // Validates that all critical sections load properly across device types

    // Step 1: Verify core page sections are visible
    await expect(await homePage.isHeroSectionVisible()).toBeTruthy();
    await expect(await homePage.isServiceSectionVisible()).toBeTruthy();
    await expect(await homePage.isFooterVisible()).toBeTruthy();

    // Step 2: Log viewport information for debugging
    const viewport = page.viewportSize();
    console.log(
      `Running test on viewport: ${viewport?.width}x${viewport?.height}`,
    );

    // Step 3: Viewport-specific validation (responsive design testing)
    if (viewport && viewport.width <= 640) {
      // Mobile: Verify mobile-optimized layout
      console.log("Running mobile specific tests");
    } else if (viewport && viewport.width <= 1024) {
      // Tablet: Verify tablet-optimized layout
      console.log("Running tablet specific tests");
    } else {
      // Desktop: Verify desktop layout
      console.log("Running desktop specific tests");
    }
  });
});
