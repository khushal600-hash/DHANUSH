import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, b as ue, T as Truck } from "./index-Kf6cq2Mp.js";
import { u as useCustomers, a as useAddCustomer, b as useUpdateCustomer, c as useDeleteCustomer, D as Dialog, d as DialogContent, e as DialogHeader, f as DialogTitle, A as AlertDialog, g as AlertDialogContent, h as AlertDialogHeader, i as AlertDialogTitle, j as AlertDialogDescription, k as AlertDialogFooter, l as AlertDialogCancel, m as AlertDialogAction, S as Search, I as Input, P as Pencil, T as Trash2, L as Label, n as DialogFooter, C as ChevronUp, o as ChevronDown, p as ArrowUpDown } from "./useCustomers-CXb1NHKR.js";
import { B as Badge, W as Wallet } from "./badge-BttCQMMj.js";
import { L as Layout, P as Plus, S as Skeleton, U as Users, f as formatCurrency, b as formatDate, C as CreditCard, u as useActor, a as useQuery, c as createActor } from "./types-CD4imbHJ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode);
function balanceColor(balance) {
  const n = Number(balance);
  if (n > 0) return "text-red-500 font-semibold";
  if (n < 0) return "text-emerald-600 font-semibold";
  return "text-muted-foreground";
}
function balanceBadgeClass(balance) {
  const n = Number(balance);
  if (n > 0) return "border-red-300 bg-red-50 text-red-600";
  if (n < 0) return "border-emerald-300 bg-emerald-50 text-emerald-700";
  return "border-border text-muted-foreground";
}
function deliveryStatusLabel(status) {
  if (status === "delivered") return "Delivered";
  if (status === "cancelled") return "Cancelled";
  return "Pending";
}
function deliveryStatusClass(status) {
  if (status === "delivered")
    return "border-emerald-300 bg-emerald-50 text-emerald-700";
  if (status === "cancelled") return "border-red-300 bg-red-50 text-red-600";
  return "border-amber-300 bg-amber-50 text-amber-700";
}
function paymentMethodLabel(method) {
  return method === "cash" ? "Cash" : "Online";
}
function useCustomerHistory(customerId) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["customerHistory", customerId == null ? void 0 : customerId.toString()],
    queryFn: async () => {
      if (!actor || customerId === void 0)
        return { deliveries: [], payments: [] };
      return actor.getCustomerHistory(customerId);
    },
    enabled: !!actor && !actorFetching && customerId !== void 0
  });
}
function CustomerForm({
  initial,
  onSubmit,
  loading,
  onCancel
}) {
  const [form, setForm] = reactExports.useState(
    initial ?? { name: "", phone: "", address: "" }
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "c-name", children: "Full Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "c-name",
          value: form.name,
          onChange: (e) => setForm((p) => ({ ...p, name: e.target.value })),
          placeholder: "e.g. Rajesh Kumar",
          required: true,
          "data-ocid": "customer_form.name_input",
          className: "mt-1"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "c-phone", children: "Phone Number" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "c-phone",
          value: form.phone,
          onChange: (e) => setForm((p) => ({ ...p, phone: e.target.value })),
          placeholder: "e.g. 98765 43210",
          required: true,
          "data-ocid": "customer_form.phone_input",
          className: "mt-1"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "c-address", children: "Address" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "c-address",
          value: form.address,
          onChange: (e) => setForm((p) => ({ ...p, address: e.target.value })),
          placeholder: "e.g. 12 Main St, Chennai",
          required: true,
          "data-ocid": "customer_form.address_input",
          className: "mt-1"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: onCancel,
          "data-ocid": "customer_form.cancel_button",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          disabled: loading,
          "data-ocid": "customer_form.submit_button",
          children: loading ? "Saving..." : "Save Customer"
        }
      )
    ] })
  ] });
}
function CustomerDetail({
  customer,
  onBack,
  onEdit,
  onDelete
}) {
  const { data, isLoading } = useCustomerHistory(customer.id);
  const deliveries = (data == null ? void 0 : data.deliveries) ?? [];
  const payments = (data == null ? void 0 : data.payments) ?? [];
  const totalDelivered = deliveries.filter((d) => d.status === "delivered").reduce((sum, d) => sum + Number(d.totalAmount), 0);
  const totalPaid = payments.reduce((sum, p) => sum + Number(p.amount), 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: onBack,
          className: "flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
          "data-ocid": "customer_detail.back_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Back to Customers"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => onEdit(customer),
            "data-ocid": "customer_detail.edit_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5 mr-1" }),
              " Edit"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => onDelete(customer.id),
            className: "text-destructive border-destructive/30 hover:bg-destructive/5",
            "data-ocid": "customer_detail.delete_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5 mr-1" }),
              " Delete"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-5",
        "data-ocid": "customer_detail.card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold font-display text-foreground", children: customer.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: customer.phone })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: customer.address })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right sm:text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide mb-1", children: "Balance Due" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `text-2xl font-bold ${balanceColor(customer.balance)}`,
                  children: Number(customer.balance) === 0 ? "Nil" : formatCurrency(customer.balance)
                }
              ),
              Number(customer.balance) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-500 mt-0.5", children: "Owes money" }),
              Number(customer.balance) < 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-emerald-600 mt-0.5", children: "Credit balance" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Deliveries" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-foreground", children: deliveries.length })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center border-x border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Total Billed" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-foreground", children: formatCurrency(BigInt(totalDelivered)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Total Paid" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-emerald-600", children: formatCurrency(BigInt(totalPaid)) })
            ] })
          ] })
        ]
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-xl" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "customer_detail.deliveries_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground", children: "Delivery History" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: deliveries.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: deliveries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center py-10 text-center px-4",
            "data-ocid": "customer_detail.deliveries_empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-8 h-8 text-muted-foreground/30 mb-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No deliveries yet" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: deliveries.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "px-4 py-3 flex items-center justify-between gap-3",
            "data-ocid": `customer_detail.delivery.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-foreground", children: [
                    Number(d.quantity),
                    " can",
                    Number(d.quantity) !== 1 ? "s" : ""
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: `text-xs ${deliveryStatusClass(d.status)}`,
                      children: deliveryStatusLabel(
                        d.status
                      )
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                  formatDate(d.deliveryDate),
                  " ·",
                  " ",
                  formatCurrency(d.pricePerCan),
                  "/can"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground text-right flex-shrink-0", children: formatCurrency(d.totalAmount) })
            ]
          },
          d.id.toString()
        )) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "customer_detail.payments_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground", children: "Payment History" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: payments.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: payments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center py-10 text-center px-4",
            "data-ocid": "customer_detail.payments_empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-8 h-8 text-muted-foreground/30 mb-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No payments recorded" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: payments.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "px-4 py-3 flex items-center justify-between gap-3",
            "data-ocid": `customer_detail.payment.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "text-xs border-primary/30 bg-primary/5 text-primary",
                      children: paymentMethodLabel(
                        p.method
                      )
                    }
                  ),
                  p.note && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground truncate max-w-[120px]", children: p.note })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: formatDate(p.paymentDate) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-emerald-600 text-right flex-shrink-0", children: [
                "+",
                formatCurrency(p.amount)
              ] })
            ]
          },
          p.id.toString()
        )) }) })
      ] })
    ] })
  ] });
}
function SortButton({
  field,
  current,
  dir,
  onClick,
  children
}) {
  const active = field === current;
  const Icon = active ? dir === "asc" ? ChevronUp : ChevronDown : ArrowUpDown;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: () => onClick(field),
      className: `flex items-center gap-1 text-xs font-semibold uppercase tracking-wide transition-colors ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`,
      "data-ocid": `customers.sort_${field}`,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3 h-3" })
      ]
    }
  );
}
function CustomersPage() {
  const { data: customers, isLoading } = useCustomers();
  const addMutation = useAddCustomer();
  const updateMutation = useUpdateCustomer();
  const deleteMutation = useDeleteCustomer();
  const [search, setSearch] = reactExports.useState("");
  const [sortField, setSortField] = reactExports.useState("name");
  const [sortDir, setSortDir] = reactExports.useState("asc");
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const [editingCustomer, setEditingCustomer] = reactExports.useState(
    null
  );
  const [deletingId, setDeletingId] = reactExports.useState(null);
  const [selectedCustomer, setSelectedCustomer] = reactExports.useState(
    null
  );
  const handleSort = (field) => {
    if (field === sortField) {
      setSortDir((d) => d === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };
  const filtered = (customers ?? []).filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search) || c.address.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    let cmp = 0;
    if (sortField === "name") cmp = a.name.localeCompare(b.name);
    else if (sortField === "balance")
      cmp = Number(a.balance) - Number(b.balance);
    else if (sortField === "id") cmp = Number(a.id) - Number(b.id);
    return sortDir === "asc" ? cmp : -cmp;
  });
  const handleAdd = async (data) => {
    try {
      await addMutation.mutateAsync(data);
      ue.success("Customer added successfully");
      setShowAdd(false);
    } catch {
      ue.error("Failed to add customer");
    }
  };
  const handleUpdate = async (data) => {
    if (!editingCustomer) return;
    try {
      await updateMutation.mutateAsync({ id: editingCustomer.id, input: data });
      ue.success("Customer updated");
      setEditingCustomer(null);
      if (selectedCustomer && selectedCustomer.id === editingCustomer.id) {
        setSelectedCustomer({ ...editingCustomer, ...data });
      }
    } catch {
      ue.error("Failed to update customer");
    }
  };
  const handleDelete = async () => {
    if (deletingId === null) return;
    try {
      await deleteMutation.mutateAsync(deletingId);
      ue.success("Customer deleted");
      setDeletingId(null);
      if (selectedCustomer && selectedCustomer.id === deletingId) {
        setSelectedCustomer(null);
      }
    } catch {
      ue.error("Failed to delete customer");
    }
  };
  if (selectedCustomer) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Layout,
      {
        title: selectedCustomer.name,
        subtitle: "Customer Details",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            onClick: () => setShowAdd(true),
            "data-ocid": "customers.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
              " Add Customer"
            ]
          }
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CustomerDetail,
            {
              customer: selectedCustomer,
              onBack: () => setSelectedCustomer(null),
              onEdit: (c) => setEditingCustomer(c),
              onDelete: (id) => setDeletingId(id)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Dialog,
            {
              open: !!editingCustomer,
              onOpenChange: () => setEditingCustomer(null),
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "customers.edit_dialog", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit Customer" }) }),
                editingCustomer && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CustomerForm,
                  {
                    initial: {
                      name: editingCustomer.name,
                      phone: editingCustomer.phone,
                      address: editingCustomer.address
                    },
                    onSubmit: handleUpdate,
                    loading: updateMutation.isPending,
                    onCancel: () => setEditingCustomer(null)
                  }
                )
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AlertDialog,
            {
              open: deletingId !== null,
              onOpenChange: () => setDeletingId(null),
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "customers.delete_dialog", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Customer" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This will permanently delete the customer and all their records. This action cannot be undone." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "customers.delete_cancel_button", children: "Cancel" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    AlertDialogAction,
                    {
                      onClick: handleDelete,
                      className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                      "data-ocid": "customers.delete_confirm_button",
                      children: deleteMutation.isPending ? "Deleting..." : "Delete"
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Layout,
    {
      title: "Customers",
      subtitle: `${filtered.length} customer${filtered.length !== 1 ? "s" : ""}`,
      actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          onClick: () => setShowAdd(true),
          "data-ocid": "customers.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
            " Add Customer"
          ]
        }
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: search,
              onChange: (e) => setSearch(e.target.value),
              placeholder: "Search by name, phone, or address...",
              className: "pl-9",
              "data-ocid": "customers.search_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded-lg" }, i)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-16 px-4 text-center",
            "data-ocid": "customers.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-10 h-10 text-muted-foreground/30 mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-medium text-foreground mb-1", children: search ? "No matching customers" : "No customers yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: search ? "Try a different search term" : "Add your first customer to get started" }),
              !search && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  onClick: () => setShowAdd(true),
                  "data-ocid": "customers.empty_add_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
                    " Add Customer"
                  ]
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/40", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                SortButton,
                {
                  field: "id",
                  current: sortField,
                  dir: sortDir,
                  onClick: handleSort,
                  children: "ID"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                SortButton,
                {
                  field: "name",
                  current: sortField,
                  dir: sortDir,
                  onClick: handleSort,
                  children: "Name"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Phone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                SortButton,
                {
                  field: "balance",
                  current: sortField,
                  dir: sortDir,
                  onClick: handleSort,
                  children: "Balance"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: filtered.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "hover:bg-muted/30 transition-colors cursor-pointer group",
                onClick: () => setSelectedCustomer(c),
                onKeyDown: (e) => e.key === "Enter" && setSelectedCustomer(c),
                tabIndex: 0,
                "data-ocid": `customers.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-4 text-xs font-mono text-muted-foreground", children: [
                    "C",
                    String(Number(c.id)).padStart(5, "0")
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm text-foreground group-hover:text-primary transition-colors", children: c.name }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4 text-sm text-muted-foreground", children: c.phone }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4 text-sm text-muted-foreground max-w-[200px] truncate", children: c.address }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4 text-right", children: Number(c.balance) !== 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: `font-semibold ${balanceBadgeClass(c.balance)}`,
                      children: formatCurrency(c.balance)
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Nil" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "ghost",
                        size: "sm",
                        onClick: (e) => {
                          e.stopPropagation();
                          setEditingCustomer(c);
                        },
                        "data-ocid": `customers.edit_button.${i + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "ghost",
                        size: "sm",
                        onClick: (e) => {
                          e.stopPropagation();
                          setDeletingId(c.id);
                        },
                        className: "text-destructive hover:text-destructive",
                        "data-ocid": `customers.delete_button.${i + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                      }
                    )
                  ] }) })
                ]
              },
              c.id.toString()
            )) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden divide-y divide-border", children: filtered.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "w-full text-left p-4 hover:bg-muted/30 transition-colors",
              onClick: () => setSelectedCustomer(c),
              "data-ocid": `customers.item.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground", children: c.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-1 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: c.phone })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5 text-xs text-muted-foreground truncate", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: c.address })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
                  Number(c.balance) !== 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-sm ${balanceColor(c.balance)}`, children: formatCurrency(c.balance) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-1 mt-2",
                      onClick: (e) => e.stopPropagation(),
                      onKeyDown: (e) => e.stopPropagation(),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            type: "button",
                            variant: "outline",
                            size: "sm",
                            onClick: (e) => {
                              e.stopPropagation();
                              setEditingCustomer(c);
                            },
                            "data-ocid": `customers.edit_button.${i + 1}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3 h-3" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            type: "button",
                            variant: "outline",
                            size: "sm",
                            onClick: (e) => {
                              e.stopPropagation();
                              setDeletingId(c.id);
                            },
                            className: "text-destructive border-destructive/30",
                            "data-ocid": `customers.delete_button.${i + 1}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
                          }
                        )
                      ]
                    }
                  )
                ] })
              ] })
            },
            c.id.toString()
          )) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showAdd, onOpenChange: setShowAdd, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "customers.add_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add New Customer" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CustomerForm,
            {
              onSubmit: handleAdd,
              loading: addMutation.isPending,
              onCancel: () => setShowAdd(false)
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Dialog,
          {
            open: !!editingCustomer,
            onOpenChange: () => setEditingCustomer(null),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "customers.edit_dialog", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit Customer" }) }),
              editingCustomer && /* @__PURE__ */ jsxRuntimeExports.jsx(
                CustomerForm,
                {
                  initial: {
                    name: editingCustomer.name,
                    phone: editingCustomer.phone,
                    address: editingCustomer.address
                  },
                  onSubmit: handleUpdate,
                  loading: updateMutation.isPending,
                  onCancel: () => setEditingCustomer(null)
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialog,
          {
            open: deletingId !== null,
            onOpenChange: () => setDeletingId(null),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "customers.delete_dialog", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Customer" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This will permanently delete the customer and all their records. This action cannot be undone." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "customers.delete_cancel_button", children: "Cancel" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogAction,
                  {
                    onClick: handleDelete,
                    className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                    "data-ocid": "customers.delete_confirm_button",
                    children: deleteMutation.isPending ? "Deleting..." : "Delete"
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
  CustomersPage as default
};
