import {test, expect} from '@playwright/test';

test('Playwright special locators', async ({page}) => {
    await page.goto("https://rahylshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();


})
