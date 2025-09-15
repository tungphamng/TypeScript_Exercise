import { test, expect } from '@playwright/test';
import { LoginPage} from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { ProductCategoryPage, products } from '../pages/product-category.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage, BillingInfo } from '../pages/checkout.page';
import { OrderStatusPage } from '../pages/order-status.page';
import { UserInfo } from '../pages/login.page';



test('TC01 - Verify users can buy an item successfully', async ({ page }) => {
  const productTemp = [products[0]];
  // 1. Open browser and go to https://demo.testarchitect.com/
  const homepage = new HomePage(page);
  await homepage.goto();

  // 2. Login with valid credentials 
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(UserInfo.user, UserInfo.pass);
  //await loginPage.isLoginSuccessful();
  
  // 3. Navigate to All departments section
  await homepage.allDepartmentsLink.click();
  
  // 4. Select Electronic Components & Supplies
  await homepage.electronicComponentsLink.click();
  const productCategory = new ProductCategoryPage(page);

  // 5. Verify the items should be displayed as a grid
  await expect(productCategory.gridLayoutButton).toHaveClass(/switcher-active/);

  // 6. Switch view to list
  await productCategory.switchLayout("list");

  // 7. Verify the items should be displayed as a list
  await expect(productCategory.listLayoutButton).toHaveClass(/switcher-active/);
  await productCategory.switchLayout("grid");

  // 8. Select any item randomly to purchase
  // 9. Click 'Add to Cart'
  await productCategory.addToCart(productTemp[0].name);

  // 10. Go to the cart
  const cartPage = new CartPage(page);
  await cartPage.goto();

  // 11. Verify item details in mini content
  await cartPage.checkOrderItem(productTemp[0].name);

  // 12. Click on Checkout
  await cartPage.proceedToCheckout();

  // 13. Verify Checkout page displays
  const checkoutPage = new CheckoutPage(page);
  await expect(page).toHaveURL(/.*checkout.*/);
  //await checkoutPage.isCheckoutPageDisplayed();

  // 14. Verify item details in order
  await checkoutPage.verifyOrderItem(productTemp[0].name);

  // 15. Fill the billing details with default payment method

  await checkoutPage.fillBillingInformation(new BillingInfo());

  // 16. Click on PLACE ORDER
  await checkoutPage.placeOrderButton.click();

    // 16. Verify Order status page displays
  const orderPage = new OrderStatusPage(page);
  await orderPage.checkStatus();
  
  //await orderPage.checkStatus();
  // 17. Verify the Order details with billing and item information

  await orderPage.verifyOrderDetails(productTemp, new BillingInfo());

});


