import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const activityData = [
  { week: "W1", avg: 3100 }, { week: "W2", avg: 2900 }, { week: "W3", avg: 2700 },
  { week: "W4", avg: 2500 }, { week: "W5", avg: 2600 }, { week: "W6", avg: 2400 },
];

const stabilityData = [
  { week: "W1", score: 88 }, { week: "W2", score: 86 }, { week: "W3", score: 84 },
  { week: "W4", score: 82 }, { week: "W5", score: 83 }, { week: "W6", score: 82 },
];

const alertFrequency = [
  { day: "Mon", count: 8 }, { day: "Tue", count: 12 }, { day: "Wed", count: 6 },
  { day: "Thu", count: 14 }, { day: "Fri", count: 9 }, { day: "Sat", count: 5 }, { day: "Sun", count: 4 },
];

const behavioralChanges = [
  { week: "W1", changes: 3 }, { week: "W2", changes: 5 }, { week: "W3", changes: 4 },
  { week: "W4", changes: 7 }, { week: "W5", changes: 6 }, { week: "W6", changes: 8 },
];

const chartStyle = { grid: "hsl(180,15%,90%)", axis: "hsl(200,10%,50%)", teal: "hsl(174,52%,40%)", green: "hsl(155,40%,45%)", amber: "hsl(45,90%,50%)", red: "hsl(0,75%,55%)" };

const Trends = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold mb-1">Trends & Analytics</h1>
      <p className="text-sm text-muted-foreground">Facility-wide patterns over the past 6 weeks</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="shadow-card border-border">
        <CardHeader className="pb-2"><CardTitle className="text-sm">Average Activity Over Time</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartStyle.grid} />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke={chartStyle.axis} />
              <YAxis tick={{ fontSize: 12 }} stroke={chartStyle.axis} />
              <Tooltip />
              <Line type="monotone" dataKey="avg" stroke={chartStyle.teal} strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="shadow-card border-border">
        <CardHeader className="pb-2"><CardTitle className="text-sm">Stability Score Trend</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={stabilityData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartStyle.grid} />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke={chartStyle.axis} />
              <YAxis domain={[70, 100]} tick={{ fontSize: 12 }} stroke={chartStyle.axis} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke={chartStyle.green} strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="shadow-card border-border">
        <CardHeader className="pb-2"><CardTitle className="text-sm">Alert Frequency</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={alertFrequency}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartStyle.grid} />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke={chartStyle.axis} />
              <YAxis tick={{ fontSize: 12 }} stroke={chartStyle.axis} />
              <Tooltip />
              <Bar dataKey="count" fill={chartStyle.teal} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="shadow-card border-border">
        <CardHeader className="pb-2"><CardTitle className="text-sm">Behavioral Changes Detected</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={behavioralChanges}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartStyle.grid} />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke={chartStyle.axis} />
              <YAxis tick={{ fontSize: 12 }} stroke={chartStyle.axis} />
              <Tooltip />
              <Bar dataKey="changes" fill={chartStyle.amber} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default Trends;
