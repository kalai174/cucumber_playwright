import { test } from '@playwright/test';


import { HomePage } from '../pages/HomePage';
import { ContactsPage } from '../pages/ContactsPage';

import contactsData from '../test-data/contacts.json';

test.describe('Contacts Module', () => {


  let home: HomePage;
  let contacts: ContactsPage;

  test.beforeEach(async ({ page }) => {

    
    home = new HomePage(page);
    contacts = new ContactsPage(page);

    //  Already authenticated using storageState
    await page.goto('https://ui.freecrm.com/');
    await page.waitForLoadState('networkidle');
    await home.navigateToContacts();
    await page.hover('text=Category'); // Ensure the page is fully loaded before interactions
  });

  
  //  CREATE CONTACT
  

  test('Create new contact', async ({ page }) => {
    const data = contactsData.singleContact;
    
    
    await contacts.createContactIfNotExists(
      data.firstName,
      data.lastName,
      data.email,
      data.phone
    );

    await contacts.validateContactPresent(`${data.firstName} ${data.lastName}`);
  });

  // CREATE MULTIPLE CONTACTS

  
test('Create Multiple Contacts with Duplicate Handling', async ({page}) => {

    const contactsList = contactsData.multipleContacts;

    for (const contact of contactsList) {

      await contacts.createContactIfNotExists(
        contact.firstName,
        contact.lastName,
        contact.email,
        contact.phone
      );
      
      await page.waitForTimeout(1000); // Wait for the contact creation process to complete
    }

  });


  
  //  SEARCH CONTACT
  

  test('Search contact by first name', async () => {
    const data = contactsData.searchContact;
    await contacts.searchContact(data[0].name);

    await contacts.validateContactPresent(data[0].name);
  });

    test ('Search contact by filter Email', async ({page}) => {

      // await contacts.searchContactByFilter('Email', 'alice@test.com');
      const data = contactsData.searchByfield;
      await contacts.searchContactByFilter('Email', data[0].value);
       
      

      
    });
    test ('Search contact by filter First Name', async ({page}) => {
      const data = contactsData.searchByfield;
      await contacts.searchContactByFilter('First Name', data[1].value);
    });
        test ('Search contact by filter Last Name', async ({page}) => {
      const data = contactsData.searchByfield;
      await contacts.searchContactByFilter('Last Name', data[2].value);
    });
    

//     UPDATE PHONE
  

  test('Update contact phone number', async ({ page }) => {
 const data = contactsData.updatedContact;
    await contacts.searchContact(data[0].name);
    await page.waitForTimeout(1000); // Wait for search results to update
    await contacts.editContact(data[0].name);

    await contacts.editPhone(data[0].phone);

    //  Refresh validation
    await page.reload();

    await contacts.searchContact(data[0].name);
    await contacts.editContact(data[0].name);
    await contacts.validatePhone(data[0].phone);
  });

  
//   // //  UPDATE EMAIL
  

  test('Update contact email', async ({ page }) => {
const data = contactsData.updatedContact;
    await contacts.searchContact(data[0].name);
    await page.waitForTimeout(1000); // Wait for search results to updates
    await contacts.editContact(data[0].name); 
    await contacts.updateEmail(data[0].email);
      //  Refresh validation
    await page.reload();
    await contacts.searchContact(data[0].name);
    await page.waitForTimeout(1000);
    await contacts.editContact(data[0].name);
    await contacts.validateEmail(data[0].email);
  });

  
//   // //  ADD NOTES
  

  test('Add notes to contact', async () => {
 const data = contactsData.addNotes;
    await contacts.searchContact(data[0].name);

    await contacts.addNotes(data[0].name, data[0].notes);

    await contacts.validateNotes(data[0].notes);
  });

  
//   // //  DELETE CONTACT
  

  test('Delete contact', async () => {
  const data = contactsData.deleteContact;
    await contacts.searchContact(data[0].name);
   

    await contacts.deleteContact(data[0].name);

    await contacts.searchContact(data[0].name);

    await contacts.validateContactNotPresent(data[0].name);
  });

});