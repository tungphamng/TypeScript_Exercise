import { test } from '@playwright/test';
import { LoginPage} from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { ProductCategoryPage } from '../pages/product-category.page';
import { PaymentMethod, SortType } from '../enum/data.enum.ts';
import { billingInfo, products, userInfo} from '../data/test-data.ts';
import { MyAccountPage } from '../pages/my-account.page.ts';
import { CheckoutPage } from '../pages/checkout.page.ts';
import { OrderStatusPage } from '../pages/order-status.page.ts';
import { OrderInfo } from '../models/data.model.ts';


test('TC_05 Verify orders appear in order history', async ({ page }) => {
    var orderInfoList: OrderInfo[] = [];
    const productTemp = [products[0],products[2]];
    const homepage = new HomePage(page);
    await homepage.goto();
    
    // 2. Login with valid credentials 
    await new LoginPage(page).login(userInfo.username, userInfo.password);
    for(let i=1; i<2; i++){

        // 3. Go to Shop page
        await homepage.gotoMenu('Shop');
        
        // 4. Select multiple items and add to cart
        await new ProductCategoryPage(page).addToCart(productTemp);

        await new CheckoutPage(page).orderProduct(billingInfo, PaymentMethod.DirectBankTransfer);
        orderInfoList.push(await new OrderStatusPage(page).getOrderDetails());

    }

    // 1. Go to My Account page
    const myAccountPage = new MyAccountPage(page);
    await myAccountPage.goto();
    await myAccountPage.ordersLink.click();
    await myAccountPage.verifyOrderHistory(orderInfoList);




    
    
    
    // 2. Click on Orders in left navigation
    // 3. Verify order details

});