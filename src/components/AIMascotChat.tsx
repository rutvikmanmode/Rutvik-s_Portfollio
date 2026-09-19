import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessage, type ChatMessage } from '../services/geminiService';
import { Send, Zap, MessageSquare, RotateCcw } from 'lucide-react';

interface DisplayMessage extends ChatMessage {
  id: string;
  displayText: string;
  isTyping: boolean;
}

const SUGGESTION_CHIPS = [
  { label: 'Who is Rutvik?', icon: '👤' },
  { label: 'Show me projects', icon: '🚀' },
  { label: 'Tech stack?', icon: '⚡' },
  { label: 'How to contact?', icon: '📡' },
];

const INITIAL_MESSAGE: DisplayMessage = {
  id: 'init',
  role: 'model',
  text: '> Neural link established. Welcome to Rutvik\'s digital domain.\n\nI\'m NEXUS — his AI interface. I can brief you on projects, skills, experience, or help you connect.\n\n// What intel are you looking for?',
  displayText: '> Neural link established. Welcome to Rutvik\'s digital domain.\n\nI\'m NEXUS — his AI interface. I can brief you on projects, skills, experience, or help you connect.\n\n// What intel are you looking for?',
  isTyping: false,
};

export const AIMascotChat = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [messages, setMessages] = useState<DisplayMessage[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const typingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Mouse tracking for eyes
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) / (window.innerWidth / 2);
      const y = (e.clientY - centerY) / (window.innerHeight / 2);
      setMousePos({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-scroll to bottom inside the chat box only (prevents whole-page scrolling)
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Ensure scroll position is at the bottom when opening the chat box
  useEffect(() => {
    if (isChatOpen) {
      const timer = setTimeout(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isChatOpen]);

  // Cleanup typing interval
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, []);

  const typewriterEffect = useCallback((msgId: string, fullText: string) => {
    let charIndex = 0;
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

    typingIntervalRef.current = setInterval(() => {
      charIndex++;
      if (charIndex >= fullText.length) {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId ? { ...m, displayText: fullText, isTyping: false } : m
          )
        );
        return;
      }
      setMessages((prev) =>
        prev.map((m) =>
          m.id === msgId ? { ...m, displayText: fullText.slice(0, charIndex) } : m
        )
      );
    }, 15);
  }, []);

  const handleSend = async (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText || isProcessing) return;

    setInputValue('');
    setIsChatOpen(true);

    const userMsg: DisplayMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: messageText,
      displayText: messageText,
      isTyping: false,
    };

    const aiMsgId = `ai-${Date.now()}`;
    const aiPlaceholder: DisplayMessage = {
      id: aiMsgId,
      role: 'model',
      text: '',
      displayText: '',
      isTyping: true,
    };

    setMessages((prev) => [...prev, userMsg, aiPlaceholder]);
    setIsProcessing(true);

    try {
      const response = await sendMessage(messageText);
      setMessages((prev) =>
        prev.map((m) => (m.id === aiMsgId ? { ...m, text: response } : m))
      );
      typewriterEffect(aiMsgId, response);
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === aiMsgId
            ? {
                ...m,
                text: '> System error. Neural link disrupted.',
                displayText: '> System error. Neural link disrupted.',
                isTyping: false,
              }
            : m
        )
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const eyeOffsetX = mousePos.x * 12;
  const eyeOffsetY = mousePos.y * 12;
  const headOffsetX = mousePos.x * 5;
  const headOffsetY = mousePos.y * 5;

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[460px] flex flex-col items-center gap-4"
    >
      {/* ===== MASCOT HEAD ===== */}
      <motion.div
        className="relative z-10 w-48 h-48 md:w-56 md:h-56 flex flex-col items-center justify-end cursor-crosshair group shrink-0"
        animate={{
          x: headOffsetX,
          y: headOffsetY,
          rotate: mousePos.x * 2,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        onClick={() => {
          setIsChatOpen(!isChatOpen);
          setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 300);
        }}
      >
        {/* Holographic background glow */}
        <div
          className={`absolute inset-0 rounded-full blur-[50px] transition-all duration-700 ${
            isProcessing
              ? 'bg-purple-500/20 scale-110'
              : 'bg-cyan-500/5 group-hover:bg-cyan-500/10'
          }`}
        />

        {/* Hood */}
        <div className="absolute top-2 w-40 h-44 md:w-44 md:h-48 bg-[#1a1b26] rounded-t-full border-t border-x border-gray-700 shadow-[inset_0_15px_30px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="absolute top-0 w-full h-full opacity-30">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-28 bg-cyan-500/20 rounded-full blur-xl" />
            <div className="absolute top-8 left-8 w-1.5 h-12 bg-purple-500/50 rotate-45" />
            <div className="absolute top-8 right-8 w-1.5 h-12 bg-cyan-500/50 -rotate-45" />
          </div>
        </div>

        {/* Face */}
        <div className="absolute top-12 w-28 h-32 md:w-32 md:h-36 bg-[#e0c8b8] rounded-b-3xl rounded-t-2xl shadow-[inset_0_15px_15px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center overflow-hidden">
          {/* Visor */}
          <div
            className={`absolute top-6 w-[110%] h-10 bg-black/80 backdrop-blur-md border-y shadow-[0_0_15px_rgba(0,255,255,0.3)] flex items-center justify-center gap-5 z-10 transition-all duration-500 ${
              isProcessing
                ? 'border-purple-500/70 shadow-[0_0_25px_rgba(176,38,255,0.5)]'
                : 'border-cyan-500/50'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 opacity-50" />

            {/* Eyes */}
            <motion.div
              className={`w-6 h-1.5 rounded-full shadow-[0_0_10px_#0ff] transition-colors duration-500 ${
                isProcessing ? 'bg-purple-400 shadow-[0_0_10px_#b026ff]' : 'bg-cyan-400'
              }`}
              animate={{ x: eyeOffsetX, y: eyeOffsetY }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
            <motion.div
              className={`w-6 h-1.5 rounded-full shadow-[0_0_10px_#0ff] transition-colors duration-500 ${
                isProcessing ? 'bg-purple-400 shadow-[0_0_10px_#b026ff]' : 'bg-cyan-400'
              }`}
              animate={{ x: eyeOffsetX, y: eyeOffsetY }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />

            {/* Scanning line */}
            {isProcessing && (
              <motion.div
                className="absolute left-0 w-full h-[1px] bg-purple-400/60"
                animate={{ top: ['10%', '90%', '10%'] }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            )}
          </div>

          {/* Mask */}
          <div className="absolute bottom-0 w-full h-12 bg-[#151621] border-t border-gray-700 flex flex-col items-center justify-start pt-1.5">
            <div className="w-14 h-6 flex justify-center gap-1">
              <motion.div
                className="w-1 h-3 bg-cyan-500/40 rounded-full"
                animate={isProcessing ? { height: [12, 20, 8, 16, 12] } : {}}
                transition={{ repeat: Infinity, duration: 0.8 }}
              />
              <motion.div
                className="w-1 h-5 bg-cyan-500/60 rounded-full"
                animate={isProcessing ? { height: [20, 8, 16, 12, 20] } : {}}
                transition={{ repeat: Infinity, duration: 0.8 }}
              />
              <motion.div
                className="w-1 h-3 bg-cyan-500/40 rounded-full"
                animate={isProcessing ? { height: [8, 16, 12, 20, 8] } : {}}
                transition={{ repeat: Infinity, duration: 0.8 }}
              />
            </div>
          </div>
        </div>

        {/* Collar */}
        <div className="absolute bottom-0 w-44 md:w-48 h-10 bg-[#0d0e15] border-t border-cyan-500/30 rounded-t-2xl z-20 flex justify-center">
          <div className="w-14 h-full bg-[#1a1b26] border-x border-cyan-500/20 flex items-center justify-center flex-col gap-0.5">
            <div className="w-6 h-0.5 bg-cyan-500/50" />
            <div className="w-3 h-0.5 bg-cyan-500/30" />
          </div>
        </div>

        {/* Click hint */}
        <AnimatePresence>
          {!isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute -top-10 z-30 font-mono text-xs text-cyan-400 bg-gray-900/90 border border-cyan-500/30 py-1.5 px-3 whitespace-nowrap backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,255,0.2)] pointer-events-none"
            >
              {'>'} Click to chat with NEXUS
              <span className="animate-pulse">_</span>
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-900/90" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ===== CHAT INTERFACE ===== */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="w-full overflow-hidden"
          >
            <div className="ai-chat-container border border-cyan-500/20 bg-[#050508]/95 backdrop-blur-md rounded-sm overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.1)]">
              {/* Chat Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900/80 border-b border-cyan-500/20">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <MessageSquare size={14} className="text-cyan-400" />
                    <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  </div>
                  <span className="font-mono text-xs text-cyan-400 tracking-widest">
                    NEXUS_AI
                  </span>
                  <span className="font-mono text-[10px] text-gray-600">
                    // v2.0
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setMessages([INITIAL_MESSAGE]);
                    }}
                    className="p-1 text-gray-600 hover:text-cyan-400 transition-colors"
                    title="Reset conversation"
                  >
                    <RotateCcw size={12} />
                  </button>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500/60" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                    <div
                      className="w-2 h-2 rounded-full bg-red-500/40 cursor-pointer hover:bg-red-500"
                      onClick={() => setIsChatOpen(false)}
                    />
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div
                ref={messagesContainerRef}
                className="ai-chat-messages h-[260px] overflow-y-auto p-4 flex flex-col gap-3"
              >
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg px-3 py-2 font-mono text-xs leading-relaxed whitespace-pre-wrap ${
                        msg.role === 'user'
                          ? 'bg-purple-600/20 border border-purple-500/40 text-purple-100 rounded-tr-none'
                          : 'bg-cyan-950/30 border border-cyan-500/20 text-gray-300 rounded-tl-none'
                      }`}
                    >
                      {msg.isTyping ? (
                        <div className="flex items-center gap-1.5 py-1">
                          <Zap size={10} className="text-cyan-400 animate-pulse" />
                          <span className="text-cyan-500 text-[10px] tracking-widest animate-pulse">
                            PROCESSING
                          </span>
                          <motion.span
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="text-cyan-400"
                          >
                            ...
                          </motion.span>
                        </div>
                      ) : (
                        msg.displayText
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Suggestion Chips */}
              {messages.length <= 1 && (
                <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                  {SUGGESTION_CHIPS.map((chip) => (
                    <button
                      key={chip.label}
                      onClick={() => handleSend(chip.label)}
                      className="px-2.5 py-1 bg-gray-900/80 border border-gray-700 text-gray-400 font-mono text-[10px] hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-200 rounded-sm flex items-center gap-1.5"
                    >
                      <span>{chip.icon}</span>
                      {chip.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Input Area */}
              <div className="px-4 py-3 bg-gray-900/50 border-t border-cyan-500/10 flex items-center gap-2">
                <span className="text-cyan-500 font-mono text-xs shrink-0">{'>'}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask NEXUS anything..."
                  disabled={isProcessing}
                  className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs placeholder-gray-600 disabled:opacity-50"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isProcessing || !inputValue.trim()}
                  className="p-1.5 text-gray-500 hover:text-cyan-400 disabled:opacity-30 disabled:hover:text-gray-500 transition-colors"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            initial={{
              x: Math.random() * 200 - 100,
              y: Math.random() * 200 - 100,
              opacity: 0,
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{ left: '50%', top: '30%' }}
          />
        ))}
      </div>
    </div>
  );
};
