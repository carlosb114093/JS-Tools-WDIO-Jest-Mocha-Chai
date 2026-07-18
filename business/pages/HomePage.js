const { expect } = require('@playwright/test')
const BasePage = require('../../core/BasePage')

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
        await this.fill(this.searchInput, query)
        const responsePromise = this.waitForResponse('/products/search')
        await this.click(this.searchButton)
        await responsePromise
        await this.expectText(this.productNames.first(), query)
    }

    async openProduct(name) {
        const link = this.page.locator('[data-test="product-name"]', { hasText: name }).first()
        await this.click(link)
        await this.waitForVisible(this.page.locator('[data-test="add-to-cart"]'), 30000)
    }
}

module.exports = HomePage
