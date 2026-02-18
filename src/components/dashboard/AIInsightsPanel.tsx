import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Brain, ChevronDown, ChevronUp, Activity, Moon, Footprints,
  Heart, Thermometer, Wind, Eye, TrendingDown, Zap, Watch,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface EvidenceSignal {
  label: string;
  icon: typeof Activity;
  value: string;
  deviation: string;
  severity: "high" | "medium" | "low";
}

interface AIInsight {
  category: string;
  whatChanged: string;
  whyItMatters: string;
  signals: EvidenceSignal[];
  actions: string[];
  confidence: number;
  timeframe: string;
}

const insights: AIInsight[] = [
  {
    category: "Mobility",
    whatChanged: "Daily step count dropped from 3,200 to 1,200 steps over 7 days — a 62% decline below personal baseline.",
    whyItMatters: "Sustained mobility reduction is a strong predictor of fall risk and functional decline. Combined with gait instability signals, this suggests increased vulnerability.",
    signals: [
      { label: "Activity", icon: Footprints, value: "1,200 steps/day", deviation: "−62% from baseline", severity: "high" },
      { label: "Gait stability", icon: Activity, value: "Score 3.1/10", deviation: "Below threshold", severity: "high" },
      { label: "6MWT estimate", icon: Watch, value: "~180m", deviation: "−40% from baseline", severity: "medium" },
      { label: "Body position", icon: Eye, value: "Sedentary 78%", deviation: "+30% from baseline", severity: "medium" },
    ],
    actions: [
      "Schedule physiotherapy assessment within 24 hours",
      "Increase safety check frequency to every 30 minutes",
      "Review fall prevention protocol",
    ],
    confidence: 91,
    timeframe: "Past 7 days",
  },
  {
    category: "Sleep",
    whatChanged: "Sleep duration averaging 4.0 hours with 4+ wake episodes nightly. REM and deep sleep phases significantly reduced.",
    whyItMatters: "Chronic sleep deprivation in elderly patients accelerates cognitive decline and increases fall risk. This pattern correlates with onset of delirium in similar profiles.",
    signals: [
      { label: "Sleep duration", icon: Moon, value: "4.0h avg", deviation: "−43% from baseline 7h", severity: "high" },
      { label: "Actigraphy", icon: Activity, value: "Restless index 7.2", deviation: "Above threshold 4.0", severity: "high" },
      { label: "Autonomic arousal", icon: Zap, value: "Elevated", deviation: "3.2x baseline events", severity: "medium" },
    ],
    actions: [
      "Review sleep hygiene interventions",
      "Consider medication timing adjustment",
      "Monitor for signs of delirium onset",
    ],
    confidence: 87,
    timeframe: "Past 5 days",
  },
  {
    category: "Vitals",
    whatChanged: "Resting heart rate elevated +18 bpm above personal baseline. Heart rate variability (HRV) decreased by 25%.",
    whyItMatters: "Elevated HR with reduced HRV may indicate physiological stress, infection onset, or autonomic dysfunction. Requires clinical evaluation to determine underlying cause.",
    signals: [
      { label: "Heart rate", icon: Heart, value: "88 bpm resting", deviation: "+18 bpm above baseline", severity: "high" },
      { label: "HRV", icon: Activity, value: "28ms RMSSD", deviation: "−25% from baseline", severity: "medium" },
      { label: "SpO2", icon: Wind, value: "94%", deviation: "−2% from baseline 96%", severity: "medium" },
      { label: "Temperature", icon: Thermometer, value: "37.3°C", deviation: "+0.5°C above baseline", severity: "low" },
      { label: "Respiratory rate", icon: Wind, value: "19/min", deviation: "+3 from baseline", severity: "low" },
    ],
    actions: [
      "Perform vitals check within 20 minutes",
      "Request physician review if HR remains elevated",
      "Monitor SpO2 trends over next 12 hours",
    ],
    confidence: 82,
    timeframe: "Past 48 hours",
  },
];

function confidenceColor(c: number) {
  if (c >= 85) return "text-status-stable";
  if (c >= 70) return "text-status-monitor";
  return "text-status-high-risk";
}

function severityDot(s: "high" | "medium" | "low") {
  if (s === "high") return "bg-status-high-risk";
  if (s === "medium") return "bg-status-monitor";
  return "bg-status-stable";
}

const AIInsightsPanel = () => {
  const [expandedIdx, setExpandedIdx] = useState<number>(0);

  return (
    <Card className="shadow-card border-primary/20 bg-gradient-to-br from-primary/[0.03] to-transparent">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Brain className="h-4 w-4 text-primary" />
          AI Insights
          <Badge className="bg-primary/10 text-primary border-0 text-[10px] ml-1">
            {insights.length} signals analyzed
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.map((insight, i) => {
          const isExpanded = expandedIdx === i;
          return (
            <div
              key={i}
              className="rounded-lg border border-border bg-card p-4 transition-all"
            >
              {/* Header row */}
              <button
                className="w-full flex items-center justify-between text-left"
                onClick={() => setExpandedIdx(isExpanded ? -1 : i)}
              >
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-status-high-risk" />
                  <span className="text-sm font-semibold text-foreground">{insight.category}</span>
                  <span className="text-xs text-muted-foreground">· {insight.timeframe}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium ${confidenceColor(insight.confidence)}`}>
                    {insight.confidence}% confidence
                  </span>
                  {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </div>
              </button>

              {isExpanded && (
                <div className="mt-4 space-y-4">
                  {/* What changed */}
                  <div>
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">What Changed</p>
                    <p className="text-sm text-foreground leading-relaxed">{insight.whatChanged}</p>
                  </div>

                  {/* Why it matters */}
                  <div>
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">Why It Matters</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{insight.whyItMatters}</p>
                  </div>

                  {/* Evidence signals */}
                  <div>
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">Evidence Signals</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {insight.signals.map((s, j) => (
                        <div key={j} className="flex items-center gap-2.5 bg-muted/50 rounded-md px-3 py-2">
                          <div className={`h-1.5 w-1.5 rounded-full ${severityDot(s.severity)}`} />
                          <s.icon className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-foreground">{s.label}: {s.value}</p>
                            <p className="text-[10px] text-muted-foreground">{s.deviation}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended actions */}
                  <div>
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Recommended Actions</p>
                    {insight.actions.map((a, j) => (
                      <div key={j} className="flex items-center gap-2 mb-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-xs text-foreground">{a}</span>
                      </div>
                    ))}
                  </div>

                  {/* Confidence bar */}
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-muted-foreground">Confidence</span>
                    <Progress value={insight.confidence} className="h-1.5 flex-1" />
                    <span className={`text-xs font-medium ${confidenceColor(insight.confidence)}`}>
                      {insight.confidence}%
                    </span>
                  </div>

                  <p className="text-[10px] text-muted-foreground italic">
                    This is a decision-support insight, not a clinical diagnosis. Always apply clinical judgment.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default AIInsightsPanel;
