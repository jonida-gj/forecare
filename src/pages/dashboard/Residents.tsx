import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search, UserCheck, FileText, CheckCircle2,
  Users, Info, Clock, ArrowUpRight
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type FilterKey = "all" | "high-risk" | "monitor" | "stable" | "needs-review";

const filters: { key: FilterKey; label: string; count: number }[] = [
  { key: "all", label: "All Residents", count: 10 },
  { key: "high-risk", label: "High Risk", count: 3 },
  { key: "monitor", label: "Monitor", count: 2 },
  { key: "stable", label: "Stable", count: 5 },
  { key: "needs-review", label: "Needs Review", count: 2 },
];

const residents = [
  {
    id: "1", name: "Maria Schmidt", age: 84, room: "A-12", risk: 92,
    status: "High Risk", trend: "Declining",
    action: "Check vitals", lastChecked: "Not checked",
    reason: "Reduced mobility detected", note: "Complained of fatigue",
    riskExplain: "Based on mobility patterns and activity levels over 48h",
  },
  {
    id: "2", name: "Hans Weber", age: 79, room: "B-04", risk: 85,
    status: "High Risk", trend: "Declining",
    action: "Review vitals", lastChecked: "2h ago",
    reason: "Sleep disruption pattern", note: "Restless overnight",
    riskExplain: "Based on sleep quality and nocturnal activity",
  },
  {
    id: "3", name: "Ingrid Müller", age: 88, room: "A-07", risk: 78,
    status: "High Risk", trend: "Declining",
    action: "Nutritional assessment", lastChecked: "Today 09:15",
    reason: "Weight loss trend", note: "Appetite reduced",
    riskExplain: "Based on weight trend and meal intake patterns",
  },
  {
    id: "4", name: "Klaus Bauer", age: 76, room: "C-02", risk: 71,
    status: "Monitor", trend: "Fluctuating",
    action: "Mobility check", lastChecked: "Today 08:30",
    reason: "Increased fall risk", note: null,
    riskExplain: "Based on gait stability and movement frequency",
  },
  {
    id: "5", name: "Elisabeth Braun", age: 82, room: "B-11", risk: 68,
    status: "Monitor", trend: "Fluctuating",
    action: "Observation", lastChecked: "Yesterday",
    reason: "Behavioral change", note: "Withdrawn from activities",
    riskExplain: "Based on social interaction and daily routine changes",
  },
  {
    id: "6", name: "Wolfgang Richter", age: 73, room: "A-03", risk: 45,
    status: "Stable", trend: "Stable",
    action: "Routine check", lastChecked: "Today 10:00",
    reason: null, note: null,
    riskExplain: "All indicators within normal range",
  },
  {
    id: "7", name: "Helga Fischer", age: 90, room: "C-08", risk: 38,
    status: "Stable", trend: "Improving",
    action: "Routine check", lastChecked: "Today 07:45",
    reason: null, note: "Good spirits today",
    riskExplain: "Improving mobility and consistent sleep",
  },
  {
    id: "8", name: "Peter Hoffmann", age: 81, room: "B-06", risk: 32,
    status: "Stable", trend: "Stable",
    action: "Routine check", lastChecked: "Today 08:00",
    reason: null, note: null,
    riskExplain: "All indicators within normal range",
  },
  {
    id: "9", name: "Ursula Koch", age: 77, room: "A-15", risk: 28,
    status: "Stable", trend: "Stable",
    action: "Routine check", lastChecked: "Today 09:30",
    reason: null, note: null,
    riskExplain: "All indicators within normal range",
  },
  {
    id: "10", name: "Friedrich Schäfer", age: 86, room: "C-12", risk: 22,
    status: "Stable", trend: "Stable",
    action: "Routine check", lastChecked: "Yesterday",
    reason: null, note: null,
    riskExplain: "All indicators within normal range",
  },
];

function statusBadge(status: string) {
  if (status === "High Risk")
    return <Badge className="bg-status-high-risk-bg text-status-high-risk border-0 text-sm font-semibold px-3 py-1">{status}</Badge>;
  if (status === "Monitor")
    return <Badge className="bg-status-monitor-bg text-status-monitor border-0 text-sm font-semibold px-3 py-1">{status}</Badge>;
  return <Badge className="bg-status-stable-bg text-status-stable border-0 text-sm font-semibold px-3 py-1">{status}</Badge>;
}

const Residents = () => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [search, setSearch] = useState("");

  const filtered = residents.filter((r) => {
    const matchesSearch =
      !search ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.room.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "high-risk" && r.status === "High Risk") ||
      (activeFilter === "monitor" && r.status === "Monitor") ||
      (activeFilter === "stable" && r.status === "Stable") ||
      (activeFilter === "needs-review" && r.lastChecked === "Not checked");

    return matchesSearch && matchesFilter;
  });

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Residents</h1>
            <p className="text-sm text-muted-foreground">124 residents monitored</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or room..."
              className="pl-9 w-72 h-9 bg-card"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Quick filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {filters.map((f) => (
            <Button
              key={f.key}
              variant={activeFilter === f.key ? "default" : "outline"}
              size="sm"
              className="h-8 text-xs"
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
              <span className="ml-1.5 opacity-70">{f.count}</span>
            </Button>
          ))}
        </div>

        {/* Resident cards */}
        <div className="space-y-3">
          {filtered.map((r) => (
            <Card
              key={r.id}
              className={`shadow-card border-border transition-colors hover:shadow-elevated ${
                r.status === "High Risk" ? "border-status-high-risk/20" : ""
              }`}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  {/* Left content */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <Link
                        to={`/dashboard/residents/${r.id}`}
                        className="text-base font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        {r.name}
                      </Link>
                      {statusBadge(r.status)}
                      <span className={`text-base font-bold ${
                        r.risk >= 80 ? "text-status-high-risk" : r.risk >= 60 ? "text-status-monitor" : "text-status-stable"
                      }`}>
                        {r.risk}
                      </span>
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
                      <span className="text-sm text-muted-foreground">
                        Age {r.age} · Room {r.room}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      {r.reason && (
                        <span className="text-foreground font-medium">{r.reason}</span>
                      )}
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                        {r.action}
                      </span>
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span className={r.lastChecked === "Not checked" ? "text-status-high-risk font-semibold" : ""}>
                          {r.lastChecked}
                        </span>
                      </span>
                    </div>

                    {r.note && (
                      <p className="text-sm text-muted-foreground italic">"{r.note}"</p>
                    )}
                  </div>

                  {/* Right: Quick actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Button variant="outline" size="sm" className="h-8 text-xs" asChild>
                      <Link to={`/dashboard/residents/${r.id}`}>
                        <UserCheck className="h-3.5 w-3.5 mr-1" />
                        Profile
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Residents;
