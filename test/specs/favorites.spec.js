const assert = require('chai').assert
const { registerAndLogin } = require('../helpers/auth')

describe('Favorites', () => {

    beforeEach(async () => {
        const email = `test_${Date.now()}@test.com`
        const password = 'Xk9#mQ2$vL7pZw'
        await registerAndLogin(email, password)
        await browser.url('/')
    })

    it('@favorites - customer logged marks a product as favorite', async () => {
        // 1. Given - user registered and logged in via beforeEach

        await browser.waitUntil(
            async () => (await $$('[data-test="product-name"]')).length > 0,
            { timeout: 15000, timeoutMsg: 'Products did not load on homepage' }
        )
        const product = await $('[data-test="product-name"]')
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
