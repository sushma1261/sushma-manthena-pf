import { heroData } from "@/lib/data";
import React from "react";

const Hero: React.FC = () => {
  const handleCTAClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.getElementById(href.substring(1));
      if (element) {
        const offset = 80; // Account for fixed nav height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 pt-16">
      <div className="text-center px-6 max-w-4xl mx-auto space-y-8">
        <h1 className="font-bold tracking-tight leading-tight">
          {heroData.headline}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {heroData.tagline}
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-6">
          {heroData.ctas.map((cta) => (
            <a
              key={cta.label}
              href={cta.href}
              onClick={(e) => handleCTAClick(e, cta.href)}
              className={`px-8 py-3 rounded-lg font-medium transition-all ${
                cta.label === "See Resume"
                  ? "bg-teal-600 text-white hover:bg-teal-700 shadow-lg hover:shadow-xl"
                  : "border-2 border-gray-300 dark:border-gray-600 hover:border-teal-600 dark:hover:border-teal-500"
              }`}
            >
              {cta.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
