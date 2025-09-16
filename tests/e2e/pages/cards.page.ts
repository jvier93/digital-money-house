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
  readonly maxCardsError: Locator;

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
    // Error de límite de tarjetas
    this.maxCardsError = page.getByText(
      "Has alcanzado el límite máximo de 10 tarjetas",
    );
  }

  async goto() {
    try {
      await this.page.goto("/dashboard/cards", {
        waitUntil: "domcontentloaded",
        timeout: 10000,
      });
    } catch (error) {
      // Si la navegación fue interrumpida, intentar una vez más
      await this.page.goto("/dashboard/cards", {
        waitUntil: "domcontentloaded",
        timeout: 10000,
      });
    }
  }

  async gotoNewCard() {
    await this.page.goto("/dashboard/cards/new");
  }

  async addCard(
    cardNumber: string,
    cardHolder: string,
    expirationDate: string,
    cvv: string,
  ): Promise<void> {
    await this.cardNumberInput.fill(cardNumber);
    await this.cardHolderInput.fill(cardHolder);
    await this.expirationDateInput.fill(expirationDate);
    await this.cvvInput.fill(cvv);

    await this.continueButton.click();

    // Usar toPass para manejar posible hidratación
    await expect(async () => {
      // Esperar a que el toast aparezca
      await this.successToast.waitFor({ state: "visible" });
    }).toPass({ timeout: 10000 });
  }

  async deleteCard() {
    // Verificar que hay al menos una tarjeta para eliminar
    const deleteButton = this.page
      .getByRole("button", { name: "Eliminar" })
      .first();
    await deleteButton.waitFor({ state: "visible", timeout: 5000 });
    await deleteButton.click();

    // Esperar a que el toast aparezca
    await this.page.waitForFunction(
      () => {
        const toasts = Array.from(document.querySelectorAll("div")).filter(
          (el) => el.textContent === "Tarjeta eliminada exitosamente",
        );
        return toasts.length > 0;
      },
      { timeout: 5000 },
    );

    // Esperar a que la UI se actualice
    await this.page.waitForLoadState("networkidle");
  }
  async getCardsCount() {
    await this.page.waitForLoadState("networkidle");

    // Si aparece el mensaje de no hay tarjetas, retornar 0
    const noCardsMessage = this.page.getByText("Aún no hay tarjetas agregadas");
    if (await noCardsMessage.isVisible()) {
      return 0;
    }

    return await this.cardsList.count();
  }

  async hasNoCards() {
    return (await this.getCardsCount()) === 0;
  }

  async clearAllCards() {
    await this.goto();
    await this.page.waitForLoadState("networkidle");

    // Si ya no hay tarjetas, no necesitamos hacer nada
    const noCardsMessage = this.page.getByText("Aún no hay tarjetas agregadas");
    if (await noCardsMessage.isVisible()) {
      console.log("No hay tarjetas para eliminar");
      return;
    }

    try {
      // Mientras haya botones de eliminar, seguir eliminando tarjetas
      while (
        (await this.page.getByRole("button", { name: "Eliminar" }).count()) > 0
      ) {
        // Obtener el primer botón de eliminar
        const deleteButton = this.page
          .getByRole("button", { name: "Eliminar" })
          .first();
        await deleteButton.waitFor({ state: "visible" });
        await deleteButton.click();

        // Esperar a que aparezca el toast de éxito
        await this.page.waitForFunction(
          () => {
            const toasts = Array.from(document.querySelectorAll("div")).filter(
              (el) => el.textContent === "Tarjeta eliminada exitosamente",
            );
            return toasts.length > 0;
          },
          { timeout: 5000 },
        );

        // Esperar a que la UI se actualice
        await this.page.waitForLoadState("networkidle");
        await this.page.waitForTimeout(500);
      }

      // Verificar que todas las tarjetas se eliminaron
      await noCardsMessage.waitFor({ state: "visible", timeout: 5000 });
      console.log("Todas las tarjetas fueron eliminadas exitosamente");
    } catch (error) {
      console.error("Error al eliminar tarjetas:", error);
      throw error;
    }
  }
}
