import type { backendInterface } from "../backend";
import { DeliveryStatus, PaymentMethod, UserRole } from "../backend";

const now = BigInt(Date.now()) * BigInt(1_000_000);
const yesterday = now - BigInt(86_400_000_000_000);
const lastWeek = now - BigInt(7 * 86_400_000_000_000);

export const mockBackend: backendInterface = {
  addCustomer: async (input) => ({
    id: BigInt(3),
    name: input.name,
    address: input.address,
    phone: input.phone,
    balance: BigInt(0),
    createdAt: now,
  }),

  addDelivery: async (input) => ({
    id: BigInt(5),
    status: DeliveryStatus.pending,
    createdAt: now,
    deliveryDate: input.deliveryDate,
    pricePerCan: input.pricePerCan,
    totalAmount: input.pricePerCan * input.quantity,
    quantity: input.quantity,
    customerId: input.customerId,
  }),

  addPayment: async (input) => ({
    id: BigInt(5),
    method: input.method,
    note: input.note,
    createdAt: now,
    paymentDate: input.paymentDate,
    customerId: input.customerId,
    amount: input.amount,
  }),

  assignCallerUserRole: async () => undefined,

  deleteCustomer: async () => true,
  deleteDelivery: async () => true,
  deletePayment: async () => true,

  getCallerUserRole: async () => UserRole.admin,

  getCustomer: async () => ({
    id: BigInt(1),
    name: "Sunrise Hotel",
    address: "123 Main Street, Cityville",
    phone: "+1-555-0101",
    balance: BigInt(-2500),
    createdAt: lastWeek,
  }),

  getCustomerHistory: async () => ({
    deliveries: [
      {
        id: BigInt(1),
        status: DeliveryStatus.delivered,
        createdAt: lastWeek,
        deliveryDate: lastWeek,
        pricePerCan: BigInt(25),
        totalAmount: BigInt(500),
        quantity: BigInt(20),
        customerId: BigInt(1),
      },
    ],
    payments: [
      {
        id: BigInt(1),
        method: PaymentMethod.cash,
        note: "Partial payment",
        createdAt: yesterday,
        paymentDate: yesterday,
        customerId: BigInt(1),
        amount: BigInt(300),
      },
    ],
  }),

  getDashboard: async () => ({
    stats: {
      totalOutstandingBalance: BigInt(12500),
      totalRevenue: BigInt(87400),
      totalCustomers: BigInt(24),
      totalDeliveries: BigInt(312),
    },
    customersWithOutstandingBalance: [
      {
        id: BigInt(1),
        name: "Sunrise Hotel",
        address: "123 Main Street, Cityville",
        phone: "+1-555-0101",
        balance: BigInt(-2500),
        createdAt: lastWeek,
      },
      {
        id: BigInt(2),
        name: "Green Valley Cafe",
        address: "45 Park Avenue, Downtown",
        phone: "+1-555-0202",
        balance: BigInt(-1800),
        createdAt: lastWeek,
      },
      {
        id: BigInt(4),
        name: "City Sports Club",
        address: "78 Stadium Road, Uptown",
        phone: "+1-555-0404",
        balance: BigInt(-950),
        createdAt: lastWeek,
      },
    ],
  }),

  getDelivery: async () => ({
    id: BigInt(1),
    status: DeliveryStatus.delivered,
    createdAt: lastWeek,
    deliveryDate: lastWeek,
    pricePerCan: BigInt(25),
    totalAmount: BigInt(500),
    quantity: BigInt(20),
    customerId: BigInt(1),
  }),

  getPayment: async () => ({
    id: BigInt(1),
    method: PaymentMethod.cash,
    note: "Monthly settlement",
    createdAt: yesterday,
    paymentDate: yesterday,
    customerId: BigInt(1),
    amount: BigInt(1000),
  }),

  isCallerAdmin: async () => true,

  listCustomers: async () => [
    {
      id: BigInt(1),
      name: "Sunrise Hotel",
      address: "123 Main Street, Cityville",
      phone: "+1-555-0101",
      balance: BigInt(-2500),
      createdAt: lastWeek,
    },
    {
      id: BigInt(2),
      name: "Green Valley Cafe",
      address: "45 Park Avenue, Downtown",
      phone: "+1-555-0202",
      balance: BigInt(-1800),
      createdAt: lastWeek,
    },
    {
      id: BigInt(3),
      name: "Blue Ocean Resort",
      address: "12 Beach Blvd, Seaside",
      phone: "+1-555-0303",
      balance: BigInt(500),
      createdAt: lastWeek,
    },
    {
      id: BigInt(4),
      name: "City Sports Club",
      address: "78 Stadium Road, Uptown",
      phone: "+1-555-0404",
      balance: BigInt(-950),
      createdAt: lastWeek,
    },
    {
      id: BigInt(5),
      name: "Metro Office Park",
      address: "200 Business Blvd, CBD",
      phone: "+1-555-0505",
      balance: BigInt(0),
      createdAt: lastWeek,
    },
  ],

  listCustomersWithOutstandingBalance: async () => [
    {
      id: BigInt(1),
      name: "Sunrise Hotel",
      address: "123 Main Street, Cityville",
      phone: "+1-555-0101",
      balance: BigInt(-2500),
      createdAt: lastWeek,
    },
    {
      id: BigInt(2),
      name: "Green Valley Cafe",
      address: "45 Park Avenue, Downtown",
      phone: "+1-555-0202",
      balance: BigInt(-1800),
      createdAt: lastWeek,
    },
    {
      id: BigInt(4),
      name: "City Sports Club",
      address: "78 Stadium Road, Uptown",
      phone: "+1-555-0404",
      balance: BigInt(-950),
      createdAt: lastWeek,
    },
  ],

  listDeliveries: async () => [
    {
      id: BigInt(1),
      status: DeliveryStatus.delivered,
      createdAt: lastWeek,
      deliveryDate: lastWeek,
      pricePerCan: BigInt(25),
      totalAmount: BigInt(500),
      quantity: BigInt(20),
      customerId: BigInt(1),
    },
    {
      id: BigInt(2),
      status: DeliveryStatus.pending,
      createdAt: yesterday,
      deliveryDate: now,
      pricePerCan: BigInt(25),
      totalAmount: BigInt(375),
      quantity: BigInt(15),
      customerId: BigInt(2),
    },
    {
      id: BigInt(3),
      status: DeliveryStatus.cancelled,
      createdAt: lastWeek,
      deliveryDate: lastWeek,
      pricePerCan: BigInt(30),
      totalAmount: BigInt(300),
      quantity: BigInt(10),
      customerId: BigInt(3),
    },
    {
      id: BigInt(4),
      status: DeliveryStatus.delivered,
      createdAt: yesterday,
      deliveryDate: yesterday,
      pricePerCan: BigInt(25),
      totalAmount: BigInt(625),
      quantity: BigInt(25),
      customerId: BigInt(4),
    },
  ],

  listDeliveriesForCustomer: async () => [
    {
      id: BigInt(1),
      status: DeliveryStatus.delivered,
      createdAt: lastWeek,
      deliveryDate: lastWeek,
      pricePerCan: BigInt(25),
      totalAmount: BigInt(500),
      quantity: BigInt(20),
      customerId: BigInt(1),
    },
  ],

  listPayments: async () => [
    {
      id: BigInt(1),
      method: PaymentMethod.cash,
      note: "Monthly settlement",
      createdAt: yesterday,
      paymentDate: yesterday,
      customerId: BigInt(1),
      amount: BigInt(1000),
    },
    {
      id: BigInt(2),
      method: PaymentMethod.online,
      note: "Bank transfer",
      createdAt: yesterday,
      paymentDate: yesterday,
      customerId: BigInt(2),
      amount: BigInt(1500),
    },
    {
      id: BigInt(3),
      method: PaymentMethod.cash,
      note: "Walk-in payment",
      createdAt: lastWeek,
      paymentDate: lastWeek,
      customerId: BigInt(3),
      amount: BigInt(750),
    },
    {
      id: BigInt(4),
      method: PaymentMethod.online,
      note: "UPI payment",
      createdAt: now,
      paymentDate: now,
      customerId: BigInt(4),
      amount: BigInt(2000),
    },
  ],

  listPaymentsForCustomer: async () => [
    {
      id: BigInt(1),
      method: PaymentMethod.cash,
      note: "Monthly settlement",
      createdAt: yesterday,
      paymentDate: yesterday,
      customerId: BigInt(1),
      amount: BigInt(1000),
    },
  ],

  updateCustomer: async (id, input) => ({
    id,
    name: input.name,
    address: input.address,
    phone: input.phone,
    balance: BigInt(0),
    createdAt: lastWeek,
  }),

  updateDelivery: async (id, input) => ({
    id,
    status: DeliveryStatus.pending,
    createdAt: lastWeek,
    deliveryDate: input.deliveryDate,
    pricePerCan: input.pricePerCan,
    totalAmount: input.pricePerCan * input.quantity,
    quantity: input.quantity,
    customerId: input.customerId,
  }),

  updateDeliveryStatus: async (id, status) => ({
    id,
    status,
    createdAt: lastWeek,
    deliveryDate: yesterday,
    pricePerCan: BigInt(25),
    totalAmount: BigInt(500),
    quantity: BigInt(20),
    customerId: BigInt(1),
  }),

  updatePayment: async (id, input) => ({
    id,
    method: input.method,
    note: input.note,
    createdAt: lastWeek,
    paymentDate: input.paymentDate,
    customerId: input.customerId,
    amount: input.amount,
  }),

  _initializeAccessControl: async () => undefined,
};
