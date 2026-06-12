'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { sfx } from '@/lib/sounds';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const SUGERENCIAS = [
  '¿Qué es QUUANTICA?',
  '¿Cómo me ayuda con el SG-SST?',
  'Cuéntame del Plan Vial',
  '¿Cuánto cuesta?',
];

const SALUDO_INICIAL =
  '👋 ¡Hola! Soy QUUI, el asistente virtual de QUUANTICA. Puedo ayudarte con dudas sobre nuestra plataforma, el SG-SST, planes de seguridad vial y más. ¿En qué te puedo ayudar?';

export default function AIChatButton() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: SALUDO_INICIAL },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  const enviarMensaje = async (texto: string) => {
    const trimmed = texto.trim();
    if (!trimmed || loading) return;

    sfx.click();
    const newMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', content: trimmed },
    ];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    // Mensaje vacío que iremos llenando con el stream
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Error desconocido.' }));
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = {
            role: 'assistant',
            content: `⚠️ ${err.error || 'Hubo un error.'}`,
          };
          return copy;
        });
        setLoading(false);
        return;
      }

      // Stream de texto plano
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let acc = '';
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = { role: 'assistant', content: acc };
            return copy;
          });
        }
      }
      sfx.success();
    } catch (err) {
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: 'assistant',
          content:
            '⚠️ No pude conectarme al asistente. Verifica tu conexión a internet e intenta de nuevo.',
        };
        return copy;
      });
    } finally {
      setLoading(false);
    }
  };

  const reiniciar = () => {
    sfx.click();
    setMessages([{ role: 'assistant', content: SALUDO_INICIAL }]);
  };

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.7, duration: 0.5, type: 'spring' }}
      className="fixed bottom-6 right-[100px] sm:right-28 z-50"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-20 right-0 w-[340px] sm:w-[400px] h-[560px] rounded-2xl bg-ink-900 border border-white/[.08] shadow-soft overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-700 via-accent-violet/80 to-accent-violet px-5 py-4 flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur flex items-center justify-center">
                  <Bot size={22} className="text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-ink-900 animate-pulse-soft" />
              </div>
              <div className="flex-1">
                <div className="font-display font-bold text-white flex items-center gap-1.5">
                  QUUI
                  <span className="text-[10px] uppercase tracking-wider bg-white/20 px-1.5 py-0.5 rounded">
                    IA
                  </span>
                </div>
                <div className="text-xs text-white/85 flex items-center gap-1.5">
                  <Sparkles size={11} />
                  Asistente virtual de QUUANTICA
                </div>
              </div>
              <button
                onClick={reiniciar}
                aria-label="Reiniciar conversación"
                title="Reiniciar"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <RefreshCw size={14} />
              </button>
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

            {/* Mensajes */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 bg-ink-950 space-y-3"
            >
              {messages.map((m, i) => (
                <Bubble key={i} message={m} />
              ))}
              {loading && messages[messages.length - 1]?.content === '' && (
                <div className="flex items-center gap-2 text-xs text-brand-100/55 px-2">
                  <Loader2 size={12} className="animate-spin" />
                  QUUI está escribiendo…
                </div>
              )}

              {/* Sugerencias iniciales */}
              {messages.length === 1 && !loading && (
                <div className="pt-3">
                  <div className="text-[10px] uppercase tracking-widest text-brand-100/40 font-bold mb-2 px-1">
                    Sugerencias
                  </div>
                  <div className="grid grid-cols-1 gap-1.5">
                    {SUGERENCIAS.map((s) => (
                      <button
                        key={s}
                        onClick={() => enviarMensaje(s)}
                        className="text-left text-xs px-3 py-2 rounded-lg bg-white/[.03] border border-white/[.06] hover:bg-accent-violet/10 hover:border-accent-violet/40 hover:text-white text-brand-100/75 transition-all"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                enviarMensaje(input);
              }}
              className="border-t border-white/[.06] p-3 bg-ink-900"
            >
              <div className="flex items-end gap-2 bg-white/[.04] border border-white/[.08] rounded-xl pl-3 pr-2 py-2 focus-within:border-accent-violet/50 transition-colors">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      enviarMensaje(input);
                    }
                  }}
                  rows={1}
                  placeholder="Escribe tu pregunta…"
                  disabled={loading}
                  className="flex-1 bg-transparent outline-none text-sm text-white placeholder-brand-100/35 resize-none max-h-24 leading-snug py-1"
                  style={{ minHeight: '24px' }}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-accent-violet to-brand-500 text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-transform"
                  aria-label="Enviar"
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Send size={15} />
                  )}
                </button>
              </div>
              <div className="text-[10px] text-brand-100/35 mt-2 text-center">
                Las respuestas son generadas por IA. Para temas críticos consulta con un
                asesor humano.
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón flotante */}
      <div className="relative">
        {!open && (
          <>
            <span
              className="absolute inset-0 rounded-full bg-accent-violet/30 animate-ping"
              style={{ animationDuration: '2.6s' }}
            />
            <span
              className="absolute inset-0 rounded-full bg-brand-500/20 animate-ping"
              style={{ animationDuration: '3.2s', animationDelay: '0.5s' }}
            />
          </>
        )}
        <button
          onClick={() => {
            if (!open) sfx.open();
            else sfx.close();
            setOpen((v) => !v);
          }}
          onMouseEnter={() => sfx.hover()}
          aria-label={open ? 'Cerrar chat IA' : 'Abrir chat con asistente IA'}
          className="relative w-16 h-16 rounded-full bg-gradient-to-br from-accent-violet via-brand-500 to-brand-600 text-white shadow-soft flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
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
                key="bot"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Bot size={28} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
        {!open && (
          <span className="absolute -top-1 -right-1 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] font-bold uppercase tracking-wider border-2 border-ink-950">
            IA
          </span>
        )}
      </div>
    </motion.div>
  );
}

/**
 * Burbuja de mensaje. Soporta markdown muy básico (negritas con **)
 */
function Bubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'bg-gradient-to-br from-brand-600 to-brand-500 text-white rounded-br-md'
            : 'bg-white/[.04] border border-white/[.06] text-brand-100/90 rounded-bl-md'
        }`}
      >
        <RenderMarkdown text={message.content} />
      </div>
    </motion.div>
  );
}

/**
 * Markdown muy básico:
 *  - **negrita**
 *  - *cursiva*
 *  - listas con "- "
 *  - saltos de línea preservados
 */
function RenderMarkdown({ text }: { text: string }) {
  if (!text) return <span className="opacity-60">…</span>;

  const lines = text.split('\n');
  return (
    <div className="space-y-1.5">
      {lines.map((line, idx) => {
        if (line.startsWith('- ') || line.startsWith('• ')) {
          return (
            <div key={idx} className="flex gap-2">
              <span className="text-brand-300 mt-0.5">•</span>
              <span dangerouslySetInnerHTML={{ __html: inline(line.slice(2)) }} />
            </div>
          );
        }
        if (line.trim() === '') return <div key={idx} className="h-1" />;
        return (
          <div key={idx} dangerouslySetInnerHTML={{ __html: inline(line) }} />
        );
      })}
    </div>
  );
}

function inline(s: string): string {
  // Escape HTML básico
  let out = s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  // Negrita
  out = out.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>');
  // Cursiva
  out = out.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
  return out;
}
