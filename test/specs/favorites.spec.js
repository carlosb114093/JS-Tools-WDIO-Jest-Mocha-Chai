const assert = require('chai').assert

describe('Favorites', () => {

    it('@favorites - customer logged marks a product as favorite', async () => {
        // 1. Given
        await browser.url('/auth/login')

        const emailObj = await $('[data-test="email"]')
        await emailObj.setValue('testuser3@epam.com')

        const passwordObj = await $('[data-test="password"]')
        await passwordObj.setValue('T3st12345@')

        const loginBtn = await $('[data-test="login-submit"]')
        await loginBtn.click()

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/account'),
            { timeout: 10000, timeoutMsg: 'Login failed' }
        )

        await browser.url('/')

        const product = await $('[data-test="product-name"]')
        await product.waitForDisplayed({ timeout: 5000 })
        await product.click()

        // 2. When
        const favBtn = await $('[data-test="add-to-favorites"]')
        await favBtn.waitForDisplayed({ timeout: 5000 })
        await favBtn.click()

        // 3. Then
        const toast = await $('.ngx-toastr')
        await toast.waitForDisplayed({ timeout: 5000 })
        const confirmText = await toast.getText()
        assert.include(confirmText, 'favorit', 'Confirmation message did not appear')
    })

})
