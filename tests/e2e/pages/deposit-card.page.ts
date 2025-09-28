import { Page, Locator, expect } from "@playwright/test";

export class DepositCardPage {
  readonly page: Page;

  // Navigation elements
  readonly breadcrumb: Locator;
  readonly pageTitle: Locator;
  readonly backButton: Locator;

  // Step 1: Select Card
  readonly selectCardTitle: Locator;
  readonly cardsContainer: Locator;
  readonly cardItems: Locator;
  readonly cardRadioButtons: Locator;
  readonly addNewCardButton: Locator;
  readonly selectCardContinueButton: Locator;
  readonly selectCardContinueButtonMobile: Locator;
  readonly noCardsMessage: Locator;

  // Step 2: Amount
  readonly amountTitle: Locator;
  readonly amountInput: Locator;
  readonly amountContinueButton: Locator;
  readonly amountContinueButtonMobile: Locator;
  readonly amountErrorMessage: Locator;

  // Step 3: Confirm
  readonly confirmTitle: Locator;
  readonly confirmAmount: Locator;
  readonly confirmDestination: Locator;
  readonly confirmCvu: Locator;
  readonly editAmountButton: Locator;
  readonly transferButton: Locator;
  readonly transferButtonMobile: Locator;

  // Step 4: Success
  readonly successIcon: Locator;
  readonly successTitle: Locator;
  readonly successAmount: Locator;
  readonly successDate: Locator;
  readonly successCvu: Locator;
  readonly successActions: Locator;

  // Toast messages
  readonly successToast: Locator;
  readonly errorToast: Locator;

  constructor(page: Page) {
    this.page = page;

    // Navigation
    this.breadcrumb = page.locator("span").filter({ hasText: "Cargar dinero" });
    this.pageTitle = page.getByRole("heading", { name: "Cargar dinero" });
    this.backButton = page.getByRole("button", { name: "Volver" });

    // Step 1: Select Card
    this.selectCardTitle = page.getByRole("heading", {
      name: "Seleccionar una tarjeta",
    });
    this.cardsContainer = page.locator('[class*="space-y"]').filter({
      has: page.getByText("Tus tarjetas"),
    });
    this.cardItems = page.getByTestId("card-item");
    this.cardRadioButtons = page.locator('input[name="cardSelection"]');
    this.addNewCardButton = page.getByRole("link").filter({
      has: page.getByText("Nueva tarjeta"),
    });
    this.selectCardContinueButton = page.getByTestId("continue-button-desktop");
    this.selectCardContinueButtonMobile = page.getByTestId(
      "continue-button-mobile",
    );
    this.noCardsMessage = page.getByText("No tienes tarjetas agregadas");

    // Step 2: Amount
    this.amountTitle = page.getByRole("heading", {
      name: "¿Cuánto querés ingresar a la cuenta?",
    });
    this.amountInput = page.locator('input[name="amount"]');
    this.amountContinueButton = page.getByTestId(
      "amount-continue-button-desktop",
    );
    this.amountContinueButtonMobile = page.getByTestId(
      "amount-continue-button-mobile",
    );
    this.amountErrorMessage = page.locator('[class*="text-red"]');

    // Step 3: Confirm
    this.confirmTitle = page.getByRole("heading", {
      name: "Revisá que está todo bien",
    });
    this.confirmAmount = page.getByTestId("confirm-amount");
    this.confirmDestination = page.getByText("Cuenta Propia");
    this.confirmCvu = page.locator("text=/CVU \\d+/");
    this.editAmountButton = page.getByTestId("edit-amount-button");
    this.transferButton = page.getByTestId("transfer-button-desktop");
    this.transferButtonMobile = page.getByTestId("transfer-button-mobile");

    // Step 4: Success
    this.successIcon = page.getByTestId("success-icon");
    this.successTitle = page.getByTestId("success-title");
    this.successAmount = page.getByTestId("success-amount");
    this.successDate = page.getByTestId("success-date");
    this.successCvu = page.getByTestId("success-cvu");
    this.successActions = page.locator('[class*="space"]').filter({
      has: page.getByRole("button"),
    });

    // Toast messages
    this.successToast = page.getByText("Depósito realizado exitosamente");
    this.errorToast = page.locator('[class*="toast"]').filter({
      hasText: /error|Error/,
    });
  }

  async goto() {
    try {
      await this.page.goto("/dashboard/deposit/card", {
        waitUntil: "domcontentloaded",
        timeout: 10000,
      });
    } catch {
      // If navigation was interrupted, try once more
      await this.page.goto("/dashboard/deposit/card", {
        waitUntil: "domcontentloaded",
        timeout: 10000,
      });
    }

    // Wait for page to be hydrated
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(1000);
  }

  async waitForStepToLoad(
    step: "select-card" | "amount" | "confirm" | "success",
  ) {
    const titleLocators = {
      "select-card": this.selectCardTitle,
      amount: this.amountTitle,
      confirm: this.confirmTitle,
      success: this.successTitle,
    };

    await titleLocators[step].waitFor({ state: "visible", timeout: 10000 });
    await this.page.waitForLoadState("networkidle");
  }

  // Step 1: Select Card methods
  async selectCard(cardIndex: number = 0): Promise<void> {
    await this.waitForStepToLoad("select-card");

    // Wait for cards to be loaded
    await expect(async () => {
      const cardCount = await this.cardItems.count();
      expect(cardCount).toBeGreaterThan(0);
    }).toPass({ timeout: 10000 });

    // Select the card by index
    const targetCard = this.cardItems.nth(cardIndex);
    await targetCard.waitFor({ state: "visible" });

    // Click on the label to select the radio button
    await targetCard.click();

    // Verify selection
    const radioButton = this.cardRadioButtons.nth(cardIndex);
    await expect(radioButton).toBeChecked();
  }

  async getCardsCount(): Promise<number> {
    await this.waitForStepToLoad("select-card");

    // Check if no cards message is visible
    if (await this.noCardsMessage.isVisible()) {
      return 0;
    }

    return await this.cardItems.count();
  }

  async continueFromSelectCard(): Promise<void> {
    // Use mobile-first approach - try mobile button first
    const isMobile = await this.page.evaluate(() => window.innerWidth < 768);

    if (isMobile) {
      await this.selectCardContinueButtonMobile.click();
    } else {
      await this.selectCardContinueButton.click();
    }

    // Wait for amount step to load
    await this.waitForStepToLoad("amount");
  }

  // Step 2: Amount methods
  async enterAmount(amount: number): Promise<void> {
    await this.waitForStepToLoad("amount");

    // Clear and fill the amount
    await this.amountInput.clear();
    await this.amountInput.fill(amount.toString());

    // Verify the value was set
    await expect(this.amountInput).toHaveValue(amount.toString());
  }

  async continueFromAmount(): Promise<void> {
    const isMobile = await this.page.evaluate(() => window.innerWidth < 768);

    if (isMobile) {
      await this.amountContinueButtonMobile.click();
    } else {
      await this.amountContinueButton.click();
    }

    // Wait for confirm step to load
    await this.waitForStepToLoad("confirm");
  }

  async hasAmountError(): Promise<boolean> {
    return await this.amountErrorMessage.isVisible();
  }

  // Step 3: Confirm methods
  async getConfirmAmount(): Promise<string> {
    await this.waitForStepToLoad("confirm");
    return (await this.confirmAmount.textContent()) || "";
  }

  async editAmount(): Promise<void> {
    await this.editAmountButton.click();
    await this.waitForStepToLoad("amount");
  }

  async confirmTransfer(): Promise<void> {
    const isMobile = await this.page.evaluate(() => window.innerWidth < 768);

    if (isMobile) {
      await this.transferButtonMobile.click();
    } else {
      await this.transferButton.click();
    }

    // Use toPass to handle potential API delays and hydration issues
    await expect(async () => {
      // Wait for either success step or error toast
      await Promise.race([
        this.waitForStepToLoad("success"),
        this.errorToast.waitFor({ state: "visible", timeout: 5000 }),
      ]);
    }).toPass({ timeout: 15000 });
  }

  // Step 4: Success methods
  async getSuccessAmount(): Promise<string> {
    await this.waitForStepToLoad("success");
    return (await this.successAmount.textContent()) || "";
  }

  async isSuccessStepVisible(): Promise<boolean> {
    return await this.successTitle.isVisible();
  }

  // Complete flow methods
  async completeDepositFlow(
    cardIndex: number = 0,
    amount: number = 1000,
  ): Promise<void> {
    // Step 1: Select card
    await this.selectCard(cardIndex);
    await this.continueFromSelectCard();

    // Step 2: Enter amount
    await this.enterAmount(amount);
    await this.continueFromAmount();

    // Step 3: Confirm
    await this.confirmTransfer();

    // Verify success
    await this.waitForStepToLoad("success");
  }

  // Utility methods
  async getCurrentStep(): Promise<
    "select-card" | "amount" | "confirm" | "success" | "unknown"
  > {
    if (await this.selectCardTitle.isVisible()) return "select-card";
    if (await this.amountTitle.isVisible()) return "amount";
    if (await this.confirmTitle.isVisible()) return "confirm";
    if (await this.successTitle.isVisible()) return "success";
    return "unknown";
  }

  async waitForToast(type: "success" | "error" = "success"): Promise<void> {
    const toastLocator =
      type === "success" ? this.successToast : this.errorToast;
    await toastLocator.waitFor({ state: "visible", timeout: 10000 });
  }
}
