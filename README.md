# QUUANTICA — Sitio web institucional

Sitio web corporativo de **QUUANTICA Servicios Tecnológicos** construido con Next.js 14, React 18, TailwindCSS 3 y Framer Motion. Diseño premium institucional, tema oscuro con azul tecnológico, listo para producción y despliegue en Vercel.

---

## 🚀 Instalación rápida

### Requisitos previos
- **Node.js** 18.17 o superior ([descargar](https://nodejs.org))
- **npm** 9+ (incluido con Node.js)

### Pasos

```bash
# 1. Entrar al directorio del proyecto
cd quuantica-web

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) y verás el sitio.

### Compilación de producción

```bash
npm run build
npm run start
```

---

## 📁 Estructura del proyecto

```
quuantica-web/
├── public/
│   └── favicon.svg                # Icono del sitio (SVG vectorial)
├── src/
│   ├── app/
│   │   ├── globals.css            # Estilos globales + utilidades Tailwind
│   │   ├── layout.tsx             # Layout raíz, metadatos SEO, fuentes
│   │   └── page.tsx               # Página principal (composición de secciones)
│   ├── components/
│   │   ├── Header.tsx             # Cabecera fija con scroll-aware
│   │   ├── Hero.tsx               # Hero principal con CTA y mockup
│   │   ├── BackgroundGrid.tsx     # Fondo tecnológico animado decorativo
│   │   ├── QuienesSomos.tsx       # Sección "Quiénes somos" + visión
│   │   ├── Servicios.tsx          # 10 tarjetas de servicios con color-coding
│   │   ├── PlataformaDemo.tsx     # Mockup interactivo del SaaS empresarial
│   │   ├── InteligenciaArtificial.tsx # Capacidades IA + chat demo
│   │   ├── Beneficios.tsx         # 8 beneficios + cifras de impacto
│   │   ├── Seguridad.tsx          # 6 controles de seguridad institucional
│   │   ├── AgendarDemo.tsx        # Formulario completo de agenda
│   │   ├── Footer.tsx             # Pie corporativo con redes y links
│   │   ├── WhatsAppButton.tsx     # Botón flotante con chat preconfigurado
│   │   ├── Logo.tsx               # Logo SVG vectorial reutilizable
│   │   └── ui/
│   │       └── SectionHeading.tsx # Cabecera reutilizable de secciones
│   └── lib/
│       ├── config.ts              # Configuración corporativa centralizada
│       └── sounds.ts              # Generador UI sounds (Web Audio API)
├── .eslintrc.json
├── .gitignore
├── next.config.mjs                # Optimizaciones Next.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts             # Tema corporativo + paleta QUUANTICA
└── tsconfig.json
```

---

## 🎨 Personalización rápida

### 1. Datos de contacto y branding

Edita el archivo único `src/lib/config.ts`:

```ts
export const QUUANTICA = {
  contact: {
    email: 'contacto@quuantica.com',          // Tu correo principal
    emailComercial: 'comercial@quuantica.com', // Para cotizaciones
    whatsapp: '573000000000',                  // SOLO números, formato internacional
    whatsappDisplay: '+57 300 000 0000',       // Cómo se muestra
    direccion: 'Bogotá D.C., Colombia',
  },
  social: {
    linkedin: 'https://linkedin.com/company/quuantica',
    instagram: 'https://instagram.com/quuantica',
    youtube: 'https://youtube.com/@quuantica',
  },
  whatsappMessage: 'Hola QUUANTICA, me gustaría conocer...',
};
```

### 2. Paleta de colores

En `tailwind.config.ts` está definida la paleta `brand` (azul corporativo) y los acentos `cyan`, `violet`, `amber`, `emerald`. Modifica los valores HEX si cambia el branding.

### 3. Conectar el formulario de agenda a un sistema real

El componente `AgendarDemo.tsx` actualmente simula el envío. Para conectarlo:

**Opción A — Email (recomendado para empezar):** usar [Resend](https://resend.com), [SendGrid](https://sendgrid.com) o [Brevo](https://brevo.com). Crea una API route en `src/app/api/demo/route.ts`:

```ts
import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  const data = await req.json();
  // Llamar a tu proveedor de email aquí
  return NextResponse.json({ ok: true });
}
```

Luego en `AgendarDemo.tsx`, reemplaza la línea `await new Promise(...)` por:

```ts
await fetch('/api/demo', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
});
```

**Opción B — Calendly o Cal.com:** reemplaza el formulario por un iframe embed o botón que abra el widget. Más rápido, menos personalizable.

**Opción C — Google Sheets:** usa [SheetDB](https://sheetdb.io) o [Sheety](https://sheety.co) para almacenar las solicitudes en una hoja de cálculo.

### 4. Sonidos UI

Los sonidos se generan vía Web Audio API (sin archivos externos). Ajusta volumen y frecuencias en `src/lib/sounds.ts`. El método `sfx.setMuted(true)` permite silenciar globalmente.

---

## ☁️ Despliegue en Vercel (recomendado)

### Opción A — Despliegue desde CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Opción B — Despliegue desde GitHub (recomendado para producción)

1. Sube el proyecto a GitHub: crea repo `quuantica-web` y haz `git push`.
2. Entra a [vercel.com](https://vercel.com) e inicia sesión con GitHub.
3. Clic en **"Add New Project"** → selecciona `quuantica-web`.
4. Vercel detecta Next.js automáticamente. Clic en **Deploy**.
5. En 90 segundos tu sitio está en producción con HTTPS gratuito.

**Costo:** Vercel tiene un plan gratuito generoso (suficiente para iniciar). Plan Pro: USD 20/mes cuando crezcas.

---

## 🌐 Recomendaciones de hosting (alternativas a Vercel)

| Plataforma | Plan inicial | Pros | Contras |
|------------|--------------|------|---------|
| **Vercel** | Gratis | Optimizado para Next.js, CDN global, HTTPS | Plan Pro USD 20/mes para uso intenso |
| **Netlify** | Gratis | Similar a Vercel, buen DX | Algunas features Next.js requieren config |
| **Cloudflare Pages** | Gratis | CDN brutal, ilimitado | Compatibilidad parcial con SSR |
| **Hostinger Cloud** | USD 8/mes | Hosting tradicional, panel cPanel | Requiere configurar Node.js manualmente |
| **DigitalOcean App** | USD 5/mes | Control completo, escalable | Necesita más setup |

**Recomendación:** empieza con Vercel gratis. Cuando supere los límites del plan free (raro al inicio) migras a Vercel Pro o Cloudflare Pages.

---

## 🌍 Recomendaciones de dominio

| Registrador | Precio aprox. (.com) | Notas |
|-------------|----------------------|-------|
| **Namecheap** | USD 10–13/año | Buen soporte, panel claro |
| **Cloudflare Registrar** | USD 9–11/año | Sin recargo, DNS rápido (recomendado) |
| **GoDaddy** | USD 12–18/año | Más caro, conocido |
| **GoDaddy Colombia (.co)** | COP 60–90.000/año | Útil si quieres dominio local |

**Sugerencia:** comprar `quuantica.com` + `quuantica.co` en Cloudflare Registrar, apuntar el `.co` al `.com`.

---

## 📧 Recomendaciones de correo corporativo

### Opción 1 — Google Workspace (recomendado)
- USD 6/usuario/mes
- Gmail, Drive, Meet, Calendar profesional
- Listo en 30 minutos
- [workspace.google.com](https://workspace.google.com)

### Opción 2 — Microsoft 365 Business
- USD 6/usuario/mes
- Outlook + Office completo + Teams
- [microsoft.com/microsoft-365/business](https://www.microsoft.com/microsoft-365/business)

### Opción 3 — Zoho Mail (más económico)
- USD 1/usuario/mes (plan Mail Lite)
- Plan gratuito hasta 5 usuarios con dominio propio
- [zoho.com/mail](https://www.zoho.com/mail)

**Recomendación inicial:** Zoho Mail gratuito mientras crece la operación, luego migrar a Google Workspace cuando se necesiten apps colaborativas.

---

## 🛡️ Seguridad y buenas prácticas

- HTTPS automático (Vercel/Netlify lo configuran solos).
- Headers de seguridad: agregar `next-secure-headers` o configurar manualmente en `next.config.mjs`.
- Variables sensibles (API keys, tokens) en `.env.local` (NUNCA commitear).
- Validación de formularios server-side cuando conectes con backend real.
- Rate limiting en API routes (recomendado: [Upstash Redis](https://upstash.com)).

---

## 📊 SEO y rendimiento

El sitio ya viene con:
- ✅ Metadatos OpenGraph y Twitter Cards (`layout.tsx`)
- ✅ Sitemap automático (Next.js lo genera al hacer build)
- ✅ Imágenes optimizadas (formato AVIF/WebP)
- ✅ Code-splitting automático
- ✅ Compresión gzip/brotli
- ✅ Fuentes Google optimizadas con `next/font`

**Lighthouse esperado:** 95+ en Performance, 100 en SEO/Accessibility/Best Practices.

---

## 🧪 Lista de verificación pre-producción

Antes de lanzar a producción:

- [ ] Reemplazar todos los datos en `src/lib/config.ts` con datos reales
- [ ] Conectar formulario de agenda a Resend/SendGrid o Calendly
- [ ] Configurar dominio personalizado en Vercel
- [ ] Crear correos corporativos en Google Workspace o Zoho
- [ ] Configurar Google Analytics 4 o Plausible Analytics
- [ ] Crear `robots.txt` en `public/` si quieres restringir crawlers
- [ ] Subir un Open Graph image (1200×630) en `public/og.png`
- [ ] Probar formulario de agenda en producción
- [ ] Verificar el botón de WhatsApp con número real
- [ ] Hacer pruebas en móvil (iOS, Android), tablet y escritorio
- [ ] Validar que los correos de cotización lleguen al inbox correcto

---

## 🆘 Soporte

Para dudas sobre el código contacta al equipo desarrollador.
Para soporte de la plataforma QUUANTICA contacta a `comercial@quuantica.com`.

---

© QUUANTICA Servicios Tecnológicos · Hecho en Colombia
