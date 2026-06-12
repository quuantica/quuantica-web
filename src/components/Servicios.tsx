'use client';

import { motion } from 'framer-motion';
import {
  ShieldCheck, FileText, Sparkles, Workflow, ClipboardCheck, GraduationCap,
  BarChart3, LayoutDashboard, LineChart, Users,
} from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import { sfx } from '@/lib/sounds';

const SERVICIOS = [
  {
    icon: ShieldCheck,
    title: 'Gestión SG-SST',
    desc: 'Implementación, seguimiento y control del Sistema de Gestión de Seguridad y Salud en el Trabajo bajo Decreto 1072 y Resolución 0312.',
    norma: 'Dec. 1072 · Res. 0312',
    color: 'brand',
  },
  {
    icon: FileText,
    title: 'Gestión documental',
    desc: 'Repositorio centralizado, seguro y trazable. Versionado, firmas, control de acceso por roles y conservación con respaldo.',
    norma: 'Multi-empresa',
    color: 'cyan',
  },
  {
    icon: Sparkles,
    title: 'IA documental',
    desc: 'Generación automática de políticas, planes anuales, matrices, actas y documentos del SG-SST con IA contextualizada.',
    norma: 'IA generativa',
    color: 'violet',
  },
  {
    icon: Workflow,
    title: 'Automatización de procesos',
    desc: 'Flujos lógicos para reuniones, capacitaciones, exámenes médicos, simulacros, auditorías y reportes recurrentes.',
    norma: 'Workflow',
    color: 'brand',
  },
  {
    icon: ClipboardCheck,
    title: 'Auditorías inteligentes',
    desc: 'Asistente IA que analiza documentos cargados, sugiere calificaciones y genera observaciones por estándar auditado.',
    norma: 'Auditoría asistida',
    color: 'cyan',
  },
  {
    icon: GraduationCap,
    title: 'Capacitaciones institucionales',
    desc: 'Plataforma de formación con cursos, evaluaciones, certificación y seguimiento de cumplimiento por trabajador.',
    norma: 'LMS',
    color: 'emerald' as const,
  },
  {
    icon: BarChart3,
    title: 'Reportes inteligentes',
    desc: 'Generación automática de reportes ejecutivos para alta dirección, COPASST, ARL y ente de control.',
    norma: 'Reporting',
    color: 'violet',
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboard empresarial',
    desc: 'Visualización en tiempo real del estado de cumplimiento, vencimientos, indicadores y alertas críticas.',
    norma: 'Tiempo real',
    color: 'brand',
  },
  {
    icon: LineChart,
    title: 'Indicadores y métricas',
    desc: 'KPIs estructura, proceso y resultado del SG-SST. Frecuencia, severidad, mortalidad y eficacia controlados.',
    norma: 'KPIs SST',
    color: 'cyan',
  },
  {
    icon: Users,
    title: 'Gestión multiusuario',
    desc: 'Multi-empresa con aislamiento de datos por cliente. Roles, permisos y panel administrador para el operador.',
    norma: 'Multi-tenant',
    color: 'amber' as const,
  },
];

const COLOR_MAP: Record<string, { ring: string; ico: string; chip: string }> = {
  brand: {
    ring: 'group-hover:border-brand-400/50 group-hover:shadow-glow-brand',
    ico: 'from-brand-600/30 to-brand-500/10 border-brand-500/30 text-brand-200',
    chip: 'bg-brand-500/10 text-brand-200 border-brand-500/30',
  },
  cyan: {
    ring: 'group-hover:border-accent-cyan/50',
    ico: 'from-accent-cyan/30 to-accent-cyan/5 border-accent-cyan/30 text-accent-cyan',
    chip: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30',
  },
  violet: {
    ring: 'group-hover:border-accent-violet/50',
    ico: 'from-accent-violet/30 to-accent-violet/5 border-accent-violet/30 text-accent-violet',
    chip: 'bg-accent-violet/10 text-accent-violet border-accent-violet/30',
  },
  emerald: {
    ring: 'group-hover:border-accent-emerald/50',
    ico: 'from-accent-emerald/30 to-accent-emerald/5 border-accent-emerald/30 text-accent-emerald',
    chip: 'bg-accent-emerald/10 text-accent-emerald border-accent-emerald/30',
  },
  amber: {
    ring: 'group-hover:border-accent-amber/50',
    ico: 'from-accent-amber/30 to-accent-amber/5 border-accent-amber/30 text-accent-amber',
    chip: 'bg-accent-amber/10 text-accent-amber border-accent-amber/30',
  },
};

export default function Servicios() {
  return (
    <section id="servicios" className="section-pad relative">
      <div className="container-q">
        <SectionHeading
          eyebrow="Servicios"
          title="Plataforma integral con "
          highlight="todos los módulos que tu empresa necesita."
          subtitle="Cada módulo está diseñado para integrarse con el resto: la información fluye sin duplicidad, la trazabilidad es completa y el cumplimiento normativo se vuelve operativo."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {SERVICIOS.map((s, i) => {
            const c = COLOR_MAP[s.color];
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 + Math.floor(i / 3) * 0.05 }}
                onMouseEnter={() => sfx.hover()}
                className={`surface p-6 group transition-all duration-300 hover:-translate-y-1 ${c.ring}`}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.ico} border flex items-center justify-center mb-5`}
                >
                  <s.icon size={22} />
                </div>
                <h3 className="font-display text-lg font-bold tracking-tight mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-brand-100/70 leading-relaxed mb-4">{s.desc}</p>
                <div className={`badge ${c.chip}`}>{s.norma}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
