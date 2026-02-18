import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Wifi, WifiOff, Clock, Activity, Search, Battery, BatteryLow, BatteryWarning,
  BatteryFull, BatteryMedium, AlertTriangle, RefreshCw, Eye, Wrench,
} from "lucide-react";

type StatusFilter = "all" | "online" | "offline" | "syncing";
type TypeFilter = "all" | "ring" | "room" | "gateway";
type BatteryFilter = "all" | "low" | "medium" | "high";

interface Device {
  id: string;
  resident: string;
  room: string;
  type: "Wearable Ring" | "Room Sensor" | "Gateway";
  status: "Online" | "Offline" | "Syncing";
  battery: number | null;
  lastSync: string;
  issue?: string;
}

const devices: Device[] = [
  { id: "D-001", resident: "Maria Schmidt", room: "A-12", type: "Wearable Ring", status: "Online", battery: 72, lastSync: "2 min ago" },
  { id: "D-002", resident: "Hans Weber", room: "B-04", type: "Wearable Ring", status: "Online", battery: 85, lastSync: "1 min ago" },
  { id: "D-003", resident: "Klaus Bauer", room: "C-02", type: "Room Sensor", status: "Offline", battery: null, lastSync: "3 hours ago", issue: "Connection lost" },
  { id: "D-004", resident: "Ingrid Müller", room: "A-07", type: "Wearable Ring", status: "Online", battery: 15, lastSync: "4 min ago", issue: "Low battery" },
  { id: "D-005", resident: "Elisabeth Braun", room: "B-11", type: "Room Sensor", status: "Offline", battery: null, lastSync: "1 hour ago", issue: "Firmware update required" },
  { id: "D-006", resident: "Wolfgang Richter", room: "A-03", type: "Wearable Ring", status: "Online", battery: 91, lastSync: "30 sec ago" },
  { id: "D-007", resident: "Helga Fischer", room: "C-08", type: "Wearable Ring", status: "Syncing", battery: 34, lastSync: "Syncing...", issue: "Sync delayed" },
  { id: "D-008", resident: "Peter Hoffmann", room: "B-06", type: "Gateway", status: "Online", battery: null, lastSync: "Live" },
  { id: "D-009", resident: "Ursula Koch", room: "A-15", type: "Wearable Ring", status: "Online", battery: 8, lastSync: "6 min ago", issue: "Critical battery" },
  { id: "D-010", resident: "Friedrich Schäfer", room: "C-12", type: "Wearable Ring", status: "Online", battery: 62, lastSync: "3 min ago" },
];

const offlineCount = devices.filter((d) => d.status === "Offline").length;
const lowBatteryCount = devices.filter((d) => d.battery !== null && d.battery < 20).length;
const syncIssueCount = devices.filter((d) => d.status === "Syncing").length;

const systemStatus = [
  { label: "Device Connectivity", value: `${Math.round((devices.filter(d => d.status === "Online").length / devices.length) * 100)}%`, detail: `${devices.filter(d => d.status === "Online").length} / ${devices.length} online`, icon: Wifi },
  { label: "Data Freshness", value: "< 5 min", detail: "Most feeds current", icon: Clock },
  { label: "Monitoring Uptime", value: "99.8%", detail: "Last 30 days", icon: Activity },
];

function BatteryIndicator({ level }: { level: number | null }) {
  if (level === null) return <span className="text-xs text-muted-foreground">N/A</span>;

  let Icon = BatteryFull;
  let color = "text-status-stable";
  if (level < 15) { Icon = BatteryWarning; color = "text-status-high-risk"; }
  else if (level < 30) { Icon = BatteryLow; color = "text-status-monitor"; }
  else if (level < 60) { Icon = BatteryMedium; color = "text-muted-foreground"; }

  return (
    <div className="flex items-center gap-1.5">
      <Icon className={`h-4 w-4 ${color}`} />
      <div className="flex items-center gap-1.5">
        <div className="w-14 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              level < 15 ? "bg-status-high-risk" : level < 30 ? "bg-status-monitor" : "bg-status-stable"
            }`}
            style={{ width: `${level}%` }}
          />
        </div>
        <span className={`text-xs font-medium ${color}`}>{level}%</span>
      </div>
    </div>
  );
}

const Devices = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [batteryFilter, setBatteryFilter] = useState<BatteryFilter>("all");

  const filtered = devices.filter((d) => {
    if (search && !d.resident.toLowerCase().includes(search.toLowerCase()) && !d.id.toLowerCase().includes(search.toLowerCase()) && !d.room.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== "all") {
      if (statusFilter === "online" && d.status !== "Online") return false;
      if (statusFilter === "offline" && d.status !== "Offline") return false;
      if (statusFilter === "syncing" && d.status !== "Syncing") return false;
    }
    if (typeFilter !== "all") {
      if (typeFilter === "ring" && d.type !== "Wearable Ring") return false;
      if (typeFilter === "room" && d.type !== "Room Sensor") return false;
      if (typeFilter === "gateway" && d.type !== "Gateway") return false;
    }
    if (batteryFilter !== "all" && d.battery !== null) {
      if (batteryFilter === "low" && d.battery >= 30) return false;
      if (batteryFilter === "medium" && (d.battery < 30 || d.battery >= 70)) return false;
      if (batteryFilter === "high" && d.battery < 70) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Devices</h1>
        <p className="text-sm text-muted-foreground">Monitor sensor infrastructure and connectivity</p>
      </div>

      {/* Attention Required */}
      {(offlineCount > 0 || lowBatteryCount > 0 || syncIssueCount > 0) && (
        <Card className="shadow-card border-status-monitor/30 bg-status-monitor-bg/30">
          <CardContent className="py-4 px-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-status-monitor" />
              <p className="text-sm font-semibold text-foreground">Attention Required</p>
            </div>
            <div className="flex gap-6 flex-wrap">
              {offlineCount > 0 && (
                <button
                  onClick={() => setStatusFilter("offline")}
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <WifiOff className="h-3.5 w-3.5 text-status-high-risk" />
                  <span><span className="font-semibold text-foreground">{offlineCount}</span> device{offlineCount > 1 ? "s" : ""} offline</span>
                </button>
              )}
              {lowBatteryCount > 0 && (
                <button
                  onClick={() => setBatteryFilter("low")}
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <BatteryWarning className="h-3.5 w-3.5 text-status-high-risk" />
                  <span><span className="font-semibold text-foreground">{lowBatteryCount}</span> low battery alert{lowBatteryCount > 1 ? "s" : ""}</span>
                </button>
              )}
              {syncIssueCount > 0 && (
                <button
                  onClick={() => setStatusFilter("syncing")}
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <RefreshCw className="h-3.5 w-3.5 text-status-monitor" />
                  <span><span className="font-semibold text-foreground">{syncIssueCount}</span> sync issue{syncIssueCount > 1 ? "s" : ""}</span>
                </button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* System Status */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {systemStatus.map((s) => (
          <Card key={s.label} className="shadow-card border-border">
            <CardContent className="py-5 px-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <s.icon className="h-4 w-4 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="shadow-card border-border">
        <CardContent className="py-4 px-5">
          <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by device, resident, or room..."
                className="pl-9 h-9 bg-muted/50"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as StatusFilter)}>
              <SelectTrigger className="w-[130px] h-9"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All status</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="syncing">Syncing</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as TypeFilter)}>
              <SelectTrigger className="w-[150px] h-9"><SelectValue placeholder="Device type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="ring">Wearable Ring</SelectItem>
                <SelectItem value="room">Room Sensor</SelectItem>
                <SelectItem value="gateway">Gateway</SelectItem>
              </SelectContent>
            </Select>

            <Select value={batteryFilter} onValueChange={(v) => setBatteryFilter(v as BatteryFilter)}>
              <SelectTrigger className="w-[140px] h-9"><SelectValue placeholder="Battery" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All levels</SelectItem>
                <SelectItem value="low">Low (&lt;30%)</SelectItem>
                <SelectItem value="medium">Medium (30-70%)</SelectItem>
                <SelectItem value="high">High (&gt;70%)</SelectItem>
              </SelectContent>
            </Select>

            {(statusFilter !== "all" || typeFilter !== "all" || batteryFilter !== "all" || search) && (
              <Button
                variant="ghost"
                size="sm"
                className="h-9 text-xs"
                onClick={() => { setStatusFilter("all"); setTypeFilter("all"); setBatteryFilter("all"); setSearch(""); }}
              >
                Clear filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results count */}
      <p className="text-xs text-muted-foreground">{filtered.length} device{filtered.length !== 1 ? "s" : ""}</p>

      {/* Device Table */}
      <Card className="shadow-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">All Devices</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Device ID</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Resident</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Battery</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Last Sync</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d) => (
                  <tr
                    key={d.id}
                    className={`border-b border-border last:border-0 hover:bg-muted/50 transition-colors ${
                      d.status === "Offline" ? "bg-status-high-risk-bg/20" : ""
                    }`}
                  >
                    <td className="py-3 px-4 font-mono text-xs text-muted-foreground">{d.id}</td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-foreground">{d.resident}</span>
                      <span className="text-xs text-muted-foreground ml-1.5">· {d.room}</span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{d.type}</td>
                    <td className="py-3 px-4">
                      {d.status === "Online" && (
                        <Badge className="bg-status-stable-bg text-status-stable border-0 text-xs">
                          <Wifi className="h-3 w-3 mr-1" /> Online
                        </Badge>
                      )}
                      {d.status === "Offline" && (
                        <Badge className="bg-status-high-risk-bg text-status-high-risk border-0 text-xs">
                          <WifiOff className="h-3 w-3 mr-1" /> Offline
                        </Badge>
                      )}
                      {d.status === "Syncing" && (
                        <Badge className="bg-status-monitor-bg text-status-monitor border-0 text-xs">
                          <RefreshCw className="h-3 w-3 mr-1 animate-spin" /> Syncing
                        </Badge>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <BatteryIndicator level={d.battery} />
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <span className="text-xs text-muted-foreground">{d.lastSync}</span>
                        {d.issue && (
                          <p className="text-[10px] text-status-high-risk mt-0.5">{d.issue}</p>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-7 text-xs px-2">
                          <Eye className="h-3.5 w-3.5 mr-1" /> Details
                        </Button>
                        {(d.status === "Offline" || d.issue) && (
                          <Button variant="ghost" size="sm" className="h-7 text-xs px-2 text-status-monitor">
                            <Wrench className="h-3.5 w-3.5 mr-1" /> Fix
                          </Button>
                        )}
                      </div>
                    </td>
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

export default Devices;
