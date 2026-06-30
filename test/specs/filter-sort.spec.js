const { expect } = require('chai')

describe('Filter and Sort', () => {

    it('@filter_sort - Filter by Hand Tools and sort by price high to low', async () => {
        // 1. Given
        await browser.url('https://practicesoftwaretesting.com')
        await browser.pause(2000)

        // 2. When
        const htFilter = await $('input[data-test="category-01KWBHTFKZS4771N4QHKCRD7M4"]')
        await htFilter.waitForDisplayed({ timeout: 8000 })
        await htFilter.scrollIntoView()
        await htFilter.click()
        await browser.pause(1500)

        const sortDropdown = await $('[data-test="sort"]')
        await sortDropdown.waitForDisplayed({ timeout: 5000 })
        await sortDropdown.selectByVisibleText('Precio (Alto - Bajo)')
        await browser.pause(1500)

        // 3. Then
        const products = await $$('[data-test="product-name"]')
        expect(products.length).to.be.greaterThan(0)
    })

})
