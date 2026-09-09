import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  baseURL: 'https://phptravels.net',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [['html'], ['json', { outputFile: 'test-results/results.json' }], ['list']],
  use: { actionTimeout: 10000, navigationTimeout: 20000, screenshot: 'only-on-failure', trace: 'retain-on-failure', video: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
