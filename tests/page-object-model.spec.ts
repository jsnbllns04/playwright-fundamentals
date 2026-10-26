import { test } from '../fixtures'
import { faker } from '@faker-js/faker'


test('Navigate to form layouts', {tag: '@navigate'}, async ({pom}) => {

    await pom.navigateTo.formLayoutsPage()
    await pom.navigateTo.datePickerPage()
    await pom.navigateTo.smartTablePage()
    await pom.navigateTo.tooltipPage()
})

test('Parametrization using method', {tag: '@radio'}, async ({pom}) => {


    const randomFullName = faker.person.fullName()
    const randomEmail = faker.internet.email({provider: 'test.com'})

    await pom.navigateTo.formLayoutsPage()
    await pom.formLayoutPage.submitUsingTheGridForm(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!, 'Option 2')
    // await page.waitForTimeout(500)
    // await page.screenshot({path: 'screenshots/formLayoutPage.png'})
   
    await pom.formLayoutPage.submitUsingInlineForm(randomFullName, randomEmail, true)

    await pom.navigateTo.datePickerPage()
    await pom.datePickerPage.selectCommonDatepickerDateFromToday(50)

    await pom.datePickerPage.selectDateWithRange(0, 5)
})