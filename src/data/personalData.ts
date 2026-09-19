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
  category: 'AI & Tools' | 'Mobile Systems' | 'Full-Stack Web' | 'Gamified & Web3';
  description: string;
  features: string[];
  techStack: string[];
  isPrivateRepo: boolean;
  githubUrl?: string;
  demoUrl?: string;
  metrics?: { label: string; value: string }[];
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
  phone: "+91-8605735695",
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
    id: "verzat-rd",
    company: "Verzat R&D PVT Ltd",
    role: "SDE Intern",
    period: "July 2026 – Present",
    description: [
      "Developed a full-stack CRM web application using Spring Boot and React, implementing Role-Based Access Control (RBAC), optimizing APIs, improving performance, and enhancing overall system reliability.",
      "Developed and implemented chat ecosystem across web (React) and android (Kotlin) while improving scalability and security of backend."
    ],
    skills: ["Spring Boot", "React", "Kotlin", "Android", "Java", "RBAC", "Chat Ecosystem", "REST APIs", "Backend Security"]
  },
  {
    id: "nd-softech",
    company: "ND Softech Solutions LLP",
    role: "SDE L1",
    period: "Mar 2026 – Jun 2026",
    description: [
      "Developed a full-stack social media application using React Native, Node.js, and MongoDB with features including authentication, real-time chat, reels, push notifications, and responsive UI design.",
      "Integrated REST APIs, JWT authentication, Firebase notifications, Cloudinary media storage, and Socket.IO to build secure, scalable, and real-time mobile application functionalities."
    ],
    skills: ["React Native", "Node.js", "MongoDB", "Express.js", "Socket.IO", "Firebase Auth & FCM", "Cloudinary", "JWT", "REST APIs"]
  },
  {
    id: "hum-aspen",
    company: "Hum Aspen Wellness Pvt Ltd",
    role: "Full Stack Development Internship",
    period: "Nov 2024 – Jan 2025",
    description: [
      "Developed and optimized web-based solutions as a Full Stack Development Intern, contributing to front-end and back-end improvements, debugging, and deployment activities to enhance functionality of digital wellness platforms.",
      "Collaborated with cross-functional teams to integrate health AI platforms, improving user experience and ensuring smooth operation of web applications."
    ],
    skills: ["React.js", "Node.js", "Express.js", "REST APIs", "Health AI Integration", "Debugging", "Web Optimization", "Cloud Deployment"]
  }
];

export const projects: Project[] = [
  {
    id: "ai-edit",
    title: "AI EDIT",
    tag: "AI PHOTO GENERATION & STUDIO",
    category: "AI & Tools",
    description: "Enterprise-grade AI image creation and manipulation suite. Unites a responsive React Native mobile experience with an asynchronous Node.js micro-worker backend for text-to-image diffusion, style transforms, and smart background/object editing.",
    features: [
      "Text-to-Image high-fidelity diffusion models via Pixazo (Flux Schnell) and DeAPI",
      "Image-to-Image style transformations retaining facial & subject contours",
      "Smart Tools Suite: AI background removal, inpainting object eraser, fine-tune color & multi-frame collage stitcher",
      "Community trending feed with one-click prompt remixing and collections",
      "Automated background worker with multi-account Cloudinary CDN rotation and automatic failover",
      "Hybrid Firebase Auth with Google Sign-In and automated MongoDB data sync"
    ],
    techStack: ["React Native 0.86", "TypeScript", "Node.js 22", "Express", "MongoDB 8", "Firebase Auth", "Cloudinary Multi-CDN", "Flux Schnell (Pixazo)", "DeAPI"],
    isPrivateRepo: true,
    metrics: [
      { label: "DIFFUSION ENGINE", value: "FLUX SCHNELL" },
      { label: "WORKER PIPELINE", value: "ASYNC POLLING" }
    ]
  },
  {
    id: "jobify",
    title: "JOBIFY",
    tag: "AI RECRUITMENT & ATS PLATFORM",
    category: "Full-Stack Web",
    description: "Next-generation AI-ready recruitment and career acceleration platform connecting candidates and recruiters through intelligent PDF resume parsing, automated ATS scoring, real-time messaging, and talent analytics.",
    features: [
      "Automated PDF resume parsing and skill extraction powered by pdf-parse and textract",
      "Real-time ATS compatibility scoring matching applicant competencies against active job postings",
      "1-Click Apply & Auto-Apply with customizable ATS match threshold (>= 80%)",
      "Integrated WebSocket chat with in-thread interview scheduling and lifecycle management",
      "Recruiter Talent Analytics: Recharts hiring funnel, application velocity trends, and skill gap radar",
      "Professional community news feed with image uploads, likes, and comment threads"
    ],
    techStack: ["React 19.2", "Tailwind CSS 3.4", "Node.js 18+", "Express 5.2", "MongoDB (Mongoose 9)", "Socket.io 4.8", "pdf-parse", "Recharts"],
    isPrivateRepo: true,
    demoUrl: "https://jobify-nu-flame.vercel.app/",
    metrics: [
      { label: "ATS MATCH ACCURACY", value: "94.7%" },
      { label: "DEPLOYMENT", value: "VERCEL LIVE" }
    ]
  },
  {
    id: "abhaang",
    title: "ABHAANG",
    tag: "DEVOTIONAL AUDIO STREAMING",
    category: "Mobile Systems",
    description: "Cloud-powered mobile devotional music streaming platform dedicated to Indian spiritual bhajans and abhaangs. Delivers instant audio streaming, intelligent local caching, 100% offline direct-to-device downloads, and background playback.",
    features: [
      "High-fidelity audio playback with dynamic mini-player dock and rich full-screen player",
      "Direct-to-device downloads via react-native-fs with transparent smart cache playback",
      "Native Android foreground service integration for background and lock screen media notification controls",
      "Synchronized devotional lyrics viewer for spiritual singing and chanting along",
      "Dual-tier security: Firebase Auth client-side + Firebase Admin SDK signed JWT session tokens",
      "Smart Host Auto-Discovery dynamically binding across physical devices, emulators, and cloud"
    ],
    techStack: ["React Native 0.84", "TypeScript 5", "Node.js 22", "Express 5", "MongoDB Mongoose", "Firebase Auth & FCM", "Android Foreground Service", "Cloudinary", "react-native-fs"],
    isPrivateRepo: true,
    metrics: [
      { label: "AUDIO ENGINE", value: "STREAM + CACHE" },
      { label: "OFFLINE MODE", value: "100% DIRECT" }
    ]
  },
  {
    id: "pengu",
    title: "PENGU",
    tag: "GAMIFIED CRYPTO IDLE-MINING",
    category: "Gamified & Web3",
    description: "Web3-inspired gamified idle crypto mining ecosystem built for high user retention. Users activate interactive cloud mining cycles with an animated mascot, elevate hashrates up to 25x via rewarded ads, and track non-custodial wallet balances.",
    features: [
      "Session-based cloud mining (1h, 4h, 8h) with animated penguin mascot and tiered hash rates",
      "Google AdMob rewarded video multiplier boosts escalating up to 25x earning power",
      "Dual-tier telemetry: live WebSocket ticks and automated 60s & 5m background cron calculations",
      "Non-custodial crypto wallet withdrawal ledger with multi-source breakdown and dynamic token/USD conversion",
      "Social bounty missions (Telegram, X, YouTube, Google Play) with proof submission & anti-fraud verification",
      "7-day daily check-in streaks, animated surprise gift box drops, and viral referral network"
    ],
    techStack: ["React Native 0.85", "React 19.2", "TypeScript 5.8", "Node.js 22+", "Express 5.2", "MongoDB Atlas", "Socket.IO 4.8", "Firebase Auth / FCM", "Google AdMob", "Lottie"],
    isPrivateRepo: true,
    metrics: [
      { label: "HASH MULTIPLIER", value: "UP TO 25x" },
      { label: "TELEMETRY", value: "CRON + WSS" }
    ]
  },
  {
    id: "social-app",
    title: "SOCIAL APP",
    tag: "REAL-TIME MOBILE SOCIAL NETWORK",
    category: "Mobile Systems",
    description: "Modern high-performance social networking platform built with React Native and Node.js/Express. Features vertical short-form video reels, low-latency Socket.io messaging with read receipts, stories, and digital wellbeing screen time tracking.",
    features: [
      "Vertical full-screen swipe video reels with custom video compression via Cloudinary",
      "1-on-1 instant messaging powered by Socket.io with delivery/read receipts and typing indicators",
      "Dynamic multi-media feed powered by Shopify FlashList for smooth 60fps scrolling",
      "24-hour expiring stories carousel and interactive double-tap likes with nested comments",
      "Social graph with friend requests, mutual friends detection, and user privacy controls",
      "Built-in Digital Wellbeing screen time tracking and daily usage limits"
    ],
    techStack: ["React Native 0.85", "TypeScript", "Node.js 18+", "Express 5", "MongoDB Mongoose", "Socket.io", "Firebase Auth / FCM", "Cloudinary CDN", "FlashList"],
    isPrivateRepo: true,
    metrics: [
      { label: "FEED RENDER", value: "60 FPS FLASHLIST" },
      { label: "LATENCY", value: "SUB-100MS" }
    ]
  },
  {
    id: "task-abomination",
    title: "TASK ABOMINATION",
    tag: "GAMIFIED PRODUCTIVITY & ARCADE",
    category: "Gamified & Web3",
    description: "Gamified productivity platform with a gritty cyberpunk aesthetic turning daily habits and routine tracking into an arcade survival RPG with playable in-browser canvas mini-games, lethal coin economy, and global leaderboards.",
    features: [
      "Playable HTML5 Canvas mini-games: 'Zombie Rush' (top-down horde shooter) and 'Zombie Run' (side-scroller runner)",
      "Daily missions and weekly milestones with real-time XP and lethal coin rewards",
      "Rewards hub with 7-day login streaks, spin-the-wheel prize drops, and lethal currency wallet",
      "Real-time global leaderboards with podium visual hierarchy across game modes and quest masters",
      "Player dashboard with character level progression, total XP breakdown, and transaction ledger",
      "Dual authentication: Firebase Google OAuth + JWT / Express Session protection"
    ],
    techStack: ["React 19.2", "Vite 7.3", "Tailwind CSS v4.2", "Motion v12", "HTML5 Canvas", "Web Audio API", "Node.js 20+", "Express 5.2", "MongoDB Mongoose 9"],
    isPrivateRepo: true,
    metrics: [
      { label: "ARCADE ENGINE", value: "CANVAS + AUDIO" },
      { label: "MINI-GAMES", value: "ZOMBIE RUSH / RUN" }
    ]
  },
  {
    id: "mern-enterprise-suite",
    title: "MERN ENTERPRISE SUITE",
    tag: "ENTERPRISE SECURITY & WORKSPACE",
    category: "Full-Stack Web",
    description: "Enterprise full-stack MERN application suite engineered with cryptographic HMAC SHA-256 client-server request signing, OTP email authentication with TTL expiry, task CRM, contact inquiry desk with direct SMTP replies, and Socket.IO workspace.",
    features: [
      "HMAC SHA-256 cryptographic client-server request signing preventing tampering and replay attacks",
      "Email-based OTP verification with automated MongoDB TTL expiration for secure registration & recovery",
      "Task management dashboard with overdue highlighting, search, and dynamic linked profile cards",
      "Admin contact & enquiry desk with lifecycle resolution and direct Nodemailer SMTP email replies",
      "Real-time Socket.IO chat workspace with user presence indicators and unread badge counters",
      "Dual authentication strategy: JWT API tokens combined with Passport.js session management"
    ],
    techStack: ["React 19", "Tailwind CSS 4", "Motion", "Node.js", "Express", "MongoDB", "Socket.IO", "Nodemailer SMTP", "HMAC SHA-256", "Passport.js"],
    isPrivateRepo: true,
    metrics: [
      { label: "SECURITY", value: "HMAC SHA-256" },
      { label: "AUTH ENGINE", value: "OTP + JWT + SESSIONS" }
    ]
  }
];

export const techCategories = {
  "Frontend & Mobile": ["React.js", "React Native", "Kotlin", "TypeScript", "JavaScript", "Tailwind CSS", "HTML5 Canvas"],
  "Backend": ["Spring Boot", "Java", "Node.js", "Express.js", "REST APIs", "Passport.js", "Cron Workers"],
  "Database": ["MongoDB", "MongoDB Atlas", "MySQL"],
  "Cloud & DevOps": ["Firebase", "Cloudinary", "AWS", "Vercel", "Render"],
  "Real-time & Telemetry": ["Socket.IO", "WebSockets", "FCM Push", "react-native-fs"],
  "AI & Media": ["Flux Schnell", "Pixazo AI", "DeAPI", "pdf-parse / ATS", "Gemini AI"],
  "Security": ["HMAC SHA-256", "JWT", "OTP Verification", "Bcrypt"]
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
