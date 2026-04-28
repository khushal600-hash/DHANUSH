// ─── Shared Types ─────────────────────────────────────────────────────────────

export type DeliveryStatus =
  | { pending: null }
  | { delivered: null }
  | { cancelled: null };

export type PaymentMethod = { cash: null } | { online: null };

export interface CustomerView {
  id: bigint;
  name: string;
  phone: string;
  address: string;
  balance: bigint;
  createdAt: bigint;
}

export interface DeliveryView {
  id: bigint;
  customerId: bigint;
  quantity: bigint;
  pricePerCan: bigint;
  totalAmount: bigint;
  status: DeliveryStatus;
  deliveryDate: bigint;
  createdAt: bigint;
}

export interface Payment {
  id: bigint;
  customerId: bigint;
  amount: bigint;
  method: PaymentMethod;
  paymentDate: bigint;
  note: string;
  createdAt: bigint;
}

export interface DashboardStats {
  totalCustomers: bigint;
  totalDeliveries: bigint;
  totalRevenue: bigint;
  outstandingBalance: bigint;
  customersWithBalance: CustomerView[];
}

// ─── Form Input Types ──────────────────────────────────────────────────────────

export interface CustomerInput {
  name: string;
  phone: string;
  address: string;
}

export interface DeliveryInput {
  customerId: bigint;
  quantity: bigint;
  pricePerCan: bigint;
  deliveryDate: bigint;
}

export interface PaymentInput {
  customerId: bigint;
  amount: bigint;
  method: PaymentMethod;
  note: string;
}

// ─── Helper Utilities ──────────────────────────────────────────────────────────

export function getStatusLabel(status: DeliveryStatus): string {
  if ("pending" in status) return "Pending";
  if ("delivered" in status) return "Delivered";
  if ("cancelled" in status) return "Cancelled";
  return "Unknown";
}

export function getStatusVariant(
  status: DeliveryStatus,
): "default" | "success" | "destructive" | "secondary" {
  if ("delivered" in status) return "success";
  if ("cancelled" in status) return "destructive";
  return "secondary";
}

export function getMethodLabel(method: PaymentMethod): string {
  if ("cash" in method) return "Cash";
  if ("online" in method) return "Online";
  return "Unknown";
}

export function formatCurrency(amount: bigint): string {
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}

export function formatDate(timestamp: bigint): string {
  return new Date(Number(timestamp) / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
