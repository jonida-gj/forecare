import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const residents = [
  { id: "1", name: "Maria Schmidt", age: 84, room: "A-12", risk: 92, status: "High Risk", trend: "Declining" },
  { id: "2", name: "Hans Weber", age: 79, room: "B-04", risk: 85, status: "High Risk", trend: "Declining" },
  { id: "3", name: "Ingrid Müller", age: 88, room: "A-07", risk: 78, status: "High Risk", trend: "Declining" },
  { id: "4", name: "Klaus Bauer", age: 76, room: "C-02", risk: 71, status: "Monitor", trend: "Fluctuating" },
  { id: "5", name: "Elisabeth Braun", age: 82, room: "B-11", risk: 68, status: "Monitor", trend: "Fluctuating" },
  { id: "6", name: "Wolfgang Richter", age: 73, room: "A-03", risk: 45, status: "Stable", trend: "Stable" },
  { id: "7", name: "Helga Fischer", age: 90, room: "C-08", risk: 38, status: "Stable", trend: "Improving" },
  { id: "8", name: "Peter Hoffmann", age: 81, room: "B-06", risk: 32, status: "Stable", trend: "Stable" },
  { id: "9", name: "Ursula Koch", age: 77, room: "A-15", risk: 28, status: "Stable", trend: "Stable" },
  { id: "10", name: "Friedrich Schäfer", age: 86, room: "C-12", risk: 22, status: "Stable", trend: "Stable" },
];

function statusBadge(status: string) {
  if (status === "High Risk") return <Badge className="bg-status-high-risk-bg text-status-high-risk border-0 text-xs">{status}</Badge>;
  if (status === "Monitor") return <Badge className="bg-status-monitor-bg text-status-monitor border-0 text-xs">{status}</Badge>;
  return <Badge className="bg-status-stable-bg text-status-stable border-0 text-xs">{status}</Badge>;
}

const Residents = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Residents</h1>
          <p className="text-sm text-muted-foreground">124 residents monitored</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Filter residents..." className="pl-9 w-64 h-9 bg-card" />
        </div>
      </div>

      <Card className="shadow-card border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Age</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Room</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Risk Score</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Trend</th>
                </tr>
              </thead>
              <tbody>
                {residents.map((r) => (
                  <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4">
                      <Link to={`/dashboard/residents/${r.id}`} className="font-medium text-foreground hover:text-primary transition-colors">
                        {r.name}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{r.age}</td>
                    <td className="py-3 px-4 text-muted-foreground">{r.room}</td>
                    <td className="py-3 px-4">
                      <span className={`font-semibold ${r.risk >= 80 ? "text-status-high-risk" : r.risk >= 60 ? "text-status-monitor" : "text-status-stable"}`}>
                        {r.risk}
                      </span>
                    </td>
                    <td className="py-3 px-4">{statusBadge(r.status)}</td>
                    <td className="py-3 px-4 text-muted-foreground">{r.trend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Residents;
