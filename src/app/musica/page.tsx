import type { Metadata, Viewport } from 'next';
import SpotyPlayer from '@/components/SpotyPlayer';

export const metadata: Metadata = {
  title: 'Spoty-Quuantica',
  description: 'Tu música personal en el servidor de QUUANTICA',
  manifest: '/spoty-manifest.webmanifest',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'Spoty-Q' },
  icons: { icon: '/spoty-192.png', apple: '/spoty-192.png' },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: '#1DB954',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function MusicaPage() {
  return <SpotyPlayer asPage />;
}
