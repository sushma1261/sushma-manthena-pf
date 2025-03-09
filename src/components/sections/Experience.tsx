
import { experienceData } from "@/lib/data";
import { BriefcaseBusiness } from "lucide-react";
import { forwardRef, useEffect, useRef } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

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

        <div className="space-y-6">
          {experienceData.map((exp, index) => (
            <Card
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardHeader className="pb-2">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{exp.role}</h3>
                    <p className="text-muted-foreground">{exp.company}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 md:mt-0">{exp.dates}</p>
                </div>
                <p className="text-sm font-medium mt-1">{exp.project}</p>
              </CardHeader>
              
              <CardContent>
                <h4 className="text-sm font-semibold mb-2">Responsibilities</h4>
                {exp.responsibilities && (
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                )}
                {exp.projects && (
                  <>
                    <h4 className="text-sm font-semibold mt-4 mb-2">Projects</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {Object.keys(exp.projects).map((project, i) => (
                        <ul
                          className="list-disc list-inside text-sm text-muted-foreground mb-3"
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
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Experience;
