import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/login.page";
import { NavigationPage } from "./pages/navigation.page";

/**
 * E2E Tests for Authentication Functionality
 *
 * This test suite validates the complete authentication flow including:
 * - Successful login with valid credentials
 * - Error handling for invalid credentials
 * - Logout functionality across different device types
 *
 * Test Strategy:
 * - Tests both mobile and desktop navigation patterns
 * - Verifies error states and success states
 * - Uses Page Object Model for maintainability
 * - Covers complete user authentication journey
 */
test.describe("Authentication flows", () => {
  let loginPage: LoginPage;
  let navigationPage: NavigationPage;

  const TEST_EMAIL = "test93@test93.com";
  const TEST_PASSWORD = "asdASD123#";

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    navigationPage = new NavigationPage(page);
  });

  test("should login successfully", async () => {
    // Test: Successful authentication with valid credentials
    // Validates complete login flow and dashboard access

    await loginPage.goto();
    await loginPage.login(TEST_EMAIL, TEST_PASSWORD);

    // Verify successful login by checking dashboard element
    await loginPage.availableBalance.waitFor({ state: "visible" });
  });

  test("should show error with invalid credentials", async () => {
    // Test: Error handling for invalid authentication attempts
    // Verifies that appropriate error messages are displayed

    await loginPage.goto();
    await loginPage.login(TEST_EMAIL, "wrongpassword");

    // Verify error message is shown after redirect
    await expect(await loginPage.waitForError()).toBeTruthy();
  });

  test("should logout successfully", async ({ page, isMobile }) => {
    // Test: Complete logout flow across device types
    // Handles different navigation patterns for mobile vs desktop

    // Step 1: Authenticate user first
    await loginPage.goto();
    await loginPage.login(TEST_EMAIL, TEST_PASSWORD);
    await loginPage.availableBalance.waitFor({ state: "visible" });

    // Step 2: Handle device-specific navigation
    if (isMobile) {
      await navigationPage.menuButton.isVisible();
      await navigationPage.openSidebar();
    }

    // Step 3: Perform logout and verify redirect to login
    await navigationPage.sidebarLogoutButton.isVisible();
    await expect(async () => {
      await navigationPage.sidebarLogoutButton.click();
      await page.getByPlaceholder("Correo electrónico*").isVisible();
    }).toPass({ timeout: 2000 });
  });
});
