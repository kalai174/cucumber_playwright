import fs from 'fs';
import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { TestContext } from './testcontext';

setDefaultTimeout(60 * 1000);
Before(async function () {
  const authStatePath = 'playwright/.auth/user.json';
  if (!fs.existsSync(authStatePath)) {
    throw new Error(
      `Auth state file not found: ${authStatePath}. Run "npm run auth:setup" before test execution.`
    );
  }

  this.browser = await chromium.launch();
  this.context = await this.browser.newContext({
    storageState: authStatePath
  });
  this.page = await this.context.newPage();
});


After(async function (this: TestContext, scenario) {
  if (this.page) {
    const screenshot = await this.page.screenshot({
      path: `reports/screenshots/${scenario.pickle.name}.png`,
      fullPage: true
    });

    await this.attach(screenshot, 'image/png');
  }

  if (this.page) {
    await this.page.close();
  }

  if (this.context) {
    await this.context.close();
  }

  if (this.browser) {
    await this.browser.close();
  }
});