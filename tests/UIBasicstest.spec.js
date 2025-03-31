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

    console.log(await cardTitles.nth(0).textContent())

    console.log(await cardTitles.allTextContents())
})


test('UI Controls', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const passwordField = page.locator('#password');
    const signInButton = page.locator('#signInBtn');
    const documentLink = page.locator("[href*='documents-request']")
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class", "blinkingText");
    // await page.pause();

});

test.only('Child window', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const documentLink = page.locator("[href*='documents-request']")
    const [newPage] = await Promise.all([context.waitForEvent('page'), await documentLink.click()])

    let text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(text)
    await userName.fill(domain);
});
