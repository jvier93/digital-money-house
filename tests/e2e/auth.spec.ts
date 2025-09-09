import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/login.page";
import { NavigationPage } from "./pages/navigation.page";

test.describe("Authentication flows", () => {
  let loginPage: LoginPage;
  let navigationPage: NavigationPage;

  const TEST_EMAIL = "test93@test93.com";
  const TEST_PASSWORD = "asdASD123#";

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    navigationPage = new NavigationPage(page);
  });

  test("should login successfully", async ({ page }) => {
    await loginPage.goto();
    await loginPage.login(TEST_EMAIL, TEST_PASSWORD);

    // Verify redirect to dashboard after login
    await expect(page).toHaveURL("/dashboard");
  });

  test("should show error with invalid credentials", async ({ page }) => {
    await loginPage.goto();
    await loginPage.login(TEST_EMAIL, "wrongpassword");

    // Verify error message is shown after redirect
    await expect(await loginPage.waitForError()).toBeTruthy();
  });

  test("should logout successfully", async ({ page, isMobile }) => {
    // Login first
    await loginPage.goto();
    await loginPage.login(TEST_EMAIL, TEST_PASSWORD);
    await expect(page).toHaveURL("/dashboard");

    if (isMobile) {
      // On mobile, need to open sidebar first
      await navigationPage.openSidebar();
      await expect(await navigationPage.isSidebarVisible()).toBeTruthy();
    }
    await page.waitForTimeout(500);
    // Perform logout
    await navigationPage.logout();

    // Verify logout worked by checking login form is visible
    await expect(await navigationPage.waitForLogout()).toBeTruthy();
  });
});
