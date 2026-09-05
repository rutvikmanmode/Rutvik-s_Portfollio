import { motion } from 'framer-motion';
import { Database, Server, Smartphone, Globe, Shield, MessageSquare, Image, Bell, Layers } from 'lucide-react';

const archLayers = [
  { id: 'client', name: 'CLIENT', tech: 'React / React Native', icon: Smartphone, color: 'text-cyan-400', border: 'border-cyan-500/30', bg: 'bg-cyan-500/10' },
  { id: 'api', name: 'API LAYER', tech: 'REST APIs', icon: Globe, color: 'text-white', border: 'border-gray-600', bg: 'bg-gray-800/50' },
  { id: 'auth', name: 'AUTHENTICATION', tech: 'Firebase / JWT', icon: Shield, color: 'text-yellow-400', border: 'border-yellow-500/30', bg: 'bg-yellow-500/10' },
  { id: 'backend', name: 'BACKEND', tech: 'Node.js + Express', icon: Server, color: 'text-green-400', border: 'border-green-500/30', bg: 'bg-green-500/10' },
  { id: 'database', name: 'DATABASE', tech: 'MongoDB', icon: Database, color: 'text-green-500', border: 'border-green-600/30', bg: 'bg-green-600/10' },
];

const sideServices = [
  { id: 'realtime', name: 'REAL-TIME ENGINE', tech: 'Socket.IO', icon: MessageSquare, color: 'text-purple-400' },
  { id: 'media', name: 'MEDIA STORAGE', tech: 'Cloudinary', icon: Image, color: 'text-blue-400' },
  { id: 'push', name: 'NOTIFICATIONS', tech: 'FCM', icon: Bell, color: 'text-orange-400' },
];

export const Architecture = () => {
  return (
    <section id="architecture" className="py-24 relative z-10 bg-[#050508]">
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-2 flex items-center justify-center gap-4">
            <Layers className="text-blue-400" size={32} />
            SYSTEM ARCHITECTURE
          </h2>
          <div className="h-1 w-24 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] mx-auto"></div>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          
          {/* Animated data packets (background paths) */}
          <div className="absolute inset-0 pointer-events-none hidden md:block z-0">
            <svg className="w-full h-full" style={{ filter: "drop-shadow(0 0 4px rgba(0,255,255,0.5))" }}>
              <motion.path 
                d="M 500,50 L 500,600" 
                stroke="rgba(0,255,255,0.1)" 
                strokeWidth="2" 
                strokeDasharray="4 4" 
                fill="none" 
              />
              <motion.circle 
                cx="500"
                cy="50"
                r="4" 
                fill="#0ff"
                animate={{ cy: [50, 600] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.circle 
                cx="500"
                cy="50"
                r="4" 
                fill="#0ff"
                animate={{ cy: [50, 600] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1 }}
              />
            </svg>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start relative z-10">
            
            {/* Core Stack */}
            <div className="w-full md:w-2/3 flex flex-col gap-4">
              <div className="text-cyan-400 font-mono text-sm tracking-widest mb-4 border-b border-gray-800 pb-2">CORE STACK</div>
              
              {archLayers.map((layer, i) => (
                <div key={layer.id} className="relative group">
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                    className={`flex items-center gap-6 p-4 border ${layer.border} ${layer.bg} backdrop-blur-sm hover:scale-[1.02] transition-transform cursor-default relative overflow-hidden`}
                  >
                    <div className={`p-3 bg-gray-900 rounded-sm border border-gray-700 ${layer.color}`}>
                      <layer.icon size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="font-display font-bold text-white tracking-wider">{layer.name}</div>
                      <div className="font-mono text-gray-400 text-xs">{layer.tech}</div>
                    </div>
                    
                    {/* Hover scan effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                  </motion.div>
                  
                  {/* Connection arrows */}
                  {i < archLayers.length - 1 && (
                    <div className="w-full h-4 flex justify-center text-gray-700">
                      ↓
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Ancillary Services */}
            <div className="w-full md:w-1/3 flex flex-col gap-4 mt-12 md:mt-0">
              <div className="text-purple-400 font-mono text-sm tracking-widest mb-4 border-b border-gray-800 pb-2">MICROSERVICES & APIs</div>
              
              <div className="flex flex-col gap-6 h-full justify-center">
                {sideServices.map((service, i) => (
                  <motion.div 
                    key={service.id}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + (i * 0.2), duration: 0.5 }}
                    className="flex flex-col gap-2 p-4 border border-gray-800 bg-gray-900/50 hover:bg-gray-800/50 transition-colors relative group"
                  >
                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 ${service.color.replace('text', 'bg')}`}></div>
                    
                    <div className="flex items-center gap-3">
                      <service.icon size={18} className={service.color} />
                      <div className="font-display font-bold text-gray-200 text-sm">{service.name}</div>
                    </div>
                    <div className="font-mono text-gray-500 text-xs pl-8">{service.tech}</div>
                    
                    {/* Connection line to main stack (visual only on desktop) */}
                    <div className="hidden md:block absolute right-[100%] top-1/2 w-8 border-t border-dashed border-gray-700 pointer-events-none group-hover:border-purple-500/50 transition-colors"></div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
