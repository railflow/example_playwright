import {expect, Page, test} from '@playwright/test';

const LOGIN_URL = "https://test.railflow.io/login";
test.describe("Login tests", () => {
    test('Verify login page title', async ({page}) => {
        await navigateToLogin(page);
        await test.step("Verify page title", async () => {
            await expect(page).toHaveTitle("Invoice Ninja | Free Source-Available Online Invoicing");
        });
    });

    test('User logs into home cabinet using correct user name and password', async ({page}) => {
        await navigateToLogin(page);
        await login(page, "sergey@railflow.io", "myS3crEt");

        await test.step("Verify dashboard opened", async () => {
            await expect(page).toHaveURL(/.*dashboard/);
            await expect(page.locator('id=myAccountButton')).toContainText("Sergey");
        });
    });

    test('User logs into home cabinet using incorrect user name and password', async ({page}) => {

        await navigateToLogin(page);
        await login(page, "test@railflow.io", "password");

        await test.step("Verify dashboard opened", async () => {
            await expect(page).toHaveURL(LOGIN_URL);
            await expect(page.getByText("These credentials are incorrect", {
                exact: true
            })).toBeVisible();
        });
    });
});

async function navigateToLogin(page: Page) {
    await test.step("Navigate to " + LOGIN_URL, async () => {
        await page.goto(LOGIN_URL);
    });
}

async function login(page: Page, user: string, password: string) {
    await test.step("Log into application", async () => {
        await page.locator('id=email').type(user);
        await page.locator('id=password').type(password);
        await page.locator('id=loginButton').click();
    });
}