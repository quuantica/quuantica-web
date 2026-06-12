'use client';

import { motion } from 'framer-motion';
import {
  CheckCircle2, AlertCircle, Clock, Calendar, FileSearch, ShieldCheck,
  Users, FileText, Building2, Activity, GraduationCap, BookCheck,
} from 'lucide-react';
import SectionHeading from './ui/SectionHeading';

export default function PlataformaDemo() {
  return (
    <section id="plataforma" className="section-pad relative">
      <div className="container-q">
        <SectionHeading
          eyebrow="Plataforma tecnológica"
          align="center"
          title="Software empresarial real, "
          highlight="no maquetas."
          subtitle="Una vista del panel administrador de QUUANTICA: información viva, indicadores precisos y operación centralizada para entidades con múltiples sedes y comités."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mt-14 relative"
        >
          {/* Glow detrás del mockup */}
          <div className="absolute -inset-4 bg-gradient-to-r from-brand-600/20 via-accent-cyan/15 to-accent-violet/20 rounded-[28px] blur-2xl opacity-60" />

          <div className="relative rounded-3xl overflow-hidden border border-white/[.08] bg-ink-950 shadow-soft">
            {/* Topbar fake browser */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-ink-900 border-b border-white/[.06]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              </div>
              <div className="ml-3 flex-1 max-w-md">
                <div className="bg-ink-850/80 border border-white/[.05] rounded-md px-3 py-1 text-[11px] text-brand-100/50 font-mono">
                  app.quuantica.com/dashboard
                </div>
              </div>
              <div className="text-[10px] text-brand-100/40 font-mono">SaaS · v2.4</div>
            </div>

            <div className="grid grid-cols-12 min-h-[640px]">
              {/* Sidebar */}
              <aside className="hidden md:flex col-span-3 lg:col-span-2 flex-col bg-ink-900 border-r border-white/[.05] p-4">
                <div className="text-[10px] uppercase tracking-widest text-brand-100/40 mb-3 mt-1">
                  Principal
                </div>
                <SidebarItem icon={Activity} label="Dashboard" active />
                <SidebarItem icon={Building2} label="Mis empresas" badge="5" />
                <div className="text-[10px] uppercase tracking-widest text-brand-100/40 mt-5 mb-3">
                  Mi empresa
                </div>
                <SidebarItem icon={ShieldCheck} label="SG-SST" />
                <SidebarItem icon={Calendar} label="Calendario" />
                <SidebarItem icon={FileText} label="Documentos" />
                <SidebarItem icon={BookCheck} label="Auditorías" />
                <SidebarItem icon={GraduationCap} label="Capacitación" />
                <div className="text-[10px] uppercase tracking-widest text-brand-100/40 mt-5 mb-3">
                  Admin
                </div>
                <SidebarItem icon={Users} label="Usuarios" badge="42" />
                <SidebarItem icon={FileSearch} label="Reportes" />
              </aside>

              {/* Main */}
              <div className="col-span-12 md:col-span-9 lg:col-span-10 p-6 lg:p-8 bg-ink-950">
                {/* Cabecera empresa */}
                <div className="rounded-2xl bg-gradient-to-r from-brand-700 to-brand-500 p-5 lg:p-6 mb-6 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
                  <div className="relative flex items-center gap-4 flex-wrap">
                    <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center text-2xl">🏢</div>
                    <div className="flex-1">
                      <div className="font-display text-xl lg:text-2xl font-bold">
                        Constructora Andina S.A.S
                      </div>
                      <div className="text-xs lg:text-sm text-brand-100/85 mt-0.5">
                        NIT 901.234.567-8 · Bogotá · 85 trabajadores · 60 estándares
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-3xl lg:text-4xl font-bold">62%</div>
                      <div className="text-[10px] uppercase tracking-widest text-brand-100/85">
                        Avance SG-SST
                      </div>
                    </div>
                  </div>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  <KPI ico="📊" v="62%" l="Cumplimiento" t="brand" />
                  <KPI ico="📅" v="58/142" l="Eventos cumplidos" t="emerald" />
                  <KPI ico="⚠️" v="12" l="Vencidos" t="rose" />
                  <KPI ico="🎯" v="8" l="Próximos 7 días" t="amber" />
                </div>

                {/* Semáforo */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <SemBlock icon={AlertCircle} num={12} label="VENCIDOS" tone="rose" cta="Ver →" />
                  <SemBlock icon={Clock} num={8} label="PRÓXIMOS (3 días)" tone="amber" cta="Ver →" />
                  <SemBlock icon={CheckCircle2} num={28} label="CUMPLIDOS este mes" tone="emerald" cta="Ver →" />
                </div>

                {/* Hoy / Próximos */}
                <div className="grid lg:grid-cols-2 gap-5">
                  <Panel
                    title="HOY · 06 de mayo de 2026"
                    rows={[
                      { color: '#7E57C2', t: 'Reunión COPASST mensual', m: 'Mensual · Dec.1072 Art.2.2.4.6.8' },
                      { color: '#42A5F5', t: 'Capacitación riesgo psicosocial', m: 'Anual · Res.2646/2008' },
                      { color: '#66BB6A', t: 'Inspección extintores', m: 'Mensual · NTC 2885' },
                    ]}
                  />
                  <Panel
                    title="PRÓXIMOS 3 DÍAS — ⚠️ Alerta"
                    rows={[
                      { color: '#FF7043', t: 'Simulacro de evacuación interno', m: '09 may · Dec.1072 Art.2.2.4.6.25' },
                      { color: '#26A69A', t: 'EMO periódicos · 85 trabajadores', m: '10 may · Res.2346/2007' },
                      { color: '#EC407A', t: 'Comité de Convivencia · Q1', m: '11 may · Res.3461/2025' },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pie informativo */}
        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          <Pie
            ico="🏢"
            t="Multi-empresa real"
            d="Aislamiento de datos por cliente, panel admin con vista global, control fino por roles."
          />
          <Pie
            ico="📅"
            t="Calendario inteligente"
            d="Eventos generados desde IA, semáforo automático, alertas por proximidad y vencimiento."
          />
          <Pie
            ico="📋"
            t="Documentos vivos"
            d="Cada documento con estado, vigencia, responsable, evidencia y firma electrónica."
          />
        </div>
      </div>
    </section>
  );
}

function SidebarItem({
  icon: Icon,
  label,
  active,
  badge,
}: {
  icon: any;
  label: string;
  active?: boolean;
  badge?: string;
}) {
  return (
    <div
      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium mb-0.5 transition-colors ${
        active
          ? 'bg-brand-500/15 text-brand-200 border border-brand-500/30'
          : 'text-brand-100/65 hover:bg-white/[.04]'
      }`}
    >
      <Icon size={14} />
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-200">
          {badge}
        </span>
      )}
    </div>
  );
}

function KPI({
  ico,
  v,
  l,
  t,
}: {
  ico: string;
  v: string;
  l: string;
  t: 'brand' | 'emerald' | 'rose' | 'amber';
}) {
  const map = {
    brand: 'text-brand-300',
    emerald: 'text-emerald-300',
    rose: 'text-rose-300',
    amber: 'text-amber-300',
  };
  return (
    <div className="rounded-xl bg-ink-900/80 border border-white/[.05] p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] uppercase tracking-wider text-brand-100/55 font-medium">
          {l}
        </span>
        <span className="text-base">{ico}</span>
      </div>
      <div className={`font-display text-2xl font-bold ${map[t]}`}>{v}</div>
    </div>
  );
}

function SemBlock({
  icon: Icon,
  num,
  label,
  tone,
  cta,
}: {
  icon: any;
  num: number;
  label: string;
  tone: 'rose' | 'amber' | 'emerald';
  cta: string;
}) {
  const map = {
    rose: { border: 'border-rose-500/30', text: 'text-rose-300', bg: 'bg-rose-500/8' },
    amber: { border: 'border-amber-500/30', text: 'text-amber-300', bg: 'bg-amber-500/8' },
    emerald: {
      border: 'border-emerald-500/30',
      text: 'text-emerald-300',
      bg: 'bg-emerald-500/8',
    },
  };
  const m = map[tone];
  return (
    <div className={`rounded-xl border ${m.border} ${m.bg} p-4 backdrop-blur-md`}>
      <div className="flex items-start gap-3">
        <Icon size={20} className={m.text} />
        <div className="flex-1">
          <div className={`font-display text-2xl font-bold ${m.text}`}>{num}</div>
          <div className="text-[10px] uppercase tracking-wider text-brand-100/60 font-medium">
            {label}
          </div>
          <div className={`text-[10px] mt-1 ${m.text} font-semibold`}>{cta}</div>
        </div>
      </div>
    </div>
  );
}

function Panel({
  title,
  rows,
}: {
  title: string;
  rows: { color: string; t: string; m: string }[];
}) {
  return (
    <div className="rounded-xl bg-ink-900/60 border border-white/[.05] p-5">
      <div className="text-xs uppercase tracking-widest text-brand-100/55 font-bold mb-3">
        {title}
      </div>
      <div className="space-y-2">
        {rows.map((r, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[.025] border border-white/[.03]"
            style={{ borderLeft: `3px solid ${r.color}` }}
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: r.color }} />
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-medium text-white truncate">{r.t}</div>
              <div className="text-[10px] text-brand-100/50 mt-0.5">{r.m}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Pie({ ico, t, d }: { ico: string; t: string; d: string }) {
  return (
    <div className="surface p-5">
      <div className="text-2xl mb-2">{ico}</div>
      <div className="font-display text-base font-bold mb-1">{t}</div>
      <div className="text-xs text-brand-100/65 leading-relaxed">{d}</div>
    </div>
  );
}
