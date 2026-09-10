// Service worker mínimo e inerte: solo existe para permitir "Instalar app".
// No intercepta ni cachea nada (la red se maneja normal).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => { /* red directa, sin interceptar */ });
