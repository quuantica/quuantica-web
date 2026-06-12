'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ClipboardList,
  Users,
  GraduationCap,
  HeartPulse,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  Sparkles,
  FolderTree,
  ListChecks,
  Database,
  type LucideIcon,
} from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import { sfx } from '@/lib/sounds';

interface DestacadoFeature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface Destacado {
  badge: string;
  title: string;
  description: string;
  features: DestacadoFeature[];
}

type CategoriaAccent = 'brand' | 'cyan' | 'violet' | 'emerald' | 'rose' | 'amber';

interface Categoria {
  id: string;
  label: string;
  icon: LucideIcon;
  accent: CategoriaAccent;
  items: string[];
  destacado?: Destacado;
}

const CATEGORIAS: Categoria[] = [
  {
    id: 'estructura',
    label: 'Estructura SG-SST',
    icon: ClipboardList,
    accent: 'brand',
    items: [
      'Política y objetivos SST',
      'Autoevaluación SG-SST',
      'Plan anual de trabajo',
      'Asignación de recursos',
      'Matriz legal',
      'Información documentada',
      'Roles y responsabilidades',
      'Implementación de estándares mínimos (7, 21 y 60)',
      'Estructura documental por estándar',
      'Guía interactiva paso a paso',
    ],
    destacado: {
      badge: 'Asistencia con IA',
      title: 'Implementación guiada de estándares mínimos',
      description:
        'QUUANTICA acompaña a tu organización en la implementación completa de los estándares mínimos del SG-SST según la Resolución 0312 de 2019 (7, 21 o 60 estándares según el nivel de riesgo). El asistente con IA construye la estructura documental, genera plantillas y resguarda cada evidencia.',
      features: [
        {
          icon: ListChecks,
          title: 'Aplica los 7, 21 o 60 estándares',
          desc: 'Configuración automática según número de trabajadores y nivel de riesgo de la empresa.',
        },
        {
          icon: FolderTree,
          title: 'Estructura documental por estándar',
          desc: 'Carpetas, plantillas y formatos pre-organizados para cada uno de los estándares aplicables.',
        },
        {
          icon: Sparkles,
          title: 'Asistente IA paso a paso',
          desc: 'IA generativa que redacta políticas, sugiere acciones y valida el cumplimiento en tiempo real.',
        },
        {
          icon: Database,
          title: 'Trazabilidad y resguardo',
          desc: 'Cada evidencia queda almacenada con responsable, fecha y vigencia para auditorías futuras.',
        },
      ],
    },
  },
  {
    id: 'comites',
    label: 'Comités y emergencias',
    icon: Users,
    accent: 'cyan',
    items: [
      'COPASST',
      'Comité de convivencia',
      'Comité de seguridad vial',
      'Brigada de emergencia',
      'Equipos de emergencia',
    ],
  },
  {
    id: 'talento',
    label: 'Talento humano',
    icon: GraduationCap,
    accent: 'violet',
    items: [
      'Programa de capacitación',
      'Perfil sociodemográfico',
      'Profesiograma',
      'Gestión EPP y dotaciones',
    ],
  },
  {
    id: 'salud',
    label: 'Salud ocupacional',
    icon: HeartPulse,
    accent: 'emerald',
    items: [
      'Accidentes e incidentes de trabajo',
      'Seguimiento de casos médicos',
      'Ausentismos',
    ],
  },
  {
    id: 'riesgos',
    label: 'Riesgos e inspecciones',
    icon: AlertTriangle,
    accent: 'amber',
    items: [
      'Matriz IVER',
      'Reporte de actos y condiciones inseguras',
      'Inspecciones',
    ],
  },
  {
    id: 'mejora',
    label: 'Mejora continua',
    icon: RefreshCw,
    accent: 'rose',
    items: [
      'Auditoría',
      'Revisión por la alta dirección',
      'Indicadores de gestión',
      'Planes de acción ACPM',
      'Gestión del cambio',
    ],
  },
];

const palettes = {
  brand: {
    text: 'text-brand-300',
    bg: 'bg-brand-500/15',
    border: 'border-brand-500/30',
    activeBg: 'bg-brand-500/20',
    activeBorder: 'border-brand-400',
    glow: 'from-brand-600/20 via-brand-500/5 to-transparent',
  },
  cyan: {
    text: 'text-accent-cyan',
    bg: 'bg-accent-cyan/15',
    border: 'border-accent-cyan/30',
    activeBg: 'bg-accent-cyan/20',
    activeBorder: 'border-accent-cyan',
    glow: 'from-accent-cyan/20 via-accent-cyan/5 to-transparent',
  },
  violet: {
    text: 'text-accent-violet',
    bg: 'bg-accent-violet/15',
    border: 'border-accent-violet/30',
    activeBg: 'bg-accent-violet/20',
    activeBorder: 'border-accent-violet',
    glow: 'from-accent-violet/20 via-accent-violet/5 to-transparent',
  },
  emerald: {
    text: 'text-emerald-300',
    bg: 'bg-emerald-500/15',
    border: 'border-emerald-500/30',
    activeBg: 'bg-emerald-500/20',
    activeBorder: 'border-emerald-400',
    glow: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
  },
  amber: {
    text: 'text-amber-300',
    bg: 'bg-amber-500/15',
    border: 'border-amber-500/30',
    activeBg: 'bg-amber-500/20',
    activeBorder: 'border-amber-400',
    glow: 'from-amber-500/20 via-amber-500/5 to-transparent',
  },
  rose: {
    text: 'text-rose-300',
    bg: 'bg-rose-500/15',
    border: 'border-rose-500/30',
    activeBg: 'bg-rose-500/20',
    activeBorder: 'border-rose-400',
    glow: 'from-rose-500/20 via-rose-500/5 to-transparent',
  },
} as const;

export default function Funciones() {
  const [activa, setActiva] = useState<string>(CATEGORIAS[0].id);
  const cat = CATEGORIAS.find((c) => c.id === activa) ?? CATEGORIAS[0];
  const p = palettes[cat.accent];

  const totalItems = CATEGORIAS.reduce((acc, c) => acc + c.items.length, 0);

  return (
    <section id="funciones" className="section-pad relative overflow-hidden">
      {/* Burbujas vibrantes de fondo */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <span className="blob blob-violet blob-anim-1 w-[500px] h-[500px] top-1/3 -left-20" />
        <span className="blob blob-cyan blob-anim-2 w-[450px] h-[450px] top-1/2 right-0 opacity-40" />
        <span className="blob blob-magenta blob-anim-3 w-[380px] h-[380px] bottom-10 left-1/2 -translate-x-1/2 opacity-35" />
      </div>

      <div className="container-q relative">
        <SectionHeading
          eyebrow="Funciones de la plataforma"
          align="center"
          title="Conoce algunas de las funciones "
          highlight="que puedes encontrar."
          subtitle={`Más de ${totalItems} módulos integrados para gestionar todo el sistema SG-SST de tu organización en un solo lugar, con seguimiento y alertas automáticas.`}
        />

        <div className="mt-14 grid lg:grid-cols-12 gap-6">
          {/* Tabs / Categorías (lado izquierdo en desktop) */}
          <div className="lg:col-span-4">
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
              {CATEGORIAS.map((c) => {
                const isActive = c.id === activa;
                const cp = palettes[c.accent];
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      sfx.click();
                      setActiva(c.id);
                    }}
                    onMouseEnter={() => sfx.hover()}
                    className={`group relative flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all whitespace-nowrap lg:whitespace-normal text-left glass-vibrant ${
                      isActive
                        ? `${cp.activeBg} ${cp.activeBorder} shadow-lg`
                        : 'hover:bg-white/[.08] hover:border-white/[.18]'
                    }`}
                  >
                    <div
                      className={`shrink-0 w-9 h-9 rounded-lg border flex items-center justify-center transition-colors ${
                        isActive
                          ? `${cp.bg} ${cp.border} ${cp.text}`
                          : 'bg-white/[.04] border-white/[.06] text-brand-100/55 group-hover:text-brand-100'
                      }`}
                    >
                      <c.icon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className={`font-display text-sm font-bold tracking-tight ${
                          isActive ? 'text-white' : 'text-brand-100/85'
                        }`}
                      >
                        {c.label}
                      </div>
                      <div className="text-[10px] text-brand-100/50 mt-0.5">
                        {c.items.length} módulos
                      </div>
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="active-dot"
                        className={`w-1.5 h-1.5 rounded-full ${cp.text.replace('text-', 'bg-')}`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Panel de items (lado derecho) */}
          <div className="lg:col-span-8">
            <div
              className={`relative rounded-3xl glass-vibrant-strong overflow-hidden ${p.border}`}
            >
              {/* Resplandor superior */}
              <div
                className={`pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-b ${p.glow} blur-3xl opacity-60`}
              />

              <div className="relative p-6 lg:p-8">
                {/* Header de categoría */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/[.06]">
                  <div
                    className={`w-14 h-14 rounded-2xl ${p.bg} ${p.border} border flex items-center justify-center ${p.text}`}
                  >
                    <cat.icon size={26} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight">
                      {cat.label}
                    </h3>
                    <p className="text-xs text-brand-100/55 mt-0.5">
                      {cat.items.length} módulos disponibles en QUUANTICA
                    </p>
                  </div>
                </div>

                {/* Items */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="grid sm:grid-cols-2 gap-2.5"
                  >
                    {cat.items.map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: i * 0.04 }}
                        className="group flex items-center gap-3 p-3 rounded-xl bg-white/[.03] border border-white/[.05] hover:bg-white/[.06] hover:border-white/[.12] transition-all"
                      >
                        <CheckCircle2
                          size={16}
                          className={`${p.text} shrink-0 transition-transform group-hover:scale-110`}
                        />
                        <span className="text-sm text-brand-100/85 font-medium leading-snug">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Bloque destacado (cuando existe) */}
                <AnimatePresence mode="wait">
                  {cat.destacado && (
                    <motion.div
                      key={`dest-${cat.id}`}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className={`mt-6 relative overflow-hidden rounded-2xl border ${p.border} bg-gradient-to-br from-ink-900/80 via-ink-900/60 to-ink-900/40 p-5 lg:p-6`}
                    >
                      {/* Resplandor interno */}
                      <div
                        className={`pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-b ${p.glow} blur-3xl opacity-60`}
                      />

                      <div className="relative">
                        <div
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${p.bg} ${p.border} border ${p.text} text-[10px] uppercase tracking-wider font-semibold mb-3`}
                        >
                          <Sparkles size={11} />
                          {cat.destacado.badge}
                        </div>
                        <h4 className="font-display text-lg md:text-xl font-bold tracking-tight mb-2">
                          {cat.destacado.title}
                        </h4>
                        <p className="text-sm text-brand-100/65 leading-relaxed mb-5 max-w-2xl">
                          {cat.destacado.description}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-3">
                          {cat.destacado.features.map((f, i) => (
                            <motion.div
                              key={f.title}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                              className="flex items-start gap-3 p-3 rounded-xl bg-white/[.03] border border-white/[.06]"
                            >
                              <div
                                className={`shrink-0 w-9 h-9 rounded-lg ${p.bg} ${p.border} border flex items-center justify-center ${p.text}`}
                              >
                                <f.icon size={16} />
                              </div>
                              <div className="min-w-0">
                                <div className="font-display text-sm font-bold text-white leading-tight mb-0.5">
                                  {f.title}
                                </div>
                                <div className="text-[11px] text-brand-100/60 leading-snug">
                                  {f.desc}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Pie informativo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-brand-100/55 max-w-2xl mx-auto">
            Todos los módulos están integrados en una sola plataforma, con seguimiento
            automático, alertas por vencimiento y trazabilidad documental completa.
          </p>
          <a
            href="#agendar"
            onClick={() => sfx.click()}
            onMouseEnter={() => sfx.hover()}
            className="btn-primary mt-6 inline-flex"
          >
            Agendar demostración
          </a>
        </motion.div>
      </div>
    </section>
  );
}
