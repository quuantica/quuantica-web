'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, CalendarCheck, HardHat, ShieldCheck } from 'lucide-react';

const STATS = [
  {
    icon: Building2,
    target: 20,
    suffix: '+',
    label: 'Empresas atendidas',
    color: 'text-brand-300',
    bg: 'from-brand-600/25 to-brand-500/5 border-brand-500/30',
  },
  {
    icon: CalendarCheck,
    target: 1,
    suffix: ' año',
    label: 'De experiencia',
    color: 'text-accent-cyan',
    bg: 'from-accent-cyan/25 to-accent-cyan/5 border-accent-cyan/30',
  },
  {
    icon: HardHat,
    target: 1200,
    suffix: '+',
    label: 'Trabajadores protegidos',
    color: 'text-amber-300',
    bg: 'from-amber-500/25 to-amber-400/5 border-amber-400/30',
  },
  {
    icon: ShieldCheck,
    target: 100,
    suffix: '%',
    label: 'Cumplimiento normativo',
    color: 'text-emerald-300',
    bg: 'from-emerald-500/25 to-emerald-400/5 border-emerald-400/30',
  },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString('es-CO')}
      {suffix}
    </span>
  );
}

export default function Estadisticas() {
  return (
    <section className="section-pad relative">
      <div className="container-q">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="badge-cyan mb-4">Nuestra trayectoria</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            Resultados que{' '}
            <span className="gradient-text">hablan por sí solos</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`surface rounded-2xl border bg-gradient-to-br ${s.bg} p-6 flex flex-col items-center text-center gap-3`}
            >
              <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${s.color}`}>
                <s.icon size={24} />
              </div>
              <div className={`font-display text-4xl font-extrabold tracking-tight ${s.color}`}>
                <Counter target={s.target} suffix={s.suffix} />
              </div>
              <p className="text-brand-100/70 text-sm font-medium leading-snug">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
