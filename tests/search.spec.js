// @ts-check
const { test, expect } = require('@playwright/test')

const queries = ['Combination Pliers', 'Slip Joint Pliers']

for (const query of queries) {
    test(`@search - Customer searches for exact product name [${query}]`, async ({ page }) => {
        // Given
        await page.goto('/')

        // When
        await page.locator('[data-test="search-query"]').fill(query)
        await page.locator('[data-test="search-submit"]').click()

        // Then
        const results = page.locator('[data-test="product-name"]')
        await expect(results.first()).toBeVisible({ timeout: 8000 })

        const count = await results.count()
        for (let i = 0; i < count; i++) {
            await expect(results.nth(i)).toContainText(query)
        }
    })
}
