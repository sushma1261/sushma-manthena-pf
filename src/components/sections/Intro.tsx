import React, { useEffect, useRef, useState } from "react";

const Intro: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementHeight = rect.height;

      // Start revealing when the element enters the viewport (bottom of viewport)
      // Finish revealing when it's near the top (or center)
      const start = viewportHeight * 0.8;
      const end = viewportHeight * 0.2;
      
      // Calculate progress based on position in viewport
      // rect.top is positive when below viewport top
      const currentPos = rect.top;
      
      let progress = 0;
      if (currentPos < start) {
        progress = 1 - (currentPos - end) / (start - end);
      }
      
      progress = Math.max(0, Math.min(1, progress));

      requestAnimationFrame(() => {
        setScrollProgress(progress);
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const text = "Since beginning my journey as a software developer, I've worked at Flipkart for over 4 years building scalable web and mobile applications. I've led the development of conversational design tools, AI-powered platforms, and live commerce experiences that serve millions of users. Currently pursuing my Master's in Computer Science at the University of Washington, I'm quietly confident, naturally curious, and perpetually working on improving my skills in AI, cloud technologies, and full-stack development.";
  
  const words = text.split(" ");

  return (
    <section className="py-20 md:py-32 bg-white dark:bg-gray-900 min-h-[50vh] flex items-center">
      <div className="max-w-4xl mx-auto px-6" ref={containerRef}>
        <h2 className="font-bold text-center mb-10 text-3xl md:text-4xl">
          Hi, I'm Sushma. Nice to meet you.
        </h2>
        <p className="text-xl md:text-3xl text-center leading-relaxed font-medium text-muted-foreground">
          {words.map((word, i) => {
            // Calculate opacity for this specific word based on overall progress
            // We want a cascade effect.
            const step = 1 / words.length;
            const wordProgress = Math.max(0, Math.min(1, (scrollProgress - i * step) / (step * 5))); // * 5 makes the transition smoother/wider
            
            // Or simpler: map progress 0-1 to word index.
            // If progress is 0.5, first 50% of words should be lit.
            const isLit = i / words.length < scrollProgress;
            
            return (
              <span 
                key={i} 
                className="transition-colors duration-200"
                style={{ 
                    color: isLit ? "var(--foreground)" : "inherit",
                    opacity: isLit ? 1 : 0.5
                }}
              >
                {word}{" "}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
};

export default Intro;
