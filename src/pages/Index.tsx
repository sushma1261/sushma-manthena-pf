import { ThemeToggle } from "@/components/ThemeToggle";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import {
  BriefcaseBusiness,
  Code,
  GraduationCap,
  Home,
  Layers,
  Mail,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

// --- Floating Dock Component ---
const FloatingDock = ({
  activeSection,
  scrollToSection,
}: {
  activeSection: string;
  scrollToSection: (id: string) => void;
}) => {
  const navItems = [
    { id: "hero", icon: Home, label: "Home" },
    { id: "experience", icon: BriefcaseBusiness, label: "Experience" },
    { id: "projects", icon: Layers, label: "Projects" },
    { id: "skills", icon: Code, label: "Skills" },
    { id: "education", icon: GraduationCap, label: "Education" },
    { id: "contact", icon: Mail, label: "Contact" },
  ];

  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-center z-50 pointer-events-none animate-fadeIn">
      <nav className="flex items-center gap-1 bg-background/80 backdrop-blur-md border border-border/40 shadow-2xl rounded-full p-2 px-3 pointer-events-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            activeSection === item.id || (item.id === "hero" && !activeSection);

          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative p-2.5 rounded-full transition-all duration-300 group
                  ${
                    isActive
                      ? "bg-foreground text-background scale-110 shadow-lg"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
              aria-label={item.label}
            >
              <Icon className="h-5 w-5" />

              {/* Tooltip */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");

  const heroRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const educationRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const sectionRefs = useMemo(
    () => ({
      hero: heroRef,
      experience: experienceRef,
      education: educationRef,
      projects: projectsRef,
      skills: skillsRef,
      contact: contactRef,
    }),
    [],
  );

  useEffect(() => {
    const observers = Object.entries(sectionRefs).map(([id, ref]) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.5 },
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return { id, observer };
    });

    return () => {
      observers.forEach(({ id, observer }) => {
        const ref = sectionRefs[id as keyof typeof sectionRefs];
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [sectionRefs]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 0; // Floating dock doesn't require offset like top nav
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-teal-500/30 relative">
      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50 animate-fadeIn">
        <ThemeToggle />
      </div>

      <FloatingDock
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      {/* Global Background Grid - Increased Visibility */}
      <div
        className="fixed inset-0 -z-30 pointer-events-none dark:hidden"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="fixed inset-0 -z-30 pointer-events-none hidden dark:block"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <main className="pb-24">
        <section id="hero" ref={heroRef}>
          <Hero />
        </section>

        <section id="experience" ref={experienceRef}>
          <Experience />
        </section>

        <section id="projects" ref={projectsRef}>
          <Projects />
        </section>

        <section id="skills" ref={skillsRef} className="bg-muted/30">
          <Skills />
        </section>

        <section id="education" ref={educationRef}>
          <Education />
        </section>
      </main>

      <section id="contact" ref={contactRef}>
        <Footer />
      </section>
    </div>
  );
};

export default Index;
