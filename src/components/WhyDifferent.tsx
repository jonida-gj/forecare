import { ArrowRight, Lightbulb, RefreshCw, Brain, Workflow, Layers, Radio } from "lucide-react";

const differentiators = [
  {
    icon: ArrowRight,
    title: "Predictive vs reactive care",
    description: "Move from responding to crises to anticipating and preventing them.",
  },
  {
    icon: RefreshCw,
    title: "Continuous intelligence",
    description: "Always-on monitoring and analysis, not periodic assessments that miss critical changes.",
  },
  {
    icon: Brain,
    title: "Explainable AI insights",
    description: "Transparent reasoning behind every alert so clinicians can trust and act on the recommendations.",
  },
  {
    icon: Workflow,
    title: "Designed for real workflows",
    description: "Built around how care teams actually work, not how technology assumes they should.",
  },
  {
    icon: Layers,
    title: "Works with existing systems",
    description: "Integrates with your current EHR, clinical, and operational infrastructure.",
  },
  {
    icon: Radio,
    title: "Optional sensor layer",
    description: "Deploy our wearable ring when on-site sensor infrastructure is unavailable.",
  },
];

const WhyDifferent = () => {
  return (
    <section className="section-padding bg-gradient-subtle">
      <div className="container-narrow px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center mb-10 md:mb-14">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary mb-3">Why ForeCare</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-foreground">
            Built different, because care deserves better
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            ForeCare is engineered from the ground up as a predictive care intelligence platform — not a retrofitted monitoring tool.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {differentiators.map((item) => (
            <div key={item.title} className="flex gap-4 rounded-xl bg-card border border-border p-6 shadow-card">
              <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <item.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyDifferent;
