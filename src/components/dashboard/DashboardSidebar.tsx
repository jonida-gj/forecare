import { NavLink, useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard, Users, Bell, TrendingUp, ClipboardCheck,
  FileText, Cpu, Settings, ChevronLeft, ChevronRight, Menu, X,
} from "lucide-react";
import forecareLogo from "@/assets/forecare-logo.png";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  { label: "Overview", icon: LayoutDashboard, to: "/dashboard" },
  { label: "Residents", icon: Users, to: "/dashboard/residents" },
  { label: "Alerts", icon: Bell, to: "/dashboard/alerts" },
  { label: "Trends & Analytics", icon: TrendingUp, to: "/dashboard/trends" },
  { label: "Interventions", icon: ClipboardCheck, to: "/dashboard/interventions" },
  { label: "Reports", icon: FileText, to: "/dashboard/reports" },
  { label: "Devices", icon: Cpu, to: "/dashboard/devices" },
  { label: "Settings", icon: Settings, to: "/dashboard/settings" },
];

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // On mobile, render hamburger + overlay sidebar
  if (isMobile) {
    return (
      <>
        {/* Mobile hamburger button — rendered in header area */}
        <button
          onClick={() => setMobileOpen(true)}
          className="fixed top-4 left-4 z-50 h-11 w-11 rounded-lg bg-card border border-border shadow-card flex items-center justify-center lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5 text-foreground" />
        </button>

        {/* Overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Slide-in sidebar */}
        <aside
          className={cn(
            "fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col z-50 transition-transform duration-300 lg:hidden",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b border-border">
            <Link to="/" className="flex items-center gap-2">
              <img src={forecareLogo} alt="ForeCare" className="h-8 w-8 object-contain flex-shrink-0" style={{ mixBlendMode: "multiply" }} />
              <span className="text-lg font-bold text-foreground">ForeCare</span>
            </Link>
            <button onClick={() => setMobileOpen(false)} className="h-9 w-9 flex items-center justify-center rounded-md hover:bg-muted">
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
          <nav className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => {
                const isActive = item.to === "/dashboard"
                  ? location.pathname === "/dashboard"
                  : location.pathname.startsWith(item.to);
                return (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === "/dashboard"}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium transition-colors min-h-[44px]",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <item.icon className="h-[18px] w-[18px] flex-shrink-0" />
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
      </>
    );
  }

  // Desktop sidebar
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-card border-r border-border flex-col z-40 transition-all duration-200 hidden lg:flex",
        collapsed ? "w-16" : "w-60"
      )}
    >
      <Link to="/" className="flex items-center gap-2 px-4 py-5 border-b border-border hover:opacity-80 transition-opacity">
        <img src={forecareLogo} alt="ForeCare" className="h-8 w-8 object-contain flex-shrink-0" style={{ mixBlendMode: "multiply" }} />
        {!collapsed && <span className="text-lg font-bold text-foreground">ForeCare</span>}
      </Link>
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = item.to === "/dashboard"
              ? location.pathname === "/dashboard"
              : location.pathname.startsWith(item.to);
            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/dashboard"}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-[18px] w-[18px] flex-shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center py-3 border-t border-border text-muted-foreground hover:text-foreground transition-colors"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </aside>
  );
};

export default DashboardSidebar;
