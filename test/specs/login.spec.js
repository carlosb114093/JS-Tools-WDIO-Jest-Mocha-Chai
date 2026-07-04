const assert = require('chai').assert

describe('Login', () => {

    it('@signup_signin - Customer logs in with valid credentials', async () => {
        // 1. Given
        await browser.url('/auth/login')

        // 2. When
        const emailInput = await $('[data-test="email"]')
        await emailInput.waitForDisplayed({ timeout: 5000 })
        await emailInput.click()
        await emailInput.addValue('testuser3@epam.com')

        const passwordInput = await $('[data-test="password"]')
        await passwordInput.click()
        await passwordInput.addValue('T3st12345@')

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
        assert.include(navText, 'test', 'name does not appear')
    })

})
