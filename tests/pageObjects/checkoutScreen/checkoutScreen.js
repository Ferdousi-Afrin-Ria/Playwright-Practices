
class cartPage{
    constructor(page){
        this.page = page;
        this.allItemSelector = '.inventory_item_name'
        this.checkoutBtn = '#checkout'
        this.firstName = page.locator('#first-name')
        this.lastName = page.locator('#last-name')
        this.postalCode = page.locator('#postal-code')
        this.continueBtn = page.locator('#continue')
        this.pageTitle = page.locator(".title")
        this.paymentOverViewTitle = page.locator('[data-test="payment-info-label"]')
        this.totalPrice = page.locator('[data-test="total-info-label"]')
        this.finishBtn = page.locator("#finish")
        this.continueShoppingBtn = page.locator('#continue-shopping')
    this.allItem = page.locator(this.allItemSelector);
    this.productDetailsName = page.locator('.inventory_details_name.large_size');
    this.removeBtnSelector = '.cart_button';
    

    }

    async ifAddedProductShowing(productName){
    const productlist = await this.page.$$(this.allItemSelector);
    console.log(productlist.length);
        for (let product of productlist){
            const text = await product.textContent();
            console.log(`Product: "${text}"`);
            if (text === productName) {
                return true
            }
        }return false
    }
////this single function can be used while parsing single/multiple products using array/////
//     async areProductsAdded(productNames) {
//     const productList = await this.page.$$(this.allItemSelector);

//     const namesOnPage = [];

//     for (const product of productList) {
//         namesOnPage.push(await product.textContent());
//     }

//     return productNames.every(name => namesOnPage.includes(name));
// }

    async isCheckoutPageShown(){   
        try {
            await this.page.locator(this.checkoutBtn).click();
            return true;
        } catch (error) {
            return false;
        }
    }

    async checkOut(firstName,lastName,postalCode,product){
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
        await this.continueBtn.click();
        const overViewTitle = await this.pageTitle.textContent();
        const paymentInfoTitle = await this.paymentOverViewTitle.textContent();
        const totalPriceText = await this.totalPrice.textContent();
        console.log ("text: ", totalPriceText)
        const addedProduct = await this.page.locator(this.allItemSelector);
        const productName = await addedProduct.textContent();
        if (overViewTitle === 'Checkout: Overview' && paymentInfoTitle === 'Payment Information:' && totalPriceText === 'Price Total' && productName === product){
            await this.finishBtn.click();
            return true
        }
        else return false
    }
      
    async removeProductfromCart(product1){
        const products = await this.page.$$(this.allItemSelector);
        const buttons = await this.page.$$(this.removeBtnSelector);

        for (let i = 0; i < products.length; i++) {
            const text = await products[i].textContent();
            if (text === product1) {
                await buttons[i].click();
                const updatedProducts = await this.page.$$(this.allItemSelector);
                 for (const product of updatedProducts) {
                    const updatedText = await product.textContent();
                    if (updatedText === product1) {
                        return false; // Product is still in the cart
                    }
                }

                return true; // Checked the whole list and product is gone
            }
        }

        return false; 
    }


    
}

export default cartPage;