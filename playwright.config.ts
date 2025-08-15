import { defineConfig, devices } from '@playwright/test';
import { DEFAULT_ENV, ALLOWED_ENVS } from './application/environment';
import { TIMEOUTS } from './framework/timeouts';
import dotenv from 'dotenv';
import path from 'path';

function getEnvFilePath(env: string): string {
  return path.resolve(__dirname, `.env.${env}`);
}

const env = (process.env.NODE_ENV ?? DEFAULT_ENV).toLowerCase();
if (!ALLOWED_ENVS.has(env)) throw new Error(`Unknown environment: ${env}. Please set NODE_ENV to 'qa', 'dev', 'staging', or 'prod'.`);

const envFilePath = getEnvFilePath(env);
const result = dotenv.config({ path: envFilePath });
if (result.error) console.warn(`Warning: Could not load environment file at ${envFilePath}`);

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
