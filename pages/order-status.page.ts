import { Page, Locator, expect } from '@playwright/test';
import { ProductInfo, BillingInfo, OrderInfo } from '../models/data.model';  

export class OrderStatusPage {
    readonly page: Page;
    readonly orderNumber: Locator;
    readonly orderDate: Locator;
    readonly orderTotal: Locator

    constructor(page: Page) {
        this.page = page;
        this.orderNumber = page.getByRole("listitem").filter({ hasText: 'Order number:'});
        this.orderDate = page.getByRole("listitem").filter({ hasText: 'Date:'});
        this.orderTotal = page.getByRole("listitem").filter({ hasText: 'Total:'});
    }   

    async checkStatus() {
        await this.page.waitForLoadState('domcontentloaded'); 
        await this.page.waitForLoadState('networkidle'); 

    }


    async verifyOrderDetails(products: ProductInfo[], billingInfo: BillingInfo| undefined, paymentMethod: string) {
        // Verify order details
        await this.page.waitForLoadState('domcontentloaded'); 
        await this.page.waitForLoadState('networkidle'); 
        //await this.page.waitForTimeout(5000);

        // Verify products in the order
        const orderTable = this.page.getByRole('table');
        for (const product of products) {
            await expect.soft(orderTable.getByRole('cell', { name: product.name + '  ×' })).toBeVisible();
        }
    
        // Verify billing information if provided
        if (billingInfo) {
            const fields = [
                billingInfo.firstName + ' ' + billingInfo.lastName,
                billingInfo.street,
                billingInfo.city,
                billingInfo.zip,
                billingInfo.email,
                billingInfo.phone
        ];
        // Verify billing information

        await this.page.locator('address').waitFor({state: 'visible'});
        for (const field of fields) {
            await expect(this.page.locator('address')).toContainText(field);
        }

        // Verify payment method
        await expect(this.page.getByRole('listitem').filter({ hasText: 'Payment method:'})).toContainText(paymentMethod);
       
    }}


    async getOrderDetails() {
        await this.page.waitForLoadState('domcontentloaded'); 
        await this.page.waitForLoadState('networkidle'); 
        var numberOfProducts = 0;

        const productTableRows = await this.page.getByRole('row').all()
        for(let i=0; i<productTableRows.length; i++){
            const rowText = await productTableRows[i].innerText();
            //console.log("B Row " + i + ": " + rowText);
                
            if(rowText.includes('$') && !rowText.includes(':') && !rowText.includes('Subtotal')  && !rowText.includes('TOTAL')){
                console.log("Row " + i + ": " + rowText);
                let quantityText = (rowText.split('×')[1]).split('\t')[0];
                console.log("---Quantity Text: " + quantityText);
                numberOfProducts += parseInt(quantityText);
            }

        }
        console.log("Number of products: " + numberOfProducts);
        const orderID = (await this.orderNumber.innerText()).split(':')[1].trim();  
        console.log("Order ID: " + orderID);
        const orderDate = (await this.orderDate.innerText()).split(':')[1].trim();  
        console.log("Order Date: " + orderDate);
        const orderTotalText = (await this.orderTotal.innerText()).split(':')[1].trim();  
        console.log("Order Total Text: " + orderTotalText);

        return new OrderInfo(orderID, orderDate, numberOfProducts, orderTotalText);
    }

}