const { should } = require('chai')
should()

describe('User Profile', () => {
    it('@user_profile - Customer edits their profile information', async () => {
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

        await browser.url('/account/profile')

        // Wait until profile data is loaded
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
        const msgText = await successMsg.getText()
        msgText.should.include('exitosamente')
    })

})
