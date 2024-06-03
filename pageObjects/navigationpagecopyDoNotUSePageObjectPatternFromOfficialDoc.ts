import { Locator, Page } from "@playwright/test";

export class NavigationPage {
    readonly page:Page
    readonly formLayoutsMenuItem:Locator
    readonly datePickerMenuItem: Locator
    readonly smartTableMenuItem: Locator
    readonly toastrMenuItem: Locator
    readonly tooltipMenuItem: Locator

    constructor(page: Page){
        this.page = page
        this.formLayoutsMenuItem = this.page.getByText('Form Layouts')
        this.datePickerMenuItem = this.page.getByText('Datepicker')
        this.smartTableMenuItem = this.page.getByText('Smart Table')
        this.toastrMenuItem = this.page.getByText('Toastr')
        this.tooltipMenuItem = this.page.getByText('Tooltip')
    }

    async formLayoutsPage(){
        // await this.page.getByText('Forms').click()
        await this.selectGroupMenuItem('Forms')
        await this.formLayoutsMenuItem.click()
    }
    async datePickerPage(){
        // await this.page.getByText('Forms').click()
        await this.selectGroupMenuItem('Forms')
        await this.datePickerMenuItem.click()
    }

    async smartTablePage(){
        // await this.page.getByText('Tables & data').click()
        await this.selectGroupMenuItem('Tables & data')
        await this.smartTableMenuItem.click()
    }

    async toastrPage(){
        // await this.page.getByText('Modal & Overlays').click()
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.toastrMenuItem.click()
    }

    async tooltipPage(){
        // await this.page.getByText('Modal & Overlays').click()
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.tooltipMenuItem.click()
    }

    private async selectGroupMenuItem(groupItemTitle: string){
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if(expandedState == 'false'){
            await groupMenuItem.click()
        }
    }
}