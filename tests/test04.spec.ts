import { test } from '@playwright/test';
import { LoginPage} from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { ProductCategoryPage } from '../pages/product-category.page';
import { SortType } from '../enum/data.enum.ts';
import { userInfo} from '../data/test-data.ts';


test('TC_04 Verify users can sort items by price', async ({ page }) => {
    // 1. Open browser and go to https://demo.testarchitect.com/
    const homepage = new HomePage(page);
    await homepage.goto();
    
    // 2. Login with valid credentials 
    await new LoginPage(page).login(userInfo.username, userInfo.password);

    // 3. Go to Shop page
    await homepage.gotoMenu('Shop');

    // 4. Switch view to list
    const productCategory = new ProductCategoryPage(page);
    await productCategory.switchLayout("list");
    
    // 5. Sort items by price (low to high / high to low)
    // 6. Verify the order of items
    await productCategory.sortProducts(SortType.PriceAsc);
    await productCategory.verifySorting(SortType.PriceAsc);

    await productCategory.sortProducts(SortType.PriceDesc);
    await productCategory.verifySorting(SortType.PriceDesc);

});