import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page.ts';
import { ProductCategoryPage } from '../pages/product-category.page.ts';
import { products, userInfo} from '../data/test-data.ts';
import { ProductInfo } from '../models/data.model.ts';
import { CheckoutPage } from '../pages/checkout.page.ts';
import { LoginPage } from '../pages/login.page.ts';
import { CartPage } from '../pages/cart.page.ts';
import { AdjustQuantityType } from '../enum/data.enum.ts';

test('TC_09 Verify users can update quantity of product in cart', async ({ page }) => {
    
    const productTemp = [products[0]];
    
    // 1. Open browser and go to https://demo.testarchitect.com/
    const homepage = new HomePage(page);
    await homepage.goto();
    
    // 2. Login with valid credentials 
    await new LoginPage(page).login(userInfo.username, userInfo.password);

    //Remove product in cart if any
    await homepage.removedProductInCart(productTemp[0]);
    
    // 3. Go to Shop page
    await homepage.gotoMenu('Shop');
   
    // 4. Add a product
    await new ProductCategoryPage(page).addToCart(productTemp);

    //Handle to get current price of the product
    const currentPrice = await new ProductCategoryPage(page).getCurrentProductPrice(productTemp[0]);
    console.log('Current price: ' + currentPrice);
    if (currentPrice != null) {
        productTemp[0].setPrice(currentPrice);
    }
   
    // 5. Go to the cart
    const cartPage = new CartPage(page);
    await cartPage.goto();

    // 6. Verify quantity of added product
    await cartPage.checkOrderItem(productTemp);
    await cartPage.checkQuantity(products[0], 1);

    // 7. Click on Plus(+) button
    await cartPage.adjustQuantity(products[0], AdjustQuantityType.Plus, 1);    

    // 8. Verify quantity of product and SUB TOTAL price
    await cartPage.checkQuantity(products[0], 2);
    await cartPage.checkSubTotal(products[0], products[0].price, 2);

    // 9. Enter 4 into quantity textbox then click on UPDATE CART button
    await cartPage.setQuantityInput(products[0], 4);

    // 10. Verify quantity of product is 4 and SUB TOTAL price
    await cartPage.checkQuantity(products[0], 4);
    await cartPage.checkSubTotal(products[0], products[0].price, 4);

    // 11. Click on Minus(-) button
    await cartPage.adjustQuantity(products[0], AdjustQuantityType.Minus, 1);

    // 12. Verify quantity of product and SUB TOTAL price
    await cartPage.checkQuantity(products[0], 3);
    await cartPage.checkSubTotal(products[0], products[0].price, 3);

});