import { MobileNav } from "@/components/MobileNav";
import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, BookOpen, Code, Globe, Database, Laptop, Server, Wrench } from "lucide-react";

const educationData = [
  {
    degree: "Bachelor of Science in Computer Science",
    school: "University of Technology",
    year: "2018-2022",
    courses: ["Data Structures", "Algorithms", "Web Development", "Database Systems"],
  },
];

const experienceData = [
  {
    dates: "2022 - Present",
    role: "Senior Software Developer",
    company: "Tech Corp",
    project: "E-commerce Platform",
    responsibilities: [
      "Led development of microservices architecture",
      "Implemented CI/CD pipeline",
      "Mentored junior developers",
    ],
  },
  {
    dates: "2020 - 2022",
    role: "Software Developer",
    company: "Digital Solutions Inc",
    project: "Healthcare Management System",
    responsibilities: [
      "Developed REST APIs",
      "Implemented authentication system",
      "Optimized database queries",
    ],
  },
];

const projectsData = [
  {
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution with real-time inventory management",
    image: "/placeholder.svg",
    skills: ["React", "Node.js", "MongoDB", "Docker"],
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates",
    image: "/placeholder.svg",
    skills: ["Vue.js", "Express", "PostgreSQL", "WebSocket"],
  },
];

const skillsData = {
  "Frontend Technologies": ["React", "Vue.js", "TypeScript", "Tailwind CSS", "Next.js"],
  "Backend Technologies": ["Node.js", "Express", "NestJS", "GraphQL"],
  "Databases": ["PostgreSQL", "MongoDB", "Redis", "MySQL"],
  "DevOps & Tools": ["Docker", "Kubernetes", "AWS", "Git", "CI/CD"],
};

const Index = () => {
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 h-16 border-b bg-background/80 backdrop-blur-sm md:pl-72 z-50 md:hidden">
        <div className="flex items-center justify-between h-full px-4">
          <MobileNav />
        </div>
      </header>

      <Sidebar />

      <main className="pt-16 md:pl-72">
        <div className="container py-8 space-y-16">
          {/* Hero Section - Only visible on mobile */}
          <section className="md:hidden min-h-[60vh] flex flex-col justify-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-in-right">
              John Doe
            </h1>
            <h2 className="text-2xl md:text-3xl text-muted-foreground mb-6 animate-slide-in-right" style={{ animationDelay: "200ms" }}>
              Software Developer
            </h2>
            <p className="text-lg text-muted-foreground max-w-lg animate-slide-in-right" style={{ animationDelay: "400ms" }}>
              Building digital experiences with passion and precision.
            </p>
          </section>

          <section id="about" className="section-scroll animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">About Me</h2>
            <p className="text-muted-foreground">
              I'm a passionate software developer with expertise in building scalable web applications.
              With over 4 years of experience, I specialize in creating efficient and user-friendly
              solutions using modern technologies.
            </p>
          </section>

          <section id="education" className="section-scroll animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <GraduationCap className="h-6 w-6" />
              Education
            </h2>
            <div className="grid gap-4">
              {educationData.map((edu, index) => (
                <Card key={index} className="p-6 group hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-bold">{edu.degree}</h3>
                  </div>
                  <p className="text-muted-foreground">{edu.school}</p>
                  <p className="text-sm text-muted-foreground">{edu.year}</p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="font-medium">Relevant Courses:</p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {edu.courses.map((course, i) => (
                        <li key={i}>{course}</li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section id="skills" className="section-scroll animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Wrench className="h-6 w-6" />
              Skills
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {Object.entries(skillsData).map(([category, skills], index) => (
                <Card key={category} className="p-6 animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    {category === "Frontend Technologies" && <Globe className="h-5 w-5" />}
                    {category === "Backend Technologies" && <Server className="h-5 w-5" />}
                    {category === "Databases" && <Database className="h-5 w-5" />}
                    {category === "DevOps & Tools" && <Code className="h-5 w-5" />}
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="hover:scale-105 transition-transform">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section id="experience" className="section-scroll animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Experience</h2>
            <div className="space-y-8">
              {experienceData.map((exp, index) => (
                <div key={index} className="grid grid-cols-[1fr,3fr] gap-4 animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="text-sm text-muted-foreground">{exp.dates}</div>
                  <div>
                    <h3 className="font-bold">{exp.role}</h3>
                    <p className="text-muted-foreground">{exp.company}</p>
                    <p className="text-sm font-medium mt-2">{exp.project}</p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground mt-2">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="projects" className="section-scroll animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Projects</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {projectsData.map((project, index) => (
                <Card key={index} className="overflow-hidden hover:scale-105 transition-transform animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-bold">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.skills.map((skill, i) => (
                        <Badge key={i} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
