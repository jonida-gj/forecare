import { Search, Bell, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const notifications = [
  { id: 1, title: "High risk alert", message: "Maria Schmidt — SpO₂ dropped below 90%", time: "2 min ago", urgent: true },
  { id: 2, title: "Device disconnected", message: "Hans Weber — ring offline for 30 min", time: "18 min ago", urgent: false },
  { id: 3, title: "Fall risk elevated", message: "Ingrid Müller — gait instability detected", time: "1 hr ago", urgent: true },
];

const DashboardHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <h2 className="text-sm font-semibold text-foreground">Sunrise Senior Living</h2>
        <span className="text-xs text-muted-foreground">·</span>
        <span className="text-xs text-muted-foreground">Berlin, DE</span>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search residents..."
            className="pl-9 w-64 h-9 bg-muted/50 border-border text-sm"
          />
        </div>

        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-[18px] w-[18px] text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-status-high-risk" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
            </div>
            <div className="max-h-72 overflow-y-auto">
              {notifications.map((n) => (
                <div key={n.id} className="px-4 py-3 border-b border-border last:border-0 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-start gap-2">
                    {n.urgent && <span className="mt-1 h-2 w-2 rounded-full bg-status-high-risk shrink-0" />}
                    <div>
                      <p className="text-sm font-medium text-foreground">{n.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                      <p className="text-xs text-muted-foreground/60 mt-1">{n.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-2 border-t border-border">
              <button className="text-xs text-primary hover:underline w-full text-center">View all notifications</button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Profile */}
        <Button variant="ghost" size="icon">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-4 w-4 text-primary" />
          </div>
        </Button>

        {/* Logout */}
        <Button variant="ghost" size="icon" onClick={handleLogout} title="Sign out">
          <LogOut className="h-[18px] w-[18px] text-muted-foreground" />
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
