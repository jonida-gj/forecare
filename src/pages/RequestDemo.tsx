import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Send, CheckCircle } from "lucide-react";

const RequestDemo = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20">
        <section className="container-narrow px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: info */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
                Get started
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Request a demo
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                See how ForeCare helps care teams detect early signs of decline, reduce preventable hospitalizations, and improve resident outcomes.
              </p>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Personalized walkthrough of the platform</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>See real dashboards with sample data</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Discuss integration with your existing systems</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>No commitment required</span>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <Card className="shadow-elevated">
              <CardContent className="p-6">
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">Thank you!</h3>
                    <p className="text-sm text-muted-foreground">
                      We'll be in touch within 24 hours to schedule your demo.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Full name</label>
                      <Input required placeholder="Dr. Jane Smith" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Organization</label>
                      <Input required placeholder="Sunrise Senior Living" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Your role</label>
                      <Input required placeholder="Care Manager" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Business email</label>
                      <Input type="email" required placeholder="you@organization.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Message (optional)</label>
                      <Textarea placeholder="Tell us about your facility and needs..." rows={3} />
                    </div>
                    <Button type="submit" className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Request demo
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RequestDemo;
