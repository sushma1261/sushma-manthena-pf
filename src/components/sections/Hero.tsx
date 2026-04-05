import { heroData } from "@/lib/data";
import { ArrowDown } from "lucide-react";
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

      // Calculate progress based on scroll position - start scaling immediately
      const scrollDistance = -rect.top;
      // We want the effect to complete over the viewport height
      const totalScrollableDistance = viewportHeight;

      let progress = 0;
      if (totalScrollableDistance > 0) {
        // Clamp between 0 and 1
        progress = Math.max(
          0,
          Math.min(1, scrollDistance / totalScrollableDistance),
        );
      }

      // Scale from 1 to 1.4 (gentle zoom)
      // Only scale if we're scrolling down into the section (positive scroll distance)
      const newScale = 1 + progress * 0.4;

      // Opacity fades out as we scroll away
      // Start fading out after 20% scroll
      const fadeStart = 0.2;
      const newOpacity =
        1 - Math.max(0, (progress - fadeStart) * (1 / (1 - fadeStart)));

      requestAnimationFrame(() => {
        setScale(newScale);
        setOpacity(newOpacity);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCTAClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    // Only intercept internal links (starting with #)
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
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[600px] w-full overflow-hidden"
    >
      {/* Background gradients and blobs */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 -z-20" />

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-teal-400/20 dark:bg-teal-900/20 blur-[100px] animate-blob mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute top-[40%] right-[10%] w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] rounded-full bg-blue-400/20 dark:bg-blue-900/20 blur-[100px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-[10%] left-[30%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] rounded-full bg-purple-400/20 dark:bg-purple-900/20 blur-[100px] animate-blob animation-delay-4000 mix-blend-multiply dark:mix-blend-screen" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.2) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 z-10">
        <div
          className="max-w-4xl mx-auto space-y-6 md:space-y-8 will-change-transform"
          style={{
            transform: `scale(${scale})`,
            opacity: opacity,
          }}
        >
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-medium text-teal-600 dark:text-teal-400 tracking-wide animate-fadeIn opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
              Hi, I'm
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight animate-fadeIn opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
              {heroData.name}
            </h1>
          </div>

          <h2 className="text-2xl md:text-4xl font-semibold text-slate-700 dark:text-slate-300 animate-fadeIn opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards]">
            {heroData.headline.role}
          </h2>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed animate-fadeIn opacity-0 [animation-delay:800ms] [animation-fill-mode:forwards]">
            {heroData.tagline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 sm:pt-8 animate-fadeIn opacity-0 [animation-delay:1000ms] [animation-fill-mode:forwards]">
            {heroData.ctas.map((cta) => (
              <a
                key={cta.label}
                href={cta.href}
                target={
                  cta.href.startsWith("http") || cta.href.endsWith(".pdf")
                    ? "_blank"
                    : undefined
                }
                rel={
                  cta.href.startsWith("http") || cta.href.endsWith(".pdf")
                    ? "noopener noreferrer"
                    : undefined
                }
                onClick={(e) => handleCTAClick(e, cta.href)}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-medium transition-all transform hover:-translate-y-1 active:scale-95 duration-200 ${
                  cta.label === "See Resume" || cta.label === "View Resume"
                    ? "bg-teal-600 text-white hover:bg-teal-700 shadow-lg hover:shadow-teal-500/25 ring-offset-2 focus:ring-2 ring-teal-500"
                    : "bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-400 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm"
                }`}
              >
                {cta.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce opacity-0 animate-fadeIn [animation-delay:1500ms] [animation-fill-mode:forwards]">
        <a
          href="#experience"
          onClick={(e) => handleCTAClick(e, "#experience")}
          className="p-2 rounded-full text-slate-400 dark:text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          aria-label="Scroll down"
        >
          <ArrowDown className="w-6 h-6" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
