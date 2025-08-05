import { Locator, Page } from '@playwright/test';
import { TestConfig } from '../framework/config';
import { step } from '../framework/decorators';

export class LoginPage {
  private readonly url: string = TestConfig.urls.ui.loginPage;

  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly signInButton: Locator;

  constructor(private page: Page) {
    this.usernameInput = page.getByRole('textbox', { name: 'username' });
    this.passwordInput = page.getByRole('textbox', { name: 'password' });
    this.signInButton = page.getByRole('button', { name: 'Login' });
  }

  async navigateToPage() {
    await this.page.goto(this.url);
  }

  async enterUsername(username?: string) {
    await this.usernameInput.fill(username ?? TestConfig.credentials.ui.username);
  }

  async enterPassword(password?: string) {
    await this.passwordInput.fill(password ?? TestConfig.credentials.ui.password);
  }

  async clickSignInButton() {
    await this.signInButton.click();
  }

  @step(username => `Login to the portal as ${username || TestConfig.credentials.ui.username}`)
  async login(username?: string, password?: string) {
    await this.navigateToPage();
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickSignInButton();
  }
}
