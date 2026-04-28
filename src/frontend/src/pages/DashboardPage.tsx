import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  CreditCard,
  Plus,
  TrendingUp,
  Truck,
  Users,
  Wallet,
} from "lucide-react";
import { Layout } from "../components/Layout";
import { useDashboard } from "../hooks/useDashboard";
import { useDeliveries } from "../hooks/useDeliveries";
import { usePayments } from "../hooks/usePayments";
import {
  formatCurrency,
  formatDate,
  getStatusLabel,
  getStatusVariant,
} from "../types";
import type { CustomerView, DeliveryView, Payment } from "../types";

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  accent?: string;
  loading?: boolean;
}

function StatCard({
  title,
  value,
  icon: Icon,
  iconBg,
  iconColor,
  accent,
  loading,
}: StatCardProps) {
  return (
    <Card className="relative overflow-hidden border border-border shadow-sm hover:shadow-md transition-smooth">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-1">
              {title}
            </p>
            {loading ? (
              <Skeleton className="h-8 w-28 mt-1" />
            ) : (
              <p
                className={`text-2xl font-bold font-display leading-tight ${accent ?? "text-foreground"}`}
              >
                {value}
              </p>
            )}
          </div>
          <div className={`p-2.5 rounded-xl flex-shrink-0 ${iconBg}`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
      {/* Bottom accent bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-0.5 ${iconBg} opacity-60`}
      />
    </Card>
  );
}

// ─── Quick Action Button ──────────────────────────────────────────────────────

interface QuickActionProps {
  icon: React.ElementType;
  label: string;
  description: string;
  iconBg: string;
  iconColor: string;
  onClick: () => void;
  ocid: string;
}

function QuickActionCard({
  icon: Icon,
  label,
  description,
  iconBg,
  iconColor,
  onClick,
  ocid,
}: QuickActionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={ocid}
      className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-smooth text-left w-full group"
    >
      <div
        className={`p-2.5 rounded-lg flex-shrink-0 group-hover:scale-105 transition-smooth ${iconBg}`}
      >
        <Icon className={`w-4 h-4 ${iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground truncate">{description}</p>
      </div>
      <Plus className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary transition-smooth flex-shrink-0" />
    </button>
  );
}

// ─── Delivery Row ─────────────────────────────────────────────────────────────

function DeliveryRow({
  delivery,
  index,
}: { delivery: DeliveryView; index: number }) {
  return (
    <div
      className="flex items-center justify-between px-5 py-3 hover:bg-muted/30 transition-colors"
      data-ocid={`dashboard.delivery_item.${index + 1}`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Truck className="w-3.5 h-3.5 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground">
            #{String(Number(delivery.id)).padStart(4, "0")}
          </p>
          <p className="text-xs text-muted-foreground">
            {Number(delivery.quantity)} cans ·{" "}
            {formatDate(delivery.deliveryDate)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="text-sm font-semibold text-foreground">
          {formatCurrency(delivery.totalAmount)}
        </span>
        <Badge
          variant={
            getStatusVariant(delivery.status) as
              | "default"
              | "secondary"
              | "destructive"
              | "outline"
          }
          className="text-xs"
        >
          {getStatusLabel(delivery.status)}
        </Badge>
      </div>
    </div>
  );
}

// ─── Payment Row ──────────────────────────────────────────────────────────────

function PaymentRow({ payment, index }: { payment: Payment; index: number }) {
  return (
    <div
      className="flex items-center justify-between px-5 py-3 hover:bg-muted/30 transition-colors"
      data-ocid={`dashboard.payment_item.${index + 1}`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center flex-shrink-0">
          <CreditCard className="w-3.5 h-3.5 text-accent" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {payment.note ||
              `Payment #${String(Number(payment.id)).padStart(4, "0")}`}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatDate(payment.paymentDate)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-sm font-semibold text-foreground">
          {formatCurrency(payment.amount)}
        </span>
        <Badge variant="outline" className="text-xs">
          {"cash" in payment.method ? "Cash" : "Online"}
        </Badge>
      </div>
    </div>
  );
}

// ─── Balance Row ──────────────────────────────────────────────────────────────

function BalanceRow({
  customer,
  index,
}: { customer: CustomerView; index: number }) {
  return (
    <div
      className="flex items-center justify-between px-5 py-3 hover:bg-muted/30 transition-colors"
      data-ocid={`dashboard.balance_item.${index + 1}`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-accent">
            {customer.name.slice(0, 1).toUpperCase()}
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {customer.name}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {customer.phone} · {customer.address}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-sm font-bold text-accent">
          {formatCurrency(customer.balance)}
        </span>
        <Badge
          variant="outline"
          className="text-xs text-accent border-accent/30"
        >
          Owes
        </Badge>
      </div>
    </div>
  );
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────

export default function DashboardPage() {
  const navigate = useNavigate();
  const { data: stats, isLoading: statsLoading } = useDashboard();
  const { data: deliveries, isLoading: deliveriesLoading } = useDeliveries();
  const { data: payments, isLoading: paymentsLoading } = usePayments();

  const recentDeliveries = (deliveries ?? []).slice(0, 5);
  const recentPayments = (payments ?? []).slice(0, 5);
  const customersWithBalance = stats?.customersWithBalance ?? [];

  return (
    <Layout
      title="Dashboard"
      subtitle="Overview of your water can distribution business"
    >
      <div className="space-y-6">
        {/* ── Quick Actions ── */}
        <section data-ocid="dashboard.quick_actions_section">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Quick Actions
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <QuickActionCard
              icon={Users}
              label="Add Customer"
              description="Register a new customer"
              iconBg="bg-primary/10"
              iconColor="text-primary"
              onClick={() => navigate({ to: "/customers" })}
              ocid="dashboard.add_customer_button"
            />
            <QuickActionCard
              icon={Truck}
              label="Record Delivery"
              description="Log a new water can delivery"
              iconBg="bg-chart-4/15"
              iconColor="text-chart-4"
              onClick={() => navigate({ to: "/deliveries" })}
              ocid="dashboard.record_delivery_button"
            />
            <QuickActionCard
              icon={Wallet}
              label="Record Payment"
              description="Add an incoming payment"
              iconBg="bg-accent/15"
              iconColor="text-accent"
              onClick={() => navigate({ to: "/payments" })}
              ocid="dashboard.record_payment_button"
            />
          </div>
        </section>

        {/* ── Stat Cards ── */}
        <section data-ocid="dashboard.stats_section">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Business Overview
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard
              title="Total Customers"
              value={
                statsLoading ? "—" : String(Number(stats?.totalCustomers ?? 0))
              }
              icon={Users}
              iconBg="bg-primary/10"
              iconColor="text-primary"
              loading={statsLoading}
            />
            <StatCard
              title="Total Deliveries"
              value={
                statsLoading ? "—" : String(Number(stats?.totalDeliveries ?? 0))
              }
              icon={Truck}
              iconBg="bg-chart-4/15"
              iconColor="text-chart-4"
              loading={statsLoading}
            />
            <StatCard
              title="Total Revenue"
              value={
                statsLoading ? "—" : formatCurrency(stats?.totalRevenue ?? 0n)
              }
              icon={TrendingUp}
              iconBg="bg-chart-1/15"
              iconColor="text-chart-1"
              loading={statsLoading}
            />
            <StatCard
              title="Outstanding Balance"
              value={
                statsLoading
                  ? "—"
                  : formatCurrency(stats?.outstandingBalance ?? 0n)
              }
              icon={AlertTriangle}
              iconBg="bg-accent/15"
              iconColor="text-accent"
              accent={
                (stats?.outstandingBalance ?? 0n) > 0n
                  ? "text-accent"
                  : "text-foreground"
              }
              loading={statsLoading}
            />
          </div>
        </section>

        {/* ── Outstanding Balances ── */}
        <section data-ocid="dashboard.outstanding_section">
          <Card className="border border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-3 px-5 pt-4">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-accent/15 flex items-center justify-center">
                  <AlertTriangle className="w-3.5 h-3.5 text-accent" />
                </div>
                Customers with Outstanding Balance
                {customersWithBalance.length > 0 && (
                  <Badge className="ml-1 bg-accent/15 text-accent border-accent/20 hover:bg-accent/20">
                    {customersWithBalance.length}
                  </Badge>
                )}
              </CardTitle>
              <Link to="/customers">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs gap-1 h-7"
                  data-ocid="dashboard.view_all_customers_link"
                >
                  View all <ArrowRight className="w-3 h-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              {statsLoading ? (
                <div className="px-5 pb-4 space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-12 w-full rounded-lg" />
                  ))}
                </div>
              ) : customersWithBalance.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center py-10 px-5"
                  data-ocid="dashboard.outstanding_empty_state"
                >
                  <div className="w-12 h-12 rounded-full bg-muted/60 flex items-center justify-center mb-3">
                    <Users className="w-5 h-5 text-muted-foreground/50" />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    All balances cleared
                  </p>
                  <p className="text-xs text-muted-foreground text-center max-w-xs">
                    No customers currently have outstanding balances. Great job!
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {customersWithBalance.slice(0, 6).map((c, i) => (
                    <BalanceRow key={c.id.toString()} customer={c} index={i} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* ── Recent Activity ── */}
        <section data-ocid="dashboard.recent_section">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Recent Deliveries */}
            <Card className="border border-border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-3 px-5 pt-4">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Truck className="w-3.5 h-3.5 text-primary" />
                  </div>
                  Recent Deliveries
                </CardTitle>
                <Link to="/deliveries">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs gap-1 h-7"
                    data-ocid="dashboard.view_all_deliveries_link"
                  >
                    View all <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="p-0">
                {deliveriesLoading ? (
                  <div className="px-5 pb-4 space-y-3">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-12 w-full rounded-lg" />
                    ))}
                  </div>
                ) : recentDeliveries.length === 0 ? (
                  <div
                    className="flex flex-col items-center justify-center py-10 px-5"
                    data-ocid="dashboard.deliveries_empty_state"
                  >
                    <div className="w-12 h-12 rounded-full bg-muted/60 flex items-center justify-center mb-3">
                      <Truck className="w-5 h-5 text-muted-foreground/50" />
                    </div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      No deliveries yet
                    </p>
                    <p className="text-xs text-muted-foreground mb-3">
                      Start by recording your first delivery
                    </p>
                    <Link to="/deliveries">
                      <Button
                        variant="outline"
                        size="sm"
                        data-ocid="dashboard.add_delivery_link"
                      >
                        Add delivery
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {recentDeliveries.map((d, i) => (
                      <DeliveryRow
                        key={d.id.toString()}
                        delivery={d}
                        index={i}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Payments */}
            <Card className="border border-border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-3 px-5 pt-4">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-accent/15 flex items-center justify-center">
                    <CreditCard className="w-3.5 h-3.5 text-accent" />
                  </div>
                  Recent Payments
                </CardTitle>
                <Link to="/payments">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs gap-1 h-7"
                    data-ocid="dashboard.view_all_payments_link"
                  >
                    View all <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="p-0">
                {paymentsLoading ? (
                  <div className="px-5 pb-4 space-y-3">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-12 w-full rounded-lg" />
                    ))}
                  </div>
                ) : recentPayments.length === 0 ? (
                  <div
                    className="flex flex-col items-center justify-center py-10 px-5"
                    data-ocid="dashboard.payments_empty_state"
                  >
                    <div className="w-12 h-12 rounded-full bg-muted/60 flex items-center justify-center mb-3">
                      <CreditCard className="w-5 h-5 text-muted-foreground/50" />
                    </div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      No payments recorded
                    </p>
                    <p className="text-xs text-muted-foreground mb-3">
                      Record your first payment collection
                    </p>
                    <Link to="/payments">
                      <Button
                        variant="outline"
                        size="sm"
                        data-ocid="dashboard.add_payment_link"
                      >
                        Record payment
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {recentPayments.map((p, i) => (
                      <PaymentRow key={p.id.toString()} payment={p} index={i} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </Layout>
  );
}
