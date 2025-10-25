import { Card, CardHeader } from "@/components/ui/card";
import { experienceData } from "@/lib/data";
import { BriefcaseBusiness, CalendarRange } from "lucide-react";
import { forwardRef, useEffect, useRef, useState } from "react";

const Experience = forwardRef<HTMLElement>((props, ref) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);
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
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <BriefcaseBusiness className="h-6 w-6" />
          Experience
        </h2>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border transform -translate-x-1/2" />

          <div className="space-y-8 md:space-y-12">
            {experienceData.map((exp, index) => {
              const isLeft = index % 2 === 0;
              const sideClasses = isLeft
                ? "md:pr-8 md:pl-0 md:mr-auto"
                : "md:pl-8 md:pr-0 md:ml-auto";

              return (
                <div key={index} className="relative">
                  <div className="absolute left-1/2 top-2 md:top-6 transform -translate-x-1/2">
                    <span
                      className="block h-3 w-3 rounded-full bg-teal-600 ring-4 ring-background"
                      aria-hidden="true"
                    />
                  </div>

                  <div className={`md:w-1/2 ${sideClasses}`}>
                    <Card
                      className={`transition-transform duration-200 ease-in-out hover:scale-[1.02] ${
                        expandedIndex === index ? "ring-2 ring-primary" : ""
                      }`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-bold text-lg">{exp.role}</h3>
                            <p className="text-muted-foreground">
                              {exp.company}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                              <CalendarRange className="h-4 w-4" />
                              <span>{exp.dates}</span>
                            </div>
                          </div>

                          <div className="flex-shrink-0 ml-4">
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
                              className="text-sm text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
                            >
                              {expandedIndex === index ? "Close" : "More"}
                            </button>
                          </div>
                        </div>

                        <p className="text-sm font-medium mt-2">
                          {exp.project}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-4">
                          {exp.summary}
                        </p>
                      </CardHeader>

                      <div
                        id={`exp-details-${index}`}
                        role="region"
                        aria-labelledby={`exp-trigger-${index}`}
                        ref={(el) => (contentRefs.current[index] = el)}
                        style={{ maxHeight: "0px", opacity: 0 }}
                      >
                        <div className="p-4 pt-0">
                          {exp.responsibilities && (
                            <div className="mb-4">
                              <p className="font-semibold mb-1">
                                Responsibilities:
                              </p>
                              <ul className="list-disc list-inside text-sm text-muted-foreground">
                                {exp.responsibilities.map((resp, i) => (
                                  <li key={i}>{resp}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {exp.projects &&
                            Object.keys(exp.projects).map((project, i) => (
                              <div key={i} className="mb-3">
                                <p className="font-semibold mb-1">{project}:</p>
                                <ul className="list-disc list-inside text-sm text-muted-foreground ml-4">
                                  {exp.projects![project].map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

Experience.displayName = "Experience";
export default Experience;
