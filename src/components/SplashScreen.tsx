'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import ParticleNetwork from './ParticleNetwork';

/**
 * Pantalla de bienvenida (splash screen)
 *
 * Secuencia rápida (~2 segundos):
 *   1. Logo QUUANTICA aparece centrado y se desvanece
 *   2. Texto "Bienvenidos" aparece y se desvanece
 *   3. Se desmonta y la página queda visible
 */
export default function SplashScreen() {
  const [phase, setPhase] = useState<'logo' | 'welcome' | 'done'>('logo');

  useEffect(() => {
    // Bloquear scroll mientras dura el splash
    document.body.style.overflow = 'hidden';

    const t1 = setTimeout(() => setPhase('welcome'), 1100);
    const t2 = setTimeout(() => setPhase('done'), 2100);
    const t3 = setTimeout(() => {
      document.body.style.overflow = '';
    }, 2500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950 overflow-hidden"
        >
          {/* Red de partículas reactiva */}
          <ParticleNetwork />

          {/* Vignette sutil para legibilidad del logo */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at center, transparent 30%, rgba(4, 8, 20, 0.55) 80%)',
            }}
            aria-hidden="true"
          />

          {/* Resplandor central que respira */}
          <motion.div
            initial={{ opacity: 0.4, scale: 0.9 }}
            animate={{ opacity: [0.35, 0.6, 0.35], scale: [0.9, 1.05, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-600/20 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Contenido animado */}
          <div className="relative flex items-center justify-center min-h-[140px]">
            <AnimatePresence mode="wait">
              {phase === 'logo' && (
                <motion.div
                  key="logo"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="flex flex-col items-center gap-5"
                >
                  <Logo size={150} showText={false} />
                  <div className="font-display text-4xl md:text-5xl font-bold tracking-tight">
                    <span className="text-white">QU</span>
                    <span className="text-amber-400">U</span>
                    <span className="text-white">ANTIC</span>
                    <span className="text-emerald-400">A</span>
                  </div>
                  <div className="text-xs uppercase tracking-[.4em] text-brand-200/70 font-medium">
                    Servicios Tecnológicos
                  </div>
                </motion.div>
              )}

              {phase === 'welcome' && (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="text-center"
                >
                  <div className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight gradient-text-soft">
                    Bienvenidos
                  </div>
                  <div className="mt-3 text-xs md:text-sm uppercase tracking-[.4em] text-brand-200/60">
                    Tecnología empresarial
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
