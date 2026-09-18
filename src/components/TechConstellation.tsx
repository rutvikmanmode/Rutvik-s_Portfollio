import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { techCategories } from '../data/personalData';
import { Network } from 'lucide-react';

// Pre-calculated node positions for a pseudo-random constellation look
const nodePositions: Record<string, {x: number, y: number}> = {
  // Frontend
  "React.js": { x: 28, y: 22 },
  "React Native": { x: 42, y: 16 },
  "TypeScript": { x: 18, y: 38 },
  "JavaScript": { x: 34, y: 34 },
  "Tailwind CSS": { x: 14, y: 24 },
  "HTML5 Canvas": { x: 24, y: 12 },
  
  // Backend
  "Node.js": { x: 72, y: 22 },
  "Express.js": { x: 86, y: 18 },
  "REST APIs": { x: 76, y: 36 },
  "Passport.js": { x: 88, y: 32 },
  "Cron Workers": { x: 68, y: 12 },
  
  // Database
  "MongoDB": { x: 58, y: 68 },
  "MongoDB Atlas": { x: 72, y: 62 },
  "MySQL": { x: 82, y: 72 },
  
  // Cloud & DevOps
  "AWS": { x: 38, y: 78 },
  "Firebase": { x: 24, y: 78 },
  "Cloudinary": { x: 16, y: 62 },
  "Vercel": { x: 30, y: 88 },
  "Render": { x: 46, y: 88 },
  
  // Real-time & Telemetry
  "Socket.IO": { x: 50, y: 48 },
  "WebSockets": { x: 62, y: 42 },
  "FCM Push": { x: 36, y: 52 },
  "react-native-fs": { x: 48, y: 62 },
  
  // AI & Media
  "Flux Schnell": { x: 54, y: 18 },
  "Pixazo AI": { x: 62, y: 28 },
  "DeAPI": { x: 46, y: 32 },
  "pdf-parse / ATS": { x: 38, y: 40 },
  "Gemini AI": { x: 56, y: 34 },
  
  // Security
  "HMAC SHA-256": { x: 84, y: 52 },
  "JWT": { x: 72, y: 50 },
  "OTP Verification": { x: 88, y: 64 },
  "Bcrypt": { x: 66, y: 78 },
};

export const TechConstellation = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  // Flatten the tech data to easily map over it
  const nodes = Object.entries(techCategories).flatMap(([category, techs], catIdx) => 
    techs.map((tech, techIdx) => {
      const defaultPos = {
        x: ((catIdx * 14 + techIdx * 11) % 80) + 10,
        y: ((catIdx * 12 + techIdx * 16) % 75) + 12
      };
      const pos = nodePositions[tech] || defaultPos;
      return {
        name: tech,
        category,
        x: pos.x,
        y: pos.y,
      };
    })
  );

  return (
    <section id="stack" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-2 flex items-center justify-center gap-4">
            <Network className="text-cyan-400" size={32} />
            TECH CONSTELLATION
          </h2>
          <div className="h-1 w-24 bg-cyan-500 shadow-[0_0_10px_rgba(0,255,255,0.5)] mx-auto"></div>
        </motion.div>

        <div className="relative w-full h-[600px] glass-panel border border-cyan-500/20 rounded-lg overflow-hidden hidden md:block">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#050508] to-[#050508]"></div>
          
          {/* SVG Lines connecting nodes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: "drop-shadow(0 0 4px rgba(0,255,255,0.5))" }}>
            {nodes.map((node, i) => {
              // Connect to center (Socket.IO) or nodes in same category
              const targetNode = node.name === "Socket.IO" 
                ? nodes.find(n => n.name === "React.js") 
                : nodes.find(n => n.category === node.category && n.name !== node.name) || nodes.find(n => n.name === "Socket.IO");
              
              if (!targetNode) return null;
              
              const isHovered = activeNode === node.name || activeNode === targetNode.name;
              
              return (
                <motion.line 
                  key={`line-${i}`}
                  x1={`${node.x}%`} 
                  y1={`${node.y}%`} 
                  x2={`${targetNode.x}%`} 
                  y2={`${targetNode.y}%`} 
                  stroke={isHovered ? "#0ff" : "rgba(0, 255, 255, 0.15)"} 
                  strokeWidth={isHovered ? 2 : 1}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: i * 0.1 }}
                />
              );
            })}
          </svg>

          {/* Interactive Nodes */}
          {nodes.map((node, i) => (
            <motion.div
              key={node.name}
              className="absolute w-4 h-4 -ml-2 -mt-2 rounded-full cursor-pointer z-10"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onMouseEnter={() => setActiveNode(node.name)}
              onMouseLeave={() => setActiveNode(null)}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 + i * 0.05, type: "spring" }}
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-full blur-[4px] transition-all duration-300 ${activeNode === node.name ? 'bg-cyan-400 scale-150' : 'bg-cyan-600 scale-100'}`}></div>
              
              {/* Core */}
              <div className="absolute inset-[2px] bg-white rounded-full"></div>
              
              {/* Label (always visible but dims when not hovered if something else is active) */}
              <div className={`absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-xs transition-opacity duration-300 ${activeNode === node.name ? 'text-cyan-400 font-bold opacity-100' : (activeNode ? 'text-gray-600 opacity-30' : 'text-gray-400 opacity-80')}`}>
                {node.name}
              </div>
            </motion.div>
          ))}

          {/* Hover Details Panel */}
          <AnimatePresence>
            {activeNode && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute bottom-8 left-8 bg-[#0a0a0f]/90 border border-cyan-500/50 p-6 backdrop-blur-md rounded-sm w-[300px]"
              >
                <div className="text-xs text-cyan-400 font-mono mb-1">
                  {nodes.find(n => n.name === activeNode)?.category.toUpperCase()}
                </div>
                <h4 className="text-2xl font-display font-bold text-white mb-2">{activeNode}</h4>
                <div className="text-gray-400 text-sm font-mono">
                  &gt; Technology localized and ready for deployment.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile View (Grid instead of constellation) */}
        <div className="md:hidden grid grid-cols-2 gap-4">
          {Object.entries(techCategories).map(([category, techs]) => (
            <div key={category} className="glass-panel p-4 border border-gray-800">
              <div className="text-cyan-400 font-mono text-xs mb-3">{category.toUpperCase()}</div>
              <ul className="space-y-2">
                {techs.map(tech => (
                  <li key={tech} className="text-gray-300 text-sm font-bold">{tech}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};
