import { experienceData } from "@/lib/data";
import { BriefcaseBusiness, CalendarRange, ChevronLeft, ChevronRight, LucideIcon, X } from "lucide-react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

const Experience = forwardRef<HTMLElement>((props, ref) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [selectedExp, setSelectedExp] = useState<typeof experienceData[0] | null>(null);

  // Render project icon with animations
  const renderProjectIcon = (
    IconComponent: LucideIcon | undefined,
  ) => {
    if (!IconComponent) return null;

    return (
      <IconComponent
        className="h-4 w-4 text-teal-600 group-hover:animate-icon-pulse"
      />
    );
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; // Width of a card
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

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

  return (
    <section ref={ref} id="experience" className="section-scroll overflow-hidden">
      <div className="opacity-0 animate-fadeIn [animation-fill-mode:forwards]" ref={containerRef}>
        <div className="flex items-center justify-between mb-8 px-4 md:px-0">
            <h2 className="text-2xl font-bold flex items-center gap-2">
            <BriefcaseBusiness className="h-6 w-6 text-teal-600" />
            Experience
            </h2>
            
            <div className="flex gap-2">
                <button 
                    onClick={() => scroll('left')}
                    className="p-2 rounded-full bg-muted hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors"
                    aria-label="Scroll left"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>
                <button 
                    onClick={() => scroll('right')}
                    className="p-2 rounded-full bg-muted hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors"
                    aria-label="Scroll right"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-8 px-4 md:px-0 snap-x snap-mandatory scrollbar-hide fam-gallery-marquee"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {experienceData.map((exp, index) => {
            return (
              <div
                key={index}
                className="flex-none w-[85vw] md:w-[400px] snap-center"
              >
                <Card
                  className="h-full relative border-l-4 border-l-teal-600 border-y border-r border-border transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl hover:border-teal-500/40 flex flex-col bg-card group"
                >
                    <div className="p-6 flex flex-col h-full">
                        {/* Header */}
                        <div className="mb-4">
                            <div className="flex items-center gap-2 text-sm text-teal-600 font-medium mb-2">
                                <CalendarRange className="h-4 w-4" />
                                <span>{exp.dates}</span>
                            </div>
                            <h3 className="font-bold text-xl mb-1 group-hover:text-teal-600 transition-colors">
                                {exp.company}
                            </h3>
                            <p className="text-muted-foreground font-medium">
                                {exp.role}
                            </p>
                        </div>

                        {/* Project Info */}
                        <div className="flex items-center gap-2 mb-3">
                            {renderProjectIcon(exp.projectIcon)}
                            <p className="text-sm font-semibold">
                                {exp.project}
                            </p>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">
                            {exp.summary}
                        </p>

                        {/* Tech Tags */}
                        {exp.tech && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {exp.tech.map((tech, i) => (
                                    <Badge key={i} variant="secondary" className="text-xs">
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        {/* Details Toggle */}
                        <button
                            onClick={() => setSelectedExp(exp)}
                            className="w-full mt-auto py-2 text-sm font-medium text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-md transition-colors flex items-center justify-center gap-1"
                        >
                            Read More
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* Glass Modal */}
      {selectedExp && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
            onClick={() => setSelectedExp(null)}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-background/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl animate-slideUpFade">
            {/* Close Button */}
            <button
              onClick={() => setSelectedExp(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="mb-6 border-b border-border/50 pb-6">
                <div className="flex items-center gap-2 text-sm text-teal-600 font-medium mb-2">
                    <CalendarRange className="h-4 w-4" />
                    <span>{selectedExp.dates}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{selectedExp.company}</h2>
                <p className="text-lg text-muted-foreground font-medium">{selectedExp.role}</p>
                
                <div className="flex items-center gap-2 mt-4">
                    {renderProjectIcon(selectedExp.projectIcon)}
                    <p className="font-semibold">{selectedExp.project}</p>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Summary</h4>
                    <p className="text-foreground/90 leading-relaxed">
                        {selectedExp.summary}
                    </p>
                </div>

                {selectedExp.tech && (
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                            {selectedExp.tech.map((tech, i) => (
                                <Badge key={i} variant="secondary">
                                    {tech}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                {selectedExp.responsibilities && (
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Key Responsibilities</h4>
                        <ul className="space-y-3">
                            {selectedExp.responsibilities.map((resp, i) => (
                                <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-600 flex-shrink-0" />
                                    <span>{resp}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {selectedExp.projects && Object.keys(selectedExp.projects).map((project, i) => (
                    <div key={i}>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">{project}</h4>
                        <ul className="space-y-3">
                            {selectedExp.projects![project].map((item, idx) => (
                                <li key={idx} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-600 flex-shrink-0" />
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
        document.body
      )}
    </section>
  );
});

Experience.displayName = "Experience";
export default Experience;
