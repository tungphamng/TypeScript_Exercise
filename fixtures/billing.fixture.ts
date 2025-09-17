
export class BillingInfo  {
    readonly firstName: string;
    readonly lastName: string;
    readonly city: string;
    readonly country: string;
    readonly street: string;
    readonly state: string;
    readonly zip: string;
    readonly email: string;
    readonly phone: string;
    constructor() {
        this.firstName = 'Tung';
        this.lastName = 'Pham';
        this.street = '123 Main St';
        this.city = 'HCM';
        this.country = 'United States (US)';
        this.state = 'Alabama';
        this.zip = '70000';
        this.email = 'tung.pham@example.com';
        this.phone = '555-1234';
    }
};

export const billingInfo = new BillingInfo();