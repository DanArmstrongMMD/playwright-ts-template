import { APIRequestContext, APIResponse } from '@playwright/test';
import { TestConfig } from '../framework/config';

export class BookingService {
  private readonly url = TestConfig.urls.api.useGateway ? TestConfig.urls.api.gateway : TestConfig.urls.api.bookingService;

  private readonly bookingEndpoint = `${this.url}/booking`;
  private readonly bookingByIdEndpoint = (bookingId: string) => `${this.bookingEndpoint}/${bookingId}`;

  constructor(private requestContext: APIRequestContext) {}

  async createBooking(bookingData: Record<string, unknown>): Promise<APIResponse> {
    return await this.requestContext.post(this.bookingEndpoint, {
      data: bookingData
    });
  }

  async getBookingById(bookingId: string): Promise<APIResponse> {
    return await this.requestContext.get(this.bookingByIdEndpoint(bookingId));
  }

  async updateBooking(bookingId: string, bookingData: Record<string, unknown>): Promise<APIResponse> {
    return await this.requestContext.patch(this.bookingByIdEndpoint(bookingId), {
      data: bookingData
    });
  }

  async deleteBooking(bookingId: string): Promise<APIResponse> {
    return await this.requestContext.delete(this.bookingByIdEndpoint(bookingId));
  }
}
