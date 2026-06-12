'use client';

import { motion } from 'framer-motion';
import { Sparkles, FileText, Search, Bot, Zap, BarChart3 } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import ParticleNetwork from './ParticleNetwork';

const CAPACIDADES = [
  {
    icon: FileText,
    title: 'Generación automática de documentos',
    desc: 'Políticas SST, planes anuales, matrices de peligros, actas y procedimientos redactados con base normativa colombiana actualizada.',
  },
  {
    icon: Search,
    title: 'Análisis normativo inteligente',
    desc: 'La IA identifica brechas entre tus documentos y la Resolución 0312/2019, Decreto 1072/2015 y normativa derivada.',
  },
  {
    icon: Bot,
    title: 'Asistente conversacional empresarial',
    desc: 'Pregunta por requisitos, plazos, formatos. La IA responde con cita textual de la norma aplicable.',
  },
  {
    icon: Zap,
    title: 'Automatización documental',
    desc: 'OCR, extracción de campos, clasificación, vencimientos detectados automáticamente y alertas predictivas.',
  },
  {
    icon: BarChart3,
    title: 'Optimización de procesos',
    desc: 'Análisis de eficiencia operativa: tiempos, cuellos de botella, riesgos recurrentes, recomendaciones.',
  },
  {
    icon: Sparkles,
    title: 'Reducción de tiempos',
    desc: 'Lo que toma semanas con consultoría tradicional, en QUUANTICA se gestiona en minutos con IA contextual.',
  },
];

export default function InteligenciaArtificial() {
  return (
    <section id="ia" className="section-pad relative overflow-hidden">
      {/* Red neuronal de partículas (encaja con la temática IA) */}
      <ParticleNetwork intensity="vibrant" palette="ia" />
      {/* Glow lateral */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-accent-violet/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-accent-cyan/10 blur-3xl pointer-events-none" />

      <div className="container-q relative">
        <SectionHeading
          eyebrow="Inteligencia artificial aplicada"
          title="IA empresarial, "
          highlight="con criterio normativo."
          subtitle="No usamos IA por moda. La integramos donde realmente acelera procesos críticos: redacción técnica, verificación de cumplimiento, análisis documental masivo y soporte experto 24/7."
        />

        <div className="grid lg:grid-cols-12 gap-10 mt-14">
          {/* Capacidades */}
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-4">
              {CAPACIDADES.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: (i % 2) * 0.08 + Math.floor(i / 2) * 0.05 }}
                  className="surface p-5 group transition-all duration-300 hover:border-accent-violet/40 hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-violet/30 to-accent-violet/5 border border-accent-violet/30 flex items-center justify-center text-accent-violet mb-3">
                    <c.icon size={18} />
                  </div>
                  <h3 className="font-display text-base font-bold tracking-tight mb-1.5">
                    {c.title}
                  </h3>
                  <p className="text-[13px] text-brand-100/65 leading-relaxed">{c.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mockup chat IA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-accent-violet/25 via-brand-500/15 to-accent-cyan/20 rounded-3xl blur-2xl" />
              <div className="relative surface-strong rounded-3xl p-6">
                <div className="flex items-center gap-3 pb-4 border-b border-white/[.06]">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-violet to-brand-500 flex items-center justify-center">
                    <Sparkles size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="font-display font-bold">Asistente QUUANTICA AI</div>
                    <div className="text-xs text-brand-100/55">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse-soft" />
                      En línea · Modelo normativo Colombia 2026
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mt-4">
                  <ChatMsg
                    side="user"
                    text="Genera la política SG-SST para una constructora de 85 trabajadores en riesgo V."
                  />
                  <ChatMsg
                    side="ai"
                    text="Generando política SG-SST conforme Decreto 1072/2015 Art. 2.2.4.6.5 y Res. 0312/2019. Incluyendo: alcance, compromiso de la alta dirección, recursos asignados, marco normativo aplicable a riesgo V (construcción)…"
                  />
                  <ChatMsg
                    side="user"
                    text="¿Cuándo vence la vigencia del COPASST?"
                  />
                  <ChatMsg
                    side="ai"
                    text="Según Res. 2013/1986: 2 años. La empresa debe convocar nueva elección antes del vencimiento. ¿Quieres que programe el recordatorio en el calendario?"
                  />
                </div>

                <div className="mt-5 flex items-center gap-2 px-4 py-3 rounded-xl bg-ink-900/80 border border-white/[.05]">
                  <input
                    aria-label="Pregunta a la IA"
                    placeholder="Pregunta por requisitos, plazos, formatos…"
                    className="flex-1 bg-transparent text-sm placeholder:text-brand-100/35 focus:outline-none"
                  />
                  <button className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-accent-violet to-brand-500 text-white text-xs font-bold">
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ChatMsg({ side, text }: { side: 'user' | 'ai'; text: string }) {
  const isUser = side === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${
          isUser
            ? 'bg-brand-500/20 border border-brand-400/30 text-white rounded-br-md'
            : 'bg-ink-900/80 border border-white/[.06] text-brand-100/85 rounded-bl-md'
        }`}
      >
        {text}
      </div>
    </motion.div>
  );
}
