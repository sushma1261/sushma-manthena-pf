import { CheckCircle2, User } from "lucide-react";
import { forwardRef, useEffect, useRef } from "react";

const AboutMe = forwardRef<HTMLElement>((props, ref) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
            observer.unobserve(entry.target); // animate once
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
    <section ref={ref} id="about">
      <div className="section-scroll opacity-0" ref={contentRef}>
        {/* Header */}
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <User className="h-6 w-6" />
          About Me
        </h2>

        {/* Intro */}
        <p className="text-lg font-medium text-foreground">
          Full Stack Developer with 4+ years of experience building scalable,
          user-focused applications.
        </p>

        {/* Highlights */}
        <ul className="space-y-2 mt-4 text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
            Specialized in front-end with ReactJS & back-end with Java
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
            Built Flipkart’s Video Commerce UI and developed testing tools to
            improve efficiency
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
            Exploring cutting-edge technologies like Agentic AI, autonomous
            agent tools, and large language models (LLMs)
          </li>
        </ul>

        {/* Current Focus */}
        <p className="mt-6 text-muted-foreground">
          Currently pursuing a{" "}
          <b>
            Master’s in Computer Science at the University of Washington Bothell
          </b>
          , exploring machine learning, iOS app development, and advanced
          problem-solving.
        </p>

        {/* Personal touch */}
        <p className="mt-4 italic text-muted-foreground">
          I’m passionate about collaborating with diverse teams, staying curious
          about emerging technologies, and building solutions that simplify
          complex challenges. Beyond writing code, I enjoy mentoring peers,
          sharing knowledge, and creating products that have a meaningful impact
          on people’s lives.
        </p>
      </div>
    </section>
  );
});

AboutMe.displayName = "AboutMe";
export default AboutMe;
