import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

export function ThemeToggle() {
  const [theme, setTheme] = useState(Theme.DARK);

  useEffect(() => {
    if (theme == Theme.DARK) {
      document.documentElement.classList.add(Theme.DARK);
    }
    const isDark = document.documentElement.classList.contains(Theme.DARK);
    setTheme(isDark ? Theme.DARK : Theme.LIGHT);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    setTheme(newTheme);
    if (newTheme === Theme.DARK) {
      document.documentElement.classList.add(Theme.DARK);
    } else {
      document.documentElement.classList.remove(Theme.DARK);
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      {theme === Theme.LIGHT ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
}