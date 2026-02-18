import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, AlertTriangle, Bell, Activity, Wifi } from "lucide-react";
import { Link } from "react-router-dom";

const summaryCards = [
  { label: "Total Residents", value: "124", icon: Users, change: "+2 this week" },
  { label: "High Risk Today", value: "7", icon: AlertTriangle, change: "↑ 2 from yesterday", alert: true },
  { label: "Active Alerts", value: "12", icon: Bell, change: "3 unacknowledged" },
  { label: "Avg. Stability Score", value: "82%", icon: Activity, change: "Stable" },
  { label: "Monitoring Coverage", value: "96%", icon: Wifi, change: "3 devices offline" },
];

const priorityResidents = [
  { id: "1", name: "Maria Schmidt", risk: 92, reason: "Reduced mobility", status: "High Risk", action: "Check within 1 hour" },
  { id: "2", name: "Hans Weber", risk: 85, reason: "Sleep disruption", status: "High Risk", action: "Review vitals" },
  { id: "3", name: "Ingrid Müller", risk: 78, reason: "Weight loss trend", status: "High Risk", action: "Nutritional assessment" },
  { id: "4", name: "Klaus Bauer", risk: 71, reason: "Increased fall risk", status: "Monitor", action: "Mobility check" },
  { id: "5", name: "Elisabeth Braun", risk: 68, reason: "Behavioral change", status: "Monitor", action: "Observation" },
];

function riskBadge(status: string) {
  if (status === "High Risk")
    return <Badge className="bg-status-high-risk-bg text-status-high-risk border-0 text-xs">{status}</Badge>;
  return <Badge className="bg-status-monitor-bg text-status-monitor border-0 text-xs">{status}</Badge>;
}

const Overview = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Facility Overview</h1>
        <p className="text-sm text-muted-foreground">Real-time health snapshot — Today, Feb 18 2026</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {summaryCards.map((card) => (
          <Card key={card.label} className="shadow-card border-border">
            <CardContent className="pt-5 pb-4 px-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${card.alert ? "bg-status-high-risk-bg" : "bg-primary/10"}`}>
                  <card.icon className={`h-4 w-4 ${card.alert ? "text-status-high-risk" : "text-primary"}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{card.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{card.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{card.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Priority Panel */}
      <Card className="shadow-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-status-high-risk" />
            Needs Attention Now
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">Resident</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">Risk Score</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">Reason</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">Recommended Action</th>
                </tr>
              </thead>
              <tbody>
                {priorityResidents.map((r) => (
                  <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-3">
                      <Link to={`/dashboard/residents/${r.id}`} className="font-medium text-foreground hover:text-primary transition-colors">
                        {r.name}
                      </Link>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`font-semibold ${r.risk >= 80 ? "text-status-high-risk" : "text-status-monitor"}`}>{r.risk}</span>
                    </td>
                    <td className="py-3 px-3 text-muted-foreground">{r.reason}</td>
                    <td className="py-3 px-3">{riskBadge(r.status)}</td>
                    <td className="py-3 px-3 text-muted-foreground">{r.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
