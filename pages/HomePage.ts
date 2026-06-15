import { Page , Locator} from '@playwright/test';
import { ElementActions } from '../utils/ElementActions';

export class HomePage {

private page: Page;
  private actions: ElementActions;
private contactsMenu: Locator;
  constructor(page: Page) {
    this.page = page;
    this.actions = new ElementActions();
    this.contactsMenu = this.page.locator('//span[text()="Contacts"]');
  }

  async navigateToContacts() {
    await this.actions.click(this.contactsMenu);
  }
}