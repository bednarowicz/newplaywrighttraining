import { test, expect } from '@playwright/test'
test.beforeEach(async ({ page }, testInfo) => {
    await page.goto(process.env.URL!)
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000)
}
)
test('auto waiting', async ({page}) => {
    test.slow()
    const successButton = page.locator('.bg-success')
    // await successButton.click()

    // const text = await successButton.textContent() //first try
    // expect(text).toEqual('Data loaded with AJAX get request.')

    // await successButton.waitFor({state: "attached"}) //second try
    // const text = await successButton.allTextContents()
    // expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successButton).toHaveText('Data loaded with AJAX get request.',{timeout: 20000})
})

test.skip('alternative waits', async ({page}) => {
    const successButton = page.locator('.bg-success')

    // wait for element
    await page.waitForSelector('.bg-success')

    // wait for particular
    // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //wait for network calls to be completed ('Not recommended')
    // await page.waitForLoadState('networkidle')

    //hardcoded wait
    //await page.waitForURL()
    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})
test.skip('timeouts', async ({page}) =>{
    test.setTimeout(25000)
    test.slow()
    const successButton = page.locator('.bg-success')
    await successButton.click({timeout: 18000})
})