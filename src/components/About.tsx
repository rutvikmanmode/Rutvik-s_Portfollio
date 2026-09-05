import { motion } from 'framer-motion';
import { personalInfo } from '../data/personalData';
import { Terminal, Shield, Code } from 'lucide-react';

export const About = () => {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-2 flex items-center gap-4">
            <Terminal className="text-cyan-400" size={32} />
            SYSTEM PROFILE
          </h2>
          <div className="h-1 w-24 bg-cyan-500 shadow-[0_0_10px_rgba(0,255,255,0.5)]"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Profile Terminal */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 glass-panel rounded-sm relative overflow-hidden"
          >
            {/* Terminal Header */}
            <div className="bg-gray-900 border-b border-gray-700 p-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="font-mono text-xs text-gray-500 ml-4">profile.exe</span>
            </div>
            
            <div className="p-6 md:p-8 font-mono text-sm md:text-base leading-relaxed">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-8 mb-8 border-b border-gray-800 pb-8">
                <div>
                  <div className="text-gray-500 mb-1">NAME:</div>
                  <div className="text-cyan-400 font-bold">{personalInfo.name}</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">ROLE:</div>
                  <div className="text-white">{personalInfo.role}</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">CURRENT STATUS:</div>
                  <div className="text-green-400 animate-pulse">{personalInfo.status}</div>
                </div>
              </div>

              <div className="text-gray-500 mb-4">SPECIALIZATION:</div>
              <ul className="space-y-3">
                {personalInfo.specializations.map((spec, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="text-cyan-500">&gt;</span>
                    <span className="text-gray-300">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* HUD Decorations */}
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyan-500/30 -mt-2 -mr-2"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-cyan-500/30 -mb-2 -ml-2"></div>
          </motion.div>

          {/* System Statistics */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="p-6 border border-gray-800 bg-[#050508]/80 rounded-sm">
              <h3 className="font-display text-lg text-white mb-6 flex items-center gap-3">
                <Code className="text-purple-400" size={20} />
                SYSTEM ALLOCATION
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between font-mono text-xs mb-2">
                    <span className="text-gray-400">FULL STACK</span>
                    <span className="text-cyan-400">92%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-900 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "92%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className="h-full bg-cyan-400 shadow-[0_0_10px_#0ff]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-mono text-xs mb-2">
                    <span className="text-gray-400">REAL-TIME</span>
                    <span className="text-purple-400">85%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-900 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "85%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="h-full bg-purple-400 shadow-[0_0_10px_#b026ff]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-mono text-xs mb-2">
                    <span className="text-gray-400">MOBILE</span>
                    <span className="text-magenta-500">88%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-900 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "88%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 1.0 }}
                      className="h-full bg-magenta-500 shadow-[0_0_10px_#ff00ff]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-mono text-xs mb-2">
                    <span className="text-gray-400">AI SYSTEMS</span>
                    <span className="text-blue-400">75%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-900 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "75%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 1.2 }}
                      className="h-full bg-blue-400 shadow-[0_0_10px_#3b82f6]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border border-gray-800 bg-cyan-900/10 rounded-sm flex items-start gap-4">
              <div className="p-3 bg-cyan-500/20 rounded-sm">
                <Shield className="text-cyan-400" size={24} />
              </div>
              <div>
                <div className="font-display text-white mb-1">SECURITY CLEARANCE</div>
                <div className="font-mono text-xs text-gray-400">Level 4 Authorization Granted. System functioning within normal parameters.</div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
