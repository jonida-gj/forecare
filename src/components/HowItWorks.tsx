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
      "Continuous physiological monitoring via wearable devices that capture vitals, movement, and sleep patterns in real time.",
  },
  {
    image: hwApp,
    title: "Data transfer",
    description:
      "Sensor data is securely transmitted via Bluetooth to a mobile app, then forwarded automatically to the ForeCare Cloud.",
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
      <div className="container-narrow">
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

        {/* Visual flow */}
        <div className="relative flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-0">
          {steps.map((step, index) => (
            <div key={step.title} className="relative flex flex-col items-center lg:flex-1">
              {/* Image */}
              <div className="relative h-48 w-48 flex items-center justify-center mb-6">
                <img
                  src={step.image}
                  alt={step.title}
                  className="max-h-full max-w-full object-contain drop-shadow-md"
                />
              </div>

              {/* Connector icon between steps (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-20 -right-4 z-10 h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow">
                  {(() => {
                    const Icon = connectorIcons[index];
                    return <Icon className="h-4 w-4" />;
                  })()}
                </div>
              )}

              {/* Dotted connector line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-[5.5rem] left-[60%] w-[80%] border-t-2 border-dashed border-primary/30" />
              )}

              {/* Mobile connector arrow */}
              {index < steps.length - 1 && (
                <div className="lg:hidden flex flex-col items-center -my-2 mb-2">
                  <div className="h-8 border-l-2 border-dashed border-primary/30" />
                  <div className="h-3 w-3 rounded-full bg-primary/40" />
                </div>
              )}

              {/* Text */}
              <h3 className="text-base font-bold text-foreground mb-2 text-center">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed text-center max-w-[240px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
