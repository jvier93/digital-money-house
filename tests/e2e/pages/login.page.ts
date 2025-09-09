import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly continueButton: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByPlaceholder("Correo electrónico*");
    this.passwordInput = page.getByPlaceholder("Contraseña*");
    this.continueButton = page.getByRole("button", { name: "Continuar" });
    this.loginButton = page.getByRole("button", { name: "Ingresar" });
    this.errorMessage = page.getByText(
      "Credenciales incorrectas, inténtalo nuevamente.",
    );
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
