import { residents, type Resident } from "@/data/residents";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

type TimeRange = "7d" | "30d";

interface ResidentSelectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  showBaseline: boolean;
  onBaselineChange: (show: boolean) => void;
}

function statusColor(status: Resident["status"]) {
  if (status === "High Risk") return "bg-status-high-risk-bg text-status-high-risk";
  if (status === "Monitor") return "bg-status-monitor-bg text-status-monitor";
  return "bg-status-stable-bg text-status-stable";
}

const ResidentSelector = ({
  selectedId,
  onSelect,
  timeRange,
  onTimeRangeChange,
  showBaseline,
  onBaselineChange,
}: ResidentSelectorProps) => {
  const selected = residents.find((r) => r.id === selectedId);

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 flex-wrap">
        {/* Resident selector */}
        <Select value={selectedId} onValueChange={onSelect}>
          <SelectTrigger className="w-64 h-10 bg-card">
            <SelectValue placeholder="Select a resident" />
          </SelectTrigger>
          <SelectContent>
            {residents.map((r) => (
              <SelectItem key={r.id} value={r.id}>
                <span className="flex items-center gap-2">
                  <span className="font-medium">{r.name}</span>
                  <span className="text-xs text-muted-foreground">· {r.room}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Time range filter */}
        <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-0.5">
          <button
            onClick={() => onTimeRangeChange("7d")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              timeRange === "7d"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Last 7 days
          </button>
          <button
            onClick={() => onTimeRangeChange("30d")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              timeRange === "30d"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Last 30 days
          </button>
        </div>

        {/* Baseline toggle */}
        <div className="flex items-center gap-2">
          <Switch
            id="baseline"
            checked={showBaseline}
            onCheckedChange={onBaselineChange}
          />
          <Label htmlFor="baseline" className="text-xs text-muted-foreground cursor-pointer">
            Compare to baseline
          </Label>
        </div>
      </div>

      {/* Contextual label */}
      {selected && (
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-secondary/50 border border-border">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-4 w-4 text-primary" />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-foreground">
              Viewing data for {selected.name}
            </span>
            <Badge className={`${statusColor(selected.status)} border-0 text-xs`}>
              {selected.status}
            </Badge>
            <span className="text-xs text-muted-foreground">
              Age {selected.age} · {selected.room} · {selected.unit}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResidentSelector;
export type { TimeRange };
