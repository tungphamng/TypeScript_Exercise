export class ProductInfo {
    readonly name: string;
    constructor(name: string) {
        this.name = name;
    } 
}

export const products: ProductInfo[] = [
    {
        name: 'DJI Phantom 4 Camera Drone'
    },
    {
        name: 'AirPods'
    },
    {
        name: 'Beats Solo3 Wireless On-Ear'
       
    },
    {
        name: 'Canon i-SENSYS LBP6030W with Wi-Fi'
    }
];