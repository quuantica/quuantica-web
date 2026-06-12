'use client';

import { motion } from 'framer-motion';
import { Lock, ShieldCheck, ServerCog, Users, Activity, Cloud } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';

const ITEMS = [
  {
    icon: Lock,
    title: 'Protección de datos',
    desc: 'Cifrado AES-256 en reposo y TLS 1.3 en tránsito. Datos sensibles aislados por cliente.',
  },
  {
    icon: ServerCog,
    title: 'Infraestructura segura',
    desc: 'Hosting en proveedores cloud certificados con redundancia geográfica y backups automáticos.',
  },
  {
    icon: Users,
    title: 'Control por roles',
    desc: 'Permisos granulares por usuario: administrador, coordinador, auditor, COPASST, brigadista.',
  },
  {
    icon: Activity,
    title: 'Disponibilidad 99.9%',
    desc: 'Monitoreo 24/7, alertas proactivas y soporte técnico continuo durante el horario empresarial.',
  },
  {
    icon: ShieldCheck,
    title: 'Cumplimiento normativo',
    desc: 'Alineado con Ley 1581/2012 (Habeas Data), Decreto 1377/2013 y buenas prácticas ISO 27001.',
  },
  {
    icon: Cloud,
    title: 'Respaldo de información',
    desc: 'Copias diarias incrementales, retención de 90 días, recuperación granular punto-a-punto.',
  },
];

export default function Seguridad() {
  return (
    <section id="seguridad" className="section-pad relative">
      <div className="container-q">
        <SectionHeading
          eyebrow="Seguridad y confianza"
          title="Diseñado con criterio "
          highlight="institucional."
          subtitle="La información de cumplimiento normativo y datos del personal exige el más alto estándar de seguridad. QUUANTICA aplica controles de nivel empresarial desde la arquitectura."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {ITEMS.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="surface p-7 group transition-all duration-300 hover:border-emerald-400/40"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/25 to-emerald-700/10 border border-emerald-500/30 flex items-center justify-center text-emerald-300 mb-4">
                <it.icon size={22} />
              </div>
              <h3 className="font-display text-lg font-bold tracking-tight mb-2">
                {it.title}
              </h3>
              <p className="text-sm text-brand-100/70 leading-relaxed">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
