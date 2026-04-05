import { heroData } from "@/lib/data";
import React from "react";

const Hero: React.FC = () => {
  return (
    <section
      className="min-h-screen flex flex-col justify-center px-8 md:px-24 py-32 overflow-hidden bg-surface"
      id="work"
    >
      <div className="editorial-grid fade-in-load">
        <div className="col-span-4 md:col-start-2 md:col-span-2">
          <div>
            <h1 className="font-headline text-[3.5rem] md:text-[5rem] leading-[1] font-bold tracking-tighter mb-6 text-on-surface">
              Sushma <br /> Manthena
            </h1>
            <p className="font-label text-sm uppercase tracking-[0.2em] text-tertiary mb-12">
              Full Stack Developer
            </p>
            <p className="font-body text-xl md:text-2xl text-on-surface-variant max-w-xl leading-relaxed">
              {heroData.tagline}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
