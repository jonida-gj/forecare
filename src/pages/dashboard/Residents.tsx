import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search, UserCheck, Clock, AlertTriangle, ChevronRight, Activity, BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { residents } from "@/data/residents";
import { useIsMobile } from "@/hooks/use-mobile";

type FilterKey = "all" | "high-risk" | "monitor" | "stable" | "needs-review";

const filters: { key: FilterKey; label: string; count: number }[] = [
  { key: "all", label: "All", count: 10 },
  { key: "high-risk", label: "High Risk", count: 3 },
  { key: "monitor", label: "Monitor", count: 2 },
  { key: "stable", label: "Stable", count: 5 },
  { key: "needs-review", label: "Review", count: 2 },
];

function statusBadge(status: string) {
  if (status === "High Risk")
    return <Badge className="bg-status-high-risk-bg text-status-high-risk border-0 text-xs font-semibold px-2 py-0.5">{status}</Badge>;
  if (status === "Monitor")
    return <Badge className="bg-status-monitor-bg text-status-monitor border-0 text-xs font-semibold px-2 py-0.5">{status}</Badge>;
  return <Badge className="bg-status-stable-bg text-status-stable border-0 text-xs font-semibold px-2 py-0.5">{status}</Badge>;
}

function riskColor(risk: number) {
  if (risk >= 80) return "text-status-high-risk font-bold";
  if (risk >= 60) return "text-status-monitor font-bold";
  return "text-status-stable font-semibold";
}

const Residents = () => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [search, setSearch] = useState("");
  const isMobile = useIsMobile();

  const filtered = residents.filter((r) => {
    const matchesSearch = !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.room.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "high-risk" && r.status === "High Risk") ||
      (activeFilter === "monitor" && r.status === "Monitor") ||
      (activeFilter === "stable" && r.status === "Stable") ||
      (activeFilter === "needs-review" && r.lastCheck === "Not checked");
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold mb-1">Residents</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">124 residents monitored · All units</p>
        </div>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or room..."
            className="pl-9 w-full sm:w-72 h-10 bg-card"
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
            className="h-9 text-xs"
            onClick={() => setActiveFilter(f.key)}
          >
            {f.label}
            <span className="ml-1 opacity-70">{f.count}</span>
          </Button>
        ))}
      </div>

      {/* Mobile: card-based view */}
      {isMobile ? (
        <div className="space-y-3">
          {filtered.map((r) => {
            const isOverdue = r.nextCheck === "Overdue";
            return (
              <Card key={r.id} className={`shadow-card border-border ${r.status === "High Risk" ? "border-status-high-risk/20" : ""}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <Link
                        to={`/dashboard/residents/${r.id}`}
                        className="font-semibold text-foreground hover:text-primary transition-colors text-sm"
                      >
                        {r.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">{r.room} · {r.unit}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-lg ${riskColor(r.risk)}`}>{r.risk}</span>
                      {statusBadge(r.status)}
                    </div>
                  </div>
                  {r.reason && <p className="text-xs text-muted-foreground mb-2">{r.reason}</p>}
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span className={`flex items-center gap-1 ${r.lastCheck === "Not checked" ? "text-status-high-risk font-semibold" : ""}`}>
                      <Clock className="h-3 w-3" /> {r.lastCheck}
                    </span>
                    {isOverdue ? (
                      <span className="text-status-high-risk font-semibold flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" /> Overdue
                      </span>
                    ) : (
                      <span>Next: {r.nextCheck}</span>
                    )}
                  </div>
                  <Link
                    to={`/dashboard/residents/${r.id}`}
                    className="flex items-center justify-center gap-1 w-full h-11 rounded-md border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    View Profile <ChevronRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        /* Desktop: table view */
        <Card className="shadow-card border-border">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40">
                    <TableHead className="font-semibold text-foreground">Name</TableHead>
                    <TableHead className="font-semibold text-foreground">Room / Unit</TableHead>
                    <TableHead className="font-semibold text-foreground">Risk</TableHead>
                    <TableHead className="font-semibold text-foreground">Status</TableHead>
                    <TableHead className="font-semibold text-foreground">Last Check</TableHead>
                    <TableHead className="font-semibold text-foreground">Next Check</TableHead>
                    <TableHead className="font-semibold text-foreground hidden lg:table-cell">Assigned</TableHead>
                    <TableHead className="font-semibold text-foreground text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((r) => {
                    const isOverdue = r.nextCheck === "Overdue";
                    return (
                      <TableRow key={r.id} className={`h-14 ${r.status === "High Risk" ? "bg-status-high-risk-bg/30" : ""}`}>
                        <TableCell className="py-3">
                          <Link to={`/dashboard/residents/${r.id}`} className="font-semibold text-foreground hover:text-primary transition-colors text-[15px]">
                            {r.name}
                          </Link>
                          {r.reason && <p className="text-xs text-muted-foreground mt-0.5">{r.reason}</p>}
                        </TableCell>
                        <TableCell className="text-sm">
                          <span className="font-medium">{r.room}</span>
                          <span className="text-muted-foreground ml-1.5">· {r.unit}</span>
                        </TableCell>
                        <TableCell><span className={`text-lg ${riskColor(r.risk)}`}>{r.risk}</span></TableCell>
                        <TableCell>{statusBadge(r.status)}</TableCell>
                        <TableCell>
                          <span className={`text-sm flex items-center gap-1.5 ${r.lastCheck === "Not checked" ? "text-status-high-risk font-semibold" : "text-muted-foreground"}`}>
                            <Clock className="h-3.5 w-3.5" /> {r.lastCheck}
                          </span>
                        </TableCell>
                        <TableCell>
                          {isOverdue ? (
                            <span className="text-sm text-status-high-risk font-semibold flex items-center gap-1.5">
                              <AlertTriangle className="h-3.5 w-3.5" /> Overdue
                            </span>
                          ) : (
                            <span className="text-sm text-muted-foreground">{r.nextCheck}</span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground hidden lg:table-cell">{r.assignedTo}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center gap-1 justify-end">
                            <Button variant="ghost" size="sm" className="h-8 text-xs px-2" asChild>
                              <Link to={`/dashboard/residents/${r.id}`}>
                                <UserCheck className="h-3.5 w-3.5 mr-1" /> Profile
                              </Link>
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 text-xs px-2 hidden xl:flex" asChild>
                              <Link to={`/dashboard/trends?resident=${r.id}`}>
                                <BarChart3 className="h-3.5 w-3.5 mr-1" /> Trends
                              </Link>
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 text-xs px-2 hidden xl:flex" asChild>
                              <Link to={`/dashboard/interventions?resident=${r.id}`}>
                                <Activity className="h-3.5 w-3.5 mr-1" /> Interventions
                              </Link>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Residents;
