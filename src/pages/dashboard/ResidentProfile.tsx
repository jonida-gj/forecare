import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Brain, TrendingDown, Moon, Footprints, Heart } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const mobilityData = [
  { day: "Mon", steps: 3200 }, { day: "Tue", steps: 2800 }, { day: "Wed", steps: 2100 },
  { day: "Thu", steps: 1900 }, { day: "Fri", steps: 1600 }, { day: "Sat", steps: 1400 }, { day: "Sun", steps: 1200 },
];

const sleepData = [
  { day: "Mon", hours: 7.2 }, { day: "Tue", hours: 6.8 }, { day: "Wed", hours: 5.5 },
  { day: "Thu", hours: 4.9 }, { day: "Fri", hours: 5.1 }, { day: "Sat", hours: 4.3 }, { day: "Sun", hours: 4.0 },
];

const interventions = [
  { date: "Feb 18", action: "Mobility assessment completed", by: "Nurse Becker" },
  { date: "Feb 17", action: "Vitals review — BP slightly elevated", by: "Dr. Krause" },
  { date: "Feb 16", action: "Follow-up visit scheduled", by: "Nurse Becker" },
  { date: "Feb 14", action: "Diet consultation requested", by: "Dr. Krause" },
];

const alerts = [
  { time: "08:32", message: "Reduced mobility detected — 60% below baseline", level: "high" },
  { time: "06:15", message: "Sleep disruption — only 4h recorded", level: "high" },
  { time: "Yesterday", message: "Weight loss trend — 1.2kg over 7 days", level: "medium" },
];

const ResidentProfile = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <Link to="/dashboard/residents" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to residents
      </Link>

      {/* Header */}
      <div className="flex items-start gap-5">
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl flex-shrink-0">
          MS
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold">Maria Schmidt</h1>
            <Badge className="bg-status-high-risk-bg text-status-high-risk border-0">High Risk</Badge>
          </div>
          <p className="text-sm text-muted-foreground">Age 84 · Room A-12 · Admitted Jan 2024</p>
        </div>
        <div className="text-right">
          <p className="text-4xl font-bold text-status-high-risk">92</p>
          <p className="text-xs text-muted-foreground">Risk Score</p>
        </div>
      </div>

      {/* AI Insight */}
      <Card className="border-primary/20 bg-primary/5 shadow-card">
        <CardContent className="py-4 px-5 flex items-start gap-3">
          <Brain className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">AI Insight</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Reduced activity and sleep disruption detected over the past 5 days — possible early decline. Mobility has dropped 60% below baseline. Combined with 1.2kg weight loss, this pattern suggests increased fall risk and potential health deterioration. Recommend clinical review within 24 hours.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Footprints className="h-4 w-4 text-primary" /> Mobility Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={mobilityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(180,15%,90%)" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(200,10%,50%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(200,10%,50%)" />
                <Tooltip />
                <Line type="monotone" dataKey="steps" stroke="hsl(174,52%,40%)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Moon className="h-4 w-4 text-primary" /> Sleep Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={sleepData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(180,15%,90%)" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(200,10%,50%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(200,10%,50%)" />
                <Tooltip />
                <Line type="monotone" dataKey="hours" stroke="hsl(155,40%,45%)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Alerts & Interventions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${a.level === "high" ? "bg-status-high-risk" : "bg-status-monitor"}`} />
                <div>
                  <p className="text-sm text-foreground">{a.message}</p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Intervention History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {interventions.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <div>
                  <p className="text-sm text-foreground">{item.action}</p>
                  <p className="text-xs text-muted-foreground">{item.date} · {item.by}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResidentProfile;
