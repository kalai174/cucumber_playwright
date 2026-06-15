import { Page } from "@playwright/test";

export class Base {

    protected page: Page
    constructor(p: Page) {
        this.page = p
    }
    

}
