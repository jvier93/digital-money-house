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

    this.sidebar = page.locator('nav.sidebar >> text="Cerrar sesión"');
  }

  async openSidebar() {
    await expect(async () => {
      await this.menuButton.click();
      await this.sidebar.isVisible();
    }).toPass({ timeout: 2000 });
  }

  async isSidebarVisible() {
    return await this.sidebar.isVisible();
  }
  async waitForLogout() {
    await this.page.waitForURL(/.*\/signin/);
    return this.page.getByPlaceholder("Correo electrónico*").isVisible();
  }
}
