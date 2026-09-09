'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Cuadro decorativo "Mes del Amor y la Amistad" (septiembre en Colombia).
 * Corazón de partículas (canvas) que respira, aura, destellos, corazones
 * orbitando, polvo de luz y una caja de regalos que estalla corazones.
 * Va a la izquierda de "Ingreso Clientes" en el Hero.
 */
export default function AmorAmistad() {
  const cvRef = useRef<HTMLCanvasElement | null>(null);
  const giftRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cv = cvRef.current;
    if (!cv) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const fit = () => {
      const r = cv.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = Math.max(1, r.width * dpr);
      cv.height = Math.max(1, r.height * dpr);
      const c = cv.getContext('2d')!;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { ctx: c, w: r.width, h: r.height };
    };
    let { ctx, w, h } = fit();

    const heartXY = (t: number): [number, number] => [
      16 * Math.pow(Math.sin(t), 3),
      13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t),
    ];
    const CX = () => w / 2;
    const CY = () => h * 0.45;
    const SC = () => Math.min(w, h) / 38;

    type P = { t: number; ox: number; oy: number; x: number; y: number; gold: boolean; sz: number; sp: number };
    const N = 420;
    const P: P[] = [];
    for (let i = 0; i < N; i++) {
      const t = Math.random() * Math.PI * 2;
      const [hx, hy] = heartXY(t);
      P.push({ t, ox: hx, oy: hy, x: Math.random() * w, y: Math.random() * h, gold: Math.random() < 0.42, sz: Math.random() * 1.6 + 0.8, sp: Math.random() * 0.02 + 0.03 });
    }
    const DUST = Array.from({ length: 42 }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.3 + 0.4, sp: Math.random() * 0.25 + 0.1, dx: (Math.random() - 0.5) * 0.2, a: Math.random() * 0.5 + 0.2 }));
    const ORB = Array.from({ length: 4 }, (_, i) => ({ a: (i * Math.PI) / 2, sp: 0.008 + i * 0.0016, rx: 1.35, ry: 1.05, size: i % 2 ? 7 : 9, gold: i % 2 === 0 }));
    let SPK: { x: number; y: number; life: number; mx: number; gold: boolean }[] = [];
    let BURST: { x: number; y: number; vx: number; vy: number; life: number; rot: number; heart: boolean; c: string; sz: number }[] = [];
    const gcols = ['#FF6FA5', '#FFD36B', '#FF9270', '#5B84FF', '#37D0EA', '#B06BFF'];

    const heartPath = (c: CanvasRenderingContext2D, s: number) => {
      c.beginPath();
      for (let t = 0; t < Math.PI * 2 + 0.1; t += 0.3) {
        const [hx, hy] = heartXY(t);
        t === 0 ? c.moveTo(hx * s, -hy * s) : c.lineTo(hx * s, -hy * s);
      }
      c.closePath();
    };
    const sparkle = (c: CanvasRenderingContext2D, r: number) => {
      c.beginPath();
      for (let i = 0; i < 4; i++) {
        const a = (i * Math.PI) / 2;
        c.lineTo(Math.cos(a) * r, Math.sin(a) * r);
        c.lineTo(Math.cos(a + Math.PI / 4) * r * 0.3, Math.sin(a + Math.PI / 4) * r * 0.3);
      }
      c.closePath();
    };
    const burst = () => {
      const g = giftRef.current;
      if (g) {
        g.style.transition = 'transform .25s cubic-bezier(.34,1.7,.6,1)';
        g.style.transform = 'translateX(-50%) scale(1.22)';
        setTimeout(() => { g.style.transform = 'translateX(-50%)'; }, 260);
      }
      const gx = w / 2, gy = h - 22, n = 32;
      for (let i = 0; i < n; i++) {
        const a = -Math.PI / 2 + (Math.random() - 0.5) * 2.0, sp = Math.random() * 3 + 1.8;
        BURST.push({ x: gx, y: gy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1, rot: Math.random() * 6, heart: Math.random() < 0.6, c: gcols[i % gcols.length], sz: Math.random() * 5 + 4 });
      }
    };
    const g0 = giftRef.current;
    if (g0) g0.onclick = burst;

    let time = 0;
    let raf = 0;
    const frame = () => {
      time += 0.012;
      ctx.clearRect(0, 0, w, h);
      const breath = 1 + Math.sin(time * 1.4) * 0.05;
      const hr = Math.min(w, h) * 0.36 * breath;
      const g = ctx.createRadialGradient(CX(), CY(), 0, CX(), CY(), hr);
      g.addColorStop(0, 'rgba(255,95,155,0.30)');
      g.addColorStop(0.5, 'rgba(226,59,123,0.12)');
      g.addColorStop(1, 'rgba(226,59,123,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'lighter';
      for (const d of DUST) {
        d.y -= d.sp; d.x += d.dx;
        if (d.y < -4) { d.y = h + 4; d.x = Math.random() * w; }
        ctx.beginPath();
        ctx.fillStyle = `rgba(200,220,255,${d.a})`;
        ctx.arc(d.x, d.y, d.r, 0, 7);
        ctx.fill();
      }
      for (const p of P) {
        const tx = CX() + p.ox * SC() * breath, ty = CY() - p.oy * SC() * breath;
        p.x += (tx - p.x) * p.sp + Math.sin(time * 2 + p.t * 7) * 0.25;
        p.y += (ty - p.y) * p.sp + Math.cos(time * 2 + p.t * 5) * 0.25;
        ctx.beginPath();
        ctx.shadowBlur = 8;
        if (p.gold) { ctx.fillStyle = 'rgba(255,214,110,0.92)'; ctx.shadowColor = 'rgba(255,200,90,.8)'; }
        else { ctx.fillStyle = `rgba(255,${(95 + Math.sin(time + p.t) * 30) | 0},155,0.92)`; ctx.shadowColor = 'rgba(255,80,150,.9)'; }
        ctx.arc(p.x, p.y, p.sz, 0, 7);
        ctx.fill();
      }
      for (const o of ORB) {
        o.a += o.sp;
        const ox = CX() + Math.cos(o.a) * SC() * 10 * o.rx, oy = CY() + Math.sin(o.a) * SC() * 7 * o.ry;
        ctx.save();
        ctx.translate(ox, oy);
        ctx.rotate(Math.sin(o.a) * 0.3);
        ctx.shadowBlur = 12;
        ctx.shadowColor = o.gold ? 'rgba(255,205,90,.9)' : 'rgba(255,110,165,.9)';
        ctx.fillStyle = o.gold ? '#FFD36B' : '#FF8FB4';
        heartPath(ctx, (o.size / 16) * breath);
        ctx.fill();
        ctx.restore();
      }
      if (!reduce && Math.random() < 0.08) {
        const ang = Math.random() * Math.PI * 2, rad = SC() * (9 + Math.random() * 4);
        SPK.push({ x: CX() + Math.cos(ang) * rad, y: CY() + Math.sin(ang) * rad * 0.75, life: 1, mx: 2.5 + Math.random() * 3, gold: Math.random() < 0.5 });
      }
      SPK = SPK.filter((s) => s.life > 0);
      for (const s of SPK) {
        s.life -= 0.02;
        const sc = Math.sin((1 - s.life) * Math.PI) * s.mx;
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(time + s.x);
        ctx.globalAlpha = Math.max(0, s.life);
        ctx.fillStyle = s.gold ? '#FFE39A' : '#FFC7DD';
        ctx.shadowBlur = 10;
        ctx.shadowColor = s.gold ? '#FFD36B' : '#FF6FA5';
        sparkle(ctx, sc);
        ctx.fill();
        ctx.restore();
      }
      for (const b of BURST) {
        b.vy += 0.06; b.x += b.vx; b.y += b.vy; b.vx *= 0.99; b.life -= 0.011; b.rot += 0.08;
        if (b.life <= 0) continue;
        ctx.save();
        ctx.globalAlpha = Math.max(0, b.life);
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rot);
        ctx.fillStyle = b.c;
        ctx.shadowBlur = 8;
        ctx.shadowColor = b.c;
        if (b.heart) { heartPath(ctx, b.sz / 16); ctx.fill(); }
        else ctx.fillRect(-b.sz / 2, -b.sz / 2, b.sz, b.sz);
        ctx.restore();
      }
      BURST = BURST.filter((b) => b.life > 0 && b.y < h + 30);

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      if (!reduce) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    burst();
    const iv = reduce ? 0 : window.setInterval(burst, 3400);
    const onResize = () => { ({ ctx, w, h } = fit()); };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      if (iv) clearInterval(iv);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="relative w-full max-w-[260px] mx-auto"
    >
      <div className="absolute -inset-5 rounded-[28px] blur-2xl opacity-70"
        style={{ background: 'linear-gradient(135deg, rgba(226,59,123,.30), rgba(255,146,112,.16), rgba(255,211,107,.20))' }} />

      <div className="relative glass-vibrant-strong rounded-3xl p-6 text-center overflow-hidden">
        {/* esquinas decorativas */}
        <span className="absolute top-3 left-3.5 text-sm opacity-80 animate-pulse-soft" aria-hidden="true">✨</span>
        <span className="absolute top-3.5 right-4 text-sm opacity-80 animate-pulse-soft" aria-hidden="true">💫</span>

        <div className="relative w-full" style={{ height: 210 }}>
          <canvas ref={cvRef} className="block w-full h-full" />
          <div
            ref={giftRef}
            title="¡Ábrelo!"
            className="absolute left-1/2 bottom-0.5 cursor-pointer select-none"
            style={{ transform: 'translateX(-50%)', fontSize: 40, filter: 'drop-shadow(0 8px 16px rgba(255,140,90,.5))' }}
            aria-hidden="true"
          >
            🎁
          </div>
        </div>

        <div className="text-[0.62rem] font-bold tracking-[0.24em] uppercase" style={{ color: '#FF6FA5' }}>
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

        <div className="relative h-px my-3.5"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(255,111,165,.6),transparent)' }} />

        <p className="text-[0.72rem] text-brand-100/60 leading-relaxed">
          Gracias por confiar en nosotros este septiembre.
          <br />
          <span className="text-brand-100/45">Con cariño, tu equipo QUUANTICA 💗</span>
        </p>
      </div>
    </motion.div>
  );
}
