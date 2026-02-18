import { Outlet } from "react-router-dom";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      <DashboardSidebar />
      {/* Main area offset by sidebar width */}
      <div className="ml-60 transition-all duration-200">
        <DashboardHeader />
        <main className="p-6">
          <Outlet />
        </main>
        {/* Security footer */}
        <div className="px-6 pb-4">
          <p className="text-xs text-muted-foreground text-center">
            🔒 Data encrypted and GDPR compliant · ForeCare © 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
