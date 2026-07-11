const assert = require('chai').assert

describe('Favorites', () => {

    it('@favorites - customer logged marks a product as favorite', async () => {
        // 1. Given 
        await browser.url('https://practicesoftwaretesting.com/auth/login')

        const emailObj = await $('[data-test="email"]')
        await emailObj.setValue('testuser3@epam.com')

        const passwordObj = await $('[data-test="password"]')
        await passwordObj.setValue('T3st12345@')

        const loginBtn = await $('[data-test="login-submit"]')
        await loginBtn.click()

        await browser.pause(2000)        
        await browser.url('https://practicesoftwaretesting.com')
        await browser.pause(2000)

        const product = await $('[data-test="product-name"]')
        await product.waitForDisplayed({ timeout: 5000 })
        await product.click()
        await browser.pause(2000)

        // 2. When 
        const favBtn = await $('[data-test="add-to-favorites"]')
        await favBtn.click()
        await browser.pause(1500)

        // 3. Then
        const toast = await $('.ngx-toastr')
        await toast.waitForDisplayed({ timeout: 5000 })
        const confirmText = await toast.getText()
        assert.include(confirmText, 'favorit', 'Confirmation messages doesnt appear')
    })

})


