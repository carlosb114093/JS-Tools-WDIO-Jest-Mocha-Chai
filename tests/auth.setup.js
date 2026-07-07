const { test: setup, expect } = require('@playwright/test')
const LoginPage = require('../pages/LoginPage')

setup('authenticate as customer', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('testuser3@epam.com', 'T3st12345@')
    await expect(page).toHaveURL(/\/account/, { timeout: 12000 })
    await page.context().storageState({ path: 'state.json' })
})
