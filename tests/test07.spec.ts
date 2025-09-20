import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page.ts';
import { ProductCategoryPage } from '../pages/product-category.page.ts';
import { products} from '../data/test-data.ts';
import { ProductInfo } from '../models/data.model.ts';
import { CheckoutPage } from '../pages/checkout.page.ts';

test('TC_07 Ensure proper error handling when mandatory fields are blank', async ({ page }) => {
    const productTemp: ProductInfo[] = [products[0]];

    //  Open https://demo.testarchitect.com/
    const homepage =  new HomePage(page);
    await homepage.goto();

    // Navigate to 'Shop' or 'Products' section
    await homepage.gotoMenu('Shop');

    // Add a product to cart
    const productCategoryPage = new ProductCategoryPage(page);
    await productCategoryPage.addToCart(productTemp);

    await homepage.gotoCheckoutPage();
    // Proceed to checkout
    const checkoutPage = new CheckoutPage(page);
    
    // 1. Leave mandatory fields (address, payment info) blank
    // 2. Click 'Confirm Order'
    await checkoutPage.placeOrderButton.click();

    // 3. Verify error messages
    // VP. System should highlight missing fields and show an error message
    await checkoutPage.verifyErrorMessagesForMandatoryFields();
})