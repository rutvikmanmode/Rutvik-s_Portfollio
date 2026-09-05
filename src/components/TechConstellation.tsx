import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { techCategories } from '../data/personalData';
import { Network } from 'lucide-react';

// Pre-calculated node positions for a pseudo-random constellation look
const nodePositions: Record<string, {x: number, y: number}> = {
  "React.js": { x: 30, y: 20 },
  "React Native": { x: 45, y: 15 },
  "TypeScript": { x: 20, y: 40 },
  "JavaScript": { x: 35, y: 35 },
  
  "Node.js": { x: 70, y: 25 },
  "Express.js": { x: 85, y: 20 },
  "REST APIs": { x: 75, y: 40 },
  
  "MongoDB": { x: 60, y: 65 },
  "MySQL": { x: 75, y: 70 },
  
  "AWS": { x: 40, y: 75 },
  "Firebase": { x: 25, y: 80 },
  "Cloudinary": { x: 20, y: 60 },
  
  "GitHub": { x: 10, y: 25 },
  "Postman": { x: 90, y: 50 },
  "Jest": { x: 85, y: 85 },
  
  "Socket.IO": { x: 50, y: 50 },
};

export const TechConstellation = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  // Flatten the tech data to easily map over it
  const nodes = Object.entries(techCategories).flatMap(([category, techs]) => 
    techs.map(tech => ({
      name: tech,
      category,
      ...nodePositions[tech]
    }))
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
