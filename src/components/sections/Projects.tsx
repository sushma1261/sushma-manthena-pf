import { projectsData } from "@/lib/data";
import { SquareTerminal } from "lucide-react";
import { forwardRef, useEffect, useRef } from "react";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

const Projects = forwardRef<HTMLElement>((props, ref) => {
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

  const handleClick = (link: string) => {
    if (link) {
      window.open(link, "_blank");
    }
  };

  return (
    <section ref={ref} id="projects" className="section-scroll">
      <div className="opacity-0" ref={contentRef}>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <SquareTerminal className="h-6 w-6" />
          Projects
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {projectsData.map((project, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:scale-105 transition-transform animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 200}ms` }}
              onClick={() => handleClick(project.link)}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold">{project.title}</h3>
                {project.subtitle && (
                  <span className="text-sm text-accent italic">
                    {project.subtitle}
                  </span>
                )}
                <p className="text-sm text-muted-foreground mt-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.skills.map((skill, i) => (
                    <Badge key={i} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Projects;
