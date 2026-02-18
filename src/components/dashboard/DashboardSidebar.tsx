import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Bell,
  TrendingUp,
  ClipboardCheck,
  FileText,
  Cpu,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import forecareLogo from "@/assets/forecare-logo.png";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-card border-r border-border flex flex-col z-40 transition-all duration-200",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-5 border-b border-border">
        <img
          src={forecareLogo}
          alt="ForeCare"
          className="h-8 w-8 object-contain flex-shrink-0"
          style={{ mixBlendMode: "multiply" }}
        />
        {!collapsed && (
          <span className="text-lg font-bold text-foreground">ForeCare</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive =
              item.to === "/dashboard"
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

      {/* Collapse toggle */}
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
