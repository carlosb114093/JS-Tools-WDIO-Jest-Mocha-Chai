// Usuarios de prueba propios, registrados vía API antes de los tests.
// Nota: el sitio rechaza passwords comunes ("data leak check"), por eso esta password.
const PASSWORD = 'Xk9#mQ2$vL7pZw'

const users = {
  customer: {
    firstName: 'John',
    lastName: 'Smith',
    email: 'carlos.customer@cypress-m3-qa.com',
    password: PASSWORD,
  },
  customer2: {
    firstName: 'Jane',
    lastName: 'Miller',
    email: 'carlos.customer2@cypress-m3-qa.com',
    password: PASSWORD,
  },
  profileEditor: {
    firstName: 'Peter',
    lastName: 'Editor',
    email: 'carlos.profile@cypress-m3-qa.com',
    password: PASSWORD,
  },
}

module.exports = { users }
