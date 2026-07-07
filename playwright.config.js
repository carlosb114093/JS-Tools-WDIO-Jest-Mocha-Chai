// @ts-check
const { defineConfig, devices } = require('@playwright/test')

module.exports = defineConfig({
    testDir: './tests',
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: 2,
    workers: 2,
    reporter: 'list',
    use: {
        baseURL: 'https://practicesoftwaretesting.com',
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
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
            use: { ...devices['Desktop Safari'] },
            dependencies: ['setup'],
        },
    ],
})
