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
  title: {
    default: 'QUUANTICA — Servicios Tecnológicos Empresariales',
    template: '%s | QUUANTICA',
  },
  description:
    'QUUANTICA Servicios Tecnológicos. Plataforma empresarial para gestión SG-SST, automatización con IA, gestión documental, auditorías, capacitaciones y transformación digital institucional.',
  keywords: [
    'QUUANTICA',
    'SG-SST',
    'plataforma empresarial',
    'inteligencia artificial empresarial',
    'gestión documental',
    'auditorías',
    'transformación digital',
    'cumplimiento normativo',
    'Colombia',
    'Ministerio del Trabajo',
  ],
  authors: [{ name: 'QUUANTICA Servicios Tecnológicos' }],
  creator: 'QUUANTICA',
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://quuantica.com',
    title: 'QUUANTICA — Servicios Tecnológicos Empresariales',
    description:
      'Plataforma empresarial para gestión SG-SST, IA aplicada al cumplimiento, auditorías y transformación digital institucional.',
    siteName: 'QUUANTICA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QUUANTICA — Servicios Tecnológicos Empresariales',
    description:
      'Plataforma empresarial para gestión SG-SST, IA aplicada al cumplimiento y transformación digital.',
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
      <body className="font-sans antialiased bg-mesh-gradient">{children}</body>
    </html>
  );
}
