import { projectsData } from "@/lib/data";
import { SquareTerminal } from "lucide-react";
import { forwardRef, useEffect, useRef } from "react";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

// Import logos from react-icons
import { GiArtificialIntelligence } from "react-icons/gi"; // for GenAI
import {
  SiAndroid,
  SiArduino,
  SiDart,
  SiFirebase,
  SiFlutter,
  SiJunit5,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

const skillIcons: Record<string, JSX.Element> = {
  Flutter: <SiFlutter className="w-4 h-4" />,
  Dart: <SiDart className="w-4 h-4" />,
  Mockito: <SiJunit5 className="w-4 h-4" />,
  "Node.js": <SiNodedotjs className="w-4 h-4" />,
  "Next.js": <SiNextdotjs className="w-4 h-4" />,
  ReactJS: <SiReact className="w-4 h-4" />,
  TailwindCSS: <SiTailwindcss className="w-4 h-4" />,
  Typescript: <SiTypescript className="w-4 h-4" />,
  Firebase: <SiFirebase className="w-4 h-4" />,
  Android: <SiAndroid className="w-4 h-4" />,
  IOT: <SiArduino className="w-4 h-4" />,
  GenAI: <GiArtificialIntelligence className="w-4 h-4" />,
};
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
          <SquareTerminal className="h-6 w-6 text-teal-600" />
          Projects
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {projectsData.map((project, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:scale-105 transition-transform animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {project.imageWebp || project.imageFallback ? (
                <picture>
                  {project.imageWebp && project.imageSrcSet ? (
                    <source
                      srcSet={project.imageSrcSet
                        .map(
                          (s: { src: string; width: number }) =>
                            `${s.src} ${s.width}w`
                        )
                        .join(", ")}
                      type="image/webp"
                      sizes="(max-width: 768px) 480px, (max-width: 1200px) 800px, 1200px"
                    />
                  ) : (
                    project.imageWebp && (
                      <source srcSet={project.imageWebp} type="image/webp" />
                    )
                  )}
                  <img
                    src={project.imageFallback ?? project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                </picture>
              ) : (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="font-bold">{project.title}</h3>
                {project.subtitle && (
                  <span className="text-sm text-teal-600 italic">
                    {project.subtitle}
                  </span>
                )}
                <p className="text-sm text-muted-foreground mt-2">
                  {project.description}
                </p>
                {project.metrics && project.metrics.length > 0 && (
                  <ul className="mt-3 text-sm list-disc list-inside text-muted-foreground">
                    {project.metrics.map((m: string, mi: number) => (
                      <li key={mi}>{m}</li>
                    ))}
                  </ul>
                )}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.skills.map((skill, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {skillIcons[skill] ?? null}
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-3 mt-4">
                  {project.demo && (
                    <button
                      onClick={() => handleClick(project.demo)}
                      className="px-3 py-1 rounded-md bg-teal-600 text-white text-sm hover:opacity-90"
                    >
                      Demo
                    </button>
                  )}

                  {project.github && (
                    <button
                      onClick={() => handleClick(project.github)}
                      className="px-3 py-1 rounded-md border border-teal-600 text-teal-600 text-sm hover:bg-teal-50 dark:hover:bg-teal-950"
                    >
                      GitHub
                    </button>
                  )}
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
