import { Page, Locator, expect } from '@playwright/test';
import { ProductInfo, BillingInfo } from '../models/data.model';  

export class OrderStatusPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }   

    async checkStatus() {
        await this.page.waitForLoadState('domcontentloaded'); 
        await this.page.waitForLoadState('networkidle'); 

    }


    async verifyOrderDetails(products: ProductInfo[], billingInfo: BillingInfo| undefined, paymentMethod: string) {
        // Verify order details
        await this.page.waitForLoadState('domcontentloaded'); 
        await this.page.waitForLoadState('networkidle'); 
        //await this.page.waitForTimeout(5000);

        // Verify products in the order
        const orderTable = this.page.getByRole('table');
        for (const product of products) {
            await expect.soft(orderTable.getByRole('cell', { name: product.name + '  ×' })).toBeVisible();
        }
    
        // Verify billing information if provided
        if (billingInfo) {
            const fields = [
                billingInfo.firstName + ' ' + billingInfo.lastName,
                billingInfo.street,
                billingInfo.city,
                billingInfo.zip,
                billingInfo.email,
                billingInfo.phone
        ];
        // Verify billing information

        await this.page.locator('address').waitFor({state: 'visible'});
        for (const field of fields) {
            await expect(this.page.locator('address')).toContainText(field);
        }

        // Verify payment method
        await expect(this.page.getByRole('listitem').filter({ hasText: 'Payment method:'})).toContainText(paymentMethod);
       
    }
}
}