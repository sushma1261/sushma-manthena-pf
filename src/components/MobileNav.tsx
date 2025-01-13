import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
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
      <SheetClose>
        <SheetContent side="left" className="w-72">
          <nav className="flex flex-col gap-4">
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
            <ThemeToggle />
          </nav>
        </SheetContent>
      </SheetClose>
    </Sheet>
  );
}
