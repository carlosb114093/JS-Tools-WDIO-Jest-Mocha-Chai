const assert = require('chai').assert
const { registerAndLogin } = require('../helpers/auth')

async function setAngularValue(selector, value) {
    const el = await $(selector)
    await el.waitForDisplayed({ timeout: 5000 })
    await browser.execute((element, val) => {
        const nativeSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set
        nativeSetter.call(element, val)
        element.dispatchEvent(new Event('input', { bubbles: true }))
        element.dispatchEvent(new Event('change', { bubbles: true }))
        element.dispatchEvent(new Event('blur', { bubbles: true }))
    }, el, value)
}

async function setAngularSelect(selector, index) {
    const el = await $(selector)
    await el.waitForDisplayed({ timeout: 5000 })
    await browser.execute((element, idx) => {
        element.selectedIndex = idx
        element.dispatchEvent(new Event('change', { bubbles: true }))
    }, el, index)
}

describe('Checkout', () => {

    beforeEach(async () => {
        const email = `test_${Date.now()}@test.com`
        const password = 'Xk9#mQ2$vL7pZw'
        await registerAndLogin(email, password)
    })

    it('@checkout - Customer completes a purchase successfully', async () => {
        // 1. Given - user registered and logged in via beforeEach

        // 2. When - add product to cart
        await browser.url('/')

        await browser.waitUntil(
            async () => (await $$('[data-test="product-name"]')).length > 0,
            { timeout: 15000, timeoutMsg: 'Products did not load on homepage' }
        )
        const product = await $('[data-test="product-name"]')
        await product.click()

        const addCartBtn = await $('[data-test="add-to-cart"]')
        await addCartBtn.waitForDisplayed({ timeout: 10000 })
        await browser.execute((el) => el.click(), addCartBtn)

        await browser.waitUntil(
            async () => {
                try {
                    const cart = await $('[data-test="cart-quantity"]')
                    if (!(await cart.isExisting())) return false
                    const text = await cart.getText()
                    const num = parseInt(text, 10)
                    return !isNaN(num) && num > 0
                } catch (e) {
                    return false
                }
            },
            { timeout: 15000, timeoutMsg: 'Product was not added to cart' }
        )

        await browser.url('/checkout')

        const step1 = await $('[data-test="proceed-1"]')
        await step1.waitForDisplayed({ timeout: 5000 })
        await browser.execute((el) => el.click(), step1)

        const step2 = await $('[data-test="proceed-2"]')
        await step2.waitForDisplayed({ timeout: 5000 })
        await browser.execute((el) => el.click(), step2)

        await setAngularSelect('[data-test="country"]', 57)
        await setAngularValue('[data-test="postal_code"]', '110111')
        await setAngularValue('[data-test="house_number"]', '42')
        await setAngularValue('[data-test="street"]', 'calle 1')
        await setAngularValue('[data-test="city"]', 'Bogota')
        await setAngularValue('[data-test="state"]', 'Cundinamarca')

        const step3 = await $('[data-test="proceed-3"]')
        await step3.waitForDisplayed({ timeout: 5000 })
        await browser.execute((el) => el.click(), step3)

        await setAngularSelect('[data-test="payment-method"]', 1)
        await setAngularValue('[data-test="bank_name"]', 'Bancolombia')
        await setAngularValue('[data-test="account_name"]', 'Test User')
        await setAngularValue('[data-test="account_number"]', '1234567890')

        const confirmBtn = await $('[data-test="finish"]')
        await confirmBtn.waitForDisplayed({ timeout: 5000 })
        await browser.execute((el) => el.click(), confirmBtn)

        // 3. Then
        const confirmation = await $('[data-test="payment-success-message"]')
        await confirmation.waitForDisplayed({ timeout: 10000 })
        const confirmText = await confirmation.getText()
        assert.isNotEmpty(confirmText, 'Order confirmation not shown')
    })

})
