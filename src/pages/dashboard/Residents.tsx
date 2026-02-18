import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search, UserCheck, FileText, CheckCircle2,
  Clock, AlertTriangle, ChevronRight, Activity, BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { residents } from "@/data/residents";

type FilterKey = "all" | "high-risk" | "monitor" | "stable" | "needs-review";

const filters: { key: FilterKey; label: string; count: number }[] = [
  { key: "all", label: "All Residents", count: 10 },
  { key: "high-risk", label: "High Risk", count: 3 },
  { key: "monitor", label: "Monitor", count: 2 },
  { key: "stable", label: "Stable", count: 5 },
  { key: "needs-review", label: "Needs Review", count: 2 },
];

function statusBadge(status: string) {
  if (status === "High Risk")
    return <Badge className="bg-status-high-risk-bg text-status-high-risk border-0 text-sm font-semibold px-3 py-1">{status}</Badge>;
  if (status === "Monitor")
    return <Badge className="bg-status-monitor-bg text-status-monitor border-0 text-sm font-semibold px-3 py-1">{status}</Badge>;
  return <Badge className="bg-status-stable-bg text-status-stable border-0 text-sm font-semibold px-3 py-1">{status}</Badge>;
}

function riskColor(risk: number) {
  if (risk >= 80) return "text-status-high-risk font-bold";
  if (risk >= 60) return "text-status-monitor font-bold";
  return "text-status-stable font-semibold";
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
      (activeFilter === "needs-review" && r.lastCheck === "Not checked");

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Residents</h1>
          <p className="text-sm text-muted-foreground">124 residents monitored · All units</p>
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

      {/* Table */}
      <Card className="shadow-card border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="font-semibold text-foreground">Name</TableHead>
                <TableHead className="font-semibold text-foreground">Room / Unit</TableHead>
                <TableHead className="font-semibold text-foreground">Risk</TableHead>
                <TableHead className="font-semibold text-foreground">Status</TableHead>
                <TableHead className="font-semibold text-foreground">Last Check</TableHead>
                <TableHead className="font-semibold text-foreground">Next Check</TableHead>
                <TableHead className="font-semibold text-foreground">Assigned</TableHead>
                <TableHead className="font-semibold text-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => {
                const isOverdue = r.nextCheck === "Overdue";
                return (
                  <TableRow
                    key={r.id}
                    className={`h-14 ${r.status === "High Risk" ? "bg-status-high-risk-bg/30" : ""}`}
                  >
                    <TableCell className="py-3">
                      <Link
                        to={`/dashboard/residents/${r.id}`}
                        className="font-semibold text-foreground hover:text-primary transition-colors text-[15px]"
                      >
                        {r.name}
                      </Link>
                      {r.reason && (
                        <p className="text-xs text-muted-foreground mt-0.5">{r.reason}</p>
                      )}
                    </TableCell>
                    <TableCell className="text-sm">
                      <span className="font-medium">{r.room}</span>
                      <span className="text-muted-foreground ml-1.5">· {r.unit}</span>
                    </TableCell>
                    <TableCell>
                      <span className={`text-lg ${riskColor(r.risk)}`}>{r.risk}</span>
                    </TableCell>
                    <TableCell>{statusBadge(r.status)}</TableCell>
                    <TableCell>
                      <span className={`text-sm flex items-center gap-1.5 ${
                        r.lastCheck === "Not checked" ? "text-status-high-risk font-semibold" : "text-muted-foreground"
                      }`}>
                        <Clock className="h-3.5 w-3.5" />
                        {r.lastCheck}
                      </span>
                    </TableCell>
                    <TableCell>
                      {isOverdue ? (
                        <span className="text-sm text-status-high-risk font-semibold flex items-center gap-1.5">
                          <AlertTriangle className="h-3.5 w-3.5" />
                          Overdue
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">{r.nextCheck}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{r.assignedTo}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        <Button variant="ghost" size="sm" className="h-7 text-xs px-2" asChild>
                          <Link to={`/dashboard/residents/${r.id}`}>
                            <UserCheck className="h-3.5 w-3.5 mr-1" /> Profile
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs px-2" asChild>
                          <Link to={`/dashboard/trends?resident=${r.id}`}>
                            <BarChart3 className="h-3.5 w-3.5 mr-1" /> Trends
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs px-2" asChild>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Residents;
