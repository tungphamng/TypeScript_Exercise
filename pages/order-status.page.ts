import { Page, Locator, expect } from '@playwright/test';
import { BillingInfo } from '../fixtures/billing.fixture.ts';
import { ProductInfo } from '../fixtures/product.fixture.ts';

export class OrderStatusPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }   

    async checkStatus() {
        await this.page.waitForLoadState('domcontentloaded'); 
        await this.page.waitForLoadState('networkidle'); 
    }


    async verifyOrderDetails(products: ProductInfo[], billingInfo: BillingInfo, paymentMethod: string) {
        // Verify order details
        await this.page.waitForLoadState('domcontentloaded'); 
        await this.page.waitForLoadState('networkidle'); 

        // Verify products in the order
        const orderTable = this.page.getByRole('table');
        for (const product of products) {
            await expect(orderTable.getByRole('cell', { name: product.name + '  ×' })).toBeVisible();
        }
    
        const fields = [
            billingInfo.firstName + ' ' + billingInfo.lastName,
            billingInfo.street,
            billingInfo.city,
            billingInfo.zip,
            billingInfo.email,
            billingInfo.phone
        ];
        // Verify billing information
        for (const field of fields) {
            await expect(this.page.locator('address')).toContainText(field);
        }

        // Verify payment method
        await expect(this.page.getByRole('listitem').filter({ hasText: 'Payment method:'})).toContainText(paymentMethod);
       
    }
}