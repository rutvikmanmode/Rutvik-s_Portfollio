import { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/personalData';
import { Terminal, Send, Code2, Briefcase, Mail } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate terminal processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      
      // Actual mailto logic
      const subject = encodeURIComponent(`Contact from Portfolio: ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
      
      setTimeout(() => {
        setIsSent(false);
        setFormData({ name: '', email: '', message: '' });
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row gap-16">
          
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 uppercase leading-tight">
                READY TO <br/>
                <span className="text-cyan-400 neon-text-cyan glitch-text" data-text="BUILD?">BUILD?</span>
              </h2>
              
              <p className="text-gray-400 text-lg mb-10 max-w-md">
                Have an idea, product, or system that needs to be built? Establish a neural link and let's create something extraordinary.
              </p>

              <div className="flex flex-col gap-4 max-w-sm">
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-4 p-4 glass-panel border border-gray-800 hover:border-cyan-500/50 transition-colors group">
                  <div className="p-2 bg-gray-900 group-hover:bg-cyan-500/20 text-gray-400 group-hover:text-cyan-400 transition-colors">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-mono">PRIMARY COMM LINK</div>
                    <div className="text-white font-medium">{personalInfo.email}</div>
                  </div>
                </a>

                <div className="flex gap-4">
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 p-4 glass-panel border border-gray-800 hover:border-white/50 transition-colors group">
                    <Code2 size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                    <span className="text-sm font-bold tracking-widest text-gray-400 group-hover:text-white transition-colors">GITHUB</span>
                  </a>
                  
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 p-4 glass-panel border border-gray-800 hover:border-blue-500/50 transition-colors group">
                    <Briefcase size={20} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                    <span className="text-sm font-bold tracking-widest text-gray-400 group-hover:text-blue-400 transition-colors">LINKEDIN</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <div className="glass-panel border-cyan-500/30 overflow-hidden rounded-sm relative">
              {/* Terminal Header */}
              <div className="bg-gray-900 border-b border-gray-700 p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal size={16} className="text-cyan-400" />
                  <span className="font-mono text-xs text-gray-400">connection.request()</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                {isSent ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full min-h-[300px] flex flex-col items-center justify-center text-center font-mono"
                  >
                    <div className="w-16 h-16 rounded-full border-2 border-green-500 flex items-center justify-center mb-6 text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                      <Send size={24} className="ml-1" />
                    </div>
                    <div className="text-2xl text-green-400 font-bold mb-2 glitch-text" data-text="REQUEST TRANSMITTED">REQUEST TRANSMITTED</div>
                    <div className="text-gray-400">I'll get back to you soon.</div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-mono">
                    
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-cyan-400 text-sm">const name =</label>
                      <input 
                        type="text" 
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="bg-gray-900/50 border-l-2 border-b-2 border-r-0 border-t-0 border-gray-700 focus:border-cyan-500 outline-none p-3 text-white transition-colors"
                        placeholder="'Enter your name';"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-cyan-400 text-sm">const email =</label>
                      <input 
                        type="email" 
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="bg-gray-900/50 border-l-2 border-b-2 border-r-0 border-t-0 border-gray-700 focus:border-cyan-500 outline-none p-3 text-white transition-colors"
                        placeholder="'Enter your email';"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-cyan-400 text-sm">const message =</label>
                      <textarea 
                        id="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="bg-gray-900/50 border-l-2 border-b-2 border-r-0 border-t-0 border-gray-700 focus:border-cyan-500 outline-none p-3 text-white transition-colors resize-none"
                        placeholder="`Enter your project details...`;"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-4 bg-cyan-950/40 border border-cyan-500/50 text-cyan-400 p-4 hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all duration-300 font-display font-bold tracking-widest flex justify-center items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                          PROCESSING...
                        </>
                      ) : (
                        <>
                          [ SEND REQUEST ]
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
              
              {/* Corner Accents */}
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan-500"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-cyan-500"></div>
            </div>
          </motion.div>

        </div>
        
        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs text-gray-500">
          <div>&copy; {new Date().getFullYear()} RUTVIK SANJAY MANMODE. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-4">
            <span>SYSTEM_VERSION: 2.0.4</span>
            <span>STATUS: ONLINE</span>
          </div>
        </div>
      </div>
    </section>
  );
};
