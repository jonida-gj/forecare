import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import ResidentSelector, { type TimeRange } from "@/components/dashboard/ResidentSelector";

const chartStyle = {
  grid: "hsl(180,15%,90%)",
  axis: "hsl(200,10%,50%)",
  teal: "hsl(174,52%,40%)",
  green: "hsl(155,40%,45%)",
  amber: "hsl(45,90%,50%)",
  baseline: "hsl(200,10%,75%)",
};

interface ChartPoint { label: string; value: number; baseline?: number }

const residentData: Record<string, {
  activity: ChartPoint[];
  heartRate: ChartPoint[];
  sleep: ChartPoint[];
  alerts: ChartPoint[];
}> = {
  "1": {
    activity: [
      { label: "Mon", value: 1200, baseline: 3000 }, { label: "Tue", value: 1100, baseline: 3000 },
      { label: "Wed", value: 900, baseline: 3000 }, { label: "Thu", value: 850, baseline: 3000 },
      { label: "Fri", value: 920, baseline: 3000 }, { label: "Sat", value: 780, baseline: 3000 },
      { label: "Sun", value: 800, baseline: 3000 },
    ],
    heartRate: [
      { label: "Mon", value: 82, baseline: 72 }, { label: "Tue", value: 85, baseline: 72 },
      { label: "Wed", value: 88, baseline: 72 }, { label: "Thu", value: 91, baseline: 72 },
      { label: "Fri", value: 87, baseline: 72 }, { label: "Sat", value: 90, baseline: 72 },
      { label: "Sun", value: 89, baseline: 72 },
    ],
    sleep: [
      { label: "Mon", value: 4.2, baseline: 7 }, { label: "Tue", value: 3.8, baseline: 7 },
      { label: "Wed", value: 4.5, baseline: 7 }, { label: "Thu", value: 3.5, baseline: 7 },
      { label: "Fri", value: 4.0, baseline: 7 }, { label: "Sat", value: 3.2, baseline: 7 },
      { label: "Sun", value: 3.9, baseline: 7 },
    ],
    alerts: [
      { label: "Mon", value: 3 }, { label: "Tue", value: 4 }, { label: "Wed", value: 2 },
      { label: "Thu", value: 5 }, { label: "Fri", value: 3 }, { label: "Sat", value: 4 }, { label: "Sun", value: 2 },
    ],
  },
  "2": {
    activity: [
      { label: "Mon", value: 2800, baseline: 3200 }, { label: "Tue", value: 2600, baseline: 3200 },
      { label: "Wed", value: 2400, baseline: 3200 }, { label: "Thu", value: 2500, baseline: 3200 },
      { label: "Fri", value: 2300, baseline: 3200 }, { label: "Sat", value: 2200, baseline: 3200 },
      { label: "Sun", value: 2100, baseline: 3200 },
    ],
    heartRate: [
      { label: "Mon", value: 68, baseline: 65 }, { label: "Tue", value: 70, baseline: 65 },
      { label: "Wed", value: 72, baseline: 65 }, { label: "Thu", value: 69, baseline: 65 },
      { label: "Fri", value: 71, baseline: 65 }, { label: "Sat", value: 73, baseline: 65 },
      { label: "Sun", value: 70, baseline: 65 },
    ],
    sleep: [
      { label: "Mon", value: 3.5, baseline: 6.5 }, { label: "Tue", value: 2.8, baseline: 6.5 },
      { label: "Wed", value: 4.0, baseline: 6.5 }, { label: "Thu", value: 3.2, baseline: 6.5 },
      { label: "Fri", value: 2.5, baseline: 6.5 }, { label: "Sat", value: 3.8, baseline: 6.5 },
      { label: "Sun", value: 3.0, baseline: 6.5 },
    ],
    alerts: [
      { label: "Mon", value: 1 }, { label: "Tue", value: 2 }, { label: "Wed", value: 1 },
      { label: "Thu", value: 3 }, { label: "Fri", value: 2 }, { label: "Sat", value: 1 }, { label: "Sun", value: 0 },
    ],
  },
};

// Generate default data for other residents
const defaultData = {
  activity: [
    { label: "Mon", value: 3100, baseline: 3200 }, { label: "Tue", value: 3000, baseline: 3200 },
    { label: "Wed", value: 2900, baseline: 3200 }, { label: "Thu", value: 3050, baseline: 3200 },
    { label: "Fri", value: 3100, baseline: 3200 }, { label: "Sat", value: 2800, baseline: 3200 },
    { label: "Sun", value: 2700, baseline: 3200 },
  ],
  heartRate: [
    { label: "Mon", value: 70, baseline: 70 }, { label: "Tue", value: 71, baseline: 70 },
    { label: "Wed", value: 69, baseline: 70 }, { label: "Thu", value: 72, baseline: 70 },
    { label: "Fri", value: 70, baseline: 70 }, { label: "Sat", value: 71, baseline: 70 },
    { label: "Sun", value: 69, baseline: 70 },
  ],
  sleep: [
    { label: "Mon", value: 6.5, baseline: 7 }, { label: "Tue", value: 6.8, baseline: 7 },
    { label: "Wed", value: 7.0, baseline: 7 }, { label: "Thu", value: 6.3, baseline: 7 },
    { label: "Fri", value: 6.7, baseline: 7 }, { label: "Sat", value: 7.1, baseline: 7 },
    { label: "Sun", value: 6.9, baseline: 7 },
  ],
  alerts: [
    { label: "Mon", value: 0 }, { label: "Tue", value: 1 }, { label: "Wed", value: 0 },
    { label: "Thu", value: 1 }, { label: "Fri", value: 0 }, { label: "Sat", value: 0 }, { label: "Sun", value: 0 },
  ],
};

const Trends = () => {
  const [searchParams] = useSearchParams();
  const initialResident = searchParams.get("resident") || "1";
  const [selectedId, setSelectedId] = useState(initialResident);
  const [timeRange, setTimeRange] = useState<TimeRange>("7d");
  const [showBaseline, setShowBaseline] = useState(false);

  const data = residentData[selectedId] || defaultData;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Trends & Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Patient-level health patterns · {timeRange === "7d" ? "Last 7 days" : "Last 30 days"}
        </p>
      </div>

      <ResidentSelector
        selectedId={selectedId}
        onSelect={setSelectedId}
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        showBaseline={showBaseline}
        onBaselineChange={setShowBaseline}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Daily Activity (Steps)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={data.activity}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartStyle.grid} />
                <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke={chartStyle.axis} />
                <YAxis tick={{ fontSize: 12 }} stroke={chartStyle.axis} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke={chartStyle.teal} strokeWidth={2} dot={{ r: 3 }} name="Activity" />
                {showBaseline && (
                  <Line type="monotone" dataKey="baseline" stroke={chartStyle.baseline} strokeWidth={1.5} strokeDasharray="6 3" dot={false} name="Baseline" />
                )}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Resting Heart Rate (bpm)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={data.heartRate}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartStyle.grid} />
                <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke={chartStyle.axis} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 12 }} stroke={chartStyle.axis} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke={chartStyle.green} strokeWidth={2} dot={{ r: 3 }} name="Heart Rate" />
                {showBaseline && (
                  <Line type="monotone" dataKey="baseline" stroke={chartStyle.baseline} strokeWidth={1.5} strokeDasharray="6 3" dot={false} name="Baseline" />
                )}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Sleep Duration (hours)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={data.sleep}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartStyle.grid} />
                <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke={chartStyle.axis} />
                <YAxis domain={[0, 10]} tick={{ fontSize: 12 }} stroke={chartStyle.axis} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke={chartStyle.teal} strokeWidth={2} dot={{ r: 3 }} name="Sleep" />
                {showBaseline && (
                  <Line type="monotone" dataKey="baseline" stroke={chartStyle.baseline} strokeWidth={1.5} strokeDasharray="6 3" dot={false} name="Baseline" />
                )}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Alert Frequency</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={data.alerts}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartStyle.grid} />
                <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke={chartStyle.axis} />
                <YAxis tick={{ fontSize: 12 }} stroke={chartStyle.axis} />
                <Tooltip />
                <Bar dataKey="value" fill={chartStyle.amber} radius={[4, 4, 0, 0]} name="Alerts" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Trends;
