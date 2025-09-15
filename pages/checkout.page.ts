import { expect, Page, Locator} from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly citySelect: Locator;
    readonly countrySelect: Locator;
    readonly streetInput: Locator;
    readonly emailInput: Locator;
    readonly stateInput: Locator;
    readonly zipInput: Locator;
    readonly phoneInput: Locator;
    readonly placeOrderButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = this.page.getByRole('textbox', { name: 'First name *' });
        this.lastNameInput = this.page.getByRole('textbox', { name: 'Last name *' });
        this.streetInput = this.page.getByRole('textbox', { name: 'Street address *' });
        this.citySelect = this.page.getByRole('textbox', { name: 'Town / City *' });
        this.countrySelect = this.page.getByRole('combobox', { name: 'Country / Region' });
        this.emailInput = this.page.getByRole('textbox', { name: 'Email address *' });
        this.stateInput = this.page.getByRole('combobox', { name: 'State' });
        this.zipInput = this.page.getByRole('textbox', { name: 'ZIP Code *' });
        this.phoneInput = this.page.getByRole('textbox', { name: 'Phone *' });
        this.placeOrderButton = this.page.getByRole('button', { name: 'Place order' }); 
    }

    async goto() {
        await this.page.goto('/checkout');
    }

    async isCheckoutPageDisplayed() {
        await this.page.waitForURL(/.*checkout.*/);
    }

    async verifyOrderItem(itemName: string) {
        //const orderTable = this.page.getByRole('table').filter({ hasText: 'ORDER' });
        expect(this.page.getByRole('cell', { name: itemName + '  ×' })).toBeVisible();
    }

    async fillBillingInformation(billingInfo: { 
            firstName: string;
            lastName: string; 
            street: string; 
            city: string; 
            country: string; 
            state: string; 
            zip: string; 
            email: string; 
            phone: string }) {
        await this.firstNameInput.clear();
        await this.firstNameInput.fill(billingInfo.firstName);
        await this.lastNameInput.clear();
        await this.lastNameInput.fill(billingInfo.lastName);
        await this.countrySelect.click();
        await this.page.getByRole('option', { name: billingInfo.country , exact: true }).click();
        await this.streetInput.fill(billingInfo.street);
        await this.citySelect.fill(billingInfo.city);
        await this.stateInput.click();
        await this.page.getByRole('option', { name: billingInfo.state , exact: true }).click();
        await this.zipInput.fill(billingInfo.zip);
        await this.emailInput.fill(billingInfo.email);
        await this.phoneInput.fill(billingInfo.phone);  
    }
}


export class BillingInfo  {
    readonly firstName: string;
    readonly lastName: string;
    readonly city: string;
    readonly country: string;
    readonly street: string;
    readonly state: string;
    readonly zip: string;
    readonly email: string;
    readonly phone: string;
    constructor() {
        this.firstName = 'Tung';
        this.lastName = 'Pham';
        this.street = '123 Main St';
        this.city = 'HCM';
        this.country = 'United States (US)';
        this.state = 'Alabama';
        this.zip = '70000';
        this.email = 'tung.pham@example.com';
        this.phone = '555-1234';
    }
};

