import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose,
} from "@/components/ui/dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft, Brain, Moon, Footprints, Shield, Clock, AlertTriangle,
  Plus, CheckCircle2, ChevronRight, Bell, Activity, Droplets, Pill,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

// --- Mock Data ---
const mobilityData = [
  { day: "Mon", steps: 3200 }, { day: "Tue", steps: 2800 }, { day: "Wed", steps: 2100 },
  { day: "Thu", steps: 1900 }, { day: "Fri", steps: 1600 }, { day: "Sat", steps: 1400 }, { day: "Sun", steps: 1200 },
];
const sleepData = [
  { day: "Mon", hours: 7.2 }, { day: "Tue", hours: 6.8 }, { day: "Wed", hours: 5.5 },
  { day: "Thu", hours: 4.9 }, { day: "Fri", hours: 5.1 }, { day: "Sat", hours: 4.3 }, { day: "Sun", hours: 4.0 },
];

const checkSchedule = [
  { type: "Safety check", frequency: "Every 30 min", next: "16:00", status: "upcoming" as const, icon: Shield },
  { type: "Mobility check", frequency: "Every 3 hours", next: "18:30", status: "upcoming" as const, icon: Footprints },
  { type: "Medication", frequency: "Daily", next: "20:00", status: "upcoming" as const, icon: Pill },
  { type: "Vitals check", frequency: "Every 4 hours", next: "Overdue", status: "overdue" as const, icon: Activity },
];

const observationLog = [
  { time: "15:30", date: "Today", action: "Nurse check completed", by: "Nurse Becker", category: "Check" },
  { time: "12:00", date: "Today", action: "Mobility observation — decreased steadiness", by: "Nurse Becker", category: "Observation" },
  { time: "08:00", date: "Today", action: "Medication given (Metformin 500mg)", by: "Nurse Vogel", category: "Medication" },
  { time: "22:15", date: "Yesterday", action: "Night check — restless sleep noted", by: "Nurse Klein", category: "Check" },
  { time: "18:00", date: "Yesterday", action: "Vitals reviewed — BP slightly elevated", by: "Dr. Krause", category: "Vitals" },
  { time: "14:30", date: "Yesterday", action: "Diet consultation requested", by: "Dr. Krause", category: "Consultation" },
];

const alerts = [
  { time: "08:32", message: "Reduced mobility detected — 60% below baseline", level: "high" },
  { time: "06:15", message: "Sleep disruption — only 4h recorded", level: "high" },
  { time: "Yesterday", message: "Weight loss trend — 1.2kg over 7 days", level: "medium" },
];

const nextActions = [
  { action: "Check vitals within 20 minutes", urgency: "high" },
  { action: "Monitor hydration intake", urgency: "medium" },
  { action: "Review medication schedule with Dr. Krause", urgency: "medium" },
  { action: "Schedule mobility assessment", urgency: "low" },
];

const ResidentProfile = () => {
  const { id } = useParams();
  const [addReminderOpen, setAddReminderOpen] = useState(false);
  const [addObservationOpen, setAddObservationOpen] = useState(false);

  return (
    <div className="space-y-6">
      <Link to="/dashboard/residents" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to residents
      </Link>

      {/* ===== HEADER SUMMARY ===== */}
      <Card className="shadow-card border-border">
        <CardContent className="p-6">
          <div className="flex items-start gap-5">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl flex-shrink-0">
              MS
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <h1 className="text-2xl font-bold">Maria Schmidt</h1>
                <Badge className="bg-status-high-risk-bg text-status-high-risk border-0 text-sm font-semibold px-3 py-1">High Risk</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Age 84 · Room A-12 · Unit A · Admitted Jan 2024</p>
              <p className="text-sm text-muted-foreground mt-1">Assigned to <span className="font-medium text-foreground">Nurse Becker</span></p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-4xl font-bold text-status-high-risk">92</p>
              <p className="text-xs text-muted-foreground">Risk Score</p>
            </div>
          </div>
          {/* Monitoring indicator */}
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-status-stable animate-pulse-soft" />
            <span className="text-muted-foreground">Monitoring active · Last update 2 min ago</span>
          </div>
        </CardContent>
      </Card>

      {/* ===== AI INSIGHT ===== */}
      <Card className="border-primary/20 bg-primary/5 shadow-card">
        <CardContent className="py-4 px-5 flex items-start gap-3">
          <Brain className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">AI Insight</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Reduced activity and sleep disruption detected over the past 5 days — possible early decline. Mobility has dropped 60% below baseline. Combined with 1.2 kg weight loss, this pattern suggests increased fall risk and potential health deterioration. Recommend clinical review within 24 hours.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ===== NEXT ACTIONS ===== */}
      <Card className="shadow-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <ChevronRight className="h-4 w-4 text-primary" /> Next Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {nextActions.map((a, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`h-2 w-2 rounded-full flex-shrink-0 ${
                a.urgency === "high" ? "bg-status-high-risk" : a.urgency === "medium" ? "bg-status-monitor" : "bg-status-stable"
              }`} />
              <span className="text-sm text-foreground">{a.action}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ===== CHECK SCHEDULE ===== */}
      <Card className="shadow-card border-border">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" /> Check Schedule
          </CardTitle>
          <Dialog open={addReminderOpen} onOpenChange={setAddReminderOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                <Plus className="h-3.5 w-3.5 mr-1" /> Add Reminder
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Reminder</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Type of check</label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="safety">Safety check</SelectItem>
                      <SelectItem value="mobility">Mobility check</SelectItem>
                      <SelectItem value="medication">Medication</SelectItem>
                      <SelectItem value="vitals">Vitals check</SelectItem>
                      <SelectItem value="hydration">Hydration check</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Frequency</label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select frequency" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30min">Every 30 minutes</SelectItem>
                      <SelectItem value="1h">Every hour</SelectItem>
                      <SelectItem value="2h">Every 2 hours</SelectItem>
                      <SelectItem value="3h">Every 3 hours</SelectItem>
                      <SelectItem value="4h">Every 4 hours</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Start time</label>
                  <Input type="time" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Assign staff</label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select staff" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="becker">Nurse Becker</SelectItem>
                      <SelectItem value="vogel">Nurse Vogel</SelectItem>
                      <SelectItem value="klein">Nurse Klein</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Notes</label>
                  <Textarea placeholder="Additional notes..." rows={2} />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" size="sm">Cancel</Button>
                </DialogClose>
                <Button size="sm" onClick={() => setAddReminderOpen(false)}>Save Reminder</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="p-0">
          {/* Overdue alert */}
          <div className="px-5 pb-3">
            <div className="flex items-center gap-2 text-sm text-status-high-risk bg-status-high-risk-bg rounded-md px-3 py-2">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              <span className="font-semibold">Vitals check overdue by 45 minutes</span>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="font-semibold text-foreground">Check Type</TableHead>
                <TableHead className="font-semibold text-foreground">Frequency</TableHead>
                <TableHead className="font-semibold text-foreground">Next Check</TableHead>
                <TableHead className="font-semibold text-foreground">Status</TableHead>
                <TableHead className="font-semibold text-foreground text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {checkSchedule.map((c, i) => (
                <TableRow key={i} className={c.status === "overdue" ? "bg-status-high-risk-bg/30" : ""}>
                  <TableCell className="font-medium text-sm flex items-center gap-2">
                    <c.icon className="h-4 w-4 text-primary" />
                    {c.type}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{c.frequency}</TableCell>
                  <TableCell>
                    {c.status === "overdue" ? (
                      <span className="text-sm text-status-high-risk font-semibold flex items-center gap-1">
                        <AlertTriangle className="h-3.5 w-3.5" /> {c.next}
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground">{c.next}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {c.status === "overdue" ? (
                      <Badge className="bg-status-high-risk-bg text-status-high-risk border-0 text-xs">Overdue</Badge>
                    ) : (
                      <Badge className="bg-status-stable-bg text-status-stable border-0 text-xs">Upcoming</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Mark Complete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ===== ESCALATION RULE ===== */}
      <Card className="shadow-card border-border border-status-monitor/30">
        <CardContent className="py-4 px-5 flex items-start gap-3">
          <Bell className="h-5 w-5 text-status-monitor mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-foreground mb-0.5">Escalation Rule Active</p>
            <p className="text-sm text-muted-foreground">If not checked within 15 minutes of scheduled time → notify Supervisor Dr. Krause.</p>
          </div>
        </CardContent>
      </Card>

      {/* ===== MONITORING CHARTS ===== */}
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

      {/* ===== RECENT ALERTS ===== */}
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

      {/* ===== CHECKS & OBSERVATIONS LOG ===== */}
      <Card className="shadow-card border-border">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-sm">Checks & Observations Log</CardTitle>
          <Dialog open={addObservationOpen} onOpenChange={setAddObservationOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                <Plus className="h-3.5 w-3.5 mr-1" /> Add Observation
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Observation</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Note</label>
                  <Textarea placeholder="Describe your observation..." rows={3} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Category</label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="check">Check</SelectItem>
                      <SelectItem value="observation">Observation</SelectItem>
                      <SelectItem value="vitals">Vitals</SelectItem>
                      <SelectItem value="medication">Medication</SelectItem>
                      <SelectItem value="consultation">Consultation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Severity</label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select severity" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Attach file (optional)</label>
                  <Input type="file" className="text-sm" />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" size="sm">Cancel</Button>
                </DialogClose>
                <Button size="sm" onClick={() => setAddObservationOpen(false)}>Save Observation</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="space-y-0 p-0">
          {observationLog.map((item, i) => (
            <div key={i} className="flex items-start gap-4 px-5 py-3 border-b border-border last:border-b-0">
              <div className="text-right flex-shrink-0 w-16">
                <p className="text-sm font-medium text-foreground">{item.time}</p>
                <p className="text-xs text-muted-foreground">{item.date}</p>
              </div>
              <div className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{item.action}</p>
                <p className="text-xs text-muted-foreground">{item.by} · {item.category}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResidentProfile;
