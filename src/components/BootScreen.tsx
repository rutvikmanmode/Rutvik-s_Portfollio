import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootScreenProps {
  onComplete: () => void;
}

const bootLogs = [
  "INITIALIZING RUTVIK.DEV...",
  "Loading neural interface...",
  "Loading frontend systems...",
  "Loading backend systems...",
  "Loading database layer...",
  "Loading real-time engine...",
  "Loading AI modules...",
  "Loading developer profile..."
];

export const BootScreen = ({ onComplete }: BootScreenProps) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isGranted, setIsGranted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let currentLog = 0;
    
    // Add logs sequentially
    const logInterval = setInterval(() => {
      if (currentLog < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[currentLog]]);
        setProgress(Math.floor(((currentLog + 1) / bootLogs.length) * 100));
        currentLog++;
      } else {
        clearInterval(logInterval);
        
        // Show ACCESS GRANTED after a short delay
        setTimeout(() => {
          setIsGranted(true);
          
          // Complete boot sequence
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 800); // Wait for fade out
          }, 1500);
        }, 400);
      }
    }, 250); // Fast interval for not being annoying

    return () => clearInterval(logInterval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black font-mono text-sm sm:text-base p-6"
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="w-full max-w-3xl flex flex-col gap-2">
            <div className="flex flex-col gap-1 mb-6 text-gray-400">
              {logs.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  <span className="text-cyan-500 mr-2">&gt;</span>
                  {log}
                </motion.div>
              ))}
            </div>

            {logs.length > 0 && (
              <motion.div 
                className="flex flex-col gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex justify-between text-cyan-400">
                  <span>SYSTEM STATUS:</span>
                  <span>{progress}%</span>
                </div>
                
                {/* Progress bar */}
                <div className="h-4 w-full border border-cyan-900 bg-gray-900 p-[2px]">
                  <motion.div 
                    className="h-full bg-cyan-500"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </motion.div>
            )}

            {isGranted && (
              <motion.div 
                className="mt-8 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <h2 className="text-3xl md:text-5xl font-display font-bold text-green-400 tracking-widest mb-4 neon-text-cyan glitch-text" data-text="ACCESS GRANTED">
                  ACCESS GRANTED
                </h2>
                <p className="text-xl text-gray-300">WELCOME TO RUTVIK'S PORTFOLIO</p>
              </motion.div>
            )}
          </div>
          
          <div className="scanline" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
