import { Given, When, Then } from '@cucumber/cucumber';
import { CompanyPage } from '../pages/CompanyPage';
import { generateCompanyData, generateUpdatedCompanyData } from '../utils/fakerdata';
import { TestContext } from '../hooks/testcontext';
import { ENV } from '../utils/env';
let companyPage: CompanyPage;
let companyName: string;

const companyData = generateCompanyData();
const updateData = generateUpdatedCompanyData();

Given('I open the CRM application \\(Companies)', async function (this: TestContext) {
  await this.page.goto(ENV.loginURL);
  companyPage = new CompanyPage(this.page);
});

When('I navigate to the Companies page', async function () {
  await companyPage.navigateToCompanies();
});

When('I click create company', async function () {
  await companyPage.clickCreate();
});

When('I fill the company form with generated company data', async function () {
  console.log('Test Data:', companyData);
  await companyPage.fillCompanyForm(companyData);
});

When('I save the company', async function () {
  await companyPage.clickSave(companyData);
  companyName = companyData.name;
});

Then('the company should be created', async function () {
  console.log('Company Created');
});

When('I search and open the created company', async function () {
  await companyPage.searchAndOpenCompany(companyName);
});

Then('the company should be opened successfully', async function () {
  console.log('Company Searched');
});

When('I click the edit icon', async function () {
  await companyPage.clickEditIcon();
});

When('I update the company details with generated updated data', async function () {
  console.log('Update Data:', updateData);
  await companyPage.updateCompanyDetails(updateData);
});

Then('the company should be updated successfully', async function () {
  await companyPage.verifyUpdatedDetails(updateData);
  console.log('Company Updated');
});

When('I click the delete icon', async function () {
  await companyPage.clickDeleteIcon();
});

Then('the company should be deleted successfully', async function () {
  await companyPage.verifyCompanyDeleted(companyName);
  console.log('Company Deleted');
});