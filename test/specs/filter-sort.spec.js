const { expect } = require('chai')

describe('Filter and Sort', () => {

    it('@filter_sort - Filter by Hand Tools and sort by price high to low', async () => {
        // 1. Given
        await browser.url('/')

        // 2. When
        const htFilter = await $('label=Hand Tools')
        await htFilter.waitForDisplayed({ timeout: 8000 })
        await htFilter.scrollIntoView()
        await htFilter.click()

        const sortDropdown = await $('[data-test="sort"]')
        await sortDropdown.waitForDisplayed({ timeout: 5000 })
        await sortDropdown.selectByVisibleText('Precio (Alto - Bajo)')

        // 3. Then
        const products = await $$('[data-test="product-name"]')
        await browser.waitUntil(
            async () => (await $$('[data-test="product-name"]')).length > 0,
            { timeout: 5000, timeoutMsg: 'No products found after filtering' }
        )
        expect(products.length).to.be.greaterThan(0)
    })

})
