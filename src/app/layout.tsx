import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});
const jetBrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  // Dominio canónico = www (Vercel redirige quuantica.com → www.quuantica.com).
  // Si aquí se declara el dominio sin www, Google ve "Página con redirección" y no indexa.
  metadataBase: new URL('https://www.quuantica.com'),
  alternates: { canonical: '/' },
  verification: {
    google: '6vbXYC4br0mvTSrFzUkymq6aceDzXQr92eiR_61NGHc',
  },
  title: {
    default: 'QUUANTICA — Plataforma empresarial integrada: SST, talento humano, salud y software a la medida',
    template: '%s | QUUANTICA',
  },
  description:
    'QUUANTICA es una plataforma tecnológica propia que integra en un solo sistema la gestión de SST, talento humano, salud y medicina del trabajo, contratistas y proveedores, inspecciones y sistemas de gestión, moldeada a la medida de cada empresa. Además desarrollamos proyectos de software a la medida. Sede en Cajicá, Cundinamarca, con cobertura nacional y en expansión internacional.',
  keywords: [
    'QUUANTICA',
    'plataforma empresarial integrada',
    'plataforma tecnológica propia',
    'SG-SST',
    'Sistema de Gestión SST',
    'talento humano',
    'gestión de salud',
    'medicina del trabajo',
    'exámenes médicos ocupacionales',
    'contratistas y proveedores',
    'inspecciones de seguridad',
    'permisos de trabajo',
    'PESV',
    'sistemas de gestión',
    'software a la medida',
    'desarrollo de software a la medida',
    'Cajicá',
    'Cundinamarca',
    'Colombia',
  ],
  authors: [{ name: 'QUUANTICA Servicios Tecnológicos' }],
  creator: 'QUUANTICA',
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://www.quuantica.com',
    title: 'QUUANTICA — Plataforma empresarial integrada: SST, talento humano, salud y software a la medida',
    description:
      'Plataforma tecnológica propia que integra SST, talento humano, salud y medicina del trabajo, contratistas, inspecciones y sistemas de gestión, a la medida de cada empresa. Desarrollo de software a la medida. Cajicá, Cundinamarca — cobertura nacional, en expansión internacional.',
    siteName: 'QUUANTICA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QUUANTICA — Plataforma empresarial integrada: SST, talento humano, salud y software a la medida',
    description:
      'Plataforma tecnológica propia que integra SST, talento humano, salud y medicina del trabajo, contratistas, inspecciones y sistemas de gestión, a la medida de cada empresa. Desarrollo de software a la medida. Cajicá, Cundinamarca — cobertura nacional, en expansión internacional.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#040814',
  width: 'device-width',
  initialScale: 1,
};

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'QUUANTICA Servicios Tecnológicos',
  url: 'https://www.quuantica.com',
  logo: 'https://www.quuantica.com/favicon.svg',
  description:
    'QUUANTICA es una plataforma tecnológica propia que integra en un solo sistema la gestión de SST, talento humano, salud y medicina del trabajo, contratistas y proveedores, inspecciones y sistemas de gestión, moldeada a la medida de cada empresa. Además desarrollamos proyectos de software a la medida. Sede en Cajicá, Cundinamarca, con cobertura nacional y en expansión internacional.',
  slogan: 'Una sola plataforma para todas las áreas de su empresa',
  knowsAbout: [
    'Sistema de Gestión de Seguridad y Salud en el Trabajo (SG-SST)',
    'Talento humano y gestión de personal',
    'Gestión de salud y medicina del trabajo',
    'Gestión de contratistas y proveedores',
    'Inspecciones de seguridad y permisos de trabajo',
    'Plan Estratégico de Seguridad Vial (PESV)',
    'Sistemas de gestión',
    'Desarrollo de software a la medida',
  ],
  telephone: '+573167998542',
  email: 'quuantica@outlook.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Calle 9 n.º 19C-93',
    addressLocality: 'Cajicá',
    addressRegion: 'Cundinamarca',
    addressCountry: 'CO',
  },
  areaServed: 'Colombia',
  sameAs: [
    'https://www.instagram.com/quuantica2026/',
    'https://www.linkedin.com/in/isnardo-carmona-ram%C3%ADrez-6670b3417/',
    'https://www.facebook.com/profile.php?id=61590527382342',
  ],
  founder: {
    '@type': 'Person',
    name: 'Isnardo Carmona Ramírez',
    jobTitle: 'Gerente',
    sameAs: 'https://www.linkedin.com/in/isnardo-carmona-ram%C3%ADrez-6670b3417/',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios QUUANTICA',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Plataforma integrada SG-SST' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Talento humano: empleados, incapacidades y EPP' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Gestión de salud y medicina del trabajo' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Gestión de contratistas y proveedores' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Inspecciones digitales y permisos de trabajo' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Plan Estratégico de Seguridad Vial (PESV)' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Auditorías SG-SST y PESV' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Módulos a la medida de la empresa' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Desarrollo de software a la medida' } },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrains.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="font-sans antialiased bg-mesh-gradient">{children}</body>
    </html>
  );
}
