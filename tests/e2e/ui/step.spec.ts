import { test } from '../../../application/fixtures';

test('Step Decorator Example', async ({ loginPage }) => {
  await loginPage.login();
});
