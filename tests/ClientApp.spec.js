const {test, expect} = require('@playwright/test')
const assert = require("node:assert");

test('Register and login test', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const registerHereButton = page.locator('.text-reset');
    const firstName = page.locator('#firstName');
    const lastName = page.locator('#lastName');
    const email = page.locator('#userEmail');
    const phoneNumber = page.locator('#userMobile');
    const occupation = page.locator('//select[@formcontrolname=\'occupation\']');
    const genderButtons = page.locator('//input[@formcontrolname=\'gender\']');
    const password = page.locator('#userPassword');
    const confirmPassword = page.locator('#confirmPassword');
    const ageConfirmation = page.locator('//input[@type=\'checkbox\']');
    const registerButton = page.locator('#login');
    const accountCreated = page.getByText('Account Created Successfully');
    const loginButton = page.getByText('login');
    const firstItem = page.locator('//div/h5/b').nth(0);

    const addToCartZaraCoatButton = page.locator("(//div//div//button)[2]");
    const cartButton = page.locator("(//button[contains(text(),'Cart')])[1]");
    const itemNumber = page.locator(".itemNumber:nth-of-type(1)");
    const checkoutButton = page.locator("//button[text() = 'Checkout']");
    const creditCardNumberInput = page.locator("//div[text()='Credit Card Number ']/../input");
    const expiryMonth = page.locator('.input.ddl').nth(0);
    const expiryYear = page.locator('.input.ddl').nth(1);

    const cvvCode = page.locator('input.txt').nth(1);
    const couponInput = page.locator('input.txt').nth(3);
    const couponButton = page.locator('//button[text()="Apply Coupon"]');
    const couponAppliedMessage = page.locator('//form//div//div//p');
    const emailLabel = page.locator('//div//label');
    const countryInput = page.locator('input.txt').nth(5);
    const countrySearchResult = page.locator('//div//section//button');
    const placeOrder = page.locator('.action__submit');
    const listOfItems = page.locator('tbody tr');

    const ordersHistory = page.locator('//label[text()= " Orders History Page "]');


    // const emailValue = getRandomEmail();
    // let passwordValue = '!Zxcv1221';
    //
    // await registerHereButton.click();
    // await firstName.fill('Abra');
    // await lastName.fill('Kura');
    // await email.fill(emailValue);
    // await phoneNumber.fill('1234567890');
    // await occupation.selectOption('Student');
    // await genderButtons.nth(0).check();
    // await password.fill(passwordValue);
    // await confirmPassword.fill(passwordValue);
    // await ageConfirmation.check();
    // await registerButton.click();
    //
    // await expect(accountCreated).toBeVisible();
    //
    // await loginButton.click();

    const emailValue = 'papjez2137@gmail.com';
    const passwordValue = '!Zxcvbnm1221'

    await email.fill(emailValue);
    await password.fill(passwordValue);
    await loginButton.click();

    await expect(firstItem).toContainText('ZARA COAT 3')

    await page.waitForLoadState('networkidle')

    // await page.locator(".card-body b").waitFor();

    await addToCartZaraCoatButton.click();
    await cartButton.click();
    await expect(itemNumber).toContainText('#67a8dde5c0d3e6622a297cc8');
    await checkoutButton.click();

    await creditCardNumberInput.fill("4246 321 5284 3200");
    await expiryMonth.selectOption('05');
    await expiryYear.selectOption('28');
    await cvvCode.fill('205');
    await couponInput.fill('rahulshettyacademy');
    await couponButton.click();

    await expect(couponAppliedMessage).toContainText('* Coupon Applied');
    await expect(emailLabel).toContainText(emailValue);
    await countryInput.pressSequentially('Poland');
    await countrySearchResult.click();
    await placeOrder.click();

    const orderNumber = await page.locator('//label[@class = "ng-star-inserted"]').textContent();

    const byText = page.getByText(orderNumber.replaceAll(' | ', ''));
    await ordersHistory.click();
    await page.pause();
    await ordersHistory.locator(byText).click()

})

function getRandomEmail() {
    return Math.random().toString(36).slice(2, 7) + '@email.com';
}
