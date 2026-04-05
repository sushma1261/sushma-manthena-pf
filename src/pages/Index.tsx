import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import { useEffect } from "react";

// Bottom navigation bar
const BottomNav = () => {
  const navItems = [
    { id: "work", icon: "architecture", label: "Work" },
    { id: "experience", icon: "terminal", label: "Experience" },
    { id: "skills", icon: "code", label: "Skills" },
    { id: "projects", icon: "layers", label: "Projects" },
    { id: "contact", icon: "mail", label: "Contact" },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed bottom-8 left-1/2 nav-reveal w-auto z-50 flex items-center gap-8 px-10 py-4 rounded-full border border-white/40 shadow-[0_4px_24px_0_rgba(42,52,57,0.12)]"
      style={{
        background: "rgba(255,255,255,0.18)",
        backdropFilter: "saturate(180%) blur(16px)",
        WebkitBackdropFilter: "saturate(180%) blur(16px)",
      }}
    >
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollTo(item.id)}
          className="scale-95 active:scale-90 flex flex-col items-center justify-center text-outline hover:text-tertiary transition-all duration-300 cursor-pointer bg-transparent border-0 p-0"
        >
          <span className="material-symbols-outlined mb-1 text-[22px]">
            {item.icon}
          </span>
          {/* <span className="font-label text-[11px] uppercase tracking-[0.1em] font-medium">
            {item.label}
          </span> */}
        </button>
      ))}
    </nav>
  );
};

const Index = () => {
  // Wire up scroll-reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="min-h-screen selection:bg-[#91feef] selection:text-[#006259]"
      style={{ background: "#f7f9fb", color: "#2a3439" }}
    >
      <BottomNav />

      <section id="work">
        <Hero />
      </section>

      <section id="experience">
        <Experience />
      </section>

      <section id="skills">
        <Skills />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="education">
        <Education />
      </section>

      <section id="contact">
        <Footer />
      </section>
    </div>
  );
};

export default Index;


