// Helpers de API para preparar precondiciones (Given) sin pasar por la UI.

// Registra un usuario. Si ya existe (422), lo ignora: la precondición ya se cumple.
function registerUser(user) {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/users/register`,
    failOnStatusCode: false,
    body: {
      first_name: user.firstName,
      last_name: user.lastName,
      dob: '1990-05-15',
      phone: '0987654321',
      email: user.email,
      password: user.password,
      address: {
        street: '100 Test Street',
        city: 'Amsterdam',
        state: 'NH',
        country: 'NL',
        postal_code: '1234AB',
      },
    },
  }).then((response) => {
    // 201 = creado, 409 = el email ya existe (la precondición ya se cumple)
    expect(response.status).to.be.oneOf([201, 409])
  })
}

module.exports = { registerUser }
