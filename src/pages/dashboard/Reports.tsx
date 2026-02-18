import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  FileText, Download, Search, CalendarIcon, Plus, ChevronDown, ChevronUp,
  AlertTriangle, Shield, BarChart3, ClipboardList,
} from "lucide-react";

type ReportType = "all" | "risk" | "incident" | "compliance" | "analytics";
type Severity = "all" | "critical" | "warning" | "info";
type Automation = "all" | "automated" | "on-demand";

interface Report {
  name: string;
  date: string;
  type: ReportType;
  typeLabel: string;
  automation: Automation;
  severity: Severity;
  resident: string | null;
  summary: string;
  tags: string[];
}

const reports: Report[] = [
  {
    name: "Weekly Risk Summary", date: "Feb 17, 2026", type: "risk", typeLabel: "Risk Assessment",
    automation: "automated", severity: "critical", resident: null,
    summary: "3 residents flagged as high risk this week. Maria Schmidt shows continued decline in mobility metrics. Hans Weber's sleep disruption pattern persists. Ingrid Müller's weight loss trend requires nutritional intervention.",
    tags: ["Weekly", "Facility-wide"],
  },
  {
    name: "Monthly Incident Report", date: "Feb 1, 2026", type: "incident", typeLabel: "Incident",
    automation: "automated", severity: "warning", resident: null,
    summary: "12 incidents recorded in January. 4 near-falls detected by wearable sensors. 2 medication timing deviations flagged. Average response time: 4.2 minutes. All incidents resolved without adverse outcomes.",
    tags: ["Monthly", "Compliance"],
  },
  {
    name: "Maria Schmidt — Stability Analysis", date: "Jan 31, 2026", type: "analytics", typeLabel: "Analytics",
    automation: "on-demand", severity: "critical", resident: "Maria Schmidt",
    summary: "Risk score increased from 78 to 92 over 4 weeks. Key drivers: reduced daily step count (−62%), elevated resting heart rate (+18bpm above baseline), sleep duration averaging 3.8h (baseline: 7h).",
    tags: ["Individual", "Trend Analysis"],
  },
  {
    name: "Alert Response Times", date: "Jan 28, 2026", type: "compliance", typeLabel: "Compliance",
    automation: "automated", severity: "info", resident: null,
    summary: "Average response time: 3.8 minutes (target: <5min). Night shift response slightly elevated at 5.2 minutes. 98% of critical alerts acknowledged within 2 minutes.",
    tags: ["KPI", "Facility-wide"],
  },
  {
    name: "Intervention Effectiveness Q4", date: "Jan 15, 2026", type: "analytics", typeLabel: "Analytics",
    automation: "on-demand", severity: "info", resident: null,
    summary: "Fall prevention interventions reduced incidents by 34%. Sleep hygiene programs improved average sleep by 1.2h across enrolled residents. Nutritional interventions showed 78% compliance rate.",
    tags: ["Quarterly", "Outcomes"],
  },
  {
    name: "Hans Weber — Sleep Report", date: "Jan 12, 2026", type: "risk", typeLabel: "Risk Assessment",
    automation: "on-demand", severity: "warning", resident: "Hans Weber",
    summary: "Persistent sleep fragmentation with 4+ wake episodes per night. Total sleep time averaging 3.1h. Recommended psychiatric consultation for sleep evaluation.",
    tags: ["Individual", "Sleep"],
  },
];

const typeIcons: Record<ReportType, typeof FileText> = {
  all: FileText, risk: AlertTriangle, incident: Shield, compliance: ClipboardList, analytics: BarChart3,
};

function severityBadge(severity: Severity) {
  if (severity === "critical") return <Badge className="bg-status-high-risk-bg text-status-high-risk border-0 text-xs">Critical</Badge>;
  if (severity === "warning") return <Badge className="bg-status-monitor-bg text-status-monitor border-0 text-xs">Warning</Badge>;
  return <Badge className="bg-status-stable-bg text-status-stable border-0 text-xs">Info</Badge>;
}

const Reports = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<ReportType>("all");
  const [severityFilter, setSeverityFilter] = useState<Severity>("all");
  const [automationFilter, setAutomationFilter] = useState<Automation>("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();

  const filtered = reports.filter((r) => {
    if (search && !r.name.toLowerCase().includes(search.toLowerCase()) && !(r.resident?.toLowerCase().includes(search.toLowerCase()))) return false;
    if (typeFilter !== "all" && r.type !== typeFilter) return false;
    if (severityFilter !== "all" && r.severity !== severityFilter) return false;
    if (automationFilter !== "all" && r.automation !== automationFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Reports</h1>
          <p className="text-sm text-muted-foreground">Automated and on-demand facility reports</p>
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" /> Generate Report
        </Button>
      </div>

      {/* Filter panel */}
      <Card className="shadow-card border-border">
        <CardContent className="py-4 px-5">
          <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports or residents..."
                className="pl-9 h-9 bg-muted/50"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as ReportType)}>
              <SelectTrigger className="w-[160px] h-9">
                <SelectValue placeholder="Report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="risk">Risk Assessment</SelectItem>
                <SelectItem value="incident">Incident</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="analytics">Analytics</SelectItem>
              </SelectContent>
            </Select>

            <Select value={severityFilter} onValueChange={(v) => setSeverityFilter(v as Severity)}>
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All severity</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>

            <Select value={automationFilter} onValueChange={(v) => setAutomationFilter(v as Automation)}>
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="automated">Automated</SelectItem>
                <SelectItem value="on-demand">On-demand</SelectItem>
              </SelectContent>
            </Select>

            {/* Date range */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs font-normal">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  {dateFrom ? format(dateFrom, "MMM d") : "From"} — {dateTo ? format(dateTo, "MMM d") : "To"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <div className="flex">
                  <div className="border-r border-border">
                    <p className="text-xs text-muted-foreground px-3 pt-3 pb-1">From</p>
                    <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} className={cn("p-3 pointer-events-auto")} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground px-3 pt-3 pb-1">To</p>
                    <Calendar mode="single" selected={dateTo} onSelect={setDateTo} className={cn("p-3 pointer-events-auto")} />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Results count */}
      <p className="text-xs text-muted-foreground">{filtered.length} report{filtered.length !== 1 ? "s" : ""} found</p>

      {/* Report list */}
      <div className="space-y-3">
        {filtered.map((r, i) => {
          const Icon = typeIcons[r.type] || FileText;
          const isExpanded = expandedId === i;

          return (
            <Card key={i} className="shadow-card border-border transition-shadow hover:shadow-elevated">
              <CardContent className="py-4 px-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 rounded-lg bg-primary/10 mt-0.5">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-medium text-foreground">{r.name}</p>
                        {severityBadge(r.severity)}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {r.date} · {r.typeLabel} · {r.automation === "automated" ? "Automated" : "On-demand"}
                        {r.resident && <> · <span className="font-medium text-foreground">{r.resident}</span></>}
                      </p>

                      {/* Tags */}
                      <div className="flex gap-1.5 mt-2">
                        {r.tags.map((tag) => (
                          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Expandable summary */}
                      {isExpanded && (
                        <div className="mt-3 p-3 rounded-lg bg-muted/50 border border-border">
                          <p className="text-xs font-medium text-foreground mb-1">Summary</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">{r.summary}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-foreground h-8 text-xs"
                      onClick={() => setExpandedId(isExpanded ? null : i)}
                    >
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      Preview
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground h-8 text-xs">
                      <Download className="h-4 w-4 mr-1" /> Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Reports;
