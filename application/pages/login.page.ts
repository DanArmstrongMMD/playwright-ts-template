import { Locator, Page } from '@playwright/test';
import { TestConfig } from '../config';
import { action, step } from '../../framework/decorators';

export class LoginPage {
  private readonly url: string = TestConfig.urls.ui.loginPage;

  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly signInButton: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput = page.getByRole('textbox', { name: 'username' });
    this.passwordInput = page.getByRole('textbox', { name: 'password' });
    this.signInButton = page.getByRole('button', { name: 'Login' });
  }

  @action(`Navigating to ${TestConfig.urls.ui.loginPage}`)
  async navigateToPage() {
    await this.page.goto(this.url);
  }

  @action(username => `Entering username: ${username || TestConfig.credentials.ui.username}`)
  async enterUsername(username?: string) {
    await this.usernameInput.fill(username ?? TestConfig.credentials.ui.username);
  }

  @action(password => `Entering password: ${password ? '***' : 'default'}`)
  async enterPassword(password?: string) {
    await this.passwordInput.fill(password ?? TestConfig.credentials.ui.password);
  }

  @action('Clicking Sign In Button')
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
