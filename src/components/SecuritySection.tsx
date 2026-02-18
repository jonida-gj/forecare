import { Shield, Lock, Fingerprint, Cloud, Users } from "lucide-react";

const trustItems = [
  { icon: Shield, label: "GDPR compliant" },
  { icon: Lock, label: "Encrypted data" },
  { icon: Fingerprint, label: "Privacy by design" },
  { icon: Cloud, label: "Secure cloud infrastructure" },
  { icon: Users, label: "Role-based access control" },
];

const SecuritySection = () => {
  return (
    <section id="security" className="section-padding bg-background">
      <div className="container-narrow">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Security & compliance</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Trusted infrastructure for sensitive data
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            ForeCare is built with security, privacy, and regulatory compliance at its core. Your residents' data is protected at every layer.
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {trustItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-full border border-border bg-card px-5 py-3 shadow-card"
              >
                <item.icon className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
