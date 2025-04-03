import { defineConfig, devices } from '@playwright/test';

// Environment type declaration
declare const process: {
  env: {
    CI?: string;
  };
};

export default defineConfig({
  testDir: './tests',
  testIgnore: ['**/node_modules/**', '**/.Trash/**', '**/coverage/**'], // Ignore unwanted folders
  timeout: 30 * 1000, // 30s timeout per test
  expect: { timeout: 5000 }, // 5s for assertions
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Enhanced reporting
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-html-report' }],
    ['json', { outputFile: 'test-results/json/results.json' }]
  ],

  use: {
    baseURL: 'https://nomtek.com', // Base URL for all tests
    trace: 'on-first-retry',    // Keep traces only for failed tests
    screenshot: 'only-on-failure', // Auto-capture screenshots on failures
    video: 'retain-on-failure',    // Record video for failed tests
    viewport: { width: 1920, height: 1080 }, // Default viewport
    ignoreHTTPSErrors: true,       // Useful for test environments
    actionTimeout: 10000,          // 10s timeout for actions
  },

  projects: [
    // Desktop browsers
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Custom Chrome args
        launchOptions: {
          args: ['--disable-notifications', '--disable-extensions']
        }
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    // CI-specific configuration (now properly typed)
    ...(process.env.CI ? [{
      name: 'CI-Chrome' as const,
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
      }
    }] : [])
  ],

  // Global setup/teardown (uncomment if needed)
  // globalSetup: require.resolve('./global-setup'),
  // globalTeardown: require.resolve('./global-teardown'),
});