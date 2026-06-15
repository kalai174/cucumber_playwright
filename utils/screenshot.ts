import { Page, TestInfo } from '@playwright/test';


export async function takeAndAttachScreenshot(page: Page, stepName: string, testInfo: TestInfo) {
  let screenshot = await page.screenshot();
  await testInfo.attach(stepName, {
    body: screenshot,
    contentType: 'image/png',
  });
}
