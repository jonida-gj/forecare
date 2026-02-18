import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff, Clock, Activity } from "lucide-react";

const systemStatus = [
  { label: "Device Connectivity", value: "96%", detail: "121 / 126 online", icon: Wifi },
  { label: "Data Freshness", value: "< 5 min", detail: "All feeds current", icon: Clock },
  { label: "Monitoring Uptime", value: "99.8%", detail: "Last 30 days", icon: Activity },
];

const devices = [
  { id: "D-001", resident: "Maria Schmidt", room: "A-12", type: "Wearable Ring", status: "Online", battery: "72%", lastSync: "2 min ago" },
  { id: "D-002", resident: "Hans Weber", room: "B-04", type: "Wearable Ring", status: "Online", battery: "85%", lastSync: "1 min ago" },
  { id: "D-003", resident: "Klaus Bauer", room: "C-02", type: "Room Sensor", status: "Offline", battery: "—", lastSync: "3 hours ago" },
  { id: "D-004", resident: "Ingrid Müller", room: "A-07", type: "Wearable Ring", status: "Online", battery: "45%", lastSync: "4 min ago" },
  { id: "D-005", resident: "Elisabeth Braun", room: "B-11", type: "Room Sensor", status: "Offline", battery: "—", lastSync: "1 hour ago" },
  { id: "D-006", resident: "Wolfgang Richter", room: "A-03", type: "Wearable Ring", status: "Online", battery: "91%", lastSync: "30 sec ago" },
];

const Devices = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold mb-1">Devices</h1>
      <p className="text-sm text-muted-foreground">Monitor sensor infrastructure and connectivity</p>
    </div>

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
              </tr>
            </thead>
            <tbody>
              {devices.map((d) => (
                <tr key={d.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4 font-mono text-xs text-muted-foreground">{d.id}</td>
                  <td className="py-3 px-4 font-medium text-foreground">{d.resident}</td>
                  <td className="py-3 px-4 text-muted-foreground">{d.type}</td>
                  <td className="py-3 px-4">
                    {d.status === "Online" ? (
                      <Badge className="bg-status-stable-bg text-status-stable border-0 text-xs">Online</Badge>
                    ) : (
                      <Badge className="bg-status-high-risk-bg text-status-high-risk border-0 text-xs">Offline</Badge>
                    )}
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{d.battery}</td>
                  <td className="py-3 px-4 text-muted-foreground">{d.lastSync}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default Devices;
