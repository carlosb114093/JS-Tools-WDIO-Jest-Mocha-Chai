const loginPage = require('../support/pages/login.page')
const navBar = require('../support/pages/nav.component')
const { registerUser } = require('../support/api')
const { users } = require('../support/test-users')

// @signup_signin
// Scenario Outline: Registered customer logs in with valid credentials
describe('Sign in - registered customer logs in with valid credentials', () => {
  const examples = [users.customer, users.customer2]

  examples.forEach((user) => {
    it(`logs in successfully with ${user.email}`, () => {
      // Given the customer owns an account (precondición vía API)
      registerUser(user)

      // Given the customer is on the sign-in page
      loginPage.visit()

      // When the customer fills in the email and password and presses "Login"
      loginPage.login(user.email, user.password)

      // Then the customer lands on the account page
      cy.url().should('include', '/account')
      cy.get('[data-test="page-title"]').should('contain.text', 'My account')

      // And the customer's name appears in the navigation menu
      navBar.userMenu.should('contain.text', `${user.firstName} ${user.lastName}`)
    })
  })
})
