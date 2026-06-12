'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Calendar as CalendarIcon,
  Mail,
  MessageCircle,
  Phone,
  Building2,
  User,
  ChevronLeft,
  ChevronRight,
  Clock,
  ArrowLeft,
  ArrowRight,
  Sun,
  Sunset,
} from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import ParticleNetwork from './ParticleNetwork';
import { sfx } from '@/lib/sounds';
import { QUUANTICA } from '@/lib/config';

// ───────────────────────────────────────────────────────────────────
// Constantes
// ───────────────────────────────────────────────────────────────────

// Festivos Colombia 2026 — 2027 (ISO YYYY-MM-DD)
const FESTIVOS = new Set<string>([
  // 2026
  '2026-01-01', '2026-01-12', '2026-03-23', '2026-04-02', '2026-04-03',
  '2026-05-01', '2026-05-18', '2026-06-08', '2026-06-15', '2026-06-29',
  '2026-07-20', '2026-08-07', '2026-08-17', '2026-10-12', '2026-11-02',
  '2026-11-16', '2026-12-08', '2026-12-25',
  // 2027
  '2027-01-01', '2027-01-11', '2027-03-22', '2027-03-25', '2027-03-26',
  '2027-05-01', '2027-05-10', '2027-05-31', '2027-06-07', '2027-07-05',
  '2027-07-20', '2027-08-07', '2027-08-16', '2027-10-18', '2027-11-01',
  '2027-11-15', '2027-12-08', '2027-12-25',
]);

const HORAS_MANANA = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'];
const HORAS_TARDE = ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];

const DIAS_CORTOS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const DIAS_LARGOS = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo',
];
const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

const RANGO_DIAS = 30; // hasta cuántos días en adelante puede agendar

// ───────────────────────────────────────────────────────────────────
// Helpers de fecha
// ───────────────────────────────────────────────────────────────────

function fmtIso(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}

function parseIso(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function dowMonday(d: Date): number {
  // Lunes = 0, ..., Domingo = 6
  return (d.getDay() + 6) % 7;
}

function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function startOfWeek(d: Date): Date {
  return addDays(d, -dowMonday(d));
}

function isHoliday(d: Date): boolean {
  return FESTIVOS.has(fmtIso(d));
}

function isWeekend(d: Date): boolean {
  const w = dowMonday(d);
  return w >= 5; // sábado=5, domingo=6
}

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDateLong(iso: string): string {
  if (!iso) return '';
  const date = parseIso(iso);
  const dn = DIAS_LARGOS[dowMonday(date)];
  return `${dn} ${date.getDate()} de ${MESES[date.getMonth()]}, ${date.getFullYear()}`;
}

// ───────────────────────────────────────────────────────────────────
// Componente principal
// ───────────────────────────────────────────────────────────────────

interface FormState {
  nombre: string;
  empresa: string;
  cargo: string;
  correo: string;
  whatsapp: string;
  fecha: string;
  hora: string;
  comentarios: string;
}

const FORM_VACIO: FormState = {
  nombre: '',
  empresa: '',
  cargo: '',
  correo: '',
  whatsapp: '',
  fecha: '',
  hora: '',
  comentarios: '',
};

export default function AgendarDemo() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [view, setView] = useState<'mes' | 'semana'>('mes');
  const [form, setForm] = useState<FormState>(FORM_VACIO);
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const minDate = useMemo(() => addDays(today, 1), [today]);
  const maxDate = useMemo(() => addDays(today, RANGO_DIAS), [today]);

  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(today));
  const [visibleWeekStart, setVisibleWeekStart] = useState(() =>
    startOfWeek(today),
  );

  const onChange = (k: keyof FormState, v: string) =>
    setForm((s) => ({ ...s, [k]: v }));

  // Validación paso 1 (datos)
  const validarDatos = () => {
    if (!form.nombre.trim()) return 'Tu nombre es obligatorio.';
    if (!form.empresa.trim()) return 'La empresa es obligatoria.';
    if (!form.correo.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo))
      return 'Correo inválido.';
    return null;
  };

  // Continuar al paso 2
  const irACalendario = () => {
    setError(null);
    const err = validarDatos();
    if (err) {
      setError(err);
      return;
    }
    sfx.click();
    setStep(2);
    // Scroll suave
    setTimeout(() => {
      document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  // Confirmar reserva
  const confirmarAgenda = async () => {
    setError(null);
    if (!form.fecha) return setError('Selecciona una fecha.');
    if (!form.hora) return setError('Selecciona una hora.');
    setEnviando(true);
    sfx.click();
    await new Promise((r) => setTimeout(r, 900));
    sfx.success();
    setEnviando(false);
    setStep(3);
  };

  const enviarPorWhatsapp = () => {
    const txt =
      `Hola QUUANTICA, quiero agendar una demostración:\n\n` +
      `Nombre: ${form.nombre}\nEmpresa: ${form.empresa}\nCargo: ${form.cargo || '—'}\n` +
      `Correo: ${form.correo}\nWhatsApp: ${form.whatsapp || '—'}\n` +
      `Fecha: ${formatDateLong(form.fecha)}\nHora: ${form.hora}\n\n` +
      `Comentarios: ${form.comentarios || '—'}`;
    const url = `https://wa.me/${QUUANTICA.contact.whatsapp}?text=${encodeURIComponent(txt)}`;
    window.open(url, '_blank');
  };

  const reiniciar = () => {
    setForm(FORM_VACIO);
    setStep(1);
    setError(null);
  };

  // Estado de un día en el calendario
  const estadoDia = (d: Date) => {
    const iso = fmtIso(d);
    if (d < minDate) return 'pasado';
    if (d > maxDate) return 'fuera';
    if (isWeekend(d)) return 'finde';
    if (isHoliday(d)) return 'festivo';
    return 'disponible';
  };

  // ──────────────────────────────────────────────────────────────
  return (
    <section id="agendar" className="section-pad relative overflow-hidden">
      {/* Red de partículas sutil */}
      <ParticleNetwork intensity="subtle" palette="corporate" />
      {/* Burbujas vibrantes de fondo */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <span className="blob blob-blue blob-anim-1 w-[500px] h-[500px] top-1/4 -left-20" />
        <span className="blob blob-violet blob-anim-2 w-[420px] h-[420px] top-1/2 right-0 opacity-50" />
        <span className="blob blob-cyan blob-anim-3 w-[380px] h-[380px] -bottom-16 left-1/3 opacity-45" />
      </div>

      <div className="container-q relative">
        <SectionHeading
          eyebrow="Agenda una demostración"
          align="center"
          title="Conoce QUUANTICA "
          highlight="en una sesión personalizada."
          subtitle="40 minutos con un especialista. Vemos juntos tus procesos actuales, te mostramos la plataforma operando con datos reales, y diseñamos un plan de implementación a la medida de tu organización."
        />

        {/* Stepper */}
        <div className="max-w-3xl mx-auto mt-12 mb-8">
          <Stepper step={step} />
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Bloque informativo */}
          <div className="lg:col-span-4 space-y-4">
            <Info ico={CalendarIcon} t="Sesión de 40 minutos" d="Demo en vivo, preguntas y resolución de dudas técnicas." />
            <Info ico={Building2} t="Hecho a la medida" d="Adaptamos la presentación al sector y tamaño de tu organización." />
            <Info ico={CheckCircle2} t="Sin compromiso" d="Te enviamos la propuesta económica solo si lo solicitas." />
            <Info ico={Mail} t="Soporte incluido" d="Acceso a un canal directo con el equipo durante 7 días." />

            <div className="glass-vibrant-strong rounded-2xl p-5 mt-6">
              <div className="flex items-center gap-2 text-sm text-brand-100/80 mb-2">
                <Phone size={16} className="text-brand-300" />
                ¿Prefieres llamada directa?
              </div>
              <a
                href={`https://wa.me/${QUUANTICA.contact.whatsapp}`}
                className="font-mono text-brand-200 hover:text-white transition-colors text-sm"
              >
                {QUUANTICA.contact.whatsappDisplay}
              </a>
              <div className="text-xs text-brand-100/55 mt-1.5">
                Lunes a viernes · 9:00 a.m. — 5:00 p.m. (Colombia)
              </div>
            </div>
          </div>

          {/* Wizard */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 glass-vibrant-strong rounded-3xl p-6 lg:p-8 relative"
          >
            <AnimatePresence mode="wait">
              {/* PASO 1 — DATOS */}
              {step === 1 && (
                <motion.div
                  key="datos"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  <div className="mb-5">
                    <div className="text-xs uppercase tracking-wider text-brand-300/80 font-semibold mb-1">
                      Paso 1 de 2
                    </div>
                    <h3 className="font-display text-2xl font-bold tracking-tight">
                      Cuéntanos sobre ti
                    </h3>
                    <p className="text-sm text-brand-100/60 mt-1">
                      Para poder preparar tu demostración personalizada.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Nombre completo *" icon={User}>
                      <input
                        value={form.nombre}
                        onChange={(e) => onChange('nombre', e.target.value)}
                        placeholder="Juan Pérez"
                        className="input"
                      />
                    </Field>
                    <Field label="Empresa *" icon={Building2}>
                      <input
                        value={form.empresa}
                        onChange={(e) => onChange('empresa', e.target.value)}
                        placeholder="Constructora ABC S.A.S"
                        className="input"
                      />
                    </Field>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Cargo">
                      <input
                        value={form.cargo}
                        onChange={(e) => onChange('cargo', e.target.value)}
                        placeholder="Director de operaciones"
                        className="input"
                      />
                    </Field>
                    <Field label="Correo corporativo *" icon={Mail}>
                      <input
                        type="email"
                        value={form.correo}
                        onChange={(e) => onChange('correo', e.target.value)}
                        placeholder="tu@empresa.com"
                        className="input"
                      />
                    </Field>
                  </div>

                  <Field label="WhatsApp" icon={MessageCircle}>
                    <input
                      value={form.whatsapp}
                      onChange={(e) => onChange('whatsapp', e.target.value)}
                      placeholder="+57 300 000 0000"
                      className="input"
                    />
                  </Field>

                  <Field label="Comentarios (opcional)">
                    <textarea
                      rows={3}
                      value={form.comentarios}
                      onChange={(e) => onChange('comentarios', e.target.value)}
                      placeholder="Cuéntanos brevemente sobre tu organización: número de sedes, sector, retos actuales con el SG-SST…"
                      className="input resize-none"
                    />
                  </Field>

                  {error && <ErrorBox msg={error} />}

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      type="button"
                      onClick={irACalendario}
                      onMouseEnter={() => sfx.hover()}
                      className="btn-primary"
                    >
                      Continuar a la fecha
                      <ArrowRight size={18} />
                    </button>
                  </div>

                  <div className="text-xs text-brand-100/45 mt-2">
                    Al continuar aceptas el tratamiento de datos según Ley 1581/2012.
                  </div>
                </motion.div>
              )}

              {/* PASO 2 — CALENDARIO */}
              {step === 2 && (
                <motion.div
                  key="cal"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-4"
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-brand-300/80 font-semibold mb-1">
                        Paso 2 de 2
                      </div>
                      <h3 className="font-display text-2xl font-bold tracking-tight">
                        Selecciona fecha y hora
                      </h3>
                      <p className="text-sm text-brand-100/60 mt-1">
                        Disponibilidad de lunes a viernes, mañanas y tardes.
                      </p>
                    </div>

                    {/* Toggle Mes / Semana */}
                    <div className="inline-flex bg-white/[.04] border border-white/[.06] rounded-xl p-1">
                      {(['mes', 'semana'] as const).map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => {
                            sfx.click();
                            setView(v);
                          }}
                          className={`text-xs px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                            view === v
                              ? 'bg-brand-500/20 text-white border border-brand-400/40'
                              : 'text-brand-100/60 hover:text-white'
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Calendario */}
                  <div className="rounded-2xl bg-ink-900/40 border border-white/[.06] p-3">
                    {view === 'mes' ? (
                      <MonthView
                        visibleMonth={visibleMonth}
                        setVisibleMonth={setVisibleMonth}
                        minDate={minDate}
                        maxDate={maxDate}
                        selectedIso={form.fecha}
                        onSelect={(d) => {
                          sfx.click();
                          onChange('fecha', fmtIso(d));
                          onChange('hora', ''); // resetear hora al cambiar día
                        }}
                        estadoDia={estadoDia}
                      />
                    ) : (
                      <WeekView
                        visibleWeekStart={visibleWeekStart}
                        setVisibleWeekStart={setVisibleWeekStart}
                        minDate={minDate}
                        maxDate={maxDate}
                        selectedIso={form.fecha}
                        onSelect={(d) => {
                          sfx.click();
                          onChange('fecha', fmtIso(d));
                          onChange('hora', '');
                        }}
                        estadoDia={estadoDia}
                      />
                    )}

                    {/* Leyenda */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-3 pt-3 border-t border-white/[.05] text-[10px] text-brand-100/55">
                      <LegendDot className="bg-brand-500/30 border-brand-400/60" label="Disponible" />
                      <LegendDot className="bg-brand-500 border-brand-400" label="Seleccionado" />
                      <LegendDot className="bg-white/[.05] border-white/[.08]" label="No disponible" />
                      <LegendDot className="bg-amber-500/15 border-amber-500/40" label="Festivo" />
                    </div>
                  </div>

                  {/* Slots de hora */}
                  <AnimatePresence>
                    {form.fecha && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="rounded-2xl bg-ink-900/40 border border-white/[.06] p-3.5"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Clock size={14} className="text-brand-300" />
                          <span className="text-xs md:text-sm font-medium">
                            Horarios para{' '}
                            <span className="text-white">
                              {formatDateLong(form.fecha)}
                            </span>
                          </span>
                        </div>

                        <div className="space-y-3">
                          <SlotBlock
                            label="Mañana"
                            icon={Sun}
                            horas={HORAS_MANANA}
                            seleccionada={form.hora}
                            onSelect={(h) => {
                              sfx.click();
                              onChange('hora', h);
                            }}
                          />
                          <SlotBlock
                            label="Tarde"
                            icon={Sunset}
                            horas={HORAS_TARDE}
                            seleccionada={form.hora}
                            onSelect={(h) => {
                              sfx.click();
                              onChange('hora', h);
                            }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Resumen */}
                  {form.fecha && form.hora && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-2xl border border-brand-500/30 bg-gradient-to-br from-brand-600/10 via-ink-900/40 to-accent-cyan/5 p-5"
                    >
                      <div className="text-xs uppercase tracking-wider text-brand-300/80 font-semibold mb-2">
                        Lo que vas a agendar
                      </div>
                      <div className="font-display text-lg font-bold mb-1">
                        {formatDateLong(form.fecha)} · {form.hora}
                      </div>
                      <div className="text-sm text-brand-100/65">
                        Demo personalizada con {form.nombre} ({form.empresa})
                      </div>
                    </motion.div>
                  )}

                  {error && <ErrorBox msg={error} />}

                  {/* Acciones */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        sfx.click();
                        setStep(1);
                      }}
                      className="btn-ghost"
                    >
                      <ArrowLeft size={18} />
                      Volver
                    </button>
                    <button
                      type="button"
                      onClick={confirmarAgenda}
                      disabled={enviando || !form.fecha || !form.hora}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {enviando ? 'Confirmando…' : 'Confirmar agenda'}
                    </button>
                    <button
                      type="button"
                      onClick={enviarPorWhatsapp}
                      disabled={!form.fecha || !form.hora}
                      className="btn-ghost disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <MessageCircle size={18} />
                      Enviar por WhatsApp
                    </button>
                  </div>
                </motion.div>
              )}

              {/* PASO 3 — CONFIRMACIÓN */}
              {step === 3 && (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-300 mb-5">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">
                    ¡Solicitud registrada!
                  </h3>
                  <p className="text-brand-100/70 max-w-md mx-auto mb-6">
                    Tu solicitud quedó lista. Para confirmarla con un especialista,
                    envíanosla por WhatsApp y te respondemos en menos de 1 hora hábil.
                  </p>

                  <div className="max-w-md mx-auto rounded-2xl border border-white/[.08] bg-white/[.03] p-5 text-left mb-6">
                    <Resumen label="Fecha" value={formatDateLong(form.fecha)} />
                    <Resumen label="Hora" value={form.hora} />
                    <Resumen label="Nombre" value={form.nombre} />
                    <Resumen label="Empresa" value={form.empresa} />
                    <Resumen label="Correo" value={form.correo} last />
                  </div>

                  <div className="flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={enviarPorWhatsapp}
                      className="btn-primary"
                    >
                      <MessageCircle size={18} />
                      Enviar por WhatsApp
                    </button>
                    <button
                      type="button"
                      onClick={reiniciar}
                      className="btn-ghost text-sm"
                    >
                      Nueva solicitud
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          padding: 10px 12px;
          font-size: 13px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: white;
          font-family: inherit;
          outline: none;
          transition: all 0.15s ease;
        }
        :global(.input:focus) {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(43, 107, 230, 0.5);
        }
        :global(.input::placeholder) {
          color: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────
// Subcomponentes
// ───────────────────────────────────────────────────────────────────

function Stepper({ step }: { step: 1 | 2 | 3 }) {
  const steps = [
    { n: 1, label: 'Datos' },
    { n: 2, label: 'Fecha y hora' },
    { n: 3, label: 'Confirmación' },
  ];
  return (
    <div className="flex items-center justify-center gap-3">
      {steps.map((s, i) => {
        const active = step === s.n;
        const done = step > s.n;
        return (
          <div key={s.n} className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
                  done
                    ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-300'
                    : active
                      ? 'bg-brand-500/25 border-brand-400 text-white shadow-[0_0_0_4px_rgba(43,107,230,0.15)]'
                      : 'bg-white/[.03] border-white/[.08] text-brand-100/40'
                }`}
              >
                {done ? <CheckCircle2 size={14} /> : s.n}
              </div>
              <span
                className={`text-sm font-medium hidden sm:block ${
                  active ? 'text-white' : done ? 'text-brand-100/80' : 'text-brand-100/40'
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`h-px w-8 sm:w-12 ${
                  step > s.n ? 'bg-emerald-400/40' : 'bg-white/[.08]'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function MonthView({
  visibleMonth,
  setVisibleMonth,
  minDate,
  maxDate,
  selectedIso,
  onSelect,
  estadoDia,
}: {
  visibleMonth: Date;
  setVisibleMonth: (d: Date) => void;
  minDate: Date;
  maxDate: Date;
  selectedIso: string;
  onSelect: (d: Date) => void;
  estadoDia: (d: Date) => string;
}) {
  // Construir grilla 6x7 empezando el lunes
  const first = startOfMonth(visibleMonth);
  const offset = dowMonday(first);
  const start = addDays(first, -offset);
  const cells = Array.from({ length: 42 }, (_, i) => addDays(start, i));

  const prevMonth = () =>
    setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1));
  const nextMonth = () =>
    setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1));

  const puedeRetroceder = startOfMonth(visibleMonth) > startOfMonth(minDate);
  const puedeAvanzar = startOfMonth(visibleMonth) < startOfMonth(maxDate);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={prevMonth}
          disabled={!puedeRetroceder}
          className="w-7 h-7 rounded-md flex items-center justify-center bg-white/[.04] border border-white/[.06] text-brand-100/70 hover:bg-white/[.08] hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={14} />
        </button>
        <div className="font-display font-bold text-sm md:text-base">
          {MESES[visibleMonth.getMonth()]} {visibleMonth.getFullYear()}
        </div>
        <button
          type="button"
          onClick={nextMonth}
          disabled={!puedeAvanzar}
          className="w-7 h-7 rounded-md flex items-center justify-center bg-white/[.04] border border-white/[.06] text-brand-100/70 hover:bg-white/[.08] hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {DIAS_CORTOS.map((d) => (
          <div
            key={d}
            className="text-[9px] uppercase tracking-wider text-brand-100/40 text-center font-semibold py-0.5"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          const inMonth = d.getMonth() === visibleMonth.getMonth();
          const estado = estadoDia(d);
          const iso = fmtIso(d);
          const selected = selectedIso === iso;
          return (
            <DayCell
              key={i}
              date={d}
              inMonth={inMonth}
              estado={estado}
              selected={selected}
              onSelect={onSelect}
            />
          );
        })}
      </div>
    </div>
  );
}

function WeekView({
  visibleWeekStart,
  setVisibleWeekStart,
  minDate,
  maxDate,
  selectedIso,
  onSelect,
  estadoDia,
}: {
  visibleWeekStart: Date;
  setVisibleWeekStart: (d: Date) => void;
  minDate: Date;
  maxDate: Date;
  selectedIso: string;
  onSelect: (d: Date) => void;
  estadoDia: (d: Date) => string;
}) {
  const cells = Array.from({ length: 7 }, (_, i) => addDays(visibleWeekStart, i));
  const lastInWeek = cells[6];
  const firstInWeek = cells[0];

  const prevWeek = () => setVisibleWeekStart(addDays(visibleWeekStart, -7));
  const nextWeek = () => setVisibleWeekStart(addDays(visibleWeekStart, 7));

  const puedeRetroceder = lastInWeek >= minDate && firstInWeek > minDate;
  const puedeAvanzar = firstInWeek <= maxDate && lastInWeek < maxDate;

  const labelFromTo = `${firstInWeek.getDate()} ${MESES[firstInWeek.getMonth()].slice(0, 3)}. — ${lastInWeek.getDate()} ${MESES[lastInWeek.getMonth()].slice(0, 3)}. ${lastInWeek.getFullYear()}`;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={prevWeek}
          disabled={!puedeRetroceder}
          className="w-7 h-7 rounded-md flex items-center justify-center bg-white/[.04] border border-white/[.06] text-brand-100/70 hover:bg-white/[.08] hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={14} />
        </button>
        <div className="font-display font-bold text-xs md:text-sm">{labelFromTo}</div>
        <button
          type="button"
          onClick={nextWeek}
          disabled={!puedeAvanzar}
          className="w-7 h-7 rounded-md flex items-center justify-center bg-white/[.04] border border-white/[.06] text-brand-100/70 hover:bg-white/[.08] hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {cells.map((d, i) => {
          const estado = estadoDia(d);
          const iso = fmtIso(d);
          const selected = selectedIso === iso;
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="text-[9px] uppercase tracking-wider text-brand-100/50 font-semibold">
                {DIAS_CORTOS[i]}
              </div>
              <DayCell
                date={d}
                inMonth={true}
                estado={estado}
                selected={selected}
                onSelect={onSelect}
                large
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DayCell({
  date,
  inMonth,
  estado,
  selected,
  onSelect,
  large = false,
}: {
  date: Date;
  inMonth: boolean;
  estado: string;
  selected: boolean;
  onSelect: (d: Date) => void;
  large?: boolean;
}) {
  const disabled = estado !== 'disponible';
  const base = large
    ? 'aspect-square w-full max-w-[52px] text-sm'
    : 'aspect-square text-[11px] md:text-xs';

  let cls = `${base} rounded-lg border flex items-center justify-center font-medium transition-all duration-200`;
  let title = '';

  if (selected) {
    cls += ' bg-brand-500 border-brand-400 text-white shadow-lg shadow-brand-500/30 scale-[1.02]';
    title = 'Seleccionado';
  } else if (!inMonth) {
    cls += ' text-brand-100/15 border-transparent';
    title = '';
  } else if (estado === 'disponible') {
    cls += ' bg-brand-500/10 border-brand-500/30 text-brand-100 hover:bg-brand-500/25 hover:border-brand-400/70 hover:scale-105 cursor-pointer';
    title = 'Disponible';
  } else if (estado === 'festivo') {
    cls += ' bg-amber-500/10 border-amber-500/30 text-amber-300/60 cursor-not-allowed line-through';
    title = 'Festivo';
  } else {
    cls += ' bg-white/[.03] border-white/[.05] text-brand-100/30 cursor-not-allowed';
    title =
      estado === 'pasado'
        ? 'No disponible'
        : estado === 'fuera'
          ? 'Fuera de rango'
          : 'Fin de semana';
  }

  return (
    <button
      type="button"
      disabled={disabled}
      title={title}
      onClick={() => !disabled && onSelect(date)}
      className={cls}
    >
      {date.getDate()}
    </button>
  );
}

function SlotBlock({
  label,
  icon: Icon,
  horas,
  seleccionada,
  onSelect,
}: {
  label: string;
  icon: any;
  horas: string[];
  seleccionada: string;
  onSelect: (h: string) => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-brand-100/55 font-semibold mb-1.5">
        <Icon size={12} className="text-brand-300" />
        {label}
      </div>
      <div className="grid grid-cols-6 gap-1.5">
        {horas.map((h) => {
          const sel = seleccionada === h;
          return (
            <button
              key={h}
              type="button"
              onClick={() => onSelect(h)}
              className={`text-[11px] font-medium px-1 py-1.5 rounded-md border transition-all ${
                sel
                  ? 'bg-brand-500 border-brand-400 text-white shadow-lg shadow-brand-500/30'
                  : 'bg-white/[.03] border-white/[.06] text-brand-100/70 hover:bg-brand-500/15 hover:border-brand-400/50 hover:text-white'
              }`}
            >
              {h}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`w-3 h-3 rounded border ${className}`} />
      {label}
    </span>
  );
}

function ErrorBox({ msg }: { msg: string }) {
  return (
    <div className="text-sm text-rose-300 bg-rose-500/10 border border-rose-500/30 rounded-lg px-3 py-2">
      {msg}
    </div>
  );
}

function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon?: any;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="text-xs text-brand-100/65 font-medium mb-1.5 flex items-center gap-1.5">
        {Icon && <Icon size={12} className="text-brand-300" />}
        {label}
      </div>
      {children}
    </label>
  );
}

function Info({ ico: Ico, t, d }: { ico: any; t: string; d: string }) {
  return (
    <div className="glass-vibrant rounded-2xl p-4 flex items-start gap-3">
      <div className="shrink-0 w-9 h-9 rounded-lg bg-brand-500/15 border border-brand-500/30 flex items-center justify-center text-brand-300">
        <Ico size={16} />
      </div>
      <div>
        <div className="font-display font-bold text-sm">{t}</div>
        <div className="text-xs text-brand-100/65 mt-0.5">{d}</div>
      </div>
    </div>
  );
}

function Resumen({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div
      className={`flex items-baseline justify-between gap-3 py-2 ${
        last ? '' : 'border-b border-white/[.05]'
      }`}
    >
      <span className="text-xs text-brand-100/55 uppercase tracking-wider font-semibold">
        {label}
      </span>
      <span className="text-sm text-white font-medium text-right">{value}</span>
    </div>
  );
}
