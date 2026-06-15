import { Locator, expect } from '@playwright/test';

export class ElementActions {

  async typeValue(locator: Locator, value: string) {
    try {
      await expect(locator).toBeVisible();
      await expect(locator).toBeEnabled();

      if (!(await locator.isEditable())) {
        throw new Error('Element not editable');
      }

      await locator.scrollIntoViewIfNeeded();

      await locator.fill('');
      await locator.fill(value);

      // await expect(locator).toHaveValue(value);

      console.log(`Entered value: ${value}`);

    } catch (error: any) {
      throw new Error(`typeValue failed: ${error.message}`);
    }
  }

  async click(locator: Locator) {
    try {
      await expect(locator).toBeVisible();
      await expect(locator).toBeEnabled();

      await locator.scrollIntoViewIfNeeded();
      await locator.click();

      console.log(`Element clicked`);

    } catch (error: any) {
      throw new Error(`click failed: ${error.message}`);
    }
  }

  async selectDropdownValue(locator: Locator, value: string) {
    try {
      await expect(locator).toBeVisible();
      await expect(locator).toBeEnabled();

      await locator.selectOption(value);

      const selected = await locator.inputValue();

      expect(selected).toBe(value);

    } catch (error: any) {
      throw new Error(`Dropdown selection failed: ${error.message}`);
    }
  }
}