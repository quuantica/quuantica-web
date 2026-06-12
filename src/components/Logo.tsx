'use client';

import { motion } from 'framer-motion';

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

/**
 * QUUANTICA Logo — Q animada con aros orbitales estilo átomo
 * CSS puro (GPU), sin librerías de animación externas.
 * Totalmente escalable vía prop `size`.
 */
export default function Logo({ size = 44, showText = true, className = '' }: LogoProps) {
  // Todas las medidas escalan proporcionalmente al `size` del contenedor
  const sq   = size * 0.95;          // cuadrado de fondo
  const br   = size * 0.15;          // border-radius del cuadrado
  const svg  = size * 0.78;          // SVG Q dentro del cuadrado

  // Aros — diámetro y margen negativo (centrado absoluto)
  const rd = [size * 0.63, size * 0.75, size * 0.86];   // diámetros r1,r2,r3
  const rm = rd.map(d => -(d / 2));                       // margin-top y margin-left

  // Colores y glow de cada aro
  const rings = [
    { // Aro 1 — azul eléctrico
      top: 'rgba(41,182,246,1)',   bot: 'rgba(41,182,246,.25)',
      lft: 'rgba(41,182,246,.6)', rgt: 'rgba(41,182,246,.1)',
      glow: 'rgba(41,182,246,.9)', bw: 2, cls: 'qav-r1',
    },
    { // Aro 2 — naranja
      top: 'rgba(255,152,0,1)',    bot: 'rgba(255,152,0,.2)',
      lft: 'rgba(255,152,0,.55)', rgt: 'rgba(255,152,0,.08)',
      glow: 'rgba(255,152,0,.9)',  bw: 2, cls: 'qav-r2',
    },
    { // Aro 3 — violeta
      top: 'rgba(206,147,216,1)', bot: 'rgba(206,147,216,.2)',
      lft: 'rgba(206,147,216,.55)', rgt: 'rgba(206,147,216,.08)',
      glow: 'rgba(206,147,216,.8)', bw: 1.5, cls: 'qav-r3',
    },
  ];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.div
        initial={{ rotate: -8, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative shrink-0 flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {/* ── Fondo cuadrado oscuro ── */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            width:  sq,
            height: sq,
            borderRadius: br,
            background: 'radial-gradient(circle at 40% 35%, #0D2B5E 0%, #071428 60%, #040E1F 100%)',
            boxShadow: `0 0 ${size * 0.20}px rgba(41,182,246,.50),
                        0 0 ${size * 0.40}px rgba(41,182,246,.20),
                        inset 0 0 ${size * 0.14}px rgba(0,229,255,.08)`,
          }}
        />

        {/* ── SVG Logo Q ── */}
        <div style={{ position: 'absolute', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg
            viewBox="0 0 44 44"
            width={svg}
            height={svg}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block' }}
          >
            <defs>
              {/* Q arc: cian → azul */}
              <linearGradient id="qLg1" x1="0.3" y1="0" x2="0.7" y2="1" gradientUnits="objectBoundingBox">
                <stop offset="0%"   stopColor="#00E5FF" />
                <stop offset="45%"  stopColor="#29B6F6" />
                <stop offset="100%" stopColor="#1565C0" />
              </linearGradient>
              {/* Slash: morado → violeta */}
              <linearGradient id="qLg2" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
                <stop offset="0%"   stopColor="#7C4DFF" />
                <stop offset="100%" stopColor="#E040FB" />
              </linearGradient>
              {/* Píxeles */}
              <linearGradient id="qLg3" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
                <stop offset="0%"   stopColor="#AA00FF" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#3949AB" stopOpacity="0.70" />
              </linearGradient>
              {/* Glow filter */}
              <filter id="qGlw" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="2" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Píxeles digitales — esquina superior-izquierda */}
            <rect x="3.5"  y="3.5"  width="3.2" height="3.2" rx="0.5" fill="url(#qLg3)" />
            <rect x="8.2"  y="2.6"  width="2.4" height="2.4" rx="0.4" fill="url(#qLg3)" opacity="0.85" />
            <rect x="3.8"  y="8.2"  width="2.4" height="2.4" rx="0.4" fill="url(#qLg3)" opacity="0.80" />
            <rect x="8.6"  y="7.6"  width="1.8" height="1.8" rx="0.3" fill="#9C27B0"    opacity="0.70" />
            <rect x="3.2"  y="12.5" width="1.7" height="1.7" rx="0.3" fill="#7C4DFF"    opacity="0.60" />
            <rect x="11.8" y="3.8"  width="1.7" height="1.7" rx="0.3" fill="#9C27B0"    opacity="0.60" />
            <rect x="12.2" y="8.6"  width="1.3" height="1.3" rx="0.2" fill="#651FFF"    opacity="0.45" />
            <rect x="7.2"  y="12.8" width="1.3" height="1.3" rx="0.2" fill="#7C4DFF"    opacity="0.40" />

            {/* Arco Q — centro(22,22) r=12 trazo=7 hueco 15°–105° */}
            <path
              d="M 33.59 25.11 A 12 12 0 1 0 18.89 33.59"
              stroke="url(#qLg1)"
              strokeWidth="7"
              strokeLinecap="round"
              filter="url(#qGlw)"
            />

            {/* Slash diagonal — cola de la Q (apunta a las 5) */}
            <rect
              x="22.5" y="31.75"
              width="13" height="4.5"
              rx="2.2"
              fill="url(#qLg2)"
              transform="rotate(50 29 34)"
              filter="url(#qGlw)"
            />
          </svg>
        </div>

        {/* ── Aros orbitales (encima del cuadrado) ── */}
        {rings.map((r, i) => (
          <div
            key={i}
            aria-hidden
            className={`qav-ring ${r.cls}`}
            style={{
              width:  rd[i],
              height: rd[i],
              marginTop:  rm[i],
              marginLeft: rm[i],
              borderTopColor:    r.top,
              borderBottomColor: r.bot,
              borderLeftColor:   r.lft,
              borderRightColor:  r.rgt,
              borderWidth: r.bw,
              filter: `drop-shadow(0 0 ${size * 0.07}px ${r.glow})`,
            }}
          />
        ))}
      </motion.div>

      {/* ── Texto QUUANTICA ── */}
      {showText && (
        <div className="leading-tight">
          <div className="font-display text-xl font-bold tracking-tight">
            <span className="text-white">QU</span>
            <span className="text-amber-400">U</span>
            <span className="text-white">ANTIC</span>
            <span className="text-emerald-400">A</span>
          </div>
          <div className="text-[10px] uppercase tracking-[.22em] text-brand-200/70 font-medium">
            Servicios Tecnológicos
          </div>
        </div>
      )}
    </div>
  );
}
