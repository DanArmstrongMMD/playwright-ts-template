import { Locator, Page } from '@playwright/test';
import { TestConfig } from '../framework/config';

export class LoginPage {
  private readonly url: string = TestConfig.urls.ui.loginPage;

  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly signInButton: Locator;

  constructor(private page: Page) {
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
  }

  async navigateToLogin() {
    await this.page.goto(this.url);
  }

  async login(username?: string, password?: string) {
    await this.usernameInput.fill(username ?? TestConfig.credentials.ui.username);
    await this.passwordInput.fill(password ?? TestConfig.credentials.ui.password);
    await this.signInButton.click();
  }
}
