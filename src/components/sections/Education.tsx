"use client";

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
    <section ref={ref} id="education" className="section-scroll">
      <div className="opacity-0" ref={contentRef}>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <GraduationCap className="h-8 w-8 text-primary" />
          Education
        </h2>

        <div className="grid gap-6">
          {educationData.map((edu, index) => (
            <Card
              key={index}
              className="p-6 border-l-4 border-primary group hover:shadow-lg transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="h-5 w-5 text-accent" />
                <h3 className="font-bold text-lg md:text-xl">{edu.degree}</h3>
              </div>

              <p className="text-muted-foreground font-medium">{edu.school}</p>
              <p className="text-sm text-muted-foreground">{edu.year}</p>
              {edu.cgpa && (
                <p className="text-sm text-muted-foreground">
                  CGPA: {edu.cgpa}
                </p>
              )}

              {edu.courses && edu.courses.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {edu.courses.map((course, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="hover:scale-105 transition-transform text-sm"
                    >
                      {course}
                    </Badge>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
});

Education.displayName = "Education";
export default Education;
