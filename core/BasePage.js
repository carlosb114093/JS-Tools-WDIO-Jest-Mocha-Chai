const { expect } = require('@playwright/test')

class BasePage {
    constructor(page) {
        this.page = page
    }

    async navigate(path, options = {}) {
        await this.page.goto(path, { waitUntil: 'domcontentloaded', ...options })
    }

    async click(locator, options = {}) {
        await locator.click(options)
    }

    async fill(locator, value) {
        await locator.fill(value)
    }

    async waitForVisible(locator, timeout = 15000) {
        await locator.waitFor({ state: 'visible', timeout })
    }

    async waitForResponse(urlFragment, timeout = 30000) {
        return this.page.waitForResponse(
            res => res.url().includes(urlFragment),
            { timeout }
        )
    }

    async retry(action, timeout = 30000) {
        await expect(action).toPass({ timeout })
    }

    async expectText(locator, text, timeout = 15000) {
        await expect(locator).toContainText(text, { timeout })
    }

    async expectVisible(locator, timeout = 15000) {
        await expect(locator).toBeVisible({ timeout })
    }
}

module.exports = BasePage
