class HomePage {
    constructor(page) {
        this.page         = page
        this.searchInput  = page.locator('[data-test="search-query"]')
        this.searchButton = page.locator('[data-test="search-submit"]')
        this.productNames = page.locator('[data-test="product-name"]')
    }

    async goto() {
        await this.page.goto('/')
    }

    async search(query) {
        const responsePromise = this.page.waitForResponse(
            res => res.url().includes('/products/search') && res.ok(),
            { timeout: 30000 }
        )
        await this.searchInput.fill(query)
        await this.searchButton.click()
        await responsePromise
    }

    async openProduct(name) {
        const link = this.page.locator('[data-test="product-name"]', { hasText: name }).first()
        await link.click()
        await this.page.waitForLoadState('domcontentloaded')
    }
}

module.exports = HomePage
