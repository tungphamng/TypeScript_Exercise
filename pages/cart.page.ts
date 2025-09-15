import { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly productTable: Locator;
    readonly cartTable: Locator;
    readonly processCheckOutButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.productTable = this.page.getByRole('table').filter({ hasText: 'PRODUCT' });
        this.cartTable = this.page.getByRole('table').filter({ hasText: 'CART' });
        this.processCheckOutButton = this.page.getByRole('link', { name: 'Proceed to checkout' });

    }

    async goto() {
        await this.page.goto('/cart');
    }

    async checkOrderItem(itemName: string) {
        const itemRow = await this.productTable.getByRole('row', { name: new RegExp(itemName, 'i') });
        await expect(itemRow).toBeVisible();
    }

    async proceedToCheckout() {
        await this.processCheckOutButton.click();
    }

    
}