import type { Page } from 'playwright';
import { generateToken } from 'authenticator';
import { user } from '../constants/userdata';
export class CarMovementHistoryPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async OpenCarMovementHistory() {
        await this.page.click('.MuiButtonBase-root.MuiIconButton-colorInherit');
        await this.page.click('//span[text()="История движения"]');
        
    }

    async CarMovementHistory() {
        await this.page.click('.MuiButtonBase-root.MuiIconButton-colorInherit');
        await this.page.click('//span[text()="История движения"]');
        await this.page.click('//input[@name="carNumber"]');
        await this.page.locator('//input[@name="carNumber"]').fill('183 ACD 01');
        await this.page.getByRole('button', { name: 'Поиск' }).click();
    }


}