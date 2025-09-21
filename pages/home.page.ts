import { Page, Locator, expect } from '@playwright/test';
import { ProductInfo } from '../models/data.model';
import { WaitUtil } from '../utils/wait-util';


export class HomePage {
    readonly page;
    readonly closeButton: Locator;
    readonly allDepartmentsLink : Locator;
    readonly electronicComponentsLink : Locator;
    readonly cartLink : Locator;

    constructor(page: Page) {
        this.page = page;
        this.closeButton = this.page.getByRole('button', {name: 'Close' });
        this.electronicComponentsLink = this.page.getByRole('link', { name: ' Electronic Components &' });
        this.allDepartmentsLink = this.page.getByText('All departments');
        this.cartLink = this.page.getByRole('link', { name: /\d+\s\$/ });
    }

    async goto() {
        await this.page.goto('/');
        await this.closeButton.click();
    }

    async gotoMenu(menuName: string) {
        await this.page.locator('#menu-main-menu-1').getByRole('link', { name: menuName }).click();
    }

    async gotoComponentsCategory(componentName: string) {
        this.allDepartmentsLink.click();
        await this.page.getByRole('link', { name: new RegExp(componentName) }).click();
    }

    async openQuickViewCart() {
        await this.cartLink.hover();
    }

    async gotoCartPage() {
        await this.cartLink.click();
    }

    async gotoCheckoutPage() {
        await this.openQuickViewCart();
        await this.page.getByRole('link', { name: 'Checkout' }).click();
    }

    async verifyProductInCart(itemName: ProductInfo[]) {
        await this.openQuickViewCart();
        for(const product of itemName) {
            await expect.soft(this.page.locator('#header').getByRole('link', { name: product.name })).toBeVisible();
        }
    }

    async clickCheckoutFromCart() {
        await this.page.getByRole('link', { name: 'Checkout' }).click();
    }

    async removedProductInCart(itemName: ProductInfo) {
        await this.openQuickViewCart();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle');

        const productInCart = this.page.locator('.cart-widget-products > li').filter({ hasText: itemName.name }).nth(0);
        const count = await productInCart.count();
        console.log('Count of product in cart: ' + count);
        if (count > 0) {
            const removeButton = productInCart.locator('.remove');
            await removeButton.click();
        }
        await WaitUtil.waitForLocatorNotExist(productInCart);
   }
}