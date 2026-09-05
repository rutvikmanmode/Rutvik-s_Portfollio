import { motion } from 'framer-motion';
import { education } from '../data/personalData';
import { GraduationCap } from 'lucide-react';

export const Education = () => {
  return (
    <section id="education" className="py-24 relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-2 flex items-center justify-center gap-4">
            <GraduationCap className="text-cyan-400" size={32} />
            EDUCATION
          </h2>
          <div className="h-1 w-24 bg-cyan-500 shadow-[0_0_10px_rgba(0,255,255,0.5)] mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu, i) => (
            <motion.div 
              key={edu.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="glass-panel p-8 relative overflow-hidden group hover:border-cyan-500/50 transition-colors"
            >
              {/* HUD Frame Corners */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors"></div>
              
              <div className="font-mono text-cyan-400 text-sm mb-4 tracking-widest">{edu.period}</div>
              <h3 className="text-2xl font-display font-bold text-white mb-2 leading-tight">{edu.degree}</h3>
              <div className="text-gray-400 font-mono text-sm mb-6">{edu.institution}</div>
              
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-900/20 border border-cyan-900/50 text-cyan-400 font-mono text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                {edu.score}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
