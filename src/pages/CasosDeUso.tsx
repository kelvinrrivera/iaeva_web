import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, ChevronDown, Building, Hospital, FlaskConical, Heart, Brain, Scale, Accessibility, ImageIcon, Calculator, Milestone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEOKeywordsSection from '@/components/home/SEOKeywordsSection';

// Componente para la tarjeta de caso de uso detallado
const CaseStudyCard = ({ title, description, implementation, results, testimonial, expert, role, delay = "0s" }) => {
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
              Implementación:
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
              Resultados esperados:
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

            {testimonial && (
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg italic text-gray-600 dark:text-gray-300 mb-4">
                "{testimonial}"
                <div className="mt-2 font-medium text-gray-900 dark:text-white not-italic">
                  {expert}, <span className="font-normal text-gray-500">
                    {role}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 text-blue-600 hover:text-purple-600 flex items-center text-sm font-medium transition-colors"
        >
          {expanded ? 'Mostrar menos' : 'Ver caso detallado'}
          <ChevronDown className={`ml-2 h-5 w-5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
};

// Selector de tipo de establecimiento
const EstablishmentSelector = ({ activeType, setActiveType }) => {
  const establishments = [
    { id: 'clinicas', name: 'Clínicas médicas', icon: <Building className="h-4 w-4" /> },
    { id: 'hospitales', name: 'Hospitales', icon: <Hospital className="h-4 w-4" /> },
    { id: 'laboratorios', name: 'Laboratorios clínicos', icon: <FlaskConical className="h-4 w-4" /> },
    { id: 'oncologicos', name: 'Centros oncológicos', icon: <Brain className="h-4 w-4" /> },
    { id: 'cirugia', name: 'Cirugía estética', icon: <Scale className="h-4 w-4" /> },
    { id: 'rehabilitacion', name: 'Rehabilitación física', icon: <Accessibility className="h-4 w-4" /> },
    { id: 'imagen', name: 'Diagnóstico por imagen', icon: <ImageIcon className="h-4 w-4" /> },
  ];

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-8">
      {establishments.map((est) => (
        <button
          key={est.id}
          onClick={() => setActiveType(est.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium flex items-center transition-all ${
            activeType === est.id
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
  const [activeType, setActiveType] = useState('clinicas');

  // Datos de casos de uso por tipo de establecimiento (escenarios hipotéticos basados en soluciones reales)
  const casesData = {
    clinicas: {
      title: "Clínicas médicas generales",
      description:
        "Optimización de agendas y reducción de ausencias. Implementar IAEVA en tu clínica puede aumentar la eficiencia en la atención y disminuir las pérdidas por citas no cumplidas.",
      caseStudies: [
        {
          title: "Gestión inteligente de citas",
          description:
            "Una clínica mediana con 15 médicos y 300 citas diarias implementó IAEVA para automatizar recordatorios y optimizar la programación, reduciendo significativamente los no-shows.",
          implementation: [
            "Recordatorios automáticos en 3 etapas (72h, 24h y 2h antes) vía WhatsApp",
            "Reagendamiento instantáneo mediante chatbot integrado",
            "Mensajes personalizados según historial del paciente"
          ],
          results: [
            { value: "60%", label: "Reducción de ausencias" },
            { value: "30%", label: "Aumento de citas agendadas" },
            { value: "35%", label: "Mejora en satisfacción" }
          ],
          testimonial:
            "IAEVA nos ayudó a optimizar nuestras agendas y reducir los no-shows, incrementando notablemente nuestra eficiencia operativa.",
          expert: "Dra. Ana Gómez",
          role: "Directora Médica"
        }
      ]
    },
    hospitales: {
      title: "Hospitales",
      description:
        "Optimización en la coordinación interdepartamental y reducción de tiempos de espera para admisión y servicios.",
      caseStudies: [
        {
          title: "Sistema de admisión inteligente",
          description:
            "Un hospital universitario implementó IAEVA para priorizar admisiones y coordinar la atención entre departamentos, reduciendo la fragmentación en la comunicación.",
          implementation: [
            "Priorización de pacientes mediante algoritmos avanzados",
            "Coordinación automatizada entre diversas áreas hospitalarias",
            "Monitoreo en tiempo real de tiempos de espera"
          ],
          results: [
            { value: "35%", label: "Reducción de tiempos de espera" },
            { value: "40%", label: "Mejora en coordinación" },
            { value: "28%", label: "Disminución de readmisiones" }
          ],
          testimonial:
            "La implementación de IAEVA transformó nuestra capacidad de coordinar servicios, logrando una atención más rápida y eficiente.",
          expert: "Dr. Carlos Rivas",
          role: "Director de Operaciones"
        }
      ]
    },
    laboratorios: {
      title: "Laboratorios clínicos",
      description:
        "Automatización en la gestión de citas para toma de muestras y entrega de resultados, mejorando la precisión y eficiencia en la comunicación.",
      caseStudies: [
        {
          title: "Gestión integral de resultados",
          description:
            "Un laboratorio que realiza 200 procedimientos diarios implementó IAEVA para gestionar citas, verificar la preparación de pacientes y notificar resultados críticos con eficiencia.",
          implementation: [
            "Instrucciones personalizadas pre-examen y verificaciones interactivas",
            "Notificaciones automáticas para entrega y seguimiento de resultados",
            "Integración con sistema de seguimiento de muestras"
          ],
          results: [
            { value: "78%", label: "Reducción de muestras inadecuadas" },
            { value: "63%", label: "Menor tasa de cancelaciones" },
            { value: "92%", label: "Optimización en comunicación" }
          ],
          testimonial:
            "La automatización en la gestión de citas y resultados elevó la calidad de nuestros servicios y redujo considerablemente los errores.",
          expert: "Dra. Laura Vázquez",
          role: "Directora de Laboratorio"
        }
      ]
    },
    oncologicos: {
      title: "Centros oncológicos",
      description:
        "Optimización de procesos en el seguimiento de tratamientos oncológicos y mejora en la adherencia a protocolos.",
      caseStudies: [
        {
          title: "Seguimiento integral de tratamientos",
          description:
            "Un centro oncológico implementó IAEVA para programar y monitorizar sesiones de quimioterapia, asegurando el seguimiento continuo mediante alertas y recordatorios personalizados.",
          implementation: [
            "Recordatorios automáticos para cada sesión de tratamiento",
            "Monitoreo en tiempo real con alertas para reprogramaciones",
            "Integración con sistemas de análisis de marcadores tumorales"
          ],
          results: [
            { value: "45%", label: "Incremento en adherencia" },
            { value: "30%", label: "Reducción en tiempos de reprogramación" },
            { value: "50%", label: "Mejora en satisfacción" }
          ],
          testimonial:
            "Con IAEVA, nuestros procesos se volvieron mucho más eficientes, mejorando significativamente el seguimiento y la continuidad en el tratamiento.",
          expert: "Dr. Elena Márquez",
          role: "Oncólogo Principal"
        }
      ]
    },
    cirugia: {
      title: "Cirugía estética",
      description:
        "Optimización en la coordinación de evaluaciones, procedimientos y seguimientos postoperatorios, aumentando la eficiencia y la satisfacción del paciente.",
      caseStudies: [
        {
          title: "Coordinación integral de cirugía estética",
          description:
            "Una clínica de cirugía estética utilizó IAEVA para coordinar evaluaciones preoperatorias, programar procedimientos y gestionar revisiones postoperatorias con recordatorios específicos según cada fase.",
          implementation: [
            "Programación secuencial de citas (consulta, procedimiento, seguimiento)",
            "Recordatorios y confirmaciones adaptados a cada fase",
            "Feedback automatizado para mejorar la experiencia"
          ],
          results: [
            { value: "55%", label: "Mejora en adherencia a tratamientos" },
            { value: "40%", label: "Reducción en cancelaciones" },
            { value: "65%", label: "Aumento en satisfacción global" }
          ],
          testimonial:
            "IAEVA nos permitió gestionar de forma integral el flujo de cirugía estética, optimizando cada fase del proceso.",
          expert: "Dr. Miguel Soto",
          role: "Cirujano Estético"
        }
      ]
    },
    rehabilitacion: {
      title: "Rehabilitación física",
      description:
        "Mejora en la programación y seguimiento de sesiones de terapia, optimizando la continuidad del tratamiento y la coordinación entre profesionales.",
      caseStudies: [
        {
          title: "Optimización de terapias de rehabilitación",
          description:
            "Un centro de rehabilitación física implementó IAEVA para gestionar la programación de sesiones de terapia, reducir tiempos muertos y coordinar de forma efectiva al equipo de fisioterapia.",
          implementation: [
            "Agenda inteligente para organizar sesiones terapéuticas",
            "Recordatorios y ajustes basados en el progreso del paciente",
            "Coordinación entre equipos de fisioterapia y médicos especialistas"
          ],
          results: [
            { value: "50%", label: "Reducción de tiempos muertos" },
            { value: "38%", label: "Mejora en coordinación" },
            { value: "42%", label: "Aumento en adherencia a terapias" }
          ],
          testimonial:
            "La implementación de IAEVA transformó nuestra programación de sesiones, otorgando mayor eficiencia y continuidad en las terapias.",
          expert: "Dra. Carmen Ruiz",
          role: "Especialista en Rehabilitación"
        }
      ]
    },
    imagen: {
      title: "Diagnóstico por imagen",
      description:
        "Optimización en la programación y pre-análisis de estudios de imagen para reducir tiempos de espera en casos críticos.",
      caseStudies: [
        {
          title: "Pre-análisis automatizado de estudios",
          description:
            "Un centro de diagnóstico por imagen implementó IAEVA para automatizar la revisión preliminar de estudios (rayos X, resonancias y tomografías), identificando casos prioritarios y reduciendo la carga de trabajo.",
          implementation: [
            "Pre-análisis automatizado de estudios de imagen",
            "Priorización de casos críticos para atención inmediata",
            "Integración con sistemas digitales y registros de radiólogos"
          ],
          results: [
            { value: "62%", label: "Reducción de tiempos de espera" },
            { value: "45%", label: "Mejora en priorización" },
            { value: "55%", label: "Mayor eficiencia diagnóstica" }
          ],
          testimonial:
            "La capacidad de IAEVA para analizar estudios de imagen ha optimizado nuestra respuesta ante casos urgentes, reduciendo significativamente los tiempos de espera.",
          expert: "Dr. Roberto Sánchez",
          role: "Radiólogo Jefe"
        }
      ]
    },
  };

  return (
    <>
      <Navbar />
        {/* Header a ancho completo */}
        <section className="py-16 bg-gradient-to-br from-white via-blue-100 to-green-100">
          <div className="text-center py-8 max-w-3xl mx-auto px-4">
            <div className="bg-white/10 p-2 inline-block rounded-full mb-4">
              <Milestone className="h-6 w-6 text-gray-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-600 mb-6">
              Casos de uso de IAEVA en el sector médico
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Descubre cómo nuestra solución optimiza la atención al paciente y la gestión en diversos establecimientos de salud.
            </p>
          </div>
        </section>

      <div className="bg-white dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <EstablishmentSelector activeType={activeType} setActiveType={setActiveType} />

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              {casesData[activeType].title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {casesData[activeType].description}
            </p>

            <div className="grid grid-cols-1 gap-8">
              {casesData[activeType].caseStudies.map((caseStudy, index) => (
                <CaseStudyCard
                  key={index}
                  title={caseStudy.title}
                  description={caseStudy.description}
                  implementation={caseStudy.implementation}
                  results={caseStudy.results}
                  testimonial={caseStudy.testimonial}
                  expert={caseStudy.expert}
                  role={caseStudy.role}
                  delay={`${index * 0.1}s`}
                />
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-8 md:p-12">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Resultados medibles en todos los centros médicos
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Implementar IAEVA genera beneficios tangibles y cuantificables en múltiples aspectos de la operación y la experiencia del paciente.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center shadow-sm">
                <div className="text-4xl font-bold text-blue-600 mb-2">60%</div>
                <div className="text-gray-600 dark:text-gray-300">Reducción en no-shows</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center shadow-sm">
                <div className="text-4xl font-bold text-green-600 mb-2">75%</div>
                <div className="text-gray-600 dark:text-gray-300">Consultas automatizadas</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center shadow-sm">
                <div className="text-4xl font-bold text-teal-600 mb-2">40%</div>
                <div className="text-gray-600 dark:text-gray-300">Reducción en tiempo administrativo</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center shadow-sm">
                <div className="text-4xl font-bold text-blue-600 mb-2">97%</div>
                <div className="text-gray-600 dark:text-gray-300">Satisfacción de pacientes</div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                ¿Listo para transformar la experiencia de tus pacientes?
              </h3>
              <Link
                to="/contacto"
                className="px-8 py-4 rounded-full bg-gradient-to-r bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white font-medium hover:shadow-lg transition-all duration-300 inline-flex items-center"
              >
                Solicitar demo personalizada <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <SEOKeywordsSection/>
      <Footer />
    </>
  );
};

export default CasosDeUso;

