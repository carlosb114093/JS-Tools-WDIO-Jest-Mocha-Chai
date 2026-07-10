const { should } = require('chai')
should()
const { registerAndLogin } = require('../helpers/auth')

describe('User Profile', () => {

    beforeEach(async () => {
        const email = `test_${Date.now()}@test.com`
        const password = 'Xk9#mQ2$vL7pZw'
        await registerAndLogin(email, password)
        await browser.url('/account/profile')
    })

    it('@user_profile - Customer edits their profile information', async () => {
        // 1. Given - user registered and logged in via beforeEach

        const lnEl = await $('[data-test="last-name"]')
        await browser.waitUntil(
            async () => (await lnEl.getValue()) !== '',
            { timeout: 8000, timeoutMsg: 'Profile data did not load' }
        )

        // 2. When - change first name using native events and submit
        const fnEl = await $('[data-test="first-name"]')
        await browser.execute((el, val) => {
            const nativeSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set
            nativeSetter.call(el, val)
            el.dispatchEvent(new Event('input', { bubbles: true }))
            el.dispatchEvent(new Event('change', { bubbles: true }))
            el.dispatchEvent(new Event('blur', { bubbles: true }))
        }, fnEl, 'Carlos')

        const updateBtn = await $('[data-test="update-profile-submit"]')
        await updateBtn.click()

        // 3. Then
        const successMsg = await $('.alert-success')
        await successMsg.waitForExist({ timeout: 8000 })
        const isDisplayed = await successMsg.isDisplayed()
        isDisplayed.should.equal(true, 'Profile update success message was not shown')
    })

})
