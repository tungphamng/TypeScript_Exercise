import { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';
import { ProductInfo } from '../models/data.model';
import { AdjustQuantityType } from '../enum/data.enum';

export class CartPage {
    readonly page: Page;
    readonly productTable: Locator;
    readonly cartTable: Locator;
    readonly processCheckOutButton: Locator;
    readonly clearCartButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.productTable = this.page.getByRole('table').filter({ hasText: 'PRODUCT' });
        this.cartTable = this.page.getByRole('table').filter({ hasText: 'CART' });
        this.processCheckOutButton = this.page.getByRole('link', { name: 'Proceed to checkout' });
        this.clearCartButton = this.page.getByText('Clear shopping cart');

    }

    async goto() {
        await this.page.goto('/cart');
    }

    async checkOrderItem(itemName: ProductInfo[]) {
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle');
        for (const product of itemName) {
            const itemRow = await this.productTable.getByRole('row', { name: new RegExp(product.name, 'i') });
            await expect.soft(itemRow).toBeVisible();
        }  
    }

    async proceedToCheckout() {
        await this.processCheckOutButton.click();
    }

    async clearCart() {
        await this.clearCartButton.click();

        this.page.once('dialog', async (dialog) => {
            console.log(dialog.message());  // In ra: "Are you sure?"
            await dialog.accept();          //  click OK
        });
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle');
        
    }

    async checkEmptyCart() {
        await expect(this.page.getByRole('heading', { name: 'YOUR SHOPPING CART IS EMPTY'})).toBeVisible();
    }

    
    async checkQuantity(product: ProductInfo, quantity: number) {
        const itemRow = await this.productTable.getByRole('row', { name: new RegExp(product.name, 'i') });
        const quantityInput = itemRow.getByRole('spinbutton');
        await expect(quantityInput).toHaveValue(String(quantity));
    }

    async checkSubTotal(product: ProductInfo, currentProductPrice: number, quantity: number) {
        const itemRow = await this.productTable.getByRole('row', { name: new RegExp(product.name, 'i') });
        const subTotal = itemRow.locator('.product-subtotal .woocommerce-Price-amount.amount > bdi');
        const rawValue = await subTotal.textContent();
        const valueTemp = rawValue?.replace('$','').replace(',','');
        const expectedSubTotal = currentProductPrice * quantity;
        expect(Number(valueTemp)).toEqual(expectedSubTotal);
    }

    async setQuantityInput(product: ProductInfo, quantity: number) {
        const itemRow = await this.productTable.getByRole('row', { name: new RegExp(product.name, 'i') });
        const subTotal = itemRow.locator('.product-subtotal .woocommerce-Price-amount.amount > bdi');
        const oldValue = await subTotal.textContent();
        
        const quantityInput = itemRow.getByRole('spinbutton');
        await quantityInput.fill(String(quantity));
        await this.page.getByRole('button', { name: 'UPDATE CART' }).click();
        
        //Wait for the loading icon disappear
        if (oldValue != null) {
            await expect(subTotal).not.toHaveText(oldValue,{ timeout: 10000 });
        }

    }

    async adjustQuantity(product: ProductInfo, type: AdjustQuantityType, times: number) {
        const itemRow = this.productTable.getByRole('row', { name: new RegExp(product.name, 'i') });
        const subTotal = itemRow.locator('.product-subtotal .woocommerce-Price-amount.amount > bdi');
        
        const quantityInput = itemRow.locator(`.${type}`);
        for (let i = 0; i < times; i++) {
            const oldValue = await subTotal.textContent();
            await quantityInput.click();
            //Wait for the loading icon disappear
            if (oldValue != null) {
                await expect(subTotal).not.toHaveText(oldValue,{ timeout: 10000 });
            }
        } 
    }

    async removeProduct(product: ProductInfo) {
        const itemRow = this.productTable.getByRole('row', { name: new RegExp(product.name, 'i') });
        const subTotal = itemRow.locator('.product-subtotal .woocommerce-Price-amount.amount > bdi');
        const count = await itemRow.count();
        if (count === 0) {
            const oldValue = await subTotal.textContent();
            const removeButton = itemRow.getByRole('link', { name: 'Remove' });
            await removeButton.click();
            
            //Wait for the loading icon disappear
            if (oldValue != null) {
                await expect(subTotal).not.toHaveText(oldValue,{ timeout: 10000 });
            }
        }
    }

 
}