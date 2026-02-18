import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Eye, Stethoscope, Calendar, Activity } from "lucide-react";

const timeline = [
  { time: "09:15", date: "Today", action: "Observation completed", detail: "Maria Schmidt — mobility assessment", icon: Eye, status: "completed" },
  { time: "08:30", date: "Today", action: "Nurse visit", detail: "Hans Weber — vitals check and medication review", icon: Stethoscope, status: "completed" },
  { time: "14:00", date: "Today", action: "Follow-up scheduled", detail: "Ingrid Müller — nutritional assessment", icon: Calendar, status: "scheduled" },
  { time: "16:30", date: "Today", action: "Condition stable", detail: "Klaus Bauer — fall risk reassessed, downgraded to monitor", icon: Activity, status: "completed" },
  { time: "11:00", date: "Yesterday", action: "Clinical review", detail: "Maria Schmidt — care plan updated by Dr. Krause", icon: Stethoscope, status: "completed" },
  { time: "09:45", date: "Yesterday", action: "Observation completed", detail: "Elisabeth Braun — behavioral observation", icon: Eye, status: "completed" },
  { time: "15:00", date: "Yesterday", action: "Follow-up scheduled", detail: "Hans Weber — sleep monitoring initiated", icon: Calendar, status: "scheduled" },
];

const Interventions = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold mb-1">Interventions</h1>
      <p className="text-sm text-muted-foreground">Track care actions and follow-ups</p>
    </div>

    <Card className="shadow-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Intervention Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {timeline.map((item, i) => (
            <div key={i} className="flex gap-4 relative">
              {/* Timeline line */}
              {i < timeline.length - 1 && (
                <div className="absolute left-[17px] top-10 bottom-0 w-px bg-border" />
              )}
              <div className={`mt-1 p-1.5 rounded-full flex-shrink-0 z-10 ${item.status === "completed" ? "bg-status-stable-bg" : "bg-primary/10"}`}>
                <item.icon className={`h-4 w-4 ${item.status === "completed" ? "text-status-stable" : "text-primary"}`} />
              </div>
              <div className="pb-6">
                <p className="text-sm font-medium text-foreground">{item.action}</p>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.date} at {item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default Interventions;
