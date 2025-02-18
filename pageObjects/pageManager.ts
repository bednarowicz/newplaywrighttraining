import { Page, expect } from "@playwright/test";
import {NavigationPage} from '../pageObjects/navigationpage.ts'
import { formLayoutsPage } from '../pageObjects/formLayoutsPage.ts'
import { DatepickerPage } from '../pageObjects/datepickerPage.ts'

export class PageManager{
    private readonly page: Page
    private readonly navigationPage: NavigationPage
    private readonly formLayoutsPage: formLayoutsPage
    private readonly datepickerPage: DatepickerPage

    constructor(page: Page) {
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.formLayoutsPage = new formLayoutsPage(this.page)
        this.datepickerPage = new DatepickerPage(this.page)
    }

    navigateTo(){
        return this.navigationPage
    }

    onFormLayoutsPage(){
        return this.formLayoutsPage
    }
    onDatePickerPage(){
        return this.datepickerPage
    }
}