import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/dashboard/Overview";
import Residents from "./pages/dashboard/Residents";
import ResidentProfile from "./pages/dashboard/ResidentProfile";
import Alerts from "./pages/dashboard/Alerts";
import Trends from "./pages/dashboard/Trends";
import Interventions from "./pages/dashboard/Interventions";
import Reports from "./pages/dashboard/Reports";
import Devices from "./pages/dashboard/Devices";
import Settings from "./pages/dashboard/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Overview />} />
            <Route path="residents" element={<Residents />} />
            <Route path="residents/:id" element={<ResidentProfile />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="trends" element={<Trends />} />
            <Route path="interventions" element={<Interventions />} />
            <Route path="reports" element={<Reports />} />
            <Route path="devices" element={<Devices />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
