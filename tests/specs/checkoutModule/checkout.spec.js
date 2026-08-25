import {test,expect} from '@playwright/test'
import loginPage from '../../pageObjects/loginScreen/loginScreen'
import LoginData from '../../testData/loginData/loginData.json' assert { type: 'json' };
import homePage from '../../pageObjects/homeScreen/homeScreen'
import products from '../../testData/productsData/products.json'
import cartPage from '../../pageObjects/checkoutScreen/checkoutScreen.js';
import checkoutData from '../../testData/checkoutData/checkoutData.json'


test.describe('Checkout page functionality', async() =>{
    test('verify if added product is showing at the cart', async({page}) =>{
        const  loginPageObject =  new loginPage(page);
        await loginPageObject.login(LoginData.valid_username, LoginData.valid_password);
        const homePageObj = new homePage(page);
        const cartPageObj = new cartPage(page);
        await homePageObj.addToCart(products.productName2);
        await homePageObj.navigateToCartPage();
        expect(await cartPageObj.ifAddedProductShowing(products.productName2)).toBe(true);
    })
    test('Verify Check Out button can be pressed or  not', async({page}) =>{
        const  loginPageObject =  new loginPage(page);
        await loginPageObject.login(LoginData.valid_username, LoginData.valid_password);
        const homePageObj = new homePage(page);
        const cartPageObj = new cartPage(page);
        await homePageObj.addToCart(products.productName2);
        await homePageObj.navigateToCartPage();
        expect(await cartPageObj.isCheckoutPageShown()).toBe(true);
        expect(await cartPageObj.checkOut(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode, products.productName2)).toBe(true)
    })

    test('Verify User can add multiple product and continue shopping from Cart page', async({page}) =>{
        const  loginPageObject =  new loginPage(page);
        await loginPageObject.login(LoginData.valid_username, LoginData.valid_password);
        const homePageObj = new homePage(page);
        const cartPageObj = new cartPage(page);
        await homePageObj.addToCart(products.productName2);
        await homePageObj.navigateToCartPage();
        await cartPageObj.continueShoppingBtn.click();
        expect(await homePageObj.addMultipleProductsIntoCart(products.productName1, products.productName3)).toBe(true);
        await homePageObj.navigateToCartPage();
        expect(await cartPageObj.ifAddedProductShowing(products.productName1)).toBe(true);
        expect(await cartPageObj.ifAddedProductShowing(products.productName3)).toBe(true);

    })

    test('Verify User can remove product from Cart page', async({page}) =>{
        const  loginPageObject =  new loginPage(page);
        await loginPageObject.login(LoginData.valid_username, LoginData.valid_password);
        const homePageObj = new homePage(page);
        const cartPageObj = new cartPage(page);
        await homePageObj.addToCart(products.productName2);
        await homePageObj.navigateToCartPage();
        await cartPageObj.continueShoppingBtn.click();
        expect(await homePageObj.addMultipleProductsIntoCart(products.productName1, products.productName3)).toBe(true);
        await homePageObj.navigateToCartPage();
        await cartPageObj.ifAddedProductShowing(products.productName1)
        await cartPageObj.ifAddedProductShowing(products.productName3);
        expect(await cartPageObj.removeProductfromCart(products.productName1)).toBe(true);
        
    })
})
