import { MobileNav } from "@/components/MobileNav";
import { TopNav } from "@/components/TopNav";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import Projects from "@/components/sections/Projects";
import { useEffect, useMemo, useRef, useState } from "react";

const Index = () => {
  const [activeSection, setActiveSection] = useState("experience");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const experienceRef = useRef<HTMLElement>(null);
  const educationRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);

  const sectionRefs = useMemo(
    () => ({
      experience: experienceRef,
      education: educationRef,
      projects: projectsRef,
    }),
    [experienceRef, educationRef, projectsRef]
  );

  useEffect(() => {
    const observers = Object.entries(sectionRefs).map(([id, ref]) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              console.log("Section in view:", id);
              setActiveSection(id);
            }
          });
        },
        {
          // threshold: 0.5, // Trigger when 50% of the section is visible
          rootMargin: "-50% 0px -50% 0px", // Adjust margins to better detect the active section
        }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    });

    // Cleanup observers on unmount
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sectionRefs]);

  const scrollToSection = (section: string) => {
    console.log("Scrolling to section:", section);
    sectionRefs[section as keyof typeof sectionRefs].current?.scrollIntoView({
      behavior: "smooth",
    });
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen">
      <TopNav />

      <header className="fixed top-0 left-0 right-0 h-16 border-b bg-background/80 backdrop-blur-sm z-40 md:hidden">
        <div className="flex items-center justify-between h-full px-4">
          <MobileNav />
        </div>
      </header>

      <main className="pt-0">
        <Hero />
        <Intro />

        <div className="max-w-5xl mx-auto px-4 py-20 space-y-32">
          <Experience ref={sectionRefs.experience} />
          <Education ref={sectionRefs.education} />
          <Projects ref={sectionRefs.projects} />
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Index;
