const BasePage = require('../../core/BasePage')
const ProductPage = require('./ProductPage')

class HomePage extends BasePage {
    constructor(page) {
        super(page)
        this.searchInput  = page.locator('[data-test="search-query"]')
        this.searchButton = page.locator('[data-test="search-submit"]')
        this.productNames = page.locator('[data-test="product-name"]')
    }

    async goto() {
        await this.navigate('/')
        // Wait for initial product load to avoid race with subsequent searches
        await this.waitForVisible(this.productNames.first(), 30000)
    }

    async search(query) {
        // WebKit: Angular puede no tener el binding del input listo aun;
        // si la busqueda no dispara la peticion, se reintenta el ciclo completo.
        await this.retry(async () => {
            await this.fill(this.searchInput, query)
            const responsePromise = this.waitForResponse('/products/search', 5000)
            await this.click(this.searchButton)
            await responsePromise
        })
        await this.expectText(this.productNames.first(), query)
    }

    async openProduct(name) {
        const link = this.page.locator('[data-test="product-name"]', { hasText: name }).first()
        await this.click(link)
        const productPage = new ProductPage(this.page)
        await productPage.waitForLoaded()
        return productPage
    }
}

module.exports = HomePage
