import { APIRequestContext, test as base } from '@playwright/test';
import { Helpers } from './helpers';
import { LoginPage } from '../pages/login.page';
import { BookingService } from '../services/booking.service';

type UIFixtures = {
  loginPage: LoginPage;
};
type APIFixtures = {
  authToken: string;
  authenticatedRequest: APIRequestContext;
  bookingService: BookingService;
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
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
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
  },
  bookingService: async ({ authenticatedRequest }, use) => {
    await use(new BookingService(authenticatedRequest));
  }
});
export { expect } from '@playwright/test';
