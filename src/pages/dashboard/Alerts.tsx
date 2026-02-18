import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Wifi, Activity, TrendingDown, Check, UserPlus, StickyNote, ArrowUpRight, Brain, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const alerts = [
  { id: 1, type: "Fall risk increase", resident: "Maria Schmidt", room: "A-12", time: "08:32", level: "critical", icon: AlertTriangle,
    aiExplanation: "Mobility dropped 62% below baseline over 7 days. Gait stability score at 3.1/10. Combined with elevated resting heart rate (+18 bpm), this creates a compound fall risk pattern.",
    aiAction: "Schedule physiotherapy assessment within 24 hours. Increase safety checks to every 30 minutes. Review fall prevention protocol.",
  },
  { id: 2, type: "Sudden change detected", resident: "Hans Weber", room: "B-04", time: "07:45", level: "critical", icon: Activity,
    aiExplanation: "Heart rate variability decreased 25% overnight with 4 nocturnal wake events. Pattern suggests autonomic stress response, possibly linked to medication timing.",
    aiAction: "Perform vitals check immediately. Review medication schedule with physician. Monitor sleep pattern tonight.",
  },
  { id: 3, type: "Reduced mobility", resident: "Ingrid Müller", room: "A-07", time: "07:10", level: "warning", icon: TrendingDown,
    aiExplanation: "Daily step count reduced by 40% over 3 days, correlating with reduced appetite and 1.2 kg weight loss. Early indicator of functional decline.",
    aiAction: "Nutritional assessment needed. Consider dietitian consultation. Monitor weight daily for next 7 days.",
  },
  { id: 4, type: "Device offline", resident: "Klaus Bauer", room: "C-02", time: "06:30", level: "info", icon: Wifi,
    aiExplanation: "Wearable sensor last synced 6 hours ago. Likely cause: low battery or out-of-range. No data gaps in critical monitoring windows.",
    aiAction: "Check device battery and Bluetooth connectivity. Replace device if issue persists beyond 2 hours.",
  },
  { id: 5, type: "Sleep disruption", resident: "Elisabeth Braun", room: "B-11", time: "06:15", level: "warning", icon: Activity,
    aiExplanation: "Sleep fragmentation detected — 5 wake episodes, total sleep 3.5 hours. Pattern emerging over 3 consecutive nights. Correlated with withdrawal from daytime activities.",
    aiAction: "Review sleep hygiene interventions. Assess for mood changes. Consider psychiatric consultation if pattern persists.",
  },
  { id: 6, type: "Missed monitoring signal", resident: "Wolfgang Richter", room: "A-03", time: "05:55", level: "info", icon: Wifi,
    aiExplanation: "15-minute data gap detected between 05:40–05:55. Resident is stable (risk score 45). Gap likely due to temporary sensor displacement during position change.",
    aiAction: "No immediate action required. Verify sensor placement at next scheduled check.",
  },
  { id: 7, type: "Behavioral change", resident: "Helga Fischer", room: "C-08", time: "05:20", level: "warning", icon: TrendingDown,
    aiExplanation: "Activity pattern diverges from 30-day baseline — reduced common area time by 60%, increased time in room. Social interaction score declined from 7.2 to 3.1.",
    aiAction: "Engage in conversational assessment. Consider social activity program adjustment. Monitor for signs of depression.",
  },
];

function levelStyle(level: string) {
  if (level === "critical") return { bg: "bg-status-high-risk-bg", text: "text-status-high-risk", label: "Critical" };
  if (level === "warning") return { bg: "bg-status-monitor-bg", text: "text-status-monitor", label: "Warning" };
  return { bg: "bg-muted", text: "text-muted-foreground", label: "Info" };
}

const Alerts = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold mb-1">Alerts Center</h1>
        <p className="text-xs sm:text-sm text-muted-foreground">12 active alerts · 3 unacknowledged</p>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => {
          const style = levelStyle(alert.level);
          const isExpanded = expandedId === alert.id;
          return (
            <Card key={alert.id} className="shadow-card border-border">
              <CardContent className="py-3 md:py-4 px-4 md:px-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`p-2 rounded-lg ${style.bg}`}>
                      <alert.icon className={`h-4 w-4 ${style.text}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{alert.type}</p>
                      <p className="text-sm text-muted-foreground">{alert.resident} · Room {alert.room}</p>
                      <p className="text-xs text-muted-foreground mt-1">Today at {alert.time}</p>

                      {/* AI Explanation */}
                      {isExpanded && (
                        <div className="mt-3 space-y-2">
                          <div className="rounded-lg bg-primary/[0.03] border border-primary/15 p-3">
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <Brain className="h-3.5 w-3.5 text-primary" />
                              <span className="text-[10px] font-semibold text-primary uppercase tracking-wide">AI Explanation</span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">{alert.aiExplanation}</p>
                          </div>
                          <div className="rounded-lg bg-secondary/50 border border-border p-3">
                            <p className="text-[10px] font-semibold text-foreground uppercase tracking-wide mb-1">Suggested Action</p>
                            <p className="text-xs text-muted-foreground leading-relaxed">{alert.aiAction}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={`${style.bg} ${style.text} border-0 text-xs`}>{style.label}</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs gap-1 text-muted-foreground"
                      onClick={() => setExpandedId(isExpanded ? null : alert.id)}
                    >
                      <Brain className="h-3 w-3" />
                      {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    </Button>
                    <div className="flex gap-1 sm:gap-1">
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
