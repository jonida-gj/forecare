import {
  Moon, Thermometer, Wind, HeartPulse, Activity, Flame,
  Footprints, Timer, PersonStanding, Brain, Move, Watch,
  BarChart3, ScanLine, Route, Zap
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Parameter {
  icon: LucideIcon;
  label: string;
}

const parameters: Parameter[] = [
  { icon: Moon, label: "Sleep Detection" },
  { icon: Thermometer, label: "Temperature" },
  { icon: Wind, label: "Blood Oxygen Saturation" },
  { icon: BarChart3, label: "Respiratory Rate" },
  { icon: HeartPulse, label: "Pulse Rate" },
  { icon: Activity, label: "Pulse Rate Variability" },
  { icon: Move, label: "Activity Recognition" },
  { icon: Flame, label: "Energy Expenditure" },
  { icon: Footprints, label: "Gait" },
  { icon: Route, label: "Spatiotemporal Gait Analysis" },
  { icon: PersonStanding, label: "Body Position" },
  { icon: Zap, label: "Autonomic Arousal" },
  { icon: Brain, label: "Movement Disorder Indicators" },
  { icon: ScanLine, label: "Actigraphy" },
  { icon: Timer, label: "6 Minute Walk Test" },
  { icon: Watch, label: "Wearing Detection" },
];

// Double the items for seamless loop
const loopedParameters = [...parameters, ...parameters];

const ParameterCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number>();
  const scrollPos = useRef(0);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 200;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const speed = 0.5; // px per frame
    const halfWidth = el.scrollWidth / 2;

    const animate = () => {
      if (!isPaused && el) {
        scrollPos.current += speed;
        if (scrollPos.current >= halfWidth) {
          scrollPos.current -= halfWidth;
        }
        el.scrollLeft = scrollPos.current;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPaused]);

  // Sync scrollPos when user manually scrolls
  const handleScroll = () => {
    if (scrollRef.current && isPaused) {
      scrollPos.current = scrollRef.current.scrollLeft;
    }
  };

  return (
    <section id="parameters" className="section-padding bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Parameters
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-foreground">
            Continuous monitoring across key health signals
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            ForeCare tracks physiological and behavioral parameters to detect
            early changes.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative group">
          {/* Navigation arrows */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-card shadow-elevated flex items-center justify-center text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100 -translate-x-1/2"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-card shadow-elevated flex items-center justify-center text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100 translate-x-1/2"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Edge fades */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-[1] pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-[1] pointer-events-none" />

          {/* Scrollable strip */}
          <div
            ref={scrollRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onScroll={handleScroll}
            className="flex gap-3 sm:gap-5 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing py-4 touch-pan-x"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {loopedParameters.map((param, index) => {
              const Icon = param.icon;
              return (
                <div
                  key={`${param.label}-${index}`}
                  className="flex-shrink-0 flex flex-col items-center justify-center w-[100px] h-[100px] sm:w-[130px] sm:h-[120px] rounded-xl border border-border bg-card shadow-card hover:shadow-elevated hover:scale-105 hover:border-primary/30 transition-all duration-300 group/tile"
                  title="Continuous monitoring signal"
                >
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center mb-3 group-hover/tile:bg-primary/10 transition-colors duration-300">
                    <Icon className="h-5 w-5 text-primary" strokeWidth={1.8} />
                  </div>
                  <span className="text-xs font-medium text-foreground text-center leading-tight px-2">
                    {param.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer line */}
        <p className="text-center text-sm text-muted-foreground mt-10 tracking-wide">
          Digital signals continuously analyzed.
        </p>
      </div>
    </section>
  );
};

export default ParameterCarousel;
