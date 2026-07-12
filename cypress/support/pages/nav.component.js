// Barra de navegación: presente en todas las páginas (componente, no página).
class NavBar {
  get userMenu() { return cy.get('[data-test="nav-menu"]') }
  get cartLink() { return cy.get('[data-test="nav-cart"]') }
  get cartQuantityBadge() { return cy.get('[data-test="cart-quantity"]') }
}

module.exports = new NavBar()
