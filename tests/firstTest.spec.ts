import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
}
)

test('Locator syntax ', async ({page}) => {
    //by Tag name
    await page.locator('input').first().click()

    //bu id
    page.locator('#inputEmail1')

    //by Class value
    page.locator('.shape-rectangle')

    //by attribute
    page.locator('[placeholder="Email"]')
    //by full class
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition cdk-focused cdk-mouse-focused"]')

    //combine different selectors
    page.locator('input[placeholder="Email"][nbinput]')

    //xpath
    page.locator('//*[@id="inputEmail1"]')

    //by partial text match
    page.locator(':text("Using")')

    //by exact text match
    page.locator(':text-is("Using the Grid")')
})

test('User facing locators', async ({page}) => {
    await page.getByRole('textbox', {name: "Email"}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').first().click()

    await page.getByText('Using the grid').click()

    await page.getByTestId('SignIn').click()

    await page.getByTitle('IoT Dashboard').click()

})

test('locating child elements', async ({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
    await page.locator('nb-card').getByRole('button', {name: 'Sign in'}).first().click()
    await page.locator('nb-card').nth(3).getByRole('button').click()
})

test('locating parent elements', async ({page}) => {
    await page.locator('nb-card',{hasText:'Using the grid'}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card',{has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()

    await page.locator('nb-card').filter({hasText:'Basic form'}).getByRole('textbox', {name: "Email"}).click()

    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: 'Password'}).click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: 'Sign in'}).getByRole('textbox', {name: 'Email'}).click()

    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click()
})

test('reusing locators', async ({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const Email = basicForm.getByRole('textbox', {name: "Email"})
    await Email.fill("test@somemail.com")
    await basicForm.getByRole('textbox', {name: "password"}).fill("password")
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()
    await expect(Email).toHaveValue('test@somemail.com')
})

test('extracting value', async ({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    //all text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain("Option 1")

    //input value
    const emailField = basicForm.getByRole('textbox', {name: 'Email'})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual("Email")
})

test('assertions', async ({page}) => {
    //General assertions
    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')
    const value = 5
    expect(value).toEqual(5)

    const text = await basicFormButton.textContent()
    expect(text).toEqual('Submit')

    //Locator assertion
    await expect(basicFormButton).toHaveText('Submit')

    //Soft Assertion
    await expect.soft(basicFormButton).toHaveText('Submit')
    await basicFormButton.click()
})

// test.describe('test suite 1', () => {


//     test('the first test Form Layouts', async ({ page }) => {
//         await page.getByText('Form Layouts').click()
//         await page.getByText('Forms').click()
//     })

// })

// test.describe('test suite 2', () => {


//     test('the second test charts space', async ({ page }) => {
//         await page.getByText('Charts').first().click()
//     })

// })