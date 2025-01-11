import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { skillsData } from "@/lib/data";
import { Wrench } from "lucide-react";
import { forwardRef } from "react";
const Skills = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} id="skills">
      <div className="section-scroll animate-fade-in">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Wrench className="h-6 w-6" />
          Skills
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {Object.entries(skillsData).map(([category, skills], index) => (
            <Card
              key={category}
              className="p-6 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <h3 className="font-bold mb-4 flex items-center gap-2">
                {/* {category === "Frontend Technologies" && (
                  <Globe className="h-5 w-5" />
                )}
                {category === "Backend Technologies" && (
                  <Server className="h-5 w-5" />
                )}
                {category === "Databases" && <Database className="h-5 w-5" />}
                {category === "DevOps & Tools" && <Code className="h-5 w-5" />} */}
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="hover:scale-105 transition-transform"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Skills;
