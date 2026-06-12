'use client';

import { motion } from 'framer-motion';
import { Cpu, Network, ShieldCheck, Sparkles } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';

type PilarAccent = 'brand' | 'cyan' | 'amber' | 'emerald';

const PILARES: { icon: any; title: string; desc: string; accent: PilarAccent }[] = [
  {
    icon: Cpu,
    title: 'Tecnología empresarial real',
    desc: 'Plataformas construidas con estándares industriales: arquitectura modular, escalable y mantenible.',
    accent: 'brand',
  },
  {
    icon: Network,
    title: 'Automatización inteligente',
    desc: 'Procesos críticos del SG-SST y la gestión documental orquestados con flujos lógicos auditables.',
    accent: 'cyan',
  },
  {
    icon: Sparkles,
    title: 'IA aplicada al cumplimiento',
    desc: 'Modelos de lenguaje conectados a normativa colombiana vigente: redacción, análisis y verificación.',
    accent: 'amber',
  },
  {
    icon: ShieldCheck,
    title: 'Diseño institucional seguro',
    desc: 'Control por roles, trazabilidad completa, separación multiempresa y respaldo permanente.',
    accent: 'emerald',
  },
];

const PILAR_PALETTE: Record<PilarAccent, { bg: string; icon: string; hover: string }> = {
  brand: {
    bg: 'from-brand-600/30 to-brand-500/10 border-brand-500/30',
    icon: 'text-brand-200',
    hover: 'group-hover:from-brand-500/40 group-hover:border-brand-400',
  },
  cyan: {
    bg: 'from-accent-cyan/30 to-accent-cyan/5 border-accent-cyan/30',
    icon: 'text-accent-cyan',
    hover: 'group-hover:from-accent-cyan/40 group-hover:border-accent-cyan/60',
  },
  amber: {
    bg: 'from-amber-500/30 to-amber-400/5 border-amber-400/40',
    icon: 'text-amber-300',
    hover: 'group-hover:from-amber-400/40 group-hover:border-amber-300/70',
  },
  emerald: {
    bg: 'from-emerald-500/30 to-emerald-400/5 border-emerald-400/40',
    icon: 'text-emerald-300',
    hover: 'group-hover:from-emerald-400/40 group-hover:border-emerald-300/70',
  },
};

export default function QuienesSomos() {
  return (
    <section id="quienes-somos" className="section-pad relative">
      <div className="container-q">
        <SectionHeading
          eyebrow="Quiénes somos"
          title="Construimos infraestructura digital para "
          highlight="empresas e instituciones."
          subtitle="QUUANTICA es una compañía colombiana especializada en construir plataformas tecnológicas que centralizan la operación y elevan el cumplimiento normativo. Diseñamos software empresarial sólido, con inteligencia artificial integrada y seguridad institucional, listo para entornos de alta exigencia."
        />

        <div className="grid md:grid-cols-2 gap-5 mt-14">
          {PILARES.map((p, i) => {
            const pal = PILAR_PALETTE[p.accent];
            return (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="surface surface-hover p-7 group"
            >
              <div className="flex items-start gap-5">
                <div className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${pal.bg} ${pal.hover} border flex items-center justify-center ${pal.icon} transition-colors`}>
                  <p.icon size={22} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight mb-2">
                    {p.title}
                  </h3>
                  <p className="text-brand-100/70 leading-relaxed text-sm">{p.desc}</p>
                </div>
              </div>
            </motion.div>
          );
          })}
        </div>

        {/* Bloque visión */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mt-14 relative overflow-hidden rounded-3xl border border-brand-500/20 bg-gradient-to-br from-ink-900 via-ink-850 to-ink-900 p-10 md:p-14"
        >
          <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-brand-600/15 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-accent-cyan/10 blur-3xl" />

          <div className="relative grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3">
              <div className="badge-cyan mb-4">Nuestra visión</div>
              <h3 className="font-display text-2xl md:text-4xl font-bold leading-tight tracking-tight">
                «Construimos un futuro donde la{' '}
                <span className="gradient-text">tecnología empresarial de alto nivel</span>{' '}
                sea accesible para cualquier organización, sin barreras de costo ni
                complejidad.»
              </h3>
            </div>
            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              <Metric n="2024" l="Año de fundación" />
              <Metric n="100%" l="Hecho en Colombia" />
              <Metric n="Cloud" l="Infraestructura" />
              <Metric n="ISO" l="Buenas prácticas" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Metric({ n, l }: { n: string; l: string }) {
  return (
    <div className="rounded-xl bg-white/[.03] border border-white/[.06] p-4 backdrop-blur-md">
      <div className="font-display text-2xl font-bold text-brand-200">{n}</div>
      <div className="text-xs text-brand-100/60 mt-1">{l}</div>
    </div>
  );
}
