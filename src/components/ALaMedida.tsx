'use client';

import { motion } from 'framer-motion';
import { Puzzle, CodeXml, Check, ArrowRight, Server, Globe } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';

const PLATAFORMA = [
  'Sus propios formatos convertidos en formularios digitales, con firma y fotos.',
  'Sus flujos de aprobación, sus roles y sus permisos.',
  'Solo los módulos que su empresa necesita, y los que vengan después.',
  'Importamos sus bases en Excel y los reportes de su nómina.',
  'Grupos empresariales con varias empresas y sedes en el mismo sistema.',
];

const PROYECTOS = [
  'Diagnóstico y análisis de su necesidad.',
  'Diseño y desarrollo del software, por fases que usted aprueba.',
  'Pruebas, puesta en marcha y capacitación del equipo.',
  'Soporte y evolución después de la entrega.',
];

export default function ALaMedida() {
  return (
    <section id="a-la-medida" className="section-pad relative">
      <div className="container-q">
        <SectionHeading
          eyebrow="A la medida"
          align="center"
          title="Moldeamos la tecnología"
          highlight="a su empresa."
          subtitle="No le pedimos que cambie su forma de trabajar: adaptamos la plataforma a su operación. Y si su proyecto va más allá, lo desarrollamos con usted."
        />

        <div className="mt-14 grid lg:grid-cols-2 gap-5">
          <Tarjeta
            icono={Puzzle}
            color="#4D8DFB"
            titulo="La plataforma, a la medida de su empresa"
            texto="Partimos de los módulos que ya funcionan y los ajustamos a cómo opera su organización."
            puntos={PLATAFORMA}
            delay={0}
          />
          <Tarjeta
            icono={CodeXml}
            color="#22D3EE"
            titulo="Desarrollo de software a la medida"
            texto="Gestionamos su proyecto de software de principio a fin, con el mismo equipo que construyó nuestra plataforma."
            puntos={PROYECTOS}
            delay={0.1}
          />
        </div>

        <div className="mt-5 grid sm:grid-cols-2 gap-4">
          <div className="surface p-5 flex items-start gap-3">
            <Server size={20} className="text-accent-emerald shrink-0 mt-0.5" />
            <div>
              <div className="font-display text-base font-bold">Plataforma tecnológica propia</div>
              <div className="text-xs text-brand-100/65 leading-relaxed mt-1">
                Software e infraestructura propios: no revendemos sistemas de terceros, por eso podemos adaptarlo todo.
              </div>
            </div>
          </div>
          <div className="surface p-5 flex items-start gap-3">
            <Globe size={20} className="text-accent-violet shrink-0 mt-0.5" />
            <div>
              <div className="font-display text-base font-bold">Desde Colombia, en expansión internacional</div>
              <div className="text-xs text-brand-100/65 leading-relaxed mt-1">
                Sede en Cajicá, Cundinamarca, con cobertura nacional. La plataforma es 100 % web y funciona desde cualquier lugar.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a href="#agendar" className="btn-primary">
            Cuéntenos su proyecto <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Tarjeta({
  icono: Icon, color, titulo, texto, puntos, delay,
}: {
  icono: any; color: string; titulo: string; texto: string; puntos: string[]; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay }}
      className="surface p-6 lg:p-8"
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
        style={{ backgroundColor: `${color}1F`, color }}
      >
        <Icon size={22} />
      </div>
      <h3 className="font-display text-xl lg:text-2xl font-bold">{titulo}</h3>
      <p className="text-sm text-brand-100/70 leading-relaxed mt-2">{texto}</p>
      <ul className="mt-5 space-y-2.5">
        {puntos.map((p) => (
          <li key={p} className="flex items-start gap-2.5 text-sm text-brand-100/80">
            <Check size={16} className="shrink-0 mt-0.5" style={{ color }} />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
