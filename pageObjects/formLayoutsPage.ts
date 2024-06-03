import { Page } from "@playwright/test"
import test from "node:test"
import { HelperBase } from "./helperBase"

export class formLayoutsPage extends HelperBase {
    constructor(page: Page) {
        super(page)
    }

    async submitUsingTheGridFormWIthCredentailsAndSelectOption(email: string, password: string, optionText: string) {
        const usingTheGridForm = this.page.locator('nb-card', { hasText: "Using the Grid" })
        await usingTheGridForm.getByRole('textbox', { name: "Email" }).fill(email)
        await usingTheGridForm.getByRole('textbox', { name: "Password" }).fill(password)
        await usingTheGridForm.getByRole('radio', { name: optionText }).check({ force: true })
        await usingTheGridForm.getByRole('button').click()

    }
    /**
     * 
     * @param name should be first and last name
     * @param email valid email for the test
     * @param rememberMe if user should be remembered
     */

    async submitInLIneForWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean) {
        const InlineForm = this.page.locator('nb-card', { hasText: "Inline form" })
        await InlineForm.getByRole('textbox', { name: "Jane doe" }).fill(name)
        await InlineForm.getByRole('textbox', { name: "Email" }).fill(email)
        if (rememberMe) {
            await InlineForm.getByRole('checkbox').check({ force: true })
        }
        await InlineForm.getByRole('button').click()
    }
}
