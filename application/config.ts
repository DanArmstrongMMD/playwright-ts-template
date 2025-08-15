import { DEFAULT_ENV } from './environment';

function getEnvirionmentVariable(name: string, defaultValue?: string): string {
  if (!process.env[name] && !defaultValue) throw new Error(`Environment variable ${name} is not set and no default value provided.`);
  return process.env[name] || defaultValue!;
}

export abstract class TestConfig {
  static readonly environment = getEnvirionmentVariable('NODE_ENV', DEFAULT_ENV);
  static readonly urls = {
    ui: {
      loginPage: getEnvirionmentVariable('UI_LOGIN_URL')
    },
    api: {
      useGateway: getEnvirionmentVariable('USE_API_GATEWAY', 'true') === 'true',
      gateway: getEnvirionmentVariable('API_GATEWAY_URL'),
      bookingService: getEnvirionmentVariable('API_BOOKING_SERVICE_URL')
    }
  };

  static readonly credentials = {
    ui: {
      username: getEnvirionmentVariable('UI_USERNAME'),
      password: getEnvirionmentVariable('UI_PASSWORD')
    },
    api: {
      username: getEnvirionmentVariable('API_USERNAME'),
      password: getEnvirionmentVariable('API_PASSWORD')
    }
  };
}
