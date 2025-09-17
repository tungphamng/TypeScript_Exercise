import { test, expect } from '@playwright/test';
import { LoginPage} from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { ProductCategoryPage } from '../pages/product-category.page';
import { CheckoutPage } from '../pages/checkout.page';
import { OrderStatusPage } from '../pages/order-status.page';
import { UserInfo } from '../pages/login.page';
import { billingInfo } from '../fixtures/billing.fixture.ts';
import { paymentMethods } from '../fixtures/payment-method.fixture.ts';
import { products } from '../fixtures/product.fixture.ts';

test ('TC_03 Verify users can buy an item using different payment methods (all payment methods)', async ({ page }) => {
  const productTemp = [products[1]];
  // 1. Open browser and go to https://demo.testarchitect.com/
  const homepage = new HomePage(page);
  await homepage.goto();

  // 2. Login with valid credentials 
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(UserInfo.user, UserInfo.pass);
  ``
  for (const method of paymentMethods) {
    // 3. Go to Shop page
    await homepage.gotoMenu('Shop');

    // 4. Select an item and add to cart
    const productCategory = new ProductCategoryPage(page);
    await productCategory.addToCart(productTemp);

    // 5. Go to Checkout page
    const checkoutPage = new CheckoutPage(page);
    checkoutPage.goto();
    await checkoutPage.fillBillingInformation(billingInfo);
  
    // 6. Choose a different payment method (Direct bank transfer, Cash on delivery)
    await checkoutPage.selectPaymentMethod(method.methodName);
    
    // 7. Complete the payment process
    await checkoutPage.placeOrderButton.click();
  
    // 8. Verify order confirmation message
    const orderPage = new OrderStatusPage(page);
    await orderPage.verifyOrderDetails(productTemp, billingInfo, method.methodName );
  }

});


