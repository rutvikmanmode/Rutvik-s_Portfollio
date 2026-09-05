import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';

const navLinks = [
  { name: 'HOME', href: '#home' },
  { name: 'ABOUT', href: '#about' },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'STACK', href: '#stack' },
  { name: 'CONTACT', href: '#contact' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section
      const sections = navLinks.map(link => link.href.substring(1));
      let current = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust threshold based on viewport height
          if (rect.top <= window.innerHeight * 0.3) {
            current = section;
          }
        }
      }
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={clsx(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300 font-display",
          isScrolled ? "py-3 glass-panel border-b neon-border-cyan shadow-lg" : "py-6 bg-transparent border-b border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div 
            className="text-2xl font-bold text-white cursor-pointer tracking-wider glitch-text group"
            data-text="RUTVIK.DEV"
            onClick={() => scrollTo('#home')}
          >
            <span className="text-cyan-400 group-hover:text-purple-400 transition-colors">RUTVIK</span>.DEV
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className={clsx(
                  "text-sm tracking-widest transition-all duration-300 relative group",
                  activeSection === link.href.substring(1) 
                    ? "text-cyan-400 font-bold" 
                    : "text-gray-400 hover:text-white"
                )}
              >
                {link.name}
                {activeSection === link.href.substring(1) && (
                  <motion.div 
                    layoutId="activeSection"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.8)]"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300 hover:text-cyan-400 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-30 bg-black/95 backdrop-blur-md pt-24 px-6 md:hidden glass-panel"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => scrollTo(link.href)}
                  className={clsx(
                    "text-2xl text-left font-display tracking-widest border-b border-gray-800 pb-4",
                    activeSection === link.href.substring(1) 
                      ? "text-cyan-400 neon-text-cyan" 
                      : "text-gray-400"
                  )}
                >
                  <span className="text-xs text-purple-500 mr-2 font-mono">0{i + 1}.</span>
                  {link.name}
                </motion.button>
              ))}
            </div>
            
            <div className="mt-auto absolute bottom-10 left-6 text-sm font-mono text-gray-600">
              SYSTEM v2.0 // ONLINE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
