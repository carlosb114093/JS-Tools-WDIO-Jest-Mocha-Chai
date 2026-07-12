const homePage = require('../support/pages/home.page')
const productPage = require('../support/pages/product.page')
const cartPage = require('../support/pages/cart.page')
const navBar = require('../support/pages/nav.component')

// @basket
// Scenario Outline: Customer adds a product to the basket and changes its quantity
describe('Basket - customer adds a product and changes its quantity', () => {
  const examples = [
    { product: 'Combination Pliers', quantity: 3 },
    { product: 'Claw Hammer', quantity: 2 },
  ]

  examples.forEach(({ product, quantity }) => {
    it(`adds ${quantity} x "${product}" to the basket with the right subtotal`, () => {
      // Given the customer is on the details page of the product
      homePage.visit()
      homePage.openProduct(product)
      productPage.name.invoke('text').should((text) => {
        expect(text.trim()).to.equal(product)
      })

      // When the customer sets the quantity and presses "Add to cart"
      productPage.setQuantity(quantity)
      productPage.getUnitPrice().then((unitPrice) => {
        productPage.addToCartButton.click()

        // Then the cart icon displays a quantity badge with the amount
        navBar.cartQuantityBadge.should('have.text', String(quantity))

        // And the product is listed in the basket with the right subtotal
        cartPage.visit()
        cartPage.productTitles.should('contain.text', product)
        cartPage.quantityInputs.first().should('have.value', String(quantity))
        cartPage.linePrices.first().invoke('text').then((text) => {
          const lineTotal = parseFloat(text.replace('$', ''))
          expect(lineTotal).to.be.closeTo(unitPrice * quantity, 0.01)
        })
      })
    })
  })
})
