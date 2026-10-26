import { Locator, Page } from "@playwright/test";
import { step } from "../helpers/test-step-decorator";
import { HelperBase } from "./helper-base";

export class NavigationPage  extends HelperBase{

    readonly formLayoutMenu: Locator
    readonly datePickerMenu: Locator
    readonly toastrMenu: Locator
    readonly tooltipMenu: Locator
    readonly smartTableMenu: Locator

    constructor(page: Page){
        super(page)
        this.formLayoutMenu = page.getByText('Form Layout')
        this.datePickerMenu = page.getByText('Datepicker')
        this.toastrMenu = page.getByText('Toastr')
        this.tooltipMenu = page.getByText('Tooltip')
        this.smartTableMenu = page.getByText('Smart Table')

    }

    @step
    async formLayoutsPage(){
        await this.selectGroupMenuItem('Forms')
        await this.formLayoutMenu.click();
    }

    @step
    async datePickerPage(){
        await this.selectGroupMenuItem('Forms')
        await this.datePickerMenu.click();
    }

    @step
    async toasterPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.toastrMenu.click();
    }

    @step
    async tooltipPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.tooltipMenu.click();
    }

    @step
    async smartTablePage(){
        await this.selectGroupMenuItem('Tables & Data')
        await this.smartTableMenu.click();
    }

    private async selectGroupMenuItem(groupMenuTitle: string){
        const groupMenuItem = this.page.getByTitle(groupMenuTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if (expandedState == 'false'){
           await groupMenuItem.click()
        }
    }
}