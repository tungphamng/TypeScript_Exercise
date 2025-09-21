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
    let orderInfoList: OrderInfo[] = [];
    const productTemp = [products[0],products[2]];
    const homepage = new HomePage(page);
    await homepage.goto();

    //Login with valid credentials
    const loginPage = new LoginPage(page);
    await loginPage.login(userInfo.username, userInfo.password);

    for (let i = 0; i < 2; i++) {

        // Go to Shop page
        await homepage.gotoMenu('Shop');
        
        // Select multiple items and add to cart
        const productCategory = new ProductCategoryPage(page);
        await productCategory.addToCart(productTemp);

        // Go to shopping cart page
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.orderProduct(billingInfo, PaymentMethod.DirectBankTransfer);
        orderInfoList.push(await new OrderStatusPage(page).getOrderDetails());

    }
    // 1. Go to My Account page
    const myAccountPage = new MyAccountPage(page);
    await myAccountPage.goto();

    // 2. Click on Orders in left navigation
    // 3. Verify order details
    await myAccountPage.verifyOrderHistory(orderInfoList);

});