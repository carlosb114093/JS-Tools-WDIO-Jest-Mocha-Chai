async function setAngularValue(selector, value) {
    const el = await $(selector)
    await el.waitForExist({ timeout: 12000 })
    await browser.execute((element, val) => {
        const nativeSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set
        nativeSetter.call(element, val)
        element.dispatchEvent(new Event('input', { bubbles: true }))
        element.dispatchEvent(new Event('change', { bubbles: true }))
        element.dispatchEvent(new Event('blur', { bubbles: true }))
    }, el, value)
}

async function waitForLookup() {
    await browser.waitUntil(
        async () => {
            const alerts = await $$('.alert-info')
            for (const a of alerts) {
                const t = await a.getText()
                if (t.includes('Buscando') || t.includes('Searching')) return false
            }
            return true
        },
        { timeout: 20000, timeoutMsg: 'Postcode lookup did not finish' }
    )
}

async function fillAddressFields() {
    await setAngularValue('[data-test="street"]', 'Test Street')
    await setAngularValue('[data-test="city"]', 'Test City')
    await setAngularValue('[data-test="state"]', 'Test State')
}

async function registerUser(email, password) {
    await browser.url('/auth/register')
    await browser.pause(1500)

    await setAngularValue('[data-test="first-name"]', 'Test')
    await setAngularValue('[data-test="last-name"]', 'User')
    await setAngularValue('[data-test="dob"]', '1990-01-01')

    await browser.execute(() => {
        const el = document.querySelector('[data-test="country"]')
        el.value = 'NL'
        el.dispatchEvent(new Event('change', { bubbles: true }))
    })

    await setAngularValue('[data-test="postal_code"]', '1234AB')
    await setAngularValue('[data-test="house_number"]', '1')
    await browser.pause(1500)
    await waitForLookup()

    await fillAddressFields()
    await setAngularValue('[data-test="phone"]', '3001234567')
    await setAngularValue('[data-test="email"]', email)
    await setAngularValue('[data-test="password"]', password)

    const registerBtn = await $('[data-test="register-submit"]')
    await browser.execute((el) => el.click(), registerBtn)
    await browser.pause(2000)

    if ((await browser.getUrl()).includes('/auth/register')) {
        await waitForLookup()
        const street = await $('[data-test="street"]')
        if (await street.isExisting()) {
            await fillAddressFields()
        }
        await browser.execute((el) => el.click(), registerBtn)
        await browser.pause(1000)
    }

    await browser.waitUntil(
        async () => {
            const url = await browser.getUrl()
            if (!url.includes('/auth/register')) return true
            const alerts = await $$('.alert-info')
            for (const a of alerts) {
                const t = await a.getText()
                if (t.includes('Buscando') || t.includes('Searching')) {
                    await browser.pause(2000)
                    await waitForLookup()
                    await fillAddressFields()
                    await browser.execute((el) => el.click(), registerBtn)
                }
            }
            return false
        },
        { timeout: 30000, timeoutMsg: 'Registration failed - still on register page' }
    )
}

async function loginUser(email, password) {
    await browser.url('/auth/login')

    const emailEl = await $('[data-test="email"]')
    await emailEl.waitForDisplayed({ timeout: 5000 })
    await emailEl.click()
    await emailEl.addValue(email)

    const passwordEl = await $('[data-test="password"]')
    await passwordEl.click()
    await passwordEl.addValue(password)

    const loginBtn = await $('[data-test="login-submit"]')
    await loginBtn.click()

    await browser.waitUntil(
        async () => (await browser.getUrl()).includes('/account'),
        { timeout: 20000, timeoutMsg: 'Login failed' }
    )
}

async function registerAndLogin(email, password) {
    await registerUser(email, password)
    await loginUser(email, password)
}

module.exports = { registerUser, loginUser, registerAndLogin }
