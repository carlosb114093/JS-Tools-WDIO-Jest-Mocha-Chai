const { expect } = require('chai')

describe('Product Details', () => {

    it('@product_details - Product details page loads correctly', async () => {
        // 1. Given
        await browser.url('/')

        // 2. When
        const product = await $('[data-test="product-name"]')
        await product.waitForDisplayed({ timeout: 5000 })
        await product.click()

        // 3. Then
        const prodName = await $('[data-test="product-name"]')
        await prodName.waitForDisplayed({ timeout: 5000 })
        expect(await prodName.isDisplayed()).to.be.true

        const prodDescription = await $('[data-test="product-description"]')
        await prodDescription.waitForDisplayed({ timeout: 5000 })
        expect(await prodDescription.isDisplayed()).to.be.true

        const addCart = await $('[data-test="add-to-cart"]')
        await addCart.waitForDisplayed({ timeout: 5000 })
        expect(await addCart.isDisplayed()).to.be.true

        const addFav = await $('[data-test="add-to-favorites"]')
        await addFav.waitForDisplayed({ timeout: 5000 })
        expect(await addFav.isDisplayed()).to.be.true
    })

})
