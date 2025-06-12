const {test, expect} = require('@playwright/test')
const assert = require("node:assert");

test('Register and login test', async ({page, browser}) => {
    //js file- Login js, DashboardPage
    const email = "papjez2137@gmail.com";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("!Zxcvbnm1221");
    await page.getByRole('button',{name:"Login"}).click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
        .getByRole("button",{name:"Add to Cart"}).click();

    await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();

    //await page.pause();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();

    await page.getByRole("button",{name :"Checkout"}).click();

    await page.getByPlaceholder("Select Country").pressSequentially("ind");

    await page.getByRole("button",{name :"India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();

    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
})

function getRandomEmail() {
    return Math.random().toString(36).slice(2, 7) + '@email.com';
}
