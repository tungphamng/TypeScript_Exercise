import { Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput;
    readonly passwordInput;
    readonly loginButton;
    readonly welcomeLabel;  

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = this.page.getByRole('textbox', { name: 'Username or email address *' });
        this.passwordInput = this.page.getByRole('textbox', { name: 'Password *' });
        this.loginButton = this.page.getByRole('button', { name: 'Log in' });
        this.welcomeLabel = this.page.getByText('Welcome to your account page');
    }

    async goto() {  
        await this.page.goto('/my-account/');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async isLoginSuccessful() {
        return await this.welcomeLabel.isVisible();
    }
}

type UserInfo = {
  user: string;
  pass: string;
}

export const UserInfo: UserInfo = {
   user: process.env.USER || 'tung.pham',
   pass: process.env.PASS || '123456789',
};