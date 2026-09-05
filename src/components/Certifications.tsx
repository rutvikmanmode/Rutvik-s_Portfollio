import { motion } from 'framer-motion';
import { certifications } from '../data/personalData';
import { Award, CheckCircle } from 'lucide-react';

export const Certifications = () => {
  return (
    <section className="py-24 relative z-10 bg-[#020204]">
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-2 flex items-center gap-4">
              <Award className="text-magenta-500" size={32} />
              CERTIFICATIONS
            </h2>
            <div className="h-1 w-24 bg-magenta-500 shadow-[0_0_10px_rgba(255,0,255,0.5)]"></div>
          </div>
          
          <div className="text-gray-400 font-mono tracking-widest text-sm">
            VALIDATED MODULES: {certifications.length}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, i) => (
            <motion.div 
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-panel p-6 border border-gray-800 hover:border-magenta-500/50 relative overflow-hidden group transition-all duration-300 hover:-translate-y-2 cursor-default"
            >
              {/* Holographic sweep effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-magenta-500/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div className="p-2 bg-gray-900 border border-gray-700 rounded-sm text-magenta-400">
                  <Award size={20} />
                </div>
                <div className="text-green-400">
                  <CheckCircle size={16} />
                </div>
              </div>

              <div className="text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">{cert.issuer}</div>
              <h3 className="font-display text-white font-bold text-lg leading-tight group-hover:text-magenta-300 transition-colors">{cert.title}</h3>
              
              {/* Decorative data blocks */}
              <div className="absolute bottom-0 right-0 p-2 flex gap-1 opacity-20">
                <div className="w-1 h-3 bg-white"></div>
                <div className="w-1 h-2 bg-white"></div>
                <div className="w-1 h-4 bg-magenta-500"></div>
                <div className="w-1 h-1 bg-white"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
