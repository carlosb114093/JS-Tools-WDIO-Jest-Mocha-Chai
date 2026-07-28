const { test, expect } = require('@playwright/test')
const HomePage = require('../business/pages/HomePage')

const cases = [
    { product: 'Combination Pliers', quantity: '3' },
    { product: 'Claw Hammer',        quantity: '2' },
]

test.describe('@basket - Customer adds product to basket and changes quantity', () => {

    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page)
        await homePage.goto()
    })

    for (const { product, quantity } of cases) {
        test(`adds [${product}] with quantity ${quantity}`, async ({ page }) => {
            const homePage = new HomePage(page)

            const productPage = await homePage.openProduct(product)

            await productPage.setQuantity(quantity)
            await productPage.addToCart()

            await expect(productPage.cartQuantity).toHaveText(quantity, { timeout: 15000 })
        })
    }

})
