import { projectsData } from "@/lib/data";
import React, { useEffect, useRef, useState } from "react";

const FeaturedCarousel: React.FC = () => {
  const featured = projectsData.slice(0, 4);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + featured.length) % featured.length);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % featured.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [featured.length]);

  // Autoplay
  useEffect(() => {
    if (paused) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % featured.length),
      5000
    );
    return () => clearInterval(t);
  }, [featured.length, paused]);

  const goPrev = () =>
    setIndex((i) => (i - 1 + featured.length) % featured.length);
  const goNext = () => setIndex((i) => (i + 1) % featured.length);

  return (
    <section id="featured" className="relative" aria-roledescription="carousel">
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            width: `${featured.length * 100}%`,
            transform: `translateX(-${(index * 100) / featured.length}%)`,
          }}
        >
          {featured.map((p) => (
            <div
              key={p.title}
              className="w-full flex-shrink-0"
              style={{ width: `${100 / featured.length}%` }}
            >
              <div className="relative w-full h-64 md:h-80 lg:h-96">
                {p.imageSrcSet ? (
                  <picture>
                    <source
                      srcSet={p.imageSrcSet
                        .map(
                          (s: { src: string; width: number }) =>
                            `${s.src} ${s.width}w`
                        )
                        .join(", ")}
                      type="image/webp"
                      sizes="(max-width: 768px) 480px, (max-width: 1200px) 800px, 1200px"
                    />
                    <img
                      src={p.imageFallback ?? p.image ?? "/images/idiom.svg"}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  </picture>
                ) : p.imageWebp ? (
                  <picture>
                    <source srcSet={p.imageWebp} type="image/webp" />
                    <img
                      src={p.imageFallback ?? p.image ?? "/images/idiom.svg"}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  </picture>
                ) : (
                  <img
                    src={p.image ?? "/images/idiom.svg"}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                  <div className="text-white max-w-xl">
                    <h3 className="text-xl md:text-2xl font-bold">{p.title}</h3>
                    {p.subtitle && (
                      <p className="text-sm md:text-base opacity-90">
                        {p.subtitle}
                      </p>
                    )}
                    <div className="mt-2 flex gap-3">
                      {p.demo ? (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1 bg-teal-600 rounded-md text-sm"
                        >
                          Demo
                        </a>
                      ) : null}
                      {p.github ? (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1 border rounded-md text-sm bg-white/10"
                        >
                          GitHub
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Prev/Next controls */}
        <button
          onClick={goPrev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full"
        >
          ‹
        </button>
        <button
          onClick={goNext}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full"
        >
          ›
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
          {featured.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full ${
                i === index ? "bg-teal-600" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCarousel;
