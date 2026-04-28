import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  CreditCard,
  MapPin,
  Pencil,
  Phone,
  Plus,
  Search,
  Trash2,
  Truck,
  Users,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import { Layout } from "../components/Layout";
import {
  useAddCustomer,
  useCustomers,
  useDeleteCustomer,
  useUpdateCustomer,
} from "../hooks/useCustomers";
import type {
  CustomerInput,
  CustomerView,
  DeliveryView,
  Payment,
} from "../types";
import { formatCurrency, formatDate } from "../types";

// ─── Types ─────────────────────────────────────────────────────────────────────

type SortField = "name" | "balance" | "id";
type SortDir = "asc" | "desc";
// Runtime delivery/payment types from backend return enums as strings
type DeliveryStatusStr = "pending" | "delivered" | "cancelled";
type PaymentMethodStr = "cash" | "online";

// ─── Helpers ───────────────────────────────────────────────────────────────────

function balanceColor(balance: bigint): string {
  const n = Number(balance);
  if (n > 0) return "text-red-500 font-semibold";
  if (n < 0) return "text-emerald-600 font-semibold";
  return "text-muted-foreground";
}

function balanceBadgeClass(balance: bigint): string {
  const n = Number(balance);
  if (n > 0) return "border-red-300 bg-red-50 text-red-600";
  if (n < 0) return "border-emerald-300 bg-emerald-50 text-emerald-700";
  return "border-border text-muted-foreground";
}

function deliveryStatusLabel(status: DeliveryStatusStr): string {
  if (status === "delivered") return "Delivered";
  if (status === "cancelled") return "Cancelled";
  return "Pending";
}

function deliveryStatusClass(status: DeliveryStatusStr): string {
  if (status === "delivered")
    return "border-emerald-300 bg-emerald-50 text-emerald-700";
  if (status === "cancelled") return "border-red-300 bg-red-50 text-red-600";
  return "border-amber-300 bg-amber-50 text-amber-700";
}

function paymentMethodLabel(method: PaymentMethodStr): string {
  return method === "cash" ? "Cash" : "Online";
}

// ─── Customer History Hook ──────────────────────────────────────────────────────

function useCustomerHistory(customerId: bigint | undefined) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery<{ deliveries: DeliveryView[]; payments: Payment[] }>({
    queryKey: ["customerHistory", customerId?.toString()],
    queryFn: async () => {
      if (!actor || customerId === undefined)
        return { deliveries: [], payments: [] };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).getCustomerHistory(customerId);
    },
    enabled: !!actor && !actorFetching && customerId !== undefined,
  });
}

// ─── Customer Form ──────────────────────────────────────────────────────────────

interface CustomerFormProps {
  initial?: CustomerInput;
  onSubmit: (data: CustomerInput) => void;
  loading: boolean;
  onCancel: () => void;
}

function CustomerForm({
  initial,
  onSubmit,
  loading,
  onCancel,
}: CustomerFormProps) {
  const [form, setForm] = useState<CustomerInput>(
    initial ?? { name: "", phone: "", address: "" },
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="c-name">Full Name</Label>
        <Input
          id="c-name"
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          placeholder="e.g. Rajesh Kumar"
          required
          data-ocid="customer_form.name_input"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="c-phone">Phone Number</Label>
        <Input
          id="c-phone"
          value={form.phone}
          onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
          placeholder="e.g. 98765 43210"
          required
          data-ocid="customer_form.phone_input"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="c-address">Address</Label>
        <Input
          id="c-address"
          value={form.address}
          onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
          placeholder="e.g. 12 Main St, Chennai"
          required
          data-ocid="customer_form.address_input"
          className="mt-1"
        />
      </div>
      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          data-ocid="customer_form.cancel_button"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
          data-ocid="customer_form.submit_button"
        >
          {loading ? "Saving..." : "Save Customer"}
        </Button>
      </DialogFooter>
    </form>
  );
}

// ─── Customer Detail Panel ──────────────────────────────────────────────────────

interface CustomerDetailProps {
  customer: CustomerView;
  onBack: () => void;
  onEdit: (c: CustomerView) => void;
  onDelete: (id: bigint) => void;
}

function CustomerDetail({
  customer,
  onBack,
  onEdit,
  onDelete,
}: CustomerDetailProps) {
  const { data, isLoading } = useCustomerHistory(customer.id);
  const deliveries = data?.deliveries ?? [];
  const payments = data?.payments ?? [];

  const totalDelivered = deliveries
    .filter((d) => (d.status as unknown as DeliveryStatusStr) === "delivered")
    .reduce((sum, d) => sum + Number(d.totalAmount), 0);
  const totalPaid = payments.reduce((sum, p) => sum + Number(p.amount), 0);

  return (
    <div className="space-y-6">
      {/* Back + actions */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          data-ocid="customer_detail.back_button"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Customers
        </button>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(customer)}
            data-ocid="customer_detail.edit_button"
          >
            <Pencil className="w-3.5 h-3.5 mr-1" /> Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(customer.id)}
            className="text-destructive border-destructive/30 hover:bg-destructive/5"
            data-ocid="customer_detail.delete_button"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
          </Button>
        </div>
      </div>

      {/* Customer info card */}
      <div
        className="bg-card border border-border rounded-xl p-5"
        data-ocid="customer_detail.card"
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-1.5">
            <h2 className="text-xl font-semibold font-display text-foreground">
              {customer.name}
            </h2>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Phone className="w-3.5 h-3.5" />
              <span>{customer.phone}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="w-3.5 h-3.5" />
              <span>{customer.address}</span>
            </div>
          </div>
          <div className="text-right sm:text-left">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Balance Due
            </p>
            <p
              className={`text-2xl font-bold ${balanceColor(customer.balance)}`}
            >
              {Number(customer.balance) === 0
                ? "Nil"
                : formatCurrency(customer.balance)}
            </p>
            {Number(customer.balance) > 0 && (
              <p className="text-xs text-red-500 mt-0.5">Owes money</p>
            )}
            {Number(customer.balance) < 0 && (
              <p className="text-xs text-emerald-600 mt-0.5">Credit balance</p>
            )}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-border">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Deliveries</p>
            <p className="text-lg font-bold text-foreground">
              {deliveries.length}
            </p>
          </div>
          <div className="text-center border-x border-border">
            <p className="text-xs text-muted-foreground mb-1">Total Billed</p>
            <p className="text-lg font-bold text-foreground">
              {formatCurrency(BigInt(totalDelivered))}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Total Paid</p>
            <p className="text-lg font-bold text-emerald-600">
              {formatCurrency(BigInt(totalPaid))}
            </p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Deliveries */}
          <section data-ocid="customer_detail.deliveries_section">
            <div className="flex items-center gap-2 mb-3">
              <Truck className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-sm text-foreground">
                Delivery History
              </h3>
              <Badge variant="secondary" className="text-xs">
                {deliveries.length}
              </Badge>
            </div>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              {deliveries.length === 0 ? (
                <div
                  className="flex flex-col items-center py-10 text-center px-4"
                  data-ocid="customer_detail.deliveries_empty_state"
                >
                  <Truck className="w-8 h-8 text-muted-foreground/30 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No deliveries yet
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {deliveries.map((d, i) => (
                    <div
                      key={d.id.toString()}
                      className="px-4 py-3 flex items-center justify-between gap-3"
                      data-ocid={`customer_detail.delivery.${i + 1}`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium text-foreground">
                            {Number(d.quantity)} can
                            {Number(d.quantity) !== 1 ? "s" : ""}
                          </span>
                          <Badge
                            variant="outline"
                            className={`text-xs ${deliveryStatusClass(d.status as unknown as DeliveryStatusStr)}`}
                          >
                            {deliveryStatusLabel(
                              d.status as unknown as DeliveryStatusStr,
                            )}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {formatDate(d.deliveryDate)} ·{" "}
                          {formatCurrency(d.pricePerCan)}/can
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-foreground text-right flex-shrink-0">
                        {formatCurrency(d.totalAmount)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Payments */}
          <section data-ocid="customer_detail.payments_section">
            <div className="flex items-center gap-2 mb-3">
              <Wallet className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-sm text-foreground">
                Payment History
              </h3>
              <Badge variant="secondary" className="text-xs">
                {payments.length}
              </Badge>
            </div>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              {payments.length === 0 ? (
                <div
                  className="flex flex-col items-center py-10 text-center px-4"
                  data-ocid="customer_detail.payments_empty_state"
                >
                  <CreditCard className="w-8 h-8 text-muted-foreground/30 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No payments recorded
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {payments.map((p, i) => (
                    <div
                      key={p.id.toString()}
                      className="px-4 py-3 flex items-center justify-between gap-3"
                      data-ocid={`customer_detail.payment.${i + 1}`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge
                            variant="outline"
                            className="text-xs border-primary/30 bg-primary/5 text-primary"
                          >
                            {paymentMethodLabel(
                              p.method as unknown as PaymentMethodStr,
                            )}
                          </Badge>
                          {p.note && (
                            <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                              {p.note}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {formatDate(p.paymentDate)}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-emerald-600 text-right flex-shrink-0">
                        +{formatCurrency(p.amount)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

// ─── Sort Button ────────────────────────────────────────────────────────────────

interface SortButtonProps {
  field: SortField;
  current: SortField;
  dir: SortDir;
  onClick: (f: SortField) => void;
  children: React.ReactNode;
}

function SortButton({
  field,
  current,
  dir,
  onClick,
  children,
}: SortButtonProps) {
  const active = field === current;
  const Icon = active ? (dir === "asc" ? ChevronUp : ChevronDown) : ArrowUpDown;
  return (
    <button
      type="button"
      onClick={() => onClick(field)}
      className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-wide transition-colors ${
        active ? "text-primary" : "text-muted-foreground hover:text-foreground"
      }`}
      data-ocid={`customers.sort_${field}`}
    >
      {children}
      <Icon className="w-3 h-3" />
    </button>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────────

export default function CustomersPage() {
  const { data: customers, isLoading } = useCustomers();
  const addMutation = useAddCustomer();
  const updateMutation = useUpdateCustomer();
  const deleteMutation = useDeleteCustomer();

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [showAdd, setShowAdd] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<CustomerView | null>(
    null,
  );
  const [deletingId, setDeletingId] = useState<bigint | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerView | null>(
    null,
  );

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const filtered = (customers ?? [])
    .filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search) ||
        c.address.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      let cmp = 0;
      if (sortField === "name") cmp = a.name.localeCompare(b.name);
      else if (sortField === "balance")
        cmp = Number(a.balance) - Number(b.balance);
      else if (sortField === "id") cmp = Number(a.id) - Number(b.id);
      return sortDir === "asc" ? cmp : -cmp;
    });

  const handleAdd = async (data: CustomerInput) => {
    try {
      await addMutation.mutateAsync(data);
      toast.success("Customer added successfully");
      setShowAdd(false);
    } catch {
      toast.error("Failed to add customer");
    }
  };

  const handleUpdate = async (data: CustomerInput) => {
    if (!editingCustomer) return;
    try {
      await updateMutation.mutateAsync({ id: editingCustomer.id, input: data });
      toast.success("Customer updated");
      setEditingCustomer(null);
      // Update selected customer data if viewing detail
      if (selectedCustomer && selectedCustomer.id === editingCustomer.id) {
        setSelectedCustomer({ ...editingCustomer, ...data });
      }
    } catch {
      toast.error("Failed to update customer");
    }
  };

  const handleDelete = async () => {
    if (deletingId === null) return;
    try {
      await deleteMutation.mutateAsync(deletingId);
      toast.success("Customer deleted");
      setDeletingId(null);
      if (selectedCustomer && selectedCustomer.id === deletingId) {
        setSelectedCustomer(null);
      }
    } catch {
      toast.error("Failed to delete customer");
    }
  };

  // ── Detail view ──
  if (selectedCustomer) {
    return (
      <Layout
        title={selectedCustomer.name}
        subtitle="Customer Details"
        actions={
          <Button
            size="sm"
            onClick={() => setShowAdd(true)}
            data-ocid="customers.add_button"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Customer
          </Button>
        }
      >
        <CustomerDetail
          customer={selectedCustomer}
          onBack={() => setSelectedCustomer(null)}
          onEdit={(c) => setEditingCustomer(c)}
          onDelete={(id) => setDeletingId(id)}
        />

        {/* Edit Dialog */}
        <Dialog
          open={!!editingCustomer}
          onOpenChange={() => setEditingCustomer(null)}
        >
          <DialogContent data-ocid="customers.edit_dialog">
            <DialogHeader>
              <DialogTitle>Edit Customer</DialogTitle>
            </DialogHeader>
            {editingCustomer && (
              <CustomerForm
                initial={{
                  name: editingCustomer.name,
                  phone: editingCustomer.phone,
                  address: editingCustomer.address,
                }}
                onSubmit={handleUpdate}
                loading={updateMutation.isPending}
                onCancel={() => setEditingCustomer(null)}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirm */}
        <AlertDialog
          open={deletingId !== null}
          onOpenChange={() => setDeletingId(null)}
        >
          <AlertDialogContent data-ocid="customers.delete_dialog">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Customer</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the customer and all their records.
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel data-ocid="customers.delete_cancel_button">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                data-ocid="customers.delete_confirm_button"
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Layout>
    );
  }

  // ── List view ──
  return (
    <Layout
      title="Customers"
      subtitle={`${filtered.length} customer${filtered.length !== 1 ? "s" : ""}`}
      actions={
        <Button
          size="sm"
          onClick={() => setShowAdd(true)}
          data-ocid="customers.add_button"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Customer
        </Button>
      }
    >
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, phone, or address..."
          className="pl-9"
          data-ocid="customers.search_input"
        />
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-14 w-full rounded-lg" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 px-4 text-center"
            data-ocid="customers.empty_state"
          >
            <Users className="w-10 h-10 text-muted-foreground/30 mb-3" />
            <p className="text-base font-medium text-foreground mb-1">
              {search ? "No matching customers" : "No customers yet"}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              {search
                ? "Try a different search term"
                : "Add your first customer to get started"}
            </p>
            {!search && (
              <Button
                size="sm"
                onClick={() => setShowAdd(true)}
                data-ocid="customers.empty_add_button"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Customer
              </Button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="px-6 py-3 text-left">
                      <SortButton
                        field="id"
                        current={sortField}
                        dir={sortDir}
                        onClick={handleSort}
                      >
                        ID
                      </SortButton>
                    </th>
                    <th className="px-4 py-3 text-left">
                      <SortButton
                        field="name"
                        current={sortField}
                        dir={sortDir}
                        onClick={handleSort}
                      >
                        Name
                      </SortButton>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Phone
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Address
                    </th>
                    <th className="px-4 py-3 text-right">
                      <SortButton
                        field="balance"
                        current={sortField}
                        dir={sortDir}
                        onClick={handleSort}
                      >
                        Balance
                      </SortButton>
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((c, i) => (
                    <tr
                      key={c.id.toString()}
                      className="hover:bg-muted/30 transition-colors cursor-pointer group"
                      onClick={() => setSelectedCustomer(c)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && setSelectedCustomer(c)
                      }
                      tabIndex={0}
                      data-ocid={`customers.item.${i + 1}`}
                    >
                      <td className="px-6 py-4 text-xs font-mono text-muted-foreground">
                        C{String(Number(c.id)).padStart(5, "0")}
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                          {c.name}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-muted-foreground">
                        {c.phone}
                      </td>
                      <td className="px-4 py-4 text-sm text-muted-foreground max-w-[200px] truncate">
                        {c.address}
                      </td>
                      <td className="px-4 py-4 text-right">
                        {Number(c.balance) !== 0 ? (
                          <Badge
                            variant="outline"
                            className={`font-semibold ${balanceBadgeClass(c.balance)}`}
                          >
                            {formatCurrency(c.balance)}
                          </Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            Nil
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingCustomer(c);
                            }}
                            data-ocid={`customers.edit_button.${i + 1}`}
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeletingId(c.id);
                            }}
                            className="text-destructive hover:text-destructive"
                            data-ocid={`customers.delete_button.${i + 1}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-border">
              {filtered.map((c, i) => (
                <button
                  key={c.id.toString()}
                  type="button"
                  className="w-full text-left p-4 hover:bg-muted/30 transition-colors"
                  onClick={() => setSelectedCustomer(c)}
                  data-ocid={`customers.item.${i + 1}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground">
                        {c.name}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        <span>{c.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5 text-xs text-muted-foreground truncate">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{c.address}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {Number(c.balance) !== 0 && (
                        <p className={`text-sm ${balanceColor(c.balance)}`}>
                          {formatCurrency(c.balance)}
                        </p>
                      )}
                      <div
                        className="flex items-center gap-1 mt-2"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                      >
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingCustomer(c);
                          }}
                          data-ocid={`customers.edit_button.${i + 1}`}
                        >
                          <Pencil className="w-3 h-3" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeletingId(c.id);
                          }}
                          className="text-destructive border-destructive/30"
                          data-ocid={`customers.delete_button.${i + 1}`}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Add Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent data-ocid="customers.add_dialog">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
          </DialogHeader>
          <CustomerForm
            onSubmit={handleAdd}
            loading={addMutation.isPending}
            onCancel={() => setShowAdd(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={!!editingCustomer}
        onOpenChange={() => setEditingCustomer(null)}
      >
        <DialogContent data-ocid="customers.edit_dialog">
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
          </DialogHeader>
          {editingCustomer && (
            <CustomerForm
              initial={{
                name: editingCustomer.name,
                phone: editingCustomer.phone,
                address: editingCustomer.address,
              }}
              onSubmit={handleUpdate}
              loading={updateMutation.isPending}
              onCancel={() => setEditingCustomer(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog
        open={deletingId !== null}
        onOpenChange={() => setDeletingId(null)}
      >
        <AlertDialogContent data-ocid="customers.delete_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Customer</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the customer and all their records.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="customers.delete_cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="customers.delete_confirm_button"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}
