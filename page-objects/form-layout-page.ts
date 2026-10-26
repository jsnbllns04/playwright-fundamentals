import { Page } from "playwright-core";
import { step } from "../helpers/test-step-decorator";
import { HelperBase } from "./helper-base";

export class FormLayoutPage extends HelperBase{


    constructor(page:Page) {
        super(page)
    }

    @step
    async submitUsingTheGridForm(email: string, password: string, optionText: string){
        const usingTheGridLocator = this.page.locator('nb-card', {hasText: 'Using the Grid'})

        await usingTheGridLocator.getByPlaceholder('Email').fill(email)
        await usingTheGridLocator.getByPlaceholder('Password').fill(password)
        await usingTheGridLocator.getByRole('radio', {name:optionText}).check({force:true})
        await usingTheGridLocator.getByRole('button', {name:'Sign in'}).click()
    }


    /**
     * This method submits inline form with user full name, email and remember me checkbox can be selected
     * @param name - Valid test user full name ( First and Last name )
     * @param email - Valid test user email
     * @param rememberMeCheckbox - Pass `true` to select Remember me Checkbox
     */
    @step
    async submitUsingInlineForm(name: string , email: string, rememberMeCheckbox: boolean){
        const inlineFormLocator = this.page.locator('nb-card', {hasText: 'Inline form'})

        await inlineFormLocator.getByRole('textbox', {name: 'Jane Doe'}).fill(name)
        await inlineFormLocator.getByRole('textbox', {name: 'Email'}).fill(email)
        await inlineFormLocator.getByLabel('Remember me').setChecked(rememberMeCheckbox, {force: true})
        await inlineFormLocator.getByRole('button', {name: 'Submit'}).click()
    }
}
        