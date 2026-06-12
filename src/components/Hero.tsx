'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  HardHat,
  TrafficCone,
  Network,
  Users,
  GraduationCap,
  Award,
} from 'lucide-react';
import BackgroundGrid from './BackgroundGrid';
import ParticleNetwork from './ParticleNetwork';
import Logo from './Logo';
import { sfx } from '@/lib/sounds';
import { QUUANTICA } from '@/lib/config';

export default function Hero() {
  const wa = `https://wa.me/${QUUANTICA.contact.whatsapp}?text=${encodeURIComponent(
    QUUANTICA.whatsappMessage,
  )}`;

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
      <BackgroundGrid />
      {/* Red de partículas reactiva */}
      <ParticleNetwork intensity="medium" palette="brand" />

      <div className="container-q relative z-10">
        {/* Bloque superior: texto centrado */}
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="badge-brand mb-6 inline-flex"
          >
            <Sparkles size={14} />
            Plataforma empresarial de nueva generación
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-display text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.15] tracking-tight"
          >
            Tecnología empresarial.{' '}
            <span className="gradient-text-soft">Inteligencia aplicada.</span>{' '}
            <span className="gradient-text">Cumplimiento garantizado.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-5 max-w-3xl mx-auto text-base md:text-lg text-brand-100/75 leading-relaxed"
          >
            QUUANTICA construye plataformas tecnológicas que centralizan la gestión
            SG-SST, automatizan procesos críticos con inteligencia artificial y
            fortalecen el cumplimiento normativo en empresas e instituciones.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-9 flex flex-wrap gap-3 justify-center"
          >
            <a
              href="#agendar"
              onClick={() => sfx.click()}
              onMouseEnter={() => sfx.hover()}
              className="btn-primary"
            >
              Agendar demostración
              <ArrowRight size={18} />
            </a>
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              onClick={() => sfx.click()}
              onMouseEnter={() => sfx.hover()}
              className="btn-ghost"
            >
              <MessageCircle size={18} />
              Contactar por WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-brand-100/60"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-accent-emerald" />
              Compatible con Decreto 1072 y Resolución 0312
            </div>
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-accent-cyan" />
              IA generativa integrada
            </div>
          </motion.div>
        </div>

        {/* Bloque inferior: dos cuadros lado a lado con burbujas vibrantes detrás */}
        <div className="relative mt-16">
          {/* Burbujas de gradiente vibrantes */}
          <div className="absolute inset-0 overflow-hidden rounded-[40px] pointer-events-none" aria-hidden="true">
            <span className="blob blob-violet blob-anim-1 w-[420px] h-[420px] -top-20 -left-10" />
            <span className="blob blob-cyan blob-anim-2 w-[380px] h-[380px] top-10 left-1/2 -translate-x-1/2" />
            <span className="blob blob-magenta blob-anim-3 w-[360px] h-[360px] -bottom-16 right-0" />
            <span className="blob blob-blue blob-anim-1 w-[300px] h-[300px] bottom-0 left-1/4" />
          </div>

        <div className="relative grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Especialidades */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-2 mb-3 justify-center lg:justify-start">
              <div className="badge-cyan">
                <Sparkles size={12} />
                Especializados en
              </div>
            </div>
            <div className="grid grid-cols-3 grid-rows-2 gap-4 flex-1 min-h-[420px]">
              <SpecCard icon={HardHat} title="SG-SST" accent="amber" delay={0} />
              <SpecCard icon={TrafficCone} title="Plan Vial" accent="cyan" delay={0.05} />
              <SpecCard
                icon={Network}
                title="Sistemas Integrados"
                accent="brand"
                delay={0.1}
              />
              <SpecCard icon={Users} title="Talento Humano" accent="emerald" delay={0.15} />
              <SpecCard
                icon={GraduationCap}
                title="Capacitaciones"
                accent="violet"
                delay={0.2}
              />
              <SpecCard
                icon={Award}
                title="Certificaciones"
                accent="amber"
                delay={0.25}
              />
            </div>
          </motion.div>

          {/* Tarjeta corporativa con logo + estadísticas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex"
          >
            <div className="relative w-full">
              {/* Resplandor exterior */}
              <div className="absolute -inset-6 bg-gradient-to-tr from-brand-600/25 via-accent-cyan/15 to-accent-violet/20 rounded-[28px] blur-2xl opacity-70" />

              <div className="relative glass-vibrant-strong p-8 rounded-3xl h-full">
                <div className="flex items-center justify-between mb-6">
                  <Logo size={56} showText={false} />
                  <div className="badge-cyan">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse-soft" />
                    Sistema activo
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold mb-1">QUUANTICA</h3>
                <p className="text-sm text-brand-100/60 mb-6">
                  Plataforma de gestión empresarial integral
                </p>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  <Stat label="Sedes" value="5+" accent="cyan" />
                  <Stat label="Cumplimiento" value="92%" accent="brand" />
                  <Stat label="Procesos IA" value="18" accent="violet" />
                </div>

                <div className="space-y-2.5">
                  <ProgressRow label="SG-SST" pct={92} accent="brand" />
                  <ProgressRow label="Documental" pct={88} accent="cyan" />
                  <ProgressRow label="Auditorías" pct={76} accent="violet" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        </div>

        {/* Indicadores inferiores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <BottomStat n="100%" l="Trazabilidad documental" />
          <BottomStat n="24/7" l="Disponibilidad del sistema" />
          <BottomStat n="60+" l="Estándares Res. 0312/2019" />
          <BottomStat n="ISO" l="Buenas prácticas de seguridad" />
        </motion.div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: 'brand' | 'cyan' | 'violet';
}) {
  const color =
    accent === 'brand'
      ? 'text-brand-300'
      : accent === 'cyan'
        ? 'text-accent-cyan'
        : 'text-accent-violet';
  return (
    <div className="rounded-xl bg-ink-900/60 border border-white/[.05] p-3">
      <div className={`font-display text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-brand-100/50 mt-0.5">{label}</div>
    </div>
  );
}

function ProgressRow({
  label,
  pct,
  accent,
}: {
  label: string;
  pct: number;
  accent: 'brand' | 'cyan' | 'violet';
}) {
  const grad =
    accent === 'brand'
      ? 'from-brand-500 to-brand-300'
      : accent === 'cyan'
        ? 'from-accent-cyan to-brand-400'
        : 'from-accent-violet to-brand-400';
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-brand-100/70 font-medium">{label}</span>
        <span className="text-brand-100/90 font-mono">{pct}%</span>
      </div>
      <div className="h-1.5 bg-white/[.06] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.4, delay: 0.6, ease: 'easeOut' }}
          className={`h-full bg-gradient-to-r ${grad}`}
        />
      </div>
    </div>
  );
}

function BottomStat({ n, l }: { n: string; l: string }) {
  return (
    <div className="rounded-xl bg-white/[.025] border border-white/[.05] p-5 backdrop-blur-md">
      <div className="font-display text-3xl font-bold gradient-text-soft">{n}</div>
      <div className="text-xs text-brand-100/55 mt-1">{l}</div>
    </div>
  );
}

function SpecCard({
  icon: Icon,
  title,
  accent,
  delay,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  accent: 'brand' | 'cyan' | 'violet' | 'amber' | 'emerald';
  delay: number;
}) {
  const palette = {
    brand: {
      ring: 'border-brand-500/30 group-hover:border-brand-400/70',
      glow: 'from-brand-600/30 via-brand-500/10 to-transparent',
      icon: 'text-brand-200',
      bgIcon: 'from-brand-600/30 to-brand-500/10 border-brand-500/30 group-hover:from-brand-500/40',
    },
    cyan: {
      ring: 'border-accent-cyan/30 group-hover:border-accent-cyan/70',
      glow: 'from-accent-cyan/30 via-accent-cyan/10 to-transparent',
      icon: 'text-accent-cyan',
      bgIcon:
        'from-accent-cyan/30 to-accent-cyan/5 border-accent-cyan/30 group-hover:from-accent-cyan/40',
    },
    violet: {
      ring: 'border-accent-violet/30 group-hover:border-accent-violet/70',
      glow: 'from-accent-violet/30 via-accent-violet/10 to-transparent',
      icon: 'text-accent-violet',
      bgIcon:
        'from-accent-violet/30 to-accent-violet/5 border-accent-violet/30 group-hover:from-accent-violet/40',
    },
    amber: {
      ring: 'border-amber-400/40 group-hover:border-amber-300/80',
      glow: 'from-amber-400/30 via-amber-400/10 to-transparent',
      icon: 'text-amber-300',
      bgIcon:
        'from-amber-500/30 to-amber-400/5 border-amber-400/40 group-hover:from-amber-400/40',
    },
    emerald: {
      ring: 'border-emerald-400/40 group-hover:border-emerald-300/80',
      glow: 'from-emerald-400/30 via-emerald-400/10 to-transparent',
      icon: 'text-emerald-300',
      bgIcon:
        'from-emerald-500/30 to-emerald-400/5 border-emerald-400/40 group-hover:from-emerald-400/40',
    },
  }[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 + delay, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className={`group relative rounded-2xl glass-vibrant border ${palette.ring} p-5 overflow-hidden transition-colors h-full`}
    >
      {/* Resplandor superior */}
      <div
        className={`pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-gradient-to-b ${palette.glow} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      <div className="relative flex flex-col items-center justify-center text-center gap-3 h-full">
        <div
          className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${palette.bgIcon} border flex items-center justify-center transition-all duration-300 group-hover:scale-110`}
        >
          <Icon size={28} className={palette.icon} />
        </div>
        <h4 className="font-display text-sm md:text-base font-bold tracking-tight text-brand-50 leading-tight">
          {title}
        </h4>
      </div>
    </motion.div>
  );
}
