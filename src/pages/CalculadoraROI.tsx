import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ROICalculator from '@/components/tools/ROICalculator';
import Testimonials from '@/components/home/Testimonials';
import { ArrowRight, Calculator, DollarSign, CheckCircle } from 'lucide-react';
import ConversionFunnel from '@/components/home/ConversionFunnel';

const CalculadoraROI = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const seoData = {
    title: "Calculadora de ROI | IAEVA para Centros Médicos",
    description: "Calcula cuánto puede ahorrar tu centro médico optimizando la gestión de citas y reduciendo ausencias con IAEVA, el asistente virtual inteligente para el sector salud.",
    keywords: "calculadora ROI médico, ahorro gestión citas, reducción ausencias médicas, optimización clínicas, IAEVA, retorno inversión salud",
    url: "https://iaeva.com/calculadora-roi",
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
      
      <div className="min-h-screen dark:bg-gray-900 bg-white">
        <Navbar />
        <main>
          {/* Hero Section */}
          <section className="py-16 bg-gradient-to-br from-white via-blue-100 to-green-100">
            <div className="container mx-auto px-4">
              <div className="text-center py-8 max-w-3xl mx-auto">
                <div className="bg-white/10 p-2 inline-block rounded-full mb-4">
                  <Calculator className="h-6 w-6 text-gray-600" />
                </div>
                <h1 className="text-4xl font-bold text-gray-600 mb-6">
                  Calcula el impacto financiero de IAEVA en tu centro médico
                </h1>
                <p className="text-xl text-gray/80 mb-8">
                  Descubre cuánto puedes ahorrar reduciendo ausencias a citas, optimizando procesos y mejorando la experiencia del paciente.
                </p>
              </div>
            </div>
          </section>
          
          {/* Beneficios clave */}
          <section className="py-12 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl text-center">
                  <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                    <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Reducción de costos</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Calcula cuánto puedes ahorrar automatizando tareas administrativas y reduciendo ausencias.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl text-center">
                  <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
                    <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Optimización de agenda</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Identifica el valor real de optimizar las agendas médicas y maximizar tus recursos.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl text-center">
                  <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 mb-4">
                    <ArrowRight className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">ROI claro</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Obtén un análisis claro del retorno de inversión que IAEVA puede generar para tu centro.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Calculadora de ROI */}
          <ROICalculator />
          
          {/* Testimonios */}
          <Testimonials />
          <ConversionFunnel />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default CalculadoraROI;
