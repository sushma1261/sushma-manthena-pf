import { educationData } from "@/lib/data";
import { BookOpen, GraduationCap } from "lucide-react";
import { forwardRef, useEffect, useRef } from "react";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

const Education = forwardRef<HTMLElement>((props, ref) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="education"
      className="section-scroll animate-fade-in"
    >
      <div className="opacity-0" ref={contentRef}>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <GraduationCap className="h-6 w-6" />
          Education
        </h2>
        <div className="grid gap-4">
          {educationData.map((edu, index) => (
            <Card
              key={index}
              className="p-6 group hover:shadow-lg transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-bold">{edu.degree}</h3>
              </div>
              <p className="text-muted-foreground">{edu.school}</p>
              <p className="text-sm text-muted-foreground">{edu.year}</p>
              <p className="text-sm text-muted-foreground">CGPA: {edu.cgpa}</p>

              <div className="flex flex-wrap gap-2 mt-2">
                {edu.courses.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
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

export default Education;
