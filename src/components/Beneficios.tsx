'use client';

import { motion } from 'framer-motion';
import { Zap, GitBranch, Lock, BookCheck, Clock, Database, BarChart, CheckCircle2 } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';

type Accent = 'brand' | 'cyan' | 'amber' | 'emerald';

const BENEFICIOS: { icon: any; t: string; d: string; accent: Accent }[] = [
  { icon: Zap, t: 'Eficiencia operativa', d: 'Automatización elimina tareas repetitivas y libera al equipo para lo estratégico.', accent: 'amber' },
  { icon: GitBranch, t: 'Trazabilidad completa', d: 'Cada acción queda registrada con usuario, fecha, contexto y evidencia.', accent: 'brand' },
  { icon: Lock, t: 'Seguridad de la información', d: 'Cifrado en tránsito y en reposo, control por roles, logs de auditoría.', accent: 'emerald' },
  { icon: BookCheck, t: 'Cumplimiento normativo', d: 'Decreto 1072, Res. 0312, normativa derivada y actualización continua.', accent: 'cyan' },
  { icon: Clock, t: 'Ahorro de tiempo', d: 'Generación documental con IA: lo que tomaba semanas, ahora en minutos.', accent: 'amber' },
  { icon: Database, t: 'Centralización de información', d: 'Toda la operación SG-SST en una sola plataforma, sin silos ni hojas de cálculo.', accent: 'brand' },
  { icon: BarChart, t: 'Decisiones basadas en datos', d: 'KPIs en tiempo real para alta dirección, COPASST y áreas de operación.', accent: 'cyan' },
  { icon: CheckCircle2, t: 'Listo para auditoría', d: 'Reportes generados automáticamente, evidencia consolidada, soporte normativo claro.', accent: 'emerald' },
];

const ACCENT_PALETTE: Record<Accent, { bg: string; icon: string }> = {
  brand:   { bg: 'from-brand-600/30 to-brand-500/5 border-brand-500/30',           icon: 'text-brand-200' },
  cyan:    { bg: 'from-accent-cyan/30 to-accent-cyan/5 border-accent-cyan/30',     icon: 'text-accent-cyan' },
  amber:   { bg: 'from-amber-500/30 to-amber-400/5 border-amber-400/40',           icon: 'text-amber-300' },
  emerald: { bg: 'from-emerald-500/30 to-emerald-400/5 border-emerald-400/40',     icon: 'text-emerald-300' },
};

export default function Beneficios() {
  return (
    <section id="beneficios" className="section-pad relative">
      <div className="container-q">
        <SectionHeading
          eyebrow="Beneficios"
          title="Resultados medibles "
          highlight="desde el primer mes."
          subtitle="QUUANTICA no vende promesas: cuantifica el impacto. Cada cliente recibe un tablero de retorno operativo donde puede ver el tiempo ahorrado, los procesos automatizados y el avance del cumplimiento."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
          {BENEFICIOS.map((b, i) => {
            const pal = ACCENT_PALETTE[b.accent];
            return (
            <motion.div
              key={b.t}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
              className="surface p-5 group transition-all duration-300 hover:border-brand-400/40 hover:-translate-y-1"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${pal.bg} border flex items-center justify-center ${pal.icon} mb-3`}>
                <b.icon size={18} />
              </div>
              <h3 className="font-display text-sm font-bold tracking-tight mb-1.5">{b.t}</h3>
              <p className="text-xs text-brand-100/65 leading-relaxed">{b.d}</p>
            </motion.div>
            );
          })}
        </div>

        {/* Cifras de impacto */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <Big n="-72%" l="Tiempo en gestión documental" />
          <Big n="+340%" l="Velocidad en respuesta a auditorías" />
          <Big n="100%" l="Cumplimiento de plazos críticos" />
          <Big n="0" l="Errores por duplicidad de información" />
        </motion.div>
      </div>
    </section>
  );
}

function Big({ n, l }: { n: string; l: string }) {
  return (
    <div className="rounded-2xl border border-brand-500/25 bg-gradient-to-br from-brand-700/15 to-brand-900/10 p-6 backdrop-blur-md">
      <div className="font-display text-3xl md:text-4xl font-bold gradient-text">{n}</div>
      <div className="text-xs text-brand-100/65 mt-2 leading-relaxed">{l}</div>
    </div>
  );
}
