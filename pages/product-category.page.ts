import { Page } from '@playwright/test';
import { ProductInfo } from '../fixtures/product.fixture.ts';
import { off } from 'process';

export class ProductCategoryPage {
    readonly page: Page;
    readonly listLayoutButton;
    readonly gridLayoutButton;
    readonly shopOrderDropdown;
 
    constructor(page: Page) {
        this.page = page;
        this.listLayoutButton = this.page.locator('.switch-list');
        this.gridLayoutButton = this.page.locator('.switch-grid');
        this.shopOrderDropdown = this.page.getByRole('combobox', { name: 'Shop order' });
    }
    async switchLayout(mode: "grid" | "list") {
        if (mode === "grid") {
            await this.gridLayoutButton.click();
        } else {
            await this.listLayoutButton.click();
        }
    }

    async addToCart(itemName: ProductInfo[]) {
        for (const product of itemName) {
            // Implementation for adding an item to the cart
            await this.page.getByRole('link', { name: 'Add “' + product.name + '” to your cart' })
                .nth(1)
                .click();
            // Wait for the loading message to disappear
            await this.page.getByText('...').waitFor({ state: 'detached' });
        }
    }

    async sortProducts(orderBy: string | "Default sorting" | "Sort by popularity" | "Sort by average rating" | "Sort by latest" | "Sort by price: low to high" | "Sort by price: high to low" ) {
        await this.shopOrderDropdown.click();
        await this.page.locator('option').filter({ hasText: orderBy }).click();
        //await this.shopOrderDropdown.selectOption({ label: orderBy });
        await this.page.locator('.product-content-image').first().waitFor({ state: 'visible' });
    }

    async verifySorting(orderBy: string | "Sort by price: low to high" | "Sort by price: high to low" ) {
        /*
        const prices = await this.page.locator('.price').all();
        
        for (const price of prices) {
            const text = await price.locator('.bdi').textContent();
            console.log(text);
        }   
            */
        await this.page.waitForTimeout(20000);

        const prices = await this.page.locator('.price > .woocommerce-Price-amount > bdi').allTextContents();
        for (const price of prices) {
            console.log(price);
        } 
        console.log(prices.length);
        //await this.page.waitForTimeout(10000);

    }

}

