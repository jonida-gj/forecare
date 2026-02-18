import { AlertTriangle, Eye, Users, Activity, Clock } from "lucide-react";

const problems = [
  {
    icon: AlertTriangle,
    title: "Reactive care models",
    description: "Care teams respond to crises instead of preventing them, leading to avoidable emergencies and hospitalizations.",
  },
  {
    icon: Eye,
    title: "Limited visibility",
    description: "Changes in resident health often go undetected until symptoms escalate, leaving little time for effective intervention.",
  },
  {
    icon: Users,
    title: "Staff overload",
    description: "Caregivers juggle large caseloads without tools to prioritize, making it difficult to allocate attention where it's needed most.",
  },
  {
    icon: Activity,
    title: "Preventable hospitalizations",
    description: "Without early warning systems, avoidable hospital transfers increase costs and disrupt continuity of care.",
  },
  {
    icon: Clock,
    title: "Missed early warning signs",
    description: "Subtle changes in vitals, activity, and behavior go unnoticed without continuous monitoring and intelligent analysis.",
  },
];

const ProblemSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-narrow px-4 sm:px-6">
        <div className="max-w-2xl mb-10 md:mb-14">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary mb-3">The challenge</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-foreground">
            Senior care is built on reactive models
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Most care organizations lack the visibility and tools to detect early signs of health deterioration — resulting in delayed responses, preventable hospitalizations, and compromised resident safety.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="group rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-elevated transition-shadow duration-300"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <problem.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{problem.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
