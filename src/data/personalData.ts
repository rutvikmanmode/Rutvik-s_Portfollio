export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  tag: string;
  description: string;
  features: string[];
  techStack: string[];
  githubUrl: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  score: string;
}

export interface Certification {
  id: string;
  issuer: string;
  title: string;
}

export const personalInfo = {
  name: "Rutvik Sanjay Manmode",
  role: "Full-Stack Developer",
  email: "rutvikmanmode127@gmail.com",
  github: "https://github.com/rutvikmanmode",
  linkedin: "https://www.linkedin.com/in/rutvik-manmode-740942251/",
  specializations: [
    "Web Applications",
    "Mobile Applications",
    "Real-Time Systems",
    "AI-Powered Applications"
  ],
  status: "BUILDING / LEARNING / SHIPPING",
  intro: "Computer Science Engineer focused on building scalable web and mobile applications, real-time systems, and AI-powered products."
};

export const experiences: Experience[] = [
  {
    id: "nd-softech",
    company: "ND Softech Solutions",
    role: "SDE Intern",
    period: "Mar 2026 – May 2026",
    description: [
      "Developed a full-stack social media application",
      "Implemented authentication and built real-time chat",
      "Implemented reels and added push notifications",
      "Built responsive UI and integrated REST APIs",
      "Implemented JWT authentication and Firebase notifications"
    ],
    skills: ["React Native", "Node.js", "MongoDB", "REST APIs", "Firebase", "Socket.IO", "Cloudinary"]
  },
  {
    id: "hum-aspen",
    company: "Hum Aspen Wellness Pvt Ltd",
    role: "Full Stack Development Intern",
    period: "Nov 2024 – Jan 2025",
    description: [
      "Developed and optimized web-based solutions",
      "Contributed to front-end and back-end improvements",
      "Worked on debugging and deployment activities",
      "Improved functionality of digital wellness platforms",
      "Integrated health AI platforms"
    ],
    skills: ["Frontend", "Backend", "Debugging", "Deployment", "AI Platform Integration"]
  }
];

export const projects: Project[] = [
  {
    id: "jobify",
    title: "JOBIFY",
    tag: "AI RECRUITMENT SYSTEM",
    description: "An AI-powered hiring and recruitment platform connecting students and recruiters through intelligent resume parsing and skill-based job matching.",
    features: [
      "AI-powered recruitment & Resume parsing",
      "Skill extraction & Job matching",
      "Match score calculation & Job posting",
      "Application tracking & Hiring analytics",
      "Real-time scoring logic"
    ],
    techStack: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT", "Multer", "pdf-parse"],
    githubUrl: "https://github.com/rutvikmanmode" // Add correct URL if exists, else fallback
  },
  {
    id: "social-app",
    title: "SOCIAL APP",
    tag: "REAL-TIME SOCIAL PLATFORM",
    description: "A full-stack social media mobile application with real-time messaging, reels playback, and push notifications.",
    features: [
      "Authentication & User profiles",
      "Posts, Reels, Search, Friends",
      "Real-time messaging & Conversation rooms",
      "Typing indicators & Read/delivery status",
      "FCM push notifications & Cloudinary media"
    ],
    techStack: ["React Native", "Node.js", "Express.js", "MongoDB", "Socket.IO", "Firebase", "Zustand", "React Query", "Cloudinary"],
    githubUrl: "https://github.com/rutvikmanmode"
  }
];

export const techCategories = {
  "Frontend": ["React.js", "React Native", "TypeScript", "JavaScript"],
  "Backend": ["Node.js", "Express.js", "REST APIs"],
  "Database": ["MongoDB", "MySQL"],
  "Cloud": ["AWS", "Firebase", "Cloudinary"],
  "Tools": ["GitHub", "Postman", "Jest"],
  "Real-time": ["Socket.IO"]
};

export const education: Education[] = [
  {
    id: "btech",
    degree: "B.Tech Computer Science & Engineering",
    institution: "VIT Bhopal University",
    period: "2022–2026",
    score: "CGPA: 7.85"
  },
  {
    id: "hsc",
    degree: "Class 12 – HSC",
    institution: "Sri Chaitanya Junior College, Pune",
    period: "Completed",
    score: "82.3%"
  }
];

export const certifications: Certification[] = [
  {
    id: "cert-1",
    issuer: "NPTEL",
    title: "Cloud Computing"
  },
  {
    id: "cert-2",
    issuer: "NPTEL",
    title: "Marketing Analytics"
  },
  {
    id: "cert-3",
    issuer: "Euthnus",
    title: "MERN Full Stack Developer"
  },
  {
    id: "cert-4",
    issuer: "IBM",
    title: "Cyber Security Analyst"
  }
];
