import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, MessageCircle, Clock, BarChart4, Activity, PlayCircle, FileStack, Check } from 'lucide-react';

import PageLayout from '@/components/layout/PageLayout';
import SEOHead from '@/components/shared/SEOHead';
import CTAButton from '@/components/shared/CTAButton';
import { organizationSchema, generateBreadcrumbs, socialProfiles } from '@/lib/schema';

const PhysiotherapyPracticeManagementFR = () => {
  const { t } = useTranslation(['common', 'meta', 'solutions']);

  // Efecto para forzar el scroll al inicio cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Migas de pan para SEO y navegación
  const breadcrumbs = generateBreadcrumbs([
    { name: t('navbar.home'), url: "/fr" },
    { name: t('navbar.physiotherapy'), url: "/fr/physiotherapy-practice-management" }
  ]);

  return (
    <PageLayout>
      <SEOHead
        title={t('meta:physiotherapy.title')}
        description={t('meta:physiotherapy.description')}
        canonicalUrl="/fr/physiotherapy-practice-management"
        ogImage="/images/physiotherapy-practice-management.jpg"
        keywords={t('meta:physiotherapy.keywords')}
        structuredData={[organizationSchema]}
        socialProfiles={socialProfiles}
        breadcrumbs={breadcrumbs}
        hreflang={[
          { lang: 'es', url: '/physiotherapy-practice-management' },
          { lang: 'fr', url: '/fr/physiotherapy-practice-management' }
        ]}
      />

      {/* Cabecera de la página */}
      <section className="pt-20 pb-16 bg-gradient-to-r from-blue-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Activity className="h-8 w-8 text-teal-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              {t('solutions:physiotherapy.title')}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {t('solutions:physiotherapy.description')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <CTAButton
                className="px-6 py-3 rounded-full text-white font-medium bg-gradient-to-r from-iaeva-blue to-iaeva-purple hover:opacity-90 transition-opacity"
                text={t('solutions:common.cta.request_demo')}
                path="/fr/contact"
                variant="primary" isCalendarButton={true}
              />
              <CTAButton
                className="px-6 py-3 rounded-full text-cyan-600 text-dark font-medium hover:bg-blue-50 transition-colors"
                text={t('solutions:common.cta.calculate_roi')}
                path="/fr/calculatrice-roi"
                variant="outline"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas impactantes */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-blue-50 p-6 rounded-xl text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-4xl font-bold text-iaeva-blue mb-2">{t('solutions:physiotherapy.stats.reduction')}</h3>
              <p className="text-gray-700">{t('solutions:physiotherapy.stats.reduction_text')}</p>
            </motion.div>

            <motion.div
              className="bg-teal-50 p-6 rounded-xl text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-4xl font-bold text-teal-600 mb-2">{t('solutions:physiotherapy.stats.adherence')}</h3>
              <p className="text-gray-700">{t('solutions:physiotherapy.stats.adherence_text')}</p>
            </motion.div>

            <motion.div
              className="bg-green-50 p-6 rounded-xl text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-4xl font-bold text-green-600 mb-2">{t('solutions:physiotherapy.stats.time_saving')}</h3>
              <p className="text-gray-700">{t('solutions:physiotherapy.stats.time_saving_text')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Funcionalidades principales */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('solutions:physiotherapy.features_title')}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('solutions:physiotherapy.features.treatment_series.title')}</h3>
              <p className="text-gray-600">
                {t('solutions:physiotherapy.features.treatment_series.description')}
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <PlayCircle className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('solutions:physiotherapy.features.exercise_tracking.title')}</h3>
              <p className="text-gray-600">
                {t('solutions:physiotherapy.features.exercise_tracking.description')}
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('solutions:physiotherapy.features.absence_prevention.title')}</h3>
              <p className="text-gray-600">
                {t('solutions:physiotherapy.features.absence_prevention.description')}
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <FileStack className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('solutions:physiotherapy.features.progress_management.title')}</h3>
              <p className="text-gray-600">
                {t('solutions:physiotherapy.features.progress_management.description')}
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('solutions:physiotherapy.features.multichannel.title')}</h3>
              <p className="text-gray-600">
                {t('solutions:physiotherapy.features.multichannel.description')}
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <BarChart4 className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('solutions:physiotherapy.features.analytics.title')}</h3>
              <p className="text-gray-600">
                {t('solutions:physiotherapy.features.analytics.description')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Flexibilidad de integración */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">{t('solutions:physiotherapy.integration.title')}</h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              {t('solutions:physiotherapy.integration.description')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                className="bg-white p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-3">{t('solutions:physiotherapy.integration.own_system.title')}</h3>
                <p className="text-gray-600">
                  {t('solutions:physiotherapy.integration.own_system.description')}
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-3">{t('solutions:physiotherapy.integration.custom_integration.title')}</h3>
                <p className="text-gray-600">
                  {t('solutions:physiotherapy.integration.custom_integration.description')}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Estudios de caso */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-gradient-to-br from-blue-500 to-teal-500 p-12 text-white">
                <div className="text-2xl font-bold mb-4">{t('solutions:physiotherapy.case_study.title')}</div>
                <h3 className="text-3xl font-bold mb-6">{t('solutions:physiotherapy.case_study.subtitle')}</h3>
                <ul className="space-y-4">
                  {t('solutions:physiotherapy.case_study.benefits', { returnObjects: true }).map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 mt-1">→</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:w-1/2 p-12">
                <h3 className="text-xl font-bold mb-4">{t('solutions:physiotherapy.case_study.quote_title')}</h3>
                <blockquote className="italic text-gray-600 mb-6">
                  "{t('solutions:physiotherapy.case_study.quote')}"
                </blockquote>
                <div>
                  <p className="font-bold">{t('solutions:physiotherapy.case_study.quote_author')}</p>
                  <p className="text-gray-500">{t('solutions:physiotherapy.case_study.quote_position')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              {t('solutions:physiotherapy.cta.title')}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t('solutions:physiotherapy.cta.description')}
            </p>
            <CTAButton
              className="px-8 py-3 rounded-full bg-white text-indigo-600 font-medium hover:bg-opacity-90 transition-opacity"
              text={t('solutions:physiotherapy.cta.button')}
              path="/fr/contact"
              variant="white"
              isCalendarButton={true}
            />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PhysiotherapyPracticeManagementFR; 