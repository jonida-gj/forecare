import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const DemoRequest = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    role: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Demo request received",
      description: "Thank you for your interest. Our team will be in touch within 24 hours.",
    });
    setFormData({ name: "", organization: "", role: "", email: "", message: "" });
  };

  return (
    <section id="demo" className="section-padding bg-gradient-subtle">
      <div className="container-narrow px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary mb-3">Get started</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-foreground">
              Start a pilot program
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              See how ForeCare can improve care outcomes for your organization. Request a personalized demo and discover what predictive care intelligence can do for your team.
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                Personalized walkthrough of the platform
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                Discussion of your organization's specific needs
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                No commitment required
              </li>
            </ul>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card p-8 shadow-elevated"
          >
            <h3 className="text-xl font-semibold text-foreground mb-6">Request a demo</h3>
            <div className="space-y-4">
              <Input
                placeholder="Full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                maxLength={100}
              />
              <Input
                placeholder="Organization"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                required
                maxLength={200}
              />
              <Input
                placeholder="Role / title"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
                maxLength={100}
              />
              <Input
                type="email"
                placeholder="Work email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                maxLength={255}
              />
              <Textarea
                placeholder="Tell us about your needs (optional)"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
                maxLength={1000}
              />
              <Button type="submit" className="w-full h-12" size="lg">
                Request a demo
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground text-center">
              We'll respond within 24 hours. Your data is handled in accordance with our privacy policy.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DemoRequest;
