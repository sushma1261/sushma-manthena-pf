import { forwardRef } from "react";

const theStack = [
  {
    category: "Core",
    items: ["Java", "JavaScript", "TypeScript", "Python", "Swift"],
  },
  {
    category: "Frontend",
    items: ["ReactJS", "React Native", "Next.js", "Node.js", "TailwindCSS"],
  },
  {
    category: "Backend & Data",
    items: ["MySQL", "MongoDB", "Redis", "Spring Boot", "GraphQL"],
  },
  {
    category: "DevOps & Tools",
    items: ["Docker", "Kubernetes", "Jenkins", "Git", "Figma"],
  },
];

const Skills = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} id="skills" className="py-32 px-8 md:px-24 bg-surface">
      {/* Header row */}
      <div className="mb-16 reveal">
        <h2 className="font-headline text-4xl md:text-6xl font-bold tracking-tight text-on-surface">
          Tech Stack
        </h2>
      </div>

      {/* Stack columns */}
      <div className="reveal">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
            {theStack.map((col) => (
              <div key={col.category}>
                <h4 className="font-label text-xs uppercase tracking-widest text-tertiary mb-6">
                  {col.category}
                </h4>
                <ul className="font-headline text-lg md:text-xl space-y-3 text-on-surface">
                  {col.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
});

Skills.displayName = "Skills";
export default Skills;

