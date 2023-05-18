import { test, expect } from '@playwright/test';
import { user } from '../constants/userdata';
import { HomePage } from '../pages/home-page';
import { LoginPage } from '../pages/login-page';
import { CarMovementHistoryPage } from '../pages/car-movement-history-page';
import { generateToken } from 'authenticator';
import {faker} from 'Faker';
import path from 'path';



 //Проверить переход в раздел История движения 
 test('Open Car Movement History.spec.ts', async ({ page }) => {
    const homepage = new HomePage(page);
     
    await homepage.open();
    await new LoginPage(page).authLoginAutentificator(user.login, user.password)
    await new CarMovementHistoryPage(page).OpenCarMovementHistory()
    await expect(page).toHaveURL('https://dev.sergek.kz/car-movement-history');
  });
 
  //Проверить поиск по номеру историю движения ТС 
 test('Open Car Movement History Search', async ({ page }) => {
    const homepage = new HomePage(page);
     
    await homepage.open();
    await new LoginPage(page).authLoginAutentificator(user.login, user.password)
    await new CarMovementHistoryPage(page).CarMovementHistory()
    const [response] = await Promise.all([
        page.waitForResponse('**/api/main/v2/reports/car-movement-history?fromDate=2023-05-15T18:00:00.000Z&toDate=2023-05-16T07:21:40.486Z&carNumber=183ACD01'),
        
]);
 });
