'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, CalendarDays, FolderOpen, ClipboardCheck, Presentation, TrendingUp,
  Siren, Scale, Users, Bandage, HardHat, Equal, MessagesSquare, HeartPulse,
  Stethoscope, Lock, ClipboardList, FileCheck2, FileSignature, QrCode, Handshake,
  Truck, Route, Car, LayoutDashboard, Bot, Building2, UserCog, Smartphone, Layers,
} from 'lucide-react';
import SectionHeading from './ui/SectionHeading';

type Area = {
  id: string;
  nombre: string;
  icono: any;
  color: string; // color de acento del área (hex)
};

const AREAS: Area[] = [
  { id: 'sgsst', nombre: 'Sistemas de gestión SG-SST', icono: ShieldCheck, color: '#4D8DFB' },
  { id: 'th', nombre: 'Talento humano', icono: Users, color: '#A78BFA' },
  { id: 'salud', nombre: 'Salud y medicina del trabajo', icono: Stethoscope, color: '#F472B6' },
  { id: 'insp', nombre: 'Inspecciones y operación', icono: ClipboardList, color: '#FACC15' },
  { id: 'ctr', nombre: 'Contratistas y proveedores', icono: Handshake, color: '#22D3EE' },
  { id: 'vial', nombre: 'Seguridad vial', icono: Route, color: '#FB923C' },
  { id: 'plat', nombre: 'La plataforma', icono: Layers, color: '#10B981' },
];

const MODULOS: { area: string; icono: any; nombre: string; desc: string }[] = [
  // Sistemas de gestión
  { area: 'sgsst', icono: ShieldCheck, nombre: 'Implementación SG-SST', desc: 'Estándares mínimos 7, 21 o 60 por fases, con documentos y evidencias de cada estándar.' },
  { area: 'sgsst', icono: CalendarDays, nombre: 'Plan anual y calendario', desc: 'Lee su plan anual en Excel, Word o PDF y lo convierte en un calendario con alertas.' },
  { area: 'sgsst', icono: FolderOpen, nombre: 'Documentos y retención', desc: 'Archivo central por empresa y por sede, ordenado y respaldado.' },
  { area: 'sgsst', icono: ClipboardCheck, nombre: 'Auditoría SG-SST', desc: 'Auditoría anual con hallazgos, calificación e informe listo para imprimir.' },
  { area: 'sgsst', icono: Presentation, nombre: 'Informe a la Alta Dirección', desc: 'La revisión por la dirección, armada desde los datos reales del sistema.' },
  { area: 'sgsst', icono: TrendingUp, nombre: 'Informe de avance', desc: 'Resumen de lo realizado en el período, listo para presentar.' },
  { area: 'sgsst', icono: Siren, nombre: 'Accidentes e incidentes', desc: 'Expediente, investigación e índices de frecuencia, severidad e ILI.' },
  { area: 'sgsst', icono: Scale, nombre: 'Vigilancia normativa', desc: 'Matriz legal viva: avisa cuándo cambia la norma y qué hacer.' },
  // Talento humano
  { area: 'th', icono: Users, nombre: 'Empleados', desc: 'Base única del personal: perfil sociodemográfico, cargo, sede y salario mínimo al día.' },
  { area: 'th', icono: Bandage, nombre: 'Incapacidades y ausentismo', desc: 'Catálogo CIE-10, cálculo EPS / ARL según la ley e informe de ausentismo.' },
  { area: 'th', icono: HardHat, nombre: 'Entrega de EPP', desc: 'Inventario y entregas con firma y trazabilidad por trabajador.' },
  { area: 'th', icono: Equal, nombre: 'Equidad de género', desc: 'Seguimiento del programa de equidad de género de la empresa.' },
  { area: 'th', icono: MessagesSquare, nombre: 'Comunicaciones', desc: 'Mensajes con constancia entre la empresa, sus sedes, inspectores y contratistas.' },
  // Salud
  { area: 'salud', icono: HeartPulse, nombre: 'Condiciones de salud', desc: 'Casos, restricciones, reubicaciones y ficha individual de cada trabajador.' },
  { area: 'salud', icono: Stethoscope, nombre: 'Medicina del trabajo', desc: 'Exámenes ocupacionales, vencimientos, recomendaciones, cursos y certificados de aptitud.' },
  { area: 'salud', icono: Lock, nombre: 'Salud reservada', desc: 'Espacio exclusivo de los profesionales de salud, con reserva médica y programas de vigilancia.' },
  // Inspecciones y operación
  { area: 'insp', icono: ClipboardList, nombre: 'Inspecciones SST', desc: 'Listas adaptadas a cada sede, con fotos y novedades reportadas en línea.' },
  { area: 'insp', icono: FileCheck2, nombre: 'Sus propios formatos', desc: 'Los formatos de inspección de su empresa, convertidos en formularios para el celular, con firma.' },
  { area: 'insp', icono: FileSignature, nombre: 'Permisos de trabajo', desc: 'Emisión, revalidación y cierre del permiso, con la firma de cada trabajador.' },
  { area: 'insp', icono: QrCode, nombre: 'Verificación de ingreso', desc: 'Portería con carné y código QR: valida requisitos antes de dejar entrar.' },
  // Contratistas
  { area: 'ctr', icono: Handshake, nombre: 'Contratistas y proveedores', desc: 'Evaluación, carga de documentos con revisión por IA, autoevaluación y carné.' },
  { area: 'ctr', icono: Truck, nombre: 'Contratistas viales', desc: 'Vehículos y conductores de terceros, con sus documentos al día.' },
  // Seguridad vial
  { area: 'vial', icono: Route, nombre: 'PESV', desc: 'Plan Estratégico de Seguridad Vial paso a paso, según la Res. 40595 de 2022.' },
  { area: 'vial', icono: Car, nombre: 'Auditoría PESV', desc: 'Evaluación de los 24 pasos con puntaje e informe.' },
  // Plataforma
  { area: 'plat', icono: LayoutDashboard, nombre: 'Dashboard SIG', desc: 'Indicadores en vivo de todas las áreas y de cada sede.' },
  { area: 'plat', icono: Bot, nombre: 'Asistente IA', desc: 'Resuelve dudas, redacta documentos y acompaña cada módulo.' },
  { area: 'plat', icono: Building2, nombre: 'Multiempresa y multisede', desc: 'Grupos empresariales, empresas y sedes, con los datos de cada una aislados.' },
  { area: 'plat', icono: UserCog, nombre: 'Usuarios y roles', desc: 'Un acceso por persona: equipo SST, inspectores, contratistas, salud y portería.' },
  { area: 'plat', icono: Smartphone, nombre: 'App en el celular', desc: 'Se instala como aplicación en el celular, la tableta o el computador.' },
];

const area = (id: string) => AREAS.find((a) => a.id === id)!;

export default function PlataformaDemo() {
  const [sel, setSel] = useState<string>('todas');
  const visibles = sel === 'todas' ? MODULOS : MODULOS.filter((m) => m.area === sel);
  const actual = sel === 'todas' ? null : area(sel);

  return (
    <section id="plataforma" className="section-pad relative">
      <div className="container-q">
        <SectionHeading
          eyebrow="Plataforma tecnológica propia"
          align="center"
          title="Una sola plataforma para"
          highlight="todas las áreas de su empresa."
          subtitle={`${MODULOS.length} módulos conectados entre sí sobre una misma base de trabajadores: SST, talento humano, salud y medicina del trabajo, contratistas, inspecciones y seguridad vial. Su empresa activa los que necesita y los moldeamos a su operación.`}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mt-14 relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-brand-600/20 via-accent-cyan/15 to-accent-violet/20 rounded-[28px] blur-2xl opacity-60" />

          <div className="relative rounded-3xl overflow-hidden border border-white/[.08] bg-ink-950 shadow-soft">
            {/* Barra del navegador */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-ink-900 border-b border-white/[.06]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              </div>
              <div className="ml-3 flex-1 max-w-md min-w-0">
                <div className="bg-ink-850/80 border border-white/[.05] rounded-md px-3 py-1 text-[11px] text-brand-100/50 font-mono truncate">
                  app.quuantica.com/modulos
                </div>
              </div>
              <div className="hidden sm:block text-[10px] text-brand-100/40 font-mono">
                {MODULOS.length} módulos · {AREAS.length} áreas
              </div>
            </div>

            <div className="grid grid-cols-12 min-h-[600px]">
              {/* Áreas (escritorio) */}
              <aside className="hidden md:flex col-span-4 lg:col-span-3 flex-col bg-ink-900 border-r border-white/[.05] p-4 gap-1">
                <div className="text-[10px] uppercase tracking-widest text-brand-100/40 mb-2 mt-1">
                  Áreas de la empresa
                </div>
                <BotonArea
                  activo={sel === 'todas'}
                  onClick={() => setSel('todas')}
                  icono={Layers}
                  nombre="Todos los módulos"
                  n={MODULOS.length}
                  color="#AECCFF"
                />
                {AREAS.map((a) => (
                  <BotonArea
                    key={a.id}
                    activo={sel === a.id}
                    onClick={() => setSel(a.id)}
                    icono={a.icono}
                    nombre={a.nombre}
                    n={MODULOS.filter((m) => m.area === a.id).length}
                    color={a.color}
                  />
                ))}
                <div className="mt-auto pt-4 text-[11px] leading-relaxed text-brand-100/45">
                  Todos los módulos comparten la misma base de empleados: se carga una vez y alimenta al resto.
                </div>
              </aside>

              {/* Contenido */}
              <div className="col-span-12 md:col-span-8 lg:col-span-9 p-5 lg:p-7 bg-ink-950 min-w-0">
                {/* Áreas (celular) */}
                <div className="md:hidden -mx-1 mb-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <Chip activo={sel === 'todas'} onClick={() => setSel('todas')} nombre="Todos" color="#AECCFF" />
                  {AREAS.map((a) => (
                    <Chip key={a.id} activo={sel === a.id} onClick={() => setSel(a.id)} nombre={a.nombre} color={a.color} />
                  ))}
                </div>

                <div className="flex items-end justify-between gap-4 mb-5 flex-wrap">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-brand-100/45">
                      {actual ? 'Área' : 'Plataforma QUUANTICA'}
                    </div>
                    <div className="font-display text-xl lg:text-2xl font-bold mt-0.5">
                      {actual ? actual.nombre : 'Todos los módulos'}
                    </div>
                  </div>
                  <div className="text-xs text-brand-100/55 tabular-nums">
                    {visibles.length} {visibles.length === 1 ? 'módulo' : 'módulos'}
                  </div>
                </div>

                <motion.div layout className={`grid ${sel === 'todas' ? 'grid-cols-2' : 'grid-cols-1'} sm:grid-cols-2 xl:grid-cols-3 gap-2.5 sm:gap-3`}>
                  <AnimatePresence mode="popLayout">
                    {visibles.map((m) => {
                      const a = area(m.area);
                      const Ico = m.icono;
                      return (
                        <motion.div
                          key={m.nombre}
                          layout
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.96 }}
                          transition={{ duration: 0.22 }}
                          className="group rounded-xl bg-ink-900/70 border border-white/[.06] p-3 sm:p-4 hover:border-white/[.16] hover:bg-ink-900 transition-colors"
                        >
                          <div className={`flex items-start gap-2.5 sm:gap-3 ${sel === 'todas' ? 'flex-col sm:flex-row' : ''}`}>
                            <div
                              className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: `${a.color}1F`, color: a.color }}
                            >
                              <Ico size={18} />
                            </div>
                            <div className="min-w-0">
                              <div className="text-[12px] sm:text-[13px] font-semibold text-white leading-snug break-words">{m.nombre}</div>
                              <div className={`text-[12px] text-brand-100/60 mt-1 leading-relaxed ${sel === 'todas' ? 'hidden sm:block' : ''}`}>{m.desc}</div>
                              {sel === 'todas' && (
                                <div className="hidden sm:block text-[10px] uppercase tracking-wider mt-2 font-medium" style={{ color: a.color }}>
                                  {a.nombre}
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pie informativo */}
        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          <Pie ico="🧩" t="Modular y a la medida" d="Cada empresa activa los módulos que necesita y los adaptamos a sus formatos, flujos y roles." />
          <Pie ico="🏢" t="Multiempresa real" d="Grupos empresariales, empresas y sedes con los datos de cada una aislados en el servidor." />
          <Pie ico="📱" t="En la oficina y en campo" d="Inspectores, contratistas, portería y profesionales de salud trabajan desde el celular." />
        </div>
      </div>
    </section>
  );
}

function BotonArea({
  activo, onClick, icono: Icon, nombre, n, color,
}: {
  activo: boolean; onClick: () => void; icono: any; nombre: string; n: number; color: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activo}
      className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors border focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 ${
        activo ? 'text-white' : 'text-brand-100/65 border-transparent hover:bg-white/[.04]'
      }`}
      style={activo ? { borderColor: `${color}66`, backgroundColor: `${color}17` } : undefined}
    >
      <Icon size={14} style={{ color }} />
      <span className="flex-1">{nombre}</span>
      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[.06] text-brand-100/70 tabular-nums">{n}</span>
    </button>
  );
}

function Chip({ activo, onClick, nombre, color }: { activo: boolean; onClick: () => void; nombre: string; color: string }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        onClick();
        e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }}
      aria-pressed={activo}
      className={`shrink-0 px-3 py-1.5 rounded-full text-[12px] border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 ${
        activo ? 'text-white bg-white/[.08]' : 'text-brand-100/65 border-white/[.08]'
      }`}
      style={activo ? { borderColor: color } : undefined}
    >
      {nombre}
    </button>
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
