import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search, UserCheck, FileText, CheckCircle2,
  Clock, AlertTriangle, ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

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
    id: "1", name: "Maria Schmidt", age: 84, room: "A-12", unit: "Unit A",
    risk: 92, status: "High Risk" as const, trend: "Declining",
    lastCheck: "Not checked", nextCheck: "Overdue", assignedTo: "Nurse Becker",
    reason: "Reduced mobility detected",
  },
  {
    id: "2", name: "Hans Weber", age: 79, room: "B-04", unit: "Unit B",
    risk: 85, status: "High Risk" as const, trend: "Declining",
    lastCheck: "2h ago", nextCheck: "14:30", assignedTo: "Nurse Vogel",
    reason: "Sleep disruption pattern",
  },
  {
    id: "3", name: "Ingrid Müller", age: 88, room: "A-07", unit: "Unit A",
    risk: 78, status: "High Risk" as const, trend: "Declining",
    lastCheck: "Today 09:15", nextCheck: "15:15", assignedTo: "Nurse Becker",
    reason: "Weight loss trend",
  },
  {
    id: "4", name: "Klaus Bauer", age: 76, room: "C-02", unit: "Unit C",
    risk: 71, status: "Monitor" as const, trend: "Fluctuating",
    lastCheck: "Today 08:30", nextCheck: "14:30", assignedTo: "Nurse Klein",
    reason: "Increased fall risk",
  },
  {
    id: "5", name: "Elisabeth Braun", age: 82, room: "B-11", unit: "Unit B",
    risk: 68, status: "Monitor" as const, trend: "Fluctuating",
    lastCheck: "Yesterday", nextCheck: "10:00", assignedTo: "Nurse Vogel",
    reason: "Behavioral change",
  },
  {
    id: "6", name: "Wolfgang Richter", age: 73, room: "A-03", unit: "Unit A",
    risk: 45, status: "Stable" as const, trend: "Stable",
    lastCheck: "Today 10:00", nextCheck: "16:00", assignedTo: "Nurse Becker",
    reason: null,
  },
  {
    id: "7", name: "Helga Fischer", age: 90, room: "C-08", unit: "Unit C",
    risk: 38, status: "Stable" as const, trend: "Improving",
    lastCheck: "Today 07:45", nextCheck: "13:45", assignedTo: "Nurse Klein",
    reason: null,
  },
  {
    id: "8", name: "Peter Hoffmann", age: 81, room: "B-06", unit: "Unit B",
    risk: 32, status: "Stable" as const, trend: "Stable",
    lastCheck: "Today 08:00", nextCheck: "14:00", assignedTo: "Nurse Vogel",
    reason: null,
  },
  {
    id: "9", name: "Ursula Koch", age: 77, room: "A-15", unit: "Unit A",
    risk: 28, status: "Stable" as const, trend: "Stable",
    lastCheck: "Today 09:30", nextCheck: "15:30", assignedTo: "Nurse Becker",
    reason: null,
  },
  {
    id: "10", name: "Friedrich Schäfer", age: 86, room: "C-12", unit: "Unit C",
    risk: 22, status: "Stable" as const, trend: "Stable",
    lastCheck: "Yesterday", nextCheck: "10:00", assignedTo: "Nurse Klein",
    reason: null,
  },
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
                        <Button variant="ghost" size="sm" className="h-7 text-xs px-2">
                          <FileText className="h-3.5 w-3.5 mr-1" /> Note
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs px-2">
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Ack
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
