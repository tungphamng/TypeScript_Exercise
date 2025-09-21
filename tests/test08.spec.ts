import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page.ts';
import { ProductCategoryPage } from '../pages/product-category.page.ts';
import { products, userInfo} from '../data/test-data.ts';
import { ProductInfo } from '../models/data.model.ts';
import { CheckoutPage } from '../pages/checkout.page.ts';
import { LoginPage } from '../pages/login.page.ts';
import { CartPage } from '../pages/cart.page.ts';

test('TC_08 Verify users can clear the cart', async ({ page }) => {
    

    // 1. Open browser and go to https://demo.testarchitect.com/
    const homepage = new HomePage(page);
    await homepage.goto();
    
    // 2. Login with valid credentials 
    await new LoginPage(page).login(userInfo.username, userInfo.password);
    
    // 3. Go to Shop page
    await homepage.gotoMenu('Shop');
    
    // 4. Select multiple items and add to cart
    await new ProductCategoryPage(page).addToCart(products);
      
    // 3. Go to shopping cart page
    await homepage.gotoCartPage();

    const cartPage = new CartPage(page);
    // 4. Verify items show in table
    await cartPage.checkOrderItem(products);

    // 5. Click on Clear shopping cart
    await cartPage.clearCart();

    // 6. Verify empty cart page displays
    await cartPage.checkEmptyCart();
});
