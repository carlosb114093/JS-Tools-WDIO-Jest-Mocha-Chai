const { expect } = require('@playwright/test')
const BasePage = require('../../core/BasePage')

class ProductPage extends BasePage {
    constructor(page) {
        super(page)
        this.productName       = page.locator('[data-test="product-name"]')
        this.unitPrice         = page.locator('[data-test="unit-price"]')
        this.description       = page.locator('[data-test="product-description"]')
        this.addToCartBtn      = page.locator('[data-test="add-to-cart"]')
        this.addToFavoritesBtn = page.locator('[data-test="add-to-favorites"]')
        this.quantityInput     = page.locator('[data-test="quantity"]')
        this.cartQuantity      = page.locator('[data-test="cart-quantity"]')
    }

    async setQuantity(quantity) {
        await this.waitForVisible(this.quantityInput, 20000)
        await this.fill(this.quantityInput, quantity)
    }

    async addToCart() {
        // WebKit: Angular may not have attached the click handler yet on first render.
        // Retry until the cart badge appears.
        await expect(async () => {
            await this.click(this.addToCartBtn)
            await this.cartQuantity.waitFor({ state: 'visible', timeout: 5000 })
        }).toPass({ timeout: 30000 })
    }
}

module.exports = ProductPage
