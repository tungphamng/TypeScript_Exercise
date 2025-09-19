import { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';
import { ProductInfo } from '../fixtures/product.fixture.ts';

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

    async checkOrderItem(itemName: ProductInfo[]) {
        for (const product of itemName) {
            const itemRow = await this.productTable.getByRole('row', { name: new RegExp(product.name, 'i') });
            await expect(itemRow).toBeVisible();
        }
        
    }

    async proceedToCheckout() {
        await this.processCheckOutButton.click();
    }

    
}