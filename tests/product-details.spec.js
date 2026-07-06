// @ts-check
const { test, expect } = require('@playwright/test')

const products = ['Combination Pliers', 'Claw Hammer']

for (const product of products) {
    test(`@product_details - Customer opens product details page [${product}]`, async ({ page }) => {
        // Given
        await page.goto('/')

        // When
        await page.getByText(product, { exact: true }).first().click()

        // Then
        await expect(page.locator('[data-test="product-name"]')).toContainText(product, { timeout: 8000 })
        await expect(page.locator('[data-test="unit-price"]')).toBeVisible()
        await expect(page.locator('[data-test="product-description"]')).toBeVisible()
        await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible()
        await expect(page.locator('[data-test="add-to-favorites"]')).toBeVisible()
    })
}
