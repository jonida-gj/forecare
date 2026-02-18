import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, FileCheck, Server, Users } from "lucide-react";

const features = [
  {
    icon: Lock,
    title: "Encryption in Transit & at Rest",
    description: "All data is encrypted using TLS 1.3 in transit and AES-256 at rest. Resident health data is never stored unprotected.",
  },
  {
    icon: Users,
    title: "Role-Based Access Control",
    description: "Granular permissions ensure that staff, care managers, and admins only see the data relevant to their role.",
  },
  {
    icon: Eye,
    title: "Audit Logs",
    description: "Every access, change, and action within the platform is logged with timestamps and user attribution for full traceability.",
  },
  {
    icon: FileCheck,
    title: "GDPR-Aligned Privacy by Design",
    description: "ForeCare is built with privacy-by-design principles. Data minimization, purpose limitation, and resident consent are embedded in every workflow.",
  },
  {
    icon: Server,
    title: "EU Data Residency",
    description: "All data is processed and stored within EU-based infrastructure, ensuring compliance with European data sovereignty requirements.",
  },
  {
    icon: Shield,
    title: "Continuous Security Monitoring",
    description: "Our infrastructure is monitored 24/7 for vulnerabilities, with regular penetration testing and security assessments.",
  },
];

const Security = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20">
        <section className="container-narrow px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
              Trust & Security
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Enterprise-grade security for healthcare data
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              ForeCare is designed from the ground up to protect sensitive health information while enabling care teams to work effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg border border-border bg-card p-6 shadow-card hover:shadow-elevated transition-shadow"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-xl bg-secondary/50 border border-border p-8 text-center">
            <Shield className="h-8 w-8 text-primary mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-foreground mb-2">Compliance commitment</h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              ForeCare maintains alignment with GDPR, and is designed to support healthcare organizations in meeting their regulatory obligations. We work with each customer to ensure deployment meets their specific compliance requirements.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Security;
