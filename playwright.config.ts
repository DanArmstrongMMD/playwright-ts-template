import { defineConfig, devices } from '@playwright/test';
import { getEnvFilePath } from './application/environment';
import { TIMEOUTS } from './framework/timeouts';
import dotenv from 'dotenv';

const result = dotenv.config({ path: getEnvFilePath() });
if (result.error) throw result.error;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: TIMEOUTS.test.default,
  globalTimeout: TIMEOUTS.suite.default,
  expect: {
    timeout: TIMEOUTS.expect.default
  },
  reporter: process.env.CI ? [['html', 'junit']] : 'html',
  use: {
    trace: 'on'
  },
  projects: [
    {
      name: 'ui',
      use: { ...devices['Desktop Chrome'] },
      testDir: './tests/e2e/ui'
    },
    {
      name: 'api',
      testDir: './tests/e2e/api'
    }
  ]
});
