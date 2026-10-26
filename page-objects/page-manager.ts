import { NavigationPage } from '../page-objects/navigation-page'
import { FormLayoutPage } from '../page-objects/form-layout-page'
import { DatePickerPage } from '../page-objects/datepicker-page'
import { Page } from 'playwright/test'

export class PageManager {
    
    readonly navigateTo: NavigationPage
    readonly formLayoutPage: FormLayoutPage
    readonly datePickerPage: DatePickerPage

    constructor(page: Page){
        this.navigateTo = new NavigationPage(page)
        this.formLayoutPage = new FormLayoutPage(page)
        this.datePickerPage = new DatePickerPage(page)

    }
}