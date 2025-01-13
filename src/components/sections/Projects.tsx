import { projectsData } from "@/lib/data";
import { SquareTerminal } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { forwardRef } from "react";

const Projects = forwardRef<HTMLElement>((props, ref) => {
  const handleClick = (link: string) => {
    if (link) window.location.href = link;
  };
  
  return (
    <section ref={ref} id="projects" className="section-scroll animate-fade-in">
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
    </section>
  );
});

Projects.displayName = "Projects";

export default Projects;