import { Locator, Page,expect } from '@playwright/test';
import { OrderInfo } from '../models/data.model';

export class MyAccountPage {
    readonly page: Page;
    readonly ordersLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.ordersLink = this.page.getByRole('listitem').filter({hasText: 'Order'})

    }

    async goto() {
        await this.page.goto('/my-account');
    }

    async verifyOrderHistory(orderInfoList: OrderInfo[]) {
        for (const orderInfo of orderInfoList) {
            // Verify each order's details in the order history
            const orderRow = this.page.getByRole('row', { name: new RegExp(orderInfo.orderID) });
            await expect(orderRow.getByRole('cell', { name: orderInfo.orderID })).toBeVisible();
            await expect(orderRow.getByRole('cell', { name: orderInfo.orderDate })).toBeVisible();
            let posfix = "S";
            if(orderInfo.numOfProducts > 1){
                let posfix = "S";
            }
            let priceDetailString = orderInfo.totalPrice + " FOR "+ orderInfo.numOfProducts + " ITEM" + posfix;
            const priceCell = await orderRow.getByRole('cell', { name: priceDetailString });
            await expect(priceCell).toBeVisible();
          
        }
    }
}