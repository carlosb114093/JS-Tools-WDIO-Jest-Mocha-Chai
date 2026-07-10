const assert = require('chai').assert

describe('Search bar', () => {

    it('@search - Only appears products that match with the set value', async () => {
        // 1. Given
        await browser.url('/')

        // 2. When
        const searchObj = await $('[data-test="search-query"]')
        await searchObj.waitForDisplayed({ timeout: 5000 })
        await searchObj.click()
        await searchObj.addValue('Hammer')

        const searchButn = await $('[data-test="search-submit"]')
        await searchButn.click()

        // 3. Then — wait until non-hammer products disappear (confirming search filtered)
        await browser.waitUntil(
            async () => {
                const products = await $$('[data-test="product-name"]')
                for (const p of products) {
                    const name = await p.getText()
                    if (!name.toLowerCase().includes('hammer')) return false
                }
                return products.length > 0
            },
            { timeout: 8000, timeoutMsg: 'Search did not filter results to only Hammer products' }
        )

        const allProducts = await $$('[data-test="product-name"]')
        const names = []
        for (const p of allProducts) {
            names.push(await p.getText())
        }
        assert.isTrue(
            names.every(name => name.toLowerCase().includes('hammer')),
            `Some results do not match: ${names.join(', ')}`
        )
    })

})
