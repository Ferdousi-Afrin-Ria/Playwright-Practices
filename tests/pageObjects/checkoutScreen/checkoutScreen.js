
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
       
}

export default cartPage;