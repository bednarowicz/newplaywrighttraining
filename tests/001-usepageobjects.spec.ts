import { test, expect } from '@playwright/test'
import { PageManager } from '../pageObjects/pageManager.ts'
import {faker} from '@faker-js/faker'

// due to prefix 001 will be started first

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test('navigate to form page @smoke @reggresion', async ({page}) => {
    const pageManager = new PageManager(page)
    await pageManager.navigateTo().formLayoutsPage()
    await pageManager.navigateTo().datePickerPage()
    await pageManager.navigateTo().smartTablePage()
    await pageManager.navigateTo().toastrPage()
    await pageManager.navigateTo().tooltipPage()
})

test('parametrized methods', async ({page}) => {
    const pageManager = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    await pageManager.navigateTo().formLayoutsPage()
    await pageManager.onFormLayoutsPage().submitUsingTheGridFormWIthCredentailsAndSelectOption(process.env.USERMAIL!, process.env.PASSWORD!, 'Option 1')
    await page.screenshot({path: 'screenshots/formLayoutsPage.png'})
    const buffer = await page.screenshot()
    console.log(buffer.toString('base64'))
    await pageManager.onFormLayoutsPage().submitInLIneForWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
    await page.locator('nb-card', {hasText:"Inline form"}).screenshot({path:'screenshots/inlineForm.png'})
    // await pageManager.navigateTo().datePickerPage()
    // await pageManager.onDatePickerPage().selectCommonDatePickerDateFromToday(23)
    // await pageManager.onDatePickerPage().selectDatePickerWithRangeFromToday(20,24)
})