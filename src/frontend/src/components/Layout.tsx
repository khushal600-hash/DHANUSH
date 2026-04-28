import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Bell, LogOut, User } from "lucide-react";
import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export function Layout({ children, title, subtitle, actions }: LayoutProps) {
  const { clear, identity, isAuthenticated } = useInternetIdentity();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    clear();
    queryClient.clear();
  };

  const principalShort = identity
    ? `${identity.getPrincipal().toString().slice(0, 8)}...`
    : "";

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        {/* Top bar */}
        <header className="flex-shrink-0 bg-card border-b border-border shadow-xs z-10">
          <div className="flex items-center justify-between h-16 px-6 lg:px-8">
            {/* Page title — shifted right on mobile to accommodate hamburger */}
            <div className="pl-10 lg:pl-0">
              <h1 className="text-lg font-semibold font-display text-foreground leading-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="text-xs text-muted-foreground">{subtitle}</p>
              )}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {actions}
              <button
                type="button"
                aria-label="Notifications"
                className="p-2 rounded-lg hover:bg-muted transition-colors relative"
                data-ocid="topbar.notifications_button"
              >
                <Bell className="w-4 h-4 text-muted-foreground" />
              </button>

              {isAuthenticated && (
                <div className="flex items-center gap-2 pl-2 border-l border-border ml-1">
                  <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-muted/60">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-foreground hidden sm:block">
                      {principalShort}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    data-ocid="topbar.logout_button"
                    className="text-muted-foreground hover:text-destructive"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-background px-6 lg:px-8 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
