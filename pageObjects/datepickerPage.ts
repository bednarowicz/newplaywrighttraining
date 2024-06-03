import { Page, expect} from "@playwright/test"
import { HelperBase } from "./helperBase"

export class DatepickerPage extends HelperBase{

    constructor(page: Page){
        super(page)
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday:number){

        const calendarInputField = this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click()
        const dateToAssert = await this.selectDateInTheCalednar(numberOfDaysFromToday)
        await expect(calendarInputField).toHaveValue(dateToAssert)

    }

    async selectDatePickerWithRangeFromToday(startDayFromToday: number, endDayFromToday: number){
        const calendarInputField = this.page.getByPlaceholder('Range Picker')
        await calendarInputField.click()
        const dateToAssertEarlier = await this.selectDateInTheCalednar(startDayFromToday)
        const dateToAssertLater = await this.selectDateInTheCalednar(endDayFromToday)
        await expect(calendarInputField).toHaveValue(dateToAssertEarlier + " - " + dateToAssertLater)

    }

    private async selectDateInTheCalednar(numberOfDaysFromToday){
        
        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromToday)
        const expectedDate = date.getDate().toString()
        const expectedMonthShort = date.toLocaleString('En-US',{month:'short'})
        const expectedMonthLong = date.toLocaleString('En-US',{month:'long'})
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
    
        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`
        while(!calendarMonthAndYear!.includes(expectedMonthAndYear)){
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }
    
        await this.page.locator('.day-cell.ng-star-inserted', {hasNot: this.page.locator('.bounding-month')}).getByText(expectedDate, {exact: true}).click() // has not does not exlude locators with class .bounding-month, should be corrected

        return dateToAssert
    }
}