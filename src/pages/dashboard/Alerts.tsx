import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Wifi, Activity, TrendingDown, Check, UserPlus, StickyNote, ArrowUpRight } from "lucide-react";

const alerts = [
  { id: 1, type: "Fall risk increase", resident: "Maria Schmidt", room: "A-12", time: "08:32", level: "critical", icon: AlertTriangle },
  { id: 2, type: "Sudden change detected", resident: "Hans Weber", room: "B-04", time: "07:45", level: "critical", icon: Activity },
  { id: 3, type: "Reduced mobility", resident: "Ingrid Müller", room: "A-07", time: "07:10", level: "warning", icon: TrendingDown },
  { id: 4, type: "Device offline", resident: "Klaus Bauer", room: "C-02", time: "06:30", level: "info", icon: Wifi },
  { id: 5, type: "Sleep disruption", resident: "Elisabeth Braun", room: "B-11", time: "06:15", level: "warning", icon: Activity },
  { id: 6, type: "Missed monitoring signal", resident: "Wolfgang Richter", room: "A-03", time: "05:55", level: "info", icon: Wifi },
  { id: 7, type: "Behavioral change", resident: "Helga Fischer", room: "C-08", time: "05:20", level: "warning", icon: TrendingDown },
];

function levelStyle(level: string) {
  if (level === "critical") return { bg: "bg-status-high-risk-bg", text: "text-status-high-risk", label: "Critical" };
  if (level === "warning") return { bg: "bg-status-monitor-bg", text: "text-status-monitor", label: "Warning" };
  return { bg: "bg-muted", text: "text-muted-foreground", label: "Info" };
}

const Alerts = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Alerts Center</h1>
        <p className="text-sm text-muted-foreground">12 active alerts · 3 unacknowledged</p>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => {
          const style = levelStyle(alert.level);
          return (
            <Card key={alert.id} className="shadow-card border-border">
              <CardContent className="py-4 px-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${style.bg}`}>
                      <alert.icon className={`h-4 w-4 ${style.text}`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{alert.type}</p>
                      <p className="text-sm text-muted-foreground">{alert.resident} · Room {alert.room}</p>
                      <p className="text-xs text-muted-foreground mt-1">Today at {alert.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge className={`${style.bg} ${style.text} border-0 text-xs`}>{style.label}</Badge>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="Acknowledge">
                        <Check className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="Assign staff">
                        <UserPlus className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="Add note">
                        <StickyNote className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="Escalate">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
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

export default Alerts;
