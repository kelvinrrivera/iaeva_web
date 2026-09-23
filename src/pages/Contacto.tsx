import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Phone, Milestone, Calendar, MessageSquare } from 'lucide-react';
import IAEVAChat from '@/components/tools/IAEVAChat';
import SEOHead from '@/components/shared/SEOHead';

// Reference our custom type declaration
import '../types/cal.d.ts';

const Contacto = () => {
  const { t, i18n } = useTranslation(['contact', 'common']);
  const currentYear = new Date().getFullYear();

  // Initialize Cal.com
  useEffect(() => {
    (function (C: any, A: string, L: string) {
      let p = function (a: any, ar: any) { a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          let script = d.createElement("script");
          script.src = A;
          d.head.appendChild(script);
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.eu/embed/embed.js", "init");

    const Cal = (window as any).Cal;
    Cal("init", "30min", { origin: "https://app.cal.eu" });

    Cal.ns["30min"]("inline", {
      elementOrSelector: "#my-cal-inline-30min",
      config: { "layout": "month_view" },
      calLink: "kelvinscale/30min",
    });

    Cal.ns["30min"]("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
  }, []);

  return (
    <>
      <SEOHead
        title={t('meta.title')}
        description={t('meta.description')}
        keywords={t('meta.keywords')}
        canonicalUrl={i18n.language === 'es' ? '/contacto' : '/fr/contact'}
        structuredData={[{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": t('header.title'),
          "description": t('header.subtitle'),
          "url": i18n.language === 'es' ? "https://iaeva.com/contacto" : "https://iaeva.com/fr/contact",
          "inLanguage": i18n.language
        }]}
        hreflang={[
          { lang: 'es', url: '/contacto' },
          { lang: 'fr', url: '/fr/contact' }
        ]}
      />

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />

        {/* Header de Contacto */}
        <section className="py-16 bg-gradient-to-br from-white via-blue-100 to-green-100">
          <div className="text-center py-8 max-w-3xl mx-auto px-4">
            <div className="bg-white/10 p-2 inline-block rounded-full mb-4">
              <MessageSquare className="h-6 w-6 text-gray-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-600 mb-6">
              {t('header.title')}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {t('header.subtitle')}
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
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('chat_section.title')}
                    </h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                      {t('chat_section.subtitle')}
                    </p>
                  </div>
                  {/* Aquí integramos nuestro componente personalizado */}
                  <IAEVAChat />
                </div>

                {/* Calendario Cal.com */}
                <div className="max-w-5xl mx-auto mb-16">
                  <div className="text-center py-8">
                    <div className="bg-white/10 p-2 inline-block rounded-full mb-4">
                      <Calendar className="h-6 w-6 text-gray-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('calendar_section.title')}
                    </h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                      {t('calendar_section.subtitle')}
                    </p>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-4 h-[650px] overflow-hidden">
                    <div style={{ width: "100%", height: "100%", overflow: "scroll" }} id="my-cal-inline-30min"></div>
                  </div>
                </div>

                {/* Sección de información */}
                <section className="py-8">
                  <div className="text-center max-w-3xl mx-auto">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      {t('why_section.title')}
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                      {t('why_section.description1')}
                    </p>
                    <p className="text-md text-gray-600 dark:text-gray-400">
                      {t('why_section.description2')}
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
