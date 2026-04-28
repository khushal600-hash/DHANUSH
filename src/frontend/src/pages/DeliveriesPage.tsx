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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  CheckCircle2,
  ChevronDown,
  Circle,
  Pencil,
  Plus,
  Search,
  Trash2,
  Truck,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Layout } from "../components/Layout";
import { useCustomers } from "../hooks/useCustomers";
import {
  useAddDelivery,
  useDeleteDelivery,
  useDeliveries,
  useUpdateDelivery,
  useUpdateDeliveryStatus,
} from "../hooks/useDeliveries";
import type {
  CustomerView,
  DeliveryInput,
  DeliveryStatus,
  DeliveryView,
} from "../types";
import {
  formatCurrency,
  formatDate,
  getStatusLabel,
  getStatusVariant,
} from "../types";

// ─── Status Badge ──────────────────────────────────────────────────────────────

const STATUS_COLOR: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  delivered: "bg-emerald-100 text-emerald-800 border-emerald-200",
  cancelled: "bg-muted text-muted-foreground border-border",
};

function StatusBadge({ status }: { status: DeliveryStatus }) {
  const key =
    "pending" in status
      ? "pending"
      : "delivered" in status
        ? "delivered"
        : "cancelled";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${STATUS_COLOR[key]}`}
    >
      {key === "pending" && (
        <Circle className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
      )}
      {key === "delivered" && <CheckCircle2 className="w-2.5 h-2.5" />}
      {key === "cancelled" && <XCircle className="w-2.5 h-2.5" />}
      {getStatusLabel(status)}
    </span>
  );
}

// ─── Inline Status Selector ────────────────────────────────────────────────────

const ALL_STATUSES: Array<{
  label: string;
  value: DeliveryStatus;
  key: string;
}> = [
  { label: "Pending", value: { pending: null }, key: "pending" },
  { label: "Delivered", value: { delivered: null }, key: "delivered" },
  { label: "Cancelled", value: { cancelled: null }, key: "cancelled" },
];

function StatusSelector({
  delivery,
  index,
}: {
  delivery: DeliveryView;
  index: number;
}) {
  const updateStatus = useUpdateDeliveryStatus();
  const [open, setOpen] = useState(false);
  const currentKey =
    "pending" in delivery.status
      ? "pending"
      : "delivered" in delivery.status
        ? "delivered"
        : "cancelled";

  const handleSelect = async (s: DeliveryStatus, key: string) => {
    if (key === currentKey) {
      setOpen(false);
      return;
    }
    setOpen(false);
    try {
      await updateStatus.mutateAsync({ id: delivery.id, status: s });
      toast.success(`Status updated to ${getStatusLabel(s)}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-1 group"
          data-ocid={`deliveries.status_selector.${index}`}
          aria-label="Change status"
        >
          <StatusBadge status={delivery.status} />
          <ChevronDown className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-44 p-1"
        align="start"
        data-ocid={`deliveries.status_popover.${index}`}
      >
        {ALL_STATUSES.map(({ label, value, key }) => (
          <button
            key={key}
            type="button"
            onClick={() => handleSelect(value, key)}
            className={`w-full flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors hover:bg-muted/60 ${
              currentKey === key ? "font-semibold" : "text-muted-foreground"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full flex-shrink-0 ${
                key === "pending"
                  ? "bg-amber-400"
                  : key === "delivered"
                    ? "bg-emerald-500"
                    : "bg-muted-foreground/40"
              }`}
            />
            {label}
            {currentKey === key && (
              <CheckCircle2 className="w-3 h-3 ml-auto text-primary" />
            )}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

// ─── Delivery Form ─────────────────────────────────────────────────────────────

interface DeliveryFormProps {
  customers: CustomerView[];
  initial?: Partial<DeliveryInput>;
  onSubmit: (data: DeliveryInput) => void;
  loading: boolean;
  onCancel: () => void;
}

function DeliveryForm({
  customers,
  initial,
  onSubmit,
  loading,
  onCancel,
}: DeliveryFormProps) {
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState({
    customerId: initial?.customerId?.toString() ?? "",
    quantity: initial?.quantity?.toString() ?? "1",
    pricePerCan: initial?.pricePerCan?.toString() ?? "30",
    deliveryDate: initial?.deliveryDate
      ? new Date(Number(initial.deliveryDate) / 1_000_000)
          .toISOString()
          .split("T")[0]
      : today,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      customerId: BigInt(form.customerId),
      quantity: BigInt(form.quantity),
      pricePerCan: BigInt(form.pricePerCan),
      deliveryDate: BigInt(new Date(form.deliveryDate).getTime()) * 1_000_000n,
    });
  };

  const total =
    form.quantity && form.pricePerCan
      ? Number(form.quantity) * Number(form.pricePerCan)
      : 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Customer</Label>
        <Select
          value={form.customerId}
          onValueChange={(v) => setForm((p) => ({ ...p, customerId: v }))}
          required
        >
          <SelectTrigger
            className="mt-1"
            data-ocid="delivery_form.customer_select"
          >
            <SelectValue placeholder="Select customer..." />
          </SelectTrigger>
          <SelectContent>
            {customers.map((c) => (
              <SelectItem key={c.id.toString()} value={c.id.toString()}>
                {c.name} — {c.phone}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="d-qty">Quantity (cans)</Label>
          <Input
            id="d-qty"
            type="number"
            min="1"
            value={form.quantity}
            onChange={(e) =>
              setForm((p) => ({ ...p, quantity: e.target.value }))
            }
            required
            data-ocid="delivery_form.quantity_input"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="d-price">Price per Can (₹)</Label>
          <Input
            id="d-price"
            type="number"
            min="1"
            value={form.pricePerCan}
            onChange={(e) =>
              setForm((p) => ({ ...p, pricePerCan: e.target.value }))
            }
            required
            data-ocid="delivery_form.price_input"
            className="mt-1"
          />
        </div>
      </div>
      {total > 0 && (
        <div className="px-3 py-2.5 rounded-lg bg-primary/5 border border-primary/15 text-sm flex items-center justify-between">
          <span className="text-muted-foreground">Estimated Total</span>
          <span className="font-semibold text-foreground">
            ₹{total.toLocaleString("en-IN")}
          </span>
        </div>
      )}
      <div>
        <Label htmlFor="d-date">Delivery Date</Label>
        <Input
          id="d-date"
          type="date"
          value={form.deliveryDate}
          onChange={(e) =>
            setForm((p) => ({ ...p, deliveryDate: e.target.value }))
          }
          required
          data-ocid="delivery_form.date_input"
          className="mt-1"
        />
      </div>
      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          data-ocid="delivery_form.cancel_button"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading || !form.customerId}
          data-ocid="delivery_form.submit_button"
        >
          {loading ? "Saving..." : "Save Delivery"}
        </Button>
      </DialogFooter>
    </form>
  );
}

// ─── Sort helpers ──────────────────────────────────────────────────────────────

type SortKey =
  | "id"
  | "customer"
  | "quantity"
  | "pricePerCan"
  | "totalAmount"
  | "deliveryDate"
  | "status";
type SortDir = "asc" | "desc";

function sortDeliveries(
  list: DeliveryView[],
  key: SortKey,
  dir: SortDir,
  customerMap: Map<string, string>,
): DeliveryView[] {
  return [...list].sort((a, b) => {
    let av: string | number = 0;
    let bv: string | number = 0;
    switch (key) {
      case "id":
        av = Number(a.id);
        bv = Number(b.id);
        break;
      case "customer":
        av = customerMap.get(a.customerId.toString()) ?? "";
        bv = customerMap.get(b.customerId.toString()) ?? "";
        break;
      case "quantity":
        av = Number(a.quantity);
        bv = Number(b.quantity);
        break;
      case "pricePerCan":
        av = Number(a.pricePerCan);
        bv = Number(b.pricePerCan);
        break;
      case "totalAmount":
        av = Number(a.totalAmount);
        bv = Number(b.totalAmount);
        break;
      case "deliveryDate":
        av = Number(a.deliveryDate);
        bv = Number(b.deliveryDate);
        break;
      case "status":
        av = getStatusLabel(a.status);
        bv = getStatusLabel(b.status);
        break;
    }
    if (av < bv) return dir === "asc" ? -1 : 1;
    if (av > bv) return dir === "asc" ? 1 : -1;
    return 0;
  });
}

function SortableHeader({
  label,
  sortKey,
  current,
  dir,
  onSort,
  align = "left",
}: {
  label: string;
  sortKey: SortKey;
  current: SortKey;
  dir: SortDir;
  onSort: (k: SortKey) => void;
  align?: "left" | "right";
}) {
  const active = current === sortKey;
  const Icon = !active ? ArrowUpDown : dir === "asc" ? ArrowUp : ArrowDown;
  return (
    <th
      className={`text-xs font-semibold text-muted-foreground uppercase tracking-wide py-3 px-4 ${align === "right" ? "text-right" : "text-left"}`}
    >
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className={`inline-flex items-center gap-1 hover:text-foreground transition-colors ${active ? "text-foreground" : ""}`}
      >
        {label}
        <Icon
          className={`w-3 h-3 ${active ? "text-primary" : "text-muted-foreground/40"}`}
        />
      </button>
    </th>
  );
}

// ─── Filter Bar ────────────────────────────────────────────────────────────────

const STATUS_FILTERS = ["all", "pending", "delivered", "cancelled"] as const;

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function DeliveriesPage() {
  const { data: deliveries, isLoading } = useDeliveries();
  const { data: customers } = useCustomers();
  const addMutation = useAddDelivery();
  const updateMutation = useUpdateDelivery();
  const deleteMutation = useDeleteDelivery();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<(typeof STATUS_FILTERS)[number]>("all");
  const [customerFilter, setCustomerFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("deliveryDate");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [showAdd, setShowAdd] = useState(false);
  const [editingDelivery, setEditingDelivery] = useState<DeliveryView | null>(
    null,
  );
  const [deletingId, setDeletingId] = useState<bigint | null>(null);

  const customerMap = new Map(
    (customers ?? []).map((c) => [c.id.toString(), c.name]),
  );

  const handleSort = (key: SortKey) => {
    if (key === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const filtered = (deliveries ?? []).filter((d) => {
    const cName = customerMap.get(d.customerId.toString()) ?? "";
    const matchesSearch =
      cName.toLowerCase().includes(search.toLowerCase()) ||
      String(Number(d.id)).includes(search);
    const matchesStatus = statusFilter === "all" || statusFilter in d.status;
    const matchesCustomer =
      customerFilter === "all" || d.customerId.toString() === customerFilter;
    return matchesSearch && matchesStatus && matchesCustomer;
  });

  const sorted = sortDeliveries(filtered, sortKey, sortDir, customerMap);

  const handleAdd = async (data: DeliveryInput) => {
    try {
      await addMutation.mutateAsync(data);
      toast.success("Delivery recorded successfully");
      setShowAdd(false);
    } catch {
      toast.error("Failed to add delivery");
    }
  };

  const handleUpdate = async (data: DeliveryInput) => {
    if (!editingDelivery) return;
    try {
      await updateMutation.mutateAsync({ id: editingDelivery.id, input: data });
      toast.success("Delivery updated");
      setEditingDelivery(null);
    } catch {
      toast.error("Failed to update delivery");
    }
  };

  const handleDelete = async () => {
    if (deletingId === null) return;
    try {
      await deleteMutation.mutateAsync(deletingId);
      toast.success("Delivery deleted");
      setDeletingId(null);
    } catch {
      toast.error("Failed to delete delivery");
    }
  };

  const customerOptions = (customers ?? []).map((c) => ({
    value: c.id.toString(),
    label: c.name,
  }));

  return (
    <Layout
      title="Deliveries"
      subtitle={`${sorted.length} record${sorted.length !== 1 ? "s" : ""}`}
      actions={
        <Button
          size="sm"
          onClick={() => setShowAdd(true)}
          data-ocid="deliveries.add_button"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Delivery
        </Button>
      }
    >
      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer or delivery ID..."
            className="pl-9"
            data-ocid="deliveries.search_input"
          />
        </div>
        <Select value={customerFilter} onValueChange={setCustomerFilter}>
          <SelectTrigger
            className="w-full sm:w-44"
            data-ocid="deliveries.customer_filter"
          >
            <SelectValue placeholder="All customers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All customers</SelectItem>
            {customerOptions.map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-1.5 flex-wrap">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              data-ocid={`deliveries.filter.${s}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                statusFilter === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3" data-ocid="deliveries.loading_state">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-14 w-full rounded-lg" />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 px-4 text-center"
            data-ocid="deliveries.empty_state"
          >
            <Truck className="w-10 h-10 text-muted-foreground/30 mb-3" />
            <p className="text-base font-medium text-foreground mb-1">
              {search || statusFilter !== "all" || customerFilter !== "all"
                ? "No matching deliveries"
                : "No deliveries yet"}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              {search || statusFilter !== "all" || customerFilter !== "all"
                ? "Try adjusting your filters"
                : "Record your first delivery to get started"}
            </p>
            {!search && statusFilter === "all" && customerFilter === "all" && (
              <Button
                size="sm"
                onClick={() => setShowAdd(true)}
                data-ocid="deliveries.empty_add_button"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Delivery
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
                    <SortableHeader
                      label="ID"
                      sortKey="id"
                      current={sortKey}
                      dir={sortDir}
                      onSort={handleSort}
                    />
                    <SortableHeader
                      label="Customer"
                      sortKey="customer"
                      current={sortKey}
                      dir={sortDir}
                      onSort={handleSort}
                    />
                    <SortableHeader
                      label="Qty"
                      sortKey="quantity"
                      current={sortKey}
                      dir={sortDir}
                      onSort={handleSort}
                      align="right"
                    />
                    <SortableHeader
                      label="Price/Can"
                      sortKey="pricePerCan"
                      current={sortKey}
                      dir={sortDir}
                      onSort={handleSort}
                      align="right"
                    />
                    <SortableHeader
                      label="Total"
                      sortKey="totalAmount"
                      current={sortKey}
                      dir={sortDir}
                      onSort={handleSort}
                      align="right"
                    />
                    <SortableHeader
                      label="Date"
                      sortKey="deliveryDate"
                      current={sortKey}
                      dir={sortDir}
                      onSort={handleSort}
                    />
                    <SortableHeader
                      label="Status"
                      sortKey="status"
                      current={sortKey}
                      dir={sortDir}
                      onSort={handleSort}
                    />
                    <th className="text-xs font-semibold text-muted-foreground uppercase tracking-wide py-3 px-6 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {sorted.map((d, i) => (
                    <tr
                      key={d.id.toString()}
                      className="hover:bg-muted/20 transition-colors"
                      data-ocid={`deliveries.item.${i + 1}`}
                    >
                      <td className="px-4 py-3.5 text-xs font-mono text-muted-foreground">
                        D{String(Number(d.id)).padStart(4, "0")}
                      </td>
                      <td className="px-4 py-3.5 text-sm font-medium text-foreground">
                        {customerMap.get(d.customerId.toString()) ??
                          `#${d.customerId}`}
                      </td>
                      <td className="px-4 py-3.5 text-sm text-right tabular-nums text-foreground">
                        {Number(d.quantity)}
                      </td>
                      <td className="px-4 py-3.5 text-sm text-right tabular-nums text-muted-foreground">
                        {formatCurrency(d.pricePerCan)}
                      </td>
                      <td className="px-4 py-3.5 text-sm text-right tabular-nums font-semibold text-foreground">
                        {formatCurrency(d.totalAmount)}
                      </td>
                      <td className="px-4 py-3.5 text-sm text-muted-foreground whitespace-nowrap">
                        {formatDate(d.deliveryDate)}
                      </td>
                      <td className="px-4 py-3.5">
                        <StatusSelector delivery={d} index={i + 1} />
                      </td>
                      <td className="px-6 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingDelivery(d)}
                            aria-label="Edit delivery"
                            data-ocid={`deliveries.edit_button.${i + 1}`}
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeletingId(d.id)}
                            className="text-destructive hover:text-destructive"
                            aria-label="Delete delivery"
                            data-ocid={`deliveries.delete_button.${i + 1}`}
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
              {sorted.map((d, i) => (
                <div
                  key={d.id.toString()}
                  className="p-4"
                  data-ocid={`deliveries.item.${i + 1}`}
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">
                        D{String(Number(d.id)).padStart(4, "0")} ·{" "}
                        {customerMap.get(d.customerId.toString()) ??
                          `#${d.customerId}`}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {Number(d.quantity)} cans ×{" "}
                        {formatCurrency(d.pricePerCan)} ·{" "}
                        {formatDate(d.deliveryDate)}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-foreground">
                        {formatCurrency(d.totalAmount)}
                      </p>
                      <div className="mt-1.5">
                        <StatusSelector delivery={d} index={i + 1} />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingDelivery(d)}
                      data-ocid={`deliveries.edit_button.${i + 1}`}
                    >
                      <Pencil className="w-3 h-3 mr-1" /> Edit
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setDeletingId(d.id)}
                      className="text-destructive border-destructive/30"
                      data-ocid={`deliveries.delete_button.${i + 1}`}
                    >
                      <Trash2 className="w-3 h-3 mr-1" /> Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Add Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent data-ocid="deliveries.add_dialog">
          <DialogHeader>
            <DialogTitle>Add Delivery</DialogTitle>
          </DialogHeader>
          <DeliveryForm
            customers={customers ?? []}
            onSubmit={handleAdd}
            loading={addMutation.isPending}
            onCancel={() => setShowAdd(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={!!editingDelivery}
        onOpenChange={() => setEditingDelivery(null)}
      >
        <DialogContent data-ocid="deliveries.edit_dialog">
          <DialogHeader>
            <DialogTitle>Edit Delivery</DialogTitle>
          </DialogHeader>
          {editingDelivery && (
            <DeliveryForm
              customers={customers ?? []}
              initial={{
                customerId: editingDelivery.customerId,
                quantity: editingDelivery.quantity,
                pricePerCan: editingDelivery.pricePerCan,
                deliveryDate: editingDelivery.deliveryDate,
              }}
              onSubmit={handleUpdate}
              loading={updateMutation.isPending}
              onCancel={() => setEditingDelivery(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog
        open={deletingId !== null}
        onOpenChange={() => setDeletingId(null)}
      >
        <AlertDialogContent data-ocid="deliveries.delete_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Delivery</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this delivery record. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="deliveries.delete_cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="deliveries.delete_confirm_button"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}
