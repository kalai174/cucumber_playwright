import { expect } from '@playwright/test';
import { Base } from "./BasePage"
import { CompanyData } from '../utils/fakerdata';

export class CompanyPage extends Base {

  // All locators 
  private readonly companyModule: string = "//a[@href='/companies']"
  private readonly addButton: string = ".ui.mini.basic.icon.button"
  private readonly createButton: string = "Create"
  private readonly nameInput: string = "(//input[@name='name'])[1]"
  private readonly websiteInput: string = "//input[@name='url']"
  private readonly streetInput: string = "Street Address"
  private readonly cityInput: string = "City"
  private readonly stateInput: string = "State / County"
  private readonly postCodeInput: string = "Post Code"
  private readonly phoneInput: string = "Number"
  private readonly emailInput: string = "Email address"
  private readonly descriptionInput: string = "//textarea[@name='description']"
  private readonly industryInput: string = "//input[@name='industry']"
  private readonly employeesInput: string = "//input[@name='num_employees']"
  private readonly saveButton: string = "Save"
  private readonly editIcon: string = ".edit.icon";
  private readonly websiteText: string = "//div[contains(text(),'Website')]/following-sibling::div";
  private readonly addressText: string = "//div[contains(text(),'Address')]/following-sibling::div";
  private readonly deleteIcon: string = ".trash.icon"
  private readonly removeIcon: string = ".remove.icon"
  private readonly searchInput: string = "Search"
  private readonly descriptionText: string = "//div[contains(text(),'Description')]/following-sibling::div";


  //Navigate to company page
  async navigateToCompanies() {
    await expect(this.page.locator(this.companyModule)).toBeVisible();
    await this.page.locator(this.companyModule).click();
  }

  async clickCreate() {
    await this.page.getByText(this.createButton).click();
  }

  //Fill Company Details
  async fillCompanyForm(data: CompanyData) {
    await this.page.locator(this.nameInput).fill(data.name)
    await this.page.locator(this.websiteInput).fill(data.website)
    await this.page.getByPlaceholder(this.streetInput).fill(data.street);
    await this.page.getByPlaceholder(this.cityInput).fill(data.city);
    await this.page.getByPlaceholder(this.stateInput).fill(data.state);
    await this.page.getByPlaceholder(this.postCodeInput).fill(data.postCode);
    await this.page.getByPlaceholder(this.phoneInput).fill(data.phone);
    await this.page.getByPlaceholder(this.emailInput).fill(data.email);
    await this.page.locator(this.descriptionInput).fill(data.description);
    await this.page.locator(this.industryInput).fill(data.industry);
    await this.page.locator(this.employeesInput).fill(data.employees);
  }

  async clickSave(data: CompanyData) {
    await this.page.getByText(this.saveButton).click()
    await expect(this.page.getByText(data.name).nth(0)).toBeVisible();
  }

  //search company
  async searchAndOpenCompany(companyName: string) {
    await this.page.getByPlaceholder(this.searchInput).fill(companyName);
    await this.page.keyboard.press('Enter');
    await this.page.mouse.move(1000, 0);
    await this.page.waitForTimeout(3000);
    await this.page.locator('div[role="listitem"]', { hasText: 'Company' }).click();
    await this.page.waitForTimeout(3000)
    const row = this.page.locator('table tbody tr', { hasText: companyName });
    await expect(row).toBeVisible();
    await row.locator('a').first().click();
  }

  //edit company
  async clickEditIcon() {
    await expect(this.page.locator(this.editIcon).nth(0)).toBeVisible();
    await this.page.locator(this.editIcon).nth(0).click();
  }

  //update company details
  async updateCompanyDetails(data: Partial<CompanyData>) {
    await this.page.waitForTimeout(2000);
    if (data.name) {
      await this.page.locator(this.nameInput).fill(data.name);
    }
    if (data.website) {
      await this.page.locator(this.websiteInput).fill(data.website);
    }
    if (data.street) {
      await this.page.getByPlaceholder(this.streetInput).fill(data.street);
    }
    if (data.city) {
      await this.page.getByPlaceholder(this.cityInput).fill(data.city);
    }
    if (data.state) {
      await this.page.getByPlaceholder(this.stateInput).fill(data.state);
    }
    if (data.postCode) {
      await this.page.getByPlaceholder(this.postCodeInput).fill(data.postCode);
    }
    if (data.description) {
      await this.page.locator(this.descriptionInput).fill(data.description);
    }

    await this.page.getByText(this.saveButton).click();
  }

  //validation
  async verifyUpdatedDetails(data: Partial<CompanyData>) {

    if (data.website) {
      await expect(this.page.locator(this.websiteText)).toContainText(data.website);
    }
    if (data.description) {
      await expect(this.page.locator(this.descriptionText)).toContainText(data.description);
    }
    if (data.street || data.city || data.state || data.postCode) {
      const expectedAddress = `${data.street}, ${data.city}, ${data.state}, ${data.postCode}`;
      await expect(this.page.locator(this.addressText)).toContainText(expectedAddress);
    }
  }

  //delete company record
  async clickDeleteIcon() {
    await expect(this.page.locator(this.deleteIcon).nth(1)).toBeVisible();
    await this.page.locator(this.deleteIcon).nth(1).click();
    await this.page.locator(this.removeIcon).click();
  }

  async verifyCompanyDeleted(companyName: string) {
    const searchBox = this.page.getByPlaceholder(this.searchInput);
    await searchBox.fill(companyName);
    await this.page.keyboard.press('Enter');
    const row = this.page.locator('tr', {
      has: this.page.locator('a', { hasText: companyName })
    });
    await expect(row).toHaveCount(0);
  }



}