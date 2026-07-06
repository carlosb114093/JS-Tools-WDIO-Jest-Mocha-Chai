// @ts-check
const { test, expect } = require('@playwright/test')

const credentials = [
    { email: 'customer@practicesoftware.com', password: 'welcome01' },
    { email: 'admin@practicesoftware.com',    password: 'admin@123' },
]

for (const { email, password } of credentials) {
    test(`@signup_signin - Registered user signs in with valid credentials [${email}]`, async ({ page }) => {
        // Given
        await page.goto('/auth/login')

        // When
        await page.locator('[data-test="email"]').fill(email)
        await page.locator('[data-test="password"]').fill(password)
        await page.locator('[data-test="login-submit"]').click()

        // Then
        await expect(page).toHaveURL(/\/account/, { timeout: 12000 })
        await expect(page.locator('[data-test="nav-menu"]')).toContainText(/customer|admin/i)
    })
}
