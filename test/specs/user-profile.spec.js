const { should } = require('chai')
should()

describe('User Profile', () => {
    it('@user_profile - Customer edits their profile information', async () => {
        // 1. Given
        await browser.url('https://practicesoftwaretesting.com/auth/login')

        const emailObj = await $('[data-test="email"]')
        await emailObj.click()
        await emailObj.setValue('testuser3@epam.com')
        await browser.keys('Tab')

        const passwordObj = await $('[data-test="password"]')
        await passwordObj.click()
        await passwordObj.setValue('T3st12345@')
        await browser.keys('Tab')

        const loginBtn = await $('[data-test="login-submit"]')
        await loginBtn.click()

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/account'),
            { timeout: 12000, timeoutMsg: 'Login failed' }
        )

        await browser.url('https://practicesoftwaretesting.com/account/profile')

        // Wait until profile data is loaded
        const lnEl = await $('[data-test="last-name"]')
        await browser.waitUntil(
            async () => (await lnEl.getValue()) !== '',
            { timeout: 8000, timeoutMsg: 'Profile data did not load' }
        )

        // 2. When - change first name and submit
        const fnEl = await $('[data-test="first-name"]')
        await fnEl.click()
        await browser.keys(['Control', 'a'])
        await browser.keys('Delete')
        await browser.keys('Carlos')
        await browser.keys('Tab')
        await browser.pause(500)

        const updateBtn = await $('[data-test="update-profile-submit"]')
        await updateBtn.click()

        // 3. Then
        const successMsg = await $('.alert-success')
        await successMsg.waitForExist({ timeout: 8000 })
        const msgText = await successMsg.getText()
        msgText.should.include('exitosamente')
    })

})
