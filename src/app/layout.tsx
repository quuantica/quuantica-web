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
  metadataBase: new URL('https://quuantica.com'),
  verification: {
    google: '6vbXYC4br0mvTSrFzUkymq6aceDzXQr92eiR_61NGHc',
  },
  title: {
    default: 'QUUANTICA — Servicios Tecnológicos para Sistemas de Gestión SST',
    template: '%s | QUUANTICA',
  },
  description:
    'QUUANTICA implementa Sistemas de Gestión SST, auditorías, plan vial, normativa legal y sistemas de calidad para empresas colombianas. Plataforma tecnológica 100% web con capacitaciones digitales certificadas. Cobertura nacional — Sabana Norte, Chía.',
  keywords: [
    'QUUANTICA',
    'SG-SST',
    'Sistema de Gestión SST',
    'auditorías SST',
    'plan vial',
    'normativa laboral Colombia',
    'sistemas de calidad',
    'capacitaciones digitales',
    'Sabana Norte',
    'Chía Colombia',
    'Ministerio del Trabajo',
    'cumplimiento normativo',
  ],
  authors: [{ name: 'QUUANTICA Servicios Tecnológicos' }],
  creator: 'QUUANTICA',
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://quuantica.com',
    title: 'QUUANTICA — Servicios Tecnológicos para Sistemas de Gestión SST',
    description:
      'QUUANTICA implementa Sistemas de Gestión SST, auditorías, plan vial, normativa legal y sistemas de calidad para empresas colombianas. Cobertura nacional — Sabana Norte, Chía.',
    siteName: 'QUUANTICA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QUUANTICA — Servicios Tecnológicos para Sistemas de Gestión SST',
    description:
      'Implementamos Sistemas de Gestión SST, auditorías, plan vial y sistemas de calidad. Plataforma 100% web. Cobertura nacional — Sabana Norte, Chía.',
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
  url: 'https://quuantica.com',
  logo: 'https://quuantica.com/favicon.svg',
  description:
    'QUUANTICA implementa Sistemas de Gestión SST, auditorías, plan vial, normativa legal y sistemas de calidad para empresas colombianas. Plataforma tecnológica 100% web con capacitaciones digitales certificadas.',
  telephone: '+573167998542',
  email: 'quuantica@outlook.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chía',
    addressRegion: 'Sabana Norte',
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
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Implementación Sistema de Gestión SST' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Auditorías SST' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Plan Vial' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Normativa Legal Laboral' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sistemas de Calidad' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Capacitaciones Digitales Certificadas' } },
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
