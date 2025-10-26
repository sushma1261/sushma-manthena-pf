import { experienceData } from "@/lib/data";
import { BriefcaseBusiness, CalendarRange } from "lucide-react";
import { forwardRef, useEffect, useRef, useState } from "react";

const Experience = forwardRef<HTMLElement>((props, ref) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

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

        <div className="space-y-1">
          {experienceData.map((exp, index) => {
            return (
              <div
                key={index}
                className="relative animate-fade-in group"
                style={{ animationDelay: `${index * 150}ms` }}
                ref={(el) => (cardRefs.current[index] = el)}
              >
                {/* Minimalist Card */}
                <div
                  className={`
                    relative
                    border-b border-border/50 last:border-b-0
                    transition-all duration-300 ease-in-out
                    hover:bg-muted/30
                    ${expandedIndex === index ? "bg-muted/40" : ""}
                  `}
                >
                  <div className="py-6 px-4 md:px-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-1">
                          <h3 className="font-bold text-xl text-foreground group-hover:text-teal-600 transition-colors">
                            {exp.role}
                          </h3>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                          <p className="font-medium">{exp.company}</p>
                          <span className="hidden sm:inline text-border">
                            •
                          </span>
                          <div className="flex items-center gap-1.5">
                            <CalendarRange className="h-3.5 w-3.5" />
                            <span>{exp.dates}</span>
                          </div>
                        </div>
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
                        className="flex-shrink-0 text-xs font-medium text-muted-foreground hover:text-teal-600 transition-colors underline decoration-dotted underline-offset-4 focus:outline-none focus:text-teal-600"
                      >
                        {expandedIndex === index ? "Less" : "More"}
                      </button>
                    </div>

                    <p className="text-sm font-medium text-foreground/80 mb-2">
                      {exp.project}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {exp.summary}
                    </p>

                    {/* Tech tags */}
                    {exp.tech && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {exp.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-0.5 text-muted-foreground border border-border/60 rounded group-hover:border-teal-600/40 group-hover:text-teal-600 transition-colors"
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
                          <div className="mb-4">
                            <p className="font-semibold mb-2 text-sm text-foreground/90">
                              Responsibilities:
                            </p>
                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5 leading-relaxed">
                              {exp.responsibilities.map((resp, i) => (
                                <li key={i}>{resp}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {exp.projects &&
                          Object.keys(exp.projects).map((project, i) => (
                            <div key={i} className="mb-4 last:mb-0">
                              <p className="font-semibold mb-2 text-sm text-foreground/90">
                                {project}:
                              </p>
                              <ul className="list-disc list-inside text-sm text-muted-foreground ml-4 space-y-1.5 leading-relaxed">
                                {exp.projects![project].map((item, idx) => (
                                  <li key={idx}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Teal accent on hover */}
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-teal-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
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
