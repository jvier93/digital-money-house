import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly heroSection: Locator;
  readonly serviceSection: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heroSection = page.getByRole("region", { name: /hero/i });
    this.serviceSection = page.getByRole("region", { name: /services/i });
    this.footer = page.getByRole("contentinfo");
  }

  async goto() {
    await this.page.goto("/");
  }

  async isHeroSectionVisible() {
    return await this.heroSection.isVisible();
  }

  async isServiceSectionVisible() {
    return await this.serviceSection.isVisible();
  }

  async isFooterVisible() {
    return await this.footer.isVisible();
  }
}
