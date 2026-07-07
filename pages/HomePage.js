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
        await this.searchButton.click()
    }

    async openProduct(name) {
        await this.page.getByText(name, { exact: true }).first().click()
    }
}

module.exports = HomePage
