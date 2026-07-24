const { test, expect } = require('@playwright/test')
const HomePage = require('../business/pages/HomePage')

const products = ['Combination Pliers', 'Claw Hammer']

test.describe('@product_details - Customer opens product details page', () => {

    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page)
        await homePage.goto()
    })

    for (const product of products) {
        test(`loads details for [${product}]`, async ({ page }) => {
            const homePage = new HomePage(page)

            // When
            const productPage = await homePage.openProduct(product)

            // Then
            await expect(productPage.productName).toContainText(product, { timeout: 15000 })
            await expect(productPage.unitPrice).toBeVisible()
            await expect(productPage.description).toBeVisible()
            await expect(productPage.addToCartBtn).toBeVisible()
            await expect(productPage.addToFavoritesBtn).toBeVisible()
        })
    }

})
