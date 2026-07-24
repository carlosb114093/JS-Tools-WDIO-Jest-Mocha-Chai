const { test, expect } = require('@playwright/test')
const HomePage = require('../business/pages/HomePage')

const queries = ['Combination Pliers', 'Slip Joint Pliers']

test.describe('@search - Customer searches for exact product name', () => {

    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page)
        await homePage.goto()
    })

    for (const query of queries) {
        test(`search results match [${query}]`, async ({ page }) => {
            const homePage = new HomePage(page)

            // When
            await homePage.search(query)

            // Then
            await expect(homePage.productNames.first()).toBeVisible({ timeout: 8000 })
            await expect(homePage.productNames.first()).toContainText(query, { timeout: 8000 })
        })
    }

})
