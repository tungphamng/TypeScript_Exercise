import { test, expect } from '@playwright/test';
import { LoginPage} from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { ProductCategoryPage } from '../pages/product-category.page';
import { CheckoutPage } from '../pages/checkout.page';
import { OrderStatusPage } from '../pages/order-status.page';
import { userInfo,billingInfo,products } from '../data/test-data.ts';
import { PaymentMethod } from '../enum/data.enum.ts';


test('TC01 - Verify users can buy an item successfully', async ({ page }) => {
  const productTemp = [products[0]];
  // 1. Open browser and go to https://demo.testarchitect.com/
  const homepage = new HomePage(page);
  await homepage.goto();

  // 2. Login with valid credentials 
  await new LoginPage(page).login(userInfo.username, userInfo.password);
  
  // 3. Navigate to All departments section
  // 4. Select Electronic Components & Supplies
  await homepage.gotoComponentsCategory('Electronic Components & Supplies');

  const productCategory = new ProductCategoryPage(page);

  // 5. Verify the items should be displayed as a grid
  await expect(productCategory.gridLayoutButton).toHaveClass(/.*active/);
  await productCategory.checkLayout("grid");

  // 6. Switch view to list
  await productCategory.switchLayout("list");

  // 7. Verify the items should be displayed as a list
  //await expect(productCategory.listLayoutButton).toHaveClass(/switcher-active/);
  await productCategory.checkLayout("list");
  
  // Switch view back to grid
  await productCategory.switchLayout("grid");
  

  // 8. Select any item randomly to purchase
  // 9. Click 'Add to Cart'
  await productCategory.addToCart(productTemp);

  // 10. Go to the cart
  // 11. Verify item details in mini content
  await homepage.verifyProductInCart(productTemp);

  // 12. Click on Checkout
  await homepage.clickCheckoutFromCart();

  // 13. Verify Checkout page displays
  const checkoutPage = new CheckoutPage(page);
  await expect(page).toHaveURL(/.*checkout.*/);

  // 14. Verify item details in order
  await checkoutPage.ShouldOrderItemsDisplay(productTemp);

  // 15. Fill the billing details with default payment method
  // 16. Click on PLACE ORDER
  await checkoutPage.orderProduct(billingInfo, PaymentMethod.DirectBankTransfer);

  // 16. Verify Order status page displays
  const orderPage = new OrderStatusPage(page);
  await orderPage.checkStatus();
  
  //await orderPage.checkStatus();
  // 17. Verify the Order details with billing and item information

  await orderPage.verifyOrderDetails(productTemp, billingInfo, PaymentMethod.DirectBankTransfer);

});


