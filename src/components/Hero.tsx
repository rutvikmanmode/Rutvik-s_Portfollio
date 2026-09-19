import { motion } from 'framer-motion';
import { Code2, Briefcase, ChevronDown } from 'lucide-react';
import { personalInfo } from '../data/personalData';
import { AIMascotChat } from './AIMascotChat';

export const Hero = () => {
  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full z-10 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="flex-1 flex flex-col gap-6 md:pr-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-cyan-400 font-mono tracking-widest text-sm md:text-base flex items-center gap-3"
            >
              <span className="w-10 h-[1px] bg-cyan-400"></span>
              SYS.INIT // {personalInfo.role.toUpperCase()}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight"
            >
              I BUILD SYSTEMS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-magenta-500">
                THAT FEEL ALIVE.
              </span>
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-wrap gap-3 font-mono text-xs md:text-sm text-gray-400"
            >
              <span className="px-3 py-1 bg-gray-900 border border-gray-800 rounded-sm">REACT</span>
              <span className="px-3 py-1 bg-gray-900 border border-gray-800 rounded-sm">NODE</span>
              <span className="px-3 py-1 bg-gray-900 border border-gray-800 rounded-sm">AI</span>
              <span className="px-3 py-1 bg-gray-900 border border-gray-800 rounded-sm">REAL-TIME</span>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="text-lg text-gray-400 max-w-xl leading-relaxed mt-2"
            >
              {personalInfo.intro}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="flex flex-col sm:flex-row sm:flex-wrap items-center gap-4 mt-4"
            >
              <button 
                onClick={scrollToProjects}
                className="px-6 sm:px-8 py-3.5 sm:py-4 bg-transparent border-2 border-cyan-500 text-cyan-400 font-display font-bold tracking-widest hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all duration-300 relative overflow-hidden group whitespace-nowrap text-center"
              >
                <span className="relative z-10">[ EXPLORE MY WORK ]</span>
                <div className="absolute inset-0 bg-cyan-500/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
              
              <button 
                onClick={scrollToContact}
                className="px-6 sm:px-8 py-3.5 sm:py-4 bg-white/5 border border-white/10 text-white font-display font-bold tracking-widest hover:bg-white/10 transition-all duration-300 whitespace-nowrap text-center"
              >
                [ CONNECT ]
              </button>

              <div className="flex items-center gap-4 ml-0 sm:ml-2 mt-2 sm:mt-0">
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-cyan-500 transition-colors">
                  <Code2 size={20} />
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-blue-500 transition-colors">
                  <Briefcase size={20} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right side AI Mascot Chat */}
          <div className="flex-1 w-full flex justify-center items-start mt-10 md:mt-0 relative z-20">
            <AIMascotChat />
          </div>
          
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 animate-bounce cursor-pointer"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="font-mono text-xs tracking-widest">SCROLL</span>
        <ChevronDown size={20} />
      </motion.div>
    </section>
  );
};
