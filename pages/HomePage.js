const { expect } = require('@playwright/test')

class HomePage {
    constructor(page) {
        this.page         = page
        this.searchInput  = page.locator('[data-test="search-query"]')
        this.searchButton = page.locator('[data-test="search-submit"]')
        this.productNames = page.locator('[data-test="product-name"]')
    }

    async goto() {
        // domcontentloaded (no 'load'): en WebKit el evento load se retrasa por recursos
        // no esenciales (banner, widget de chat) y agota el goto. El wait de productos
        // garantiza que el contenido real ya esta listo.
        await this.page.goto('/', { waitUntil: 'domcontentloaded' })
        // Espera a que termine la carga inicial de productos, para que una respuesta
        // tardia de /products no sobrescriba una busqueda posterior (race real observado).
        // 30s: en WebKit el /products a veces tarda mas de lo normal.
        await this.productNames.first().waitFor({ state: 'visible', timeout: 30000 })
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
        // Espera a que la pagina de producto este lista (boton de compra visible)
        // antes de interactuar. 30s: los detalles del producto llegan por API y
        // en Firefox/WebKit a veces tardan (observado en snapshots de fallos).
        await this.page.locator('[data-test="add-to-cart"]').waitFor({ state: 'visible', timeout: 30000 })
    }
}

module.exports = HomePage
