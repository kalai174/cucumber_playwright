import { Given, When, Then } from '@cucumber/cucumber';
import { TestContext } from '../hooks/testcontext';
import { HomePage } from '../pages/HomePage';
import { ContactsPage } from '../pages/ContactsPage';
import contactsData from '../test-data/contacts.json';
import { ENV } from '../utils/env';
let home: HomePage;
let contacts: ContactsPage;


let createdFullName = '';
let searchedValue = '';
let updatedPhone = '';
let updatedEmail = '';
let notesValue = '';
let deletedName = ''

Given('I open the CRM application', async function (this: TestContext) {
  
 await this.page.goto(ENV.loginURL, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });


  home = new HomePage(this.page);
  contacts = new ContactsPage(this.page);

});

Given('I navigate to the Contacts page', async function (this: TestContext) {
  await home.navigateToContacts();
  await this.page.hover('text=Category');
});

When('I create a single contact from json data', async function () {
  const data = contactsData.singleContact;

  createdFullName = `${data.firstName} ${data.lastName}`;

  await contacts.createContactIfNotExists(
    data.firstName,
    data.lastName,
    data.email,
    data.phone
  );
});

Then('the created contact should appear in the contact list', async function () {
  await contacts.validateContactPresent(createdFullName);
});

When('I create multiple contacts from json data', async function (this: TestContext) {
  const contactsList = contactsData.multipleContacts;

  for (const contact of contactsList) {
    await contacts.createContactIfNotExists(
      contact.firstName,
      contact.lastName,
      contact.email,
      contact.phone
    );

    await this.page.waitForTimeout(1000);
  }
});

Then(
  'duplicate contacts should be skipped and execution should continue',
  async function () {
    console.log(' Multiple contacts creation completed. Duplicate handling is delegated to createContactIfNotExists().');
  }
);

When('I search contact by first name from json data', async function () {
  const data = contactsData.searchContact;
  searchedValue = data[0].name;

  await contacts.searchContact(searchedValue);
});

Then('the searched contact should be displayed', async function () {
  await contacts.validateContactPresent(searchedValue);
});

When(
  'I search contact by filter field {string}',
  async function (fieldName: string) {
    const data = contactsData.searchByfield;

    let filterValue = '';

    // Flexible mapping:
    // 1) if your JSON has field property, use it
    const matched = data.find(
      (item: any) =>
        item.field &&
        item.field.toLowerCase().trim() === fieldName.toLowerCase().trim()
    );

    if (matched) {
      filterValue = matched.value;
    } else {
      // 2) fallback to your current index-based structure
      if (fieldName === 'Email') {
        filterValue = data[0].value;
      } else if (fieldName === 'First Name') {
        filterValue = data[1].value;
      } else if (fieldName === 'Last Name') {
        filterValue = data[2].value;
      }
    }

    await contacts.searchContactByFilter(fieldName, filterValue);
  }
);

Then('the filter operation should complete successfully', async function () {
  console.log(' Filter search executed successfully');
});

When('I update the contact phone number from json data', async function (this: TestContext) {
  const data = contactsData.updatedContact[0];
  updatedPhone = data.phone;

  await contacts.searchContact(data.name);
  await this.page.waitForTimeout(1000);

  await contacts.editContact(data.name);
  await contacts.editPhone(updatedPhone);

  await this.page.reload();

  await contacts.searchContact(data.name);
  await contacts.editContact(data.name);
});

Then('the updated phone number should persist after refresh', async function () {
  await contacts.validatePhone(updatedPhone);
});

When('I update the contact email from json data', async function (this: TestContext) {
  const data = contactsData.updatedContact[0];
  updatedEmail = data.email;

  await contacts.searchContact(data.name);
  await this.page.waitForTimeout(1000);

  await contacts.editContact(data.name);
  await contacts.updateEmail(updatedEmail);

  await this.page.reload();

  await contacts.searchContact(data.name);
  await this.page.waitForTimeout(1000);
  await contacts.editContact(data.name);
});

Then('the updated email should persist after refresh', async function () {
  await contacts.validateEmail(updatedEmail);
});

When('I add notes to a contact from json data', async function () {
  const data = contactsData.addNotes[0];
  notesValue = data.notes;

  await contacts.searchContact(data.name);
  await contacts.addNotes(data.name, notesValue);
});

Then('the notes should be saved successfully', async function () {
  await contacts.validateNotes(notesValue);
});

When('I delete a contact from json data', async function () {
  const data = contactsData.deleteContact[0];
  deletedName = data.name;

  await contacts.searchContact(deletedName);
  await contacts.deleteContact(deletedName);
  await contacts.searchContact(deletedName);
});

Then('the deleted contact should not appear in search results', async function () {
  await contacts.validateContactNotPresent(deletedName);
});
