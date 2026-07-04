const assert = require('chai').assert

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

    it('@checkout - Customer completes a purchase successfully', async () => {
        // 1. Given
        await browser.url('/auth/login')

        const emailObj = await $('[data-test="email"]')
        await emailObj.waitForDisplayed({ timeout: 5000 })
        await emailObj.click()
        await emailObj.addValue('testuser3@epam.com')

        const passwordObj = await $('[data-test="password"]')
        await passwordObj.click()
        await passwordObj.addValue('T3st12345@')

        const loginBtn = await $('[data-test="login-submit"]')
        await loginBtn.click()

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/account'),
            { timeout: 12000, timeoutMsg: 'Login failed' }
        )

        // 2. When
        await browser.url('/')

        const product = await $('[data-test="product-name"]')
        await product.waitForDisplayed({ timeout: 5000 })
        await product.click()

        const addCartBtn = await $('[data-test="add-to-cart"]')
        await addCartBtn.waitForDisplayed({ timeout: 5000 })
        await addCartBtn.click()

        await browser.waitUntil(
            async () => {
                const cart = await $('[data-test="cart-quantity"]')
                return (await cart.isDisplayed()) && (await cart.getText()) !== '0'
            },
            { timeout: 8000, timeoutMsg: 'Product was not added to cart' }
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
        await setAngularValue('[data-test="account_name"]', 'test3 test')
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
