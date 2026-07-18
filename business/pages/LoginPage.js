const BasePage = require('../../core/BasePage')

class LoginPage extends BasePage {
    constructor(page) {
        super(page)
        this.emailInput    = page.locator('[data-test="email"]')
        this.passwordInput = page.locator('[data-test="password"]')
        this.loginButton   = page.locator('[data-test="login-submit"]')
        this.navMenu       = page.locator('[data-test="nav-menu"]')
    }

    async goto() {
        await this.navigate('/auth/login')
        await this.waitForVisible(this.emailInput, 30000)
    }

    async login(email, password) {
        await this.fill(this.emailInput, email)
        await this.fill(this.passwordInput, password)
        await Promise.all([
            this.waitForResponse('login', 30000),
            this.click(this.loginButton),
        ])
    }
}

module.exports = LoginPage
