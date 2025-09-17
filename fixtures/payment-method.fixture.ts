export type PaymentMethod = {
    methodName: string;
};

export const paymentMethods: PaymentMethod[] = [
    {
        methodName: 'Check payments',
    },
    {
        methodName: 'Cash on delivery',
    },
    {
        methodName: 'Direct bank transfer',
    }
];