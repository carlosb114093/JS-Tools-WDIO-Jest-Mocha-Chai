// Fábrica de usuarios de prueba. Cada llamada genera un email único para que
// el registro por UI nunca choque con una cuenta existente.
// Nota: el sitio rechaza passwords comunes ("data leak check"), por eso esta password.
const PASSWORD = 'Xk9#mQ2$vL7pZw'

let sequence = 0

function buildUser({ firstName, lastName }) {
  sequence += 1
  return {
    firstName,
    lastName,
    email: `carlos.${firstName.toLowerCase()}.${Date.now()}.${sequence}@cypress-m3-qa.com`,
    password: PASSWORD,
  }
}

module.exports = { buildUser }
