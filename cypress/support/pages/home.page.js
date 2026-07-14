class HomePage {
  get searchInput() { return cy.get('[data-test="search-query"]') }
  get searchButton() { return cy.get('[data-test="search-submit"]') }
  get productCards() { return cy.get('a.card') }
  productName(name) {
    // Regex de coincidencia exacta: "Claw Hammer" no debe abrir
    // "Claw Hammer with Shock Reduction Grip".
    return cy.contains('[data-test="product-name"]', new RegExp(`^\\s*${name}\\s*$`))
  }

  visit() {
    cy.visit('/')
    // La grilla de productos carga async; esperar a que haya tarjetas.
    this.productCards.should('have.length.gt', 0)
  }

  search(query) {
    // Sin método: el sitio v5 usa el método HTTP "QUERY" (no GET) para buscar.
    cy.intercept('**/products/search*').as('search')
    this.searchInput.clear().type(query)
    this.searchButton.click()
    cy.wait('@search')
    // Esperar a que Angular pinte los resultados de esa búsqueda.
    cy.get('[data-test="search-caption"]').should('contain.text', query)
  }

  openProduct(name) {
    this.search(name)
    this.productName(name).click()
  }
}

module.exports = new HomePage()
