import { projectsData } from "@/lib/data";
import { ExternalLink, Github } from "lucide-react";
import { forwardRef } from "react";

const Projects = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section
      ref={ref}
      id="projects"
      className="bg-surface-container-highest py-32 px-8 md:px-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header row */}
        <div className="mb-24 reveal">
          <h2 className="font-headline text-4xl md:text-6xl font-bold tracking-tight text-on-surface">
            Projects
          </h2>
        </div>

        {/* Project grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <div
              key={index}
              className="group reveal cursor-pointer transition-all duration-700 hover:scale-101"
            >
              {/* Image */}
              <div className="aspect-[16/9] overflow-hidden bg-surface-container-low mb-4 relative">
                {project.imageWebp || project.imageFallback || project.image ? (
                  <picture>
                    {project.imageSrcSet &&
                      project.imageSrcSet.map(
                        (src: { src: string; width: number }, i: number) => (
                          <source
                            key={i}
                            srcSet={src.src}
                            media={`(max-width: ${src.width}px)`}
                            type="image/webp"
                          />
                        ),
                      )}
                    {project.imageWebp && (
                      <source srcSet={project.imageWebp} type="image/webp" />
                    )}
                    <img
                      src={
                        (project.imageFallback ||
                          (project.image as string)) as string
                      }
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-700"
                      loading="lazy"
                    />
                  </picture>
                ) : (
                  <div className="w-full h-full bg-surface-container flex items-center justify-center">
                    <span className="font-headline text-2xl text-outline">
                      {project.title[0]}
                    </span>
                  </div>
                )}

                {/* Hover overlay with links */}
                <div className="absolute inset-0 bg-[#565e74]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2.5 bg-white/90 hover:bg-white transition-colors"
                      title="View Demo"
                    >
                      <ExternalLink className="h-4 w-4 text-[#2a3439]" />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2.5 bg-white/90 hover:bg-white transition-colors"
                      title="View Code"
                    >
                      <Github className="h-4 w-4 text-[#2a3439]" />
                    </a>
                  )}
                </div>
              </div>

              {/* Meta */}
              <h3 className="font-headline text-lg font-bold mb-1 text-on-surface">
                {project.title}
              </h3>
              {/* {project.subtitle && (
                <p className="font-label text-[10px] uppercase tracking-widest text-tertiary mb-1">
                  {project.subtitle}
                </p>
              )} */}
              <p className="font-label text-[10px] uppercase tracking-widest text-outline mb-2">
                {project.skills.join(" • ")}
              </p>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed line-clamp-2">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Projects.displayName = "Projects";
export default Projects;
