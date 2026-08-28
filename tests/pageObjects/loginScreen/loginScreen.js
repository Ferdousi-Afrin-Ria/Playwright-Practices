import TestConfig from "../../../testConfig";

class loginPage{
   constructor(page){
        this.page = page;
        this.userName = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginBtn = page.locator('#login-button');
        this.error = page.locator("h3[data-test='error']")
    }
    async login(username, password){
        await this.page.goto(TestConfig.baseUrl);
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click()
        
    }

    // async loginInvalidUser(username,password){
    //     await this.login(username,password);
    //     const errorText = await this.error.toBeVisible();
    //     if(errorText){
    //         return true
    //     }else return false
    // }
}



export default loginPage;