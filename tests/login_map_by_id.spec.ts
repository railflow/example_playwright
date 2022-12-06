import {expect, test} from '@playwright/test';

const LOGIN_URL = "https://test.railflow.io/login";
test.describe("Login tests", () => {
    test('User logs into home cabinet using correct user name and password', async ({page}) => {
        test.info().annotations.push(
            {type: 'testrail.id', description: '1825'},
            {type: 'testrail.id', description: 'C1826'}
        )
        await page.goto(LOGIN_URL);

        await page.locator('id=email').type("sergey@railflow.io");
        await page.locator('id=password').type("myS3crEt");
        await page.locator('id=loginButton').click();

        await expect(page).toHaveURL(/.*dashboard/);
        await expect(page.locator('id=myAccountButton')).toContainText("Sergey");
    });
});