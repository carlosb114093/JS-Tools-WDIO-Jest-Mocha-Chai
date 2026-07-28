const { test, expect } = require('@playwright/test')
const LoginPage = require('../business/pages/LoginPage')
const { TEST_EMAIL, TEST_PASSWORD } = require('./credentials')

const credentials = [
    { email: TEST_EMAIL, password: TEST_PASSWORD },
]

test.describe('@signup_signin - Registered user signs in with valid credentials', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.goto()
    })

    for (const { email, password } of credentials) {
        test(`signs in with [${email}]`, async ({ page }) => {
            const loginPage = new LoginPage(page)

            await loginPage.login(email, password)

            await expect(page).toHaveURL(/\/account/, { timeout: 12000 })
            await expect(loginPage.navMenu).not.toBeEmpty()
        })
    }

})
