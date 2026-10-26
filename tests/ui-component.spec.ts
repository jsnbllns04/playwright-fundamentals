import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/');
});

test.describe('Form Layouts', () => {
    test.describe.configure({retries: 2})

    test.beforeEach(async ({ page }, testInfo) => {
        if(testInfo.retry){
            //clean test data
        }

        await page.getByText('Forms').click();
        await page.getByText('Form Layout').click();
    });

    test('Input fields', async ({ page }) => {
        const gridEmailInput = page.locator('nb-card', { hasText: 'Using the Grid' }).getByPlaceholder('Email');
        await gridEmailInput.fill('jsnbllns@gmail.com');
        await gridEmailInput.clear();
        await gridEmailInput.pressSequentially('123@gmail.com', {delay: 100});

        //extract value
        const inputValue = await gridEmailInput.inputValue();
        await expect(gridEmailInput).toHaveValue('123@gmail.com');
        await expect(gridEmailInput).toHaveValue(/gmail.com/);

    })

    test('Radio buttons', async ({ page }) => {
        const gridForm = page.locator('nb-card', { hasText: 'Using the Grid' });
        await gridForm.getByRole('radio', { name: 'Option 1' }).check({force: true});

        await expect(gridForm.getByRole('radio', { name: 'Option 1' })).toBeChecked();
        await expect(gridForm.getByRole('radio', { name: 'Option 2' })).not.toBeChecked();
    })
})

test.describe('Modal & Overlays', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Modal & Overlays').click();
        await page.getByText('Toastr').click();
    })

    test('Checkbox', async ({ page }) => {
        await page.getByRole('checkbox', { name : 'Hide on click' }).uncheck({force: true});

        const allCheckbox = page.getByRole('checkbox');
        for (const box of await allCheckbox.all()) {
            await box.uncheck({force: true});
            await expect(box).not.toBeChecked();
        }
    })

    test('List and Dropdown', async ({ page }) => {
        //standard select dropdown
        await page.getByRole('combobox').selectOption('info');
        await expect(page.getByRole('combobox')).toHaveValue('info');

        //custom dropdown
        await page.locator('.form-group', { hasText: 'Position'}).locator('nb-select').click();
        //option 1
        await page.getByRole('list').getByText('bottom-right').click();

        await expect(page.getByRole('button', {name: 'bottom-right'})).toHaveText('bottom-right')

        //looping through all values
        const dropDownPosition = page.locator('.form-group', { hasText: 'Position'}).locator('nb-select')
        await dropDownPosition.click()

        const allDropDownValues = await page.locator('nb-option').allTextContents()
        for (const value of allDropDownValues){
            await page.locator('nb-option', { hasText : value}).click()
            await expect(dropDownPosition).toHaveText(value)
            await dropDownPosition.click()
        }
    })

    test('Tooltips', async ({ page }) => {
        await page.getByText('Tooltip').click()
        
        await page.getByRole('button', {name : 'Top'}).hover()
        await expect(page.getByRole('tooltip')).toHaveText('This is a tooltip')
    })

})

test.describe('Tables & Data', () => {

    test.beforeEach( async ({ page }) => {
        await page.getByText('Tables & Data').click()
        await page.getByText('Smart Table').click()

        page.on('dialog', dialog => {
            expect(dialog.message()).toEqual('Are you sure you want to delete?')
            dialog.accept()
        })
    })

    test('Smart table', async ({ page }) => {
        await page.locator('tr', {hasText : 'mdo@gmail.com'}).locator('.nb-trash').click()
        await expect(page.locator('tr', {hasText : 'mdo@gmail.com'})).not.toBeVisible()


        //how to select row by any visible text
        const tableRowByEmail = page.getByRole('row', {name: 'fat@yandex.ru'})
        await tableRowByEmail.locator('.nb-edit').click()
        await tableRowByEmail.getByPlaceholder('First Name').fill('Jason')
        await tableRowByEmail.locator('.nb-checkmark').click()
        await expect(tableRowByEmail.locator('td').nth(2)).toHaveText('Jason')

        //get row by a specific column value
        const tableRowById = page.getByRole('row').filter({has: page.getByRole('cell').nth(1).getByText('11')})
        await tableRowById.locator('.nb-edit').click()
        await page.locator('tbody').getByPlaceholder('Username').fill('@jason')
        await page.locator('td').locator('.nb-checkmark').click()
        await expect(tableRowById.locator('td').nth(4)).toHaveText('@jason')


        // 3 loop through table rows

        const ages = ['20', '30', '40', '200']

        for (const age of ages) {
            await page.getByPlaceholder('Age').fill(age)
 
            if ( age == '200') {
                await expect(page.locator('tbody')).toHaveText('No data found')
            } else {
                await expect(page.locator('tbody tr').first().locator('td').last()).toHaveText(age)
                const allTableRows = await page.locator('tbody tr').all()
                for (const row of allTableRows) {
                    await expect(row.locator('td').last()).toHaveText(age)
                }
            }
        } 
    })      
})

test('Datepicker' , async ({page}) => {
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click()

    const calendarInputField = page.getByPlaceholder('Form Picker')
    await calendarInputField.click()


    const date = new Date();
    date.setDate(date.getDate() + 50)
    const expectedDay = date.getDate().toString()
    const expectedMonth = date.toLocaleString('En-US', {month:'short'})
    const expectedMonthLong = date.toLocaleString('En-US', {month:'long'})
    const expectedYear = date.getFullYear()

    const expectedDate = `${expectedMonth} ${expectedDay}, ${expectedYear}`

    let currentMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`
    while(!currentMonthAndYear?.includes(expectedMonthAndYear)){
        await page.locator('.next-month').click()
        currentMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    }

    await page.locator('.day-cell:not(.bounding-month)').getByText(expectedDay, {exact:true}).click()
    await expect(calendarInputField).toHaveValue(expectedDate)


    await page.getByRole('textbox', { name: 'Range Picker' }).click();
    await page.getByText('20', { exact: true }).click();
    await page.getByRole('button').nth(4).click();
    await page.getByText('24').click();

})

test('Dashboard', async ({page}) => {
    await page.goto('https://playground.bondaracademy.com/pages/iot-dashboard')

    // //1 setting the attribue values
    // const tempGauge =  page.locator('svg > g > circle').first()
    // await tempGauge.evaluate ( element => {
    //     element.setAttribute('cx', '232.630')
    //     element.setAttribute('cy', '232.630')
    // })
    // await tempGauge.click()

    //bounding box
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await tempBox.scrollIntoViewIfNeeded()

    const box = await tempBox.boundingBox()
    if (!box) throw new Error('Temperature dragger is not visible');

    const x = box?.x + box?.width / 2
    const y = box?.y + box?.height / 2
    await page.mouse.move(x, y)
    await page.mouse.down()
    await page.mouse.move(x+100, y)
    await page.mouse.move(x+100, y+100)
    await page.mouse.up()
    await expect(tempBox).toContainText('30')
})

test('Iframes', async ({page}) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Dialog').click()

    const frameLocator = page.frameLocator('[data-cy="esc-close-iframe"]')

    await frameLocator.getByRole('button', {name:'Open Dialog with esc close'}).click()

    await page.getByRole('button', {name:'Dismiss Dialog'}).click()
})

test('Drag & drop', async ({page}) => {
    await page.getByText('Extra Components').click();
    await page.getByText('Drag & Drop').click()

    await page.getByText('Get groceries').dragTo(page.locator('#drop-list'))

    await page.getByText('Feed the dog').hover()
    await page.mouse.down()
    await page.locator('#drop-list').hover()
    await page.mouse.up()

    await expect(page.locator('#drop-list')).toContainText('Feed the dog')
})

