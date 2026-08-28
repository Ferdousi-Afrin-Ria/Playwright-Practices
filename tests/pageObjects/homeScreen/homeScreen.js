
class homePage{
constructor(page){
 this.page = page;
 this.menu = page.locator('#react-burger-menu-btn')
 this.allItemBtn = page.locator('#inventory_sidebar_link');
 this.allItemSelector = '.inventory_item_name';
 this.allItem = page.locator(this.allItemSelector);
 this.productDetailsName = page.locator('.inventory_details_name.large_size');
 this.addToCartBtnSelector = '.btn_inventory';
 this.cartBtn = '.shopping_cart_link'
 this.shoppingCartBadge = '.shopping_cart_badge';
 this.productSortDropdown =  '.product_sort_container';
 this.cartPageTitle = '.title'
}


async viewProductDetails(productName){

    const productlist = await this.page.$$(this.allItemSelector);
    console.log(productlist.length);
    for (let product of productlist){
        const text = await product.textContent();
        console.log(`Product: "${text}"`);

        if (text === productName) {
            console.log("Found product");
            await product.click();

            const productDetailsText = await this.productDetailsName.textContent();
            console.log(productDetailsText);

            return productDetailsText === productName;
        }
    }   
    return false;
}   

// async addToCart(productName){
//     const productlist = await this.page.$$(this.allItemSelector);
//     console.log(productlist.length);
//     for (let product of productlist){
//         const text = await product.textContent();
//         console.log(`Product: "${text}"`);

//         if (text === productName) {
//             await this.addToCartBtn.click();
//             const  btnText = await this.addToCartBtn.textContent();
//             if(btnText === "Remove"){
//                 return true
//             }
//         }
//     } return false

// }

async getCartCount() {
    const badge = await this.page.$(this.shoppingCartBadge);

    if (badge) {
        return Number(await badge.textContent());
    }

    return 0;
}

async addToCart(productName) {
    const products = await this.page.$$(this.allItemSelector);
    const buttons = await this.page.$$(this.addToCartBtnSelector);

    for (let i = 0; i < products.length; i++) {
        const text = await products[i].textContent();

        if (text === productName) {
            await buttons[i].click();
            const updatedButtons = await this.page.$$(this.addToCartBtnSelector);

            return (await updatedButtons[i].textContent()) === 'Remove';
        }
    }

    return false;
}

async addMultipleProductsIntoCart(product1,product3) {
    const products = await this.page.$$(this.allItemSelector);
    const buttons = await this.page.$$(this.addToCartBtnSelector);

    let addedProduct1 = false;
    let addedProduct2 = false;

    for (let i = 0; i < products.length; i++) {
        const text = await products[i].textContent();

        if (text === product1) {
            await buttons[i].click();
            addedProduct1 = true;
        }

        if (text === product3) {
            await buttons[i].click();
            addedProduct2 = true;
        }
    }

    return addedProduct1 && addedProduct2;
}

async selectNameZtoA(){
    await this.page.selectOption(this.productSortDropdown, 'za');
    const products = await this.page.$$(this.allItemSelector);
    const names = [];

    for (const product of products) {
    names.push(await product.textContent());
    }
    console.log(names);
    const value = await this.page.locator(this.productSortDropdown).inputValue();
    return value === 'za';
}

async selectPriceLowtoHigh(){
    await this.page.selectOption(this.productSortDropdown, 'lohi');
    const products = await this.page.$$(this.allItemSelector);
    const names = [];
    for (let product of products){
        names.push(await product.textContent());

    }
    console.log(names);
    const value = await this.page.locator(this.productSortDropdown).inputValue();
    return value === 'lohi';
}

async selectPriceHightoLow(){
    await this.page.selectOption(this.productSortDropdown, 'hilo');
    const products = await this.page.$$(this.allItemSelector);
    const names = [];
    for(let product of products){
        names.push(await product.textContent());
    }
    console.log(names);
    const value = await this.page.locator(this.productSortDropdown).inputValue();
    return value ===  'hilo'
    
}

async navigateToCartPage(){
    await this.page.locator(this.cartBtn).first().click();
    const isVisble = await this.page.locator(this.cartPageTitle).isVisible();
    if (isVisble){
        return true
    }else return false
}

async removeProductfromHome(product1){
        const products = await this.page.$$(this.allItemSelector);
        const buttons = await this.page.$$(this.addToCartBtnSelector);

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
export default homePage;