import { experienceData } from "@/lib/data";
import {
  BriefcaseBusiness,
  CalendarRange,
  ChevronRight,
  LucideIcon,
  X,
} from "lucide-react";
import { forwardRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader } from "../ui/card";

const ExperienceCard = ({
  exp,
  onClick,
}: {
  exp: (typeof experienceData)[0];
  onClick: () => void;
}) => {
  const Icon = exp.projectIcon;
  return (
    <Card
      className="h-full group hover:shadow-lg transition-all duration-300 border-l-4 border-l-teal-600 hover:-translate-y-1 cursor-pointer flex flex-col"
      onClick={onClick}
    >
      <CardHeader className="pb-3 grid grid-cols-1 md:grid-cols-[1fr,auto] gap-4">
        <div>
          {/* Date */}
          <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold text-teal-600 bg-teal-50 dark:bg-teal-900/10 px-2 py-1 rounded-full w-fit">
            <CalendarRange className="h-3 w-3" />
            {exp.dates}
          </div>

          <h3 className="text-xl font-bold group-hover:text-teal-600 transition-colors">
            {exp.company}
          </h3>
          <p className="text-muted-foreground font-medium text-sm mt-1">
            {exp.role}
          </p>
        </div>

        {Icon && (
          <div className="hidden md:block p-2 rounded-full bg-muted group-hover:bg-teal-50 dark:group-hover:bg-teal-900/20 transition-colors self-start">
            <Icon className="h-5 w-5 text-muted-foreground group-hover:text-teal-600 transition-colors" />
          </div>
        )}
      </CardHeader>

      <CardContent className="flex flex-col flex-1">
        {/* Project Name */}
        <div className="mb-3 font-medium text-sm flex items-center gap-2">
          <span className="text-foreground/80">Project:</span>
          <span className="text-foreground">{exp.project}</span>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {exp.summary}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {exp.tech.slice(0, 3).map((tech, i) => (
            <Badge key={i} variant="secondary" className="text-xs font-normal">
              {tech}
            </Badge>
          ))}
          {exp.tech.length > 3 && (
            <Badge
              variant="outline"
              className="text-xs font-normal text-muted-foreground"
            >
              +{exp.tech.length - 3} more
            </Badge>
          )}
        </div>

        <div className="mt-4 flex items-center text-teal-600 text-sm font-medium opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          Read details <ChevronRight className="h-4 w-4 ml-1" />
        </div>
      </CardContent>
    </Card>
  );
};

const Experience = forwardRef<HTMLElement>((props, ref) => {
  const [selectedExp, setSelectedExp] = useState<
    (typeof experienceData)[0] | null
  >(null);

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedExp(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedExp) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedExp]);

  // Render project icon
  const renderProjectIcon = (IconComponent: LucideIcon | undefined) => {
    if (!IconComponent) return null;
    return <IconComponent className="h-5 w-5 text-teal-600" />;
  };

  return (
    <section ref={ref} id="experience" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center gap-3 mb-12">
          <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
            <BriefcaseBusiness className="h-6 w-6 text-teal-600" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Experience</h2>
        </div>

        {/* Masonry Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1 (0, 2, 4...) */}
          <div className="space-y-6">
            {experienceData
              .filter((_, i) => i % 2 === 0)
              .map((exp, index) => (
                <div key={index}>
                  <ExperienceCard
                    exp={exp}
                    onClick={() => setSelectedExp(exp)}
                  />
                </div>
              ))}
          </div>

          {/* Column 2 (1, 3, 5...) */}
          <div className="space-y-6">
            {experienceData
              .filter((_, i) => i % 2 !== 0)
              .map((exp, index) => (
                <div key={index}>
                  <ExperienceCard
                    exp={exp}
                    onClick={() => setSelectedExp(exp)}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedExp &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
              onClick={() => setSelectedExp(null)}
            />

            <div className="relative w-full max-w-2xl bg-background rounded-2xl shadow-2xl border animate-in zoom-in-95 duration-200 my-8">
              <button
                onClick={() => setSelectedExp(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="max-h-[85vh] overflow-y-auto p-6 md:p-8 rounded-2xl">
                {/* Modal Header */}
                <div className="mb-8 border-b pb-6">
                  <div className="flex items-center gap-2 text-sm text-teal-600 font-semibold mb-3">
                    <CalendarRange className="h-4 w-4" />
                    <span>{selectedExp.dates}</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                    <h2 className="text-3xl font-bold">
                      {selectedExp.company}
                    </h2>
                    <Badge
                      variant="secondary"
                      className="w-fit text-sm px-3 py-1"
                    >
                      {selectedExp.role}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground mt-2">
                    {renderProjectIcon(selectedExp.projectIcon)}
                    <span className="font-medium">{selectedExp.project}</span>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="space-y-8">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                      Summary
                    </h4>
                    <p className="text-foreground/90 leading-relaxed bg-muted/30 p-4 rounded-lg border-l-2 border-teal-600">
                      {selectedExp.summary}
                    </p>
                  </div>

                  {selectedExp.tech && (
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
                        Technology Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedExp.tech.map((tech, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="px-3 py-1 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-900/10 text-teal-700 dark:text-teal-300"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Responsibilities */}
                  {selectedExp.responsibilities && (
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-4">
                        {selectedExp.responsibilities.map((resp, i) => (
                          <li key={i} className="flex gap-4 group">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-teal-600 group-hover:scale-125 transition-transform flex-shrink-0" />
                            <span className="text-foreground/90 leading-relaxed">
                              {resp}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Nested Projects */}
                  {selectedExp.projects &&
                    Object.entries(
                      selectedExp.projects as Record<string, string[]>,
                    ).map(([project, items], i) => (
                      <div
                        key={i}
                        className="bg-muted/20 p-5 rounded-xl border border-border/50"
                      >
                        <h4 className="font-bold text-lg mb-4 text-teal-700 dark:text-teal-400">
                          {project}
                        </h4>
                        <ul className="space-y-3">
                          {items.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex gap-3 text-sm text-foreground/90 leading-relaxed"
                            >
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-teal-600/60 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
});

Experience.displayName = "Experience";
export default Experience;
