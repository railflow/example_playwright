import {expect, test} from '@playwright/test';

const LOGIN_URL = "https://test.railflow.io/login";
test.describe("Login tests", () => {
    test('Verify login page title', async ({page}) => {
        await page.goto(LOGIN_URL);

        await expect(page).toHaveTitle("Invoice Ninja | Free Source-Available Online Invoicing");
    });

    test('User logs into home cabinet using correct user name and password', async ({page}) => {
        await page.goto(LOGIN_URL);

        await page.locator('id=email').type("sergey@railflow.io");
        await page.locator('id=password').type("myS3crEt");
        await page.locator('id=loginButton').click();

        await expect(page).toHaveURL(/.*dashboard/);
        await expect(page.locator('id=myAccountButton')).toContainText("Sergey");
    });

    test('User logs into home cabinet using incorrect user name and password', async ({page}) => {
        await page.goto(LOGIN_URL);
        await page.locator('id=email').type("test@railflow.io");
        await page.locator('id=password').type("password");
        await page.locator('id=loginButton').click();

        await expect(page).toHaveURL(LOGIN_URL);
        await expect(page.getByText("These credentials are incorrect", {
            exact: true
        })).toBeVisible();
    });
});