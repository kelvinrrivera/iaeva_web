import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import HowItWorks from '@/components/home/HowItWorks';
import ImplementationPlan from '@/components/home/ImplementationPlan';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';
import IAEVAWhatsApp from '@/components/home/IAEVAWhatsApp';
import CustomerServiceHub from '@/components/home/CustomerServiceHub';
import VapiVoice from '@/components/home/VapiVoice';
import FAQ from '@/components/home/FAQ';
import TrustBadges from '@/components/home/TrustBadges';

const Index = () => {
  // Efecto para forzar el scroll al inicio cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Prevenir el scroll automático al cargar la página
    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  // Datos SEO para la página
  const seoData = {
    title: "IAEVA | Asistente Virtual IA para Gestión de Citas Médicas y Atención al Paciente",
    description: "IAEVA optimiza la gestión de citas médicas con IA, reduciendo ausencias en un 60% y mejorando la experiencia del paciente con atención 24/7 vía WhatsApp y web. Solicita demo gratis.",
    keywords: "asistente virtual médico, gestión citas médicas, IA sector salud, chatbot WhatsApp médico, reducción ausencias médicas, atención pacientes 24/7, optimización clínicas, IAEVA",
    url: "https://iaeva.com", // Reemplaza con tu dominio real
    imageUrl: "public/logo/og-image.png", // Reemplaza con la ruta a tu imagen
    twitterHandle: "@iaeva_health", // Reemplaza con tu handle de Twitter
    locale: "es_ES",
    type: "website",
    siteName: "IAEVA - Asistente Virtual Inteligente"
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        {/* Metadatos básicos SEO */}
        <html lang="es" />
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <meta name="author" content="IAEVA" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={seoData.url} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content={seoData.type} />
        <meta property="og:url" content={seoData.url} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:image" content={seoData.imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content={seoData.locale} />
        <meta property="og:site_name" content={seoData.siteName} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={seoData.twitterHandle} />
        <meta name="twitter:creator" content={seoData.twitterHandle} />
        <meta name="twitter:url" content={seoData.url} />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <meta name="twitter:image" content={seoData.imageUrl} />
        
        {/* Favicon y Apple Touch Icons */}
        <link rel="icon" href="/logo/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0ea5e9" />
        
        {/* Schema.org para Rich Snippets */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "IAEVA",
            "applicationCategory": "HealthApplication",
            "operatingSystem": "Web",
            "description": seoData.description,
            "offers": {
              "@type": "Offer",
              "price": "Contactar para precios",
              "priceCurrency": "USD"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "127"
            },
            "publisher": {
              "@type": "Organization",
              "name": "KelvinScale",
              "logo": {
                "@type": "ImageObject",
                "url": "https://kelvinscale.net/wp-content/uploads/2024/09/ks_new_logo.png"
              }
            }
          })}
        </script>
        
        // Schema.org para la Organización (KelvinScale)
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "KelvinScale",
            "url": "https://kelvinscale.net",
            "logo": "https://kelvinscale.net/wp-content/uploads/2024/09/ks_new_logo.png",
            "sameAs": [
              "https://twitter.com/kelvinscale",
              "https://www.linkedin.com/company/kelvinscale",
              "https://www.facebook.com/kelvinscale"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+34-649-061-730",
              "contactType": "sales",
              "availableLanguage": ["Spanish", "English"]
            },
            "brand": {
              "@type": "Brand",
              "name": "IAEVA",
              "logo": "/public/logo/logo.png",
              "description": "Asistente Virtual Inteligente para el Sector Salud"
            }
          })}
        </script>
        
        {/* Preconectar a dominios externos para mejorar rendimiento */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Metadatos adicionales */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Helmet>
      
      <Navbar />
      <main>
        <Hero />
        {/*<TrustBadges />*/}
        <Features />
        <IAEVAWhatsApp />
        <HowItWorks />
        <VapiVoice />
        <CustomerServiceHub />
        <ImplementationPlan />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
