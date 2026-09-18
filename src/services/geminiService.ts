import { GoogleGenAI } from '@google/genai';
import {
  personalInfo,
  experiences,
  projects,
  techCategories,
  education,
  certifications,
} from '../data/personalData';

// Build a comprehensive context string from portfolio data
function buildPortfolioContext(): string {
  const techStack = Object.entries(techCategories)
    .map(([cat, techs]) => `${cat}: ${techs.join(', ')}`)
    .join('\n');

  const projectDetails = projects
    .map(
      (p) =>
        `PROJECT: ${p.title} (${p.tag}) [Category: ${p.category}]\nDescription: ${p.description}\nFeatures: ${p.features.join('; ')}\nTech Stack: ${p.techStack.join(', ')}${p.demoUrl ? `\nLive Demo: ${p.demoUrl}` : ''}\nRepository: Private / Proprietary`
    )
    .join('\n\n');

  const experienceDetails = experiences
    .map(
      (e) =>
        `COMPANY: ${e.company}\nRole: ${e.role}\nPeriod: ${e.period}\nWork: ${e.description.join('; ')}\nSkills: ${e.skills.join(', ')}`
    )
    .join('\n\n');

  const educationDetails = education
    .map((e) => `${e.degree} — ${e.institution} (${e.period}) — ${e.score}`)
    .join('\n');

  const certDetails = certifications
    .map((c) => `${c.title} by ${c.issuer}`)
    .join('\n');

  return `
=== RUTVIK'S COMPLETE PROFILE ===

NAME: ${personalInfo.name}
ROLE: ${personalInfo.role}
EMAIL: ${personalInfo.email}
GITHUB: ${personalInfo.github}
LINKEDIN: ${personalInfo.linkedin}
STATUS: ${personalInfo.status}
INTRO: ${personalInfo.intro}
SPECIALIZATIONS: ${personalInfo.specializations.join(', ')}

=== TECH STACK ===
${techStack}

=== PROJECTS ===
${projectDetails}

=== WORK EXPERIENCE ===
${experienceDetails}

=== EDUCATION ===
${educationDetails}

=== CERTIFICATIONS ===
${certDetails}
`.trim();
}

const SYSTEM_PROMPT = `You are NEXUS — Rutvik's personal AI neural interface embedded in his portfolio website. You are a cyberpunk-themed AI assistant that speaks in a confident, tech-savvy, hacker-inspired style.

YOUR PERSONALITY:
- You speak like a futuristic AI from a cyberpunk world — sharp, precise, with flair
- Use tech metaphors and hacker jargon naturally (e.g., "neural link established", "scanning databanks", "deploying intel")
- Keep responses concise (2-4 sentences max) unless the user asks for detail
- Be enthusiastic about Rutvik's work — you're his digital advocate
- Use ">" at the start of key info lines for terminal aesthetic
- Occasionally use tech symbols like // :: [] for style
- NEVER make up information about Rutvik — only use the data provided below
- If asked something not in the data, say something like "That data isn't in my databanks yet. Ping Rutvik directly for classified intel."

YOUR JOB:
1. Introduce Rutvik and his portfolio to visitors
2. Answer questions about his skills, projects, experience, education, and certifications
3. Guide visitors to explore different sections of the portfolio
4. Encourage visitors to connect with Rutvik (provide email/LinkedIn/GitHub when relevant)

NAVIGATION GUIDANCE — when users ask about specific topics, guide them:
- Projects → "Scroll down to the SYSTEM DEPLOYMENTS section"
- Skills/Tech → "Check the TECH CONSTELLATION section"
- Experience → "Navigate to the TIMELINE section"
- Education → "Find it in the EDUCATION section"
- Contact → "Hit the CONNECT section at the bottom — or use the neural link: ${personalInfo.email}"

PORTFOLIO DATA:
${buildPortfolioContext()}

FIRST INTERACTION RULES:
- When the user first messages, give a brief cyberpunk-style welcome and ask how you can help
- Don't dump all info at once — reveal it conversationally
- If they say "hi" or greet you, respond with a cool cyberpunk greeting and briefly introduce yourself`;

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

type ChatSession = ReturnType<GoogleGenAI['chats']['create']>;
let chatSession: ChatSession | null = null;

function getAI(): GoogleGenAI | null {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

function initChat(ai: GoogleGenAI) {
  chatSession = ai.chats.create({
    model: 'gemini-3.5-flash-lite',
    config: {
      systemInstruction: SYSTEM_PROMPT,
      maxOutputTokens: 1000,
    },
  });
}

export async function sendMessage(userMessage: string): Promise<string> {
  const ai = getAI();

  if (!ai) {
    return getFallbackResponse(userMessage);
  }

  try {
    if (!chatSession) {
      initChat(ai);
    }

    const response = await chatSession!.sendMessage({
      message: userMessage,
    });

    return response.text?.trim() || '> Signal disrupted. Try again, operator.';
  } catch (error) {
    console.error('Gemini API error:', error);
    chatSession = null;
    return '> Neural link experiencing interference. Systems recalibrating... Try again in a moment.';
  }
}

export function resetChat(): void {
  chatSession = null;
}

// Fallback responses when no API key is configured
function getFallbackResponse(message: string): string {
  const msg = message.toLowerCase();

  if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey')) {
    return `> Neural link established. I'm NEXUS — ${personalInfo.name}'s AI interface. I can brief you on his projects, tech stack, or experience. What intel do you need?`;
  }

  if (msg.includes('project')) {
    return `> Scanning deployment logs... Found 7 high-impact production architectures:\n\n// 01. AI EDIT — Next-Gen AI photo generation & creative studio (Flux Schnell / DeAPI / React Native)\n// 02. JOBIFY — AI recruitment platform & ATS resume parsing (Live Demo: https://jobify-nu-flame.vercel.app/)\n// 03. ABHAANG — Devotional audio streaming with 100% offline direct downloads & Android foreground services\n// 04. PENGU — Web3 gamified idle-mining ecosystem with live WebSocket telemetry & AdMob 25x boosts\n// 05. SOCIAL APP — Full-stack mobile social network with vertical swipe reels & sub-100ms real-time chat\n// 06. TASK ABOMINATION — Cyberpunk gamified productivity arcade with playable HTML5 canvas games (Zombie Rush)\n// 07. MERN ENTERPRISE SUITE — Enterprise full-stack application with HMAC SHA-256 cryptographic request signing\n\n> Scroll down to SYSTEM DEPLOYMENTS to inspect all interactive modules!`;
  }

  if (msg.includes('skill') || msg.includes('tech') || msg.includes('stack')) {
    const allTech = Object.values(techCategories).flat().join(', ');
    return `> Tech arsenal loaded:\n${allTech}\n\n> Navigate to TECH CONSTELLATION for the interactive map.`;
  }

  if (msg.includes('experience') || msg.includes('work') || msg.includes('intern')) {
    return `> Employment records:\n// ${experiences[0].company} — ${experiences[0].role} (${experiences[0].period})\n// ${experiences[1].company} — ${experiences[1].role} (${experiences[1].period})\n\n> Check the TIMELINE section for the full story.`;
  }

  if (msg.includes('education') || msg.includes('college') || msg.includes('degree')) {
    return `> Academic logs:\n// ${education[0].degree} — ${education[0].institution}\n// Score: ${education[0].score}\n\n> Data node located in EDUCATION section.`;
  }

  if (msg.includes('contact') || msg.includes('email') || msg.includes('connect') || msg.includes('hire')) {
    return `> Establishing comm link...\n// Email: ${personalInfo.email}\n// GitHub: ${personalInfo.github}\n// LinkedIn: ${personalInfo.linkedin}\n\n> Or scroll to CONNECT section for direct transmission.`;
  }

  if (msg.includes('cert')) {
    const certs = certifications.map((c) => `${c.title} [${c.issuer}]`).join(', ');
    return `> Verified credentials: ${certs}\n\n> All modules validated and operational.`;
  }

  if (msg.includes('who') || msg.includes('about') || msg.includes('rutvik')) {
    return `> ${personalInfo.name} :: ${personalInfo.role}\n> ${personalInfo.intro}\n\n> Specializations: ${personalInfo.specializations.join(' // ')}\n> Status: ${personalInfo.status}`;
  }

  return `> I'm NEXUS, Rutvik's AI neural interface. I can access data on his projects, skills, experience, education, or contact info. What would you like to know?\n\n> [TIP] Try asking: "What projects has Rutvik built?" or "What's his tech stack?"`;
}
