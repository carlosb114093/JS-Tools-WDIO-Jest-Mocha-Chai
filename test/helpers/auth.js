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

async function registerUser(email, password) {
    await browser.url('/auth/register')

    await setAngularValue('[data-test="first-name"]', 'Test')
    await setAngularValue('[data-test="last-name"]', 'User')
    await setAngularValue('[data-test="dob"]', '1990-01-01')
    await setAngularValue('[data-test="address"]', '123 Test Street')
    await setAngularValue('[data-test="city"]', 'Test City')
    await setAngularValue('[data-test="state"]', 'Test State')
    await setAngularValue('[data-test="postcode"]', '12345')
    await setAngularValue('[data-test="phone"]', '3001234567')

    const countryEl = await $('[data-test="country"]')
    await browser.execute((element) => {
        element.selectedIndex = 57
        element.dispatchEvent(new Event('change', { bubbles: true }))
    }, countryEl)

    await setAngularValue('[data-test="email"]', email)
    await setAngularValue('[data-test="password"]', password)
    await setAngularValue('[data-test="password-confirm"]', password)

    const registerBtn = await $('[data-test="register-submit"]')
    await browser.execute((el) => el.click(), registerBtn)

    await browser.waitUntil(
        async () => (await browser.getUrl()).includes('/auth/login'),
        { timeout: 10000, timeoutMsg: 'Registration failed' }
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
        { timeout: 12000, timeoutMsg: 'Login failed' }
    )
}

async function registerAndLogin(email, password) {
    await registerUser(email, password)
    await loginUser(email, password)
}

module.exports = { registerUser, loginUser, registerAndLogin }
