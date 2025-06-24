import AquaIOT from "./aquaiot.jpeg";
import CodeBridge from "./colab.jpeg";
import Interview from "./interview.jpeg";
import Luna from "./luna.png";
import VQuest from "./vquest.jpeg";
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
    ],
    cgpa: "4/4",
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
  "Frontend Technologies": ["ReactJS", "ReactNative", "HTML", "CSS", "Next.js"],
  "Backend Technologies": ["Node.js", "Express", "NestJS", "GraphQL"],
  Databases: ["MySQL", "MongoDB", "Firebase", "Redis"],
  "DevOps & Tools": [
    "Git",
    "Docker",
    "Kubernetes",
    "Jenkins",
    "Github",
    "Postman",
    "Figma",
  ],
  "Build Automation Tools": [
    "Jenkins",
    "Maven",
    "Gradle",
    "Webpack",
    "Vite",
    "NPM",
  ],
  "Operating Systems": ["MacOS", "Windows", "Linux"],
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

export const experienceData = [
  {
    dates: "May 2024 - Aug 2024",
    role: "UI Engineer",
    company: "Flipkart",
    project: "Video Commerce",
    responsibilities: [
      "Developed the Video Commerce UI using React Native to support live streaming and offer product discounts to users who engaged with the videos. Integrated reward management system APIs to allocate rewards based on user interactions, improving user retention and engagement.",
    ],
  },
  {
    dates: "Jun 2020 - May 2024",
    role: "Software Development Engineer",
    company: "Flipkart",
    project: "Chat Platform",
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
    responsibilities: [
      "Developed an earnings dashboard and various UI screens for the app’s initial launch in June 2021, contributing to a successful launch and providing users with valuable insights into their earnings",
      "Integrated App with branch.io for user engagement and Mo-engage for push notification and other analytic features.",
    ],
  },
];

export const projectsData = [
  {
    title: "Luna mHealth App",
    subtitle: "In Progress",
    description:
      "Developing an offline-first mobile app that provides multilingual, audio-enabled health education content to underserved communities with limited internet access.",
    skills: ["Flutter", "Dart", "Mockito"],
    link: "",
    image: Luna,
  },
  {
    title: "CodeBridg",
    subtitle: "In Progress",
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
    link: "https://github.com/sushma1261/projectSD-frontend",
    image: CodeBridge,
  },
  {
    title: "MockItUp",
    description:
      "Developed a mobile app for conducting mock interviews, featuring real-time feedback and personalized practice recommendations to enhance user performance.",
    skills: ["iOS", "SwiftUI", "Gemini AI", "GenAI"],
    image: Interview,
    link: "https://github.com/sushma1261/MockItUp",
  },

  {
    title: "VQuest",
    description:
      "Developed a website for a college, enabling students to post academic doubts and receive answers from experts, enhancing student engagement and learning",
    skills: ["ReactJS", "Firebase"],
    link: "https://github.com/sushma1261/vquest",
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
