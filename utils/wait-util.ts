import { Locator } from "@playwright/test";

export class WaitUtil {
    static async waitForLocatorTextChange(locator: Locator, oldValue: string, timeout = 10000) {
        let newValue = oldValue;

        for (let i = 0; i < timeout/100; i++) {
            newValue = await locator.innerText();
            if (newValue !== oldValue) break;
            await locator.page().waitForTimeout(100);
        }
    }

    static async waitForLocatorNotExist(locator: Locator, timeout = 10000) {

        for (let i = 0; i < timeout/100; i++) {
            const count = await locator.count();
            console.log('Count: ' + count);
            if (count === 0) 
                break;
            await locator.page().waitForTimeout(1000);
        }
    }
}