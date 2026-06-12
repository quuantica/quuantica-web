'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { sfx } from '@/lib/sounds';
import { QUUANTICA } from '@/lib/config';

// Icono oficial de WhatsApp como SVG inline
function WhatsAppIcon({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488" />
    </svg>
  );
}

const QUICK_QUESTIONS = [
  '👋 Quiero conocer la plataforma',
  '🏢 Soy una empresa, dame info',
  '🏛️ Represento una entidad pública',
  '📅 Quiero agendar demo',
];

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const send = (text: string) => {
    sfx.click();
    const url = `https://wa.me/${QUUANTICA.contact.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setOpen(false);
  };

  if (!mounted) return null;

  return (
    <>
      {/* Burbuja flotante */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5, type: 'spring' }}
        className="fixed bottom-6 right-6 z-50"
      >
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-20 right-0 w-[340px] sm:w-[380px] rounded-2xl bg-ink-900 border border-white/[.08] shadow-soft overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-700 to-emerald-500 px-5 py-4 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur flex items-center justify-center">
                  <WhatsAppIcon size={22} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-display font-bold text-white">
                    QUUANTICA — Soporte
                  </div>
                  <div className="text-xs text-white/85 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-pulse-soft" />
                    Suele responder en minutos
                  </div>
                </div>
                <button
                  onClick={() => {
                    sfx.close();
                    setOpen(false);
                  }}
                  aria-label="Cerrar"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 bg-ink-950 max-h-[60vh] overflow-y-auto">
                <div className="rounded-xl bg-white/[.04] border border-white/[.06] p-3.5 mb-4">
                  <div className="text-xs text-brand-100/55 font-medium mb-1.5">
                    QUUANTICA · Equipo comercial
                  </div>
                  <div className="text-sm text-brand-100/85 leading-relaxed">
                    ¡Hola! 👋 Soy parte del equipo de QUUANTICA. Cuéntame qué necesitas
                    y te ayudo a encontrar la mejor solución tecnológica para tu organización.
                  </div>
                </div>

                <div className="text-xs uppercase tracking-widest text-brand-100/45 font-bold mb-2.5">
                  Preguntas frecuentes
                </div>
                <div className="space-y-2 mb-4">
                  {QUICK_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q + '. Quiero más información sobre QUUANTICA.')}
                      onMouseEnter={() => sfx.hover()}
                      className="w-full text-left text-sm px-3.5 py-2.5 rounded-lg bg-white/[.03] border border-white/[.06] hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-200 text-brand-100/80 transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => send(QUUANTICA.whatsappMessage)}
                  className="btn w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-soft hover:from-emerald-500 hover:to-emerald-400"
                >
                  <Send size={16} />
                  Iniciar chat por WhatsApp
                </button>

                <div className="mt-3 text-[10px] text-center text-brand-100/45">
                  Te conectamos con {QUUANTICA.contact.whatsappDisplay}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative">
          {/* Pulse anillos */}
          {!open && (
            <>
              <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping" style={{ animationDuration: '2.4s' }} />
              <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.4s' }} />
            </>
          )}
          <button
            onClick={() => {
              if (!open) sfx.open();
              else sfx.close();
              setOpen((v) => !v);
            }}
            onMouseEnter={() => sfx.hover()}
            aria-label={open ? 'Cerrar chat' : 'Abrir chat de WhatsApp'}
            className="relative w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-soft flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.div
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={26} />
                </motion.div>
              ) : (
                <motion.div
                  key="msg"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <WhatsAppIcon size={30} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.div>
    </>
  );
}
