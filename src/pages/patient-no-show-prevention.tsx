import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, BrainCircuit, BellRing, ClipboardCheck, BarChart3 } from 'lucide-react';

import PageLayout from '@/components/layout/PageLayout';
import SEOHead from '@/components/shared/SEOHead';
import CTAButton from '@/components/shared/CTAButton';
import { organizationSchema, createFAQSchema, generateBreadcrumbs, socialProfiles } from '@/lib/schema';

const PatientNoShowPrevention = () => {
  const { t } = useTranslation(['common']);
  
  // Efecto para forzar el scroll al inicio cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // FAQ Schema para mejorar la presencia en los resultados de búsqueda
  const faqData = createFAQSchema([
    {
      question: "¿Cuánto cuestan las ausencias de pacientes a los centros médicos?",
      answer: "Las ausencias de pacientes pueden costar entre 150€ y 300€ por cita perdida, considerando el tiempo del profesional sanitario, recursos administrativos y oportunidad perdida. Para un centro médico medio, esto puede suponer pérdidas de 50.000€ a 150.000€ anuales."
    },
    {
      question: "¿Cómo reduce IAEVA el porcentaje de ausencias en consultas médicas?",
      answer: "IAEVA reduce las ausencias hasta en un 60% mediante una combinación de recordatorios personalizados multicanal, análisis predictivo para identificar pacientes con alto riesgo de ausencia, reprogramación automatizada y confirmación simplificada de citas."
    },
    {
      question: "¿Qué factores influyen en las ausencias de pacientes?",
      answer: "Los principales factores incluyen el olvido de la cita, problemas de transporte, conflictos de horario, mejora del paciente, tiempo de espera prolongado para la cita, barreras financieras y miedo o ansiedad relacionados con la visita médica."
    }
  ]);
  
  // Migas de pan para SEO y navegación
  const breadcrumbs = generateBreadcrumbs([
    { name: "Inicio", url: "/" },
    { name: "Prevención de ausencias", url: "/patient-no-show-prevention" }
  ]);

  return (
    <PageLayout>
      <SEOHead 
        title="📅 Prevención de ausencias de pacientes | Reducción de no-shows hasta 60% | IAEVA"
        description="🤖 Sistema inteligente para reducir ausencias de pacientes hasta un 60%. Optimice su agenda médica, mejore la rentabilidad y ofrezca mejor experiencia al paciente con IAEVA."
        canonicalUrl="/patient-no-show-prevention"
        ogImage="/images/patient-no-show-prevention.jpg"
        keywords="prevención ausencias pacientes, reducción no-shows médicos, optimización agenda médica, recordatorios citas médicas, sistema reducción ausencias, algoritmo predicción cancelaciones, confirmación citas automática"
        structuredData={[organizationSchema, faqData]}
        socialProfiles={socialProfiles}
        breadcrumbs={breadcrumbs}
      />
      
      {/* Cabecera de la página */}
      <section className="pt-20 pb-16 bg-gradient-to-r from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Prevención de ausencias de pacientes
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Sistema de inteligencia artificial que reduce las ausencias de pacientes hasta un 60%,
              optimizando la ocupación de agendas médicas, mejorando la rentabilidad y ofreciendo
              una mejor experiencia al paciente.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <CTAButton 
                className="px-6 py-3 rounded-full text-white font-medium bg-gradient-to-r from-iaeva-blue to-iaeva-purple hover:opacity-90 transition-opacity"
                text="Calcular ahorro potencial" 
                path="/calculadora-roi" 
                variant="primary"
              />
              <CTAButton 
                className="px-6 py-3 rounded-full border border-iaeva-blue text-iaeva-blue font-medium hover:bg-blue-50 transition-colors"
                text="Ver casos de éxito" 
                path="/casos-de-uso" 
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
              <h3 className="text-4xl font-bold text-iaeva-blue mb-2">5-30%</h3>
              <p className="text-gray-700">Tasa media de ausencias en centros médicos sin sistema de prevención</p>
            </motion.div>
            
            <motion.div 
              className="bg-green-50 p-6 rounded-xl text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-4xl font-bold text-green-600 mb-2">60%</h3>
              <p className="text-gray-700">Reducción media de ausencias con el sistema IAEVA</p>
            </motion.div>
            
            <motion.div 
              className="bg-purple-50 p-6 rounded-xl text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-4xl font-bold text-purple-600 mb-2">+25%</h3>
              <p className="text-gray-700">Incremento en la rentabilidad de consultas médicas</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Características principales */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Estrategias avanzadas para prevenir ausencias</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <BrainCircuit className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Predicción de ausencias</h3>
              <p className="text-gray-600">
                Algoritmos predictivos que identifican patrones de comportamiento para detectar 
                pacientes con alto riesgo de ausencia y aplicar estrategias específicas de prevención.
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
                <BellRing className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Recordatorios personalizados</h3>
              <p className="text-gray-600">
                Sistema multicanal (WhatsApp, email, SMS, llamadas) con mensajes personalizados 
                según el perfil del paciente y tipo de cita médica.
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
                <Calendar className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Gestión de lista de espera</h3>
              <p className="text-gray-600">
                Relleno automático de huecos por cancelaciones mediante listas de espera inteligentes 
                que maximizan la ocupación de la agenda.
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
                <ClipboardCheck className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Confirmación simplificada</h3>
              <p className="text-gray-600">
                Proceso de confirmación de citas con un solo clic, facilitando la interacción 
                del paciente y aumentando la probabilidad de asistencia.
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
                <BarChart3 className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Análisis y mejora continua</h3>
              <p className="text-gray-600">
                Dashboard con métricas detalladas de asistencia, causas de cancelación y efectividad 
                de estrategias para optimización continua.
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
                <TrendingUp className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Optimización de horarios</h3>
              <p className="text-gray-600">
                Recomendaciones para ajustar la programación de citas según patrones históricos 
                de asistencia, maximizando la productividad del centro.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Llamada a la acción */}
      <section className="py-16 bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Cuánto podrías ahorrar reduciendo ausencias?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Utiliza nuestra calculadora ROI para estimar el impacto económico que tendría reducir 
            las ausencias en tu centro médico con IAEVA.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <CTAButton 
              className="px-8 py-3 rounded-full bg-white text-iaeva-blue font-medium hover:bg-opacity-90 transition-opacity"
              text="Calcular ahorro potencial" 
              path="/calculadora-roi" 
              variant="white"
            />
            <CTAButton 
              className="px-8 py-3 rounded-full border border-white text-white font-medium hover:bg-opacity-10 hover:bg-white transition-colors"
              text="Solicitar demostración" 
              path="/contacto" 
              variant="outline-white"
            />
          </div>
        </div>
      </section>
      
      {/* Nota: Esta es una versión básica de la página. Se ampliará con contenido más detallado según la estrategia de contenido */}
    </PageLayout>
  );
};

export default PatientNoShowPrevention; 