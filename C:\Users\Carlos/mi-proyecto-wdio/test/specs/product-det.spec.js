const { expect } = require('chai')

describe('Search bar', () => {

    // 
    
     it('@product_details - Product details page loads correctly', async () => {
        // 1. Given 
        await browser.url('https://practicesoftwaretesting.com')
        // 2. When 
        const product = await $('[data-test="product-name"]')
        await product.waitForDisplayed({ timeout: 5000 })
        await product.click()        
        await browser.pause(2000)      
        // 3. Then        
         const prodName = await $('[data-test="product-name"]')
         expect(await prodName.isDisplayed()).to.be.true

         const prodDescription = await $('[data-test="product-description"]')
        expect(await prodDescription.isDisplayed()).to.be.true

        const addCart = await $('[data-test="add-to-cart"]')
        expect(await addCart.isDisplayed()).to.be.true

        const addFav = await $('[data-test="add-to-favorites"]')
        expect(await addFav.isDisplayed()).to.be.true
    })
    })