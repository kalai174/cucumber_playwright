import { Page, expect,Locator } from '@playwright/test';
import { ElementActions } from '../utils/ElementActions';
import { HomePage } from './HomePage';
import { Base } from './BasePage';

export class ContactsPage  extends Base{

  
  private actions: ElementActions;
  homepage: HomePage;
 newBtn: Locator;
  firstName: Locator;
  lastName: Locator;
  email: Locator;
  phone: Locator;
  saveBtn: Locator;

  searchBox: Locator;
  notes: Locator;
  constructor(page: Page) {
    super(page);
    
    this.homepage = new HomePage(page);
    this.actions = new ElementActions();

    this.newBtn = this.page.getByText('Create', { exact: true }); 
    // locator('//button[text()="Create"]');
    this.firstName = this.page.locator('input[name="first_name"]');
    this.lastName = this.page.locator('input[name="last_name"]');
    this.email = this.page.getByPlaceholder('Email address');
    this.phone = this.page.getByPlaceholder('Number');
    this.saveBtn = this.page.locator('button').getByText('Save', { exact: true });

    this.searchBox = this.page.getByPlaceholder('Search');
    this.notes = this.page.locator('//form[@class="ui form"]/child::textarea');
    
    
  }

  
  

  async createContact(
    fName: string,
    lName: string,
    emailVal: string,
    phoneVal?: string
  ) {

    await this.homepage.navigateToContacts();
    await this.actions.click(this.newBtn);

    await this.actions.typeValue(this.firstName, fName);
    await this.actions.typeValue(this.lastName, lName);
    await this.actions.typeValue(this.email, emailVal);

    if (phoneVal) {
      await this.actions.typeValue(this.phone, phoneVal);
    }

    await this.actions.click(this.saveBtn);
  }

  async createContactIfNotExists(
  first: string,
  last: string,
  email: string,
  phone: string
) {

  const fullName = `${first} ${last}`;
  
  await this.searchContact(fullName);

  if (await this.isContactPresent(fullName)) {
    console.log(`Duplicate found: ${fullName} → Skipping`);
    return;
  }
  await this.createContact(first, last, email, phone);

  console.log(`Created contact: ${fullName}`);

}

  async searchContact(value: string) {
    await this.actions.typeValue(this.searchBox, value);
    await this.searchBox.press('Enter');
  }

  async isContactPresent(name: string): Promise<boolean> {

   await this.page.waitForTimeout(1000); // Wait for search results to update
  return await this.page.locator(`a`).getByText(name).isVisible().catch(() => false);
}

  async validateContactPresent(name: string) {
    // await this.page.locator(`text=${name}`).scrollIntoViewIfNeeded();
    
   const iscontactPresent = await this.isContactPresent(name);
    if (iscontactPresent) {
    console.log(`Contact found: ${name}`);
  }  
  else {
    console.log(`Contact not found: ${name}`);
  }
  }
 
  async searchContactByFilter(filter: string, value: string) {

    const filterDropdown = this.page.getByText('Show Filters');
    await this.actions.click(filterDropdown);
    const searchFilterOption = this.page.locator('//div[@class="ui search selection dropdown"]/input');
    await searchFilterOption.fill(filter);
    
    
    const searchoperation = this.page.locator('//div[@class="ui selection dropdown"]');
    await searchoperation.click();
    const optionToSelect = this.page.locator(`span`).getByText('Equals', { exact: true });
    await optionToSelect.click();
  
    const searchValueInput = this.page.getByPlaceholder('Value');
    await this.actions.typeValue(searchValueInput, value);
    

    const searchBtn = this.page.locator('//i[@class="search small icon"]/ancestor::button');
    await this.actions.click(searchBtn);
  }


  async editContact(name: string) {
    
    const editBtn = this.page.locator(`a`).getByText(name);
    await this.actions.click(editBtn);
    const editIcon = this.page.locator('//i[@class="edit icon"]/ancestor::button');
    await this.actions.click(editIcon);
  }

  async editPhone(phoneVal: string) {
    
    await this.actions.typeValue(this.phone, phoneVal);
    await this.actions.click(this.saveBtn);
  }

  async updateEmail(emailVal: string) {
    await this.actions.typeValue(this.email, emailVal);
    await this.actions.click(this.saveBtn);
  }

  async addNotes(name: string, note: string) {
    await this.page.locator(`a`).getByText(name).click();
    const notesicon = this.page.locator('//i[@class="comments outline icon"]/ancestor::button');
      await this.actions.click(notesicon);
    const notesArea = this.page.locator('//form[@class="ui form"]/child::textarea');
    await this.actions.typeValue(notesArea, note);

    const saveBtn = this.page.locator('button').getByText('Save', { exact: true });

    await this.actions.click(saveBtn);
  }

  async deleteContact(name: string) {

    const editBtn = this.page.locator(`a`).getByText(name);
    await this.actions.click(editBtn);

    const deleteIcon = this.page.locator('//i[@class="trash icon"]/ancestor::button');
    await this.actions.click(deleteIcon);
    
    const confirmBtn = this.page.locator('//i[@class="remove icon"]/ancestor::button');
    await this.actions.click(confirmBtn);
    
  }

  
async validatePhone(phone: string) {

  await expect(this.phone).toHaveValue('+91' + phone);
}

async validateEmail(email: string) {

  await expect(this.email).toHaveValue(email);
}

async validateNotes(note: string) {
  const notestext=this.page.locator(`//div[@class='note-text']/p`).first().innerText();
  if (notestext && (await notestext).match(note)) {
    console.log(`Notes validated: ${note}`);
  } else {
    throw new Error(`Note validation failed. Expected to find: ${note}`);
  }
}

async validateContactNotPresent(name: string) {

  await expect(
    this.page.locator(`a`).getByText(name)
  ).not.toBeVisible();
  console.log(`Contact not found: ${name}`);
}
}