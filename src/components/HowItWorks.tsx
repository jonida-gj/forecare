import hwSensor from "@/assets/hw-sensor.png";
import hwApp from "@/assets/hw-app.png";
import hwCloud from "@/assets/hw-cloud.png";
import hwDashboard from "@/assets/hw-dashboard.png";
import { Bluetooth, Wifi, RefreshCw } from "lucide-react";

const steps = [
  {
    image: hwSensor,
    title: "Wearable sensors",
    description:
      "ForeCare supports integration with third-party monitoring devices while providing an optional ring to ensure consistent and continuous monitoring where needed.",
  },
  {
    image: hwApp,
    title: "Patient app",
    description:
      "The patient app uses the phone's internet connection to automatically transfer all data to the ForeCare Cloud.",
  },
  {
    image: hwCloud,
    title: "ForeCare Cloud & AI",
    description:
      "Our cloud platform securely stores all data and applies machine learning models to detect risk patterns and anomalies.",
  },
  {
    image: hwDashboard,
    title: "Care dashboard",
    description:
      "Care teams access prioritized alerts, risk scores, and guided interventions through the ForeCare portal — in real time.",
  },
];

const connectorIcons = [Bluetooth, Wifi, RefreshCw];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-padding bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            How it works
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            How the ForeCare monitoring platform works
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            ForeCare is a full-stack care intelligence platform — from wearable
            sensors to AI-powered dashboards — designed for senior care
            facilities and clinical environments.
          </p>
        </div>

        {/* Horizontal flow - Empatica style */}
        <div className="hidden md:block relative">
          {/* The four items in a row */}
          <div className="flex items-start justify-between relative">
            {steps.map((step, index) => (
              <div key={step.title} className="relative flex flex-col items-center flex-1">
                {/* Image container */}
                <div className="relative h-56 w-full flex items-end justify-center mb-8">
                  <img
                    src={step.image}
                    alt={step.title}
                    className={`object-contain drop-shadow-lg ${
                      index === 0 ? "max-h-52 max-w-[220px]" :
                      index === 1 ? "max-h-56 max-w-[160px]" :
                      index === 2 ? "max-h-48 max-w-[200px]" :
                      "max-h-48 max-w-[260px]"
                    }`}
                  />
                </div>

                {/* Text */}
                <h3 className="text-lg font-bold text-foreground mb-2 text-center">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed text-center max-w-[260px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* SVG curved dotted connectors with icons */}
          <svg
            className="absolute top-0 left-0 w-full h-56 pointer-events-none"
            viewBox="0 0 1200 240"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Connector 1: Sensor → App */}
            <path
              d="M 200 160 Q 300 40 400 140"
              stroke="hsl(var(--primary))"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              strokeOpacity="0.4"
              fill="none"
            />
            {/* Connector 2: App → Cloud */}
            <path
              d="M 500 140 Q 600 30 700 130"
              stroke="hsl(var(--primary))"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              strokeOpacity="0.4"
              fill="none"
            />
            {/* Connector 3: Cloud → Dashboard */}
            <path
              d="M 800 130 Q 900 20 1000 120"
              stroke="hsl(var(--primary))"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              strokeOpacity="0.4"
              fill="none"
            />
          </svg>

          {/* Connector icons */}
          {connectorIcons.map((Icon, index) => (
            <div
              key={index}
              className="absolute top-16 z-10 h-10 w-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
              style={{
                left: `${25 * (index + 1)}%`,
                transform: "translateX(-50%)",
              }}
            >
              <Icon className="h-4 w-4" />
            </div>
          ))}
        </div>

        {/* Mobile vertical layout */}
        <div className="md:hidden flex flex-col items-center gap-4">
          {steps.map((step, index) => (
            <div key={step.title} className="flex flex-col items-center">
              <div className="h-44 w-44 flex items-center justify-center mb-4">
                <img
                  src={step.image}
                  alt={step.title}
                  className="max-h-full max-w-full object-contain drop-shadow-md"
                />
              </div>
              <h3 className="text-base font-bold text-foreground mb-1 text-center">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed text-center max-w-[260px] mb-2">
                {step.description}
              </p>
              {index < steps.length - 1 && (
                <div className="flex flex-col items-center my-2">
                  <div className="h-8 border-l-2 border-dashed border-primary/30" />
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md">
                    {(() => {
                      const Icon = connectorIcons[index];
                      return <Icon className="h-3.5 w-3.5" />;
                    })()}
                  </div>
                  <div className="h-8 border-l-2 border-dashed border-primary/30" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
