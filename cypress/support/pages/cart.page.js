class CartPage {
  get productTitles() { return cy.get('[data-test="product-title"]') }
  get quantityInputs() { return cy.get('[data-test="product-quantity"]') }
  get linePrices() { return cy.get('[data-test="line-price"]') }

  visit() {
    cy.visit('/checkout')
  }
}

module.exports = new CartPage()
