import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { TestContext } from './testcontext';

setDefaultTimeout(60 * 1000);
Before(async function () {

  this.browser = await chromium.launch();

const context = await this.browser.newContext({
    storageState: 'playwright/.auth/user.json' // reuse session
  });

  this.page = await context.newPage();
});


After(async function (this: TestContext, scenario) {

  
 const screenshot = await this.page.screenshot({
      path: `reports/screenshots/${scenario.pickle.name}.png`,
      fullPage: true
    });

    // Attach to cucumber report
    await this.attach(screenshot, 'image/png');

  
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