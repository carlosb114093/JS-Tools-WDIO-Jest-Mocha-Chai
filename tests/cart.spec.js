// @ts-check
const { test, expect } = require('@playwright/test')

const cases = [
    { product: 'Combination Pliers', quantity: '3' },
    { product: 'Claw Hammer',        quantity: '2' },
]

for (const { product, quantity } of cases) {
    test(`@basket - Customer adds product to basket and changes quantity [${product} x${quantity}]`, async ({ page }) => {
        // Given
        await page.goto('/')
        await page.getByText(product, { exact: true }).first().click()

        // When
        await page.locator('[data-test="quantity"]').fill(quantity)
        await page.locator('[data-test="add-to-cart"]').click()

        // Then
        await expect(page.locator('[data-test="cart-quantity"]')).toHaveText(quantity, { timeout: 8000 })
    })
}
