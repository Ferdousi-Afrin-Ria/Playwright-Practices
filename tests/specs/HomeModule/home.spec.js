import {test, expect} from '@playwright/test'
import loginPage from '../../pageObjects/loginScreen/loginScreen'
import LoginData from '../../testData/loginData/loginData.json' assert { type: 'json' };
import homePage from '../../pageObjects/homeScreen/homeScreen'
import products from '../../testData/productsData/products.json'
import cartPage from '../../pageObjects/checkoutScreen/checkoutScreen';


test.describe('Home module functionality', () =>{

    test('Verify product details page is shown properly', async({page})=>{

        const  loginPageObject =  new loginPage(page);
        await loginPageObject.login(LoginData.valid_username, LoginData.valid_password);
        const homePageObj = new homePage(page);
        const productDetailPage = await homePageObj.viewProductDetails(products.productName4);
        await expect(productDetailPage).toBe(true)

    })

    test('Validate products can be added into Cart', async({page}) =>{
         const  loginPageObject =  new loginPage(page);
         await loginPageObject.login(LoginData.valid_username, LoginData.valid_password);
         const homePageObj = new homePage(page);
         const beforeCount = await homePageObj.getCartCount();
         await expect(await homePageObj.addToCart(products.productName2)).toBe(true);
         const afterCount = await homePageObj.getCartCount();
         expect(afterCount).toBe(beforeCount+1)
    })

     test('Validate "Name (Z to A)" can be selected from filter dropdown', async ({ page }) => {
        const loginPageObject = new loginPage(page);
        await loginPageObject.login(LoginData.valid_username, LoginData.valid_password);
        const homePageObj = new homePage(page);
        expect(await homePageObj.selectNameZtoA()).toBe(true);
    });

    test('Validate Price Low to High can be selected from filter dropdown' , async ({page}) =>{
        const loginPageObject = new loginPage(page);
        await  loginPageObject.login(LoginData.valid_username, LoginData.valid_password);
        const homePageObj =  new homePage(page);
        expect(await homePageObj.selectPriceLowtoHigh()).toBe(true);
    });

     test('Validate Price High to Low can be selected from filter dropdown' , async ({page}) =>{
        const loginPageObject = new loginPage(page);
        await  loginPageObject.login(LoginData.valid_username, LoginData.valid_password);
        const homePageObj =  new homePage(page);
        expect(await homePageObj.selectPriceHightoLow()).toBe(true);
    })

    test('validate if user can navigate to cart page by pressibg Cart icon', async({page}) =>{
        const loginPageObject = new loginPage(page);
        await  loginPageObject.login(LoginData.valid_username, LoginData.valid_password);
        const homePageObj =  new homePage(page);
        expect(await homePageObj.navigateToCartPage()).toBe(true);
    })

    test('validate product can be removed from home page or not', async({page}) =>{
        const loginPageObject = new loginPage(page);
        await  loginPageObject.login(LoginData.valid_username, LoginData.valid_password);
        const homePageObj =  new homePage(page);
        await homePageObj.addToCart(products.productName2);
        await homePageObj.navigateToCartPage();
        const cartPageObj = new cartPage(page);
        await cartPageObj.ifAddedProductShowing(products.productName2)
        await cartPageObj.continueShoppingBtn.click();
        await homePageObj.addToCart(products.productName1);
        await homePageObj.removeProductfromHome(products.productName2)

    })
})