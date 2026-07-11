const { expect } = require('@playwright/test')

class ProductPage {
    constructor(page) {
        this.page             = page
        this.productName      = page.locator('[data-test="product-name"]')
        this.unitPrice        = page.locator('[data-test="unit-price"]')
        this.description      = page.locator('[data-test="product-description"]')
        this.addToCartBtn     = page.locator('[data-test="add-to-cart"]')
        this.addToFavoritesBtn = page.locator('[data-test="add-to-favorites"]')
        this.quantityInput    = page.locator('[data-test="quantity"]')
        this.cartQuantity     = page.locator('[data-test="cart-quantity"]')
    }

    async setQuantity(quantity) {
        await this.quantityInput.waitFor({ state: 'visible', timeout: 20000 })
        await this.quantityInput.fill(quantity)
    }

    async addToCart() {
        // Reintento: en WebKit el primer click a veces cae antes de que Angular
        // enganche el handler (pagina visible pero no interactiva) y se pierde.
        // Si el badge no aparece, se vuelve a clickear hasta que aparezca.
        await expect(async () => {
            await this.addToCartBtn.click()
            await this.cartQuantity.waitFor({ state: 'visible', timeout: 5000 })
        }).toPass({ timeout: 30000 })
    }
}

module.exports = ProductPage
