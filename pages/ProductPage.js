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
        await this.addToCartBtn.click({ force: true })
    }
}

module.exports = ProductPage
