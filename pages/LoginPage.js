class LoginPage {
    constructor(page) {
        this.page = page
        this.emailInput    = page.locator('[data-test="email"]')
        this.passwordInput = page.locator('[data-test="password"]')
        this.loginButton   = page.locator('[data-test="login-submit"]')
        this.navMenu       = page.locator('[data-test="nav-menu"]')
    }

    async goto() {
        await this.page.goto('/auth/login')
    }

    async login(email, password) {
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.loginButton.click({ force: true })
    }
}

module.exports = LoginPage
