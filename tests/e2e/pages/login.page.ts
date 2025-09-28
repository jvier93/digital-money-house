import { Page, Locator } from "@playwright/test";

/**
 * Page Object Model for Authentication Pages
 *
 * Handles login flow and error states for the Digital Money House application.
 * Supports two-step login process:
 * 1. Email input → Continue
 * 2. Password input → Login
 *
 * Also provides error state verification for invalid credentials.
 */
export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly continueButton: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly availableBalance: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByPlaceholder("Correo electrónico*");
    this.passwordInput = page.getByPlaceholder("Contraseña*");
    this.continueButton = page.getByRole("button", { name: "Continuar" });
    this.loginButton = page.getByRole("button", { name: "Ingresar" });
    this.errorMessage = page.getByText(
      "Credenciales incorrectas, inténtalo nuevamente.",
    );
    this.availableBalance = page.locator("text=Dinero disponible");
  }

  async goto() {
    await this.page.goto("/signin");
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.continueButton.click();
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async waitForError() {
    await this.page.waitForURL(/.*error=CredentialsSignin/);
    return this.errorMessage.isVisible();
  }

  async getEmailError() {
    return this.page.getByText("El email es obligatorio").isVisible();
  }

  async getPasswordError() {
    return this.page.getByText("La contraseña es obligatoria").isVisible();
  }
}
