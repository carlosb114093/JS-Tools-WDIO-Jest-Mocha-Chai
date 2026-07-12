const homePage = require('../support/pages/home.page')
const productPage = require('../support/pages/product.page')

// @product_details
// Scenario Outline: Customer opens the product details page of a tool
describe('Product details - customer opens the details page of a tool', () => {
  const examples = ['Combination Pliers', 'Claw Hammer']

  examples.forEach((product) => {
    it(`shows name, price, description and action buttons for "${product}"`, () => {
      // Given the customer is on the home page showing the product list
      homePage.visit()

      // When the customer selects the product
      homePage.openProduct(product)

      // Then the product details page loads with its name, price, and description
      productPage.name.invoke('text').should((text) => {
        expect(text.trim()).to.equal(product)
      })
      productPage.price.invoke('text').then((text) => {
        expect(parseFloat(text.replace('$', ''))).to.be.greaterThan(0)
      })
      productPage.description.invoke('text').should('have.length.gt', 0)

      // And the "Add to cart" and "Add to favorites" buttons are shown
      productPage.addToCartButton.should('be.visible')
      productPage.addToFavoritesButton.should('be.visible')
    })
  })
})
