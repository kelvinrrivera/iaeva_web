import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, Building, Clock, BarChart4, UserCheck, MessageCircle, Hospital } from 'lucide-react';

import PageLayout from '@/components/layout/PageLayout';
import SEOHead from '@/components/shared/SEOHead';
import CTAButton from '@/components/shared/CTAButton';
import { organizationSchema, createFAQSchema, generateBreadcrumbs, socialProfiles } from '@/lib/schema';

const MedicalCenterEfficiency = () => {
  const { t } = useTranslation(['common']);
  
  // Efecto para forzar el scroll al inicio cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // FAQ Schema para mejorar la presencia en los resultados de búsqueda
  const faqData = createFAQSchema([
    {
      question: "¿Cómo incrementa IAEVA la eficiencia en centros médicos?",
      answer: "IAEVA incrementa la eficiencia en centros médicos optimizando la gestión de citas con múltiples especialistas, reduciendo las ausencias hasta un 62%, automatizando comunicaciones con pacientes, gestionando listas de espera de manera inteligente, y liberando al personal administrativo de tareas repetitivas para centrarse en atención personalizada."
    },
    {
      question: "¿Cómo gestiona IAEVA las citas con múltiples especialistas?",
      answer: "IAEVA coordina citas con múltiples especialistas mediante un sistema inteligente que sincroniza agendas de diferentes profesionales, optimiza rutas de pacientes dentro del centro, minimiza tiempos de espera entre consultas, y envía recordatorios específicos para cada tipo de cita, mejorando la experiencia del paciente y la eficiencia operativa."
    },
    {
      question: "¿Qué métricas y análisis proporciona IAEVA para gestionar un centro médico?",
      answer: "IAEVA proporciona un completo dashboard analítico con métricas clave: tasas de asistencia por especialidad, distribución de citas por franjas horarias, efectividad de recordatorios según canal, ocupación de salas, tiempos medios de espera, y patrones de comportamiento de pacientes, permitiendo tomar decisiones basadas en datos para optimizar continuamente la operación."
    }
  ]);
  
  // Migas de pan para SEO y navegación
  const breadcrumbs = generateBreadcrumbs([
    { name: "Inicio", url: "/" },
    { name: "Eficiencia en centros médicos", url: "/medical-center-efficiency" }
  ]);

  return (
    <PageLayout>
      <SEOHead 
        title="🏥 Eficiencia en centros médicos | IAEVA"
        description="🤖 Optimice la operación de su centro médico con nuestro asistente virtual. Reduzca ausencias, coordine especialistas y mejore la experiencia del paciente."
        canonicalUrl="/medical-center-efficiency"
        ogImage="/images/medical-center-efficiency.jpg"
        keywords="eficiencia centros médicos, asistente virtual sanidad, gestión citas médicas, coordinación especialistas, reducción ausencias pacientes, automatización agenda médica, optimización clínicas"
        structuredData={[organizationSchema, faqData]}
        socialProfiles={socialProfiles}
        breadcrumbs={breadcrumbs}
        hreflang={[
          { lang: 'es', url: '/medical-center-efficiency' },
          { lang: 'fr', url: '/fr/medical-center-efficiency' }
        ]}
      />
      
      {/* Cabecera de la página */}
      <section className="pt-20 pb-16 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Hospital className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Eficiencia en centros médicos
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Optimice la operación de su centro médico, coordine múltiples especialistas y 
              mejore la experiencia del paciente con nuestro asistente virtual inteligente.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <CTAButton 
                className="px-6 py-3 rounded-full text-white font-medium bg-gradient-to-r from-iaeva-blue to-iaeva-purple hover:opacity-90 transition-opacity"
                text="Solicitar demo" 
                path="/contacto" 
                variant="primary"
                isCalendarButton={true}
              />
              <CTAButton 
                className="px-6 py-3 rounded-full text-cyan-600 text-dark font-medium hover:bg-green-50 transition-colors"
                text="Calcular ROI" 
                path="/calculadora-roi" 
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
              className="bg-green-50 p-6 rounded-xl text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-4xl font-bold text-green-600 mb-2">-62%</h3>
              <p className="text-gray-700">Reducción de ausencias en centros médicos</p>
            </motion.div>
            
            <motion.div 
              className="bg-blue-50 p-6 rounded-xl text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-4xl font-bold text-iaeva-blue mb-2">+38%</h3>
              <p className="text-gray-700">Aumento en eficiencia administrativa</p>
            </motion.div>
            
            <motion.div 
              className="bg-teal-50 p-6 rounded-xl text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-4xl font-bold text-teal-600 mb-2">+25%</h3>
              <p className="text-gray-700">Mejora en la satisfacción del paciente</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Funcionalidades principales */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Soluciones para centros médicos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Building className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Coordinación multiespecialidad</h3>
              <p className="text-gray-600">
                Sistema inteligente que coordina citas con diferentes especialistas, 
                optimizando rutas de pacientes y minimizando tiempos de espera entre consultas.
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
              <h3 className="text-xl font-semibold mb-3">Optimización de agendas</h3>
              <p className="text-gray-600">
                Algoritmos avanzados que maximizan la ocupación de consultas según 
                patrones históricos, prioridades clínicas y preferencias de pacientes.
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
                <UserCheck className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Reducción de ausencias</h3>
              <p className="text-gray-600">
                Sistema predictivo que identifica pacientes con riesgo de no asistir, 
                combinado con recordatorios personalizados y confirmación simplificada.
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
                <Clock className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Gestión de listas de espera</h3>
              <p className="text-gray-600">
                Administración inteligente de pacientes en espera, cubriendo cancelaciones 
                con prioridad clínica y optimizando la ocupación de cada especialista.
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
              <h3 className="text-xl font-semibold mb-3">Comunicación multicanal</h3>
              <p className="text-gray-600">
                Interacción personalizada con pacientes a través de WhatsApp, email y SMS 
                para confirmaciones, instrucciones pre-consulta y resolución de dudas.
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
              <h3 className="text-xl font-semibold mb-3">Analítica operativa</h3>
              <p className="text-gray-600">
                Dashboard completo con métricas de asistencia, ocupación por especialidad, 
                tiempos de espera y patrones de comportamiento para optimizar la operación.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Integración con sistemas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Flexibilidad en la gestión de citas</h2>
            <p className="text-lg text-gray-600">
              IAEVA ofrece una solución flexible que puede funcionar de forma independiente 
              o adaptarse a su sistema actual, garantizando siempre la máxima seguridad de datos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-3">Sistema propio de gestión de citas</h3>
              <p className="text-gray-600">
                Para centros médicos sin sistema existente o que prefieran una solución separada, 
                ofrecemos una plataforma completa de agendamiento con todas las funciones necesarias.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-3">Evaluación de integración personalizada</h3>
              <p className="text-gray-600">
                Para centros con sistemas propios, analizamos cada caso individualmente,
                priorizando la seguridad de los datos y la integridad de su infraestructura existente.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Estudio de caso */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-gradient-to-br from-green-600 to-teal-600 p-12 text-white">
                <div className="text-2xl font-bold mb-4">Análisis del sector</div>
                <h3 className="text-3xl font-bold mb-6">Su centro médico con IAEVA</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">→</span>
                    <span>Reducción de hasta 62% en ausencias a consultas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">→</span>
                    <span>Aumento proyectado del 38% en eficiencia administrativa</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">→</span>
                    <span>Optimización estimada del 28% en ocupación de especialistas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">→</span>
                    <span>Potencial incremento del 22% en la facturación mensual</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 p-12">
                <h3 className="text-xl font-bold mb-4">Basado en investigación de mercado</h3>
                <blockquote className="italic text-gray-600 mb-6">
                  "Los estudios del sector sanitario muestran que los centros médicos que implementan 
                  soluciones de automatización en la gestión de citas y coordinación entre especialistas 
                  logran mejoras significativas en su eficiencia operativa. IAEVA ha sido diseñado 
                  específicamente para abordar los principales desafíos de coordinación y comunicación 
                  en centros sanitarios multidisciplinares, con el potencial de transformar la 
                  experiencia tanto de pacientes como de profesionales."
                </blockquote>
                <div>
                  <p className="font-bold">Equipo de análisis de IAEVA</p>
                  <p className="text-gray-500">Basado en estudios del sector y estándares de eficiencia hospitalaria</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Eleve la eficiencia de su centro médico</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Descubra cómo IAEVA puede optimizar la operación de su centro médico, 
            reducir ausencias y mejorar tanto la experiencia del paciente como los resultados económicos.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <CTAButton 
              className="px-8 py-3 rounded-full bg-white text-teal-600 font-medium hover:bg-opacity-90 transition-opacity"
              text="Solicitar demostración" 
              path="/contacto" 
              variant="white"
              isCalendarButton={true}
            />
            <CTAButton 
              className="px-8 py-3 rounded-full border border-white text-white font-medium hover:bg-opacity-10 hover:bg-white transition-colors"
              text="Calcular ahorro" 
              path="/calculadora-roi" 
              variant="outline-white"
            />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default MedicalCenterEfficiency; 