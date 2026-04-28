import { c as createLucideIcon, j as jsxRuntimeExports, a as cn, u as useNavigate, T as Truck, L as Link, B as Button } from "./index-Kf6cq2Mp.js";
import { W as Wallet, B as Badge } from "./badge-BttCQMMj.js";
import { u as useActor, a as useQuery, c as createActor, L as Layout, U as Users, f as formatCurrency, S as Skeleton, C as CreditCard, P as Plus, b as formatDate, g as getStatusLabel, d as getStatusVariant } from "./types-CD4imbHJ.js";
import { u as useDeliveries } from "./useDeliveries-CJULxTiu.js";
import { u as usePayments } from "./usePayments-DpfJ_-Ip.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode$1);
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
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
function useDashboard() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getDashboard();
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 3e4
  });
}
function StatCard({
  title,
  value,
  icon: Icon,
  iconBg,
  iconColor,
  accent,
  loading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "relative overflow-hidden border border-border shadow-sm hover:shadow-md transition-smooth", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-1", children: title }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-28 mt-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: `text-2xl font-bold font-display leading-tight ${accent ?? "text-foreground"}`,
            children: value
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-2.5 rounded-xl flex-shrink-0 ${iconBg}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-5 h-5 ${iconColor}` }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `absolute bottom-0 left-0 right-0 h-0.5 ${iconBg} opacity-60`
      }
    )
  ] });
}
function QuickActionCard({
  icon: Icon,
  label,
  description,
  iconBg,
  iconColor,
  onClick,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      "data-ocid": ocid,
      className: "flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-smooth text-left w-full group",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `p-2.5 rounded-lg flex-shrink-0 group-hover:scale-105 transition-smooth ${iconBg}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-4 h-4 ${iconColor}` })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 text-muted-foreground/50 group-hover:text-primary transition-smooth flex-shrink-0" })
      ]
    }
  );
}
function DeliveryRow({
  delivery,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center justify-between px-5 py-3 hover:bg-muted/30 transition-colors",
      "data-ocid": `dashboard.delivery_item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-3.5 h-3.5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground", children: [
              "#",
              String(Number(delivery.id)).padStart(4, "0")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              Number(delivery.quantity),
              " cans ·",
              " ",
              formatDate(delivery.deliveryDate)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: formatCurrency(delivery.totalAmount) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: getStatusVariant(delivery.status),
              className: "text-xs",
              children: getStatusLabel(delivery.status)
            }
          )
        ] })
      ]
    }
  );
}
function PaymentRow({ payment, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center justify-between px-5 py-3 hover:bg-muted/30 transition-colors",
      "data-ocid": `dashboard.payment_item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-3.5 h-3.5 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: payment.note || `Payment #${String(Number(payment.id)).padStart(4, "0")}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatDate(payment.paymentDate) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: formatCurrency(payment.amount) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: "cash" in payment.method ? "Cash" : "Online" })
        ] })
      ]
    }
  );
}
function BalanceRow({
  customer,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center justify-between px-5 py-3 hover:bg-muted/30 transition-colors",
      "data-ocid": `dashboard.balance_item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-accent", children: customer.name.slice(0, 1).toUpperCase() }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: customer.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
              customer.phone,
              " · ",
              customer.address
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-accent", children: formatCurrency(customer.balance) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "text-xs text-accent border-accent/30",
              children: "Owes"
            }
          )
        ] })
      ]
    }
  );
}
function DashboardPage() {
  const navigate = useNavigate();
  const { data: stats, isLoading: statsLoading } = useDashboard();
  const { data: deliveries, isLoading: deliveriesLoading } = useDeliveries();
  const { data: payments, isLoading: paymentsLoading } = usePayments();
  const recentDeliveries = (deliveries ?? []).slice(0, 5);
  const recentPayments = (payments ?? []).slice(0, 5);
  const customersWithBalance = (stats == null ? void 0 : stats.customersWithBalance) ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Layout,
    {
      title: "Dashboard",
      subtitle: "Overview of your water can distribution business",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "dashboard.quick_actions_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3", children: "Quick Actions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              QuickActionCard,
              {
                icon: Users,
                label: "Add Customer",
                description: "Register a new customer",
                iconBg: "bg-primary/10",
                iconColor: "text-primary",
                onClick: () => navigate({ to: "/customers" }),
                ocid: "dashboard.add_customer_button"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              QuickActionCard,
              {
                icon: Truck,
                label: "Record Delivery",
                description: "Log a new water can delivery",
                iconBg: "bg-chart-4/15",
                iconColor: "text-chart-4",
                onClick: () => navigate({ to: "/deliveries" }),
                ocid: "dashboard.record_delivery_button"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              QuickActionCard,
              {
                icon: Wallet,
                label: "Record Payment",
                description: "Add an incoming payment",
                iconBg: "bg-accent/15",
                iconColor: "text-accent",
                onClick: () => navigate({ to: "/payments" }),
                ocid: "dashboard.record_payment_button"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "dashboard.stats_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3", children: "Business Overview" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                title: "Total Customers",
                value: statsLoading ? "—" : String(Number((stats == null ? void 0 : stats.totalCustomers) ?? 0)),
                icon: Users,
                iconBg: "bg-primary/10",
                iconColor: "text-primary",
                loading: statsLoading
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                title: "Total Deliveries",
                value: statsLoading ? "—" : String(Number((stats == null ? void 0 : stats.totalDeliveries) ?? 0)),
                icon: Truck,
                iconBg: "bg-chart-4/15",
                iconColor: "text-chart-4",
                loading: statsLoading
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                title: "Total Revenue",
                value: statsLoading ? "—" : formatCurrency((stats == null ? void 0 : stats.totalRevenue) ?? 0n),
                icon: TrendingUp,
                iconBg: "bg-chart-1/15",
                iconColor: "text-chart-1",
                loading: statsLoading
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                title: "Outstanding Balance",
                value: statsLoading ? "—" : formatCurrency((stats == null ? void 0 : stats.outstandingBalance) ?? 0n),
                icon: TriangleAlert,
                iconBg: "bg-accent/15",
                iconColor: "text-accent",
                accent: ((stats == null ? void 0 : stats.outstandingBalance) ?? 0n) > 0n ? "text-accent" : "text-foreground",
                loading: statsLoading
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "dashboard.outstanding_section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border border-border shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-3 px-5 pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-lg bg-accent/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5 text-accent" }) }),
              "Customers with Outstanding Balance",
              customersWithBalance.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "ml-1 bg-accent/15 text-accent border-accent/20 hover:bg-accent/20", children: customersWithBalance.length })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/customers", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "text-xs gap-1 h-7",
                "data-ocid": "dashboard.view_all_customers_link",
                children: [
                  "View all ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: statsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-4 space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-lg" }, i)) }) : customersWithBalance.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-10 px-5",
              "data-ocid": "dashboard.outstanding_empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-muted/60 flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-muted-foreground/50" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-1", children: "All balances cleared" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center max-w-xs", children: "No customers currently have outstanding balances. Great job!" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: customersWithBalance.slice(0, 6).map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(BalanceRow, { customer: c, index: i }, c.id.toString())) }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "dashboard.recent_section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border border-border shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-3 px-5 pt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-3.5 h-3.5 text-primary" }) }),
                "Recent Deliveries"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/deliveries", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "text-xs gap-1 h-7",
                  "data-ocid": "dashboard.view_all_deliveries_link",
                  children: [
                    "View all ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
                  ]
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: deliveriesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-4 space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-lg" }, i)) }) : recentDeliveries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col items-center justify-center py-10 px-5",
                "data-ocid": "dashboard.deliveries_empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-muted/60 flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-5 h-5 text-muted-foreground/50" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-1", children: "No deliveries yet" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3", children: "Start by recording your first delivery" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/deliveries", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      "data-ocid": "dashboard.add_delivery_link",
                      children: "Add delivery"
                    }
                  ) })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: recentDeliveries.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              DeliveryRow,
              {
                delivery: d,
                index: i
              },
              d.id.toString()
            )) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border border-border shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-3 px-5 pt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-lg bg-accent/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-3.5 h-3.5 text-accent" }) }),
                "Recent Payments"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/payments", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "text-xs gap-1 h-7",
                  "data-ocid": "dashboard.view_all_payments_link",
                  children: [
                    "View all ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
                  ]
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: paymentsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-4 space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-lg" }, i)) }) : recentPayments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col items-center justify-center py-10 px-5",
                "data-ocid": "dashboard.payments_empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-muted/60 flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-5 h-5 text-muted-foreground/50" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-1", children: "No payments recorded" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3", children: "Record your first payment collection" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/payments", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      "data-ocid": "dashboard.add_payment_link",
                      children: "Record payment"
                    }
                  ) })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: recentPayments.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentRow, { payment: p, index: i }, p.id.toString())) }) })
          ] })
        ] }) })
      ] })
    }
  );
}
export {
  DashboardPage as default
};
