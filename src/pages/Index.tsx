import { MobileNav } from "@/components/MobileNav";
import AboutMe from "@/components/sections/AboutMe";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import HomeMobile from "@/components/sections/HomeMobile";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import { Sidebar } from "@/components/Sidebar";
import { useEffect, useRef, useState } from "react";

const Index = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sectionRefs = {
    about: useRef<HTMLElement>(null),
    education: useRef<HTMLElement>(null),
    skills: useRef<HTMLElement>(null),
    experience: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
  };

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
  }, []);

  const scrollToSection = (section: string) => {
    console.log("Scrolling to section:", section);
    sectionRefs[section as keyof typeof sectionRefs].current?.scrollIntoView({
      behavior: "smooth",
    });
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 h-16 border-b bg-background/80 backdrop-blur-sm md:pl-72 z-50 md:hidden">
        <div className="flex items-center justify-between h-full px-4">
          <MobileNav />
        </div>
      </header>

      <Sidebar
        activeSection={activeSection}
        setActiveSection={scrollToSection}
      />

      <main className="md:pl-72">
        <div className="container py-8 space-y-16">
          <HomeMobile />
          <AboutMe ref={sectionRefs.about} />
          <Education ref={sectionRefs.education} />
          <Skills ref={sectionRefs.skills} />
          <Experience ref={sectionRefs.experience} />
          <Projects ref={sectionRefs.projects} />
        </div>
      </main>
    </div>
  );
};

export default Index;
