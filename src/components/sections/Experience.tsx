import { experienceData } from "@/lib/data";
import { forwardRef } from "react";

const getBullets = (exp: (typeof experienceData)[0]): string[] => {
  if ("responsibilities" in exp && exp.responsibilities) {
    return exp.responsibilities as string[];
  }
  if ("projects" in exp && exp.projects) {
    return Object.values(exp.projects as Record<string, string[]>).flat();
  }
  return [];
};

const Experience = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section
      ref={ref}
      id="experience"
      className="bg-surface-container-low py-32 px-8 md:px-24"
    >
      {/* Section header */}
      <div className="mb-24 reveal">
        <h2 className="font-headline text-4xl md:text-6xl font-bold tracking-tight text-on-surface">
          Experience
        </h2>
      </div>

      {/* Experience entries */}
      <div className="space-y-24 max-w-7xl mx-auto">
        {experienceData.map((exp, index) => {
          const bullets = getBullets(exp).slice(0, 3);
          return (
            <div key={index} className="editorial-grid reveal">
              <div className="col-span-1">
                <p className="font-label text-sm text-primary font-medium">
                  {exp.dates}
                </p>
              </div>
              <div className="col-span-3 md:col-span-2">
                <h3 className="font-headline text-2xl font-bold mb-1">
                  {exp.role}{" "}
                  <span className="text-on-surface-variant">@ {exp.company}</span>
                </h3>
                <p className="font-body text-on-surface-variant mb-6 text-sm">
                  {exp.project}
                </p>
                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {exp.tech.map((t, i) => (
                    <span
                      key={i}
                      className="font-label text-xs uppercase tracking-widest text-tertiary border border-tertiary/30 px-2.5 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {/* Bullets */}
                <ul className="space-y-4">
                  {bullets.map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="text-tertiary mt-[6px] flex-shrink-0">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                      <p className="font-body text-base leading-relaxed text-on-surface-variant">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
});

Experience.displayName = "Experience";
export default Experience;
