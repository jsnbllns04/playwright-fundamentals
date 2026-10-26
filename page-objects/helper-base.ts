import { Page } from "playwright-core";

export class HelperBase{

    protected readonly page: Page

     constructor(page: Page){
        this.page = page
    }

    protected async OpenPage() {
        await this.page.goto('https://playground.bondaracademy.com/')
    }
}