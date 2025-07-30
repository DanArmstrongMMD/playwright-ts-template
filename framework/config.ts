enum Environment {
  QA = 'qa',
  DEV = 'dev',
  STAGING = 'staging',
  PROD = 'prod'
}

function getEnvirionmentVariable(name: string, defaultValue?: string): string {
  if (!process.env[name] && !defaultValue) throw new Error(`Environment variable ${name} is not set and no default value provided.`);
  return process.env[name] || defaultValue!;
}

export abstract class TestConfig {
  private static readonly DEFAULT_TEST_TIMEOUT = 30_000; // 30 seconds
  private static readonly DEFAULT_SUITE_TIMEOUT = 300_000; // 5 minutes
  static readonly timeouts = {
    test: {
      default: this.DEFAULT_TEST_TIMEOUT,
      short: this.DEFAULT_TEST_TIMEOUT / 3,
      long: this.DEFAULT_TEST_TIMEOUT * 3
    },
    suite: {
      default: this.DEFAULT_SUITE_TIMEOUT,
      short: this.DEFAULT_SUITE_TIMEOUT / 3,
      long: this.DEFAULT_SUITE_TIMEOUT * 3
    }
  };

  static readonly environment = getEnvirionmentVariable('NODE_ENV', 'qa') as Environment;
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
