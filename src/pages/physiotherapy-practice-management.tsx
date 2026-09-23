import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, Activity, Clock, BarChart4, UserCheck, MessageCircle, Stethoscope } from 'lucide-react';

import PageLayout from '@/components/layout/PageLayout';
import SEOHead from '@/components/shared/SEOHead';
import CTAButton from '@/components/shared/CTAButton';
import { organizationSchema, createFAQSchema, generateBreadcrumbs, socialProfiles } from '@/lib/schema';

const PhysiotherapyPracticeManagement = () => {
  const { t } = useTranslation(['common']);
  
  // Efecto para forzar el scroll al inicio cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // FAQ Schema para mejorar la presencia en los resultados de búsqueda
  const faqData = createFAQSchema([
    {
      question: "¿Cómo ayuda IAEVA a las clínicas de fisioterapia a gestionar pacientes?",
      answer: "IAEVA optimiza la gestión de pacientes en fisioterapia automatizando recordatorios de citas, enviando instrucciones de ejercicios personalizados, gestionando el seguimiento de tratamientos prolongados, y reduciendo las ausencias hasta un 60% mediante comunicaciones multicanal (WhatsApp, email, SMS)."
    },
    {
      question: "¿Puede IAEVA gestionar planes de tratamiento fisioterapéuticos?",
      answer: "Sí, IAEVA facilita el seguimiento de planes de tratamiento enviando automáticamente instrucciones de ejercicios, recordatorios personalizados según la fase de rehabilitación, y consultas de progreso. El sistema puede programar sesiones en serie y ajustar la frecuencia según evoluciona el tratamiento."
    },
    {
      question: "¿Se integra IAEVA con los sistemas de gestión para fisioterapeutas?",
      answer: "IAEVA puede funcionar de forma independiente con su propio sistema de gestión de citas o, si lo prefiere, integrarse con su sistema existente. La implementación es rápida, requiere mínima intervención técnica y mantiene la continuidad de sus procesos actuales, garantizando siempre la máxima seguridad de los datos."
    }
  ]);
  
  // Migas de pan para SEO y navegación
  const breadcrumbs = generateBreadcrumbs([
    { name: "Inicio", url: "/" },
    { name: "Gestión de prácticas de fisioterapia", url: "/physiotherapy-practice-management" }
  ]);

  return (
    <PageLayout>
      <SEOHead 
        title="🏥 Gestión de prácticas de fisioterapia | IAEVA"
        description="🤖 Optimice su clínica de fisioterapia con nuestro asistente virtual. Reduzca ausencias, automatice seguimientos de tratamientos y mejore la experiencia del paciente."
        canonicalUrl="/physiotherapy-practice-management"
        ogImage="/images/physiotherapy-management.jpg"
        keywords="gestión fisioterapia, software clínica fisioterapia, agenda fisioterapeutas, reducción ausencias pacientes, recordatorios ejercicios, seguimiento tratamientos, asistente virtual fisioterapia"
        structuredData={[organizationSchema, faqData]}
        socialProfiles={socialProfiles}
        breadcrumbs={breadcrumbs}
      />
      
      {/* Cabecera de la página */}
      <section className="pt-20 pb-16 bg-gradient-to-r from-sky-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-sky-100 to-indigo-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Stethoscope className="h-8 w-8 text-indigo-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Gestión de prácticas de fisioterapia
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Optimice la gestión de su clínica de fisioterapia, reduzca las ausencias y 
              mejore el seguimiento de tratamientos con nuestro asistente virtual especializado.
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
                className="px-6 py-3 rounded-full text-cyan-600 text-dark font-medium hover:bg-blue-50 transition-colors"
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
              className="bg-blue-50 p-6 rounded-xl text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-4xl font-bold text-iaeva-blue mb-2">-55%</h3>
              <p className="text-gray-700">Reducción de ausencias en clínicas de fisioterapia</p>
            </motion.div>
            
            <motion.div 
              className="bg-indigo-50 p-6 rounded-xl text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-4xl font-bold text-indigo-600 mb-2">+40%</h3>
              <p className="text-gray-700">Mejora en adherencia a ejercicios terapéuticos</p>
            </motion.div>
            
            <motion.div 
              className="bg-sky-50 p-6 rounded-xl text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-4xl font-bold text-sky-600 mb-2">6h</h3>
              <p className="text-gray-700">Ahorro semanal en gestión administrativa</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Funcionalidades principales */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Funcionalidades para clínicas de fisioterapia</h2>
          
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
              <h3 className="text-xl font-semibold mb-3">Gestión de series de tratamientos</h3>
              <p className="text-gray-600">
                Programa y gestiona automáticamente series completas de sesiones con frecuencias 
                específicas, adaptándose a la evolución del paciente y a la disponibilidad del fisioterapeuta.
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
                <Activity className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Seguimiento de ejercicios</h3>
              <p className="text-gray-600">
                Envío automatizado de instrucciones de ejercicios personalizados con videos y 
                recordatorios periódicos para mejorar la adherencia al plan de rehabilitación.
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
              <h3 className="text-xl font-semibold mb-3">Prevención de ausencias</h3>
              <p className="text-gray-600">
                Sistema predictivo que identifica pacientes con riesgo de no asistir, 
                enviando recordatorios personalizados y facilitando la confirmación con un clic.
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
              <h3 className="text-xl font-semibold mb-3">Gestión de progreso</h3>
              <p className="text-gray-600">
                Seguimiento automatizado del avance del paciente, con consultas periódicas de 
                progreso y ajustes dinámicos en el plan de tratamiento según la evolución.
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
                Interacción con pacientes a través de WhatsApp, email y SMS para confirmar citas,
                enviar instrucciones de ejercicios y resolver dudas sobre tratamientos.
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
              <h3 className="text-xl font-semibold mb-3">Analítica de resultados</h3>
              <p className="text-gray-600">
                Dashboard con métricas clave sobre asistencia, evolución de pacientes y 
                efectividad de los tratamientos para optimizar la práctica clínica.
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
                Para centros sin sistema existente o que prefieran una solución separada, 
                ofrecemos una plataforma completa de agendamiento con todas las funciones necesarias.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-3">Integración con su sistema actual</h3>
              <p className="text-gray-600">
                Para centros con sistemas propios, evaluamos caso por caso las posibilidades
                de integración, manteniendo siempre los más altos estándares de ciberseguridad.
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
              <div className="md:w-1/2 bg-gradient-to-br from-sky-600 to-indigo-600 p-12 text-white">
                <div className="text-2xl font-bold mb-4">Análisis del sector</div>
                <h3 className="text-3xl font-bold mb-6">Su clínica de fisioterapia con IAEVA</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">→</span>
                    <span>Reducción de hasta 55% en ausencias a sesiones de fisioterapia</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">→</span>
                    <span>Aumento proyectado del 40% en adherencia a ejercicios domiciliarios</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">→</span>
                    <span>Optimización estimada del 25% en el tiempo de ocupación de salas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">→</span>
                    <span>Potencial incremento del 18% en los ingresos mensuales</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 p-12">
                <h3 className="text-xl font-bold mb-4">Basado en investigación de mercado</h3>
                <blockquote className="italic text-gray-600 mb-6">
                  "La investigación del sector de fisioterapia indica que las clínicas que 
                  implementan sistemas de seguimiento de ejercicios y gestión automatizada de citas 
                  logran mejoras significativas en la adherencia al tratamiento y reducción de ausencias. 
                  IAEVA ha sido diseñado específicamente para abordar estos desafíos en centros de 
                  fisioterapia, con el potencial de transformar tanto los resultados clínicos como operativos."
                </blockquote>
                <div>
                  <p className="font-bold">Equipo de análisis de IAEVA</p>
                  <p className="text-gray-500">Basado en tendencias del sector y mejores prácticas clínicas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-sky-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Eleve su clínica de fisioterapia al siguiente nivel</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Descubra cómo IAEVA puede transformar la operación de su centro de fisioterapia, 
            reducir ausencias y mejorar la adherencia a los tratamientos.
          </p>
          <CTAButton 
            className="px-8 py-3 rounded-full bg-white text-indigo-600 font-medium hover:bg-opacity-90 transition-opacity"
            text="Solicitar demostración gratuita" 
            path="/contacto" 
            variant="white"
            isCalendarButton={true}
          />
        </div>
      </section>
    </PageLayout>
  );
};

export default PhysiotherapyPracticeManagement; 