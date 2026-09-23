import { useState, useRef, useEffect } from 'react';
import { SIGNUP_URL } from '@/config/app-urls';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, ChevronDown, Building, Hospital, FlaskConical, Heart, Brain, Scale, Accessibility, ImageIcon, Calculator, Milestone, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEOKeywordsSection from '@/components/home/SEOKeywordsSection';
import SEOHead from '@/components/shared/SEOHead';
import PageLayout from '@/components/layout/PageLayout';
import CTAButton from '@/components/shared/CTAButton';

// Componente para la tarjeta de caso de uso detallado
const CaseStudyCard = ({ title, description, implementation, results, testimonial, expert, role, delay = "0s" }) => {
  const { t } = useTranslation(['use_cases']);
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        "bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-500 overflow-hidden",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: delay }}
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>

        <div
          className={`transition-all duration-300 overflow-hidden ${expanded ? "max-h-[2000px]" : "max-h-0"}`}
        >
          <div className="pt-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              {t('case_study.implementation', 'Implementación:')}
            </h4>
            <ul className="space-y-2 mb-6">
              {implementation.map((item, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>

            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              {t('case_study.results', 'Resultados esperados:')}
            </h4>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {results.map((result, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
                  <div className="text-xl font-bold text-blue-600">
                    {result.value}
                  </div>
                  <div className="text-sm text-gray-600">{result.label}</div>
                </div>
              ))}
            </div>

            {/*
              Testimonios atribuidos retirados (2026-09-23, T28).

              Cuatro citas con nombre y cargo de profesionales sanitarios —«Dra. Ana
              Gómez, Directora Médica»— que no corresponden a clientes reales. El plan lo
              prohíbe («testimonios y ratings solo verificables con permiso») y es la
              misma decisión que ya se tomó en la landing de Next: reescribirlos habría
              significado fabricar opiniones de personas inexistentes.

              Los casos de uso siguen describiendo qué hace el producto en cada escenario;
              lo que se retira es la atribución a alguien que no lo ha dicho.

              Cuando haya clínicas dispuestas a dar su opinión, se reconstruye con su
              consentimiento expreso y su identidad verificable.
            */}
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 text-blue-600 hover:text-purple-600 flex items-center text-sm font-medium transition-colors"
        >
          {expanded ? t('case_study.show_less', 'Mostrar menos') : t('case_study.view_details', 'Ver caso detallado')}
          <ChevronDown className={`ml-2 h-5 w-5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
};

// Selector de tipo de establecimiento
const EstablishmentSelector = ({ activeType, setActiveType }) => {
  const { t } = useTranslation(['use_cases']);

  const establishments = [
    { id: 'clinicas', name: t('establishment_types.clinics', 'Clínicas médicas'), icon: <Building className="h-4 w-4" /> },
    { id: 'hospitales', name: t('establishment_types.hospitals', 'Hospitales'), icon: <Hospital className="h-4 w-4" /> },
    { id: 'laboratorios', name: t('establishment_types.labs', 'Laboratorios clínicos'), icon: <FlaskConical className="h-4 w-4" /> },
    { id: 'oncologicos', name: t('establishment_types.oncology', 'Centros oncológicos'), icon: <Brain className="h-4 w-4" /> },
    { id: 'cirugia', name: t('establishment_types.surgery', 'Cirugía estética'), icon: <Scale className="h-4 w-4" /> },
    { id: 'rehabilitacion', name: t('establishment_types.rehabilitation', 'Rehabilitación física'), icon: <Accessibility className="h-4 w-4" /> },
    { id: 'imagen', name: t('establishment_types.imaging', 'Diagnóstico por imagen'), icon: <ImageIcon className="h-4 w-4" /> },
  ];

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-8">
      {establishments.map((est) => (
        <button
          key={est.id}
          onClick={() => setActiveType(est.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium flex items-center transition-all ${activeType === est.id
            ? "bg-gradient-to-r bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white shadow-md"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
        >
          {est.icon}
          <span className="ml-2">{est.name}</span>
        </button>
      ))}
    </div>
  );
};

const CasosDeUso = () => {
  const { t, i18n } = useTranslation(['use_cases', 'common']);
  const [activeType, setActiveType] = useState('clinicas');

  // Efecto para forzar el scroll al inicio cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Datos de casos de uso por tipo de establecimiento (escenarios hipotéticos basados en soluciones reales)
  const casesData = {
    clinicas: {
      title: t('cases.clinics.title', "Clínicas médicas generales"),
      description: t('cases.clinics.description', "Optimización de agendas y reducción de ausencias. Implementar IAEVA en tu clínica puede aumentar la eficiencia en la atención y disminuir las pérdidas por citas no cumplidas."),
      caseStudies: [
        {
          title: t('cases.clinics.case1.title', "Gestión inteligente de citas"),
          description: t('cases.clinics.case1.description', "Una clínica mediana con 15 médicos y 300 citas diarias implementó IAEVA para automatizar recordatorios y optimizar la programación, reduciendo significativamente los no-shows."),
          implementation: [
            t('cases.clinics.case1.implementation.point1', "Recordatorios automáticos en 3 etapas (72h, 24h y 2h antes) vía WhatsApp"),
            t('cases.clinics.case1.implementation.point2', "Reagendamiento instantáneo mediante chatbot integrado"),
            t('cases.clinics.case1.implementation.point3', "Mensajes personalizados según historial del paciente")
          ],
          results: [
            { value: "60%", label: t('cases.clinics.case1.results.result1', "Reducción de ausencias") },
            { value: "30%", label: t('cases.clinics.case1.results.result2', "Aumento de citas agendadas") },
            { value: "35%", label: t('cases.clinics.case1.results.result3', "Mejora en satisfacción") }
          ]
        }
      ]
    },
    hospitales: {
      title: t('cases.hospitals.title', "Hospitales"),
      description: t('cases.hospitals.description', "Optimización en la coordinación interdepartamental y reducción de tiempos de espera para admisión y servicios."),
      caseStudies: [
        {
          title: t('cases.hospitals.case1.title', "Sistema de admisión inteligente"),
          description: t('cases.hospitals.case1.description', "Un hospital universitario implementó IAEVA para priorizar admisiones y coordinar la atención entre departamentos, reduciendo la fragmentación en la comunicación."),
          implementation: [
            t('cases.hospitals.case1.implementation.point1', "Priorización de pacientes mediante algoritmos avanzados"),
            t('cases.hospitals.case1.implementation.point2', "Coordinación automatizada entre diversas áreas hospitalarias"),
            t('cases.hospitals.case1.implementation.point3', "Monitoreo en tiempo real de tiempos de espera")
          ],
          results: [
            { value: "35%", label: t('cases.hospitals.case1.results.result1', "Reducción de tiempos de espera") },
            { value: "40%", label: t('cases.hospitals.case1.results.result2', "Mejora en coordinación") },
            { value: "28%", label: t('cases.hospitals.case1.results.result3', "Disminución de readmisiones") }
          ]
        }
      ]
    },
    laboratorios: {
      title: t('cases.labs.title', "Laboratorios clínicos"),
      description: t('cases.labs.description', "Automatización en la gestión de citas para toma de muestras y entrega de resultados, mejorando la precisión y eficiencia en la comunicación."),
      caseStudies: [
        {
          title: t('cases.labs.case1.title', "Gestión integral de resultados"),
          description: t('cases.labs.case1.description', "Un laboratorio que realiza 200 procedimientos diarios implementó IAEVA para gestionar citas, verificar la preparación de pacientes y notificar resultados críticos con eficiencia."),
          implementation: [
            t('cases.labs.case1.implementation.point1', "Instrucciones personalizadas pre-examen y verificaciones interactivas"),
            t('cases.labs.case1.implementation.point2', "Notificaciones automáticas para entrega y seguimiento de resultados"),
            t('cases.labs.case1.implementation.point3', "Integración con sistema de seguimiento de muestras")
          ],
          results: [
            { value: "78%", label: t('cases.labs.case1.results.result1', "Reducción de muestras inadecuadas") },
            { value: "63%", label: t('cases.labs.case1.results.result2', "Menor tasa de cancelaciones") },
            { value: "92%", label: t('cases.labs.case1.results.result3', "Optimización en comunicación") }
          ]
        }
      ]
    },
    oncologicos: {
      title: t('cases.oncology.title', "Centros oncológicos"),
      description: t('cases.oncology.description', "Optimización de procesos en el seguimiento de tratamientos oncológicos y mejora en la adherencia a protocolos."),
      caseStudies: [
        {
          title: t('cases.oncology.case1.title', "Seguimiento integral de tratamientos"),
          description: t('cases.oncology.case1.description', "Un centro oncológico implementó IAEVA para programar y monitorizar sesiones de quimioterapia, asegurando el seguimiento continuo mediante alertas y recordatorios personalizados."),
          implementation: [
            t('cases.oncology.case1.implementation.point1', "Recordatorios automáticos para cada sesión de tratamiento"),
            t('cases.oncology.case1.implementation.point2', "Monitoreo en tiempo real con alertas para reprogramaciones"),
            t('cases.oncology.case1.implementation.point3', "Integración con sistemas de análisis de marcadores tumorales")
          ],
          results: [
            { value: "45%", label: t('cases.oncology.case1.results.result1', "Incremento en adherencia") },
            { value: "30%", label: t('cases.oncology.case1.results.result2', "Reducción en tiempos de reprogramación") },
            { value: "50%", label: t('cases.oncology.case1.results.result3', "Mejora en satisfacción") }
          ]
        }
      ]
    },
    cirugia: {
      title: t('cases.surgery.title', "Cirugía estética"),
      description: t('cases.surgery.description', "Optimización en la coordinación de evaluaciones, procedimientos y seguimientos postoperatorios, aumentando la eficiencia y la satisfacción del paciente."),
      caseStudies: [
        {
          title: t('cases.surgery.case1.title', "Coordinación integral de cirugía estética"),
          description: t('cases.surgery.case1.description', "Una clínica de cirugía estética utilizó IAEVA para coordinar evaluaciones preoperatorias, programar procedimientos y gestionar revisiones postoperatorias con recordatorios específicos según cada fase."),
          implementation: [
            t('cases.surgery.case1.implementation.point1', "Programación secuencial de citas (consulta, procedimiento, seguimiento)"),
            t('cases.surgery.case1.implementation.point2', "Recordatorios y confirmaciones adaptados a cada fase"),
            t('cases.surgery.case1.implementation.point3', "Feedback automatizado para mejorar la experiencia")
          ],
          results: [
            { value: "55%", label: t('cases.surgery.case1.results.result1', "Mejora en adherencia a tratamientos") },
            { value: "40%", label: t('cases.surgery.case1.results.result2', "Reducción en cancelaciones") },
            { value: "65%", label: t('cases.surgery.case1.results.result3', "Aumento en satisfacción global") }
          ]
        }
      ]
    },
    rehabilitacion: {
      title: t('cases.rehabilitation.title', "Rehabilitación física"),
      description: t('cases.rehabilitation.description', "Mejora en la programación y seguimiento de sesiones de terapia, optimizando la continuidad del tratamiento y la coordinación entre profesionales."),
      caseStudies: [
        {
          title: t('cases.rehabilitation.case1.title', "Optimización de terapias de rehabilitación"),
          description: t('cases.rehabilitation.case1.description', "Un centro de rehabilitación física implementó IAEVA para gestionar la programación de sesiones de terapia, reducir tiempos muertos y coordinar de forma efectiva al equipo de fisioterapia."),
          implementation: [
            t('cases.rehabilitation.case1.implementation.point1', "Agenda inteligente para organizar sesiones terapéuticas"),
            t('cases.rehabilitation.case1.implementation.point2', "Recordatorios y ajustes basados en el progreso del paciente"),
            t('cases.rehabilitation.case1.implementation.point3', "Coordinación entre equipos de fisioterapia y médicos especialistas")
          ],
          results: [
            { value: "50%", label: t('cases.rehabilitation.case1.results.result1', "Reducción de tiempos muertos") },
            { value: "38%", label: t('cases.rehabilitation.case1.results.result2', "Mejora en coordinación") },
            { value: "42%", label: t('cases.rehabilitation.case1.results.result3', "Aumento en adherencia a terapias") }
          ]
        }
      ]
    },
    imagen: {
      title: t('cases.imaging.title', "Diagnóstico por imagen"),
      description: t('cases.imaging.description', "Optimización en la programación y pre-análisis de estudios de imagen para reducir tiempos de espera en casos críticos."),
      caseStudies: [
        {
          title: t('cases.imaging.case1.title', "Pre-análisis automatizado de estudios"),
          description: t('cases.imaging.case1.description', "Un centro de diagnóstico por imagen implementó IAEVA para automatizar la revisión preliminar de estudios (rayos X, resonancias y tomografías), identificando casos prioritarios y reduciendo la carga de trabajo."),
          implementation: [
            t('cases.imaging.case1.implementation.point1', "Pre-análisis automatizado de estudios de imagen"),
            t('cases.imaging.case1.implementation.point2', "Priorización de casos críticos para atención inmediata"),
            t('cases.imaging.case1.implementation.point3', "Integración con sistemas digitales y registros de radiólogos")
          ],
          results: [
            { value: "62%", label: t('cases.imaging.case1.results.result1', "Reducción de tiempos de espera") },
            { value: "45%", label: t('cases.imaging.case1.results.result2', "Mejora en priorización") },
            { value: "55%", label: t('cases.imaging.case1.results.result3', "Mayor eficiencia diagnóstica") }
          ]
        }
      ]
    }
  };

  const { ref: titleRef, inView: titleInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <PageLayout>
      <SEOHead
        title={t('meta.title')}
        description={t('meta.description')}
        keywords={t('meta.keywords')}
        canonicalUrl={i18n.language === 'es' ? '/casos-de-uso' : '/fr/cas-usage'}
        structuredData={[{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": t('header.title'),
          "description": t('header.subtitle'),
          "url": i18n.language === 'es' ? "https://iaeva.com/casos-de-uso" : "https://iaeva.com/fr/cas-usage",
          "inLanguage": i18n.language
        }]}
        hreflang={[
          { lang: 'es', url: '/casos-de-uso' },
          { lang: 'fr', url: '/fr/cas-usage' }
        ]}
      />

      {/* Cabecera de la página con gradiente */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-white via-blue-100 to-green-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-white/10 p-2 inline-block rounded-full mb-4">
              <Briefcase className="h-6 w-6 text-gray-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-600">{t('header.title')}</h1>
            <p className="text-xl text-gray-600 mb-8">
              {t('header.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-16">
        {/* Selector de tipo de establecimiento */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-12"
        >
          <EstablishmentSelector activeType={activeType} setActiveType={setActiveType} />
        </motion.div>

        {/* Sección de casos de uso */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
              {casesData[activeType].title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
              {casesData[activeType].description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {casesData[activeType].caseStudies.map((study, index) => (
              <CaseStudyCard
                key={index}
                title={study.title}
                description={study.description}
                implementation={study.implementation}
                results={study.results}
                testimonial={study.testimonial}
                expert={study.expert}
                role={study.role}
                delay={`${index * 0.1}s`}
              />
            ))}
          </div>
        </div>

        {/* Sección CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 p-8 md:p-12 rounded-2xl text-center"
        >
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            {t('cta.description')}
          </p>
          <a href={SIGNUP_URL}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-iaeva-blue to-iaeva-purple hover:from-iaeva-blue/90 hover:to-iaeva-purple/90 transition-all duration-200"
          >
            {t('cta.button')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </motion.div>
      </div>

      {/* Sección de SEO keywords */}
      <SEOKeywordsSection />
    </PageLayout>
  );
};

export default CasosDeUso;

