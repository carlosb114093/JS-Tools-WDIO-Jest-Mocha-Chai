// @ts-check
const { defineConfig, devices } = require('@playwright/test')

module.exports = defineConfig({
    testDir: './tests',
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: 2,
    workers: 1,
    reporter: 'list',
    expect: { timeout: 10000 },
    use: {
        baseURL: 'https://practicesoftwaretesting.com',
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
        actionTimeout: 15000,
        navigationTimeout: 30000,
    },
    projects: [
        {
            name: 'setup',
            testMatch: 'auth.setup.js',
        },
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
            dependencies: ['setup'],
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
            dependencies: ['setup'],
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'], actionTimeout: 30000 },
            dependencies: ['setup'],
            timeout: 60000,
        },
    ],
})
