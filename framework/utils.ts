import { Locator } from '@playwright/test';

export abstract class Helpers {
  static waitForElementToBeVisible(locator: Locator, timeout: number = 5000): Promise<void> {
    return locator.waitFor({ state: 'visible', timeout });
  }
}
