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
        await this.searchInput.fill(query)
        const responsePromise = this.page.waitForResponse(
            res => res.url().includes('/products/search') && res.status() === 200
        )
        await this.searchButton.click()
        await responsePromise
    }

    async openProduct(name) {
        const link = this.page.getByText(name, { exact: true }).first()
        await link.scrollIntoViewIfNeeded()
        await link.click({ force: true })
        await this.page.waitForLoadState('domcontentloaded')
    }
}

module.exports = HomePage
