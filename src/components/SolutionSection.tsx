import { Brain, Monitor, LayoutDashboard, Bell, ClipboardCheck, Watch } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Predictive risk detection",
    description: "AI-driven engine identifies early indicators of health deterioration before clinical symptoms fully manifest.",
  },
  {
    icon: Monitor,
    title: "Continuous monitoring",
    description: "Round-the-clock data collection from multiple sources ensures no change goes unnoticed.",
  },
  {
    icon: LayoutDashboard,
    title: "Caregiver dashboard",
    description: "A unified interface that provides care teams with real-time insights and actionable intelligence.",
  },
  {
    icon: Bell,
    title: "Alert prioritization",
    description: "Smart triage ensures the most critical cases receive immediate attention from the right team members.",
  },
  {
    icon: ClipboardCheck,
    title: "Intervention tracking",
    description: "Document and track care actions taken in response to alerts, building a comprehensive care record.",
  },
  {
    icon: Watch,
    title: "Optional wearable integration",
    description: "When sensor infrastructure is unavailable, our wearable ring provides a seamless monitoring layer.",
  },
];

const SolutionSection = () => {
  return (
    <section id="solution" className="section-padding bg-gradient-subtle">
      <div className="container-narrow">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">The platform</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Predictive care intelligence, built for real workflows
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            ForeCare transforms fragmented data into continuous, actionable risk insights — enabling care teams to intervene earlier and with greater confidence.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-elevated transition-all duration-300"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
                <feature.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
