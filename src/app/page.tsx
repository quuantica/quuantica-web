import SplashScreen from '@/components/SplashScreen';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import QuienesSomos from '@/components/QuienesSomos';
import Estadisticas from '@/components/Estadisticas';
import Servicios from '@/components/Servicios';
import PlataformaDemo from '@/components/PlataformaDemo';
import Funciones from '@/components/Funciones';
import InteligenciaArtificial from '@/components/InteligenciaArtificial';
import Beneficios from '@/components/Beneficios';
import AgendarDemo from '@/components/AgendarDemo';
import Seguridad from '@/components/Seguridad';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import AIChatButton from '@/components/AIChatButton';

export default function HomePage() {
  return (
    <main className="relative">
      <SplashScreen />
      <Header />
      <Hero />
      <QuienesSomos />
      <Estadisticas />
      <PlataformaDemo />
      <Funciones />
      <Servicios />
      <InteligenciaArtificial />
      <Beneficios />
      <Seguridad />
      <AgendarDemo />
      <Footer />
      <WhatsAppButton />
      <AIChatButton />
    </main>
  );
}
