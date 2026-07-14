const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://practicesoftwaretesting.com',
    env: {
      apiUrl: 'https://api.practicesoftwaretesting.com',
    },
    defaultCommandTimeout: 15000,
    requestTimeout: 15000,
    responseTimeout: 30000,
    video: false,
    setupNodeEvents(on, config) {},
  },
})
