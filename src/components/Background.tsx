import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Background = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#050508]">
      
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-20"></div>
      
      {/* Scanline overlay */}
      <div className="scanline"></div>
      
      {/* Subtle vignette/gradient to keep focus center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#020204_100%)] opacity-80"></div>
      
      {/* Animated glowing orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-cyan-500/5 rounded-full blur-[100px]"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-purple-500/5 rounded-full blur-[100px]"
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -40, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 2 }}
      />
      
      {/* Floating data particles (lightweight) */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-500/20 rounded-full"
            initial={{ 
              x: `${Math.random() * 100}vw`, 
              y: `${Math.random() * 100}vh`,
              opacity: Math.random() * 0.5
            }}
            animate={{ 
              y: [`${Math.random() * 100}vh`, `-10vh`],
            }}
            transition={{ 
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
          />
        ))}
      </div>
    </div>
  );
};
