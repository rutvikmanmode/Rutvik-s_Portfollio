import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/personalData';
import { Code2, Cpu, Users, Activity, CheckCircle } from 'lucide-react';
import clsx from 'clsx';

export const Projects = () => {
  return (
    <section id="projects" className="py-24 relative z-10 bg-[#020204]">
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-24 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-800 pb-8"
        >
          <div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-2 flex items-center gap-4">
              <Activity className="text-magenta-500" size={40} />
              SYSTEM DEPLOYMENTS
            </h2>
            <div className="text-gray-400 font-mono tracking-widest mt-4">PRODUCTION READY ARCHITECTURES</div>
          </div>
          <div className="hidden md:block text-right">
            <div className="font-mono text-cyan-400 text-sm">TOTAL ENTITIES: 02</div>
            <div className="font-mono text-gray-500 text-xs">STATUS: OPERATIONAL</div>
          </div>
        </motion.div>

        <div className="flex flex-col gap-32">
          {/* JOBIFY - AI Recruitment System */}
          <ProjectJobify project={projects[0]} />
          
          {/* SOCIAL APP - Real-time Social Platform */}
          <ProjectSocial project={projects[1]} />
        </div>
      </div>
    </section>
  );
};

const ProjectJobify = ({ project }: { project: any }) => {
  const [matchScore, setMatchScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMatchScore(prev => {
        if (prev >= 94) return 94;
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="relative flex flex-col xl:flex-row gap-12"
    >
      {/* Visual / Interactive Area */}
      <div className="w-full xl:w-3/5 glass-panel rounded-lg p-1 min-h-[500px] border-cyan-500/30 flex flex-col overflow-hidden relative group">
        <div className="bg-[#050508] w-full h-full p-6 relative z-10 flex flex-col">
          {/* AI HUD Header */}
          <div className="flex justify-between items-center border-b border-gray-800 pb-4 mb-8">
            <div className="flex items-center gap-3 text-cyan-400 font-mono">
              <Cpu className="animate-pulse" size={20} />
              <span>AI_MATCH_ENGINE_v1.0</span>
            </div>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></div>
              <div className="w-2 h-2 rounded-full bg-cyan-500 opacity-50"></div>
              <div className="w-2 h-2 rounded-full bg-cyan-500 opacity-20"></div>
            </div>
          </div>

          {/* AI Pipeline Visualization */}
          <div className="flex-1 flex flex-col md:flex-row gap-8 items-center justify-center font-mono text-sm">
            
            {/* Pipeline Flow */}
            <div className="flex-1 w-full max-w-sm flex flex-col gap-4 relative">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-800">
                <motion.div 
                  className="w-full bg-cyan-400"
                  animate={{ height: ['0%', '100%'], top: ['0%', '0%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {[
                { name: 'RESUME INPUT', delay: 0 },
                { name: 'DOCUMENT PARSER', delay: 0.4 },
                { name: 'SKILL EXTRACTION', delay: 0.8 },
                { name: 'MATCH ENGINE', delay: 1.2 },
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: step.delay, duration: 0.5 }}
                  className="pl-12 relative flex items-center"
                >
                  <div className="absolute left-3 w-2.5 h-2.5 rounded-full bg-cyan-400 border-[3px] border-black -translate-x-1/2"></div>
                  <div className="w-full bg-gray-900 border border-gray-800 p-3 text-gray-300 shadow-[0_0_10px_rgba(0,255,255,0.05)]">
                    {step.name}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Results Panel */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="flex-1 w-full border border-cyan-500/30 bg-[#0a0a0f] p-6 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-cyan-500/5 scanline"></div>
              <div className="text-center mb-6">
                <div className="text-gray-500 text-xs tracking-widest mb-2">COMPATIBILITY SCORE</div>
                <div className="text-5xl font-display text-cyan-400 neon-text-cyan">{matchScore}.7%</div>
              </div>

              <div className="space-y-4">
                {[
                  { skill: 'JavaScript', score: 98 },
                  { skill: 'React', score: 94 },
                  { skill: 'Node.js', score: 91 },
                  { skill: 'MongoDB', score: 87 }
                ].map((s, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-300">{s.skill}</span>
                      <span className="text-cyan-400">{s.score}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 w-full">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.score}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.5 + (i * 0.2), duration: 0.8 }}
                        className="h-full bg-cyan-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center text-xs text-green-400 font-bold tracking-widest flex items-center justify-center gap-2">
                <CheckCircle size={14} /> RECRUITER DECISION: APPROVE
              </div>
            </motion.div>

          </div>
        </div>
        
        {/* Animated gradient background border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 -z-10 group-hover:opacity-100 opacity-50 transition-opacity blur-md"></div>
      </div>

      {/* Information Area */}
      <div className="w-full xl:w-2/5 flex flex-col justify-center">
        <div className="text-cyan-400 font-mono text-sm tracking-widest mb-4">01 // {project.tag}</div>
        <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 uppercase tracking-wide">
          {project.title}
        </h3>
        
        <p className="text-gray-400 leading-relaxed mb-8 text-lg">
          {project.description}
        </p>

        <div className="mb-8">
          <div className="text-white font-mono text-sm mb-4 border-b border-gray-800 pb-2">CORE FUNCTIONALITY:</div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.features.map((feature: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                <span className="text-cyan-500 mt-1">▹</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {project.techStack.map((tech: string) => (
            <span key={tech} className="px-3 py-1 bg-cyan-950/30 border border-cyan-900/50 text-cyan-400 font-mono text-xs rounded-sm">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white text-black font-display font-bold tracking-widest hover:bg-cyan-400 transition-colors">
            <Code2 size={18} /> GITHUB
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectSocial = ({ project }: { project: any }) => {
  const [messages, setMessages] = useState([
    { text: "System initialized...", sender: "system", time: "10:00:00" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 1000));
      setMessages(prev => [...prev, { text: "Socket connection established.", sender: "system", time: "10:00:01" }]);
      
      await new Promise(r => setTimeout(r, 1500));
      setMessages(prev => [...prev, { text: "Hey, are you online?", sender: "user", time: "10:00:02" }]);
      
      await new Promise(r => setTimeout(r, 500));
      setIsTyping(true);
      
      await new Promise(r => setTimeout(r, 2000));
      setIsTyping(false);
      setMessages(prev => [...prev, { text: "Yeah! Just testing the new real-time architecture.", sender: "me", time: "10:00:04" }]);
      
      await new Promise(r => setTimeout(r, 1500));
      setMessages(prev => [...prev, { text: "Event: MESSAGE_DELIVERED", sender: "system", time: "10:00:05" }]);
    };
    
    // Only run when in view (simplified here, in a real app use IntersectionObserver)
    sequence();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="relative flex flex-col xl:flex-row-reverse gap-12"
    >
      {/* Visual / Interactive Area */}
      <div className="w-full xl:w-3/5 glass-panel rounded-lg p-1 min-h-[500px] border-purple-500/30 flex flex-col overflow-hidden relative group">
        <div className="bg-[#050508] w-full h-full p-6 relative z-10 flex flex-col items-center justify-center">
          
          {/* Mobile Phone Mockup */}
          <div className="w-[300px] h-[550px] border-4 border-gray-800 rounded-[2rem] bg-[#0a0a0f] relative overflow-hidden shadow-[0_0_30px_rgba(176,38,255,0.15)] flex flex-col">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-20"></div>
            
            {/* App Header */}
            <div className="pt-8 pb-3 px-4 bg-gray-900 border-b border-purple-500/30 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.5)] z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 flex items-center justify-center">
                    <Users size={20} className="text-white" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                </div>
                <div>
                  <div className="font-display text-white text-sm">NEON NETWORK</div>
                  <div className="text-green-400 font-mono text-[10px] flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    ONLINE
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 overflow-hidden flex flex-col gap-3 font-mono text-xs relative">
              
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={clsx(
                      "max-w-[85%] rounded-lg p-2",
                      msg.sender === 'system' ? "bg-transparent border border-gray-800 text-gray-500 self-center text-center text-[10px]" :
                      msg.sender === 'me' ? "bg-purple-600/20 border border-purple-500/50 text-white self-end rounded-tr-none" :
                      "bg-gray-800 border border-gray-700 text-gray-200 self-start rounded-tl-none"
                    )}
                  >
                    {msg.text}
                    {msg.sender !== 'system' && (
                      <div className="text-[9px] text-gray-500 text-right mt-1">{msg.time}</div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-gray-800 border border-gray-700 text-gray-400 self-start rounded-lg rounded-tl-none p-2 w-12 flex justify-center gap-1"
                >
                  <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                  <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                  <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-gray-900 border-t border-gray-800 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-gray-400">+</div>
              <div className="flex-1 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center px-3 text-gray-500 text-xs font-mono">
                Message...
              </div>
            </div>

          </div>
          
          {/* Architecture floaters */}
          <div className="absolute top-1/4 left-8 font-mono text-[10px] text-purple-400 flex flex-col gap-2 items-end opacity-70 hidden sm:flex">
            <div className="px-2 py-1 border border-purple-500/30 bg-purple-900/10">Socket.IO Server</div>
            <div className="h-4 w-px bg-purple-500/50 mr-4"></div>
            <div className="px-2 py-1 border border-purple-500/30 bg-purple-900/10">Conversation Room</div>
          </div>
          
          <div className="absolute bottom-1/4 right-8 font-mono text-[10px] text-cyan-400 flex flex-col gap-2 items-start opacity-70 hidden sm:flex">
            <div className="px-2 py-1 border border-cyan-500/30 bg-cyan-900/10">FCM Push</div>
            <div className="h-4 w-px bg-cyan-500/50 ml-4"></div>
            <div className="px-2 py-1 border border-cyan-500/30 bg-cyan-900/10">Cloudinary Media</div>
          </div>

        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 -z-10 group-hover:opacity-100 opacity-50 transition-opacity blur-md"></div>
      </div>

      {/* Information Area */}
      <div className="w-full xl:w-2/5 flex flex-col justify-center">
        <div className="text-purple-400 font-mono text-sm tracking-widest mb-4">02 // {project.tag}</div>
        <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 uppercase tracking-wide">
          {project.title}
        </h3>
        
        <p className="text-gray-400 leading-relaxed mb-8 text-lg">
          {project.description}
        </p>

        <div className="mb-8">
          <div className="text-white font-mono text-sm mb-4 border-b border-gray-800 pb-2">CORE FUNCTIONALITY:</div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.features.map((feature: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                <span className="text-purple-500 mt-1">▹</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {project.techStack.map((tech: string) => (
            <span key={tech} className="px-3 py-1 bg-purple-950/30 border border-purple-900/50 text-purple-400 font-mono text-xs rounded-sm">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white text-black font-display font-bold tracking-widest hover:bg-purple-400 transition-colors">
            <Code2 size={18} /> GITHUB
          </a>
        </div>
      </div>
    </motion.div>
  );
};
