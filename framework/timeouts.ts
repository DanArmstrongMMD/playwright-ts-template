const DEFAULT_TEST_TIMEOUT = 30_000; // 30 seconds
const DEFAULT_SUITE_TIMEOUT = 300_000; // 5 minutes
const DEFAULT_EXPECT_TIMEOUT = 10_000; // 10 seconds
export const TIMEOUTS = {
  test: {
    default: DEFAULT_TEST_TIMEOUT,
    short: DEFAULT_TEST_TIMEOUT / 3,
    long: DEFAULT_TEST_TIMEOUT * 3
  },
  suite: {
    default: DEFAULT_SUITE_TIMEOUT,
    short: DEFAULT_SUITE_TIMEOUT / 3,
    long: DEFAULT_SUITE_TIMEOUT * 3
  },
  expect: {
    default: DEFAULT_EXPECT_TIMEOUT,
    short: DEFAULT_EXPECT_TIMEOUT / 2,
    long: DEFAULT_EXPECT_TIMEOUT * 2
  }
};
