'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';

const PORTAL_URL = 'https://app.quuantica.com';

/**
 * Ventana "Ingreso Clientes" para la home de quuantica.com.
 * Muestra un movimiento de reloj automático (engranajes girando, volante
 * oscilando y rotor balanceándose) con la HORA REAL, y un botón que lleva
 * al Portal SIG Integral en app.quuantica.com.
 *
 * El login de verdad ocurre en el portal; esta ventana es solo la puerta.
 */
export default function IngresoClientes() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const clockRef = useRef<HTMLSpanElement | null>(null);
  const dateRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const NS = 'http://www.w3.org/2000/svg';
    const el = (n: string, a: Record<string, string | number>) => {
      const e = document.createElementNS(NS, n);
      for (const k in a) e.setAttribute(k, String(a[k]));
      return e;
    };

    const gearsG = svg.querySelector('#qc-gears') as SVGGElement;
    const balG = svg.querySelector('#qc-balance') as SVGGElement;
    const ticksG = svg.querySelector('#qc-ticks') as SVGGElement;
    const rotorG = svg.querySelector('#qc-rotor') as SVGGElement;
    const hHour = svg.querySelector('#qc-h') as SVGLineElement;
    const hMin = svg.querySelector('#qc-m') as SVGLineElement;
    const hSec = svg.querySelector('#qc-s') as SVGLineElement;

    // hour ticks
    for (let i = 0; i < 60; i++) {
      const big = i % 5 === 0;
      const ang = (i * 6 * Math.PI) / 180;
      const r1 = big ? 128 : 131;
      const r2 = 134;
      ticksG.appendChild(
        el('line', {
          x1: 150 + Math.sin(ang) * r1,
          y1: 150 - Math.cos(ang) * r1,
          x2: 150 + Math.sin(ang) * r2,
          y2: 150 - Math.cos(ang) * r2,
          stroke: big ? '#9db7e6' : '#3a4d74',
          'stroke-width': big ? 2.2 : 1,
          'stroke-linecap': 'round',
        }),
      );
    }

    const makeGear = (cx: number, cy: number, rP: number, teeth: number, fill: string) => {
      const g = el('g', {});
      const rOut = rP + rP * 0.16;
      const rIn = rP;
      const tg = el('g', {});
      for (let i = 0; i < teeth; i++) {
        const a = (i / teeth) * Math.PI * 2;
        const w = ((Math.PI * 2 * rIn) / teeth) * 0.42;
        const tx = cx + Math.cos(a) * rIn;
        const ty = cy + Math.sin(a) * rIn;
        tg.appendChild(
          el('rect', {
            x: tx - w / 2,
            y: ty - (rOut - rIn + 1) / 2,
            width: w,
            height: rOut - rIn + 2,
            rx: 1.1,
            fill,
            stroke: '#5a4116',
            'stroke-width': 0.5,
            transform: `rotate(${(a * 180) / Math.PI + 90} ${tx} ${ty})`,
          }),
        );
      }
      g.appendChild(tg);
      g.appendChild(el('circle', { cx, cy, r: rP * 0.92, fill, stroke: '#5a4116', 'stroke-width': 0.8 }));
      const arms = teeth > 18 ? 5 : 4;
      for (let s = 0; s < arms; s++) {
        const aa = (s / arms) * Math.PI * 2;
        g.appendChild(
          el('circle', {
            cx: cx + Math.cos(aa) * rP * 0.5,
            cy: cy + Math.sin(aa) * rP * 0.5,
            r: rP * 0.18,
            fill: '#0a1428',
            opacity: 0.9,
          }),
        );
      }
      g.appendChild(el('circle', { cx, cy, r: rP * 0.22, fill: 'url(#qc-brassDark)', stroke: '#3a2c10', 'stroke-width': 0.8 }));
      g.appendChild(el('circle', { cx, cy, r: rP * 0.09, fill: 'url(#qc-jewel)' }));
      return g;
    };

    const defs: [number, number, number, number, number, string][] = [
      [96, 120, 40, 26, 9, 'url(#qc-brass)'],
      [150, 150, 30, 20, -15, 'url(#qc-brassDark)'],
      [200, 126, 24, 16, 24, 'url(#qc-brass)'],
      [206, 186, 16, 12, -40, 'url(#qc-brassDark)'],
      [166, 206, 11, 10, 60, 'url(#qc-brass)'],
    ];
    const rotors: { node: SVGGElement; cx: number; cy: number; speed: number; ang: number }[] = [];
    defs.forEach((d) => {
      const g = makeGear(d[0], d[1], d[2], d[3], d[5]) as SVGGElement;
      gearsG.appendChild(g);
      rotors.push({ node: g, cx: d[0], cy: d[1], speed: d[4], ang: Math.random() * 360 });
    });

    // balance wheel
    const bcx = 112;
    const bcy = 210;
    const br = 26;
    const wheel = el('g', {}) as SVGGElement;
    wheel.appendChild(el('circle', { cx: bcx, cy: bcy, r: br, fill: 'none', stroke: 'url(#qc-brass)', 'stroke-width': 4 }));
    for (let s = 0; s < 3; s++) {
      const a = (s / 3) * Math.PI * 2;
      wheel.appendChild(
        el('line', { x1: bcx, y1: bcy, x2: bcx + Math.cos(a) * br, y2: bcy + Math.sin(a) * br, stroke: 'url(#qc-brass)', 'stroke-width': 2.4 }),
      );
    }
    wheel.appendChild(el('circle', { cx: bcx, cy: bcy, r: 4, fill: 'url(#qc-brassDark)' }));
    wheel.appendChild(el('circle', { cx: bcx, cy: bcy, r: 2, fill: 'url(#qc-jewel)' }));
    balG.appendChild(wheel);

    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    const two = (n: number) => (n < 10 ? '0' : '') + n;
    const start = performance.now();
    let raf = 0;

    const frame = (now: number) => {
      const t = (now - start) / 1000;
      for (const g of rotors) {
        const a = g.ang + (reduce ? 0 : g.speed * t);
        g.node.setAttribute('transform', `rotate(${a} ${g.cx} ${g.cy})`);
      }
      const bAng = reduce ? 0 : 42 * Math.sin(t * Math.PI * 2 * 1.25);
      wheel.setAttribute('transform', `rotate(${bAng} ${bcx} ${bcy})`);
      const rAng = reduce ? 18 : 64 * Math.sin((t * Math.PI * 2) / 2.6) + 18 * Math.sin((t * Math.PI * 2) / 0.95);
      rotorG.setAttribute('transform', `rotate(${rAng} 150 150)`);

      const d = new Date();
      const sec = d.getSeconds() + d.getMilliseconds() / 1000;
      const min = d.getMinutes() + sec / 60;
      const hr = (d.getHours() % 12) + min / 60;
      hSec.setAttribute('transform', `rotate(${sec * 6} 150 150)`);
      hMin.setAttribute('transform', `rotate(${min * 6} 150 150)`);
      hHour.setAttribute('transform', `rotate(${hr * 30} 150 150)`);
      if (clockRef.current) clockRef.current.textContent = `${two(d.getHours())}:${two(d.getMinutes())}:${two(d.getSeconds())}`;
      if (dateRef.current) dateRef.current.textContent = `${d.getDate()} ${meses[d.getMonth()]} ${d.getFullYear()} · precisión en tiempo real`;

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="relative w-full max-w-sm mx-auto"
    >
      {/* resplandor */}
      <div className="absolute -inset-5 bg-gradient-to-tr from-brand-600/25 via-accent-cyan/15 to-accent-violet/20 rounded-[28px] blur-2xl opacity-70" />

      <div className="relative glass-vibrant-strong rounded-3xl p-7 text-center">
        <div className="watch-glow mx-auto mb-1" style={{ width: 168, height: 168 }}>
          <svg ref={svgRef} viewBox="0 0 300 300" width="168" height="168" role="img" aria-label="Movimiento de reloj automático con la hora real">
            <defs>
              <radialGradient id="qc-plate" cx="42%" cy="38%" r="75%">
                <stop offset="0%" stopColor="#12203f" />
                <stop offset="60%" stopColor="#0a1428" />
                <stop offset="100%" stopColor="#050c1c" />
              </radialGradient>
              <linearGradient id="qc-brass" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F4DE9A" />
                <stop offset="45%" stopColor="#D9B45C" />
                <stop offset="100%" stopColor="#A87E32" />
              </linearGradient>
              <linearGradient id="qc-brassDark" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#D9B45C" />
                <stop offset="100%" stopColor="#6E4E1C" />
              </linearGradient>
              <linearGradient id="qc-ring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#dfe9ff" />
                <stop offset="30%" stopColor="#5f7bb5" />
                <stop offset="55%" stopColor="#22314f" />
                <stop offset="100%" stopColor="#8fa9df" />
              </linearGradient>
              <linearGradient id="qc-rotorGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7fafff" />
                <stop offset="50%" stopColor="#2B6BE6" />
                <stop offset="100%" stopColor="#14264a" />
              </linearGradient>
              <radialGradient id="qc-jewel" cx="35%" cy="35%" r="70%">
                <stop offset="0%" stopColor="#ff9db0" />
                <stop offset="100%" stopColor="#E14B6A" />
              </radialGradient>
            </defs>

            <circle cx="150" cy="150" r="146" fill="url(#qc-ring)" />
            <circle cx="150" cy="150" r="138" fill="#0a1326" />
            <circle cx="150" cy="150" r="134" fill="url(#qc-plate)" stroke="#1c2c4d" strokeWidth="1" />

            <g id="qc-ticks" />
            <g id="qc-gears" />
            <g id="qc-balance" />

            <g id="qc-rotor">
              <path d="M150,150 m-104,0 a104,104 0 0,1 208,0 L150,150 Z" fill="url(#qc-rotorGrad)" opacity="0.34" />
              <path d="M150,150 m-104,0 a104,104 0 0,1 208,0" fill="none" stroke="#9cc2ff" strokeWidth="3" opacity="0.55" />
              <circle cx="150" cy="150" r="15" fill="url(#qc-brassDark)" stroke="#3a2c10" strokeWidth="1" />
            </g>

            <g>
              <line id="qc-h" x1="150" y1="150" x2="150" y2="96" stroke="#eaf2ff" strokeWidth="6" strokeLinecap="round" />
              <line id="qc-m" x1="150" y1="150" x2="150" y2="66" stroke="#eaf2ff" strokeWidth="4" strokeLinecap="round" />
              <line id="qc-s" x1="150" y1="162" x2="150" y2="58" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" />
              <circle cx="150" cy="150" r="5.5" fill="#22D3EE" stroke="#04101f" strokeWidth="1.5" />
            </g>
          </svg>
        </div>

        <div className="font-mono text-sm tracking-[0.18em] text-accent-cyan">
          <span ref={clockRef}>--:--:--</span>
        </div>
        <div className="font-mono text-[0.6rem] tracking-[0.2em] text-brand-100/55 mt-1 mb-4">
          <span ref={dateRef}>—</span>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mb-4" />

        <h3 className="font-display text-xl font-bold text-brand-50">Ingreso Clientes</h3>
        <p className="text-sm text-brand-100/65 mt-1 mb-5">
          Su empresa entra al Portal SIG Integral
          <br />
          <span className="text-brand-100/45">— SST · PESV — de forma segura</span>
        </p>

        <a href={PORTAL_URL} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center">
          <LogIn size={18} />
          Ingresar al portal
        </a>

        <div className="flex items-center justify-center gap-2 mt-4 text-[0.7rem] text-brand-100/55">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse-soft" />
          Acceso cifrado · app.quuantica.com
        </div>
      </div>
    </motion.div>
  );
}
