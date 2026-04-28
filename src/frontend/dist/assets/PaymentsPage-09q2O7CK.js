import { j as jsxRuntimeExports, a as cn, r as reactExports, B as Button, f as LoaderCircle, b as ue } from "./index-Kf6cq2Mp.js";
import { u as useCustomers, S as Search, I as Input, P as Pencil, T as Trash2, A as AlertDialog, g as AlertDialogContent, h as AlertDialogHeader, i as AlertDialogTitle, j as AlertDialogDescription, k as AlertDialogFooter, l as AlertDialogCancel, m as AlertDialogAction, C as ChevronUp, o as ChevronDown, p as ArrowUpDown, D as Dialog, d as DialogContent, e as DialogHeader, f as DialogTitle, L as Label, n as DialogFooter } from "./useCustomers-CXb1NHKR.js";
import { B as Badge, W as Wallet } from "./badge-BttCQMMj.js";
import { S as Select, b as SelectTrigger, d as SelectValue, e as SelectContent, f as SelectItem } from "./select-YC5-nodD.js";
import { f as formatCurrency, L as Layout, S as Skeleton, C as CreditCard, P as Plus, b as formatDate, h as getMethodLabel } from "./types-CD4imbHJ.js";
import { u as usePayments, a as useDeletePayment, b as useAddPayment, c as useUpdatePayment } from "./usePayments-DpfJ_-Ip.js";
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function MethodBadge({ method }) {
  const isCash = "cash" in method;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Badge,
    {
      variant: "outline",
      className: isCash ? "bg-blue-50 border-blue-300 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700" : "bg-purple-50 border-purple-300 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700",
      children: [
        isCash ? /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-3 h-3 mr-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-3 h-3 mr-1" }),
        getMethodLabel(method)
      ]
    }
  );
}
function makeDefault() {
  return {
    customerId: "",
    amount: "",
    method: "cash",
    note: "",
    paymentDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
  };
}
function fromPayment(p) {
  return {
    customerId: p.customerId.toString(),
    amount: Number(p.amount).toString(),
    method: "cash" in p.method ? "cash" : "online",
    note: p.note,
    paymentDate: new Date(Number(p.paymentDate) / 1e6).toISOString().split("T")[0]
  };
}
function PaymentDialog({
  open,
  onClose,
  editing,
  customers
}) {
  const addPayment = useAddPayment();
  const updatePayment = useUpdatePayment();
  const [form, setForm] = reactExports.useState(makeDefault);
  const [errors, setErrors] = reactExports.useState({});
  reactExports.useEffect(() => {
    if (open) {
      setForm(editing ? fromPayment(editing) : makeDefault());
      setErrors({});
    }
  }, [open, editing]);
  function validate() {
    const e = {};
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
      method: form.method === "cash" ? { cash: null } : { online: null },
      note: form.note.trim(),
      paymentDate: BigInt(dateMs) * 1000000n
    };
    try {
      if (editing) {
        await updatePayment.mutateAsync({ id: editing.id, input });
        ue.success("Payment updated");
      } else {
        await addPayment.mutateAsync(input);
        ue.success("Payment recorded");
      }
      onClose();
    } catch {
      ue.error("Something went wrong. Please try again.");
    }
  }
  const isPending = addPayment.isPending || updatePayment.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", "data-ocid": "payment.dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: editing ? "Edit Payment" : "Record Payment" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 py-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Customer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: form.customerId,
            onValueChange: (v) => setForm((f) => ({ ...f, customerId: v })),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  "data-ocid": "payment.customer_select",
                  className: errors.customerId ? "border-destructive" : "",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select customer…" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: customers.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: c.id.toString(), children: [
                c.name,
                Number(c.balance) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-xs text-muted-foreground", children: [
                  "owes ",
                  formatCurrency(c.balance)
                ] })
              ] }, c.id.toString())) })
            ]
          }
        ),
        errors.customerId && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-destructive",
            "data-ocid": "payment.customer_field_error",
            children: errors.customerId
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pay-amount", children: "Amount (₹)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "pay-amount",
              type: "number",
              min: "0",
              step: "1",
              placeholder: "0",
              value: form.amount,
              onChange: (e) => setForm((f) => ({ ...f, amount: e.target.value })),
              "data-ocid": "payment.amount_input",
              className: errors.amount ? "border-destructive" : ""
            }
          ),
          errors.amount && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs text-destructive",
              "data-ocid": "payment.amount_field_error",
              children: errors.amount
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pay-date", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "pay-date",
              type: "date",
              value: form.paymentDate,
              onChange: (e) => setForm((f) => ({ ...f, paymentDate: e.target.value })),
              "data-ocid": "payment.date_input",
              className: errors.paymentDate ? "border-destructive" : ""
            }
          ),
          errors.paymentDate && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs text-destructive",
              "data-ocid": "payment.date_field_error",
              children: errors.paymentDate
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Payment Method" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setForm((f) => ({ ...f, method: "cash" })),
              "data-ocid": "payment.method_cash_toggle",
              className: `flex-1 flex items-center justify-center gap-2 py-2 rounded-md border text-sm font-medium transition-smooth ${form.method === "cash" ? "bg-blue-50 border-blue-400 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-600" : "border-input text-muted-foreground hover:bg-muted"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-4 h-4" }),
                "Cash"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setForm((f) => ({ ...f, method: "online" })),
              "data-ocid": "payment.method_online_toggle",
              className: `flex-1 flex items-center justify-center gap-2 py-2 rounded-md border text-sm font-medium transition-smooth ${form.method === "online" ? "bg-purple-50 border-purple-400 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-600" : "border-input text-muted-foreground hover:bg-muted"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4" }),
                "Online"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pay-note", children: "Note (optional)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "pay-note",
            placeholder: "e.g. Monthly settlement, advance…",
            rows: 2,
            value: form.note,
            onChange: (e) => setForm((f) => ({ ...f, note: e.target.value })),
            "data-ocid": "payment.note_textarea",
            className: "resize-none"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: onClose,
          "data-ocid": "payment.cancel_button",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          onClick: handleSubmit,
          disabled: isPending,
          "data-ocid": "payment.submit_button",
          className: "bg-accent text-accent-foreground hover:bg-accent/90",
          children: [
            isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
            editing ? "Save Changes" : "Record Payment"
          ]
        }
      )
    ] })
  ] }) });
}
function sortPayments(list, key, dir, customerMap) {
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
function SortableHead({
  col,
  label,
  sortKey,
  sortDir,
  onSort,
  className
}) {
  const active = sortKey === col;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    TableHead,
    {
      className: `cursor-pointer select-none whitespace-nowrap ${className ?? ""}`,
      onClick: () => onSort(col),
      "data-ocid": `payments.sort_${col}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
        label,
        active ? sortDir === "asc" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3.5 h-3.5 text-accent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3.5 h-3.5 text-accent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "w-3.5 h-3.5 text-muted-foreground/40" })
      ] })
    }
  );
}
function PaymentsPage() {
  const { data: payments = [], isLoading: loadingPayments } = usePayments();
  const { data: customers = [], isLoading: loadingCustomers } = useCustomers();
  const deletePayment = useDeletePayment();
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [search, setSearch] = reactExports.useState("");
  const [filterMethod, setFilterMethod] = reactExports.useState(
    "all"
  );
  const [filterCustomer, setFilterCustomer] = reactExports.useState("all");
  const [sortKey, setSortKey] = reactExports.useState("date");
  const [sortDir, setSortDir] = reactExports.useState("desc");
  const customerMap = reactExports.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    for (const c of customers) m.set(c.id.toString(), c.name);
    return m;
  }, [customers]);
  const filtered = reactExports.useMemo(() => {
    let result = payments;
    if (filterMethod !== "all") {
      result = result.filter(
        (p) => filterMethod === "cash" ? "cash" in p.method : "online" in p.method
      );
    }
    if (filterCustomer !== "all") {
      result = result.filter((p) => p.customerId.toString() === filterCustomer);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) => {
        const name = customerMap.get(p.customerId.toString()) ?? "";
        return name.toLowerCase().includes(q) || p.note.toLowerCase().includes(q) || formatCurrency(p.amount).includes(q);
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
    customerMap
  ]);
  function handleSort(key) {
    if (sortKey === key) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  }
  function openAdd() {
    setEditing(null);
    setDialogOpen(true);
  }
  function openEdit(p) {
    setEditing(p);
    setDialogOpen(true);
  }
  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      await deletePayment.mutateAsync(deleteTarget.id);
      ue.success("Payment deleted");
    } catch {
      ue.error("Failed to delete payment");
    } finally {
      setDeleteTarget(null);
    }
  }
  const isLoading = loadingPayments || loadingCustomers;
  const totalAmount = reactExports.useMemo(
    () => filtered.reduce((s, p) => s + p.amount, 0n),
    [filtered]
  );
  const cashTotal = reactExports.useMemo(
    () => filtered.filter((p) => "cash" in p.method).reduce((s, p) => s + p.amount, 0n),
    [filtered]
  );
  const onlineTotal = reactExports.useMemo(
    () => filtered.filter((p) => "online" in p.method).reduce((s, p) => s + p.amount, 0n),
    [filtered]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Layout,
    {
      title: "Payments",
      subtitle: "Track and manage all customer payments",
      actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: openAdd,
          "data-ocid": "payments.add_button",
          size: "sm",
          className: "bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            "Record Payment"
          ]
        }
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated rounded-xl p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5", children: "Total Collected" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold font-display text-accent", children: formatCurrency(totalAmount) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
              filtered.length,
              " payment",
              filtered.length !== 1 ? "s" : "",
              " shown"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated rounded-xl p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5", children: "Cash" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold font-display text-blue-600 dark:text-blue-400", children: formatCurrency(cashTotal) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
              filtered.filter((p) => "cash" in p.method).length,
              " payments"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated rounded-xl p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5", children: "Online" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold font-display text-purple-600 dark:text-purple-400", children: formatCurrency(onlineTotal) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
              filtered.filter((p) => "online" in p.method).length,
              " payments"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[180px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search customer, note…",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                className: "pl-9 h-9",
                "data-ocid": "payments.search_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5", "data-ocid": "payments.method_filter", children: ["all", "cash", "online"].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setFilterMethod(m),
              "data-ocid": `payments.filter_method_${m}`,
              className: `px-3 py-1.5 rounded-md border text-sm font-medium transition-smooth ${filterMethod === m ? m === "cash" ? "bg-blue-50 border-blue-400 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700" : m === "online" ? "bg-purple-50 border-purple-400 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700" : "bg-accent/10 border-accent/40 text-accent" : "border-input text-muted-foreground hover:bg-muted"}`,
              children: m === "all" ? "All" : m === "cash" ? "💵 Cash" : "💳 Online"
            },
            m
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filterCustomer, onValueChange: setFilterCustomer, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "h-9 w-auto min-w-[160px]",
                "data-ocid": "payments.customer_filter_select",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Customers" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Customers" }),
              customers.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id.toString(), children: c.name }, c.id.toString()))
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-elevated rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/40 hover:bg-muted/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SortableHead,
              {
                col: "customer",
                label: "Customer",
                sortKey,
                sortDir,
                onSort: handleSort
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SortableHead,
              {
                col: "date",
                label: "Date",
                sortKey,
                sortDir,
                onSort: handleSort
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SortableHead,
              {
                col: "amount",
                label: "Amount",
                sortKey,
                sortDir,
                onSort: handleSort,
                className: "text-right"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SortableHead,
              {
                col: "method",
                label: "Method",
                sortKey,
                sortDir,
                onSort: handleSort
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Note" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-[88px] text-right", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: isLoading ? ["sk1", "sk2", "sk3", "sk4", "sk5"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { "data-ocid": "payments.loading_state", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20 ml-auto" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-full" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-36" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, {})
          ] }, sk)) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            TableCell,
            {
              colSpan: 6,
              className: "py-16 text-center",
              "data-ocid": "payments.empty_state",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-6 h-6 text-muted-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "No payments found" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: payments.length === 0 ? "Record your first payment to get started." : "Try adjusting your filters." })
                ] }),
                payments.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    onClick: openAdd,
                    "data-ocid": "payments.empty_add_button",
                    className: "bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5 mt-1",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                      "Record Payment"
                    ]
                  }
                )
              ] })
            }
          ) }) : filtered.map((payment, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TableRow,
            {
              className: "hover:bg-muted/30 transition-colors",
              "data-ocid": `payments.item.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium text-foreground", children: customerMap.get(payment.customerId.toString()) ?? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic text-sm", children: "Unknown" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground text-sm whitespace-nowrap", children: formatDate(payment.paymentDate) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-semibold font-mono tabular-nums text-foreground whitespace-nowrap", children: formatCurrency(payment.amount) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(MethodBadge, { method: payment.method }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground text-sm max-w-[200px] truncate", children: payment.note || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/40", children: "—" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      className: "h-7 w-7 hover:bg-accent/15 hover:text-accent",
                      onClick: () => openEdit(payment),
                      "data-ocid": `payments.edit_button.${idx + 1}`,
                      "aria-label": "Edit payment",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      className: "h-7 w-7 hover:bg-destructive/10 hover:text-destructive",
                      onClick: () => setDeleteTarget(payment),
                      "data-ocid": `payments.delete_button.${idx + 1}`,
                      "aria-label": "Delete payment",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                    }
                  )
                ] }) })
              ]
            },
            payment.id.toString()
          )) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden mt-4 space-y-2", children: !isLoading && filtered.map((payment, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "card-elevated rounded-xl p-4",
            "data-ocid": `payments.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground truncate", children: customerMap.get(payment.customerId.toString()) ?? `#${payment.customerId}` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: formatDate(payment.paymentDate) }),
                  payment.note && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 truncate", children: payment.note })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground font-mono", children: formatCurrency(payment.amount) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MethodBadge, { method: payment.method })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => openEdit(payment),
                    "data-ocid": `payments.mobile_edit_button.${idx + 1}`,
                    className: "flex-1 hover:border-accent/50 hover:text-accent",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3 h-3 mr-1" }),
                      "Edit"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => setDeleteTarget(payment),
                    "data-ocid": `payments.mobile_delete_button.${idx + 1}`,
                    className: "flex-1 text-destructive border-destructive/30 hover:bg-destructive/5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3 mr-1" }),
                      "Delete"
                    ]
                  }
                )
              ] })
            ]
          },
          payment.id.toString()
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PaymentDialog,
          {
            open: dialogOpen,
            onClose: () => setDialogOpen(false),
            editing,
            customers
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialog,
          {
            open: !!deleteTarget,
            onOpenChange: (v) => !v && setDeleteTarget(null),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "payments.delete_dialog", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Payment?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                  "This will permanently remove the payment of",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: deleteTarget ? formatCurrency(deleteTarget.amount) : "" }),
                  " ",
                  "from",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: deleteTarget ? customerMap.get(deleteTarget.customerId.toString()) ?? "this customer" : "" }),
                  ". This action cannot be undone."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "payments.delete_cancel_button", children: "Cancel" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  AlertDialogAction,
                  {
                    onClick: handleDelete,
                    "data-ocid": "payments.delete_confirm_button",
                    className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                    children: [
                      deletePayment.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                      "Delete"
                    ]
                  }
                )
              ] })
            ] })
          }
        )
      ]
    }
  );
}
export {
  PaymentsPage as default
};
