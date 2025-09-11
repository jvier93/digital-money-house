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

    await loginPage.availableBalance.waitFor({ state: "visible" });
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
    await loginPage.availableBalance.waitFor({ state: "visible" });

    if (isMobile) {
      await navigationPage.menuButton.isVisible();
      await navigationPage.openSidebar();
    }
    await navigationPage.sidebarLogoutButton.isVisible();
    await expect(async () => {
      await navigationPage.sidebarLogoutButton.click();
      await page.getByPlaceholder("Correo electrónico*").isVisible();
    }).toPass({ timeout: 2000 });
  });
});
