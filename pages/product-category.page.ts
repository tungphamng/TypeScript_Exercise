import { Page } from '@playwright/test';



export class ProductCategoryPage {
    readonly page: Page;
    readonly listLayoutButton;
    readonly gridLayoutButton;
 
    constructor(page: Page) {
        this.page = page;
        this.listLayoutButton = this.page.locator('.switch-list');
        this.gridLayoutButton = this.page.locator('.switch-grid');
    }
    async switchLayout(mode: "grid" | "list") {
        if (mode === "grid") {
            await this.gridLayoutButton.click();
        } else {
            await this.listLayoutButton.click();
        }
    }

    async addToCart(itemName: string) {
        // Implementation for adding an item to the cart
        await this.page.getByRole('link', { name: 'Add “' + itemName }).nth(1).click();
        // Wait for the loading message to disappear
        await this.page.getByText('...').waitFor({ state: 'detached' });
    }

}

export type ProductInfo = {
    name: string; 
}

export const products: ProductInfo[] = [
    {
        name: 'DJI Phantom 4 Camera Drone',
    },
    {
        name: 'AirPods',
    },
    {
        name: 'Beats Solo3 Wireless On-Ear',
       
    },
    {
        name: 'Canon i-SENSYS LBP6030W with Wi-Fi',
    }
];