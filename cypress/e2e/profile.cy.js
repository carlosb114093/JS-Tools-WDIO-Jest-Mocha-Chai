const loginPage = require('../support/pages/login.page')
const profilePage = require('../support/pages/profile.page')
const { registerUser } = require('../support/api')
const { users } = require('../support/test-users')

// @user_profile
// Scenario Outline: Customer edits their profile information
describe('My profile - customer edits their profile information', () => {
  const examples = [
    { firstName: 'Carlos', street: '45 Maple Avenue' },
    { firstName: 'Maria', street: '12 Ocean Drive' },
  ]

  beforeEach(() => {
    // Given the customer is logged in and on the "My profile" page
    registerUser(users.profileEditor)
    loginPage.visit()
    loginPage.login(users.profileEditor.email, users.profileEditor.password)
    cy.url().should('include', '/account')
    profilePage.visit()
  })

  examples.forEach(({ firstName, street }) => {
    it(`updates first name to "${firstName}" and street to "${street}"`, () => {
      // When the customer modifies the first name and the street
      // And presses the "Update profile" button
      profilePage.updateNameAndStreet(firstName, street)

      // Then a success message is displayed
      // (texto real del sitio; el escenario decía "has been updated successfully")
      profilePage.successMessage
        .should('be.visible')
        .and('contain.text', 'Your profile is successfully updated!')

      // And the new profile data remains saved after refreshing the page
      cy.reload()
      profilePage.firstName.should('have.value', firstName)
      profilePage.street.should('have.value', street)
    })
  })
})
