import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Phone, Milestone } from 'lucide-react';
import Cal, { getCalApi } from "@calcom/embed-react";
import IAEVAChat from '@/components/tools/IAEVAChat';

const Contacto = () => {
  const [calLoaded, setCalLoaded] = useState(false);

  // SEO data
  const seoData = {
    title: "Contacto | IAEVA para Centros Médicos",
    description: "Contacta con nuestros expertos para descubrir cómo IAEVA puede transformar la atención al paciente y optimizar la eficiencia de tu centro médico.",
    keywords: "contacto IAEVA, demo gestión citas, demo asistente virtual, optimización centro médico, chatbot médico, demo salud digital",
    url: "https://iaeva.com/contacto",
    imageUrl: "public/logo/og-image.png",
    twitterHandle: "@iaeva_health",
    locale: "es_ES",
    type: "website",
    siteName: "IAEVA - Asistente Virtual Inteligente para Sector Salud"
  };

  return (
    <>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:image" content={seoData.imageUrl} />
        <meta property="og:url" content={seoData.url} />
        <meta property="og:type" content={seoData.type} />
        <meta property="og:site_name" content={seoData.siteName} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={seoData.twitterHandle} />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <meta name="twitter:image" content={seoData.imageUrl} />
        <meta name="twitter:url" content={seoData.url} />
        <link rel="canonical" href={seoData.url} />
      </Helmet>
    
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        
        {/* Header de Contacto */}
        <section className="py-16 bg-gradient-to-br from-white via-blue-100 to-green-100">
          <div className="text-center py-8 max-w-3xl mx-auto px-4">
            <div className="bg-white/10 p-2 inline-block rounded-full mb-4">
              <Phone className="h-6 w-6 text-gray-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-600 mb-6">
              Hablemos de IA
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Conecta con nuestros expertos para descubrir cómo IAEVA puede transformar la atención al paciente y optimizar la eficiencia de tu centro médico.
            </p>
          </div>
        </section>
        
        {/* Main Content */}
        <main className="flex-grow pt-12 pb-20 relative">
          {/* Calendar Section - Mejorada */}
          <section className="py-8 relative">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                
                {/* IAEVA Chat Section */}
                <div className="max-w-5xl mx-auto mb-16">
                  
                  {/* Aquí integramos nuestro componente personalizado */}
                  <IAEVAChat />
                </div>
                
                {/* Sección de información */}
                <section className="py-8">
                  <div className="text-center max-w-3xl mx-auto">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      ¿Por qué contactarnos?
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                      En IAEVA entendemos los retos que afrontan los centros médicos en la era digital. Nuestro equipo está listo para ayudarte a optimizar la gestión de citas, mejorar la atención al paciente y aumentar la eficiencia de tu establecimiento. Desde clínicas generales hasta centros especializados, tenemos una solución personalizada para cada necesidad.
                    </p>
                    <p className="text-md text-gray-600 dark:text-gray-400">
                      No dudes en enviarnos tus consultas o solicitar asesoramiento especializado. Estamos aquí para acompañarte en cada paso hacia la transformación digital.
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Contacto;
