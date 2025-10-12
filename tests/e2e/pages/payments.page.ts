import { Page, Locator, expect } from "@playwright/test";

/**
 * Page Object Model for Payment Services Management Page
 *
 * This class encapsulates all interactions with the payment services interface.
 * It provides methods for:
 * - Navigating to payments page
 * - Searching for services
 * - Selecting services for payment
 * - Completing payment flow (account number, card selection, confirmation)
 * - Handling success and error states
 *
 * Handles edge cases:
 * - Invalid account numbers
 * - No cards available
 * - Service not found
 * - Payment processing errors
 */
export class PaymentsPage {
  readonly page: Page;

  // Main page elements
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly servicesContainer: Locator;
  readonly emptyStateMessage: Locator;

  // Account number step
  readonly accountNumberInput: Locator;
  readonly accountNumberContinueButton: Locator;
  readonly accountNumberHeading: Locator;

  // Card selection step
  readonly cardSelectionHeading: Locator;
  readonly cardRadioButtons: Locator;
  readonly paymentContinueButton: Locator;

  // Success step
  readonly successHeading: Locator;
  readonly successMessage: Locator;
  readonly viewActivityButton: Locator;
  readonly makeAnotherPaymentButton: Locator;

  // Error step
  readonly errorHeading: Locator;
  readonly errorMessage: Locator;
  readonly retryButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Main page elements
    this.searchInput = page.getByPlaceholder("Buscar servicios");
    this.searchButton = page.locator(
      'form[data-testid="services-search-form"]',
    ); // form for Enter key submit
    this.servicesContainer = page
      .locator("text=Servicios disponibles")
      .locator("..");
    this.emptyStateMessage = page.getByText(/No se encontraron servicios/i);

    // Account number step
    this.accountNumberInput = page.locator('input[name="accountNumber"]');
    this.accountNumberContinueButton = page.getByRole("button", {
      name: "Continuar",
    });
    this.accountNumberHeading = page.getByRole("heading", {
      name: /Número de cuenta/i,
    });

    // Card selection step
    this.cardSelectionHeading = page.getByRole("heading", {
      name: /Tus tarjetas/i,
    });
    this.cardRadioButtons = page.locator(
      'input[type="radio"][name="cardSelection"]',
    );
    this.paymentContinueButton = page.getByRole("button", { name: /Pagar/i });
    this.paymentContinueButton = page.getByRole("button", { name: /Pagar/i });

    // Success step
    this.successHeading = page.getByRole("heading", {
      name: /Ya realizaste tu pago/i,
    });
    this.successMessage = page.getByText(/Tu pago se realizó exitosamente/i);
    this.viewActivityButton = page.getByRole("link", {
      name: /Ver actividad/i,
    });
    this.makeAnotherPaymentButton = page.getByRole("link", {
      name: /pagar otro servicio/i,
    });

    // Error step - error messages appear in h2 without "error" heading
    this.errorHeading = page.getByRole("heading", {
      name: /No encontramos facturas|Hubo un problema/i,
    });
    this.errorMessage = page.getByText(/Revisá el dato|fondos insuficientes/i);
    // Retry button is mobile-only (md:hidden), use data-testid
    this.retryButton = page.getByTestId(
      "account-number-continue-button-mobile",
    );
  }

  async goto() {
    await this.page.goto("/dashboard/payments");
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Search for services by name
   */
  async searchService(serviceName: string) {
    await this.searchInput.fill(serviceName);
    // Submit form by pressing Enter (no search button exists)
    await this.searchInput.press("Enter");
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Get count of available services
   */
  async getServicesCount(): Promise<number> {
    try {
      // The "Seleccionar" buttons are actually links, not buttons
      const serviceLinks = this.page.getByRole("link", {
        name: /Seleccionar/i,
      });
      return await serviceLinks.count();
    } catch {
      return 0;
    }
  }

  /**
   * Select a service by clicking its button
   */
  async selectService(serviceName: string) {
    const serviceCard = this.page.locator(`text=${serviceName}`).first();
    await expect(serviceCard).toBeVisible();

    // Find the "Seleccionar" link within the service card's container
    const serviceContainer = serviceCard.locator(
      'xpath=ancestor::div[contains(@class, "border")]',
    );
    const selectLink = serviceContainer.getByRole("link", {
      name: /Seleccionar/i,
    });

    // Wait for link to be ready before clicking (hydration issue)
    await selectLink.waitFor({ state: "visible" });
    await this.page.waitForLoadState("domcontentloaded");

    await selectLink.click();
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Select service by index (0-based)
   */
  async selectServiceByIndex(index: number = 0) {
    const serviceLinks = this.page.getByRole("link", {
      name: /Seleccionar/i,
    });
    const count = await serviceLinks.count();

    if (count === 0) {
      throw new Error("No services available to select");
    }

    if (index >= count) {
      throw new Error(
        `Service index ${index} out of range. Only ${count} services available.`,
      );
    }

    // Wait for link to be ready before clicking (hydration issue)
    const linkToClick = serviceLinks.nth(index);
    await linkToClick.waitFor({ state: "visible" });
    await this.page.waitForLoadState("domcontentloaded");

    await linkToClick.click();
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Enter account number in the payment flow
   */
  async enterAccountNumber(accountNumber: string) {
    await expect(this.accountNumberInput).toBeVisible();
    await this.accountNumberInput.fill(accountNumber);
  }

  /**
   * Continue from account number step
   */
  async continueFromAccountNumber() {
    // Wait for button to be ready (hydration)
    await this.accountNumberContinueButton.waitFor({ state: "visible" });
    await this.accountNumberContinueButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Select a card for payment by index
   */
  async selectCard(cardIndex: number = 0) {
    await expect(this.cardRadioButtons.nth(cardIndex)).toBeVisible();
    await this.cardRadioButtons.nth(cardIndex).click();
  }

  /**
   * Get count of available cards
   */
  async getCardsCount(): Promise<number> {
    try {
      return await this.cardRadioButtons.count();
    } catch {
      return 0;
    }
  }

  /**
   * Complete payment after selecting card
   */
  async completePayment() {
    // Wait for button to be enabled and ready (hydration)
    await this.paymentContinueButton.waitFor({ state: "visible" });
    await this.page.waitForTimeout(500); // Small delay for handler attachment
    await this.paymentContinueButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Verify success state
   */
  async verifySuccessState() {
    await expect(this.successHeading).toBeVisible({ timeout: 10000 });
  }

  /**
   * Verify error state
   */
  async verifyErrorState() {
    await expect(this.errorHeading).toBeVisible({ timeout: 10000 });
  }

  /**
   * Complete full payment flow with valid data
   * @param accountNumber - 16-digit account number
   * @param cardIndex - Index of card to select (default: 0)
   */
  async completePaymentFlow(
    accountNumber: string = "1234567890123456",
    cardIndex: number = 0,
  ) {
    await this.enterAccountNumber(accountNumber);
    await this.continueFromAccountNumber();

    const cardsCount = await this.getCardsCount();
    if (cardsCount > 0) {
      await this.selectCard(cardIndex);
      await this.completePayment();
    } else {
      throw new Error("No cards available for payment");
    }
  }

  /**
   * Retry after error
   */
  async retryPayment() {
    // Wait for button to be ready (hydration)
    await this.retryButton.waitFor({ state: "visible" });
    await this.page.waitForTimeout(300); // Small delay for handler attachment
    await this.retryButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Navigate to activity from success page
   */
  async goToActivity() {
    await this.viewActivityButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Make another payment from success page
   */
  async makeAnotherPayment() {
    await this.makeAnotherPaymentButton.click();
    await this.page.waitForLoadState("networkidle");
  }
}
