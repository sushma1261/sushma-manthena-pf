import { educationData } from "@/lib/data";
import { forwardRef } from "react";

const Education = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} id="education" className="py-32 px-8 md:px-24 bg-surface">
      {/* Header row */}
      <div className="mb-16 reveal">
        <h2 className="font-headline text-4xl md:text-6xl font-bold tracking-tight text-on-surface">
          Education
        </h2>
      </div>

      {/* Content row */}
      <div className="reveal">
        <div className="space-y-12">
            {educationData.map((edu, index) => (
              <div key={index}>
                <h4 className="font-headline text-2xl font-bold text-on-surface mb-1">
                  {edu.degree}
                </h4>
                <p className="font-body text-on-surface-variant">{edu.school}</p>
                <p className="font-label text-sm text-primary font-medium mt-1">
                  {edu.year}
                  {edu.cgpa && (
                    <span className="text-outline font-normal ml-4">
                      GPA: {edu.cgpa}
                    </span>
                  )}
                </p>
                {edu.courses && edu.courses.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {edu.courses.map((course, idx) => (
                      <span
                        key={idx}
                        className="font-label text-xs uppercase tracking-wider text-outline border border-outline-variant px-2.5 py-1"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
      </div>
    </section>
  );
});

Education.displayName = "Education";
export default Education;
