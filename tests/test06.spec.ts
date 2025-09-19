import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page.ts';
import { ProductCategoryPage } from '../pages/product-category.page.ts';
import { billingInfo, products} from '../data/test-data.ts';
import { ProductInfo } from '../models/data.model.ts';
import { CheckoutPage } from '../pages/checkout.page.ts';
import { PaymentMethod } from '../enum/data.enum.ts';
import { OrderStatusPage } from '../pages/order-status.page.ts';


test('TC_05 Verify users try to buy an item without logging in (As a guest)', async ({ page }) => {
    const productTemp: ProductInfo[] = [products[0]];
    
    // 1. Open https://demo.testarchitect.com/
    const homepage =  new HomePage(page);
    await homepage.goto();

    // 2. Navigate to 'Shop' or 'Products' section
    await homepage.gotoMenu('Shop');

    // 3. Add a product to cart
    const productCategoryPage = new ProductCategoryPage(page);
    await productCategoryPage.addToCart(productTemp);

    // 4. Click on Cart button
    // 5. Proceed to complete order
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.orderProduct(billingInfo,PaymentMethod.CheckPayments);

    //VP. Guests should be able to purchase the order successfully
    await new OrderStatusPage(page).verifyOrderDetails(productTemp,undefined, PaymentMethod.CheckPayments);

});