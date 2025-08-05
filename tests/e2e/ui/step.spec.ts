import { test } from '../../../framework/fixtures';

test('Step Decorator Example', async ({ loginPage }) => {
  // Using the step decorator to log in
  await loginPage.login();
});
