import { heroData } from "@/lib/data";
import React, { useEffect, useRef, useState } from "react";

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionHeight = rect.height;

      // Calculate progress based on scroll position
      const scrollDistance = -rect.top;
      const totalScrollableDistance = sectionHeight - viewportHeight;
      
      let progress = 0;
      if (totalScrollableDistance > 0) {
        progress = Math.max(0, Math.min(1, scrollDistance / totalScrollableDistance));
      }

      // Scale from 1 to 1.6 (stronger zoom)
      const newScale = 1 + progress * 0.6;
      
      // Opacity fades out later (starts at 70% scroll)
      const newOpacity = 1 - Math.max(0, (progress - 0.7) * 3);

      requestAnimationFrame(() => {
        setScale(newScale);
        setOpacity(newOpacity);
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <section ref={sectionRef} className="relative h-[150vh] bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-grid-black/[0.02] dark:bg-grid-white/[0.02] -z-10" />
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-teal-200/20 dark:bg-teal-900/20 blur-[100px] animate-blob" />
          <div className="absolute -bottom-[40%] -right-[20%] w-[70%] h-[70%] rounded-full bg-blue-200/20 dark:bg-blue-900/20 blur-[100px] animate-blob animation-delay-2000" />
          <div className="absolute top-[20%] right-[20%] w-[50%] h-[50%] rounded-full bg-purple-200/20 dark:bg-purple-900/20 blur-[100px] animate-blob animation-delay-4000" />
        </div>
        
        <div 
            className="text-center px-6 max-w-4xl mx-auto space-y-4 will-change-transform"
            style={{ 
                transform: `scale(${scale})`, 
                opacity: opacity,
            }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight animate-fadeIn [animation-fill-mode:forwards] opacity-0 [animation-delay:100ms]">
            {heroData.name}
          </h1>
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-semibold tracking-tight leading-tight text-teal-600 dark:text-teal-400 animate-fadeIn [animation-fill-mode:forwards] opacity-0 [animation-delay:300ms]">
            {heroData.headline.role}
          </h2>
          <p className="text-xl md:text-2xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fadeIn [animation-fill-mode:forwards] opacity-0 [animation-delay:500ms]">
            {heroData.tagline}
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-6 animate-fadeIn [animation-fill-mode:forwards] opacity-0 [animation-delay:700ms]">
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
      </div>
    </section>
  );
};

export default Hero;
