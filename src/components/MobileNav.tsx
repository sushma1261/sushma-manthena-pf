import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Github, Linkedin, Mail, Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const sections = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

export function MobileNav() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72 flex flex-col justify-between">
        {/* Close wrapper */}
        <SheetClose asChild>
          <div className="flex flex-col flex-1 overflow-y-auto">
            {/* Section links */}
            <nav className="flex flex-col gap-4 mt-4">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant="ghost"
                  className="justify-start"
                  onClick={() => scrollToSection(section.id)}
                >
                  {section.label}
                </Button>
              ))}
            </nav>
          </div>
        </SheetClose>

        {/* Sticky Social Icons + ThemeToggle */}
        <div className="flex gap-2 mt-4 border-t border-muted-foreground/20 pt-4">
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
      </SheetContent>
    </Sheet>
  );
}
