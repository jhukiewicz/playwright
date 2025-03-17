const {test, expect} = require('@playwright/test')

test('Browser Context Playwright test', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const passwordField = page.locator('#password');
    const signInButton = page.locator('#signInBtn');
    const wrongUsername = "rahulshetty";
    const password = "learning";
    const correctUsername = "rahulshettyacademy";
    const cardTitles = page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    console.log(await page.title());

    await userName.fill(wrongUsername);
    await passwordField.fill(password);
    await signInButton.click();

    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    await userName.fill(correctUsername);
    await passwordField.fill(password)
    await signInButton.click();

    await cardTitles.nth(0)

})

test('Page Playwright test', async ({page}) => {
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle('Google')
})