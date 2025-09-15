import { Page, Locator, expect } from '@playwright/test';
import { TIMEOUT } from 'dns';
import { BillingInfo } from '../pages/checkout.page.ts';
import { ProductInfo } from '../pages/product-category.page.ts';

export class OrderStatusPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }   

    async checkStatus() {
        await this.page.waitForLoadState('domcontentloaded'); 
        await this.page.waitForLoadState('networkidle'); 
        await expect(this.page.getByText('Thank you. Your order has been received.')).toBeVisible({ timeout: 10000 });
    }


    async verifyOrderDetails(products: ProductInfo[], billingInfo: BillingInfo) {
        // Verify order details
        await this.page.waitForLoadState('domcontentloaded'); 
        await this.page.waitForLoadState('networkidle'); 

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

        for (const field of fields) {
            await expect(this.page.locator('address')).toContainText(field);
        }
       
    }
}