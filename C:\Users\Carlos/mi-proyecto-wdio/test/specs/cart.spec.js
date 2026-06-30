const { expect } = require('chai')

describe('cart', () => {

    it('@cart - quantity changes after adding to cart', async () => {
        // 1. Given 
        await browser.url('https://practicesoftwaretesting.com')
        await browser.pause(2000)

        const product = await $('[data-test="product-name"]')
        await product.waitForDisplayed({ timeout: 5000 })
        await product.click()
        await browser.pause(2000)

        // 2. When 
        const quantityObj = await $('[data-test="quantity"]')
        await quantityObj.clearValue()
        await quantityObj.setValue('2')

        const addToCartBtn = await $('[data-test="add-to-cart"]')
        await addToCartBtn.click()
        await browser.pause(2000)

        // 3. Then 
        const cart = await $('[data-test="cart-quantity"]')
        await cart.waitForDisplayed({ timeout: 5000 })
        const Text = await cart.getText()
        expect(Text).to.equal('2')
    })

})

