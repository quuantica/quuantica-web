// QUUANTICA — Generador de sonidos UI suaves vía Web Audio API
// Sin archivos externos: tonos sintéticos elegantes y discretos.

let ctx: AudioContext | null = null;
let muted = false;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    try {
      // @ts-expect-error - webkit fallback
      const Ctor = window.AudioContext || window.webkitAudioContext;
      if (Ctor) ctx = new Ctor();
    } catch {
      ctx = null;
    }
  }
  return ctx;
}

function playTone(freq: number, duration = 0.06, type: OscillatorType = 'sine', volume = 0.05) {
  if (muted) return;
  const audio = getCtx();
  if (!audio) return;
  try {
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audio.currentTime);
    gain.gain.setValueAtTime(0, audio.currentTime);
    gain.gain.linearRampToValueAtTime(volume, audio.currentTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + duration);
    osc.connect(gain);
    gain.connect(audio.destination);
    osc.start(audio.currentTime);
    osc.stop(audio.currentTime + duration);
  } catch {}
}

export const sfx = {
  hover: () => playTone(880, 0.04, 'sine', 0.025),
  click: () => playTone(560, 0.08, 'sine', 0.05),
  open: () => {
    playTone(440, 0.08, 'sine', 0.04);
    setTimeout(() => playTone(660, 0.1, 'sine', 0.04), 60);
  },
  close: () => playTone(330, 0.1, 'sine', 0.04),
  success: () => {
    playTone(660, 0.06, 'sine', 0.05);
    setTimeout(() => playTone(880, 0.08, 'sine', 0.05), 80);
    setTimeout(() => playTone(1100, 0.12, 'sine', 0.04), 160);
  },
  setMuted: (v: boolean) => {
    muted = v;
  },
  isMuted: () => muted,
};
