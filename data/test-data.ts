import { BillingInfo, UserInfo, ProductInfo } from "../models/data.model.ts";

export const billingInfo = new BillingInfo(
    'Tung',
    'Pham',
    '123 Main St',
    'HCM',
    'United States (US)',
    'Alabama',
    '70000',
    'tung.pham@example.com',
    '555-1234'
);

export const userInfo: UserInfo = {
    username: 'tung.pham',
    password: '123456789',
};


export const products: ProductInfo[] = [
    new ProductInfo('DJI Phantom 4 Camera Drone', 1500),
    new ProductInfo('AirPods', 200), 
    new ProductInfo('Beats Solo3 Wireless On-Ear', 300),
    new ProductInfo('Canon i-SENSYS LBP6030W with Wi-Fi', 250)
];   