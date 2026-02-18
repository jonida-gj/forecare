import { TrendingDown, Settings, Stethoscope, ShieldCheck, Award, Eye } from "lucide-react";

const values = [
  {
    icon: TrendingDown,
    title: "Reduce hospitalizations",
    description: "Early detection of deterioration enables timely interventions that prevent avoidable hospital transfers.",
  },
  {
    icon: Settings,
    title: "Improve operational efficiency",
    description: "Smart prioritization helps care teams focus their limited time on residents who need attention most.",
  },
  {
    icon: Stethoscope,
    title: "Support clinical decisions",
    description: "Explainable AI insights give clinicians actionable context without replacing their judgment.",
  },
  {
    icon: ShieldCheck,
    title: "Enhance resident safety",
    description: "Continuous monitoring closes visibility gaps and catches changes that periodic assessments miss.",
  },
  {
    icon: Award,
    title: "Improve care quality",
    description: "Data-driven insights and intervention tracking help organizations measure and elevate their standard of care.",
  },
  {
    icon: Eye,
    title: "Real-time visibility",
    description: "Administrators and care leads gain a live operational view across all residents and units.",
  },
];

const ValueSection = () => {
  return (
    <section className="section-padding bg-gradient-subtle">
      <div className="container-narrow">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Value for care providers</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Measurable impact on care outcomes
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            ForeCare is designed to deliver tangible operational and clinical value to senior care organizations.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {values.map((item) => (
            <div key={item.title} className="flex gap-4">
              <div className="flex-shrink-0 h-11 w-11 rounded-xl bg-secondary flex items-center justify-center">
                <item.icon className="h-5 w-5 text-primary" />
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

export default ValueSection;
