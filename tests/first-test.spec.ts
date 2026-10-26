import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/');
    await page.getByText('Forms ').click();
        await page.getByText('Form Layouts').click();
})

test('Fill up inline form', async ({ page }) => {
    await page.locator('input[placeholder="Jane Doe"]').fill('John Doe');
    await page.locator('input[placeholder="Email"]').first().fill('johndoe@example.com');
    await page.getByText('Remember me').first().click();
})

test('User visible locators', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign in' }).first().click();
    await page.getByRole('textbox', { name: 'Email' }).first().fill('johndoe@example.com');

    await page.getByLabel('Email').first().fill('johndoe@example.com');

    await page.getByPlaceholder('Jane Doe').first().fill('John Doe');

    await page.getByText('Remember me').first().click();

    await page.getByTestId('inputEmail1').fill('jason@gmail.com');

    await page.getByTitle('Iot Dashboard').click();
})

test('Locating child elements', async ({ page }) => {
    await page.locator('nb-card nb-radio-group :text-is("Option 2")').click();

    await page.locator('nb-card').getByRole('button', { name: 'Sign in' }).first().click();

    await page.locator('nb-card').nth(3).getByRole('button', { name: 'Submit' }).click();

})

test('Locating parent elements', async ({ page }) => {
    await page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('button').click();
    await page.locator('nb-card', { has : page.locator('#exampleInputEmail1')}).getByRole('button').click();
    await page.locator('nb-card')
    .filter({ has : page.locator('nb-checkbox')})
    .filter({ hasText: 'Sign in'})
    .getByPlaceholder('Email').fill('johndoe@example.com');
})

test('Reusing Locators', async ({ page }) => {
    const basicForm = page.locator('nb-card', { hasText: 'Basic Form' });

    await basicForm.getByLabel('Email').fill('jason@gmail.com');
    await basicForm.getByLabel('Password').fill('123pwd');
    await basicForm.getByText('Check me out').click();
    await basicForm.getByRole('button').click();

    await expect(basicForm.getByLabel('Email')).toHaveValue('jason@gmail.com');
})

test ('Extracting values from the DOM', async ({ page }) => {
    //extracting text content from the DOM
    const basicForm = page.locator('nb-card', { hasText: 'Basic Form' });
    const submitButtonText = await basicForm.getByRole('button').textContent();

    expect(submitButtonText).toEqual('Submit');

    //extracting multiple text content from the DOM
    const allRadioButtons = await page.locator('nb-radio').allTextContents();
    expect(allRadioButtons).toEqual(['Option 1', 'Option 2', 'Disabled Option']);

    //how to extract input values from the DOM
    const emailField = basicForm.getByLabel('Email');
    await emailField.fill('jason@gmail.com');
    const emailFieldValue = await emailField.inputValue();

    //extracting attributes from the DOM
    const emailFieldAttribute = await emailField.getAttribute('placeholder');
    console.log('Email field placeholder attribute: ', emailFieldAttribute);
})

test('Assertions', async ({ page }) => {
    const basicFormButton = page.locator('nb-card', { hasText: 'Basic Form' }).getByRole('button');

    //generic assertions
    const value = 5;
    expect(value).toBe(5);

    const basicFormButtonText = await basicFormButton.textContent();
    expect(basicFormButtonText).toEqual('Submit');

    //locator assertion
    await expect(basicFormButton).toHaveText('Submit');

    //soft assertion, it will continue executing the test even if the assertion fails, and will report all failures at the end of the test
    await expect.soft(basicFormButton).toHaveText('Submit');
})