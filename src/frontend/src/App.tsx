import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { Suspense, lazy } from "react";
import { ProtectedRoute } from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";

// Lazy-loaded pages
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const CustomersPage = lazy(() => import("./pages/CustomersPage"));
const DeliveriesPage = lazy(() => import("./pages/DeliveriesPage"));
const PaymentsPage = lazy(() => import("./pages/PaymentsPage"));

function PageLoader() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh]">
      <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
    </div>
  );
}

// Root route
const rootRoute = createRootRoute();

// Login route
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

// Dashboard
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<PageLoader />}>
        <DashboardPage />
      </Suspense>
    </ProtectedRoute>
  ),
});

// Customers
const customersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/customers",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<PageLoader />}>
        <CustomersPage />
      </Suspense>
    </ProtectedRoute>
  ),
});

// Deliveries
const deliveriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/deliveries",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<PageLoader />}>
        <DeliveriesPage />
      </Suspense>
    </ProtectedRoute>
  ),
});

// Payments
const paymentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payments",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<PageLoader />}>
        <PaymentsPage />
      </Suspense>
    </ProtectedRoute>
  ),
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  dashboardRoute,
  customersRoute,
  deliveriesRoute,
  paymentsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
