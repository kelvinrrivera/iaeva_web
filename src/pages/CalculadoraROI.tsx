import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ROICalculator from '@/components/tools/ROICalculator';
import Testimonials from '@/components/home/Testimonials';
import { ArrowRight, Calculator, DollarSign, CheckCircle } from 'lucide-react';
import ConversionFunnel from '@/components/home/ConversionFunnel';
import SEOHead from '@/components/shared/SEOHead';

const CalculadoraROI = () => {
  const { t, i18n } = useTranslation(['roi_calculator', 'common']);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title={t('meta.title')}
        description={t('meta.description')}
        keywords={t('meta.keywords')}
        canonicalUrl={i18n.language === 'es' ? '/calculadora-roi' : '/fr/calculatrice-roi'}
        structuredData={[{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": t('header.title'),
          "description": t('header.subtitle'),
          "url": i18n.language === 'es' ? "https://iaeva.com/calculadora-roi" : "https://iaeva.com/fr/calculatrice-roi",
          "applicationCategory": "BusinessApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR"
          },
          "inLanguage": i18n.language
        }]}
        hreflang={[
          { lang: 'es', url: '/calculadora-roi' },
          { lang: 'fr', url: '/fr/calculatrice-roi' }
        ]}
      />

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
                  {t('header.title')}
                </h1>
                <p className="text-xl text-gray/80 mb-8">
                  {t('header.subtitle')}
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
                  <h3 className="text-lg font-semibold mb-2">{t('benefits.reduction_title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('benefits.reduction_description')}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl text-center">
                  <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
                    <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{t('benefits.optimization_title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('benefits.optimization_description')}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl text-center">
                  <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 mb-4">
                    <ArrowRight className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{t('benefits.roi_title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('benefits.roi_description')}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Calculadora de ROI */}
          <ROICalculator />

          {/* Testimonios */}
          {/* <Testimonials /> */}
          <ConversionFunnel />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default CalculadoraROI;
