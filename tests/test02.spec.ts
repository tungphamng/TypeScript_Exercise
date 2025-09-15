import { test, expect } from '@playwright/test';
import { LoginPage} from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { ProductCategoryPage, products } from '../pages/product-category.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage, BillingInfo } from '../pages/checkout.page';
import { OrderStatusPage } from '../pages/order-status.page';
import { UserInfo } from '../pages/login.page';



test('TC_02 Verify users can buy multiple item successfully', async ({ page }) => {
  // 1. Open browser and go to https://demo.testarchitect.com/
  const homepage = new HomePage(page);
  await homepage.goto();

  // 2. Login with valid credentials 
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(UserInfo.user, UserInfo.pass);
  //await loginPage.isLoginSuccessful();
  
  // 3. Go to Shop page
  await homepage.gotoMenu('Shop');

  const productCategory = new ProductCategoryPage(page);

  // 4. Select multiple items and add to cart
  for (const product of products) {
    await productCategory.addToCart(product.name);
  }

  // 5. Go to the cart and verify all selected items
  const cartPage = new CartPage(page);
  await cartPage.goto();

  for (const product of products) {
    await cartPage.checkOrderItem(product.name);
  }

  // 6. Proceed to checkout and confirm order
  await cartPage.proceedToCheckout();

  const checkoutPage = new CheckoutPage(page);
  for (const product of products) {
    await checkoutPage.verifyOrderItem(product.name);
  }
  
  await checkoutPage.fillBillingInformation(new BillingInfo());
  await checkoutPage.placeOrderButton.click();
  
  // 7. Verify order confirmation message
  const orderPage = new OrderStatusPage(page);
  await orderPage.verifyOrderDetails(products, new BillingInfo());

});


