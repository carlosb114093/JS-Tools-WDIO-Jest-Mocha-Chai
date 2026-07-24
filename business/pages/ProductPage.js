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

    async waitForLoaded() {
        // Los detalles del producto llegan por API; en Firefox/WebKit pueden tardar.
        await this.waitForVisible(this.addToCartBtn, 30000)
    }

    async setQuantity(quantity) {
        await this.waitForVisible(this.quantityInput, 20000)
        await this.fill(this.quantityInput, quantity)
    }

    async addToCart() {
        // WebKit: Angular puede no tener el click handler enganchado en el primer render.
        // Se reintenta hasta que el badge del carrito aparezca.
        await this.retry(async () => {
            await this.click(this.addToCartBtn)
            await this.waitForVisible(this.cartQuantity, 5000)
        })
    }
}

module.exports = ProductPage
