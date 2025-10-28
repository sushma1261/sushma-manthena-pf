import { MessageSquare, ShoppingBag, Video } from "lucide-react";
import AquaIOT from "./aquaiot.jpeg";
import CodeBridge from "./codebridg.png";
import interview from "./interview.jpeg";
import VQuest from "./vquest.jpeg";

export const siteMetadata = {
  title: "Sushma Manthena | Full Stack Developer",
  description:
    "Full Stack Developer with 4+ years at Flipkart. Expert in React, React Native, AI solutions, and scalable web applications.",
  openGraph: {
    title: "Sushma Manthena - Full Stack Developer",
    description:
      "Building scalable web & mobile applications with NextJS, Java, AI, and Node.js",
    images: ["/og-image.svg"],
  },
};

export const heroData = {
  name: "Sushma Manthena",
  headline: {
    role: "Full Stack Developer",
    experience: "4+ Years",
    company: "Flipkart",
  },
  tagline:
    "Building scalable web & mobile applications with NextJS, Java, AI, and Node.js",
  ctas: [
    { label: "View Projects", href: "#experience" },
    { label: "See Resume", href: "/SushmaManthenaResume.pdf" },
    { label: "Contact Me", href: "#contact" },
  ],
};

export const contactData = {
  email: "varma.sushma1998@gmail.com",
  phone: "+1 206-696-6916",
  linkedin: "https://linkedin.com/in/sushma-varma",
  github: "https://github.com/sushma1261",
  location: "Seattle, WA",
};

export const educationData = [
  {
    school: "University of Washington",
    location: "Bothell, WA, US",
    degree: "Master's in Computer Science and Software Engineering",
    year: "Expected Dec 2025",
    courses: [
      "Mobile Computing",
      "Machine Learning",
      "Research Methods in Software Development",
      "High Performance Computing",
      "Software Architecture",
      "Algorithm Design And Analysis",
    ],
    cgpa: "3.85/4",
  },
  {
    school: "Shri Vishnu Engineering College for Women(A)",
    location: "Bhimavaram, AP, India",
    degree: "Bachelor's in Information Technology",
    year: "2016-2020",
    cgpa: "8.95/10",
    courses: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Database Management System",
      "Computer Networks",
      "Operating Systems",
    ],
  },
];

export const skillsData = {
  "Programming Languages": [
    "Java",
    "JavaScript",
    "TypeScript",
    "C",
    "C++",
    "Python",
    "Swift",
  ],
  "Frontend Technologies": [
    "ReactJS",
    "ReactNative",
    "HTML",
    "CSS",
    "Next.js",
    "Node.js",
    "TailwindCSS",
  ],
  Databases: ["MySQL", "MongoDB", "Firebase", "Redis", "GraphQL"],
  "DevOps & Tools": [
    "Git",
    "Docker",
    "Kubernetes",
    "Jenkins",
    "GitHub",
    "Postman",
    "Figma",
  ],

  "Operating Systems": ["MacOS", "Windows", "Linux"],
  "Build Automation Tools": [
    "Jenkins",
    "Maven",
    "Gradle",
    "Webpack",
    "Vite",
    "NPM",
  ],
  "Other technologies and frameworks": [
    "IoT",
    "JUnit",
    "Jest",
    "Dropwizard",
    "Spring Boot",
    "Machine Learning",
    "Material UI",
  ],
};

// Icon mapping for experience projects
export const projectIcons = {
  video: Video,
  message: MessageSquare,
  shopping: ShoppingBag,
};

export const experienceData = [
  {
    dates: "May 2024 - Aug 2024",
    role: "UI Engineer",
    company: "Flipkart",
    project: "Video Commerce",
    projectIcon: Video,
    summary:
      "Built Video Commerce UI with React Native, integrated reward APIs, and improved user engagement through interactive video features.",
    tech: ["React Native", "JavaScript", "REST APIs"],
    responsibilities: [
      "Developed the Video Commerce UI using React Native to support live streaming and offer product discounts to users who engaged with the videos. Integrated reward management system APIs to allocate rewards based on user interactions, improving user retention and engagement.",
    ],
  },
  {
    dates: "Jun 2020 - May 2024",
    role: "Software Development Engineer",
    company: "Flipkart",
    project: "Chat Platform",
    projectIcon: MessageSquare,
    summary:
      "Led development of Idiom tool, chat bots, and microservices migration to cloud, improving testing efficiency and deployment speed.",
    tech: ["React", "Java", "SpringBoot", "Microservices"],
    projects: {
      "Idiom and Dialog Manager": [
        "Developed Idiom from scratch, a conversational design tool using ReactJS and Java, enabling designers to define user flows and journeys, and improved its performance by 6 times.",
        "Led end-to-end development of bot simulation framework to validate behavior in real-world scenarios, enabling comprehensive testing across environments.",
        "Designed and built a version-control feature in the Idiom tool, enabling users to manage, track, and revert to previous versions seamlessly.",
        "Implemented the Decision Assistant bot, using Java SpringBoot and DropWizard frameworks, to help users make informed purchases by integrating Flipkart services for real-time product data and facilitate a smooth transfer to an agent when the bot was unable to address user queries.",
        "Migrated 10 micro-services from VMs to cloud and ensured 85% test coverage by implementing quality control gates in production code, while also handling on-call responsibilities.",
      ],
      Harvey: [
        "Developed a tool for business, product, and development teams to analyze chats, ensuring seamless integration of front-end and back-end components.",
        "Streamlined end-to-end service deployments by optimizing CI/CD pipelines, resulting in a 35% reduction in deployment time and handled on-call responsibilities.",
      ],
      "Flipkart App": [
        "Collaborated cross-functionally with the Product team to develop and enhance the front-end of a chat messaging interface on Flipkart, using HTTP and Web Socket connections and implemented interactive UI components to boost user engagement, support informed product decisions, and deliver seamless customer support experiences",
      ],
    },
  },
  {
    dates: "Apr 2021 - Jun 2021",
    role: "Software Development Engineer",
    company: "Flipkart",
    project: "Shopsy",
    projectIcon: ShoppingBag,
    summary:
      "Developed earnings dashboard and integrated engagement tools, contributing to a successful app launch and better user insights.",
    tech: ["React Native", "JavaScript", "Analytics"],
    responsibilities: [
      "Developed an earnings dashboard and various UI screens for the app's initial launch in June 2021, contributing to a successful launch and providing users with valuable insights into their earnings",
      "Integrated App with branch.io for user engagement and Mo-engage for push notification and other analytic features.",
    ],
  },
];

export const projectsData = [
  {
    title: "iHyre",
    subtitle: "AI Interview Platform",
    description:
      "An AI-powered interview platform that orchestrates LLM-driven interview agents, record/review flows and provides scoring and feedback to candidates.",
    skills: ["Node.js", "GenAI", "ReactJS", "Typescript"],
    demo: "https://mock-interview-frontend-peach.vercel.app/",
    github: "https://github.com/sushma-manthena/MockItUp",
    metrics: ["5x hiring throughput"],
    image: interview,
  },
  {
    title: "Luna mHealth App",
    subtitle: "In Progress",
    description:
      "Developing an offline-first mobile app that provides multilingual, audio-enabled health education content to underserved communities with limited internet access.",
    skills: ["Flutter", "Dart", "Mockito"],
    demo: "",
    imageWebp: "/images/luna.webp",
    imageFallback: "/images/luna.svg",
    imageSrcSet: [
      { src: "/images/luna-1200.webp", width: 1200 },
      { src: "/images/luna-800.webp", width: 800 },
      { src: "/images/luna-480.webp", width: 480 },
    ],
  },
  {
    title: "CodeBridg",
    description:
      "Developing a collaborative platform for real-time chat, file sharing, and pair programming with seamless communication and code collaboration.",
    skills: [
      "Next.js",
      "ReactJS",
      "TypeScript",
      "Java",
      "Spring Boot",
      "MySQL",
      "Postgres",
      "Redis",
      "JUnit",
      "Jest",
    ],
    github: "https://github.com/sushma1261/projectSD-frontend",
    image: CodeBridge,
  },

  {
    title: "VQuest",
    description:
      "Developed a website for a college, enabling students to post academic doubts and receive answers from experts, enhancing student engagement and learning",
    skills: ["ReactJS", "Firebase"],
    github: "https://github.com/sushma1261/vquest",
    image: VQuest,
  },
  {
    title: "Real Time Aqua Pond Management System ",
    description:
      "an IoT project with an Android app to monitor aqua farms, providing farmers with actionable insights to improve farm management.",
    skills: ["IOT", "Android"],
    link: "",
    image: AquaIOT,
  },
];
