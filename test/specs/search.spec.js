const assert = require('chai').assert

describe('Search bar', () => {

    // 
    
     it('Only appears products that match with the set value', async () => {
        // 1. Given 
        await browser.url('https://practicesoftwaretesting.com')
        // 2. When 
        const searchObj = await $('[data-test="search-query"]')        
        await searchObj.setValue('Hammer')
        const searchButn = await $('[data-test="search-submit"]')
        await searchButn.click()       
        await browser.pause(2000)
        const getProduct = await $('[data-test="product-name"]')
        await getProduct.waitForDisplayed({ timeout: 5000 })
        const text = await getProduct.getText()
        // 3. Then        
        assert.include(text,'Hammer','product not found')
    })
    })
