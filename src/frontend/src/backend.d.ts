import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface DeliveryInput {
    deliveryDate: Timestamp;
    pricePerCan: bigint;
    quantity: bigint;
    customerId: CustomerId;
}
export type Timestamp = bigint;
export type DeliveryId = bigint;
export interface Payment {
    id: PaymentId;
    method: PaymentMethod;
    note: string;
    createdAt: Timestamp;
    paymentDate: Timestamp;
    customerId: CustomerId;
    amount: bigint;
}
export interface DashboardStats {
    totalOutstandingBalance: bigint;
    totalRevenue: bigint;
    totalCustomers: bigint;
    totalDeliveries: bigint;
}
export interface CustomerInput {
    name: string;
    address: string;
    phone: string;
}
export type PaymentId = bigint;
export type CustomerId = bigint;
export interface PaymentInput {
    method: PaymentMethod;
    note: string;
    paymentDate: Timestamp;
    customerId: CustomerId;
    amount: bigint;
}
export interface DeliveryView {
    id: DeliveryId;
    status: DeliveryStatus;
    createdAt: Timestamp;
    deliveryDate: Timestamp;
    pricePerCan: bigint;
    totalAmount: bigint;
    quantity: bigint;
    customerId: CustomerId;
}
export interface CustomerView {
    id: CustomerId;
    balance: bigint;
    name: string;
    createdAt: Timestamp;
    address: string;
    phone: string;
}
export enum DeliveryStatus {
    cancelled = "cancelled",
    pending = "pending",
    delivered = "delivered"
}
export enum PaymentMethod {
    cash = "cash",
    online = "online"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addCustomer(input: CustomerInput): Promise<CustomerView>;
    addDelivery(input: DeliveryInput): Promise<DeliveryView>;
    addPayment(input: PaymentInput): Promise<Payment>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteCustomer(id: CustomerId): Promise<boolean>;
    deleteDelivery(id: DeliveryId): Promise<boolean>;
    deletePayment(id: PaymentId): Promise<boolean>;
    getCallerUserRole(): Promise<UserRole>;
    getCustomer(id: CustomerId): Promise<CustomerView | null>;
    getCustomerHistory(customerId: CustomerId): Promise<{
        deliveries: Array<DeliveryView>;
        payments: Array<Payment>;
    }>;
    getDashboard(): Promise<{
        stats: DashboardStats;
        customersWithOutstandingBalance: Array<CustomerView>;
    }>;
    getDelivery(id: DeliveryId): Promise<DeliveryView | null>;
    getPayment(id: PaymentId): Promise<Payment | null>;
    isCallerAdmin(): Promise<boolean>;
    listCustomers(): Promise<Array<CustomerView>>;
    listCustomersWithOutstandingBalance(): Promise<Array<CustomerView>>;
    listDeliveries(): Promise<Array<DeliveryView>>;
    listDeliveriesForCustomer(customerId: CustomerId): Promise<Array<DeliveryView>>;
    listPayments(): Promise<Array<Payment>>;
    listPaymentsForCustomer(customerId: CustomerId): Promise<Array<Payment>>;
    updateCustomer(id: CustomerId, input: CustomerInput): Promise<CustomerView | null>;
    updateDelivery(id: DeliveryId, input: DeliveryInput): Promise<DeliveryView | null>;
    updateDeliveryStatus(id: DeliveryId, status: DeliveryStatus): Promise<DeliveryView | null>;
    updatePayment(id: PaymentId, input: PaymentInput): Promise<Payment | null>;
}
