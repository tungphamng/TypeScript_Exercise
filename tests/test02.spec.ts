import { test } from '@playwright/test';
import { LoginPage} from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { ProductCategoryPage } from '../pages/product-category.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { OrderStatusPage } from '../pages/order-status.page';
import { UserInfo } from '../pages/login.page';
import { billingInfo } from '../fixtures/billing.fixture.ts';
import { products } from '../fixtures/product.fixture.ts';


test('TC_02 Verify users can buy multiple item successfully', async ({ page }) => {
  // 1. Open browser and go to https://demo.testarchitect.com/
  const homepage = new HomePage(page);
  await homepage.goto();

  // 2. Login with valid credentials 
  await new LoginPage(page).login(UserInfo.user, UserInfo.pass);

  // 3. Go to Shop page
  await homepage.gotoMenu('Shop');

  // 4. Select multiple items and add to cart
  await new ProductCategoryPage(page).addToCart(products);
  await homepage.gotoCartPage();

  // 5. Go to the cart and verify all selected items
  const cartPage = new CartPage(page);
  await cartPage.checkOrderItem(products);
 
  // 6. Proceed to checkout and confirm order
  await cartPage.proceedToCheckout();

  const checkoutPage = new CheckoutPage(page);
 
  await checkoutPage.checkOrderItem(products);
  
  await checkoutPage.fillBillingInformation(billingInfo);
  await checkoutPage.placeOrderButton.click();
  
  // 7. Verify order confirmation message
  await new OrderStatusPage(page).verifyOrderDetails(products, billingInfo, "Direct bank transfer");

});


