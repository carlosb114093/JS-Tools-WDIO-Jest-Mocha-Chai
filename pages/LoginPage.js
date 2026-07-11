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
        await Promise.all([
            this.page.waitForResponse(
                res => res.request().method() === 'POST' && res.url().includes('login') && res.ok(),
                { timeout: 30000 }
            ),
            this.loginButton.click(),
        ])
    }
}

module.exports = LoginPage
