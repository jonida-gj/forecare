import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import heroBg from "@/assets/hero-bg.jpg";
import { Play } from "lucide-react";

const Hero = () => {
  const { demoLogin } = useAuth();
  const navigate = useNavigate();

  const handleDemoLogin = () => {
    demoLogin();
    navigate("/dashboard");
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-hero" style={{ opacity: 0.85 }} />
      </div>

      <div className="relative container-narrow px-6 md:px-8 pt-28 pb-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4 animate-fade-in">
            Predictive care intelligence
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Identify risk before it becomes critical.
          </h1>
          <p
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            ForeCare delivers continuous monitoring and AI-powered risk insights to help care teams detect early signals, prioritize attention, and improve resident outcomes.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Button size="lg" asChild>
              <Link to="/request-demo">Request a demo</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/login">Enterprise Login</Link>
            </Button>
            <Button variant="ghost" size="lg" onClick={handleDemoLogin} className="gap-2">
              <Play className="h-4 w-4" />
              Try live demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
