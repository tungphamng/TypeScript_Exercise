import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page;
    readonly closeButton: Locator;
    readonly allDepartmentsLink : Locator;
    readonly electronicComponentsLink : Locator;
    readonly cartLink : Locator;

    constructor(page: Page) {
        this.page = page;
        this.closeButton = this.page.getByRole('button', {name: 'Close' });
        this.electronicComponentsLink = this.page.getByRole('link', { name: ' Electronic Components &' });
        this.allDepartmentsLink = this.page.getByText('All departments')
      
    }

    async goto() {
        await this.page.goto('/');
        await this.closeButton.click();
    }

   
}