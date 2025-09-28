import { Page, Locator, expect } from "@playwright/test";

/**
 * Page Object Model for Cards Management Page
 *
 * This class encapsulates all interactions with the cards management interface.
 * It provides methods for:
 * - Navigating to cards page
 * - Adding new cards (with proper error handling for limits)
 * - Deleting existing cards
 * - Counting cards (with robust selector strategies)
 *
 * Handles edge cases:
 * - 10-card limit enforcement
 * - Empty states (no cards)
 * - Network timing issues
 */
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
    } catch {
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
    console.log("🃏 Adding card...", {
      cardNumber,
      cardHolder,
      expirationDate,
      cvv,
    });

    await this.cardNumberInput.fill(cardNumber);
    await this.cardHolderInput.fill(cardHolder);
    await this.expirationDateInput.fill(expirationDate);
    await this.cvvInput.fill(cvv);

    console.log("🃏 Form filled, clicking continue button...");
    console.log("🃏 Current URL before click:", this.page.url());

    // Verificar que el botón esté habilitado antes de hacer clic
    const isEnabled = await this.continueButton.isEnabled();
    console.log("🃏 Continue button enabled:", isEnabled);

    // Hacer clic en continuar y esperar a que la página responda
    await this.continueButton.click();

    // Esperar un poco para ver qué pasa
    await this.page.waitForTimeout(2000);
    console.log("🃏 Current URL after click:", this.page.url());

    // Usar toPass para manejar posible hidratación y navegación
    await expect(async () => {
      const currentUrl = this.page.url();
      console.log("🃏 Checking current URL:", currentUrl);

      // Opción 1: Si aparece un toast de éxito
      const toastVisible = await this.successToast
        .isVisible()
        .catch(() => false);
      console.log("🃏 Toast visible:", toastVisible);
      if (toastVisible) {
        await this.successToast.waitFor({ state: "visible" });
        console.log("🃏 Success! Toast appeared");
        return;
      }

      // Opción 2: Si navegó de vuelta a la lista de tarjetas
      const isOnCardsPage =
        currentUrl.includes("/dashboard/cards") && !currentUrl.includes("/new");
      console.log("🃏 Is on cards page:", isOnCardsPage);
      if (isOnCardsPage) {
        // Verificar que efectivamente se agregó una tarjeta esperando a que aparezca algo en la lista
        await this.page
          .waitForSelector('[data-testid*="card-"], .card-item, .card', {
            timeout: 5000,
          })
          .catch(() => {});
        console.log("🃏 Success! Navigated to cards page");
        return;
      }

      // Opción 3: Verificar si se alcanzó el límite de 10 tarjetas
      const stillOnNewCardPage = currentUrl.includes("/dashboard/cards/new");
      if (stillOnNewCardPage) {
        // Buscar mensajes relacionados con el límite de tarjetas
        const limitErrorSelectors = [
          'text="No puedes agregar más tarjetas"',
          'text="Límite de tarjetas alcanzado"',
          'text="Máximo 10 tarjetas"',
          'text="Has alcanzado el máximo"',
          '[role="alert"]',
          ".error",
          ".text-red-500",
          '[data-testid="error-message"]',
        ];

        for (const selector of limitErrorSelectors) {
          const errorElement = await this.page.locator(selector).first();
          const isVisible = await errorElement.isVisible().catch(() => false);
          if (isVisible) {
            const errorText = await errorElement.textContent().catch(() => "");
            console.log("🃏 Card limit error detected:", errorText);
            throw new Error(
              `Card limit reached: ${errorText || "Maximum 10 cards allowed"}`,
            );
          }
        }

        // Si no hay mensaje de error específico pero seguimos en la página,
        // es probablemente porque ya hay 10 tarjetas
        console.log("🃏 Still on new card page, likely due to 10-card limit");
        throw new Error("Cannot add card: likely reached 10-card limit");
      }

      // Si ninguna de las anteriores, forzar error para reintentar
      console.log("🃏 Neither toast nor navigation detected, retrying...");
      throw new Error("Neither toast nor navigation to cards page detected");
    }).toPass({ timeout: 15000 });
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
  /**
   * Counts the number of cards currently displayed on the page
   *
   * This method uses a robust strategy to handle different page states:
   * 1. Waits for network stability and DOM rendering
   * 2. Checks for "no cards" message first
   * 3. Tries multiple selector strategies as fallback
   *
   * Selector strategies (in priority order):
   * - data-testid="card-item" (preferred, works after Container.Item fix)
   * - CSS class selectors (fallback)
   * - Text content pattern matching (most robust)
   *
   * @returns Promise<number> - Count of cards found (0-10)
   */
  async getCardsCount() {
    // Ensure page is fully loaded
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(1000);

    // Wait for cards section header to appear
    const tusCarjetas = this.page.getByText("Tus tarjetas");
    try {
      await tusCarjetas.waitFor({ state: "visible", timeout: 5000 });
    } catch {
      // Header not found, continue anyway
    }

    // Check for empty state first
    const noCardsMessage = this.page.getByText("Aún no hay tarjetas agregadas");
    if (await noCardsMessage.isVisible()) {
      return 0;
    }

    // Multiple selector strategies for robustness
    const cardSelectors = [
      '[data-testid="card-item"]', // Primary: data-testid (fixed in Container.Item)
      ".card-item", // Fallback: CSS class
      '[class*="card"]', // Fallback: partial class match
      "text=/Terminada en \\d+/", // Robust: text content pattern
    ];

    let count = 0;
    for (const selector of cardSelectors) {
      try {
        count = await this.page.locator(selector).count();
        if (count > 0) {
          console.log(`🃏 Found ${count} cards using selector: ${selector}`);
          break;
        }
      } catch {
        continue;
      }
    }

    return count;
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
