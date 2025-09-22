"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { skillsData } from "@/lib/data";
import {
  Atom,
  Boxes,
  Cog,
  Database,
  Globe,
  Monitor,
  Server,
  Terminal,
  Wrench,
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
    <section ref={ref} id="skills">
      <div className="section-scroll opacity-0" ref={contentRef}>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <Wrench className="h-8 w-8 text-primary" />
          Skills
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {Object.entries(skillsData).map(([category, skills], index) => (
            <Card
              key={category}
              className="p-6 animate-fade-in border-l-4 border-primary group"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                {categoryIcons[category]}
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="flex items-center gap-2 text-sm px-3 py-1.5 hover:scale-105 transition-transform"
                  >
                    {skillIcons[skill]}
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
});

Skills.displayName = "Skills";
export default Skills;
