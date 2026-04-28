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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Loader2,
  Pencil,
  Plus,
  Search,
  Trash2,
  Wallet,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Layout } from "../components/Layout";
import { useCustomers } from "../hooks/useCustomers";
import {
  useAddPayment,
  useDeletePayment,
  usePayments,
  useUpdatePayment,
} from "../hooks/usePayments";
import {
  type CustomerView,
  type Payment,
  type PaymentInput,
  type PaymentMethod,
  formatCurrency,
  formatDate,
  getMethodLabel,
} from "../types";

// ─── Method Badge ──────────────────────────────────────────────────────────────

function MethodBadge({ method }: { method: PaymentMethod }) {
  const isCash = "cash" in method;
  return (
    <Badge
      variant="outline"
      className={
        isCash
          ? "bg-blue-50 border-blue-300 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700"
          : "bg-purple-50 border-purple-300 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700"
      }
    >
      {isCash ? (
        <Wallet className="w-3 h-3 mr-1" />
      ) : (
        <CreditCard className="w-3 h-3 mr-1" />
      )}
      {getMethodLabel(method)}
    </Badge>
  );
}

// ─── Payment Form Dialog ───────────────────────────────────────────────────────

interface PaymentFormState {
  customerId: string;
  amount: string;
  method: "cash" | "online";
  note: string;
  paymentDate: string;
}

function makeDefault(): PaymentFormState {
  return {
    customerId: "",
    amount: "",
    method: "cash",
    note: "",
    paymentDate: new Date().toISOString().split("T")[0],
  };
}

function fromPayment(p: Payment): PaymentFormState {
  return {
    customerId: p.customerId.toString(),
    amount: Number(p.amount).toString(),
    method: "cash" in p.method ? "cash" : "online",
    note: p.note,
    paymentDate: new Date(Number(p.paymentDate) / 1_000_000)
      .toISOString()
      .split("T")[0],
  };
}

interface PaymentDialogProps {
  open: boolean;
  onClose: () => void;
  editing: Payment | null;
  customers: CustomerView[];
}

function PaymentDialog({
  open,
  onClose,
  editing,
  customers,
}: PaymentDialogProps) {
  const addPayment = useAddPayment();
  const updatePayment = useUpdatePayment();
  const [form, setForm] = useState<PaymentFormState>(makeDefault);
  const [errors, setErrors] = useState<
    Partial<Record<keyof PaymentFormState, string>>
  >({});

  useEffect(() => {
    if (open) {
      setForm(editing ? fromPayment(editing) : makeDefault());
      setErrors({});
    }
  }, [open, editing]);

  function validate(): boolean {
    const e: Partial<Record<keyof PaymentFormState, string>> = {};
    if (!form.customerId) e.customerId = "Required";
    const parsedAmt = Number(form.amount);
    if (!form.amount || Number.isNaN(parsedAmt) || parsedAmt <= 0)
      e.amount = "Enter a valid amount";
    if (!form.paymentDate) e.paymentDate = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    const dateMs = new Date(form.paymentDate).getTime();
    const input = {
      customerId: BigInt(form.customerId),
      amount: BigInt(Math.round(Number(form.amount))),
      method: (form.method === "cash"
        ? { cash: null }
        : { online: null }) as PaymentMethod,
      note: form.note.trim(),
      paymentDate: BigInt(dateMs) * 1_000_000n,
    } as unknown as PaymentInput;

    try {
      if (editing) {
        await updatePayment.mutateAsync({ id: editing.id, input });
        toast.success("Payment updated");
      } else {
        await addPayment.mutateAsync(input);
        toast.success("Payment recorded");
      }
      onClose();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  const isPending = addPayment.isPending || updatePayment.isPending;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md" data-ocid="payment.dialog">
        <DialogHeader>
          <DialogTitle className="font-display">
            {editing ? "Edit Payment" : "Record Payment"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-1">
          {/* Customer */}
          <div className="grid gap-1.5">
            <Label>Customer</Label>
            <Select
              value={form.customerId}
              onValueChange={(v) => setForm((f) => ({ ...f, customerId: v }))}
            >
              <SelectTrigger
                data-ocid="payment.customer_select"
                className={errors.customerId ? "border-destructive" : ""}
              >
                <SelectValue placeholder="Select customer…" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((c) => (
                  <SelectItem key={c.id.toString()} value={c.id.toString()}>
                    {c.name}
                    {Number(c.balance) > 0 && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        owes {formatCurrency(c.balance)}
                      </span>
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.customerId && (
              <p
                className="text-xs text-destructive"
                data-ocid="payment.customer_field_error"
              >
                {errors.customerId}
              </p>
            )}
          </div>

          {/* Amount + Date row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="pay-amount">Amount (₹)</Label>
              <Input
                id="pay-amount"
                type="number"
                min="0"
                step="1"
                placeholder="0"
                value={form.amount}
                onChange={(e) =>
                  setForm((f) => ({ ...f, amount: e.target.value }))
                }
                data-ocid="payment.amount_input"
                className={errors.amount ? "border-destructive" : ""}
              />
              {errors.amount && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="payment.amount_field_error"
                >
                  {errors.amount}
                </p>
              )}
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="pay-date">Date</Label>
              <Input
                id="pay-date"
                type="date"
                value={form.paymentDate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, paymentDate: e.target.value }))
                }
                data-ocid="payment.date_input"
                className={errors.paymentDate ? "border-destructive" : ""}
              />
              {errors.paymentDate && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="payment.date_field_error"
                >
                  {errors.paymentDate}
                </p>
              )}
            </div>
          </div>

          {/* Method toggle */}
          <div className="grid gap-1.5">
            <Label>Payment Method</Label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, method: "cash" }))}
                data-ocid="payment.method_cash_toggle"
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md border text-sm font-medium transition-smooth ${
                  form.method === "cash"
                    ? "bg-blue-50 border-blue-400 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-600"
                    : "border-input text-muted-foreground hover:bg-muted"
                }`}
              >
                <Wallet className="w-4 h-4" />
                Cash
              </button>
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, method: "online" }))}
                data-ocid="payment.method_online_toggle"
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md border text-sm font-medium transition-smooth ${
                  form.method === "online"
                    ? "bg-purple-50 border-purple-400 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-600"
                    : "border-input text-muted-foreground hover:bg-muted"
                }`}
              >
                <CreditCard className="w-4 h-4" />
                Online
              </button>
            </div>
          </div>

          {/* Note */}
          <div className="grid gap-1.5">
            <Label htmlFor="pay-note">Note (optional)</Label>
            <Textarea
              id="pay-note"
              placeholder="e.g. Monthly settlement, advance…"
              rows={2}
              value={form.note}
              onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
              data-ocid="payment.note_textarea"
              className="resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-ocid="payment.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
            data-ocid="payment.submit_button"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {editing ? "Save Changes" : "Record Payment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Sort helpers ──────────────────────────────────────────────────────────────

type SortKey = "date" | "amount" | "customer" | "method";
type SortDir = "asc" | "desc";

function sortPayments(
  list: Payment[],
  key: SortKey,
  dir: SortDir,
  customerMap: Map<string, string>,
): Payment[] {
  return [...list].sort((a, b) => {
    let cmp = 0;
    if (key === "date") cmp = Number(a.paymentDate - b.paymentDate);
    else if (key === "amount") cmp = Number(a.amount - b.amount);
    else if (key === "customer") {
      const na = customerMap.get(a.customerId.toString()) ?? "";
      const nb = customerMap.get(b.customerId.toString()) ?? "";
      cmp = na.localeCompare(nb);
    } else if (key === "method") {
      cmp = ("cash" in a.method ? 0 : 1) - ("cash" in b.method ? 0 : 1);
    }
    return dir === "asc" ? cmp : -cmp;
  });
}

// ─── Sort Column Header ────────────────────────────────────────────────────────

function SortableHead({
  col,
  label,
  sortKey,
  sortDir,
  onSort,
  className,
}: {
  col: SortKey;
  label: string;
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (k: SortKey) => void;
  className?: string;
}) {
  const active = sortKey === col;
  return (
    <TableHead
      className={`cursor-pointer select-none whitespace-nowrap ${className ?? ""}`}
      onClick={() => onSort(col)}
      data-ocid={`payments.sort_${col}`}
    >
      <span className="flex items-center gap-1">
        {label}
        {active ? (
          sortDir === "asc" ? (
            <ChevronUp className="w-3.5 h-3.5 text-accent" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-accent" />
          )
        ) : (
          <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground/40" />
        )}
      </span>
    </TableHead>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function PaymentsPage() {
  const { data: payments = [], isLoading: loadingPayments } = usePayments();
  const { data: customers = [], isLoading: loadingCustomers } = useCustomers();
  const deletePayment = useDeletePayment();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Payment | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Payment | null>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [filterMethod, setFilterMethod] = useState<"all" | "cash" | "online">(
    "all",
  );
  const [filterCustomer, setFilterCustomer] = useState<string>("all");

  // Sorting
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const customerMap = useMemo(() => {
    const m = new Map<string, string>();
    for (const c of customers) m.set(c.id.toString(), c.name);
    return m;
  }, [customers]);

  const filtered = useMemo(() => {
    let result = payments;

    if (filterMethod !== "all") {
      result = result.filter((p) =>
        filterMethod === "cash" ? "cash" in p.method : "online" in p.method,
      );
    }
    if (filterCustomer !== "all") {
      result = result.filter((p) => p.customerId.toString() === filterCustomer);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) => {
        const name = customerMap.get(p.customerId.toString()) ?? "";
        return (
          name.toLowerCase().includes(q) ||
          p.note.toLowerCase().includes(q) ||
          formatCurrency(p.amount).includes(q)
        );
      });
    }

    return sortPayments(result, sortKey, sortDir, customerMap);
  }, [
    payments,
    filterMethod,
    filterCustomer,
    search,
    sortKey,
    sortDir,
    customerMap,
  ]);

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function openAdd() {
    setEditing(null);
    setDialogOpen(true);
  }
  function openEdit(p: Payment) {
    setEditing(p);
    setDialogOpen(true);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      await deletePayment.mutateAsync(deleteTarget.id);
      toast.success("Payment deleted");
    } catch {
      toast.error("Failed to delete payment");
    } finally {
      setDeleteTarget(null);
    }
  }

  const isLoading = loadingPayments || loadingCustomers;

  const totalAmount = useMemo(
    () => filtered.reduce((s, p) => s + p.amount, 0n),
    [filtered],
  );
  const cashTotal = useMemo(
    () =>
      filtered
        .filter((p) => "cash" in p.method)
        .reduce((s, p) => s + p.amount, 0n),
    [filtered],
  );
  const onlineTotal = useMemo(
    () =>
      filtered
        .filter((p) => "online" in p.method)
        .reduce((s, p) => s + p.amount, 0n),
    [filtered],
  );

  return (
    <Layout
      title="Payments"
      subtitle="Track and manage all customer payments"
      actions={
        <Button
          onClick={openAdd}
          data-ocid="payments.add_button"
          size="sm"
          className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Record Payment
        </Button>
      }
    >
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="card-elevated rounded-xl p-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
            Total Collected
          </p>
          <p className="text-2xl font-bold font-display text-accent">
            {formatCurrency(totalAmount)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {filtered.length} payment{filtered.length !== 1 ? "s" : ""} shown
          </p>
        </div>
        <div className="card-elevated rounded-xl p-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
            Cash
          </p>
          <p className="text-2xl font-bold font-display text-blue-600 dark:text-blue-400">
            {formatCurrency(cashTotal)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {filtered.filter((p) => "cash" in p.method).length} payments
          </p>
        </div>
        <div className="card-elevated rounded-xl p-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
            Online
          </p>
          <p className="text-2xl font-bold font-display text-purple-600 dark:text-purple-400">
            {formatCurrency(onlineTotal)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {filtered.filter((p) => "online" in p.method).length} payments
          </p>
        </div>
      </div>

      {/* Filters bar */}
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search customer, note…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9"
            data-ocid="payments.search_input"
          />
        </div>

        {/* Method filter pills */}
        <div className="flex gap-1.5" data-ocid="payments.method_filter">
          {(["all", "cash", "online"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setFilterMethod(m)}
              data-ocid={`payments.filter_method_${m}`}
              className={`px-3 py-1.5 rounded-md border text-sm font-medium transition-smooth ${
                filterMethod === m
                  ? m === "cash"
                    ? "bg-blue-50 border-blue-400 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700"
                    : m === "online"
                      ? "bg-purple-50 border-purple-400 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700"
                      : "bg-accent/10 border-accent/40 text-accent"
                  : "border-input text-muted-foreground hover:bg-muted"
              }`}
            >
              {m === "all" ? "All" : m === "cash" ? "💵 Cash" : "💳 Online"}
            </button>
          ))}
        </div>

        {/* Customer filter */}
        <Select value={filterCustomer} onValueChange={setFilterCustomer}>
          <SelectTrigger
            className="h-9 w-auto min-w-[160px]"
            data-ocid="payments.customer_filter_select"
          >
            <SelectValue placeholder="All Customers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Customers</SelectItem>
            {customers.map((c) => (
              <SelectItem key={c.id.toString()} value={c.id.toString()}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="card-elevated rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <SortableHead
                col="customer"
                label="Customer"
                sortKey={sortKey}
                sortDir={sortDir}
                onSort={handleSort}
              />
              <SortableHead
                col="date"
                label="Date"
                sortKey={sortKey}
                sortDir={sortDir}
                onSort={handleSort}
              />
              <SortableHead
                col="amount"
                label="Amount"
                sortKey={sortKey}
                sortDir={sortDir}
                onSort={handleSort}
                className="text-right"
              />
              <SortableHead
                col="method"
                label="Method"
                sortKey={sortKey}
                sortDir={sortDir}
                onSort={handleSort}
              />
              <TableHead>Note</TableHead>
              <TableHead className="w-[88px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              ["sk1", "sk2", "sk3", "sk4", "sk5"].map((sk) => (
                <TableRow key={sk} data-ocid="payments.loading_state">
                  <TableCell>
                    <Skeleton className="h-4 w-28" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20 ml-auto" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-36" />
                  </TableCell>
                  <TableCell />
                </TableRow>
              ))
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-16 text-center"
                  data-ocid="payments.empty_state"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        No payments found
                      </p>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {payments.length === 0
                          ? "Record your first payment to get started."
                          : "Try adjusting your filters."}
                      </p>
                    </div>
                    {payments.length === 0 && (
                      <Button
                        size="sm"
                        onClick={openAdd}
                        data-ocid="payments.empty_add_button"
                        className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5 mt-1"
                      >
                        <Plus className="w-4 h-4" />
                        Record Payment
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((payment, idx) => (
                <TableRow
                  key={payment.id.toString()}
                  className="hover:bg-muted/30 transition-colors"
                  data-ocid={`payments.item.${idx + 1}`}
                >
                  <TableCell className="font-medium text-foreground">
                    {customerMap.get(payment.customerId.toString()) ?? (
                      <span className="text-muted-foreground italic text-sm">
                        Unknown
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                    {formatDate(payment.paymentDate)}
                  </TableCell>
                  <TableCell className="text-right font-semibold font-mono tabular-nums text-foreground whitespace-nowrap">
                    {formatCurrency(payment.amount)}
                  </TableCell>
                  <TableCell>
                    <MethodBadge method={payment.method} />
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm max-w-[200px] truncate">
                    {payment.note || (
                      <span className="text-muted-foreground/40">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 hover:bg-accent/15 hover:text-accent"
                        onClick={() => openEdit(payment)}
                        data-ocid={`payments.edit_button.${idx + 1}`}
                        aria-label="Edit payment"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => setDeleteTarget(payment)}
                        data-ocid={`payments.delete_button.${idx + 1}`}
                        aria-label="Delete payment"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile cards (visible below md) */}
      <div className="md:hidden mt-4 space-y-2">
        {!isLoading &&
          filtered.map((payment, idx) => (
            <div
              key={payment.id.toString()}
              className="card-elevated rounded-xl p-4"
              data-ocid={`payments.item.${idx + 1}`}
            >
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground truncate">
                    {customerMap.get(payment.customerId.toString()) ??
                      `#${payment.customerId}`}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatDate(payment.paymentDate)}
                  </p>
                  {payment.note && (
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      {payment.note}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="font-bold text-foreground font-mono">
                    {formatCurrency(payment.amount)}
                  </span>
                  <MethodBadge method={payment.method} />
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEdit(payment)}
                  data-ocid={`payments.mobile_edit_button.${idx + 1}`}
                  className="flex-1 hover:border-accent/50 hover:text-accent"
                >
                  <Pencil className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDeleteTarget(payment)}
                  data-ocid={`payments.mobile_delete_button.${idx + 1}`}
                  className="flex-1 text-destructive border-destructive/30 hover:bg-destructive/5"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
      </div>

      {/* Add / Edit Dialog */}
      <PaymentDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        editing={editing}
        customers={customers}
      />

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
      >
        <AlertDialogContent data-ocid="payments.delete_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Payment?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the payment of{" "}
              <strong>
                {deleteTarget ? formatCurrency(deleteTarget.amount) : ""}
              </strong>{" "}
              from{" "}
              <strong>
                {deleteTarget
                  ? (customerMap.get(deleteTarget.customerId.toString()) ??
                    "this customer")
                  : ""}
              </strong>
              . This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="payments.delete_cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              data-ocid="payments.delete_confirm_button"
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deletePayment.isPending && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}
