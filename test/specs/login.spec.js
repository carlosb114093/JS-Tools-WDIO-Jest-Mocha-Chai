const assert = require('chai').assert
const { registerUser } = require('../helpers/auth')

describe('Login', () => {

    let testEmail, testPassword

    beforeEach(async () => {
        testEmail = `test_${Date.now()}@test.com`
        testPassword = 'Test12345!'
        await registerUser(testEmail, testPassword)
        await browser.url('/auth/login')
    })

    it('@signup_signin - Customer logs in with valid credentials', async () => {
        // 1. Given - user registered in beforeEach

        // 2. When
        const emailInput = await $('[data-test="email"]')
        await emailInput.waitForDisplayed({ timeout: 5000 })
        await emailInput.click()
        await emailInput.addValue(testEmail)

        const passwordInput = await $('[data-test="password"]')
        await passwordInput.click()
        await passwordInput.addValue(testPassword)

        const loginButton = await $('[data-test="login-submit"]')
        await loginButton.click()

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/account'),
            { timeout: 12000, timeoutMsg: 'It did not redirect to the account page' }
        )

        // 3. Then
        const url = await browser.getUrl()
        assert.include(url, '/account', 'It did not redirect to the account page')

        const navMenu = await $('[data-test="nav-menu"]')
        const navText = await navMenu.getText()
        assert.include(navText.toLowerCase(), 'test', 'Username does not appear in nav menu')
    })

})
