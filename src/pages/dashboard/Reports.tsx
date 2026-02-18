import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

const reports = [
  { name: "Weekly Risk Summary", date: "Feb 17, 2026", type: "Automated" },
  { name: "Monthly Incident Report", date: "Feb 1, 2026", type: "Automated" },
  { name: "Resident Stability Analysis", date: "Jan 31, 2026", type: "On-demand" },
  { name: "Alert Response Times", date: "Jan 28, 2026", type: "Automated" },
  { name: "Intervention Effectiveness", date: "Jan 15, 2026", type: "On-demand" },
];

const Reports = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold mb-1">Reports</h1>
      <p className="text-sm text-muted-foreground">Automated and on-demand facility reports</p>
    </div>

    <div className="space-y-3">
      {reports.map((r, i) => (
        <Card key={i} className="shadow-card border-border">
          <CardContent className="py-4 px-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.date} · {r.type}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Download className="h-4 w-4 mr-1" /> Download
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default Reports;
