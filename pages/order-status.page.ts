import { Page, Locator, expect } from '@playwright/test';
import { TIMEOUT } from 'dns';
import { BillingInfo } from '../pages/checkout.page.ts';

export class OrderStatusPage {
    readonly page: Page;
    readonly orderNumberInput: Locator;
    readonly billingAddress: Locator;

    constructor(page: Page) {
        this.page = page;
    }   

    async checkStatus() {
        await expect(this.page.getByText('Thank you. Your order has been received.')).toBeVisible({ timeout: 10000 });
    }

    async verifyOrderDetails(product: { name: string; quantity: number }, billingInfo: BillingInfo) {

        const orderTable = this.page.getByRole('table');
        await expect(orderTable.getByRole('cell', { name: product.name + '  ×' })).toBeVisible();

       /*  const billingTitle = this.page.getByText('Billing address')
        await expect(billingTitle).toBeVisible(); */

        const billingSection = this.page.getByRole('row');
        //await expect(billingSection).toBeVisible();

        // const billingSection1 = await this.page.locator('woocommerce-order');
        // await expect(billingSection).toBeVisible();

        const fields = [
            billingInfo.firstName + ' ' + billingInfo.lastName,
            billingInfo.street,
            billingInfo.city,
            billingInfo.state,
            billingInfo.country,
            billingInfo.zip,
            billingInfo.email,
            billingInfo.phone
        ];

        for (const field of fields) {
            await expect(billingSection.filter({ hasText: field })).toBeVisible();
        }
       
    }
}