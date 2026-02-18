import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  AlertTriangle, Brain, ChevronDown, Footprints, Heart, Moon,
  Activity, Thermometer, Wind, Droplets, Watch, TrendingDown, TrendingUp, Minus,
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

// ── Mock data ──────────────────────────────────────────────

const gaitData = [
  { day: "Mon", score: 82 }, { day: "Tue", score: 80 }, { day: "Wed", score: 76 },
  { day: "Thu", score: 72 }, { day: "Fri", score: 68 }, { day: "Sat", score: 65 }, { day: "Sun", score: 63 },
];
const walkTestData = [
  { week: "W1", meters: 320 }, { week: "W2", meters: 305 }, { week: "W3", meters: 290 },
  { week: "W4", meters: 268 }, { week: "W5", meters: 255 }, { week: "W6", meters: 240 },
];
const activityData = [
  { day: "Mon", kcal: 420 }, { day: "Tue", kcal: 380 }, { day: "Wed", kcal: 310 },
  { day: "Thu", kcal: 290 }, { day: "Fri", kcal: 260 }, { day: "Sat", kcal: 230 }, { day: "Sun", kcal: 210 },
];
const actigraphyData = [
  { hour: "00", level: 1 }, { hour: "04", level: 0 }, { hour: "08", level: 3 },
  { hour: "12", level: 5 }, { hour: "16", level: 4 }, { hour: "20", level: 2 },
];

const postureTimeline = [
  { time: "06:00", position: "Lying", duration: "6h" },
  { time: "06:30", position: "Sitting", duration: "1h 30m" },
  { time: "08:00", position: "Standing", duration: "20m" },
  { time: "08:20", position: "Walking", duration: "10m" },
  { time: "08:30", position: "Sitting", duration: "2h" },
  { time: "10:30", position: "Standing", duration: "15m" },
  { time: "10:45", position: "Sitting", duration: "1h 45m" },
  { time: "12:30", position: "Walking", duration: "8m" },
  { time: "12:38", position: "Sitting", duration: "2h" },
  { time: "14:38", position: "Lying", duration: "Current" },
];

const sleepTimelineData = [
  { hour: "22", quality: 0 }, { hour: "23", quality: 70 }, { hour: "00", quality: 85 },
  { hour: "01", quality: 90 }, { hour: "02", quality: 60 }, { hour: "03", quality: 40 },
  { hour: "04", quality: 75 }, { hour: "05", quality: 55 }, { hour: "06", quality: 0 },
];
const sleepWeekData = [
  { day: "Mon", hours: 7.2, interruptions: 1 }, { day: "Tue", hours: 6.8, interruptions: 2 },
  { day: "Wed", hours: 5.5, interruptions: 3 }, { day: "Thu", hours: 4.9, interruptions: 4 },
  { day: "Fri", hours: 5.1, interruptions: 3 }, { day: "Sat", hours: 4.3, interruptions: 5 },
  { day: "Sun", hours: 4.0, interruptions: 4 },
];

const pulseData = [
  { time: "06", bpm: 72 }, { time: "08", bpm: 78 }, { time: "10", bpm: 75 },
  { time: "12", bpm: 82 }, { time: "14", bpm: 80 }, { time: "16", bpm: 76 },
];
const respData = [
  { time: "06", rpm: 16 }, { time: "08", rpm: 18 }, { time: "10", rpm: 17 },
  { time: "12", rpm: 19 }, { time: "14", rpm: 18 }, { time: "16", rpm: 17 },
];
const spo2Data = [
  { time: "06", pct: 96 }, { time: "08", pct: 95 }, { time: "10", pct: 94 },
  { time: "12", pct: 95 }, { time: "14", pct: 93 }, { time: "16", pct: 94 },
];
const stressData = [
  { day: "Mon", level: 30 }, { day: "Tue", level: 35 }, { day: "Wed", level: 45 },
  { day: "Thu", level: 50 }, { day: "Fri", level: 55 }, { day: "Sat", level: 60 }, { day: "Sun", level: 58 },
];

const chartColors = {
  teal: "hsl(174,52%,40%)",
  green: "hsl(155,40%,45%)",
  amber: "hsl(45,90%,50%)",
  red: "hsl(0,75%,55%)",
  blue: "hsl(210,60%,50%)",
  grid: "hsl(180,15%,90%)",
  axis: "hsl(200,10%,50%)",
};

// ── Helpers ──────────────────────────────────────────────

type TrendDir = "down" | "up" | "stable";
const TrendIcon = ({ dir }: { dir: TrendDir }) => {
  if (dir === "down") return <TrendingDown className="h-3.5 w-3.5 text-status-high-risk" />;
  if (dir === "up") return <TrendingUp className="h-3.5 w-3.5 text-status-stable" />;
  return <Minus className="h-3.5 w-3.5 text-muted-foreground" />;
};

const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, string> = {
    "Change detected": "bg-status-monitor-bg text-status-monitor",
    "Needs review": "bg-status-high-risk-bg text-status-high-risk",
    "Within expected range": "bg-status-stable-bg text-status-stable",
    "Stable": "bg-status-stable-bg text-status-stable",
  };
  return <Badge className={`${map[status] || "bg-muted text-muted-foreground"} border-0 text-xs font-medium`}>{status}</Badge>;
};

const Metric = ({ label, value, unit, baseline, trend }: {
  label: string; value: string | number; unit?: string; baseline?: string; trend?: TrendDir;
}) => (
  <div className="bg-muted/50 rounded-lg p-3 space-y-1">
    <p className="text-xs text-muted-foreground">{label}</p>
    <div className="flex items-end gap-1.5">
      <span className="text-lg font-bold text-foreground">{value}</span>
      {unit && <span className="text-xs text-muted-foreground mb-0.5">{unit}</span>}
      {trend && <TrendIcon dir={trend} />}
    </div>
    {baseline && <p className="text-xs text-muted-foreground">{baseline}</p>}
  </div>
);

const SectionWrapper = ({ title, icon: Icon, defaultOpen = false, children }: {
  title: string; icon: React.ElementType; defaultOpen?: boolean; children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card className="shadow-card border-border">
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer select-none pb-3 hover:bg-muted/30 transition-colors">
            <CardTitle className="text-sm flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary" />
                {title}
              </span>
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0 space-y-4">{children}</CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

const positionColors: Record<string, string> = {
  Lying: "bg-blue-100 text-blue-700",
  Sitting: "bg-amber-100 text-amber-700",
  Standing: "bg-green-100 text-green-700",
  Walking: "bg-primary/10 text-primary",
};

// ── Main Component ──────────────────────────────────────

const ClinicalMonitoring = () => {
  return (
    <div className="space-y-4">
      {/* Section heading */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">Clinical Monitoring</h2>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
            <Watch className="h-3 w-3" />
            Data collected via wrist, hip, and lumbar sensors
          </p>
        </div>
      </div>

      {/* ── Clinical alerts ── */}
      <Card className="border-status-high-risk/20 bg-status-high-risk-bg/30 shadow-card">
        <CardContent className="py-3 px-4 space-y-2">
          <p className="text-xs font-semibold text-status-high-risk flex items-center gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5" /> Monitoring Alerts
          </p>
          {[
            "Gait instability detected — stability score 23% below baseline",
            "Reduced activity compared to baseline — energy expenditure down 50%",
            "Sleep disruption observed — 4h average over past 3 nights",
          ].map((msg, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-foreground">
              <AlertTriangle className="h-3.5 w-3.5 text-status-high-risk mt-0.5 flex-shrink-0" />
              <span>{msg}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ── AI interpretation ── */}
      <Card className="border-primary/20 bg-primary/5 shadow-card">
        <CardContent className="py-3 px-4 flex items-start gap-3">
          <Brain className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold text-foreground mb-1">AI Clinical Interpretation</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              ForeCare has detected subtle changes in mobility and sleep patterns that may indicate increased fall risk. 
              Gait stability has declined 23% from baseline over 7 days, combined with a 50% reduction in daily energy expenditure 
              and worsening sleep quality. These converging trends suggest early functional decline — clinical review within 24 hours is recommended.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ── Category 1: Functional Mobility & Activity ── */}
      <SectionWrapper title="Functional Mobility & Activity" icon={Footprints} defaultOpen>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Metric label="6-Min Walk Test" value={240} unit="m" baseline="Baseline: 320m · 25% lower" trend="down" />
          <Metric label="Daily Energy" value={210} unit="kcal" baseline="Baseline: 420kcal · 50% lower" trend="down" />
          <Metric label="Gait Stability" value={63} unit="/100" baseline="Baseline: 82 · Change detected" trend="down" />
          <Metric label="Daily Steps" value="1,200" baseline="Baseline: 3,200 · 63% lower" trend="down" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-foreground">Gait Stability Trend</p>
              <StatusBadge status="Change detected" />
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={gaitData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke={chartColors.axis} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 11 }} stroke={chartColors.axis} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke={chartColors.teal} strokeWidth={2} dot={{ r: 2.5 }} />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted-foreground mt-1 italic">Reduced gait stability detected compared to baseline.</p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-foreground">6-Minute Walk Test (Weekly)</p>
              <StatusBadge status="Needs review" />
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={walkTestData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke={chartColors.axis} />
                <YAxis tick={{ fontSize: 11 }} stroke={chartColors.axis} />
                <Tooltip />
                <Bar dataKey="meters" fill={chartColors.teal} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted-foreground mt-1 italic">Walking distance declining steadily — mobility 25% lower than normal.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-foreground">Energy Expenditure</p>
              <StatusBadge status="Needs review" />
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke={chartColors.axis} />
                <YAxis tick={{ fontSize: 11 }} stroke={chartColors.axis} />
                <Tooltip />
                <Bar dataKey="kcal" fill={chartColors.amber} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-foreground">Actigraphy (Today)</p>
              <StatusBadge status="Change detected" />
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={actigraphyData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis dataKey="hour" tick={{ fontSize: 11 }} stroke={chartColors.axis} />
                <YAxis tick={{ fontSize: 11 }} stroke={chartColors.axis} />
                <Tooltip />
                <Area type="monotone" dataKey="level" stroke={chartColors.green} fill={chartColors.green} fillOpacity={0.15} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted-foreground mt-1 italic">Activity levels significantly reduced in the afternoon.</p>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Category 2: Posture & Movement ── */}
      <SectionWrapper title="Posture & Movement" icon={Activity}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Metric label="Current Position" value="Lying" baseline="Since 14:38" trend="stable" />
          <Metric label="Time Upright Today" value="2h 45m" baseline="Baseline: 5h · 45% lower" trend="down" />
          <Metric label="Wearing Detection" value="Active" baseline="Sensors worn continuously" />
        </div>

        <div>
          <p className="text-xs font-medium text-foreground mb-2">Body Position Timeline (Today)</p>
          <div className="space-y-1.5">
            {postureTimeline.map((entry, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="text-xs text-muted-foreground w-12 text-right font-mono">{entry.time}</span>
                <Badge className={`${positionColors[entry.position] || "bg-muted text-muted-foreground"} border-0 text-xs w-20 justify-center`}>
                  {entry.position}
                </Badge>
                <span className="text-xs text-muted-foreground">{entry.duration}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 bg-status-monitor-bg/50 rounded-md px-3 py-2 flex items-start gap-2">
            <AlertTriangle className="h-3.5 w-3.5 text-status-monitor mt-0.5 flex-shrink-0" />
            <p className="text-xs text-status-monitor">Unusual inactivity: Lying since 14:38 — longer than typical afternoon pattern.</p>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Category 3: Sleep & Recovery ── */}
      <SectionWrapper title="Sleep & Recovery" icon={Moon}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Metric label="Last Night Duration" value="4.0" unit="hours" baseline="Baseline: 7.2h" trend="down" />
          <Metric label="Interruptions" value={4} baseline="Baseline: 1" trend="up" />
          <Metric label="Sleep Quality" value="Poor" baseline="Declining over 5 nights" trend="down" />
          <Metric label="Time to Fall Asleep" value="45" unit="min" baseline="Baseline: 15min" trend="up" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-foreground">Sleep Quality (Last Night)</p>
              <StatusBadge status="Needs review" />
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={sleepTimelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis dataKey="hour" tick={{ fontSize: 11 }} stroke={chartColors.axis} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} stroke={chartColors.axis} />
                <Tooltip />
                <Area type="monotone" dataKey="quality" stroke={chartColors.blue} fill={chartColors.blue} fillOpacity={0.12} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted-foreground mt-1 italic">Multiple disruptions between 02:00–03:00 and 05:00–06:00.</p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-foreground">Weekly Sleep Duration</p>
              <StatusBadge status="Change detected" />
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={sleepWeekData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke={chartColors.axis} />
                <YAxis tick={{ fontSize: 11 }} stroke={chartColors.axis} />
                <Tooltip />
                <Bar dataKey="hours" fill={chartColors.blue} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted-foreground mt-1 italic">Sleep duration declining consistently over the past week.</p>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Category 4: Vital Signs ── */}
      <SectionWrapper title="Vital Signs" icon={Heart}>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <Metric label="Pulse Rate" value={76} unit="bpm" baseline="Baseline: 72bpm" trend="stable" />
          <Metric label="Pulse Variability" value={42} unit="ms" baseline="Within expected range" trend="stable" />
          <Metric label="Respiratory Rate" value={17} unit="rpm" baseline="Baseline: 16rpm" trend="stable" />
          <Metric label="SpO₂" value={94} unit="%" baseline="Baseline: 96% · Slightly low" trend="down" />
          <Metric label="Temperature" value={36.8} unit="°C" baseline="Within expected range" trend="stable" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-foreground">Pulse Rate</p>
              <StatusBadge status="Within expected range" />
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={pulseData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke={chartColors.axis} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} stroke={chartColors.axis} />
                <Tooltip />
                <Line type="monotone" dataKey="bpm" stroke={chartColors.red} strokeWidth={2} dot={{ r: 2.5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-foreground">Respiratory Rate</p>
              <StatusBadge status="Stable" />
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={respData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke={chartColors.axis} />
                <YAxis domain={[12, 24]} tick={{ fontSize: 11 }} stroke={chartColors.axis} />
                <Tooltip />
                <Line type="monotone" dataKey="rpm" stroke={chartColors.green} strokeWidth={2} dot={{ r: 2.5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-foreground">Blood Oxygen (SpO₂)</p>
              <StatusBadge status="Change detected" />
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={spo2Data}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke={chartColors.axis} />
                <YAxis domain={[90, 100]} tick={{ fontSize: 11 }} stroke={chartColors.axis} />
                <Tooltip />
                <Line type="monotone" dataKey="pct" stroke={chartColors.blue} strokeWidth={2} dot={{ r: 2.5 }} />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted-foreground mt-1 italic">Oxygen saturation slightly below baseline.</p>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Category 5: Autonomic & Physiological Signals ── */}
      <SectionWrapper title="Autonomic & Physiological Signals" icon={Thermometer}>
        <div className="grid grid-cols-2 gap-3">
          <Metric label="Autonomic Arousal" value="Elevated" baseline="Above baseline for 3 consecutive days" trend="up" />
          <Metric label="Stress Index" value={58} unit="/100" baseline="Baseline: 30 · Needs review" trend="up" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-foreground">Stress Indicator Trend</p>
            <StatusBadge status="Change detected" />
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={stressData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke={chartColors.axis} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} stroke={chartColors.axis} />
              <Tooltip />
              <Area type="monotone" dataKey="level" stroke={chartColors.amber} fill={chartColors.amber} fillOpacity={0.15} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-xs text-muted-foreground mt-1 italic">Autonomic stress indicators have been trending upward, possibly correlated with sleep disruption and reduced activity.</p>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default ClinicalMonitoring;
