import { Search, Bell, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  Popover, PopoverContent, PopoverTrigger,
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
    <header className="h-14 md:h-16 bg-card border-b border-border flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3 pl-12 md:pl-0">
        <h2 className="text-xs md:text-sm font-semibold text-foreground truncate">Sunrise Senior Living</h2>
        <span className="text-xs text-muted-foreground hidden sm:inline">·</span>
        <span className="text-xs text-muted-foreground hidden sm:inline">Berlin, DE</span>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search residents..."
            className="pl-9 w-48 lg:w-64 h-9 bg-muted/50 border-border text-sm"
          />
        </div>

        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-10 w-10">
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

        {/* Profile - hidden on very small screens */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10 hidden sm:flex">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-72 p-0">
            <div className="px-4 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Sunrise Senior Living</p>
                  <p className="text-xs text-muted-foreground">Berlin, DE</p>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 space-y-2.5 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Facility type</span><span className="text-foreground font-medium">Assisted Living</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Capacity</span><span className="text-foreground font-medium">120 beds</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Active residents</span><span className="text-foreground font-medium">94</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Devices online</span><span className="text-foreground font-medium">87</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Admin</span><span className="text-foreground font-medium">Dr. Anna Weber</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Contact</span><span className="text-foreground font-medium">info@sunrise-living.de</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Plan</span><span className="text-foreground font-medium">Enterprise</span></div>
            </div>
            <div className="px-4 py-2 border-t border-border">
              <button className="text-xs text-primary hover:underline w-full text-center" onClick={() => navigate("/dashboard/settings")}>
                Manage facility settings
              </button>
            </div>
          </PopoverContent>
        </Popover>

        <Button variant="ghost" size="icon" onClick={handleLogout} title="Sign out" className="h-10 w-10">
          <LogOut className="h-[18px] w-[18px] text-muted-foreground" />
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
