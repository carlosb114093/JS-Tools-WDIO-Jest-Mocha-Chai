const { test: setup, expect, request } = require('@playwright/test')
const LoginPage = require('../pages/LoginPage')
const { TEST_EMAIL, TEST_PASSWORD } = require('./credentials')

setup('authenticate as customer', async ({ page }) => {
    const api = await request.newContext({ baseURL: 'https://api.practicesoftwaretesting.com' })
    await api.post('/users/register', {
        data: {
            first_name: 'Test',
            last_name: 'User',
            dob: '1990-01-01',
            country: 'NL',
            postcode: '1234AB',
            house_number: '1',
            street: 'Test Street',
            city: 'Test City',
            state: 'Test State',
            phone: '3001234567',
            email: TEST_EMAIL,
            password: TEST_PASSWORD,
        }
    })
    await api.dispose()

    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login(TEST_EMAIL, TEST_PASSWORD)
    await expect(page).toHaveURL(/\/account/, { timeout: 12000 })
    await page.context().storageState({ path: 'state.json' })
})
