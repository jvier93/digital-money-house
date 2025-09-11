import { Page, Locator, expect } from "@playwright/test";

export class CardsPage {
  readonly page: Page;
  readonly addCardLink: Locator;
  readonly cardNumberInput: Locator;
  readonly cardHolderInput: Locator;
  readonly expirationDateInput: Locator;
  readonly cvvInput: Locator;
  readonly continueButton: Locator;
  readonly deleteCardButton: Locator;
  readonly cardsList: Locator;
  readonly successToast: Locator;

  constructor(page: Page) {
    this.page = page;
    // Botón de agregar nueva tarjeta (necesitamos ver el texto exacto del link)
    this.addCardLink = page
      .getByRole("link")
      .filter({ has: page.getByText("nueva tarjeta", { exact: false }) });
    // Los inputs usan placeholders según el formulario
    this.cardNumberInput = page.getByPlaceholder("Número de tarjeta");
    this.cardHolderInput = page.getByPlaceholder("Nombre y apellido");
    this.expirationDateInput = page.getByPlaceholder(
      "Fecha de vencimiento (MM/YY)",
    );
    this.cvvInput = page.getByPlaceholder("Código de seguridad");
    // El botón de submit del formulario
    this.continueButton = page.getByRole("button", { name: "Continuar" });
    this.deleteCardButton = page
      .getByRole("button", { name: "Eliminar" })
      .first();
    // Buscamos específicamente los elementos de tarjeta en el listado
    this.cardsList = page.locator('[data-testid="card-item"]');
    // El mensaje de éxito viene de sonner toast
    this.successToast = page.getByText("Tarjeta guardada exitosamente");
  }

  async goto() {
    await this.page.goto("/dashboard/cards");
  }

  async gotoNewCard() {
    await this.page.goto("/dashboard/cards/new");
  }

  async addCard(
    cardNumber: string,
    cardHolder: string,
    expirationDate: string,
    cvv: string,
  ) {
    await this.cardNumberInput.fill(cardNumber);
    await this.cardHolderInput.fill(cardHolder);
    await this.expirationDateInput.fill(expirationDate);
    await this.cvvInput.fill(cvv);

    await this.continueButton.click();
    await this.successToast.waitFor({ state: "visible", timeout: 5000 });
    // Esperamos a que se complete la redirección y la página se actualice
    await this.page.waitForURL("/dashboard/cards");
    await this.page.waitForLoadState("networkidle");
  }

  async deleteCard() {
    await this.deleteCardButton.isVisible();
    await this.deleteCardButton.click();
    // Esperar a que el toast aparezca y la eliminación se complete
    await this.page
      .getByText("Tarjeta eliminada exitosamente")
      .first()
      .waitFor();
    await this.page.waitForTimeout(500); // Pequeña pausa para que termine la animación
    await this.page.waitForLoadState("networkidle");
    // Esperar a que se actualice la lista (la tarjeta actual debe desaparecer)
    await this.page.waitForTimeout(500);
  }

  async getCardsCount() {
    return await this.cardsList.count();
  }

  async clearAllCards() {
    await this.goto();
    const count = await this.getCardsCount();
    console.log(`Encontradas ${count} tarjetas antes de limpiar`);

    for (let i = 0; i < count; i++) {
      await this.deleteCard();
      // Esperar un momento entre eliminaciones para evitar problemas de rate limiting
      await this.page.waitForTimeout(500);
    }

    const remainingCount = await this.getCardsCount();
    console.log(`Quedan ${remainingCount} tarjetas después de limpiar`);
  }
}
