import {test, expect} from '@playwright/test'
import LoginData from '../../testData/loginData/loginData.json' assert { type: 'json' };
import loginPage from '../../pageObjects/loginScreen/loginScreen.js';


test.describe('login Page functionality', () =>{


    test('Verify user can login using valid credentials', async({page}) =>{
        const  loginPageObject =  new loginPage(page);
        await loginPageObject.login(LoginData.valid_username, LoginData.valid_password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    })

    test ('Verify if login with invalid user', async({page}) =>{
        const loginPageObject = new loginPage(page);
        await loginPageObject.login(LoginData.invalid_username, LoginData.invalid_password);
        await expect(loginPageObject.error).toBeVisible();
    })

})