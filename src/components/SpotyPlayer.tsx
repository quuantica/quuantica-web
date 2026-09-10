'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Spoty-Quuantica — reproductor personal embebido en quuantica.com.
 * Se abre con el ícono 🔊 del header (evento 'spq-open'). Pide la clave de
 * administrador una sola vez (queda recordada en este navegador) y reproduce
 * la música guardada en el servidor del portal, SIN salir de la web. Solo tú.
 */
const API = 'https://app.quuantica.com';

export default function SpotyPlayer({ asPage = false }: { asPage?: boolean }) {
  const [open, setOpen] = useState(asPage);
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [codigo, setCodigo] = useState('');
  const [mfa, setMfa] = useState(false);
  const [err, setErr] = useState('');
  const [cargando, setCargando] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try { const t = localStorage.getItem('spq_token'); if (t) setToken(t); } catch {}
    const onOpen = () => setOpen(true);
    window.addEventListener('spq-open', onOpen);
    (window as any).__spqClose = () => { if (!asPage) setOpen(false); };
    if (asPage && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw-spoty.js').catch(() => {});
    }
    return () => window.removeEventListener('spq-open', onOpen);
  }, [asPage]);

  useEffect(() => {
    if (!open || !token || !boxRef.current) return;
    const cleanup = montarPlayer(boxRef.current, token, () => {
      try { localStorage.removeItem('spq_token'); } catch {}
      setToken(null);
    }, asPage);
    return cleanup;
  }, [open, token, asPage]);

  async function login(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setErr(''); setCargando(true);
    try {
      const r = await fetch(API + '/api/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password: pass, codigo: codigo.trim() || undefined }),
      });
      const j = await r.json();
      if (r.ok && j.token) {
        if (j.usuario?.rol !== 'admin') { setErr('Este reproductor es solo para tu cuenta de administrador.'); setCargando(false); return; }
        try { localStorage.setItem('spq_token', j.token); } catch {}
        setToken(j.token); setPass(''); setCodigo(''); setMfa(false);
      } else if (j.mfaRequerido) {
        setMfa(true);
        setErr(codigo.trim() ? (j.error || 'El código no es correcto') : '');
      } else setErr(j.error || 'No se pudo ingresar');
    } catch { setErr('No hay conexión con el servidor'); }
    setCargando(false);
  }

  if (!open) return null;

  return (
    <div
      onClick={(e) => { if (!asPage && e.target === e.currentTarget) setOpen(false); }}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: asPage ? '#0a0d10' : 'rgba(0,0,0,.62)', display: 'flex', alignItems: asPage ? 'stretch' : 'center', justifyContent: 'center', padding: asPage ? 0 : '1rem', fontFamily: 'system-ui,sans-serif' }}
    >
      {!token ? (
        <form onSubmit={login} style={{ background: '#0e1114', border: '1px solid rgba(29,185,84,.3)', borderRadius: 16, width: '100%', maxWidth: 340, padding: '1.4rem 1.3rem', color: '#e8eef0', boxShadow: '0 30px 80px -30px #000' }}>
          <div style={{ fontSize: 22, textAlign: 'center' }}>🎵</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#1DB954', textAlign: 'center', marginTop: 4 }}>Spoty-Quuantica</div>
          <div style={{ fontSize: 11, color: '#8aa', textAlign: 'center', marginBottom: 14 }}>Ingresa con tu cuenta de administrador</div>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Correo" autoComplete="username"
            style={{ width: '100%', padding: '10px 12px', marginBottom: 8, borderRadius: 9, border: '1px solid #2a3138', background: '#0a0d10', color: '#eee', fontSize: 13, boxSizing: 'border-box' }} />
          <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Contraseña" autoComplete="current-password"
            style={{ width: '100%', padding: '10px 12px', marginBottom: 10, borderRadius: 9, border: '1px solid #2a3138', background: '#0a0d10', color: '#eee', fontSize: 13, boxSizing: 'border-box' }} />
          {mfa && (
            <>
              <div style={{ fontSize: 10.5, color: '#8aa', marginBottom: 6 }}>Tu cuenta pide segundo factor. Abre tu app de autenticación (Google Authenticator / Authy) y escribe el código de 6 dígitos.</div>
              <input value={codigo} onChange={(e) => setCodigo(e.target.value.replace(/\D/g, '').slice(0, 6))} inputMode="numeric" autoComplete="one-time-code" placeholder="Código de 6 dígitos"
                style={{ width: '100%', padding: '10px 12px', marginBottom: 10, borderRadius: 9, border: '1px solid #1DB954', background: '#0a0d10', color: '#eee', fontSize: 15, letterSpacing: '.3em', textAlign: 'center', boxSizing: 'border-box' }} />
            </>
          )}
          {err && <div style={{ fontSize: 11, color: '#f88', marginBottom: 8 }}>{err}</div>}
          <button type="submit" disabled={cargando}
            style={{ width: '100%', padding: 11, borderRadius: 10, border: 'none', background: '#1DB954', color: '#04210f', fontWeight: 800, fontSize: 13, cursor: 'pointer' }}>
            {cargando ? 'Entrando…' : 'Entrar a mi música'}
          </button>
          {!asPage && (
            <button type="button" onClick={() => setOpen(false)}
              style={{ width: '100%', padding: 8, marginTop: 8, borderRadius: 9, border: '1px solid #2a3138', background: 'none', color: '#9ab', fontSize: 12, cursor: 'pointer' }}>Cerrar</button>
          )}
        </form>
      ) : (
        <div ref={boxRef} style={{ width: '100%', maxWidth: asPage ? '100%' : 580, height: asPage ? '100%' : undefined }} />
      )}
    </div>
  );
}

/* ── Reproductor (vanilla) montado dentro de la web, apuntando al servidor del portal ── */
function montarPlayer(root: HTMLDivElement, token: string, onAuthFail: () => void, asPage = false): () => void {
  const w = window as any;
  let COLA: any[] = [], VISTA: any[] = [], LISTAS: any[] = [], vista = 'bib', idx = -1, shuffle = false, repeat = false;
  const audio = new Audio(); audio.preload = 'metadata'; audio.volume = 0.9;
  const esc = (s: any) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' } as any)[c]);
  const fmt = (s: number) => { s = Math.floor(s || 0); const m = Math.floor(s / 60), x = s % 60; return m + ':' + (x < 10 ? '0' : '') + x; };
  const H = () => ({ Authorization: 'Bearer ' + token });
  const HJ = () => ({ Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' });
  const api = (p: string) => API + p;
  async function jget(p: string) { const r = await fetch(api(p), { headers: H() }); if (r.status === 401) { onAuthFail(); throw new Error('auth'); } return r.json(); }

  root.innerHTML =
    '<div style="background:#0e1114;' + (asPage ? 'border:none;border-radius:0;height:100vh;max-height:100vh;' : 'border:1px solid rgba(29,185,84,.25);border-radius:16px;max-height:90vh;') + 'width:100%;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 30px 80px -30px #000;font-family:system-ui,sans-serif;">' +
      '<div style="background:linear-gradient(135deg,#0c1f14,#123a22);padding:.8rem 1.1rem;display:flex;align-items:center;gap:10px;">' +
        '<span style="font-size:20px;">🎵</span><div style="flex:1;"><div style="font-size:15px;font-weight:800;color:#1DB954;">Spoty-Quuantica</div><div style="font-size:10px;color:#8aa;">Tu música, en tu servidor · solo tú</div></div>' +
        '<label style="padding:6px 12px;font-size:11px;font-weight:700;background:#1DB954;color:#04210f;border-radius:20px;cursor:pointer;">➕ Subir<input type="file" accept="audio/*" multiple style="display:none;" onchange="spqSubir(this)"></label>' +
        (asPage ? '' : '<button onclick="window.__spqClose&&window.__spqClose()" style="background:none;border:1px solid #345;color:#9ab;border-radius:8px;padding:6px 11px;cursor:pointer;">✕</button>') +
      '</div>' +
      '<div id="spq-chips" style="display:flex;gap:6px;overflow-x:auto;padding:.55rem .8rem;border-bottom:1px solid #1a1f24;background:#0b0e11;"></div>' +
      '<div id="spq-head" style="padding:.4rem .8rem 0;"></div>' +
      '<div id="spq-bib" style="flex:1;overflow-y:auto;padding:.4rem .8rem .6rem;min-height:170px;"></div>' +
      '<div style="border-top:1px solid #1c2228;padding:.7rem 1rem;background:#0a0d10;">' +
        '<div style="display:flex;align-items:center;gap:.6rem;margin-bottom:.4rem;">' +
          '<div style="width:40px;height:40px;border-radius:7px;background:linear-gradient(135deg,#1DB954,#0c6b30);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🎧</div>' +
          '<div style="flex:1;min-width:0;"><div id="spq-tit" style="font-size:12px;font-weight:700;color:#eee;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Nada sonando</div><div id="spq-art" style="font-size:10px;color:#8aa;"></div></div>' +
          '<button id="spq-shuf" onclick="spqShuffle()" title="Aleatorio" style="background:none;border:none;color:#667;font-size:14px;cursor:pointer;">🔀</button>' +
          '<button id="spq-rep" onclick="spqRepeat()" title="Repetir" style="background:none;border:none;color:#667;font-size:14px;cursor:pointer;">🔁</button>' +
        '</div>' +
        '<div style="display:flex;align-items:center;gap:.6rem;">' +
          '<button onclick="spqPrev()" style="background:none;border:none;color:#cde;font-size:16px;cursor:pointer;">⏮️</button>' +
          '<button id="spq-pp" onclick="spqPlayPause()" style="background:#1DB954;border:none;color:#04210f;width:36px;height:36px;border-radius:50%;font-size:15px;cursor:pointer;">▶️</button>' +
          '<button onclick="spqNext()" style="background:none;border:none;color:#cde;font-size:16px;cursor:pointer;">⏭️</button>' +
          '<span id="spq-cur" style="font-size:10px;color:#8aa;">0:00</span>' +
          '<input id="spq-seek" type="range" min="0" max="1000" value="0" style="flex:1;accent-color:#1DB954;cursor:pointer;">' +
          '<span id="spq-dur" style="font-size:10px;color:#8aa;">0:00</span>' +
          '<span style="font-size:13px;">🔊</span><input id="spq-vol" type="range" min="0" max="100" value="90" style="width:60px;accent-color:#1DB954;cursor:pointer;">' +
        '</div>' +
      '</div>' +
    '</div>';

  const $ = (id: string) => root.querySelector('#' + id) as any;
  audio.ontimeupdate = () => { const sk = $('spq-seek'), cu = $('spq-cur'); if (sk && audio.duration) sk.value = String(Math.round(audio.currentTime / audio.duration * 1000)); if (cu) cu.textContent = fmt(audio.currentTime); };
  audio.onloadedmetadata = () => { const d = $('spq-dur'); if (d) d.textContent = fmt(audio.duration); };
  audio.onended = () => { if (repeat) { audio.currentTime = 0; audio.play(); } else w.spqNext(); };
  audio.onplay = () => { const p = $('spq-pp'); if (p) p.textContent = '⏸️'; render(); };
  audio.onpause = () => { const p = $('spq-pp'); if (p) p.textContent = '▶️'; render(); };
  ($('spq-seek') as HTMLInputElement).oninput = function (this: HTMLInputElement) { if (audio.duration) audio.currentTime = (+this.value) / 1000 * audio.duration; };
  ($('spq-vol') as HTMLInputElement).oninput = function (this: HTMLInputElement) { audio.volume = (+this.value) / 100; };

  function pintarActual() { const t = $('spq-tit'), a = $('spq-art'); if (idx >= 0 && COLA[idx]) { if (t) t.textContent = COLA[idx].titulo; if (a) a.textContent = COLA[idx].artista || ''; } else { if (t) t.textContent = 'Nada sonando'; if (a) a.textContent = ''; } }
  function tocar(i: number) { idx = i; const c = COLA[i]; audio.src = api('/api/musica/' + c.id + '/stream?token=' + encodeURIComponent(token)); audio.play().catch(() => {}); pintarActual(); render(); }

  async function listasCargar() {
    try { const j = await jget('/api/musica-listas'); LISTAS = j.listas || []; } catch { LISTAS = []; }
    const ch = $('spq-chips'); if (!ch) return;
    const chip = (id: string, txt: string, act: boolean) => '<button onclick="spqVer(\'' + id + '\')" style="white-space:nowrap;padding:5px 12px;border-radius:16px;font-size:11px;cursor:pointer;border:1px solid ' + (act ? '#1DB954' : '#2a3138') + ';background:' + (act ? 'rgba(29,185,84,.15)' : 'transparent') + ';color:' + (act ? '#1DB954' : '#9ab') + ';">' + txt + '</button>';
    ch.innerHTML = chip('bib', '🎵 Biblioteca', vista === 'bib') +
      LISTAS.map((l) => chip(l.id, '📃 ' + esc(l.nombre) + ' (' + l.n + ')', vista === l.id)).join('') +
      '<button onclick="spqNuevaLista()" style="white-space:nowrap;padding:5px 12px;border-radius:16px;font-size:11px;cursor:pointer;border:1px dashed #2a3138;background:transparent;color:#8aa;">➕ Nueva lista</button>';
  }

  async function render() {
    const b = $('spq-bib'), head = $('spq-head'); if (!b) return; if (head) head.innerHTML = '';
    try {
      if (vista === 'bib') {
        const j = await jget('/api/musica'); VISTA = j.canciones || [];
        if (!VISTA.length) { b.innerHTML = '<div style="color:#8aa;font-size:11.5px;padding:1.4rem;text-align:center;">Tu biblioteca está vacía.<br>Toca <b style="color:#1DB954;">➕ Subir</b> para agregar tus canciones.</div>'; return; }
      } else {
        const jj = await jget('/api/musica-listas/' + vista); VISTA = jj.canciones || [];
        if (head) head.innerHTML = '<div style="display:flex;align-items:center;gap:8px;margin-bottom:.3rem;"><button onclick="spqReproducirLista()" style="padding:6px 14px;background:#1DB954;color:#04210f;border:none;border-radius:16px;font-size:11px;font-weight:700;cursor:pointer;">▶️ Reproducir lista</button><div style="flex:1;"></div><button onclick="spqRenombrarLista()" style="background:none;border:1px solid #2a3138;color:#9ab;border-radius:7px;font-size:10px;cursor:pointer;padding:4px 9px;">✏️ Renombrar</button><button onclick="spqBorrarLista()" style="background:none;border:1px solid rgba(200,80,80,.4);color:#c88;border-radius:7px;font-size:10px;cursor:pointer;padding:4px 9px;">🗑 Borrar lista</button></div>';
        if (!VISTA.length) { b.innerHTML = '<div style="color:#8aa;font-size:11.5px;padding:1.2rem;text-align:center;">Esta lista está vacía. Agrega canciones desde la Biblioteca con ➕.</div>'; return; }
      }
      const enBib = vista === 'bib';
      b.innerHTML = VISTA.map((c, i) => {
        const son = idx >= 0 && COLA[idx] && COLA[idx].id === c.id;
        const acc = enBib
          ? '<button onclick="spqAgregarMenu(\'' + c.id + '\',event)" title="Agregar a lista" style="background:none;border:none;color:#8aa;font-size:13px;cursor:pointer;">➕</button><button onclick="spqBorrar(\'' + c.id + '\')" title="Eliminar" style="background:none;border:none;color:#a55;font-size:12px;cursor:pointer;">🗑</button>'
          : '<button onclick="spqMover(\'' + c.id + '\',-1)" title="Subir" style="background:none;border:none;color:#8aa;font-size:12px;cursor:pointer;">▲</button><button onclick="spqMover(\'' + c.id + '\',1)" title="Bajar" style="background:none;border:none;color:#8aa;font-size:12px;cursor:pointer;">▼</button><button onclick="spqQuitarDeLista(\'' + c.id + '\')" title="Quitar" style="background:none;border:none;color:#a55;font-size:12px;cursor:pointer;">✕</button>';
        return '<div style="display:flex;align-items:center;gap:.6rem;padding:.45rem .5rem;border-radius:8px;' + (son ? 'background:rgba(29,185,84,.12);' : '') + '"><button onclick="spqPlayVista(' + i + ')" style="background:none;border:none;color:' + (son ? '#1DB954' : '#cde') + ';font-size:15px;cursor:pointer;width:22px;">' + (son && !audio.paused ? '⏸️' : '▶️') + '</button><div style="flex:1;min-width:0;cursor:pointer;" onclick="spqPlayVista(' + i + ')"><div style="font-size:12px;font-weight:600;color:' + (son ? '#1DB954' : '#e8eef0') + ';white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + esc(c.titulo) + '</div><div style="font-size:10px;color:#8aa;">' + esc(c.artista || '—') + (c.album ? ' · ' + esc(c.album) : '') + '</div></div><span style="font-size:10px;color:#8aa;">' + (c.duracion ? fmt(c.duracion) : '') + '</span>' + acc + '</div>';
      }).join('');
    } catch (e) { if (b && (e as any).message !== 'auth') b.innerHTML = '<div style="color:#e88;font-size:11px;padding:1rem;">Error al cargar.</div>'; }
  }

  // handlers globales (los usan los onclick del HTML)
  w.spqVer = (v: string) => { vista = v; listasCargar(); render(); };
  w.spqPlayVista = (i: number) => { if (i < 0 || i >= VISTA.length) return; COLA = VISTA.slice(); tocar(i); };
  w.spqReproducirLista = () => { if (VISTA.length) { COLA = VISTA.slice(); tocar(0); } };
  w.spqPlayPause = () => { if (idx < 0 && VISTA.length) { w.spqPlayVista(0); return; } if (audio.paused) audio.play(); else audio.pause(); };
  w.spqNext = () => { if (!COLA.length) return; tocar(shuffle ? Math.floor(Math.random() * COLA.length) : (idx + 1) % COLA.length); };
  w.spqPrev = () => { if (!COLA.length) return; if (audio.currentTime > 3) { audio.currentTime = 0; return; } tocar((idx - 1 + COLA.length) % COLA.length); };
  w.spqShuffle = () => { shuffle = !shuffle; const x = $('spq-shuf'); if (x) x.style.color = shuffle ? '#1DB954' : '#667'; };
  w.spqRepeat = () => { repeat = !repeat; const x = $('spq-rep'); if (x) x.style.color = repeat ? '#1DB954' : '#667'; };
  w.spqNuevaLista = async () => { const n = prompt('Nombre de la nueva lista:'); if (!n) return; try { const r = await fetch(api('/api/musica-listas'), { method: 'POST', headers: HJ(), body: JSON.stringify({ nombre: n }) }); if (r.ok) { vista = (await r.json()).lista.id; listasCargar(); render(); } } catch {} };
  w.spqRenombrarLista = async () => { const l = LISTAS.find((x) => x.id === vista); if (!l) return; const n = prompt('Nuevo nombre:', l.nombre); if (!n) return; try { if ((await fetch(api('/api/musica-listas/' + vista), { method: 'PUT', headers: HJ(), body: JSON.stringify({ nombre: n }) })).ok) listasCargar(); } catch {} };
  w.spqBorrarLista = async () => { const l = LISTAS.find((x) => x.id === vista); if (!l) return; if (!confirm('¿Borrar la lista "' + l.nombre + '"? (las canciones NO se borran)')) return; try { if ((await fetch(api('/api/musica-listas/' + vista), { method: 'DELETE', headers: H() })).ok) { vista = 'bib'; listasCargar(); render(); } } catch {} };
  w.spqQuitarDeLista = async (cid: string) => { try { await fetch(api('/api/musica-listas/' + vista + '/quitar'), { method: 'POST', headers: HJ(), body: JSON.stringify({ cancionId: cid }) }); listasCargar(); render(); } catch {} };
  w.spqMover = async (cid: string, dir: number) => { const ids = VISTA.map((x) => x.id); const i = ids.indexOf(cid), j = i + dir; if (i < 0 || j < 0 || j >= ids.length) return; ids.splice(j, 0, ids.splice(i, 1)[0]); try { await fetch(api('/api/musica-listas/' + vista + '/orden'), { method: 'PUT', headers: HJ(), body: JSON.stringify({ orden: ids }) }); render(); } catch {} };
  w.spqAgregarMenu = (cid: string, ev: any) => {
    if (ev) ev.stopPropagation();
    const old = document.getElementById('spq-menu'); if (old) old.remove();
    const m = document.createElement('div'); m.id = 'spq-menu';
    m.style.cssText = 'position:fixed;z-index:10002;background:#12171b;border:1px solid #2a3138;border-radius:10px;padding:.35rem;box-shadow:0 10px 30px rgba(0,0,0,.6);min-width:160px;max-height:240px;overflow:auto;';
    const x = (ev && ev.clientX) || 200, y = (ev && ev.clientY) || 200;
    m.style.left = Math.min(x, window.innerWidth - 180) + 'px'; m.style.top = Math.min(y, window.innerHeight - 250) + 'px';
    let html = '<div style="font-size:10px;color:#8aa;padding:.3rem .5rem;">Agregar a…</div>';
    html += LISTAS.map((l) => '<button onclick="spqAgregarA(\'' + cid + '\',\'' + l.id + '\')" style="display:block;width:100%;text-align:left;background:none;border:none;color:#cde;font-size:11.5px;padding:.4rem .5rem;border-radius:6px;cursor:pointer;">📃 ' + esc(l.nombre) + '</button>').join('');
    if (!LISTAS.length) html += '<div style="font-size:10.5px;color:#778;padding:.3rem .5rem;">No tienes listas.</div>';
    html += '<button onclick="spqAgregarA(\'' + cid + '\',\'__nueva__\')" style="display:block;width:100%;text-align:left;background:none;border:none;color:#1DB954;font-size:11.5px;padding:.4rem .5rem;border-top:1px solid #222;cursor:pointer;">➕ Nueva lista…</button>';
    m.innerHTML = html; document.body.appendChild(m);
    setTimeout(() => document.addEventListener('click', function cerrar() { const e = document.getElementById('spq-menu'); if (e) e.remove(); document.removeEventListener('click', cerrar); }), 10);
  };
  w.spqAgregarA = async (cid: string, lid: string) => {
    const e = document.getElementById('spq-menu'); if (e) e.remove();
    if (lid === '__nueva__') { const n = prompt('Nombre de la nueva lista:'); if (!n) return; try { const r = await fetch(api('/api/musica-listas'), { method: 'POST', headers: HJ(), body: JSON.stringify({ nombre: n }) }); if (!r.ok) return; lid = (await r.json()).lista.id; } catch { return; } }
    try { await fetch(api('/api/musica-listas/' + lid + '/agregar'), { method: 'POST', headers: HJ(), body: JSON.stringify({ cancionId: cid }) }); listasCargar(); } catch {}
  };
  w.spqBorrar = async (id: string) => { const c = VISTA.find((x) => x.id === id); if (!confirm('¿Eliminar "' + (c ? c.titulo : '') + '" de tu biblioteca?')) return; try { if ((await fetch(api('/api/musica/' + id), { method: 'DELETE', headers: H() })).ok) { if (COLA[idx] && COLA[idx].id === id) { audio.pause(); idx = -1; pintarActual(); } listasCargar(); render(); } } catch {} };
  w.spqSubir = async (inp: HTMLInputElement) => {
    const files = inp.files; if (!files || !files.length) return;
    for (let k = 0; k < files.length; k++) await subirUno(files[k]);
    inp.value = ''; render();
  };
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
  return () => { try { audio.pause(); audio.src = ''; } catch {}; const m = document.getElementById('spq-menu'); if (m) m.remove(); };
}
