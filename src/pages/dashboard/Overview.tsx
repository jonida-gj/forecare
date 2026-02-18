import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users, AlertTriangle, Bell, Activity, Wifi,
  Clock, FileText, UserCheck, ArrowUpRight,
  CheckCircle2, Shield, Info
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const summaryCards = [
  { label: "Total Residents", value: "124", icon: Users, change: "+2 this week" },
  { label: "High Risk Today", value: "7", icon: AlertTriangle, change: "↑ 2 from yesterday", alert: true },
  { label: "Active Alerts", value: "12", icon: Bell, change: "3 unacknowledged" },
  { label: "Avg. Stability Score", value: "82%", icon: Activity, change: "Stable" },
  { label: "Monitoring Coverage", value: "96%", icon: Wifi, change: "3 devices offline" },
];

const shiftSummary = {
  flaggedOvernight: 3,
  newAlerts: 1,
  devicesConnected: "All connected",
  shiftStart: "07:00",
  handoverFrom: "Night Shift",
};

const priorityResidents = [
  {
    id: "1", name: "Maria Schmidt", risk: 92,
    reason: "Reduced mobility detected",
    status: "High Risk",
    action: "Check within 1 hour",
    lastChecked: "Not checked",
    note: "Complained of fatigue yesterday",
    riskExplain: "Based on mobility patterns and activity levels over 48h",
    alertTime: "45 min ago",
  },
  {
    id: "2", name: "Hans Weber", risk: 85,
    reason: "Sleep disruption pattern",
    status: "High Risk",
    action: "Review vitals",
    lastChecked: "2h ago",
    note: "Restless overnight, 3 wake events",
    riskExplain: "Based on sleep quality and nocturnal activity",
    alertTime: "2h ago",
  },
  {
    id: "3", name: "Ingrid Müller", risk: 78,
    reason: "Weight loss trend",
    status: "High Risk",
    action: "Nutritional assessment",
    lastChecked: "Today 09:15",
    note: "Appetite reduced last 3 days",
    riskExplain: "Based on weight trend and meal intake patterns",
    alertTime: "4h ago",
  },
  {
    id: "4", name: "Klaus Bauer", risk: 71,
    reason: "Increased fall risk",
    status: "Monitor",
    action: "Mobility check",
    lastChecked: "Today 08:30",
    note: null,
    riskExplain: "Based on gait stability and movement frequency",
    alertTime: "6h ago",
  },
  {
    id: "5", name: "Elisabeth Braun", risk: 68,
    reason: "Behavioral change",
    status: "Monitor",
    action: "Observation",
    lastChecked: "Yesterday",
    note: "Withdrawn from group activities",
    riskExplain: "Based on social interaction and daily routine changes",
    alertTime: "8h ago",
  },
];

function riskBadge(status: string) {
  if (status === "High Risk")
    return <Badge className="bg-status-high-risk-bg text-status-high-risk border-0 text-sm font-semibold px-3 py-1">{status}</Badge>;
  return <Badge className="bg-status-monitor-bg text-status-monitor border-0 text-sm font-semibold px-3 py-1">{status}</Badge>;
}

function alertTimeIndicator(time: string) {
  const isRecent = time.includes("min") || time === "2h ago";
  return (
    <span className={`inline-flex items-center gap-1.5 text-sm ${isRecent ? "text-status-high-risk" : "text-muted-foreground"}`}>
      <span className={`w-2 h-2 rounded-full ${isRecent ? "bg-status-monitor" : "bg-status-stable"}`} />
      {time}
    </span>
  );
}

function lastCheckedDisplay(value: string) {
  const isUrgent = value === "Not checked";
  return (
    <span className={`text-sm ${isUrgent ? "text-status-high-risk font-semibold" : "text-muted-foreground"}`}>
      {value}
    </span>
  );
}

const Overview = () => {
  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Facility Overview</h1>
            <p className="text-sm text-muted-foreground">Real-time health snapshot — Today, Feb 18 2026</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-status-stable" />
            <span>Monitoring active · All systems operational</span>
          </div>
        </div>

        {/* Shift Handover Summary */}
        <Card className="shadow-card border-border bg-secondary/30">
          <CardContent className="py-4 px-5">
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">Shift Handover</span>
                <span className="text-sm text-muted-foreground">from {shiftSummary.handoverFrom}</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-status-high-risk" />
                  <strong className="text-status-high-risk">{shiftSummary.flaggedOvernight}</strong> flagged overnight
                </span>
                <span className="flex items-center gap-1.5">
                  <Bell className="h-3.5 w-3.5 text-status-monitor" />
                  <strong className="text-status-monitor">{shiftSummary.newAlerts}</strong> new alert
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-status-stable" />
                  {shiftSummary.devicesConnected}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

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
              <Badge className="bg-status-high-risk-bg text-status-high-risk border-0 text-xs ml-2">
                {priorityResidents.length} residents
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {priorityResidents.map((r) => (
                <div
                  key={r.id}
                  className={`rounded-xl border p-4 transition-colors hover:bg-muted/50 ${
                    r.risk >= 80 ? "border-status-high-risk/20 bg-status-high-risk-bg/30" : "border-border"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Left: Resident info */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <Link
                          to={`/dashboard/residents/${r.id}`}
                          className="text-base font-semibold text-foreground hover:text-primary transition-colors"
                        >
                          {r.name}
                        </Link>
                        {riskBadge(r.status)}
                        <span className={`text-base font-bold ${r.risk >= 80 ? "text-status-high-risk" : "text-status-monitor"}`}>
                          {r.risk}
                        </span>
                        {alertTimeIndicator(r.alertTime)}
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-foreground font-medium">{r.reason}</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="text-muted-foreground hover:text-primary transition-colors">
                              <Info className="h-3.5 w-3.5" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs">
                            <p className="text-xs">{r.riskExplain}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>

                      {r.note && (
                        <p className="text-sm text-muted-foreground italic">
                          "{r.note}"
                        </p>
                      )}

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <ArrowUpRight className="h-3.5 w-3.5" />
                          {r.action}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          Last checked: {lastCheckedDisplay(r.lastChecked)}
                        </span>
                      </div>
                    </div>

                    {/* Right: Quick actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <Button variant="outline" size="sm" className="h-8 text-xs" asChild>
                        <Link to={`/dashboard/residents/${r.id}`}>
                          <UserCheck className="h-3.5 w-3.5 mr-1" />
                          View
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 text-xs">
                        <FileText className="h-3.5 w-3.5 mr-1" />
                        Note
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 text-xs">
                        <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                        Ack
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default Overview;
