import { MobileNav } from "@/components/MobileNav";
import AboutMe from "@/components/sections/AboutMe";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import HomeMobile from "@/components/sections/HomeMobile";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import { Sidebar } from "@/components/Sidebar";
import { useRef, useState } from "react";

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

  const scrollToSection = (section: string) => {
    console.log(section);
    sectionRefs[section as keyof typeof sectionRefs].current?.scrollIntoView({
      behavior: "smooth",
    });
    console.log(activeSection, section);
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
          <Projects />
        </div>
      </main>
    </div>
  );
};

export default Index;
