
import { experienceData } from "@/lib/data";
import { BriefcaseBusiness } from "lucide-react";
import { forwardRef, useEffect, useRef } from "react";

const Experience = forwardRef<HTMLElement>((props, ref) => {
  const contentRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.1 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="experience" className="section-scroll">
      <div className="opacity-0" ref={contentRef}>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <BriefcaseBusiness className="h-6 w-6" />
          Experience
        </h2>

        <div className="space-y-8">
        {experienceData.map((exp, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr,3fr] gap-4 animate-fade-in"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className="text-sm text-muted-foreground">{exp.dates}</div>
            <div className="bg-muted/30 rounded-lg p-4 border border-border shadow-sm">
              <h3 className="font-bold">{exp.role}</h3>
              <p className="text-muted-foreground">{exp.company}</p>
              <p className="text-sm font-medium">{exp.project}</p>
              {exp.responsibilities && (
                <ul className="list-disc list-inside text-sm text-muted-foreground mt-2">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              )}
              {exp.projects && (
                <ul className="list-disc list-inside text-sm text-muted-foreground mt-2">
                  {Object.keys(exp.projects).map((project, i) => (
                    <ul
                      className="list-disc list-inside text-sm text-muted-foreground"
                      key={i}
                    >
                      <p className="font-bold">{project}</p>
                      {exp.projects[project].map((resp, id) => (
                        <li key={id} className="ml-2">
                          {resp}
                        </li>
                      ))}
                    </ul>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
});

export default Experience;
