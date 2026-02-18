import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Stethoscope, Calendar, Activity, Pill, AlertTriangle } from "lucide-react";
import ResidentSelector, { type TimeRange } from "@/components/dashboard/ResidentSelector";
import type { LucideIcon } from "lucide-react";

interface TimelineItem {
  time: string;
  date: string;
  action: string;
  detail: string;
  icon: LucideIcon;
  status: "completed" | "scheduled";
}

const interventionsByResident: Record<string, TimelineItem[]> = {
  "1": [
    { time: "09:15", date: "Today", action: "Mobility assessment", detail: "Gait unsteady — walker recommended", icon: Activity, status: "completed" },
    { time: "11:00", date: "Today", action: "Care plan updated", detail: "Fall risk protocol activated by Dr. Krause", icon: Stethoscope, status: "completed" },
    { time: "14:00", date: "Today", action: "Follow-up scheduled", detail: "Physiotherapy evaluation", icon: Calendar, status: "scheduled" },
    { time: "08:00", date: "Yesterday", action: "Vitals check", detail: "BP 148/92 — elevated, flagged", icon: AlertTriangle, status: "completed" },
    { time: "15:30", date: "Yesterday", action: "Medication review", detail: "Dosage adjustment proposed", icon: Pill, status: "completed" },
  ],
  "2": [
    { time: "08:30", date: "Today", action: "Nurse visit", detail: "Vitals check and medication review", icon: Stethoscope, status: "completed" },
    { time: "15:00", date: "Today", action: "Sleep monitoring", detail: "Wearable data reviewed — fragmented sleep", icon: Eye, status: "completed" },
    { time: "10:00", date: "Yesterday", action: "Follow-up scheduled", detail: "Sleep hygiene intervention", icon: Calendar, status: "scheduled" },
  ],
  "3": [
    { time: "09:15", date: "Today", action: "Nutritional assessment", detail: "Weight 52kg — 2kg loss over 4 weeks", icon: Eye, status: "completed" },
    { time: "14:00", date: "Today", action: "Dietary plan updated", detail: "High-calorie supplement added", icon: Stethoscope, status: "completed" },
    { time: "11:00", date: "Yesterday", action: "Follow-up scheduled", detail: "Weekly weight check", icon: Calendar, status: "scheduled" },
  ],
  "4": [
    { time: "08:30", date: "Today", action: "Fall risk reassessed", detail: "Downgraded to Monitor — stable gait", icon: Activity, status: "completed" },
    { time: "16:00", date: "Yesterday", action: "Observation", detail: "Balance exercises completed", icon: Eye, status: "completed" },
  ],
  "5": [
    { time: "10:00", date: "Today", action: "Behavioral observation", detail: "Increased agitation in PM hours", icon: Eye, status: "completed" },
    { time: "14:30", date: "Today", action: "Follow-up scheduled", detail: "Psychiatric consultation", icon: Calendar, status: "scheduled" },
  ],
};

// Default timeline for residents without specific data
const defaultTimeline: TimelineItem[] = [
  { time: "09:00", date: "Today", action: "Routine check", detail: "All vitals within normal range", icon: Stethoscope, status: "completed" },
  { time: "15:00", date: "Today", action: "Next check scheduled", detail: "Standard monitoring", icon: Calendar, status: "scheduled" },
];

const Interventions = () => {
  const [searchParams] = useSearchParams();
  const initialResident = searchParams.get("resident") || "1";
  const [selectedId, setSelectedId] = useState(initialResident);
  const [timeRange, setTimeRange] = useState<TimeRange>("7d");
  const [showBaseline, setShowBaseline] = useState(false);

  const timeline = interventionsByResident[selectedId] || defaultTimeline;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Interventions</h1>
        <p className="text-sm text-muted-foreground">Track care actions and follow-ups per resident</p>
      </div>

      <ResidentSelector
        selectedId={selectedId}
        onSelect={setSelectedId}
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        showBaseline={showBaseline}
        onBaselineChange={setShowBaseline}
      />

      <Card className="shadow-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Intervention Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-4 relative">
                {i < timeline.length - 1 && (
                  <div className="absolute left-[17px] top-10 bottom-0 w-px bg-border" />
                )}
                <div className={`mt-1 p-1.5 rounded-full flex-shrink-0 z-10 ${
                  item.status === "completed" ? "bg-status-stable-bg" : "bg-primary/10"
                }`}>
                  <item.icon className={`h-4 w-4 ${
                    item.status === "completed" ? "text-status-stable" : "text-primary"
                  }`} />
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
};

export default Interventions;
