"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { skillsData } from "@/lib/data";
import {
  Atom,
  Boxes,
  ChevronLeft,
  ChevronRight,
  Cog,
  Database,
  Globe,
  Monitor,
  Server,
  Terminal,
  Wrench
} from "lucide-react";
import { forwardRef, useEffect, useRef } from "react";
import { DiRedis } from "react-icons/di";
import { FaJava as SiJava, FaWindows as SiWindows } from "react-icons/fa";

// Static imports for all skill icons
import { GiArtificialIntelligence } from "react-icons/gi";
import {
  SiArduino,
  SiC,
  SiCplusplus,
  SiCss3,
  SiDocker,
  SiFigma,
  SiFirebase,
  SiGithub,
  SiGradle,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiJenkins,
  SiJest,
  SiJunit5,
  SiKubernetes,
  SiLinux,
  SiMacos,
  SiMui as SiMaterialui,
  SiApachemaven as SiMaven,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiNpm,
  SiPostman,
  SiPython,
  SiReact,
  SiSpringboot,
  SiSwift,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiWebpack,
} from "react-icons/si";

// Category → Icon mapping
const categoryIcons: Record<string, React.ReactNode> = {
  "Programming Languages": <Terminal className="h-5 w-5" />,
  "Frontend Technologies": <Globe className="h-5 w-5" />,
  "Backend Technologies": <Server className="h-5 w-5" />,
  Databases: <Database className="h-5 w-5" />,
  "DevOps & Tools": <Cog className="h-5 w-5" />,
  "Build Automation Tools": <Boxes className="h-5 w-5" />,
  "Operating Systems": <Monitor className="h-5 w-5" />,
  "Other technologies and frameworks": <Atom className="h-5 w-5" />,
};

// Skill → Icon mapping
const skillIcons: Record<string, React.ReactNode> = {
  Java: <SiJava />,
  JavaScript: <SiJavascript />,
  TypeScript: <SiTypescript />,
  Python: <SiPython />,
  C: <SiC />,
  "C++": <SiCplusplus />,
  Swift: <SiSwift />,
  ReactJS: <SiReact />,
  ReactNative: <SiReact />,
  HTML: <SiHtml5 />,
  CSS: <SiCss3 />,
  "Next.js": <SiNextdotjs />,
  "Node.js": <SiNodedotjs />,
  MongoDB: <SiMongodb />,
  Firebase: <SiFirebase />,
  Redis: <DiRedis />,
  MySQL: <SiMysql />,
  Docker: <SiDocker />,
  Kubernetes: <SiKubernetes />,
  Jenkins: <SiJenkins />,
  Maven: <SiMaven />,
  Gradle: <SiGradle />,
  Webpack: <SiWebpack />,
  Vite: <SiVite />,
  NPM: <SiNpm />,
  Git: <SiGithub />,
  Postman: <SiPostman />,
  Figma: <SiFigma />,
  Linux: <SiLinux />,
  Windows: <SiWindows />,
  MacOS: <SiMacos />,
  "Spring Boot": <SiSpringboot />,
  JUnit: <SiJunit5 />,
  Jest: <SiJest />,
  "Material UI": <SiMaterialui />,
  GraphQL: <SiGraphql />,
  IoT: <SiArduino />,
  "Machine Learning": <GiArtificialIntelligence />,
  Dropwizard: <SiJava />,
  TailwindCSS: <SiTailwindcss className="w-4 h-4" />,
};

const Skills = forwardRef<HTMLElement>((props, ref) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

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

  const MarqueeCards = () => (
    <div ref={scrollContainerRef} className="flex overflow-x-auto w-full select-none mask-linear-fade group py-8 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <div className="flex gap-6 min-w-full flex-shrink-0 animate-marquee group-hover:[animation-play-state:paused] pl-6">
        {Object.entries(skillsData).map(([category, skills], index) => (
            <Card
              key={`${category}-${index}`}
              className="w-[350px] flex-shrink-0 p-6 border-l-4 border-teal-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/50 backdrop-blur-sm"
            >
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-teal-600">
                {categoryIcons[category]}
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="flex items-center gap-2 text-sm px-2.5 py-1"
                  >
                    <span className="text-teal-600">{skillIcons[skill]}</span>
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
        ))}
        {/* Duplicate for seamless loop */}
        {Object.entries(skillsData).map(([category, skills], index) => (
            <Card
              key={`${category}-duplicate-${index}`}
              className="w-[350px] flex-shrink-0 p-6 border-l-4 border-teal-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/50 backdrop-blur-sm"
            >
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-teal-600">
                {categoryIcons[category]}
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="flex items-center gap-2 text-sm px-2.5 py-1"
                  >
                    <span className="text-teal-600">{skillIcons[skill]}</span>
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
        ))}
      </div>
    </div>
  );

  return (
    <section ref={ref} id="skills" className="overflow-hidden">
      <div className="section-scroll opacity-0" ref={contentRef}>
        <div className="flex items-center justify-between mb-8 px-4 md:px-0">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Wrench className="h-8 w-8 text-teal-600" />
            Skills
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

        <div className="relative">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <MarqueeCards />
        </div>
      </div>
    </section>
  );
});

Skills.displayName = "Skills";
export default Skills;
