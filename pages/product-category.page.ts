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
    }

}