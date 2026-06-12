'use client';

import { motion } from 'framer-motion';

/**
 * Fondo tecnológico decorativo: grid sutil + glows orbiculares + líneas circuit-like.
 * Discreto, no distrae. Diseñado para dar profundidad sin animaciones absurdas.
 */
export default function BackgroundGrid() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid base */}
      <div className="absolute inset-0 bg-tech-grid opacity-60" />

      {/* Radial glows */}
      <div className="absolute -top-40 left-1/4 w-[640px] h-[640px] rounded-full bg-brand-600/15 blur-[140px]" />
      <div className="absolute top-1/3 -right-40 w-[520px] h-[520px] rounded-full bg-accent-cyan/10 blur-[120px]" />
      <div className="absolute -bottom-32 left-10 w-[420px] h-[420px] rounded-full bg-accent-violet/10 blur-[110px]" />

      {/* Líneas circuito decorativas (esquinas) */}
      <svg
        className="absolute top-0 left-0 w-[300px] h-[300px] opacity-30"
        viewBox="0 0 300 300"
        fill="none"
      >
        <path
          d="M0 60 L60 60 L80 80 L160 80 L180 100 L300 100"
          stroke="url(#l1)"
          strokeWidth="1"
        />
        <path
          d="M0 130 L100 130 L120 150 L300 150"
          stroke="url(#l1)"
          strokeWidth="1"
        />
        <path
          d="M0 200 L40 200 L60 220 L300 220"
          stroke="url(#l1)"
          strokeWidth="1"
        />
        <circle cx="60" cy="60" r="3" fill="#4D8DFB" />
        <circle cx="160" cy="80" r="3" fill="#22D3EE" />
        <circle cx="100" cy="130" r="2.5" fill="#4D8DFB" />
        <defs>
          <linearGradient id="l1" x1="0" y1="0" x2="300" y2="0">
            <stop stopColor="#22D3EE" stopOpacity="0" />
            <stop offset="0.5" stopColor="#4D8DFB" stopOpacity="0.7" />
            <stop offset="1" stopColor="#4D8DFB" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        className="absolute bottom-0 right-0 w-[300px] h-[300px] opacity-30 rotate-180"
        viewBox="0 0 300 300"
        fill="none"
      >
        <path
          d="M0 60 L60 60 L80 80 L160 80 L180 100 L300 100"
          stroke="url(#l2)"
          strokeWidth="1"
        />
        <path
          d="M0 130 L100 130 L120 150 L300 150"
          stroke="url(#l2)"
          strokeWidth="1"
        />
        <circle cx="60" cy="60" r="3" fill="#A78BFA" />
        <circle cx="160" cy="80" r="3" fill="#4D8DFB" />
        <defs>
          <linearGradient id="l2" x1="0" y1="0" x2="300" y2="0">
            <stop stopColor="#A78BFA" stopOpacity="0" />
            <stop offset="0.5" stopColor="#4D8DFB" stopOpacity="0.6" />
            <stop offset="1" stopColor="#4D8DFB" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Orbital decoration */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] opacity-20"
      >
        <div className="absolute inset-0 rounded-full border border-brand-500/20" />
        <div className="absolute inset-20 rounded-full border border-brand-500/15" />
        <div className="absolute inset-40 rounded-full border border-accent-cyan/10" />
      </motion.div>

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay" />
    </div>
  );
}
