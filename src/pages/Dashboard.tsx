import { Outlet } from "react-router-dom";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AskForeCareChat from "@/components/dashboard/AskForeCareChat";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      <DashboardSidebar />
      {/* Main area — offset by sidebar on desktop only */}
      <div className="md:ml-60 transition-all duration-200">
        <DashboardHeader />
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
        <div className="px-4 md:px-6 pb-4">
          <p className="text-xs text-muted-foreground text-center">
            🔒 Data encrypted and GDPR compliant · ForeCare © 2026
          </p>
        </div>
      </div>
      <AskForeCareChat />
    </div>
  );
};

export default Dashboard;
