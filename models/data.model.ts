export type UserInfo ={
    username: string,
    password: string,

}

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
    constructor(firstName: string, 
                lastName: string, 
                street: string, city: string, 
                country: string, 
                state: string, 
                zip: string, email: 
                string, 
                phone: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.street = street;
        this.city = city;
        this.country = country;
        this.state = state;
        this.zip = zip;
        this.email = email;
        this.phone = phone;
    }
};

export class ProductInfo {
    readonly name: string;
    readonly price: number;
    constructor(name: string,price: number) {
        this.name = name;
        this.price = price;
    } 
}

export class OrderInfo {
    readonly numOfProducts: number;
    readonly totalPrice: string;
    readonly orderDate: string;
    readonly orderID: string;

    constructor( orderID: string,  orderDate: string, numOfProducts: number, totalPrice: string) {
        this.numOfProducts = numOfProducts;
        this.totalPrice = totalPrice;       
        this.orderDate = orderDate;
        this.orderID = orderID;
    }
}