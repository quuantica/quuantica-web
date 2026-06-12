'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { sfx } from '@/lib/sounds';

const NAV = [
  { href: '#quienes-somos', label: 'Quiénes somos' },
  { href: '#plataforma', label: 'Plataforma' },
  { href: '#funciones', label: 'Funciones' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#ia', label: 'IA Aplicada' },
  { href: '#agendar', label: 'Agendar' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-xl bg-ink-950/70 border-b border-white/[.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="container-q flex items-center justify-between h-16 md:h-20">
        <a href="#" className="flex items-center" aria-label="Inicio QUUANTICA">
          <Logo size={38} />
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onMouseEnter={() => sfx.hover()}
              onClick={() => sfx.click()}
              className="px-4 py-2 text-sm font-medium text-brand-100/80 hover:text-white rounded-lg hover:bg-white/[.04] transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#agendar"
            onClick={() => sfx.click()}
            onMouseEnter={() => sfx.hover()}
            className="btn-primary text-sm py-2.5 px-5"
          >
            Agendar demostración
          </a>
        </div>

        <button
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => {
            sfx.click();
            setOpen((v) => !v);
          }}
          className="lg:hidden p-2 text-brand-100 rounded-lg hover:bg-white/[.06]"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-ink-900/95 backdrop-blur-xl border-t border-white/[.06]"
          >
            <div className="container-q py-4 flex flex-col gap-1">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => {
                    setOpen(false);
                    sfx.click();
                  }}
                  className="px-3 py-2.5 text-sm font-medium text-brand-100/90 hover:text-white rounded-lg hover:bg-white/[.05]"
                >
                  {n.label}
                </a>
              ))}
              <a href="#agendar" onClick={() => setOpen(false)} className="btn-primary mt-2 text-sm">
                Agendar demostración
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
