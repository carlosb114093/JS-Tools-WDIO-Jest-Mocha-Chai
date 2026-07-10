const { expect } = require('chai')

describe('Cart', () => {

    it('@basket - quantity changes after adding to cart', async () => {
        // 1. Given
        await browser.url('/')

        const product = await $('[data-test="product-name"]')
        await product.waitForDisplayed({ timeout: 5000 })
        await product.click()

        // 2. When - set quantity using native events for Angular
        const quantityObj = await $('[data-test="quantity"]')
        await quantityObj.waitForDisplayed({ timeout: 5000 })
        await browser.execute((element, val) => {
            const nativeSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set
            nativeSetter.call(element, val)
            element.dispatchEvent(new Event('input', { bubbles: true }))
            element.dispatchEvent(new Event('change', { bubbles: true }))
            element.dispatchEvent(new Event('blur', { bubbles: true }))
        }, quantityObj, '2')

        const addToCartBtn = await $('[data-test="add-to-cart"]')
        await addToCartBtn.click()

        // 3. Then
        await browser.waitUntil(
            async () => {
                const cart = await $('[data-test="cart-quantity"]')
                const displayed = await cart.isDisplayed()
                if (!displayed) return false
                const text = await cart.getText()
                return text === '2'
            },
            { timeout: 8000, timeoutMsg: 'Cart quantity did not update to 2' }
        )
        const cart = await $('[data-test="cart-quantity"]')
        const cartText = await cart.getText()
        expect(cartText).to.equal('2')
    })

})
