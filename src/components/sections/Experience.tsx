import { experienceData } from "@/lib/data";
import {
  BriefcaseBusiness,
  CalendarRange,
  MessageSquare,
  ShoppingBag,
  Video,
} from "lucide-react";
import { forwardRef, useEffect, useRef, useState } from "react";

const Experience = forwardRef<HTMLElement>((props, ref) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Get icon component based on icon name from data
  const getProjectIcon = (iconName?: string) => {
    if (!iconName) return null;

    switch (iconName) {
      case "video":
        return <Video className="h-4 w-4 text-teal-600" />;
      case "message":
        return <MessageSquare className="h-4 w-4 text-teal-600" />;
      case "shopping":
        return <ShoppingBag className="h-4 w-4 text-teal-600" />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReduceMotion(mq.matches);
    handleChange();
    if (mq.addEventListener) mq.addEventListener("change", handleChange);
    else mq.addListener(handleChange);
    return () => {
      if (mq.removeEventListener)
        mq.removeEventListener("change", handleChange);
      else mq.removeListener(handleChange);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const toggle = (i: number) => {
    setExpandedIndex((prev) => (prev === i ? null : i));

    // Scroll expanded card into view with offset for fixed nav
    if (expandedIndex !== i) {
      setTimeout(() => {
        const card = cardRefs.current[i];
        if (card) {
          const offset = 100; // Account for fixed nav
          const elementPosition = card.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  };

  useEffect(() => {
    if (reduceMotion) {
      contentRefs.current.forEach((el, idx) => {
        if (!el) return;
        if (expandedIndex === idx) {
          el.style.maxHeight = "none";
          el.style.opacity = "1";
        } else {
          el.style.maxHeight = "0px";
          el.style.opacity = "0";
        }
      });
      return;
    }

    contentRefs.current.forEach((el, idx) => {
      if (!el) return;
      el.style.overflow = "hidden";
      el.style.transition =
        "max-height 300ms ease-in-out, opacity 300ms ease-in-out";

      if (expandedIndex === idx) {
        const scrollH = el.scrollHeight;
        requestAnimationFrame(() => {
          el.style.maxHeight = `${scrollH}px`;
          el.style.opacity = "1";
        });
      } else {
        el.style.maxHeight = "0px";
        el.style.opacity = "0";
      }
    });
  }, [expandedIndex, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const onResize = () => {
      if (expandedIndex === null) return;
      const el = contentRefs.current[expandedIndex];
      if (el) el.style.maxHeight = `${el.scrollHeight}px`;
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [expandedIndex, reduceMotion]);

  return (
    <section ref={ref} id="experience" className="section-scroll">
      <div className="opacity-0" ref={containerRef}>
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <BriefcaseBusiness className="h-6 w-6" />
          Experience
        </h2>

        <div className="space-y-0">
          {experienceData.map((exp, index) => {
            return (
              <div
                key={index}
                className="relative animate-fade-in group"
                style={{ animationDelay: `${index * 150}ms` }}
                ref={(el) => (cardRefs.current[index] = el)}
              >
                {/* Split-Screen Layout */}
                <div
                  className={`
                    relative
                    border border-border/40 md:border-0
                    md:border-b md:border-border/40 last:border-b-0
                    rounded-lg md:rounded-none
                    mb-4 md:mb-0
                    transition-all duration-300 ease-in-out
                    hover:bg-muted/20
                    ${expandedIndex === index ? "bg-muted/30" : ""}
                  `}
                >
                  <div className="grid md:grid-cols-[280px_1fr] gap-6 py-6 px-4 md:px-6">
                    {/* Left Side - Company & Timeline (Fixed on Desktop) */}
                    <div className="md:pr-6 md:border-r md:border-border/40">
                      <div className="md:sticky md:top-24">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <CalendarRange className="h-4 w-4 text-teal-600" />
                          <span className="font-medium">{exp.dates}</span>
                        </div>
                        <h3 className="font-bold text-lg text-foreground mb-1 group-hover:text-teal-600 transition-colors">
                          {exp.company}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {exp.role}
                        </p>
                      </div>
                    </div>

                    {/* Right Side - Details */}
                    <div className="md:pl-2">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getProjectIcon(exp.projectIcon)}
                            <p className="text-base font-semibold text-foreground/90">
                              {exp.project}
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                            {exp.summary}
                          </p>
                        </div>

                        <button
                          id={`exp-trigger-${index}`}
                          onClick={() => toggle(index)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              toggle(index);
                            }
                          }}
                          aria-expanded={expandedIndex === index}
                          aria-controls={`exp-details-${index}`}
                          className="flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-md bg-muted hover:bg-teal-600/10 hover:text-teal-600 text-muted-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-teal-600/50"
                        >
                          {expandedIndex === index ? "Less" : "Details"}
                        </button>
                      </div>

                      {/* Tech tags */}
                      {exp.tech && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {exp.tech.map((tech, i) => (
                            <span
                              key={i}
                              className="text-xs px-2.5 py-1 bg-muted text-muted-foreground rounded-md font-medium group-hover:bg-teal-600/10 group-hover:text-teal-600 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Expandable details */}
                      <div
                        id={`exp-details-${index}`}
                        role="region"
                        aria-labelledby={`exp-trigger-${index}`}
                        ref={(el) => (contentRefs.current[index] = el)}
                        style={{ maxHeight: "0px", opacity: 0 }}
                      >
                        <div className="pt-4 mt-4 border-t border-border/30">
                          {exp.responsibilities && (
                            <div className="mb-5">
                              <p className="font-semibold mb-2.5 text-sm text-foreground flex items-center gap-2">
                                <span className="w-1 h-4 bg-teal-600 rounded-full"></span>
                                Responsibilities
                              </p>
                              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 leading-relaxed ml-3">
                                {exp.responsibilities.map((resp, i) => (
                                  <li key={i}>{resp}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {exp.projects &&
                            Object.keys(exp.projects).map((project, i) => (
                              <div key={i} className="mb-5 last:mb-0">
                                <p className="font-semibold mb-2.5 text-sm text-foreground flex items-center gap-2">
                                  <span className="w-1 h-4 bg-teal-600 rounded-full"></span>
                                  {project}
                                </p>
                                <ul className="list-disc list-inside text-sm text-muted-foreground ml-5 space-y-2 leading-relaxed">
                                  {exp.projects![project].map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Teal accent line on left edge */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-teal-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

Experience.displayName = "Experience";
export default Experience;
