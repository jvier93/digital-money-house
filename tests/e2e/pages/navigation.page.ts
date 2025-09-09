import { Page, Locator, expect } from "@playwright/test";

export class NavigationPage {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly sidebarLogoutButton: Locator;
  readonly sidebar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page
      .getByRole("button")
      .filter({ has: page.locator(".lucide-menu") });
    this.sidebarLogoutButton = page.getByRole("button", {
      name: "Cerrar sesión",
    });

    this.sidebar = page.getByRole("navigation");
  }

  async openSidebar() {
    await this.menuButton.click();
  }

  async logout() {
    await expect(this.sidebarLogoutButton).toBeVisible();
    await expect(this.sidebarLogoutButton).toBeEnabled();
    await this.sidebarLogoutButton.click();
  }

  async isSidebarVisible() {
    return await this.sidebar.isVisible();
  }
  async waitForLogout() {
    await this.page.waitForURL(/.*\/signin/);
    await this.page.waitForTimeout(200);
    return this.page.getByPlaceholder("Correo electrónico*").isVisible();
  }
}
