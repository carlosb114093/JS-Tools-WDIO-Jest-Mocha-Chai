class ProfilePage {
  get firstName() { return cy.get('[data-test="first-name"]') }
  get lastName() { return cy.get('[data-test="last-name"]') }
  get street() { return cy.get('[data-test="street"]') }
  get updateButton() { return cy.get('[data-test="update-profile-submit"]') }
  get successMessage() { return cy.get('.alert-success') }

  visit() {
    cy.visit('/account/profile')
    // Esperar a que el form cargue los datos actuales del usuario.
    this.firstName.should('not.have.value', '')
  }

  updateNameAndStreet(firstName, street) {
    this.firstName.clear().type(firstName)
    this.street.clear().type(street)
    this.updateButton.click()
  }
}

module.exports = new ProfilePage()
