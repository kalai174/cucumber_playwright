import { chromium, FullConfig } from '@playwright/test';
import { ENV } from '../utils/env';
async function globalSetup(config: FullConfig) {

  const browser = await chromium.launch();

  const context = await browser.newContext();

  const page = await context.newPage();

  await page.goto(ENV.loginURL);

  // Login
  await page.fill('input[name="email"]', ENV.username);
  await page.fill('input[name="password"]', ENV.password);

  await page.getByText('Login', { exact: true }).click();

  // Wait for successful login
  await page.waitForLoadState('networkidle');

  // Save authentication
  await context.storageState({
    path: 'playwright/.auth/user.json'
  });

  console.log('Authentication saved');

  await browser.close();
}

export default globalSetup;