import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, MessageCircle, Clock, BarChart4, Check, Sparkles, SmartphoneNfc, UserCheck, Building2, Bot, Activity, BellRing, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

import PageLayout from '@/components/layout/PageLayout';
import SEOHead from '@/components/shared/SEOHead';
import CTAButton from '@/components/shared/CTAButton';
import { organizationSchema, generateBreadcrumbs, socialProfiles } from '@/lib/schema';

const PatientManagementSolutionsFR = () => {
  const { t } = useTranslation(['common', 'meta', 'solutions']);

  // Efecto para forzar el scroll al inicio cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Migas de pan para SEO y navegación
  const breadcrumbs = generateBreadcrumbs([
    { name: t('navbar.home'), url: "/fr" },
    { name: t('navbar.patient_management'), url: "/fr/patient-management-solutions" }
  ]);

  return (
    <PageLayout>
      <SEOHead
        title={t('meta:patient_management.title')}
        description={t('meta:patient_management.description')}
        canonicalUrl="/fr/patient-management-solutions"
        ogImage="/images/patient-management-solutions.jpg"
        keywords={t('meta:patient_management.keywords')}
        structuredData={[organizationSchema]}
        socialProfiles={socialProfiles}
        breadcrumbs={breadcrumbs}
        hreflang={[
          { lang: 'es', url: '/patient-management-solutions' },
          { lang: 'fr', url: '/fr/patient-management-solutions' }
        ]}
      />

      {/* Cabecera de la página */}
      <section className="pt-20 pb-16 bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <UserCheck className="h-8 w-8 text-iaeva-purple" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              {t('solutions:patient_management.title')}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {t('solutions:patient_management.description')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <CTAButton
                className="px-6 py-3 rounded-full text-white font-medium bg-gradient-to-r from-iaeva-blue to-iaeva-purple hover:opacity-90 transition-opacity"
                text={t('solutions:common.cta.request_demo')}
                path="/fr/contact"
                variant="primary" isCalendarButton={true}
              />
              <CTAButton
                className="px-6 py-3 rounded-full border border-blue-500 text-blue-600 font-medium hover:bg-blue-50 transition-colors"
                text={t('solutions:common.cta.learn_more')}
                path="/fr/ressources"
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
              <h3 className="text-4xl font-bold text-iaeva-blue mb-2">{t('solutions:patient_management.stats.reduction')}</h3>
              <p className="text-gray-700">{t('solutions:patient_management.stats.reduction_text')}</p>
            </motion.div>

            <motion.div
              className="bg-purple-50 p-6 rounded-xl text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-4xl font-bold text-iaeva-purple mb-2">{t('solutions:patient_management.stats.efficiency')}</h3>
              <p className="text-gray-700">{t('solutions:patient_management.stats.efficiency_text')}</p>
            </motion.div>

            <motion.div
              className="bg-indigo-50 p-6 rounded-xl text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-4xl font-bold text-indigo-600 mb-2">{t('solutions:patient_management.stats.availability')}</h3>
              <p className="text-gray-700">{t('solutions:patient_management.stats.availability_text')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Funcionalidades principales */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('solutions:patient_management.features_title')}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <SmartphoneNfc className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('solutions:patient_management.features.virtual_assistant.title')}</h3>
              <p className="text-gray-600">
                {t('solutions:patient_management.features.virtual_assistant.description')}
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
                <Calendar className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('solutions:patient_management.features.appointment_management.title')}</h3>
              <p className="text-gray-600">
                {t('solutions:patient_management.features.appointment_management.description')}
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
              <h3 className="text-xl font-semibold mb-3">{t('solutions:patient_management.features.absence_prevention.title')}</h3>
              <p className="text-gray-600">
                {t('solutions:patient_management.features.absence_prevention.description')}
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
                <MessageCircle className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('solutions:patient_management.features.personalized_communication.title')}</h3>
              <p className="text-gray-600">
                {t('solutions:patient_management.features.personalized_communication.description')}
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
                <Sparkles className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('solutions:patient_management.features.patient_experience.title')}</h3>
              <p className="text-gray-600">
                {t('solutions:patient_management.features.patient_experience.description')}
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
              <h3 className="text-xl font-semibold mb-3">{t('solutions:patient_management.features.analytics.title')}</h3>
              <p className="text-gray-600">
                {t('solutions:patient_management.features.analytics.description')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Especialidades médicas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">{t('solutions:patient_management.specialties.title')}</h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              {t('solutions:patient_management.specialties.description')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center mb-4">
                  <Bot className="h-6 w-6 text-cyan-600" />
                </div>
                <Link to="/fr/dental-clinic-assistant" className="block">
                  <h3 className="text-lg font-medium mb-2 hover:text-iaeva-blue transition-colors">
                    {t('solutions:patient_management.specialties.dental_clinics.title')}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t('solutions:patient_management.specialties.dental_clinics.description')}
                  </p>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-teal-600" />
                </div>
                <Link to="/fr/physiotherapy-practice-management" className="block">
                  <h3 className="text-lg font-medium mb-2 hover:text-iaeva-blue transition-colors">
                    {t('solutions:patient_management.specialties.physiotherapy.title')}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t('solutions:patient_management.specialties.physiotherapy.description')}
                  </p>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                  <BellRing className="h-6 w-6 text-indigo-600" />
                </div>
                <Link to="/fr/ophthalmology-patient-care" className="block">
                  <h3 className="text-lg font-medium mb-2 hover:text-iaeva-blue transition-colors">
                    {t('solutions:patient_management.specialties.ophthalmology.title')}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t('solutions:patient_management.specialties.ophthalmology.description')}
                  </p>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-pink-600" />
                </div>
                <Link to="/fr/medical-center-efficiency" className="block">
                  <h3 className="text-lg font-medium mb-2 hover:text-iaeva-blue transition-colors">
                    {t('solutions:patient_management.specialties.aesthetic_clinics.title')}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t('solutions:patient_management.specialties.aesthetic_clinics.description')}
                  </p>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Bot className="h-6 w-6 text-green-600" />
                </div>
                <Link to="/fr/medical-center-efficiency" className="block">
                  <h3 className="text-lg font-medium mb-2 hover:text-iaeva-blue transition-colors">
                    {t('solutions:patient_management.specialties.diagnostic_centers.title')}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t('solutions:patient_management.specialties.diagnostic_centers.description')}
                  </p>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <Building2 className="h-6 w-6 text-purple-600" />
                </div>
                <Link to="/fr/medical-center-efficiency" className="block">
                  <h3 className="text-lg font-medium mb-2 hover:text-iaeva-blue transition-colors">
                    {t('solutions:patient_management.specialties.medical_centers.title')}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t('solutions:patient_management.specialties.medical_centers.description')}
                  </p>
                </Link>
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
              <div className="md:w-1/2 bg-gradient-to-br from-iaeva-blue to-iaeva-purple p-12 text-white">
                <div className="text-2xl font-bold mb-4">{t('solutions:patient_management.case_study.title')}</div>
                <h3 className="text-3xl font-bold mb-6">{t('solutions:patient_management.case_study.subtitle')}</h3>
                <ul className="space-y-4">
                  {t('solutions:patient_management.case_study.benefits', { returnObjects: true }).map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 mt-1">→</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:w-1/2 p-12">
                <h3 className="text-xl font-bold mb-4">{t('solutions:patient_management.case_study.quote_title')}</h3>
                <blockquote className="italic text-gray-600 mb-6">
                  "{t('solutions:patient_management.case_study.quote')}"
                </blockquote>
                <div>
                  <p className="font-bold">{t('solutions:patient_management.case_study.quote_author')}</p>
                  <p className="text-gray-500">{t('solutions:patient_management.case_study.quote_position')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas adicionales */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl text-center shadow-md">
              <h3 className="text-4xl font-bold text-iaeva-blue mb-2">{t('solutions:patient_management.case_study.stats.patients_prefer')}</h3>
              <p className="text-gray-600">{t('solutions:patient_management.case_study.stats.patients_prefer_text')}</p>
            </div>

            <div className="bg-white p-6 rounded-xl text-center shadow-md">
              <h3 className="text-4xl font-bold text-iaeva-blue mb-2">{t('solutions:patient_management.case_study.stats.confirmation_accuracy')}</h3>
              <p className="text-gray-600">{t('solutions:patient_management.case_study.stats.confirmation_accuracy_text')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              {t('solutions:patient_management.cta.title')}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t('solutions:patient_management.cta.description')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <CTAButton
                className="px-8 py-4 rounded-full text-white font-medium bg-gradient-to-r from-iaeva-blue to-iaeva-purple hover:opacity-90 transition-opacity text-lg"
                text={t('solutions:patient_management.cta.button')}
                path="/fr/contact"
                variant="primary" isCalendarButton={true}
              />
              <CTAButton
                className="px-8 py-4 rounded-full border border-blue-500 text-blue-600 font-medium hover:bg-blue-50 transition-colors text-lg"
                text={t('solutions:common.cta.calculate_roi')}
                path="/fr/calculatrice-roi"
                variant="outline"
              />
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PatientManagementSolutionsFR; 