import { expect, Page } from '@playwright/test';
import { ProductInfo } from '../models/data.model';  
import { SortType } from '../enum/data.enum.ts';

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

    async checkLayout(mode: "grid" | "list") {
        if (mode === "grid") {
            await expect(this.gridLayoutButton).toHaveClass(/switcher-active/, { timeout: 10000 });
            //await expect(this.listLayoutButton).not.toHaveClass(/switcher-active/);
        } else {
            await expect(this.listLayoutButton).toHaveClass(/switcher-active/, { timeout: 10000 });
            //await expect(this.gridLayoutButton).not.toHaveClass(/switcher-active/);
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

    async sortProducts(orderBy: SortType) {
        await this.shopOrderDropdown.selectOption({ label: orderBy });
        await this.page.waitForTimeout(2000);
        await this.shopOrderDropdown.selectOption({ label: orderBy });
        await this.page.waitForTimeout(2000);
        await this.page.locator('.product-content-image').first().waitFor({ state: 'visible' });
    }

    async verifySorting(orderBy: string | SortType.PriceAsc | SortType.PriceDesc) {
        // Get all price elements
        const prices = this.page.locator('.content-product .price');
        const pricesElementsNum = await prices.count();

        let priceList: number[] = [];
        for (let i = 0; i < pricesElementsNum; i++) {
            const priceLocator = prices.nth(i);
            //Fine the price in case of sale
            const insLocator = await priceLocator.locator('ins .woocommerce-Price-amount.amount > bdi');
            const count = await insLocator.count();
            //console.log("count: " + count);
            let priceValue: string | null;
            
            if (count > 0) {
                priceValue = await insLocator.first().textContent();
                let value = priceValue?.replace("$","").replace(",","");
                priceList.push(Number(value));
                
            } else {
                const priceValue = await priceLocator.locator('.woocommerce-Price-amount.amount > bdi').textContent();
                let value = priceValue?.replace("$","").replace(",","");
                console.log("count:" + count + "regular: " + value?.trim());
                priceList.push(Number(value));
            }  
        } 

        let sortedPriceList: number[] = [];
        if(orderBy === SortType.PriceAsc){
            sortedPriceList = [...priceList].sort((a, b) => a - b);
        }

        if(orderBy === SortType.PriceDesc){
            sortedPriceList = [...priceList].sort((a, b) => b - a);
        }
        expect(priceList).toEqual(sortedPriceList);
        
    }

}

