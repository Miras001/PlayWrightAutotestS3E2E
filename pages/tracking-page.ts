import type { Page } from 'playwright';
import { generateToken } from 'authenticator';
import { user } from '../constants/userdata';
export class TrackingPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // async OpenTracking() {
    //     await this.page.click('.MuiButtonBase-root.MuiIconButton-colorInherit');
    //     await this.page.click('//span[text()="Перехват"]');
        
    // }

    async TrackingSearh() {
       await this.page.click('.MuiButtonBase-root.MuiIconButton-colorInherit');
       await this.page.click('//span[text()="Перехват"]');
       await this.page.click('//input[@name="carNumber"]');
       await this.page.locator('//input[@name="carNumber"]').fill('183 ACD 01');
       await this.page.locator('form').getByRole('button').click();
  

    
}
}