import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { BarChart3, Droplets, Loader2, Shield, Truck } from "lucide-react";
import { useEffect } from "react";

const FEATURES = [
  {
    icon: Truck,
    title: "Delivery Management",
    desc: "Track every water can delivery in real time",
  },
  {
    icon: BarChart3,
    title: "Payment Records",
    desc: "Maintain complete payment history and balances",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    desc: "Your data secured on the Internet Computer",
  },
];

export default function LoginPage() {
  const { login, isAuthenticated, isInitializing, isLoggingIn } =
    useInternetIdentity();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-foreground/20">
            <Droplets className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold font-display text-primary-foreground">
            HydroFlow
          </span>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold font-display text-primary-foreground leading-tight">
              Manage your water
              <br />
              distribution business
              <br />
              with ease.
            </h2>
            <p className="mt-4 text-primary-foreground/70 text-lg leading-relaxed">
              End-to-end tracking for deliveries, customers, and payments — all
              in one place.
            </p>
          </div>

          <div className="space-y-4">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-foreground/15 flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary-foreground">
                      {f.title}
                    </p>
                    <p className="text-sm text-primary-foreground/60">
                      {f.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-primary-foreground/40 text-xs">
          © {new Date().getFullYear()} HydroFlow. Built with caffeine.ai
        </p>
      </div>

      {/* Right panel — login */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 lg:px-16 bg-background">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-3 mb-10">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary">
            <Droplets className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold font-display text-foreground">
            HydroFlow
          </span>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-display text-foreground">
              Welcome back
            </h1>
            <p className="mt-2 text-muted-foreground text-sm">
              Sign in with Internet Identity to continue to your dashboard.
            </p>
          </div>

          <div className="space-y-4">
            <Button
              type="button"
              className="w-full h-12 text-base font-semibold"
              onClick={login}
              disabled={isInitializing || isLoggingIn}
              data-ocid="login.submit_button"
            >
              {isInitializing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Initializing...
                </>
              ) : isLoggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Opening login...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Sign in with Internet Identity
                </>
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground leading-relaxed">
              Uses Internet Identity for secure, passwordless authentication.
              <br />
              No email or password required.
            </p>
          </div>

          <div className="mt-12 p-4 rounded-xl bg-muted/50 border border-border">
            <p className="text-xs font-semibold text-foreground mb-1">
              First time here?
            </p>
            <p className="text-xs text-muted-foreground">
              The first user to log in automatically becomes the admin.
              You&apos;ll have full access to manage customers, deliveries, and
              payments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
