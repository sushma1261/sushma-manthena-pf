import { Card } from "@/components/ui/card";
import { projectsData } from "@/lib/data";
import { ExternalLink, Github, SquareTerminal } from "lucide-react";
import { forwardRef, useEffect, useRef, useState } from "react";

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

const ProjectCard = ({ project, isCentered }: { project: any; isCentered: boolean }) => {
  return (
    <Card
      className={`overflow-hidden transition-all duration-500 border-border/40 group flex flex-col h-full ${
        isCentered 
          ? "scale-100 opacity-100 shadow-xl border-teal-500/60" 
          : "scale-90 opacity-60 blur-[2px]"
      }`}
    >
      {project.imageWebp || project.imageFallback || project.image ? (
        <div className="relative h-64 overflow-hidden shrink-0">
          <picture>
            {project.imageSrcSet &&
              project.imageSrcSet.map((src: any, i: number) => (
                <source
                  key={i}
                  srcSet={src.src}
                  media={`(max-width: ${src.width}px)`}
                  type="image/webp"
                />
              ))}
            {project.imageWebp && <source srcSet={project.imageWebp} type="image/webp" />}
            <img
              src={project.imageFallback || project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          </picture>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-full hover:scale-110 transition-transform"
                title="View Demo"
              >
                <ExternalLink className="h-5 w-5 text-gray-900" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-full hover:scale-110 transition-transform"
                title="View Code"
              >
                <Github className="h-5 w-5 text-gray-900" />
              </a>
            )}
          </div>
        </div>
      ) : (
        <div className="h-64 bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-colors relative overflow-hidden shrink-0">
             <div 
                className="absolute inset-0 opacity-10 bg-grid-black/[0.2] dark:bg-grid-white/[0.2]"
             />
             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-10">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white rounded-full hover:scale-110 transition-transform"
                    title="View Demo"
                  >
                    <ExternalLink className="h-5 w-5 text-gray-900" />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white rounded-full hover:scale-110 transition-transform"
                    title="View Code"
                  >
                    <Github className="h-5 w-5 text-gray-900" />
                  </a>
                )}
              </div>
        </div>
      )}
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-bold text-xl mb-2 group-hover:text-teal-600 transition-colors">
            {project.title}
        </h3>
        {project.subtitle && (
            <p className="text-sm text-teal-600 font-medium mb-2">
            {project.subtitle}
            </p>
        )}
        <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-4">
            {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
            {project.skills.map((skill: string, i: number) => (
            <span
                key={i}
                className="text-xs px-2 py-1 bg-muted rounded-md font-medium flex items-center gap-1"
            >
                {skillIcons[skill]}
                {skill}
            </span>
            ))}
        </div>
        {project.metrics && (
            <div className="flex gap-2 mt-auto">
            {project.metrics.map((metric: string, i: number) => (
                <span
                key={i}
                className="text-xs font-bold text-teal-600 bg-teal-50 dark:bg-teal-900/20 px-2 py-1 rounded"
                >
                {metric}
                </span>
            ))}
            </div>
        )}
      </div>
    </Card>
  );
};

const Projects = forwardRef<HTMLElement>((props, ref) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isProgrammaticScrollRef = useRef(false);

  // Auto-scroll functionality
  useEffect(() => {
    if (isHovered) {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
        autoScrollTimerRef.current = null;
      }
      return;
    }

    // Clear any existing timer
    if (autoScrollTimerRef.current) {
      clearInterval(autoScrollTimerRef.current);
    }

    // Start new timer
    autoScrollTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projectsData.length);
    }, 10000); // 10 seconds

    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
    };
  }, [isHovered, currentIndex]);

  // Reset timer when manually changing index
  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Scroll to centered project
  useEffect(() => {
    if (carouselRef.current) {
      isProgrammaticScrollRef.current = true;
      const cardWidth = 600 + 32; // card width + gap
      const containerWidth = carouselRef.current.offsetWidth;
      const scrollPosition = currentIndex * cardWidth - (containerWidth / 2 - cardWidth / 2);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      
      // Reset flag after scroll completes
      setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 600);
    }
  }, [currentIndex]);

  // Detect scroll position and update currentIndex
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      // Ignore programmatic scrolls
      if (isProgrammaticScrollRef.current) return;

      // Debounce scroll events
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollLeft = carousel.scrollLeft;
        const cardWidth = 600 + 32; // card width + gap
        const containerWidth = carousel.offsetWidth;
        
        // Calculate which card is closest to center
        const centerOffset = containerWidth / 2 - cardWidth / 2;
        const newIndex = Math.round((scrollLeft + centerOffset) / cardWidth);
        const clampedIndex = Math.max(0, Math.min(newIndex, projectsData.length - 1));
        
        if (clampedIndex !== currentIndex) {
          setCurrentIndex(clampedIndex);
        }
      }, 100);
    };

    carousel.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      carousel.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [currentIndex]);

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
    <section ref={ref} id="projects" className="section-scroll overflow-hidden">
      <div className="opacity-0" ref={contentRef}>
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <SquareTerminal className="h-6 w-6 text-teal-600" />
          Projects
        </h2>
        
        {/* Carousel Container */}
        <div 
          ref={carouselRef}
          className="relative overflow-x-auto scrollbar-hide pb-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex gap-8 px-4 md:px-8">
            {projectsData.map((project, index) => (
              <div 
                key={index} 
                className={`flex-shrink-0 w-[85vw] md:w-[600px] transition-all duration-500 ${
                  index === currentIndex ? "scale-110" : "scale-100"
                }`}
              >
                <ProjectCard project={project} isCentered={index === currentIndex} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {projectsData.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-8 h-3 bg-teal-600"
                  : "w-3 h-3 bg-gray-300 hover:bg-teal-400"
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

export default Projects;

