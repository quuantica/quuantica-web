import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import BackgroundGrid from './BackgroundGrid';

interface LegalPageProps {
  title: string;
  subtitle?: string;
  updatedAt: string;
  children: React.ReactNode;
}

export default function LegalPage({
  title,
  subtitle,
  updatedAt,
  children,
}: LegalPageProps) {
  return (
    <main className="relative min-h-screen">
      <Header />
      <BackgroundGrid />

      <article className="relative pt-32 pb-20">
        <div className="container-q max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-brand-100/60 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>

          <div className="surface-strong p-8 lg:p-12">
            <div className="flex items-start gap-4 mb-6 pb-6 border-b border-white/[.06]">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-500/15 border border-brand-500/30 flex items-center justify-center text-brand-300">
                <FileText size={20} />
              </div>
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-sm md:text-base text-brand-100/65 mt-2 leading-relaxed">
                    {subtitle}
                  </p>
                )}
                <div className="text-xs text-brand-100/45 mt-3 uppercase tracking-wider font-semibold">
                  Última actualización: {updatedAt}
                </div>
              </div>
            </div>

            <div className="legal-content">{children}</div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
