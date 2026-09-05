import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Mascot = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState("System ready.");

  // Track mouse position relative to center of mascot for eye/head movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate normalized position (-1 to 1)
      const x = (e.clientX - centerX) / (window.innerWidth / 2);
      const y = (e.clientY - centerY) / (window.innerHeight / 2);
      
      // Limit range to -1 to 1
      setMousePos({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y))
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleClick = () => {
    const messages = [
      "You found me.",
      "Let's build something.",
      "System fully operational.",
      "Neural link established.",
      "Scanning parameters..."
    ];
    
    setMessageText(messages[Math.floor(Math.random() * messages.length)]);
    setShowMessage(true);
    
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  // Calculate eye offsets (max 10px movement)
  const eyeOffsetX = mousePos.x * 12;
  const eyeOffsetY = mousePos.y * 12;
  
  // Head subtle movement
  const headOffsetX = mousePos.x * 5;
  const headOffsetY = mousePos.y * 5;

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-[400px] aspect-square flex items-center justify-center cursor-crosshair group"
      onClick={handleClick}
    >
      {/* Holographic background glow */}
      <div className="absolute inset-0 bg-cyan-500/5 rounded-full blur-[50px] group-hover:bg-cyan-500/10 transition-colors duration-700"></div>
      
      <AnimatePresence>
        {showMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute -top-12 z-20 font-mono text-xs text-cyan-400 bg-gray-900/90 border border-cyan-500/30 py-2 px-4 whitespace-nowrap backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,255,0.2)]"
          >
            &gt; {messageText}<span className="animate-pulse">_</span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-gray-900/90"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="relative z-10 w-64 h-64 flex flex-col items-center justify-end"
        animate={{ 
          x: headOffsetX, 
          y: headOffsetY,
          rotate: mousePos.x * 2 
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* Hood / Hair outer */}
        <div className="absolute top-4 w-48 h-56 bg-[#1a1b26] rounded-t-full border-t border-x border-gray-700 shadow-[inset_0_15px_30px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Cyberpunk accents on hood */}
          <div className="absolute top-0 w-full h-full opacity-30">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl"></div>
            <div className="absolute top-10 left-10 w-2 h-16 bg-purple-500/50 rotate-45"></div>
            <div className="absolute top-10 right-10 w-2 h-16 bg-cyan-500/50 -rotate-45"></div>
          </div>
        </div>

        {/* Face */}
        <div className="absolute top-16 w-36 h-40 bg-[#e0c8b8] rounded-b-3xl rounded-t-2xl shadow-[inset_0_15px_15px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center overflow-hidden">
          
          {/* Cybernetic Visor / Tech Headset */}
          <div className="absolute top-8 w-[110%] h-12 bg-black/80 backdrop-blur-md border-y border-cyan-500/50 shadow-[0_0_15px_rgba(0,255,255,0.3)] flex items-center justify-center gap-6 z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 grid-bg opacity-50"></div>
            
            {/* Eyes tracking cursor */}
            <motion.div 
              className="w-8 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#0ff]"
              animate={{ x: eyeOffsetX, y: eyeOffsetY }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
            <motion.div 
              className="w-8 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#0ff]"
              animate={{ x: eyeOffsetX, y: eyeOffsetY }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
            
            {/* Visor scanning line */}
            <motion.div 
              className="absolute left-0 w-full h-[1px] bg-white/50"
              animate={{ top: ['10%', '90%', '10%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Mask / Lower Face cover */}
          <div className="absolute bottom-0 w-full h-16 bg-[#151621] border-t border-gray-700 flex flex-col items-center justify-start pt-2">
            <div className="w-16 h-8 flex justify-center gap-1">
              <div className="w-1 h-4 bg-cyan-500/40 rounded-full"></div>
              <div className="w-1 h-6 bg-cyan-500/60 rounded-full"></div>
              <div className="w-1 h-4 bg-cyan-500/40 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Collar / Tech suit neck */}
        <div className="absolute bottom-0 w-56 h-12 bg-[#0d0e15] border-t border-cyan-500/30 rounded-t-2xl shadow-[-5px_0_15px_rgba(0,0,0,0.5)] z-20 flex justify-center">
          <div className="w-16 h-full bg-[#1a1b26] border-x border-cyan-500/20 shadow-[0_0_10px_rgba(0,255,255,0.1)] flex items-center justify-center flex-col gap-1">
            <div className="w-8 h-1 bg-cyan-500/50"></div>
            <div className="w-4 h-1 bg-cyan-500/30"></div>
          </div>
        </div>

      </motion.div>

      {/* Floating data particles around mascot */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            initial={{ 
              x: Math.random() * 200 - 100, 
              y: Math.random() * 200 - 100,
              opacity: 0 
            }}
            animate={{ 
              y: [null, Math.random() * -100 - 50],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              left: '50%',
              top: '50%'
            }}
          />
        ))}
      </div>
    </div>
  );
};
