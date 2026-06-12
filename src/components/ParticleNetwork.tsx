'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  pulse: number;
  pulseSpeed: number;
  hue: 'violet' | 'cyan' | 'magenta' | 'amber' | 'emerald';
}

type Intensity = 'subtle' | 'medium' | 'vibrant';
type Palette = 'brand' | 'ia' | 'corporate';

interface ParticleNetworkProps {
  intensity?: Intensity;
  palette?: Palette;
  className?: string;
}

const INTENSITY_CONFIG: Record<
  Intensity,
  { density: number; baseAlpha: number; lineAlpha: number; speed: number; sizeMul: number }
> = {
  subtle:  { density: 24000, baseAlpha: 0.35, lineAlpha: 0.22, speed: 0.18, sizeMul: 0.85 },
  medium:  { density: 18000, baseAlpha: 0.55, lineAlpha: 0.32, speed: 0.25, sizeMul: 1.0  },
  vibrant: { density: 14000, baseAlpha: 0.85, lineAlpha: 0.45, speed: 0.35, sizeMul: 1.15 },
};

const PALETTE_DIST: Record<Palette, { hue: Particle['hue']; pct: number }[]> = {
  // Brand corporativa: azul + cyan + acentos amber/emerald (logo)
  brand: [
    { hue: 'cyan', pct: 0.5 },
    { hue: 'amber', pct: 0.75 },
    { hue: 'emerald', pct: 0.92 },
    { hue: 'violet', pct: 1 },
  ],
  // IA / neuronal: violeta dominante + cyan + magenta
  ia: [
    { hue: 'violet', pct: 0.78 },
    { hue: 'magenta', pct: 0.92 },
    { hue: 'cyan', pct: 1 },
  ],
  // Corporate sutil: cyan dominante + brand + emerald
  corporate: [
    { hue: 'cyan', pct: 0.65 },
    { hue: 'emerald', pct: 0.85 },
    { hue: 'amber', pct: 1 },
  ],
};

/**
 * Red de partículas reactiva.
 * - Las partículas flotan y se conectan entre sí cuando están cerca.
 * - Reaccionan suavemente al mouse (se separan/atraen).
 * - Brillo pulsante en cada nodo.
 *
 * Props:
 *   - intensity: 'subtle' | 'medium' | 'vibrant'
 *   - palette: 'brand' | 'ia' | 'corporate'
 */
export default function ParticleNetwork({
  intensity = 'vibrant',
  palette = 'ia',
  className = '',
}: ParticleNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationId = 0;
    let mouseX = -10000;
    let mouseY = -10000;
    let width = 0;
    let height = 0;

    const cfg = INTENSITY_CONFIG[intensity];
    const dist = PALETTE_DIST[palette];

    const colorFor = (hue: Particle['hue']): [number, number, number] => {
      if (hue === 'cyan') return [34, 211, 238];
      if (hue === 'magenta') return [236, 72, 153];
      if (hue === 'amber') return [251, 191, 36];
      if (hue === 'emerald') return [52, 211, 153];
      return [167, 139, 250]; // violet
    };

    const pickHue = (): Particle['hue'] => {
      const r = Math.random();
      for (const slot of dist) {
        if (r < slot.pct) return slot.hue;
      }
      return dist[dist.length - 1].hue;
    };

    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const initParticles = () => {
      const count = Math.min(110, Math.max(40, Math.floor((width * height) / cfg.density)));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * cfg.speed,
          vy: (Math.random() - 0.5) * cfg.speed,
          size: (Math.random() * 1.6 + 0.7) * cfg.sizeMul,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.012 + Math.random() * 0.025,
          hue: pickHue(),
        });
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouseX = -10000;
      mouseY = -10000;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.touches[0].clientX - rect.left;
        mouseY = e.touches[0].clientY - rect.top;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Update particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Repulsión suave del mouse
        const dxm = p.x - mouseX;
        const dym = p.y - mouseY;
        const dm2 = dxm * dxm + dym * dym;
        if (dm2 < 14000) {
          const dm = Math.sqrt(dm2);
          const force = (1 - dm / 120) * 0.6;
          if (dm > 0) {
            p.x += (dxm / dm) * force;
            p.y += (dym / dm) * force;
          }
        }

        // Rebote con margen
        if (p.x < 0) {
          p.x = 0;
          p.vx *= -1;
        }
        if (p.x > width) {
          p.x = width;
          p.vx *= -1;
        }
        if (p.y < 0) {
          p.y = 0;
          p.vy *= -1;
        }
        if (p.y > height) {
          p.y = height;
          p.vy *= -1;
        }

        // Pulse
        p.pulse += p.pulseSpeed;
      }

      // Dibujar conexiones primero
      const maxDist = 130;
      const maxDist2 = maxDist * maxDist;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxDist2) {
            const distp = Math.sqrt(d2);
            const opacity = (1 - distp / maxDist) * cfg.lineAlpha;
            const [r1, g1, b1] = colorFor(a.hue);
            ctx.strokeStyle = `rgba(${r1}, ${g1}, ${b1}, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Dibujar partículas (glow + núcleo)
      for (const p of particles) {
        const pulseValue = (Math.sin(p.pulse) + 1) / 2; // 0..1
        const [r, g, b] = colorFor(p.hue);

        // Halo grande
        const glowSize = p.size * (4 + pulseValue * 6);
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize);
        const haloAlpha = (0.45 + pulseValue * 0.35) * cfg.baseAlpha;
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${haloAlpha})`);
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${0.12 * cfg.baseAlpha})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Núcleo brillante
        ctx.fillStyle = `rgba(255, 255, 255, ${(0.75 + pulseValue * 0.2) * cfg.baseAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    const onResize = () => {
      setSize();
      initParticles();
    };

    setSize();
    initParticles();
    draw();

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [intensity, palette]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
