'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Spoty-Quuantica — reproductor personal (estilo Spotify) embebido en la web.
 * Se abre con el ícono 🔊 del header (evento 'spq-open') o como app en /musica.
 * Pide la cuenta de administrador (+ código 2FA si aplica) una vez y reproduce
 * la música guardada en el servidor del portal. Solo tú.
 */
const API = 'https://app.quuantica.com';

export default function SpotyPlayer({ asPage = false }: { asPage?: boolean }) {
  const [open, setOpen] = useState(asPage);
  const [token, setToken] = useState<string | null>(null);
  const [pin, setPin] = useState('');
  const [err, setErr] = useState('');
  const [cargando, setCargando] = useState(false);
  const [deferred, setDeferred] = useState<any>(null);
  const [instalada, setInstalada] = useState(false);
  const [ayuda, setAyuda] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOpen = () => { setToken(null); setPin(''); setErr(''); setOpen(true); };
    window.addEventListener('spq-open', onOpen);
    (window as any).__spqClose = () => { if (!asPage) setOpen(false); };
    const onBip = (e: any) => { e.preventDefault(); setDeferred(e); };
    const onInst = () => { setInstalada(true); setDeferred(null); };
    window.addEventListener('beforeinstallprompt', onBip);
    window.addEventListener('appinstalled', onInst);
    try { if (window.matchMedia('(display-mode: standalone)').matches) setInstalada(true); } catch {}
    if (asPage && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw-spoty.js').catch(() => {});
    }
    return () => { window.removeEventListener('spq-open', onOpen); window.removeEventListener('beforeinstallprompt', onBip); window.removeEventListener('appinstalled', onInst); };
  }, [asPage]);

  async function instalar() {
    if (deferred) {
      deferred.prompt();
      try { await deferred.userChoice; } catch {}
      setDeferred(null);
    } else {
      setAyuda(true); // navegador sin instalación automática (iPhone, o Android que no lo ofrece): mostrar pasos
    }
  }
  const esIOS = typeof navigator !== 'undefined' && /iphone|ipad|ipod/i.test(navigator.userAgent);

  useEffect(() => {
    if (!open || !token || !boxRef.current) return;
    const cleanup = montarPlayer(boxRef.current, token, () => {
      try { localStorage.removeItem('spq_token'); } catch {}
      setToken(null);
    }, asPage);
    return cleanup;
  }, [open, token, asPage]);

  async function pinEntrar(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (pin.length < 4) { setErr('Escribe tu PIN de 4 dígitos'); return; }
    setErr(''); setCargando(true);
    try {
      const r = await fetch(API + '/api/musica-pin', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });
      const j = await r.json();
      if (r.ok && j.token) { setToken(j.token); setPin(''); }
      else { setErr(j.error || 'PIN incorrecto'); setPin(''); }
    } catch { setErr('No hay conexión con el servidor'); }
    setCargando(false);
  }

  if (!open) return null;

  const inputStyle: React.CSSProperties = { width: '100%', padding: '12px 14px', marginBottom: 10, borderRadius: 6, border: '1px solid #333', background: '#2a2a2a', color: '#fff', fontSize: 14, boxSizing: 'border-box', outline: 'none' };

  return (
    <div
      onClick={(e) => { if (!asPage && e.target === e.currentTarget) setOpen(false); }}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: asPage ? '#121212' : 'rgba(0,0,0,.7)', display: 'flex', alignItems: asPage ? 'stretch' : 'center', justifyContent: 'center', padding: asPage ? 0 : '1rem', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,system-ui,sans-serif' }}
    >
      {!instalada && (
        <button onClick={instalar}
          style={{ position: 'fixed', top: 12, left: '50%', transform: 'translateX(-50%)', zIndex: 10003, background: '#1DB954', color: '#000', border: 'none', borderRadius: 22, padding: '9px 18px', fontSize: 12.5, fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,0,0,.5)' }}>
          📲 Instalar app
        </button>
      )}
      {ayuda && (
        <div onClick={(e) => { if (e.target === e.currentTarget) setAyuda(false); }}
          style={{ position: 'fixed', inset: 0, zIndex: 10004, background: 'rgba(0,0,0,.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#181818', borderRadius: 12, maxWidth: 340, width: '100%', padding: '1.4rem', color: '#fff' }}>
            <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 10 }}>📲 Instalar en tu celular</div>
            {esIOS ? (
              <div style={{ fontSize: 13.5, lineHeight: 1.6, color: '#d0d0d0' }}>
                En iPhone (Safari):<br />
                1. Toca el botón <b>Compartir</b> (el cuadro con la flecha ↑) abajo.<br />
                2. Baja y toca <b>“Agregar a inicio”</b>.<br />
                3. Confirma <b>“Agregar”</b>. Quedará el ícono <b>Spoty-Q</b> en tu pantalla.
              </div>
            ) : (
              <div style={{ fontSize: 13.5, lineHeight: 1.6, color: '#d0d0d0' }}>
                En Android (Chrome):<br />
                1. Abre el menú <b>⋮</b> (arriba a la derecha).<br />
                2. Toca <b>“Instalar aplicación”</b> o <b>“Agregar a pantalla de inicio”</b>.<br />
                3. Confirma. Quedará el ícono <b>Spoty-Q</b> en tu pantalla.
              </div>
            )}
            <button onClick={() => setAyuda(false)}
              style={{ width: '100%', marginTop: 16, padding: 11, borderRadius: 22, border: 'none', background: '#1DB954', color: '#000', fontWeight: 800, fontSize: 13.5, cursor: 'pointer' }}>Entendido</button>
          </div>
        </div>
      )}
      {!token ? (
        <form onSubmit={pinEntrar} style={{ background: '#181818', borderRadius: 12, width: '100%', maxWidth: 340, padding: '2rem 1.6rem', color: '#fff', boxShadow: '0 30px 80px -30px #000' }}>
          <div style={{ textAlign: 'center', marginBottom: 6 }}>
            <div style={{ width: 54, height: 54, margin: '0 auto', borderRadius: 12, background: 'linear-gradient(135deg,#1DB954,#0c6b30)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>🎵</div>
          </div>
          <div style={{ fontSize: 21, fontWeight: 800, textAlign: 'center', marginTop: 10 }}>Spoty-Quuantica</div>
          <div style={{ fontSize: 12.5, color: '#b3b3b3', textAlign: 'center', marginBottom: 20 }}>Escribe tu PIN para entrar</div>
          <input value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))} onFocus={() => setErr('')}
            type="password" inputMode="numeric" autoComplete="off" placeholder="••••" autoFocus
            style={{ ...inputStyle, fontSize: 30, letterSpacing: '.6em', textAlign: 'center', padding: '14px 14px' }} />
          {err && <div style={{ fontSize: 12, color: '#ff6b6b', marginBottom: 10, textAlign: 'center' }}>{err}</div>}
          <button type="submit" disabled={cargando || pin.length < 4}
            style={{ width: '100%', padding: 13, borderRadius: 24, border: 'none', background: pin.length < 4 ? '#155e34' : '#1DB954', color: '#000', fontWeight: 800, fontSize: 14, cursor: pin.length < 4 ? 'default' : 'pointer', marginTop: 4 }}>
            {cargando ? 'Entrando…' : 'Entrar a mi música'}
          </button>
          {!asPage && (
            <button type="button" onClick={() => setOpen(false)}
              style={{ width: '100%', padding: 10, marginTop: 10, borderRadius: 24, border: '1px solid #333', background: 'none', color: '#b3b3b3', fontSize: 13, cursor: 'pointer' }}>Cerrar</button>
          )}
        </form>
      ) : (
        <div ref={boxRef} style={{ width: '100%', maxWidth: asPage ? '100%' : 620, height: asPage ? '100%' : '86vh' }} />
      )}
    </div>
  );
}

/* ── Reproductor estilo Spotify (vanilla), apuntando al servidor del portal ── */
function montarPlayer(root: HTMLDivElement, token: string, onAuthFail: () => void, asPage = false): () => void {
  const w = window as any;
  let COLA: any[] = [], VISTA: any[] = [], LISTAS: any[] = [], vista = 'bib', idx = -1, shuffle = false, repeat = false;
  let motor = 'audio', ytPlayer: any = null, tickTimer: any = null;
  const audio = new Audio(); audio.preload = 'metadata'; audio.volume = 0.9;
  const esYT = (c: any) => c && c.tipo === 'youtube' && c.youtube_id;
  const sonando = () => motor === 'yt' ? !!(ytPlayer && ytPlayer.getPlayerState && ytPlayer.getPlayerState() === 1) : !audio.paused;
  function ytId(url: string): string | null {
    const s = String(url || '').trim(); let m: any;
    if ((m = s.match(/[?&]v=([\w-]{11})/))) return m[1];
    if ((m = s.match(/youtu\.be\/([\w-]{11})/))) return m[1];
    if ((m = s.match(/\/shorts\/([\w-]{11})/))) return m[1];
    if ((m = s.match(/\/embed\/([\w-]{11})/))) return m[1];
    if (/^[\w-]{11}$/.test(s)) return s;
    return null;
  }
  const esc = (s: any) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' } as any)[c]);
  const fmt = (s: number) => { s = Math.floor(s || 0); const m = Math.floor(s / 60), x = s % 60; return m + ':' + (x < 10 ? '0' : '') + x; };
  const H = () => ({ Authorization: 'Bearer ' + token });
  const HJ = () => ({ Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' });
  const api = (p: string) => API + p;
  async function jget(p: string) { const r = await fetch(api(p), { headers: H() }); if (r.status === 401) { onAuthFail(); throw new Error('auth'); } return r.json(); }
  function cover(t: string, size = 44) {
    let h = 0; const s = String(t || '?'); for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    const hue = h % 360;
    return '<div style="width:' + size + 'px;height:' + size + 'px;border-radius:5px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:' + Math.round(size * .42) + 'px;color:rgba(255,255,255,.85);background:linear-gradient(135deg,hsl(' + hue + ',52%,42%),hsl(' + ((hue + 45) % 360) + ',58%,24%));">♪</div>';
  }

  if (!document.getElementById('spq-style')) {
    const st = document.createElement('style'); st.id = 'spq-style';
    st.textContent =
      '.spq-row{display:flex;align-items:center;gap:12px;padding:7px 8px;border-radius:6px;cursor:pointer;transition:background .15s;}' +
      '.spq-row:hover{background:#1e1e1e;}' +
      '.spq-row .spq-actions{opacity:0;transition:opacity .15s;display:flex;align-items:center;gap:2px;}' +
      '.spq-row:hover .spq-actions{opacity:1;}' +
      '.spq-ib{background:none;border:none;cursor:pointer;padding:4px;border-radius:50%;line-height:1;font-size:13px;color:#b3b3b3;}' +
      '.spq-ib:hover{color:#fff;transform:scale(1.12);}' +
      '.spq-chip{white-space:nowrap;padding:6px 14px;border-radius:20px;font-size:12.5px;font-weight:600;cursor:pointer;border:none;transition:background .15s,color .15s;}' +
      '.spq-eq{display:inline-flex;align-items:flex-end;gap:2px;height:16px;width:18px;}' +
      '.spq-eq i{width:3px;background:#1DB954;border-radius:1px;animation:spqeq .95s ease-in-out infinite;}' +
      '.spq-eq i:nth-child(2){animation-delay:.32s;} .spq-eq i:nth-child(3){animation-delay:.64s;}' +
      '@keyframes spqeq{0%,100%{height:4px;}50%{height:16px;}}' +
      '.spq-pp{background:#fff;border:none;color:#000;width:44px;height:44px;border-radius:50%;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .12s;}' +
      '.spq-pp:hover{transform:scale(1.06);}' +
      '.spq-ctl{background:none;border:none;color:#b3b3b3;font-size:18px;cursor:pointer;}' +
      '.spq-ctl:hover{color:#fff;}' +
      '.spq-rng{-webkit-appearance:none;appearance:none;height:4px;border-radius:2px;background:#4d4d4d;cursor:pointer;outline:none;}' +
      '.spq-rng::-webkit-slider-thumb{-webkit-appearance:none;width:12px;height:12px;border-radius:50%;background:#fff;}' +
      '.spq-rng:hover{background:#5a5a5a;}' +
      '.spq-bib::-webkit-scrollbar{width:8px;} .spq-bib::-webkit-scrollbar-thumb{background:#333;border-radius:4px;}';
    document.head.appendChild(st);
  }

  root.innerHTML =
    '<div style="background:#121212;' + (asPage ? 'height:100vh;max-height:100vh;border-radius:0;' : 'height:100%;border-radius:12px;') + 'width:100%;display:flex;flex-direction:column;overflow:hidden;color:#fff;box-shadow:0 30px 80px -30px #000;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,system-ui,sans-serif;">' +
      // top bar
      '<div style="display:flex;align-items:center;gap:10px;padding:14px 16px 10px;">' +
        '<div style="width:30px;height:30px;border-radius:7px;background:linear-gradient(135deg,#1DB954,#0c6b30);display:flex;align-items:center;justify-content:center;font-size:15px;">🎵</div>' +
        '<div style="flex:1;font-size:16px;font-weight:800;letter-spacing:-.02em;">Spoty-Quuantica</div>' +
        '<button onclick="spqYoutube()" style="padding:7px 12px;font-size:12px;font-weight:700;background:#ff0000;color:#fff;border:none;border-radius:20px;cursor:pointer;white-space:nowrap;">＋ YouTube</button>' +
        '<label style="padding:7px 12px;font-size:12px;font-weight:700;background:#1DB954;color:#000;border-radius:20px;cursor:pointer;white-space:nowrap;">＋ Subir<input type="file" accept="audio/*" multiple style="display:none;" onchange="spqSubir(this)"></label>' +
        (asPage ? '' : '<button onclick="window.__spqClose&&window.__spqClose()" style="background:none;border:none;color:#b3b3b3;font-size:20px;cursor:pointer;padding:2px 6px;">✕</button>') +
      '</div>' +
      // área de video (aparece solo cuando suena un enlace de YouTube)
      '<div id="spq-video" style="display:none;background:#000;padding:0 16px 8px;"><div style="position:relative;width:100%;aspect-ratio:16/9;border-radius:10px;overflow:hidden;background:#000;"><div id="spq-yt" style="position:absolute;inset:0;width:100%;height:100%;"></div></div></div>' +
      // chips
      '<div id="spq-chips" style="display:flex;gap:8px;overflow-x:auto;padding:4px 16px 12px;"></div>' +
      // header (playlist banner)
      '<div id="spq-head" style="padding:0 16px;"></div>' +
      // tracks
      '<div id="spq-bib" class="spq-bib" style="flex:1;overflow-y:auto;padding:2px 10px 12px;"></div>' +
      // now playing bar
      '<div style="background:#181818;border-top:1px solid #282828;padding:10px 14px;">' +
        '<div style="display:flex;align-items:center;gap:10px;">' +
          '<div id="spq-nowcov">' + cover('', 44) + '</div>' +
          '<div style="flex:1;min-width:0;"><div id="spq-tit" style="font-size:13px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Nada sonando</div><div id="spq-art" style="font-size:11px;color:#b3b3b3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"></div></div>' +
          '<div style="display:flex;align-items:center;gap:2px;">🔊<input id="spq-vol" class="spq-rng" type="range" min="0" max="100" value="90" style="width:64px;margin-left:4px;"></div>' +
        '</div>' +
        '<div style="display:flex;align-items:center;justify-content:center;gap:18px;margin-top:8px;">' +
          '<button id="spq-shuf" class="spq-ctl" onclick="spqShuffle()" title="Aleatorio" style="font-size:15px;">🔀</button>' +
          '<button class="spq-ctl" onclick="spqPrev()">⏮</button>' +
          '<button id="spq-pp" class="spq-pp" onclick="spqPlayPause()">▶</button>' +
          '<button class="spq-ctl" onclick="spqNext()">⏭</button>' +
          '<button id="spq-rep" class="spq-ctl" onclick="spqRepeat()" title="Repetir" style="font-size:15px;">🔁</button>' +
        '</div>' +
        '<div style="display:flex;align-items:center;gap:8px;margin-top:6px;">' +
          '<span id="spq-cur" style="font-size:10px;color:#b3b3b3;min-width:30px;text-align:right;">0:00</span>' +
          '<input id="spq-seek" class="spq-rng" type="range" min="0" max="1000" value="0" style="flex:1;">' +
          '<span id="spq-dur" style="font-size:10px;color:#b3b3b3;min-width:30px;">0:00</span>' +
        '</div>' +
      '</div>' +
    '</div>';

  const $ = (id: string) => root.querySelector('#' + id) as any;
  audio.ontimeupdate = () => { const sk = $('spq-seek'), cu = $('spq-cur'); if (sk && audio.duration) { const p = audio.currentTime / audio.duration * 1000; sk.value = String(Math.round(p)); sk.style.background = 'linear-gradient(90deg,#1DB954 ' + (p / 10) + '%,#4d4d4d ' + (p / 10) + '%)'; } if (cu) cu.textContent = fmt(audio.currentTime); };
  audio.onloadedmetadata = () => { const d = $('spq-dur'); if (d) d.textContent = fmt(audio.duration); };
  audio.onended = () => { if (repeat) { audio.currentTime = 0; audio.play(); } else w.spqNext(); };
  audio.onplay = () => { const p = $('spq-pp'); if (p) p.textContent = '⏸'; render(); };
  audio.onpause = () => { const p = $('spq-pp'); if (p) p.textContent = '▶'; render(); };
  ($('spq-seek') as HTMLInputElement).oninput = function (this: HTMLInputElement) {
    if (motor === 'yt') { if (ytPlayer && ytPlayer.getDuration) { const d = ytPlayer.getDuration(); if (d) ytPlayer.seekTo(d * (+this.value) / 1000, true); } }
    else if (audio.duration) audio.currentTime = (+this.value) / 1000 * audio.duration;
  };
  const vol = $('spq-vol') as HTMLInputElement; vol.style.background = 'linear-gradient(90deg,#fff 90%,#4d4d4d 90%)';
  vol.oninput = function (this: HTMLInputElement) { audio.volume = (+this.value) / 100; try { if (ytPlayer && ytPlayer.setVolume) ytPlayer.setVolume(+this.value); } catch {} this.style.background = 'linear-gradient(90deg,#fff ' + this.value + '%,#4d4d4d ' + this.value + '%)'; };

  function pintarActual() {
    const t = $('spq-tit'), a = $('spq-art'), nc = $('spq-nowcov');
    if (idx >= 0 && COLA[idx]) { if (t) t.textContent = COLA[idx].titulo; if (a) a.textContent = COLA[idx].artista || ''; if (nc) nc.innerHTML = cover(COLA[idx].titulo, 44); }
    else { if (t) t.textContent = 'Nada sonando'; if (a) a.textContent = ''; if (nc) nc.innerHTML = cover('', 44); }
  }
  function showVideo(on: boolean) { const v = $('spq-video'); if (v) v.style.display = on ? 'block' : 'none'; }
  function startTick() { stopTick(); tickTimer = setInterval(() => {
    if (motor !== 'yt' || !ytPlayer || !ytPlayer.getDuration) return;
    const d = ytPlayer.getDuration(), t = ytPlayer.getCurrentTime ? ytPlayer.getCurrentTime() : 0;
    const sk = $('spq-seek'), cu = $('spq-cur'), du = $('spq-dur');
    if (sk && d) { const p = t / d * 1000; sk.value = String(Math.round(p)); sk.style.background = 'linear-gradient(90deg,#1DB954 ' + (p / 10) + '%,#4d4d4d ' + (p / 10) + '%)'; }
    if (cu) cu.textContent = fmt(t); if (du && d) du.textContent = fmt(d);
  }, 500); }
  function stopTick() { if (tickTimer) { clearInterval(tickTimer); tickTimer = null; } }
  function ytEnsure(): Promise<void> {
    return new Promise((resolve) => {
      if (w.YT && w.YT.Player) { resolve(); return; }
      if (!document.getElementById('spq-yt-api')) { const s = document.createElement('script'); s.id = 'spq-yt-api'; s.src = 'https://www.youtube.com/iframe_api'; document.head.appendChild(s); }
      const t = setInterval(() => { if (w.YT && w.YT.Player) { clearInterval(t); resolve(); } }, 150);
      setTimeout(() => { clearInterval(t); resolve(); }, 10000);
    });
  }
  async function ytPlay(vid: string) {
    await ytEnsure(); if (!w.YT || !w.YT.Player) { const b = $('spq-bib'); if (b) b.insertAdjacentHTML('afterbegin', '<div style="color:#e88;font-size:12px;padding:.6rem 1rem;">No se pudo cargar YouTube (¿sin internet?).</div>'); return; }
    showVideo(true);
    if (!ytPlayer) {
      ytPlayer = new w.YT.Player('spq-yt', {
        width: '100%', height: '100%', videoId: vid,
        playerVars: { autoplay: 1, playsinline: 1, rel: 0, modestbranding: 1 },
        events: {
          onReady: (e: any) => { try { e.target.setVolume(Math.round(audio.volume * 100)); } catch {} try { e.target.playVideo(); } catch {} },
          onStateChange: (e: any) => {
            const pp = $('spq-pp'); if (pp) pp.textContent = e.data === 1 ? '⏸' : '▶';
            if (e.data === w.YT.PlayerState.ENDED) { if (repeat) { try { ytPlayer.seekTo(0); ytPlayer.playVideo(); } catch {} } else w.spqNext(); }
            render();
          },
        },
      });
    } else { try { ytPlayer.loadVideoById(vid); } catch {} }
  }
  function tocar(i: number) {
    idx = i; const c = COLA[i];
    if (esYT(c)) { motor = 'yt'; try { audio.pause(); } catch {} ytPlay(c.youtube_id); startTick(); }
    else {
      motor = 'audio'; stopTick(); showVideo(false);
      try { if (ytPlayer && ytPlayer.pauseVideo) ytPlayer.pauseVideo(); } catch {}
      audio.src = api('/api/musica/' + c.id + '/stream?token=' + encodeURIComponent(token)); audio.play().catch(() => {});
    }
    pintarActual(); render();
  }

  async function listasCargar() {
    try { const j = await jget('/api/musica-listas'); LISTAS = j.listas || []; } catch { LISTAS = []; }
    const ch = $('spq-chips'); if (!ch) return;
    const chip = (id: string, txt: string, act: boolean) => '<button class="spq-chip" onclick="spqVer(\'' + id + '\')" style="background:' + (act ? '#1DB954' : '#2a2a2a') + ';color:' + (act ? '#000' : '#fff') + ';">' + txt + '</button>';
    ch.innerHTML = chip('bib', 'Biblioteca', vista === 'bib') +
      LISTAS.map((l) => chip(l.id, esc(l.nombre), vista === l.id)).join('') +
      '<button class="spq-chip" onclick="spqNuevaLista()" style="background:#2a2a2a;color:#b3b3b3;">＋ Nueva lista</button>';
  }

  async function render() {
    const b = $('spq-bib'), head = $('spq-head'); if (!b) return; if (head) head.innerHTML = '';
    try {
      let titulo = 'Tu biblioteca';
      if (vista === 'bib') {
        const j = await jget('/api/musica'); VISTA = j.canciones || [];
      } else {
        const l = LISTAS.find((x) => x.id === vista); titulo = l ? l.nombre : 'Lista';
        const jj = await jget('/api/musica-listas/' + vista); VISTA = jj.canciones || [];
      }
      let h = 0; for (let i = 0; i < titulo.length; i++) h = (h * 31 + titulo.charCodeAt(i)) >>> 0; const hue = h % 360;
      if (head) head.innerHTML =
        '<div style="display:flex;align-items:flex-end;gap:14px;padding:8px 6px 14px;background:linear-gradient(180deg,hsla(' + hue + ',50%,30%,.55),transparent);border-radius:10px;margin-bottom:6px;">' +
          '<div style="width:78px;height:78px;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;font-size:34px;color:rgba(255,255,255,.9);background:linear-gradient(135deg,hsl(' + hue + ',52%,42%),hsl(' + ((hue + 45) % 360) + ',58%,24%));">' + (vista === 'bib' ? '🎵' : '📃') + '</div>' +
          '<div style="flex:1;min-width:0;"><div style="font-size:11px;color:#b3b3b3;text-transform:uppercase;letter-spacing:.06em;font-weight:700;">' + (vista === 'bib' ? 'Biblioteca' : 'Lista') + '</div>' +
            '<div style="font-size:24px;font-weight:800;letter-spacing:-.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + esc(titulo) + '</div>' +
            '<div style="font-size:11.5px;color:#b3b3b3;margin-top:2px;">' + VISTA.length + ' canción' + (VISTA.length === 1 ? '' : 'es') + '</div></div>' +
          (VISTA.length ? '<button onclick="' + (vista === 'bib' ? 'spqPlayVista(0)' : 'spqReproducirLista()') + '" style="width:50px;height:50px;border-radius:50%;background:#1DB954;border:none;color:#000;font-size:20px;cursor:pointer;box-shadow:0 8px 20px rgba(29,185,84,.4);">▶</button>' : '') +
        '</div>' +
        (vista !== 'bib' ? '<div style="display:flex;gap:8px;padding:0 6px 8px;"><button class="spq-ib" onclick="spqRenombrarLista()" style="font-size:11px;color:#b3b3b3;border:1px solid #333;border-radius:16px;padding:4px 12px;">✏️ Renombrar</button><button class="spq-ib" onclick="spqBorrarLista()" style="font-size:11px;color:#e88;border:1px solid #533;border-radius:16px;padding:4px 12px;">🗑 Borrar lista</button></div>' : '');

      if (!VISTA.length) {
        b.innerHTML = '<div style="color:#b3b3b3;font-size:13px;padding:2rem 1rem;text-align:center;">' + (vista === 'bib' ? 'Tu biblioteca está vacía.<br>Toca <b style="color:#1DB954;">＋ Subir</b> para agregar tus canciones.' : 'Esta lista está vacía.<br>Agrega canciones desde la Biblioteca con ＋.') + '</div>';
        return;
      }
      const enBib = vista === 'bib';
      b.innerHTML = VISTA.map((c, i) => {
        const son = idx >= 0 && COLA[idx] && COLA[idx].id === c.id;
        const left = son
          ? '<div style="width:44px;height:44px;position:relative;flex-shrink:0;">' + cover(c.titulo, 44) + '<div style="position:absolute;inset:0;background:rgba(0,0,0,.45);border-radius:5px;display:flex;align-items:center;justify-content:center;">' + (!sonando() ? '<span style="color:#1DB954;font-size:14px;">▶</span>' : '<span class="spq-eq"><i></i><i></i><i></i></span>') + '</div></div>'
          : cover(c.titulo, 44);
        const acc = enBib
          ? '<button class="spq-ib" onclick="event.stopPropagation();spqAgregarMenu(\'' + c.id + '\',event)" title="Agregar a lista">＋</button><button class="spq-ib" onclick="event.stopPropagation();spqBorrar(\'' + c.id + '\')" title="Eliminar">🗑</button>'
          : '<button class="spq-ib" onclick="event.stopPropagation();spqMover(\'' + c.id + '\',-1)" title="Subir">▲</button><button class="spq-ib" onclick="event.stopPropagation();spqMover(\'' + c.id + '\',1)" title="Bajar">▼</button><button class="spq-ib" onclick="event.stopPropagation();spqQuitarDeLista(\'' + c.id + '\')" title="Quitar">✕</button>';
        return '<div class="spq-row" onclick="spqPlayVista(' + i + ')">' + left +
          '<div style="flex:1;min-width:0;"><div style="font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:' + (son ? '#1DB954' : '#fff') + ';">' + esc(c.titulo) + '</div><div style="font-size:11.5px;color:#b3b3b3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + esc(c.artista || '—') + (c.album ? ' • ' + esc(c.album) : '') + '</div></div>' +
          '<span style="font-size:11px;color:#b3b3b3;">' + (c.duracion ? fmt(c.duracion) : '') + '</span>' +
          '<div class="spq-actions">' + acc + '</div></div>';
      }).join('');
    } catch (e) { if (b && (e as any).message !== 'auth') b.innerHTML = '<div style="color:#e88;font-size:12px;padding:1rem;">Error al cargar.</div>'; }
  }

  // handlers globales (los usan los onclick del HTML)
  w.spqVer = (v: string) => { vista = v; listasCargar(); render(); };
  w.spqPlayVista = (i: number) => { if (i < 0 || i >= VISTA.length) return; COLA = VISTA.slice(); tocar(i); };
  w.spqReproducirLista = () => { if (VISTA.length) { COLA = VISTA.slice(); tocar(0); } };
  w.spqPlayPause = () => {
    if (idx < 0 && VISTA.length) { w.spqPlayVista(0); return; }
    if (motor === 'yt' && ytPlayer) { try { if (ytPlayer.getPlayerState() === 1) ytPlayer.pauseVideo(); else ytPlayer.playVideo(); } catch {} return; }
    if (audio.paused) audio.play(); else audio.pause();
  };
  w.spqYoutube = async () => {
    const url = prompt('Pega el enlace de YouTube de la canción (o su ID):'); if (!url) return;
    const vid = ytId(url); if (!vid) { alert('No reconocí el enlace. Copia el enlace completo del video de YouTube.'); return; }
    const titulo = prompt('Nombre de la canción:', ''); if (!titulo || !titulo.trim()) return;
    const artista = (prompt('Artista (opcional):', '') || '').trim();
    try {
      const r = await fetch(api('/api/musica-youtube'), { method: 'POST', headers: HJ(), body: JSON.stringify({ youtubeId: vid, titulo: titulo.trim(), artista }) });
      if (!r.ok) { const j = await r.json().catch(() => ({})); alert('No se pudo agregar: ' + ((j as any).error || r.status)); return; }
      vista = 'bib'; listasCargar(); render();
    } catch { alert('No hay conexión con el servidor'); }
  };
  w.spqNext = () => { if (!COLA.length) return; tocar(shuffle ? Math.floor(Math.random() * COLA.length) : (idx + 1) % COLA.length); };
  w.spqPrev = () => { if (!COLA.length) return; if (audio.currentTime > 3) { audio.currentTime = 0; return; } tocar((idx - 1 + COLA.length) % COLA.length); };
  w.spqShuffle = () => { shuffle = !shuffle; const x = $('spq-shuf'); if (x) x.style.color = shuffle ? '#1DB954' : '#b3b3b3'; };
  w.spqRepeat = () => { repeat = !repeat; const x = $('spq-rep'); if (x) x.style.color = repeat ? '#1DB954' : '#b3b3b3'; };
  w.spqNuevaLista = async () => { const n = prompt('Nombre de la nueva lista:'); if (!n) return; try { const r = await fetch(api('/api/musica-listas'), { method: 'POST', headers: HJ(), body: JSON.stringify({ nombre: n }) }); if (r.ok) { vista = (await r.json()).lista.id; listasCargar(); render(); } } catch {} };
  w.spqRenombrarLista = async () => { const l = LISTAS.find((x) => x.id === vista); if (!l) return; const n = prompt('Nuevo nombre:', l.nombre); if (!n) return; try { if ((await fetch(api('/api/musica-listas/' + vista), { method: 'PUT', headers: HJ(), body: JSON.stringify({ nombre: n }) })).ok) { listasCargar(); render(); } } catch {} };
  w.spqBorrarLista = async () => { const l = LISTAS.find((x) => x.id === vista); if (!l) return; if (!confirm('¿Borrar la lista "' + l.nombre + '"? (las canciones NO se borran)')) return; try { if ((await fetch(api('/api/musica-listas/' + vista), { method: 'DELETE', headers: H() })).ok) { vista = 'bib'; listasCargar(); render(); } } catch {} };
  w.spqQuitarDeLista = async (cid: string) => { try { await fetch(api('/api/musica-listas/' + vista + '/quitar'), { method: 'POST', headers: HJ(), body: JSON.stringify({ cancionId: cid }) }); listasCargar(); render(); } catch {} };
  w.spqMover = async (cid: string, dir: number) => { const ids = VISTA.map((x) => x.id); const i = ids.indexOf(cid), j = i + dir; if (i < 0 || j < 0 || j >= ids.length) return; ids.splice(j, 0, ids.splice(i, 1)[0]); try { await fetch(api('/api/musica-listas/' + vista + '/orden'), { method: 'PUT', headers: HJ(), body: JSON.stringify({ orden: ids }) }); render(); } catch {} };
  w.spqAgregarMenu = (cid: string, ev: any) => {
    if (ev) ev.stopPropagation();
    const old = document.getElementById('spq-menu'); if (old) old.remove();
    const m = document.createElement('div'); m.id = 'spq-menu';
    m.style.cssText = 'position:fixed;z-index:10002;background:#282828;border:1px solid #3a3a3a;border-radius:8px;padding:.35rem;box-shadow:0 10px 30px rgba(0,0,0,.7);min-width:180px;max-height:260px;overflow:auto;';
    const x = (ev && ev.clientX) || 200, y = (ev && ev.clientY) || 200;
    m.style.left = Math.min(x, window.innerWidth - 190) + 'px'; m.style.top = Math.min(y, window.innerHeight - 270) + 'px';
    let html = '<div style="font-size:10.5px;color:#b3b3b3;padding:.3rem .6rem;">Agregar a…</div>';
    html += LISTAS.map((l) => '<button onclick="spqAgregarA(\'' + cid + '\',\'' + l.id + '\')" style="display:block;width:100%;text-align:left;background:none;border:none;color:#fff;font-size:12.5px;padding:.5rem .6rem;border-radius:5px;cursor:pointer;">📃 ' + esc(l.nombre) + '</button>').join('');
    if (!LISTAS.length) html += '<div style="font-size:11px;color:#888;padding:.3rem .6rem;">No tienes listas.</div>';
    html += '<button onclick="spqAgregarA(\'' + cid + '\',\'__nueva__\')" style="display:block;width:100%;text-align:left;background:none;border:none;color:#1DB954;font-size:12.5px;padding:.5rem .6rem;border-top:1px solid #3a3a3a;cursor:pointer;">＋ Nueva lista…</button>';
    m.innerHTML = html; document.body.appendChild(m);
    setTimeout(() => document.addEventListener('click', function cerrar() { const e = document.getElementById('spq-menu'); if (e) e.remove(); document.removeEventListener('click', cerrar); }), 10);
  };
  w.spqAgregarA = async (cid: string, lid: string) => {
    const e = document.getElementById('spq-menu'); if (e) e.remove();
    if (lid === '__nueva__') { const n = prompt('Nombre de la nueva lista:'); if (!n) return; try { const r = await fetch(api('/api/musica-listas'), { method: 'POST', headers: HJ(), body: JSON.stringify({ nombre: n }) }); if (!r.ok) return; lid = (await r.json()).lista.id; } catch { return; } }
    try { await fetch(api('/api/musica-listas/' + lid + '/agregar'), { method: 'POST', headers: HJ(), body: JSON.stringify({ cancionId: cid }) }); listasCargar(); } catch {}
  };
  w.spqBorrar = async (id: string) => { const c = VISTA.find((x) => x.id === id); if (!confirm('¿Eliminar "' + (c ? c.titulo : '') + '" de tu biblioteca?')) return; try { if ((await fetch(api('/api/musica/' + id), { method: 'DELETE', headers: H() })).ok) { if (COLA[idx] && COLA[idx].id === id) { audio.pause(); idx = -1; pintarActual(); } listasCargar(); render(); } } catch {} };
  w.spqSubir = async (inp: HTMLInputElement) => { const files = inp.files; if (!files || !files.length) return; for (let k = 0; k < files.length; k++) await subirUno(files[k]); inp.value = ''; render(); };
  function subirUno(file: File) {
    return new Promise<void>((res) => {
      const ext = (file.name.split('.').pop() || 'mp3').toLowerCase(); const titulo = file.name.replace(/\.[^.]+$/, '');
      const tmp = document.createElement('audio'); tmp.preload = 'metadata'; const url = URL.createObjectURL(file); tmp.src = url; let hecho = false;
      const finish = async (dur: number) => {
        if (hecho) return; hecho = true; URL.revokeObjectURL(url);
        try {
          const q = '?titulo=' + encodeURIComponent(titulo) + '&ext=' + encodeURIComponent(ext) + (dur ? '&dur=' + Math.round(dur) : '');
          const r = await fetch(api('/api/musica' + q), { method: 'POST', headers: { Authorization: 'Bearer ' + token, 'Content-Type': (file.type || 'application/octet-stream') }, body: file });
          if (!r.ok) { const j = await r.json().catch(() => ({})); alert('No se pudo subir "' + file.name + '": ' + (j.error || r.status)); }
        } catch { alert('Error subiendo "' + file.name + '"'); }
        res();
      };
      tmp.onloadedmetadata = () => finish(tmp.duration); tmp.onerror = () => finish(0); setTimeout(() => finish(tmp.duration || 0), 4000);
    });
  }

  pintarActual(); listasCargar(); render();
  return () => { try { audio.pause(); audio.src = ''; } catch {}; stopTick(); try { if (ytPlayer && ytPlayer.destroy) ytPlayer.destroy(); } catch {}; ytPlayer = null; const m = document.getElementById('spq-menu'); if (m) m.remove(); };
}
