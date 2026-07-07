const { test, expect } = require('@playwright/test')
const LoginPage = require('../pages/LoginPage')

const credentials = [
    { email: 'testuser3@epam.com', password: 'T3st12345@' },
]

test.describe('@signup_signin - Registered user signs in with valid credentials', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.goto()
    })

    for (const { email, password } of credentials) {
        test(`signs in with [${email}]`, async ({ page }) => {
            // Use test.only on a single test to run only that one during debugging
            const loginPage = new LoginPage(page)

            // When
            await loginPage.login(email, password)

            // Then
            await expect(page).toHaveURL(/\/account/, { timeout: 12000 })
            await expect(loginPage.navMenu).not.toBeEmpty()
        })
    }

})
