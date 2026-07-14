class LoginPage {
  get email() { return cy.get('[data-test="email"]') }
  get password() { return cy.get('[data-test="password"]') }
  get submitButton() { return cy.get('[data-test="login-submit"]') }

  visit() {
    cy.visit('/auth/login')
  }

  login(email, password) {
    this.email.clear().type(email)
    this.password.clear().type(password, { log: false })
    this.submitButton.click()
  }
}

module.exports = new LoginPage()
