import { test, expect } from '@playwright/test';
import { user } from '../constants/userdata';
import { HomePage } from '../pages/home-page';
import { LoginPage } from '../pages/login-page';
import { TrackingPage } from '../pages/tracking-page';
import { generateToken } from 'authenticator';
import {faker} from 'Faker';
import path from 'path';
//  //Проверить переход в раздел Перехват 
//  test('Open Tracking', async ({ page }) => {
//     const homepage = new HomePage(page);
     
//     await homepage.open();
//     await new LoginPage(page).authLoginAutentificator(user.login, user.password)
//     await new TrackingPage(page).OpenTracking()
//     await expect(page).toHaveURL('https://dev.sergek.kz/tracking');
//   });
 
  //Проверить поиск перехвата ТС по ГРНЗ
  test('Tracking Search', async ({ page }) => {
    const homepage = new HomePage(page); 
    await homepage.open();
    await new LoginPage(page).authLoginAutentificator(user.login, user.password);
    await new TrackingPage(page).TrackingSearh();
    await page.waitForTimeout(5000); // Добавляем задержку, чтобы дать время на установку соединения
  
    const socketUrl = 'wss://dev.sergek.kz/main/socket.io/?EIO=3&transport=websocket';
    const eventName = 'event:onEvent';
    const socket = new WebSocket(socketUrl);
  
    await new Promise((resolve) => {
      socket.addEventListener('open', () => {
        console.log('WebSocket connection established');
        resolve();
      });
    });
  
    const messagePromise = page.waitForEvent('websocket', (event) => {
      return event.url() === 'wss://dev.sergek.kz/main/socket.io/?EIO=3&transport' && event.type() === 'websocket';
    });
  
    const message = await new Promise((resolve) => {
      socket.addEventListener('message', (event) => {
        const message = JSON.parse(event.data);
        console.log(message);
        expect(message.text()).toBe('183ACD01');
        if (message.cameraId === 6745 && message.carNumber === '183ACD01') {
          socket.close();
          resolve(message);
        }
      });
    });
  
    await Promise.all([
      messagePromise,
      new Promise((resolve) => {
        setTimeout(() => {
          socket.close();
          resolve();
        }, 20000);
      }),
    ]);
  });