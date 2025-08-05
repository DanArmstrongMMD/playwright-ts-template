import { APIRequestContext, APIResponse } from '@playwright/test';
import { TestConfig } from '../framework/config';
import { step } from '../framework/decorators';

export class BookingService {
  private readonly url = TestConfig.urls.api.useGateway ? TestConfig.urls.api.gateway : TestConfig.urls.api.bookingService;

  private readonly bookingEndpoint = `${this.url}/booking`;
  private readonly bookingByIdEndpoint = (bookingId: string) => `${this.bookingEndpoint}/${bookingId}`;

  constructor(private requestContext: APIRequestContext) {}

  @step('Create a Booking')
  async createBooking(bookingData: Record<string, unknown>): Promise<APIResponse> {
    return await this.requestContext.post(this.bookingEndpoint, {
      data: bookingData
    });
  }

  @step(bookingId => `Get Booking by ID: ${bookingId}`)
  async getBookingById(bookingId: string): Promise<APIResponse> {
    return await this.requestContext.get(this.bookingByIdEndpoint(bookingId));
  }

  @step(bookingId => `Update Booking with ID: ${bookingId}`)
  async updateBooking(bookingId: string, bookingData: Record<string, unknown>): Promise<APIResponse> {
    return await this.requestContext.patch(this.bookingByIdEndpoint(bookingId), {
      data: bookingData
    });
  }

  @step(bookingId => `Delete Booking with ID: ${bookingId}`)
  async deleteBooking(bookingId: string): Promise<APIResponse> {
    return await this.requestContext.delete(this.bookingByIdEndpoint(bookingId));
  }
}
