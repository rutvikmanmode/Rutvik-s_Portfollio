import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, type Project } from '../data/personalData';
import { 
  Cpu, Users, Activity, CheckCircle, ExternalLink, Lock, 
  Music, Coins, Flame, ShieldCheck, Play, Pause, 
  Gamepad2, Key, Terminal, Sparkles, Filter
} from 'lucide-react';
import clsx from 'clsx';

type CategoryFilter = 'ALL' | 'AI & Tools' | 'Mobile Systems' | 'Full-Stack Web' | 'Gamified & Web3';

export const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('ALL');

  const categories: { label: string; value: CategoryFilter; count: number }[] = [
    { label: 'ALL DEPLOYMENTS', value: 'ALL', count: projects.length },
    { label: 'AI & TOOLS', value: 'AI & Tools', count: projects.filter(p => p.category === 'AI & Tools').length },
    { label: 'MOBILE SYSTEMS', value: 'Mobile Systems', count: projects.filter(p => p.category === 'Mobile Systems').length },
    { label: 'FULL-STACK WEB', value: 'Full-Stack Web', count: projects.filter(p => p.category === 'Full-Stack Web').length },
    { label: 'GAMIFIED & WEB3', value: 'Gamified & Web3', count: projects.filter(p => p.category === 'Gamified & Web3').length },
  ];

  const filteredProjects = selectedCategory === 'ALL' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 relative z-10 bg-[#020204]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 border-b border-gray-800 pb-8"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-2 flex items-center gap-4">
                <Activity className="text-magenta-500 animate-pulse" size={40} />
                SYSTEM DEPLOYMENTS
              </h2>
              <div className="text-gray-400 font-mono tracking-widest mt-3 flex items-center gap-3">
                <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                PRODUCTION-READY ARCHITECTURES & CODEBASES
              </div>
            </div>
            <div className="text-right font-mono">
              <div className="text-cyan-400 text-sm font-bold tracking-wider">TOTAL ACTIVE ENTITIES: 0{projects.length}</div>
              <div className="text-gray-500 text-xs mt-1">STATUS: ALL PROTOCOLS VERIFIED</div>
            </div>
          </div>

          {/* Category Filter HUD */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-900">
            <div className="flex items-center gap-2 text-gray-500 font-mono text-xs mr-2 py-2">
              <Filter size={14} className="text-cyan-400" />
              <span>CLUSTER FILTER:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={clsx(
                  "px-4 py-2 font-mono text-xs tracking-wider uppercase transition-all duration-300 rounded-sm border flex items-center gap-2 cursor-pointer",
                  selectedCategory === cat.value
                    ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,255,255,0.25)]"
                    : "bg-[#07070c] border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white"
                )}
              >
                <span>{cat.label}</span>
                <span className={clsx(
                  "text-[10px] px-1.5 py-0.5 rounded",
                  selectedCategory === cat.value ? "bg-cyan-400 text-black font-bold" : "bg-gray-800 text-gray-400"
                )}>
                  0{cat.count}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project List */}
        <div className="flex flex-col gap-36">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {renderProjectView(project, idx)}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

// Dispatcher to appropriate custom interactive visual component
function renderProjectView(project: Project, index: number) {
  switch (project.id) {
    case 'ai-edit':
      return <ProjectAIEdit project={project} index={index} />;
    case 'jobify':
      return <ProjectJobify project={project} index={index} />;
    case 'abhaang':
      return <ProjectAbhaang project={project} index={index} />;
    case 'pengu':
      return <ProjectPengu project={project} index={index} />;
    case 'social-app':
      return <ProjectSocial project={project} index={index} />;
    case 'task-abomination':
      return <ProjectTaskAbomination project={project} index={index} />;
    case 'mern-enterprise-suite':
      return <ProjectMernEnterprise project={project} index={index} />;
    default:
      return <ProjectJobify project={project} index={index} />;
  }
}

// Common Project Information Column Component
const ProjectInfoSide = ({ project, index, accentColor = 'cyan' }: { project: Project; index: number; accentColor?: string }) => {
  const accentClasses: Record<string, { tag: string; bullet: string; badge: string; button: string }> = {
    cyan: { tag: 'text-cyan-400', bullet: 'text-cyan-400', badge: 'bg-cyan-950/40 border-cyan-900/60 text-cyan-400', button: 'bg-cyan-400 text-black hover:bg-white hover:shadow-[0_0_20px_rgba(0,255,255,0.6)]' },
    purple: { tag: 'text-purple-400', bullet: 'text-purple-400', badge: 'bg-purple-950/40 border-purple-900/60 text-purple-400', button: 'bg-purple-500 text-white hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]' },
    amber: { tag: 'text-amber-400', bullet: 'text-amber-400', badge: 'bg-amber-950/40 border-amber-900/60 text-amber-400', button: 'bg-amber-400 text-black hover:bg-white hover:shadow-[0_0_20px_rgba(251,191,36,0.6)]' },
    emerald: { tag: 'text-emerald-400', bullet: 'text-emerald-400', badge: 'bg-emerald-950/40 border-emerald-900/60 text-emerald-400', button: 'bg-emerald-400 text-black hover:bg-white hover:shadow-[0_0_20px_rgba(52,211,153,0.6)]' },
    rose: { tag: 'text-rose-400', bullet: 'text-rose-400', badge: 'bg-rose-950/40 border-rose-900/60 text-rose-400', button: 'bg-rose-500 text-white hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(244,63,94,0.6)]' },
  };

  const style = accentClasses[accentColor] || accentClasses.cyan;

  return (
    <div className="w-full xl:w-2/5 flex flex-col justify-center">
      {/* Index & Tag */}
      <div className="flex items-center gap-3 mb-3">
        <span className={clsx("font-mono text-sm tracking-widest font-bold", style.tag)}>
          0{index + 1} // {project.tag}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-5 uppercase tracking-wide">
        {project.title}
      </h3>
      
      {/* Description */}
      <p className="text-gray-300 leading-relaxed mb-6 text-base md:text-lg">
        {project.description}
      </p>

      {/* Metrics Banner */}
      {project.metrics && (
        <div className="grid grid-cols-2 gap-3 mb-6 p-3 bg-[#08080f] border border-gray-800 rounded">
          {project.metrics.map((m, i) => (
            <div key={i} className="font-mono">
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">{m.label}</div>
              <div className={clsx("text-sm font-bold", style.tag)}>{m.value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Core Features */}
      <div className="mb-6">
        <div className="text-white font-mono text-xs tracking-wider mb-3 border-b border-gray-800 pb-2 uppercase flex items-center justify-between">
          <span>ENGINEERING HIGHLIGHTS</span>
          <span className="text-gray-500 text-[10px]">{project.features.length} MODULES</span>
        </div>
        <ul className="grid grid-cols-1 gap-2.5">
          {project.features.slice(0, 4).map((feature: string, i: number) => (
            <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-gray-400">
              <span className={clsx("mt-1 shrink-0 font-bold", style.bullet)}>▹</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tech Stack Chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        {project.techStack.map((tech: string) => (
          <span key={tech} className={clsx("px-2.5 py-1 border font-mono text-[11px] rounded-sm transition-colors", style.badge)}>
            {tech}
          </span>
        ))}
      </div>

      {/* Action Buttons: Respecting user instruction (no repo link for private projects, only live demo or private indicator) */}
      <div className="flex flex-wrap items-center gap-4">
        {project.demoUrl ? (
          <a 
            href={project.demoUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={clsx(
              "flex items-center gap-2 px-6 py-3 font-display font-bold text-sm tracking-widest transition-all",
              style.button
            )}
          >
            <ExternalLink size={16} /> LIVE DEPLOYMENT
          </a>
        ) : null}

        <div className="flex items-center gap-2 px-5 py-3 bg-gray-900/80 border border-gray-800 text-gray-400 font-mono text-xs tracking-wider rounded-sm">
          <Lock size={14} className="text-amber-400" />
          <span>PROPRIETARY SOURCE // PRIVATE REPO</span>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 1. AI EDIT - Visual Interactive Showcase
// ==========================================
const ProjectAIEdit = ({ project, index }: { project: Project; index: number }) => {
  const [activeStyle, setActiveStyle] = useState('Cyberpunk');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(100);

  const styles = [
    { name: 'Cyberpunk', guidance: '7.8', steps: '28' },
    { name: 'Cinematic', guidance: '8.2', steps: '35' },
    { name: 'Realistic', guidance: '7.0', steps: '30' },
    { name: 'Anime 3D', guidance: '9.0', steps: '26' },
  ];

  const triggerGenerate = () => {
    setIsGenerating(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return p + 25;
      });
    }, 120);
  };

  return (
    <div className="relative flex flex-col xl:flex-row gap-12">
      {/* Visual Terminal Area */}
      <div className="w-full xl:w-3/5 glass-panel rounded-lg p-1 min-h-[520px] border-cyan-500/30 flex flex-col overflow-hidden relative group">
        <div className="bg-[#050508] w-full h-full p-6 relative z-10 flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-800 pb-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-cyan-400">
              <Sparkles size={16} className="animate-spin" />
              <span>AI_STUDIO_DIFFUSION_PIPELINE // v2.4</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-400 flex items-center gap-1.5 font-mono text-[11px]">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-ping"></span>
                CDN WORKER: ONLINE
              </span>
            </div>
          </div>

          {/* Diffusion Studio Interface */}
          <div className="my-6 flex flex-col gap-5">
            {/* Prompt Display */}
            <div className="p-4 bg-[#0a0a14] border border-cyan-500/20 rounded font-mono text-xs">
              <div className="text-gray-500 text-[10px] uppercase mb-1">Active Latent Prompt:</div>
              <div className="text-cyan-200">
                &gt; "Hyperrealistic portrait in futuristic neon alley, volumetric anamorphic flares, octane render, 8k resolution, cinematic lighting"
              </div>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-2">
              <span className="text-gray-500 font-mono text-xs self-center mr-2">ARTISTIC STYLES:</span>
              {styles.map(s => (
                <button
                  key={s.name}
                  onClick={() => { setActiveStyle(s.name); triggerGenerate(); }}
                  className={clsx(
                    "px-3 py-1.5 font-mono text-xs border rounded transition-all cursor-pointer",
                    activeStyle === s.name 
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,255,255,0.3)]" 
                      : "bg-gray-900 border-gray-800 text-gray-400 hover:text-white"
                  )}
                >
                  {s.name}
                </button>
              ))}
            </div>

            {/* Canvas Simulation */}
            <div className="h-56 bg-[#030307] border border-gray-800 rounded relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>
              <div className="absolute inset-0 scanline opacity-30"></div>

              {/* Progress Overlay */}
              {isGenerating ? (
                <div className="flex flex-col items-center gap-3 z-10 font-mono">
                  <div className="text-cyan-400 text-sm">SAMPLING LATENT TENSORS [{progress}%]</div>
                  <div className="w-64 h-2 bg-gray-800 rounded overflow-hidden">
                    <div className="h-full bg-cyan-400 transition-all duration-150" style={{ width: `${progress}%` }}></div>
                  </div>
                  <div className="text-gray-500 text-[11px]">Worker: Cloudinary Multi-CDN Sync Active</div>
                </div>
              ) : (
                <div className="text-center p-6 z-10">
                  <div className="text-cyan-400 font-mono text-xs tracking-widest mb-2">[ {activeStyle.toUpperCase()} LATENT STATE LOADED ]</div>
                  <div className="text-2xl font-display font-bold text-white mb-2">FLUX SCHNELL DIFFUSION RUNTIME</div>
                  <div className="flex justify-center gap-4 text-gray-400 font-mono text-xs mt-3">
                    <span className="px-2 py-1 bg-gray-900 border border-gray-800">GUIDANCE: {styles.find(s => s.name === activeStyle)?.guidance}</span>
                    <span className="px-2 py-1 bg-gray-900 border border-gray-800">STEPS: {styles.find(s => s.name === activeStyle)?.steps}</span>
                    <span className="px-2 py-1 bg-gray-900 border border-gray-800">INPAINT: READY</span>
                  </div>
                </div>
              )}

              {/* Laser scanline animation */}
              <motion.div 
                className="absolute top-0 bottom-0 w-1 bg-cyan-400/80 shadow-[0_0_15px_#00ffff]"
                animate={{ left: ['0%', '100%', '0%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* Smart Tools Bar */}
            <div className="grid grid-cols-3 gap-3 font-mono text-[11px]">
              <div className="p-2.5 bg-gray-900/60 border border-gray-800 rounded text-center text-gray-300">
                <span className="text-cyan-400 font-bold">✓</span> AI Background Removal
              </div>
              <div className="p-2.5 bg-gray-900/60 border border-gray-800 rounded text-center text-gray-300">
                <span className="text-cyan-400 font-bold">✓</span> Inpainting Eraser
              </div>
              <div className="p-2.5 bg-gray-900/60 border border-gray-800 rounded text-center text-gray-300">
                <span className="text-cyan-400 font-bold">✓</span> Multi-CDN Auto-Failover
              </div>
            </div>

          </div>

          <div className="text-[10px] font-mono text-gray-500 border-t border-gray-800 pt-2 flex justify-between">
            <span>REACT NATIVE 0.86 // NODE.JS 22 ASYNC WORKER</span>
            <span>STORAGE: CLOUDINARY LOAD-BALANCED</span>
          </div>

        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 -z-10 blur-md"></div>
      </div>

      {/* Information Area */}
      <ProjectInfoSide project={project} index={index} accentColor="cyan" />
    </div>
  );
};

// ==========================================
// 2. JOBIFY - Visual Interactive Showcase
// ==========================================
const ProjectJobify = ({ project, index }: { project: Project; index: number }) => {
  const [matchScore, setMatchScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMatchScore(prev => {
        if (prev >= 94) return 94;
        return prev + 1;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col xl:flex-row-reverse gap-12">
      {/* Visual / Interactive Area */}
      <div className="w-full xl:w-3/5 glass-panel rounded-lg p-1 min-h-[500px] border-cyan-500/30 flex flex-col overflow-hidden relative group">
        <div className="bg-[#050508] w-full h-full p-6 relative z-10 flex flex-col">
          {/* AI HUD Header */}
          <div className="flex justify-between items-center border-b border-gray-800 pb-4 mb-8">
            <div className="flex items-center gap-3 text-cyan-400 font-mono text-xs">
              <Cpu className="animate-pulse" size={18} />
              <span>ATS_MATCH_ENGINE_v2.0 // RECRUITER HUD</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              VERCEL PRODUCTION
            </div>
          </div>

          {/* AI Pipeline Visualization */}
          <div className="flex-1 flex flex-col md:flex-row gap-8 items-center justify-center font-mono text-sm">
            
            {/* Pipeline Flow */}
            <div className="flex-1 w-full max-w-sm flex flex-col gap-3 relative">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-800">
                <motion.div 
                  className="w-full bg-cyan-400"
                  animate={{ height: ['0%', '100%'], top: ['0%', '0%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {[
                { name: 'PDF RESUME INGESTION', delay: 0 },
                { name: 'TEXTRACT / PDF-PARSE', delay: 0.3 },
                { name: 'SKILL MATRIX EXTRACTION', delay: 0.6 },
                { name: 'ATS COMPATIBILITY ENGINE', delay: 0.9 },
                { name: '1-CLICK / AUTO-APPLY GATEWAY', delay: 1.2 },
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: step.delay, duration: 0.4 }}
                  className="pl-10 relative flex items-center"
                >
                  <div className="absolute left-3 w-2.5 h-2.5 rounded-full bg-cyan-400 border-[3px] border-black -translate-x-1/2"></div>
                  <div className="w-full bg-gray-900/90 border border-gray-800 p-2.5 text-xs text-gray-300 shadow-[0_0_10px_rgba(0,255,255,0.05)]">
                    {step.name}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Results Panel */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="flex-1 w-full border border-cyan-500/30 bg-[#0a0a0f] p-5 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-cyan-500/5 scanline"></div>
              <div className="text-center mb-5">
                <div className="text-gray-500 text-[10px] tracking-widest mb-1 font-mono">AUTOMATED ATS COMPATIBILITY</div>
                <div className="text-5xl font-display text-cyan-400 neon-text-cyan">{matchScore}.7%</div>
                <div className="text-[10px] font-mono text-green-400 mt-1">✓ THRESHOLD MET (&gt;= 80%)</div>
              </div>

              <div className="space-y-3">
                {[
                  { skill: 'React 19 & Architecture', score: 98 },
                  { skill: 'Node.js & Express 5 API', score: 95 },
                  { skill: 'Socket.IO WebSockets', score: 92 },
                  { skill: 'MongoDB Atlas Schema', score: 89 }
                ].map((s, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1 font-mono">
                      <span className="text-gray-300">{s.skill}</span>
                      <span className="text-cyan-400">{s.score}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 w-full">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.score}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.0 + (i * 0.15), duration: 0.6 }}
                        className="h-full bg-cyan-400 shadow-[0_0_6px_#00ffff]"
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center text-xs text-green-400 font-mono font-bold tracking-widest flex items-center justify-center gap-2">
                <CheckCircle size={14} /> RECRUITER VERDICT: SHORTLISTED
              </div>
            </motion.div>

          </div>

          <div className="mt-4 pt-3 border-t border-gray-800 flex justify-between font-mono text-[10px] text-gray-500">
            <span>SOCKET.IO IN-CHAT SCHEDULING</span>
            <span>RECHARTS FUNNEL DASHBOARD</span>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 -z-10 opacity-50 blur-md"></div>
      </div>

      {/* Information Area */}
      <ProjectInfoSide project={project} index={index} accentColor="cyan" />
    </div>
  );
};

// ==========================================
// 3. ABHAANG - Visual Interactive Showcase
// ==========================================
const ProjectAbhaang = ({ project, index }: { project: Project; index: number }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [downloaded, setDownloaded] = useState(true);

  return (
    <div className="relative flex flex-col xl:flex-row gap-12">
      {/* Visual Area */}
      <div className="w-full xl:w-3/5 glass-panel rounded-lg p-1 min-h-[500px] border-amber-500/30 flex flex-col overflow-hidden relative group">
        <div className="bg-[#050508] w-full h-full p-6 relative z-10 flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-800 pb-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-amber-400">
              <Music size={16} className="animate-bounce" />
              <span>ABHAANG_AUDIO_ENGINE // REACT NATIVE FOREGROUND SERVICE</span>
            </div>
            <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded text-[10px]">
              OFFLINE CACHE ACTIVE
            </span>
          </div>

          {/* Player Mockup */}
          <div className="my-6 max-w-md mx-auto w-full p-6 bg-[#08080f] border border-amber-500/30 rounded-xl shadow-[0_0_30px_rgba(245,158,11,0.15)] flex flex-col items-center">
            
            {/* Album Art Glow */}
            <div className="w-36 h-36 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-400 p-1 flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.4)] relative">
              <div className="w-full h-full bg-[#0d0d17] rounded-xl flex flex-col items-center justify-center p-3 text-center">
                <Music size={32} className="text-amber-400 mb-2" />
                <span className="font-display font-bold text-white text-xs">अभंग धारा</span>
                <span className="font-mono text-[9px] text-amber-300">LORD VITTHAL BHAKTI</span>
              </div>
            </div>

            {/* Track Info */}
            <div className="text-center mt-5">
              <div className="font-display text-lg font-bold text-white">सुंदर ते ध्यान उभे विटेवरी</div>
              <div className="font-mono text-xs text-amber-400/90 mt-1">Sant Tukaram Maharaj // Raag Bhairavi</div>
            </div>

            {/* Synchronized Lyrics HUD */}
            <div className="w-full my-4 p-3 bg-gray-900/60 border border-gray-800 rounded font-mono text-xs text-center">
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">SYNCHRONIZED LYRICS ENGINE</div>
              <div className="text-amber-200 font-medium">"कर कटावरी ठेवोनिया । तुळसी हार गळा कासे पितांबर..."</div>
            </div>

            {/* Audio Waveform Equalizer */}
            <div className="w-full flex items-center justify-center gap-1.5 h-10 my-2">
              {[40, 75, 55, 90, 65, 80, 45, 95, 70, 85, 50, 100, 60, 80, 40].map((h, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 bg-amber-400 rounded-full"
                  animate={isPlaying ? { height: [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`] } : { height: '20%' }}
                  transition={{ duration: 0.6 + (i % 4) * 0.2, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="w-full flex items-center justify-between mt-3 pt-3 border-t border-gray-800 font-mono text-xs">
              <button 
                onClick={() => setDownloaded(!downloaded)}
                className={clsx("flex items-center gap-1.5 px-3 py-1.5 rounded border transition-colors cursor-pointer", downloaded ? "bg-green-500/20 text-green-400 border-green-500/40" : "bg-gray-800 text-gray-400 border-gray-700")}
              >
                <CheckCircle size={12} /> {downloaded ? "100% OFFLINE" : "DOWNLOAD"}
              </button>

              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.5)] hover:scale-105 transition-transform cursor-pointer"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
              </button>

              <div className="text-gray-500 text-[10px] text-right">
                <div>REACT-NATIVE-FS</div>
                <div className="text-amber-400">FOREGROUND SVC</div>
              </div>
            </div>

          </div>

          <div className="text-[10px] font-mono text-gray-500 border-t border-gray-800 pt-2 flex justify-between">
            <span>FIREBASE ADMIN JWT SESSION EXCHANGE</span>
            <span>SMART HOST AUTO-DISCOVERY</span>
          </div>

        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 -z-10 blur-md"></div>
      </div>

      {/* Information Area */}
      <ProjectInfoSide project={project} index={index} accentColor="amber" />
    </div>
  );
};

// ==========================================
// 4. PENGU - Visual Interactive Showcase
// ==========================================
const ProjectPengu = ({ project, index }: { project: Project; index: number }) => {
  const [multiplier, setMultiplier] = useState(1);
  const [hashrate, setHashrate] = useState(14.8);
  const [balance, setBalance] = useState(1420.5);

  const boostHashrate = () => {
    const nextMulti = multiplier >= 25 ? 1 : multiplier === 1 ? 4 : multiplier === 4 ? 10 : 25;
    setMultiplier(nextMulti);
    setHashrate(parseFloat((14.8 * nextMulti).toFixed(1)));
    setBalance(b => parseFloat((b + 25.4 * nextMulti).toFixed(1)));
  };

  return (
    <div className="relative flex flex-col xl:flex-row-reverse gap-12">
      {/* Visual Area */}
      <div className="w-full xl:w-3/5 glass-panel rounded-lg p-1 min-h-[500px] border-purple-500/30 flex flex-col overflow-hidden relative group">
        <div className="bg-[#050508] w-full h-full p-6 relative z-10 flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-800 pb-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-purple-400">
              <Coins size={16} className="animate-spin" />
              <span>PENGU_CRYPTO_NODE // IDLE MINING TELEMETRY</span>
            </div>
            <div className="flex items-center gap-2 text-green-400 text-[10px]">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-ping"></span>
              WSS REAL-TIME / 60S CRON
            </div>
          </div>

          {/* Mining Rig Dashboard */}
          <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Mascot & Hash Terminal */}
            <div className="p-5 bg-[#090915] border border-purple-500/30 rounded-lg flex flex-col items-center justify-center relative overflow-hidden">
              <div className="text-5xl mb-3 animate-bounce">🐧</div>
              <div className="text-gray-400 font-mono text-xs uppercase tracking-wider">CURRENT HASHRATE</div>
              <div className="text-4xl font-display font-bold text-white mt-1 neon-text-purple">
                {hashrate} <span className="text-purple-400 text-lg">KH/s</span>
              </div>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-purple-950/60 border border-purple-800/60 rounded text-purple-300 font-mono text-xs">
                <Flame size={14} className="text-orange-400" /> ACTIVE BOOST: {multiplier}x
              </div>

              <button
                onClick={boostHashrate}
                className="mt-5 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-mono text-xs font-bold rounded shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all cursor-pointer"
              >
                [ SIMULATE AD REWARD BOOST ]
              </button>
            </div>

            {/* Non-Custodial Wallet Ledger */}
            <div className="p-5 bg-[#090915] border border-gray-800 rounded-lg flex flex-col justify-between font-mono text-xs">
              <div>
                <div className="text-gray-500 text-[10px] uppercase mb-1">NON-CUSTODIAL WALLET LEDGER</div>
                <div className="text-2xl font-display font-bold text-cyan-400">{balance.toLocaleString()} $PENGU</div>
                <div className="text-gray-400 text-[11px] mt-0.5">≈ ${(balance * 0.02).toFixed(2)} USD (DYNAMIC CONVERTER)</div>
              </div>

              <div className="space-y-2 my-4 border-t border-b border-gray-800 py-3">
                <div className="flex justify-between text-gray-400">
                  <span>Mining Yield:</span>
                  <span className="text-white">+890.20 PENGU</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Daily Streak Bonus:</span>
                  <span className="text-white">+320.00 PENGU</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Bounty Missions:</span>
                  <span className="text-white">+210.30 PENGU</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-gray-500">
                <span>DEVICE FINGERPRINT: SECURE</span>
                <span className="text-purple-400">ADMOB REWARDED SDK</span>
              </div>
            </div>
          </div>

          <div className="text-[10px] font-mono text-gray-500 border-t border-gray-800 pt-2 flex justify-between">
            <span>SOCKET.IO TELEMETRY BROADCAST</span>
            <span>EXPRESS 5 + MONGO ATLAS + LOTTIE MASCOT</span>
          </div>

        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 -z-10 blur-md"></div>
      </div>

      {/* Information Area */}
      <ProjectInfoSide project={project} index={index} accentColor="purple" />
    </div>
  );
};

// ==========================================
// 5. SOCIAL APP - Visual Interactive Showcase
// ==========================================
const ProjectSocial = ({ project, index }: { project: Project; index: number }) => {
  const [messages] = useState([
    { text: "Socket cluster initialized.", sender: "system", time: "10:00:00" },
    { text: "FCM Push registered.", sender: "system", time: "10:00:01" },
    { text: "Hey! Ready to inspect the reels & chat architecture?", sender: "user", time: "10:00:02" },
    { text: "Yes! 60 FPS FlashList media rendering and sub-100ms real-time sockets.", sender: "me", time: "10:00:04" }
  ]);

  return (
    <div className="relative flex flex-col xl:flex-row gap-12">
      {/* Visual / Interactive Area */}
      <div className="w-full xl:w-3/5 glass-panel rounded-lg p-1 min-h-[500px] border-purple-500/30 flex flex-col overflow-hidden relative group">
        <div className="bg-[#050508] w-full h-full p-6 relative z-10 flex flex-col items-center justify-center">
          
          {/* Mobile Phone Mockup */}
          <div className="w-[300px] h-[520px] border-4 border-gray-800 rounded-[2rem] bg-[#0a0a0f] relative overflow-hidden shadow-[0_0_30px_rgba(176,38,255,0.15)] flex flex-col">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-20"></div>
            
            {/* App Header */}
            <div className="pt-8 pb-3 px-4 bg-gray-900 border-b border-purple-500/30 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.5)] z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 flex items-center justify-center">
                    <Users size={18} className="text-white" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-900"></div>
                </div>
                <div>
                  <div className="font-display text-white text-xs font-bold">NEON SOCIAL // CHAT</div>
                  <div className="text-green-400 font-mono text-[9px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    SUB-100MS LATENCY
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-3.5 overflow-hidden flex flex-col gap-2.5 font-mono text-xs relative">
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={clsx(
                      "max-w-[85%] rounded-lg p-2 text-[11px]",
                      msg.sender === 'system' ? "bg-transparent border border-gray-800 text-gray-500 self-center text-center text-[9px]" :
                      msg.sender === 'me' ? "bg-purple-600/20 border border-purple-500/50 text-white self-end rounded-tr-none" :
                      "bg-gray-800 border border-gray-700 text-gray-200 self-start rounded-tl-none"
                    )}
                  >
                    {msg.text}
                    {msg.sender !== 'system' && (
                      <div className="text-[8px] text-gray-500 text-right mt-0.5">{msg.time}</div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Wellbeing Tracker Indicator */}
            <div className="px-3 py-1.5 bg-gray-950 border-t border-gray-800 flex items-center justify-between font-mono text-[9px] text-gray-400">
              <span>DIGITAL WELLBEING: ACTIVE</span>
              <span className="text-cyan-400">28m / 45m DAILY LIMIT</span>
            </div>

            {/* Input Area */}
            <div className="p-2.5 bg-gray-900 border-t border-gray-800 flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 text-xs">+</div>
              <div className="flex-1 h-7 rounded-full bg-gray-800 border border-gray-700 flex items-center px-3 text-gray-500 text-[10px] font-mono">
                Message...
              </div>
            </div>

          </div>
          
          {/* Architecture floaters */}
          <div className="absolute top-1/4 left-8 font-mono text-[10px] text-purple-400 flex flex-col gap-2 items-end opacity-70 hidden sm:flex">
            <div className="px-2 py-1 border border-purple-500/30 bg-purple-900/10">Socket.IO Rooms</div>
            <div className="px-2 py-1 border border-purple-500/30 bg-purple-900/10">FlashList 60 FPS</div>
          </div>
          
          <div className="absolute bottom-1/4 right-8 font-mono text-[10px] text-cyan-400 flex flex-col gap-2 items-start opacity-70 hidden sm:flex">
            <div className="px-2 py-1 border border-cyan-500/30 bg-cyan-900/10">Cloudinary Reels</div>
            <div className="px-2 py-1 border border-cyan-500/30 bg-cyan-900/10">FCM Push Alerts</div>
          </div>

        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 -z-10 blur-md"></div>
      </div>

      {/* Information Area */}
      <ProjectInfoSide project={project} index={index} accentColor="purple" />
    </div>
  );
};

// ==========================================
// 6. TASK ABOMINATION - Visual Interactive Showcase
// ==========================================
const ProjectTaskAbomination = ({ project, index }: { project: Project; index: number }) => {
  const [activeGame, setActiveGame] = useState<'Zombie Rush' | 'Zombie Run'>('Zombie Rush');

  return (
    <div className="relative flex flex-col xl:flex-row-reverse gap-12">
      {/* Visual Area */}
      <div className="w-full xl:w-3/5 glass-panel rounded-lg p-1 min-h-[500px] border-rose-500/30 flex flex-col overflow-hidden relative group">
        <div className="bg-[#050508] w-full h-full p-6 relative z-10 flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-800 pb-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-rose-400">
              <Gamepad2 size={16} className="animate-pulse" />
              <span>ARCADE_ENGINE // HTML5 CANVAS & WEB AUDIO</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-amber-400 font-bold flex items-center gap-1 text-[10px]">
                <Flame size={12} /> 7-DAY STREAK: ACTIVE
              </span>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/40 rounded text-[10px] font-bold transition-all shadow-[0_0_10px_rgba(244,63,94,0.2)]"
                >
                  <Play size={10} className="fill-current" /> PLAY GAME
                </a>
              )}
            </div>
          </div>

          {/* Retro Arcade Screen */}
          <div className="my-5 p-5 bg-[#060308] border-2 border-rose-500/40 rounded-xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute inset-0 scanline opacity-40 pointer-events-none"></div>

            {/* Game Selector */}
            <div className="flex justify-between items-center mb-4 z-10">
              <div className="flex gap-2">
                {(['Zombie Rush', 'Zombie Run'] as const).map(game => (
                  <button
                    key={game}
                    onClick={() => setActiveGame(game)}
                    className={clsx(
                      "px-3 py-1 font-mono text-xs uppercase rounded border transition-all cursor-pointer",
                      activeGame === game ? "bg-rose-500/20 border-rose-400 text-rose-300 font-bold" : "bg-gray-900 border-gray-800 text-gray-500"
                    )}
                  >
                    {game}
                  </button>
                ))}
              </div>
              <div className="font-mono text-xs text-rose-400">
                LETHAL COINS: 4,850 🪙
              </div>
            </div>

            {/* Canvas Simulation Screen */}
            <div className="h-48 bg-[#020205] border border-gray-800 rounded relative overflow-hidden flex items-center justify-center p-4 group/canvas">
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 border border-gray-900 opacity-20"></div>

              {activeGame === 'Zombie Rush' ? (
                <div className="text-center z-10">
                  <div className="text-3xl mb-1">🧟 💥 🏃‍♂️ 🔫 🧟</div>
                  <div className="text-rose-400 font-display font-bold text-lg tracking-wider">ZOMBIE RUSH // TOP-DOWN SURVIVOR</div>
                  <div className="font-mono text-xs text-gray-400 mt-1">WASD to Move // Mouse Cursor to Aim & Auto-Fire</div>
                  <div className="font-mono text-[10px] text-green-400 mt-2">HIGH SCORE: 48,200 (RANK #2 GLOBAL)</div>
                </div>
              ) : (
                <div className="text-center z-10">
                  <div className="text-3xl mb-1">🏃‍♂️ ⚡ 🧱 🧟 🧟</div>
                  <div className="text-rose-400 font-display font-bold text-lg tracking-wider">ZOMBIE RUN // SIDE-SCROLLER</div>
                  <div className="font-mono text-xs text-gray-400 mt-1">Space to Jump // Shift to Slide // Speed Multiplier</div>
                  <div className="font-mono text-[10px] text-cyan-400 mt-2">DISTANCE ESCAPED: 1,420M</div>
                </div>
              )}

              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-black/75 backdrop-blur-[2px] opacity-0 group-hover/canvas:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 z-20"
                >
                  <div className="px-4 py-2 bg-rose-500 text-white font-display font-bold text-xs tracking-wider rounded flex items-center gap-2 shadow-[0_0_20px_rgba(244,63,94,0.6)]">
                    <Play size={14} className="fill-current" /> LAUNCH PLAYABLE ARCADE
                  </div>
                  <span className="font-mono text-[10px] text-gray-300">Opens in browser game portal</span>
                </a>
              )}
            </div>

            {/* Quest & Leaderboard Podiums */}
            <div className="grid grid-cols-2 gap-3 mt-4 z-10 font-mono text-xs">
              <div className="p-2.5 bg-gray-900/70 border border-gray-800 rounded">
                <div className="text-gray-500 text-[9px] uppercase">DAILY MISSIONS</div>
                <div className="text-white text-[11px] mt-0.5">Survive 3 min horde [3/3] ✓</div>
                <div className="text-rose-400 text-[10px] mt-1">+250 XP & 100 COINS CLAIMED</div>
              </div>
              <div className="p-2.5 bg-gray-900/70 border border-gray-800 rounded">
                <div className="text-gray-500 text-[9px] uppercase">GLOBAL LEADERBOARD</div>
                <div className="text-white text-[11px] mt-0.5">#1 AlphaHunter - 52,100</div>
                <div className="text-amber-400 text-[10px] mt-1">#2 RutvikManmode - 48,200</div>
              </div>
            </div>

          </div>

          <div className="text-[10px] font-mono text-gray-500 border-t border-gray-800 pt-2 flex justify-between">
            <span>REACT 19 + VITE 7 + TAILWIND 4</span>
            <span>FIREBASE OAUTH + JWT EXPRESS SESSION</span>
          </div>

        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-purple-500/10 -z-10 blur-md"></div>
      </div>

      {/* Information Area */}
      <ProjectInfoSide project={project} index={index} accentColor="rose" />
    </div>
  );
};

// ==========================================
// 7. MERN ENTERPRISE SUITE - Visual Interactive Showcase
// ==========================================
const ProjectMernEnterprise = ({ project, index }: { project: Project; index: number }) => {
  const [hmacDigest, setHmacDigest] = useState('7f4a9b2c8e11a34d0f62e87c910243bc612...');
  const [verified, setVerified] = useState(true);

  const simulateTamper = () => {
    setVerified(false);
    setHmacDigest('TAMPER_DETECTED: MISMATCH_SIG_0xERR');
    setTimeout(() => {
      setVerified(true);
      setHmacDigest('7f4a9b2c8e11a34d0f62e87c910243bc612...');
    }, 2000);
  };

  return (
    <div className="relative flex flex-col xl:flex-row gap-12">
      {/* Visual Area */}
      <div className="w-full xl:w-3/5 glass-panel rounded-lg p-1 min-h-[500px] border-emerald-500/30 flex flex-col overflow-hidden relative group">
        <div className="bg-[#050508] w-full h-full p-6 relative z-10 flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-800 pb-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck size={16} />
              <span>CRYPTOGRAPHIC_GATEWAY // HMAC SHA-256 SIGNING</span>
            </div>
            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded text-[10px]">
              ZERO-TRUST INTEGRITY
            </span>
          </div>

          {/* Cryptographic Inspector */}
          <div className="my-5 flex flex-col gap-4 font-mono text-xs">
            
            {/* Packet Inspector */}
            <div className="p-4 bg-[#080d0a] border border-emerald-500/30 rounded-lg">
              <div className="flex justify-between text-[10px] text-gray-500 uppercase mb-2">
                <span>INCOMING CLIENT REQUEST PAYLOAD</span>
                <span>CIPHER: HMAC-SHA256</span>
              </div>
              <div className="p-3 bg-black/60 border border-gray-800 rounded text-gray-300 text-[11px] leading-relaxed">
                {`POST /api/v1/auth/verify-packet`} <br />
                {`X-Signature: ${hmacDigest}`} <br />
                {`X-Timestamp: 1726662400 (anti-replay window: 300s)`}
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className={clsx("font-bold text-xs flex items-center gap-1.5", verified ? "text-emerald-400" : "text-red-400 animate-pulse")}>
                  {verified ? "✓ SIGNATURE VERIFIED: INTEGRITY GUARANTEED" : "✗ TAMPER DETECTED: REJECTED (401)"}
                </span>
                <button
                  onClick={simulateTamper}
                  className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded text-[11px] border border-gray-700 cursor-pointer"
                >
                  [ Test Replay Attack ]
                </button>
              </div>
            </div>

            {/* Enterprise Modules Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Module 1: OTP TTL */}
              <div className="p-3.5 bg-gray-900/60 border border-gray-800 rounded">
                <div className="text-[10px] text-gray-500 uppercase flex items-center gap-1.5">
                  <Key size={12} className="text-yellow-400" /> OTP EMAIL ENGINE
                </div>
                <div className="text-white font-bold text-xs mt-1">TTL Expiration: 300s</div>
                <div className="text-gray-400 text-[10px] mt-1">Auto-purge MongoDB indices via native TTL.</div>
              </div>

              {/* Module 2: SMTP Enquiry Reply */}
              <div className="p-3.5 bg-gray-900/60 border border-gray-800 rounded">
                <div className="text-[10px] text-gray-500 uppercase flex items-center gap-1.5">
                  <Terminal size={12} className="text-cyan-400" /> SMTP ENQUIRY DESK
                </div>
                <div className="text-white font-bold text-xs mt-1">Nodemailer SMTP Transports</div>
                <div className="text-gray-400 text-[10px] mt-1">Admin direct email replies & ticket lifecycle.</div>
              </div>
            </div>

            {/* Chat Workspace Status */}
            <div className="p-3 bg-gray-900/40 border border-gray-800 rounded flex items-center justify-between text-[11px] text-gray-400">
              <span>SOCKET.IO WORKSPACE: USER PRESENCE TRACKER</span>
              <span className="text-emerald-400">PASSPORT.JS DUAL SESSIONS</span>
            </div>

          </div>

          <div className="text-[10px] font-mono text-gray-500 border-t border-gray-800 pt-2 flex justify-between">
            <span>REACT 19 + TAILWIND 4 + MOTION</span>
            <span>REST API + DUAL JWT & PASSPORT AUTH</span>
          </div>

        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 -z-10 blur-md"></div>
      </div>

      {/* Information Area */}
      <ProjectInfoSide project={project} index={index} accentColor="emerald" />
    </div>
  );
};
