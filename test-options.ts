import {test as base} from '@playwright/test'
import { PageManager } from './pageObjects/pageManager'


export type TestOptions = {
    globalsQaURL: string
    formLayoutsPage:string
    pageManager: PageManager
}

export const test = base.extend<TestOptions>({
    globalsQaURL: ['', {option: true}],

    formLayoutsPage: async ({page}, use) => {
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        await use('') //before use is used before test
        console.log('Tear Down') // after test will be done
    },

    pageManager: async ({page, formLayoutsPage}, use) => {
        const pm = new PageManager(page)
        await use(pm)
    }


})
// use below if you want it to start for each project
// formLayoutsPage: [async ({page}, use) => {
//     await page.goto('/')
//     await page.getByText('Forms').click()
//     await page.getByText('Form Layouts').click()
//     await use('')
// }, {auto: true}],

