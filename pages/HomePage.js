const { expect } = require('@playwright/test')

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
        // Espera a que la grilla se re-renderice con el resultado (evita leer la lista anterior)
        await expect(this.productNames.first()).toContainText(query, { timeout: 15000 })
    }

    async openProduct(name) {
        const link = this.page.locator('[data-test="product-name"]', { hasText: name }).first()
        await link.click()
        await this.page.waitForLoadState('domcontentloaded')
    }
}

module.exports = HomePage
