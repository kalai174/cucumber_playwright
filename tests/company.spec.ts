import { test } from '@playwright/test';
import { takeAndAttachScreenshot } from '../utils/screenshot';
import { CompanyPage } from '../pages/CompanyPage';
import { generateCompanyData, generateUpdatedCompanyData } from '../utils/fakerdata';

let companyPage: CompanyPage;
let companyName: string;

const companyData = generateCompanyData();
const updateData = generateUpdatedCompanyData();

test.beforeEach(async ({ page }) => {
  await page.goto('https://ui.freecrm.com/');
  companyPage = new CompanyPage(page);
});

test.describe.serial("Companies Module", () => {

  // Create Company
  test("Create Company", async ({ page }, testInfo) => {
    await companyPage.navigateToCompanies();
    await companyPage.clickCreate();
    console.log('Test Data:', companyData);
    await companyPage.fillCompanyForm(companyData);
    await companyPage.clickSave(companyData);
    companyName = companyData.name;
    await takeAndAttachScreenshot(page, 'Company Created', testInfo);
    console.log("Company Created");
  });

  // Search Company
  test("Search Company", async ({ page }, testInfo) => {
    await companyPage.navigateToCompanies();
    await companyPage.searchAndOpenCompany(companyName);
    await takeAndAttachScreenshot(page, 'After Open Company', testInfo);
    console.log("Company Searched");
  });

  //  Update Company
  test("Update Company", async ({ page }, testInfo) => {
    await companyPage.navigateToCompanies();
    await companyPage.searchAndOpenCompany(companyName);
    await companyPage.clickEditIcon();
    console.log('Update Data:', updateData);
    await companyPage.updateCompanyDetails(updateData);
    await takeAndAttachScreenshot(page, 'After Update Save', testInfo);
    await companyPage.verifyUpdatedDetails(updateData);
    await takeAndAttachScreenshot(page, 'After Verification', testInfo);
    console.log("Company Updated");
  });

  //  Delete Company
  test("Delete Company", async ({ page }, testInfo) => {
    await companyPage.navigateToCompanies();
    await companyPage.searchAndOpenCompany(companyName);
    await companyPage.clickDeleteIcon();
    await takeAndAttachScreenshot(page, 'After Deletion', testInfo);
    await companyPage.verifyCompanyDeleted(companyName);
    await takeAndAttachScreenshot(page, 'Verification Success', testInfo);
    console.log("Company Deleted");
  });

});

