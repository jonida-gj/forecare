import { Activity, TrendingUp, Bell, ClipboardList, BarChart3, Wifi } from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "Resident risk scoring",
    description: "Each resident receives a continuously updated risk score based on multiple health indicators.",
  },
  {
    icon: TrendingUp,
    title: "Trend monitoring",
    description: "Track changes in vitals, activity, and behavior over time to identify developing risks.",
  },
  {
    icon: Bell,
    title: "Alert triage",
    description: "Intelligent filtering ensures clinically relevant alerts surface first, reducing fatigue.",
  },
  {
    icon: ClipboardList,
    title: "Intervention tracking",
    description: "Log and monitor care actions taken in response to alerts for accountability and quality assurance.",
  },
  {
    icon: BarChart3,
    title: "Reporting and analytics",
    description: "Detailed reports on risk trends, response times, and outcomes for quality improvement.",
  },
  {
    icon: Wifi,
    title: "Monitoring coverage insights",
    description: "Visibility into data completeness and sensor coverage across your resident population.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="section-padding bg-background">
      <div className="container-narrow">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Platform features</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Purpose-built for predictive care
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every feature is designed around the needs of care teams managing complex resident populations.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-elevated transition-all duration-300"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <feature.icon className="h-5 w-5 text-primary" />
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

export default FeaturesSection;
