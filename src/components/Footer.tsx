'use client';

import { Mail, MessageCircle, MapPin, Linkedin, Instagram, Youtube } from 'lucide-react';
import Logo from './Logo';
import { QUUANTICA } from '@/lib/config';
import { sfx } from '@/lib/sounds';

const NAV_RAPIDOS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Plataforma', href: '#plataforma' },
  { label: 'IA Aplicada', href: '#ia' },
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Seguridad', href: '#seguridad' },
  { label: 'Agendar demo', href: '#agendar' },
];

const SOLUCIONES = [
  'Gestión SG-SST',
  'Gestión documental',
  'IA documental',
  'Auditorías',
  'Capacitaciones',
  'Dashboard empresarial',
];

export default function Footer() {
  const wa = `https://wa.me/${QUUANTICA.contact.whatsapp}?text=${encodeURIComponent(QUUANTICA.whatsappMessage)}`;
  return (
    <footer className="relative pt-20 pb-10 mt-10 border-t border-white/[.06] bg-ink-950">
      {/* Línea superior con glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-500/60 to-transparent" />

      <div className="container-q">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Brand y contacto */}
          <div className="lg:col-span-4">
            <Logo size={42} />
            <p className="mt-4 text-sm text-brand-100/65 leading-relaxed max-w-sm">
              Construimos infraestructura digital para empresas e instituciones que necesitan
              cumplimiento normativo, automatización e inteligencia aplicada en operación
              empresarial real.
            </p>

            <div className="mt-6 space-y-2.5 text-sm">
              <a
                href={`mailto:${QUUANTICA.contact.email}`}
                onMouseEnter={() => sfx.hover()}
                className="flex items-center gap-3 text-brand-100/80 hover:text-white transition-colors"
              >
                <span className="w-8 h-8 rounded-lg bg-brand-500/15 border border-brand-500/30 flex items-center justify-center text-brand-300">
                  <Mail size={14} />
                </span>
                {QUUANTICA.contact.email}
              </a>
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sfx.hover()}
                className="flex items-center gap-3 text-brand-100/80 hover:text-white transition-colors"
              >
                <span className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
                  <MessageCircle size={14} />
                </span>
                {QUUANTICA.contact.whatsappDisplay}
              </a>
              <div className="flex items-center gap-3 text-brand-100/80">
                <span className="w-8 h-8 rounded-lg bg-accent-violet/15 border border-accent-violet/30 flex items-center justify-center text-accent-violet">
                  <MapPin size={14} />
                </span>
                {QUUANTICA.contact.direccion}
              </div>
            </div>

            {/* Redes */}
            <div className="mt-6 flex gap-2">
              <SocialIcon href={QUUANTICA.social.linkedin} icon={Linkedin} label="LinkedIn" />
              <SocialIcon href={QUUANTICA.social.instagram} icon={Instagram} label="Instagram" />
              <SocialIcon href={QUUANTICA.social.youtube} icon={Youtube} label="YouTube" />
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-widest text-brand-100/55 font-bold mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5">
              {NAV_RAPIDOS.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onMouseEnter={() => sfx.hover()}
                    className="text-sm text-brand-100/70 hover:text-white transition-colors"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Soluciones */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-widest text-brand-100/55 font-bold mb-4">
              Soluciones
            </h4>
            <ul className="space-y-2.5">
              {SOLUCIONES.map((s) => (
                <li key={s} className="text-sm text-brand-100/70">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-widest text-brand-100/55 font-bold mb-4">
              Para entidades públicas
            </h4>
            <div className="surface p-5">
              <p className="text-sm text-brand-100/75 leading-relaxed mb-4">
                Trabajamos con entidades del Estado y empresas que se preparan para visitas
                del Ministerio del Trabajo, ARL y entes de control.
              </p>
              <a
                href={`mailto:${QUUANTICA.contact.emailComercial}?subject=Cotización institucional`}
                onMouseEnter={() => sfx.hover()}
                onClick={() => sfx.click()}
                className="btn-outline text-xs w-full justify-center"
              >
                Cotización institucional
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/[.06] flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="text-xs text-brand-100/45">
            © {new Date().getFullYear()} QUUANTICA Servicios Tecnológicos. Todos los derechos
            reservados.
          </div>
          <div className="flex flex-wrap gap-6 text-xs text-brand-100/45">
            <a
              href="/politica-privacidad"
              className="hover:text-white transition-colors"
            >
              Política de privacidad
            </a>
            <a
              href="/tratamiento-datos"
              className="hover:text-white transition-colors"
            >
              Tratamiento de datos (Ley 1581/2012)
            </a>
            <a
              href="/terminos-condiciones"
              className="hover:text-white transition-colors"
            >
              Términos y condiciones
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] uppercase tracking-[.4em] text-brand-100/30">
          Desarrollo tecnológico ·{' '}
          <a
            href="https://www.quuantica.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-brand-200 transition-colors"
          >
            www.quuantica.com
          </a>{' '}
          · Derechos reservados
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: any;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      onMouseEnter={() => sfx.hover()}
      className="w-9 h-9 rounded-lg bg-white/[.04] border border-white/[.08] flex items-center justify-center text-brand-100/70 hover:text-white hover:bg-brand-500/15 hover:border-brand-400/40 transition-all"
    >
      <Icon size={16} />
    </a>
  );
}
