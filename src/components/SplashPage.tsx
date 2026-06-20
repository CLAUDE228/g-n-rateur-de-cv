import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Sparkles, Wand2 } from 'lucide-react';

interface SplashPageProps {
  onComplete: () => void;
}

export default function SplashPage({ onComplete }: SplashPageProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar animation representing system load
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1.25; // Completes around 4 seconds
      });
    }, 50);

    const timer = setTimeout(() => {
      onComplete();
    }, 4500); // 4.5 seconds for elegant visual pacing

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div id="splash-container" className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-between p-8 text-white z-50 overflow-hidden select-none">
      {/* Decorative background grid and ambient glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.1),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(168,85,247,0.1),transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-slate-950 to-transparent opacity-60" />

      {/* Action to skip for rapid repeat visits */}
      <div className="w-full flex justify-end relative z-10">
        <button
          id="skip-splash-btn"
          onClick={onComplete}
          className="px-4 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-900 border border-indigo-950 rounded-full cursor-pointer transition-colors"
        >
          Passer l'introduction →
        </button>
      </div>

      {/* Central Animated Branding Block */}
      <div className="flex flex-col items-center justify-center relative z-10 flex-1 max-w-md w-full">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative mb-6"
        >
          {/* Animated rings around the brand icon */}
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-30 animate-pulse" />
          <div className="relative bg-slate-900 border border-slate-700 p-5 rounded-2xl shadow-2xl flex items-center justify-center">
            <FileText className="h-12 w-12 text-indigo-400" />
            <motion.div
              initial={{ rotate: -15, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -top-1 -right-1 bg-gradient-to-r from-indigo-500 to-indigo-600 p-1.5 rounded-lg border border-indigo-400"
            >
              <Wand2 className="h-4 w-4 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Title and subtitle */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-105 to-slate-300 bg-clip-text text-transparent text-center"
        >
          CV<span className="text-indigo-500">Forge</span>
        </motion.h1>

        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-sm text-slate-400 mt-2 text-center font-medium max-w-xs"
        >
          Concevez un CV d'impact, élégant et conforme aux exigences du marché.
        </motion.p>

        {/* Dynamic status indicators */}
        <div className="w-full mt-12 bg-slate-900/80 border border-indigo-950 rounded-2xl p-4 flex flex-col gap-3 relative overflow-hidden shadow-inner">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-500 flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-indigo-400 animate-spin" />
              Initialisation des modèles...
            </span>
            <span className="text-indigo-400 select-all font-semibold">{Math.min(100, Math.round(progress))}%</span>
          </div>

          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {/* Decorative footer */}
      <div className="w-full text-center relative z-10 text-[10px] font-mono text-slate-600 tracking-wider">
        PROJET CV ACADÉMIQUE • CLIENT SPA REACT
      </div>
    </div>
  );
}
