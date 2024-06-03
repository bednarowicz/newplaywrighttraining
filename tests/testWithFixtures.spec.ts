import { test } from '../test-options.ts'
import {faker} from '@faker-js/faker'



test('parametrized methods', async ({pageManager}) => {
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    // await pageManager.navigateTo().formLayoutsPage()
    await pageManager.onFormLayoutsPage().submitUsingTheGridFormWIthCredentailsAndSelectOption(process.env.USERMAIL!, process.env.PASSWORD!, 'Option 1')
    await pageManager.onFormLayoutsPage().submitInLIneForWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
})