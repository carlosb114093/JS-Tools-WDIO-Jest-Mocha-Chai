class RegisterPage {
  get firstName() { return cy.get('[data-test="first-name"]') }
  get lastName() { return cy.get('[data-test="last-name"]') }
  get dob() { return cy.get('[data-test="dob"]') }
  get country() { return cy.get('[data-test="country"]') }
  get postalCode() { return cy.get('[data-test="postal_code"]') }
  get houseNumber() { return cy.get('[data-test="house_number"]') }
  get street() { return cy.get('[data-test="street"]') }
  get phone() { return cy.get('[data-test="phone"]') }
  get email() { return cy.get('[data-test="email"]') }
  get password() { return cy.get('[data-test="password"]') }
  get submitButton() { return cy.get('[data-test="register-submit"]') }

  visit() {
    cy.visit('/auth/register')
  }

  // Registra un cliente nuevo a través de la UI. Al terminar, el sitio
  // redirige a la página de login.
  registerUser(user) {
    this.visit()
    this.firstName.type(user.firstName)
    this.lastName.type(user.lastName)
    this.dob.type('1990-05-15')
    // País + código postal + número disparan el lookup que autocompleta
    // calle, ciudad y provincia. NL + 1234AB resuelve sin errores.
    this.country.select('NL')
    this.postalCode.type('1234AB')
    this.houseNumber.type('1')
    // Esperar a que el lookup termine: bloquea el submit hasta rellenar la calle.
    this.street.should('not.have.value', '')
    this.phone.type('0987654321')
    this.email.type(user.email)
    this.password.type(user.password, { log: false })
    this.submitButton.click()
    cy.url().should('include', '/auth/login')
  }
}

module.exports = new RegisterPage()
