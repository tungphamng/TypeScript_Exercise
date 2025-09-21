import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page.ts';
import { ProductCategoryPage } from '../pages/product-category.page.ts';
import { products, userInfo, reviewInfo} from '../data/test-data.ts';
import { LoginPage } from '../pages/login.page.ts';
import { ProductDetailPage } from '../pages/product-detail.page.ts';

test('TC_10 Verify users can post a review', async ({ page }) => {
    

    // 1. Open browser and go to https://demo.testarchitect.com/
    const homepage = new HomePage(page);
    await homepage.goto();
    
    // 2. Login with valid credentials 
    const loginPage = new LoginPage(page);
    await loginPage.login(userInfo.username, userInfo.password);

    // 3. Go to Shop page
    await homepage.gotoMenu('Shop');

    const productCategoryPage = new ProductCategoryPage(page);
    // 4. Click on a product to view detail
    await productCategoryPage.clickProductByName(products[0].name);
    
    // 5. Scroll down then click on REVIEWS tab
    // 6. Submit a review
    const productDetailPage = new ProductDetailPage(page);
    await productDetailPage.postReview(reviewInfo);

    // 7. Verify new review
    await productDetailPage.checkReviewPosted(reviewInfo);

});