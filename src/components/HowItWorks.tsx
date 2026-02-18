import { Database, Brain, BarChart3, HeartPulse, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Database,
    label: "Data collection",
    description: "Continuous data from sensors, devices, and clinical systems",
  },
  {
    icon: Brain,
    label: "AI analysis",
    description: "Machine learning models detect patterns and anomalies",
  },
  {
    icon: BarChart3,
    label: "Risk insights",
    description: "Prioritized alerts with explainable risk scores",
  },
  {
    icon: HeartPulse,
    label: "Care action",
    description: "Teams respond proactively with guided interventions",
  },
  {
    icon: TrendingUp,
    label: "Improved outcomes",
    description: "Reduced hospitalizations and better resident safety",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-padding bg-background">
      <div className="container-narrow">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">How it works</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            From data to better care in five steps
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            ForeCare creates a continuous intelligence loop that transforms raw health data into proactive care decisions.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-px bg-border" />

          <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-5">
            {steps.map((step, index) => (
              <div key={step.label} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
                  <step.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                  Step {index + 1}
                </span>
                <h3 className="text-base font-semibold text-foreground mb-1">{step.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
