import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/login.page";

/**
 * E2E Tests for Card Deposit Functionality
 *
 * This test suite validates the complete card deposit flow from user perspective.
 * It follows Martin Fowler's "Subcutaneous Testing" approach - testing just below
 * the UI surface to get maximum confidence with minimum brittleness.
 *
 * Test Strategy:
 * - Uses real backend and database (true E2E)
 * - Stops at confirmation step (avoids data modification)
 * - Handles both scenarios: with cards and without cards
 * - Tests across multiple browsers and device sizes
 */
test("Basic deposit card flow", async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Test credentials for existing user with cards
  const TEST_EMAIL = "test93@test93.com";
  const TEST_PASSWORD = "asdASD123#";

  // Step 1: Authenticate user
  await loginPage.goto();
  await loginPage.login(TEST_EMAIL, TEST_PASSWORD);
  await loginPage.availableBalance.waitFor({ state: "visible" });

  // Step 2: Navigate to card deposit page
  await page.goto("/dashboard/deposit/card");
  await page.waitForLoadState("networkidle");

  // Step 3: Verify we're on the select card step
  await expect(
    page.getByRole("heading", { name: "Seleccionar una tarjeta" }),
  ).toBeVisible();

  // Step 4: Handle card selection (state-agnostic approach)
  const cardRadios = page.locator('input[name="cardSelection"]');
  const cardCount = await cardRadios.count();

  if (cardCount > 0) {
    console.log(`Found ${cardCount} cards available`);

    // Step 4a: Select the first available card
    await cardRadios.first().click();

    // Step 4b: Proceed to amount step
    const continueButton = page
      .getByRole("button", { name: "Continuar" })
      .first();
    await continueButton.click();

    // Step 5: Enter deposit amount
    await expect(
      page.getByRole("heading", {
        name: "¿Cuánto querés ingresar a la cuenta?",
      }),
    ).toBeVisible();

    // Step 5a: Enter test amount (1000 ARS)
    const amountInput = page.locator('input[name="amount"]');
    await amountInput.fill("1000");

    // Step 5b: Proceed to confirmation
    const amountContinueButton = page
      .getByRole("button", { name: "Continuar" })
      .first();
    await amountContinueButton.click();

    // Step 6: Verify confirmation step and data integrity
    await expect(
      page.getByRole("heading", { name: "Revisá que está todo bien" }),
    ).toBeVisible();

    // Step 6a: Verify amount is displayed correctly
    await expect(page.getByTestId("confirm-amount")).toBeVisible();

    // Step 6b: Verify Argentine currency formatting ($ 1.000,00)
    const amountText = await page.getByTestId("confirm-amount").textContent();
    expect(amountText).toContain("1.000");

    console.log(
      "✅ Successfully completed deposit card flow up to confirmation step",
    );
  } else {
    // Alternative flow: No cards available
    console.log("ℹ️ No cards found - verifying empty state");
    await expect(page.getByText("No tienes tarjetas agregadas")).toBeVisible();
  }
});
