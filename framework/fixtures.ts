import { APIRequestContext, test as base } from '@playwright/test';
import { Helpers } from './helpers';

type UIFixtures = {
  exampleUIFixture: void;
};
type APIFixtures = {
  authToken: string;
  authenticatedRequest: APIRequestContext;
};

type TestFixtures = UIFixtures & APIFixtures;
type WorkerFixtures = {
  exampleWorkerFixture: void;
};

let authenticationToken: string | undefined;
async function getAuthenticationToken(): Promise<string> {
  return (authenticationToken ??= await Helpers.generateAuthenticationToken());
}

export const test = base.extend<TestFixtures, WorkerFixtures>({
  authToken: async ({}, use) => {
    await use(await getAuthenticationToken());
  },
  authenticatedRequest: async ({ playwright, authToken }, use) => {
    const requestContext = await playwright.request.newContext({
      extraHTTPHeaders: {
        ...Helpers.generateAuthHeaders(authToken)
      }
    });
    await use(requestContext);
  }
});
export { expect } from '@playwright/test';
