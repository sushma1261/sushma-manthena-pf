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
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export function MobileNav() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 60; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden hover:bg-teal-600/10 hover:text-teal-600 data-[state=open]:bg-teal-600/10 data-[state=open]:text-teal-600"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72 flex flex-col justify-between">
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Name/Brand */}
          <div className="mb-6">
            <h2 className="text-xl font-bold">Sushma Manthena</h2>
          </div>

          {/* Section links */}
          <nav className="flex flex-col gap-4 mt-4">
            {sections.map((section) => (
              <SheetClose asChild key={section.id}>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => scrollToSection(section.id)}
                >
                  {section.label}
                </Button>
              </SheetClose>
            ))}

            {/* Resume Download */}
            <SheetClose asChild>
              <Button variant="ghost" className="justify-start" asChild>
                <a href="/SushmaManthenaResume.pdf" download>
                  Resume
                </a>
              </Button>
            </SheetClose>
          </nav>
        </div>

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
