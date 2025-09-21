import { Page, Locator,expect } from '@playwright/test';
import { ReviewInfo } from '../models/data.model';

export class ProductDetailPage {
    readonly page: Page;
    readonly reviewButton: Locator;
    readonly yourReviewTextArea: Locator;

    constructor(page: Page) {
        this.page = page;
        this.reviewButton = this.page.getByRole('link', { name: /Reviews \(\d+\)/ });
        this.yourReviewTextArea = this.page.getByRole('textbox', { name: 'Your review *' })
    }

    async gotoReviewTab() {
        await this.reviewButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle');
    }

    async postReview(reviewInfo: ReviewInfo) {
        await this.gotoReviewTab();
        await this.yourReviewTextArea.fill(reviewInfo.reviewText);
        await this.page.getByRole('link', { name: new RegExp(`${reviewInfo.rating}$`) }).click();
        await this.page.getByRole('button', { name: 'Submit' }).click();
        await this.page.waitForLoadState('networkidle');
    }

    async checkReviewPosted(reviewInfo: ReviewInfo) {
        await this.gotoReviewTab();
        const lastReview = await this.page.locator('.commentlist li').last();
   
        await expect(lastReview).toContainText(reviewInfo.reviewText);
        await expect(lastReview.getByRole('img',{name: 'Rated ' + String(reviewInfo.rating) + ' out of 5'})).toBeVisible();

    }
}