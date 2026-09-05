import { motion } from 'framer-motion';
import { experiences } from '../data/personalData';
import { Clock } from 'lucide-react';

export const Experience = () => {
  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-2 flex items-center justify-center gap-4">
            <Clock className="text-purple-400" size={32} />
            TIMELINE
          </h2>
          <div className="h-1 w-24 bg-purple-500 shadow-[0_0_10px_rgba(176,38,255,0.5)] mx-auto"></div>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main timeline line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-800 md:-translate-x-1/2">
            <motion.div 
              className="absolute top-0 w-full bg-gradient-to-b from-cyan-400 via-purple-500 to-magenta-500 shadow-[0_0_15px_rgba(0,255,255,0.5)]"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          <div className="flex flex-col gap-12 md:gap-24">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div key={exp.id} className="relative flex flex-col md:flex-row items-start">
                  
                  {/* Timeline Node */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-4 h-4 bg-black border-2 border-cyan-400 rounded-full z-10 shadow-[0_0_10px_rgba(0,255,255,0.8)] mt-6 md:mt-0"
                  />

                  {/* Content Container */}
                  <div className={`w-full md:w-1/2 pl-12 md:px-12 ${isEven ? 'md:pr-12 md:pl-0 md:text-right' : 'md:pl-12 md:ml-auto'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="glass-panel p-6 md:p-8 rounded-sm relative group hover:border-cyan-500/50 transition-colors"
                    >
                      <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
                        <div className="text-6xl font-display font-bold text-cyan-500">
                          {isEven ? '01' : '02'}
                        </div>
                      </div>

                      <div className="font-mono text-cyan-400 text-sm mb-2 font-bold tracking-widest">
                        {exp.period}
                      </div>
                      
                      <h3 className="text-2xl font-display font-bold text-white mb-1">
                        {exp.company}
                      </h3>
                      
                      <div className="text-purple-400 font-mono text-sm mb-6 pb-4 border-b border-gray-800 inline-block">
                        {exp.role}
                      </div>
                      
                      <ul className="space-y-2 mb-6">
                        {exp.description.map((item, i) => (
                          <li key={i} className={`text-gray-400 text-sm flex items-start gap-2 ${isEven ? 'md:justify-end md:flex-row-reverse' : ''}`}>
                            <span className="text-cyan-500 mt-1 flex-shrink-0">
                              {isEven ? '<' : '>'}
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : ''}`}>
                        {exp.skills.map(skill => (
                          <span key={skill} className="px-2 py-1 bg-gray-900 border border-gray-700 text-gray-300 text-xs font-mono rounded-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      {/* Corner Accents */}
                      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan-500/50"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyan-500/50"></div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
          
        </div>
      </div>
    </section>
  );
};
