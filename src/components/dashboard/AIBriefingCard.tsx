import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, AlertTriangle, Wifi, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const briefingItems = [
  {
    category: "Rising Risk",
    icon: TrendingUp,
    items: [
      { text: "Maria Schmidt's mobility declined 60% below baseline — risk score now 92", link: "/dashboard/residents/1" },
      { text: "Hans Weber shows 4+ nightly wake events — sleep disruption worsening", link: "/dashboard/residents/2" },
    ],
    color: "text-status-high-risk",
    bg: "bg-status-high-risk-bg",
  },
  {
    category: "New Anomalies",
    icon: AlertTriangle,
    items: [
      { text: "Ingrid Müller — 1.2 kg weight loss over 7 days, appetite reduced", link: "/dashboard/residents/3" },
      { text: "Elisabeth Braun — behavioral change detected, withdrawn from group activities", link: "/dashboard/residents/5" },
    ],
    color: "text-status-monitor",
    bg: "bg-status-monitor-bg",
  },
  {
    category: "Monitoring Gaps",
    icon: Wifi,
    items: [
      { text: "3 devices offline — Room C-02, B-11, A-03 sensors not syncing", link: "/dashboard/devices" },
      { text: "Klaus Bauer's wearable last synced 6 hours ago", link: "/dashboard/residents/4" },
    ],
    color: "text-muted-foreground",
    bg: "bg-muted",
  },
];

const overnightSummary = {
  flagged: 3,
  stableTransitions: 2,
  alertsResolved: 5,
  avgResponseTime: "3.8 min",
};

const AIBriefingCard = () => {
  return (
    <Card className="shadow-card border-primary/20 bg-gradient-to-br from-primary/[0.03] to-transparent">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Brain className="h-4 w-4 text-primary" />
            </div>
            AI Daily Briefing
            <Badge className="bg-primary/10 text-primary border-0 text-[10px] font-medium ml-1">
              Updated 12 min ago
            </Badge>
          </CardTitle>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-status-stable animate-pulse" />
            Confidence: High
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overnight summary bar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 text-xs bg-secondary/50 rounded-lg px-3 sm:px-4 py-2.5 flex-wrap">
          <span className="flex items-center gap-1.5 font-medium text-foreground">
            <Clock className="h-3.5 w-3.5 text-primary" /> Overnight Summary
          </span>
          <span className="text-muted-foreground">
            <strong className="text-status-high-risk">{overnightSummary.flagged}</strong> flagged
          </span>
          <span className="text-muted-foreground">
            <strong className="text-status-stable">{overnightSummary.stableTransitions}</strong> improved
          </span>
          <span className="text-muted-foreground">
            <strong className="text-foreground">{overnightSummary.alertsResolved}</strong> alerts resolved
          </span>
          <span className="text-muted-foreground">
            Avg response: <strong className="text-foreground">{overnightSummary.avgResponseTime}</strong>
          </span>
        </div>

        {/* Briefing categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {briefingItems.map((group) => (
            <div key={group.category} className="space-y-2">
              <div className="flex items-center gap-1.5">
                <group.icon className={`h-3.5 w-3.5 ${group.color}`} />
                <span className={`text-xs font-semibold ${group.color}`}>{group.category}</span>
                <Badge className={`${group.bg} ${group.color} border-0 text-[10px] h-4 px-1.5`}>
                  {group.items.length}
                </Badge>
              </div>
              {group.items.map((item, i) => (
                <Link
                  key={i}
                  to={item.link}
                  className="block text-xs text-muted-foreground leading-relaxed hover:text-foreground transition-colors group"
                >
                  <span className="flex items-start gap-1">
                    <ChevronRight className="h-3 w-3 mt-0.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                    <span>{item.text}</span>
                  </span>
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Predictive note */}
        <div className="text-[11px] text-muted-foreground border-t border-border pt-3">
          <strong className="text-foreground">Predictive note:</strong> Based on current patterns, Maria Schmidt and Hans Weber
          may require care plan adjustments within the next 48 hours. Early clinical review recommended.
        </div>
      </CardContent>
    </Card>
  );
};

export default AIBriefingCard;
