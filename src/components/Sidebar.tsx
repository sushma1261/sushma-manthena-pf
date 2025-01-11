import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

const sections = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

export function Sidebar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside className="hidden md:flex flex-col justify-between fixed left-0 top-0 h-screen w-72 p-8 border-r">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">John Doe</h1>
          <p className="text-muted-foreground">Software Developer</p>
          <p className="mt-2 text-sm">Building digital experiences with passion and precision</p>
        </div>
        
        <nav className="space-y-2">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => scrollToSection(section.id)}
            >
              {section.label}
            </Button>
          ))}
        </nav>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="mailto:example@email.com">
              <Mail className="h-5 w-5" />
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}