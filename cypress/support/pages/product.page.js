class ProductPage {
  get name() { return cy.get('[data-test="product-name"]') }
  get price() { return cy.get('[data-test="unit-price"]') }
  get description() { return cy.get('[data-test="product-description"]') }
  get addToCartButton() { return cy.get('[data-test="add-to-cart"]') }
  get addToFavoritesButton() { return cy.get('[data-test="add-to-favorites"]') }
  get quantityInput() { return cy.get('[data-test="quantity"]') }
  get increaseQuantityButton() { return cy.get('[data-test="increase-quantity"]') }

  // Usa el botón "+" en lugar de type() para que el form reactivo de Angular
  // reciba los eventos correctamente.
  setQuantity(quantity) {
    for (let i = 1; i < quantity; i++) {
      this.increaseQuantityButton.click()
    }
    this.quantityInput.should('have.value', String(quantity))
  }

  getUnitPrice() {
    return this.price.invoke('text').then((text) => parseFloat(text.replace('$', '')))
  }
}

module.exports = new ProductPage()
