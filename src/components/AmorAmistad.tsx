'use client';

import { motion } from 'framer-motion';

/**
 * Cuadro decorativo "Mes del Amor y la Amistad" (septiembre en Colombia).
 * Versión ESTÁTICA y liviana: solo una ilustración (SVG) + texto, sin canvas
 * ni animaciones en bucle, para no relentizar la página. Va a la izquierda de
 * "Ingreso Clientes" en el Hero.
 */
export default function AmorAmistad() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="relative w-full max-w-[260px] mx-auto"
    >
      {/* resplandor exterior suave (estático) */}
      <div
        className="absolute -inset-5 rounded-[28px] blur-2xl opacity-70"
        style={{ background: 'linear-gradient(135deg, rgba(226,59,123,.30), rgba(255,146,112,.16), rgba(255,211,107,.20))' }}
        aria-hidden="true"
      />

      <div className="relative glass-vibrant-strong rounded-3xl p-6 text-center overflow-hidden">
        {/* destellos decorativos estáticos */}
        <span className="absolute top-3 left-3.5 text-sm opacity-70" aria-hidden="true">✨</span>
        <span className="absolute top-3.5 right-4 text-sm opacity-70" aria-hidden="true">💫</span>

        {/* Ilustración estática: corazón con degradado y brillo */}
        <div className="relative mx-auto" style={{ width: 168, height: 168 }} aria-hidden="true">
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: 'radial-gradient(circle at 50% 45%, rgba(255,95,155,.40), rgba(226,59,123,0) 68%)' }}
          />
          <svg viewBox="0 0 200 190" className="relative block w-full h-full" role="img" aria-label="Corazón de amor y amistad">
            <defs>
              <linearGradient id="aa-heart" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#FF8FB4" />
                <stop offset="55%" stopColor="#E23B7B" />
                <stop offset="100%" stopColor="#FF9270" />
              </linearGradient>
              <radialGradient id="aa-shine" cx="38%" cy="30%" r="45%">
                <stop offset="0" stopColor="#ffffff" stopOpacity=".55" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path
              d="M100 176 C 30 128, 8 82, 30 50 C 47 25, 86 27, 100 58 C 114 27, 153 25, 170 50 C 192 82, 170 128, 100 176 Z"
              fill="url(#aa-heart)"
              style={{ filter: 'drop-shadow(0 10px 22px rgba(226,59,123,.5))' }}
            />
            <path
              d="M100 176 C 30 128, 8 82, 30 50 C 47 25, 86 27, 100 58 C 114 27, 153 25, 170 50 C 192 82, 170 128, 100 176 Z"
              fill="url(#aa-shine)"
            />
            {/* dos manos/amistad sugeridas con corazones pequeños */}
            <text x="62" y="150" fontSize="20" textAnchor="middle" fill="#ffffff" opacity=".85">💗</text>
            <text x="138" y="150" fontSize="16" textAnchor="middle" fill="#ffffff" opacity=".8">💛</text>
          </svg>
        </div>

        <div className="text-[0.62rem] font-bold tracking-[0.24em] uppercase mt-1" style={{ color: '#FF6FA5' }}>
          Feliz mes del
        </div>
        <div
          className="font-display italic font-semibold leading-[1.05] mt-1"
          style={{
            fontSize: '1.6rem',
            backgroundImage: 'linear-gradient(92deg,#FFB3CE,#FFD36B)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Amor y la Amistad
        </div>

        <div
          className="relative h-px my-3.5"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(255,111,165,.6),transparent)' }}
          aria-hidden="true"
        />

        <p className="text-[0.72rem] text-brand-100/60 leading-relaxed">
          Gracias por confiar en nosotros este septiembre.
          <br />
          <span className="text-brand-100/45">Con cariño, tu equipo QUUANTICA 💗</span>
        </p>
      </div>
    </motion.div>
  );
}
