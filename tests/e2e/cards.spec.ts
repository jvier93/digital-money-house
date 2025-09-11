import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/login.page";
import { CardsPage } from "./pages/cards.page";

test.describe.serial("Cards management", () => {
  let loginPage: LoginPage;
  let cardsPage: CardsPage;

  const TEST_EMAIL = "test93@test93.com";
  const TEST_PASSWORD = "asdASD123#";

  // Test card data
  const VALID_CARD = {
    number: "4532756279624064",
    holder: "John Doe",
    expiration: "12/25",
    cvv: "123",
  };

  const INVALID_CARD = {
    number: "453275627962", // Número corto (12 dígitos)
    holder: "John Doe",
    expiration: "12/25",
    cvv: "123",
  };

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    cardsPage = new CardsPage(page);

    // Login before each test
    await loginPage.goto();
    await loginPage.login(TEST_EMAIL, TEST_PASSWORD);
    await loginPage.availableBalance.waitFor({ state: "visible" });

    // Limpiar todas las tarjetas existentes antes de cada test
    await cardsPage.clearAllCards();
  });

  test("should add a new card successfully", async ({ page }) => {
    await cardsPage.gotoNewCard();
    await cardsPage.addCard(
      VALID_CARD.number,
      VALID_CARD.holder,
      VALID_CARD.expiration,
      VALID_CARD.cvv,
    );

    // Verify success toast appears
    await expect(cardsPage.successToast).toBeVisible();
  });

  test("should show error with invalid card", async ({ page }) => {
    await cardsPage.gotoNewCard();

    await cardsPage.cardNumberInput.fill(INVALID_CARD.number);
    await cardsPage.cardHolderInput.fill(INVALID_CARD.holder);
    await cardsPage.expirationDateInput.fill(INVALID_CARD.expiration);
    await cardsPage.cvvInput.fill(INVALID_CARD.cvv);

    await cardsPage.continueButton.click();

    // Verify error message is shown
    const errorMessage = page.getByText("El número debe tener 16 dígitos");
    await expect(errorMessage).toBeVisible();
  });

  test("should delete a card successfully", async ({ page }) => {
    await cardsPage.goto();

    // Primero agregamos una tarjeta para asegurarnos de que hay algo para eliminar
    await cardsPage.gotoNewCard();
    await cardsPage.addCard(
      VALID_CARD.number,
      VALID_CARD.holder,
      VALID_CARD.expiration,
      VALID_CARD.cvv,
    );

    // Volvemos a la lista y eliminamos la tarjeta
    await cardsPage.goto();
    await cardsPage.deleteCard();

    // Verify deletion success toast appears
    await expect(
      page.getByText("Tarjeta eliminada exitosamente"),
    ).toBeVisible();
  });
});
