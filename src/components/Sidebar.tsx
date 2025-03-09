import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import Typewriter from "./TypeWriter";

const sections = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

const strings = [
  "Software Developer!",
  "A Problem Solver!",
  "A Team Player!",
  "A Frontend Developer!",
  "A React Developer!",
  "A Fast Learner!",
  "A Tech Enthusiast!",
  "A Web Developer!",
  "A JavaScript Developer!",
  "A full-stack developer!",
  "A Tech Geek!",
];

export function Sidebar({ activeSection, setActiveSection }) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside className="hidden md:flex flex-col justify-between fixed left-0 top-0 h-screen w-80 p-8">
      <div className="space-y-8">
        <div className="mt-8">
          <h1 className="text-2xl font-bold">Sushma Manthena</h1>
          <Typewriter strings={strings} isAnimating={true} />
          {/* <p className="text-muted-foreground">Software Developer</p> */}
        </div>
        <nav className="space-y-2">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={"ghost"}
              className={`w-full justify-start transition-colors ${
                activeSection === section.id
                  ? "bg-accent text-accent-foreground"
                  : ""
              }`}
              onClick={() => {
                scrollToSection(section.id);
                setActiveSection(section.id);
              }}
            >
              {section.label}
            </Button>
          ))}
        </nav>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://github.com/sushma1261"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://linkedin.com/in/sushma-varma"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="mailto:varma.sushma1998@gmail.com">
              <Mail className="h-5 w-5" />
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
