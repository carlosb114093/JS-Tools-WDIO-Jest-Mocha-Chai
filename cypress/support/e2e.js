// Archivo de soporte global: se carga antes de cada spec.

// Excepciones no capturadas de la app Angular no deben tumbar los tests.
Cypress.on('uncaught:exception', () => false)

// El sitio v5.0 se localiza según el idioma del navegador. Forzar inglés
// para que las aserciones de texto ("My account", mensajes de éxito) sean
// deterministas en cualquier máquina/navegador.
Cypress.Commands.overwrite('visit', (originalVisit, url, options = {}) => {
  const userOnBeforeLoad = options.onBeforeLoad
  return originalVisit(url, {
    ...options,
    onBeforeLoad(win) {
      win.localStorage.setItem('language', 'en')
      if (userOnBeforeLoad) {
        userOnBeforeLoad(win)
      }
    },
  })
})
