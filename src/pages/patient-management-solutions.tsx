import { useEffect } from 'react';
import { SIGNUP_URL } from '@/config/app-urls';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, BellRing, Bot, Users, MessageCircle, BarChart4, UserCog } from 'lucide-react';
import { Link } from 'react-router-dom';

import PageLayout from '@/components/layout/PageLayout';
import SEOHead from '@/components/shared/SEOHead';
import CTAButton from '@/components/shared/CTAButton';
import { organizationSchema, createFAQSchema, generateBreadcrumbs, socialProfiles } from '@/lib/schema';

const PatientManagementSolutions = () => {
  const { t } = useTranslation(['common']);
  
  // Efecto para forzar el scroll al inicio cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // FAQ Schema para mejorar la presencia en los resultados de búsqueda
  const faqData = createFAQSchema([
    {
      question: "¿Qué es IAEVA y cómo mejora la gestión de pacientes?",
      answer: "IAEVA es un asistente virtual inteligente especializado en el sector sanitario que automatiza la comunicación con pacientes a través de múltiples canales (WhatsApp, email, SMS), gestiona citas médicas, reduce ausencias hasta un 60%, y optimiza la operación de centros médicos, liberando al personal administrativo de tareas repetitivas."
    },
    {
      question: "¿Cómo ayuda IAEVA a reducir las ausencias de pacientes?",
      answer: "IAEVA reduce las ausencias mediante un sistema que combina: recordatorios personalizados según el perfil del paciente, confirmación de citas con un solo clic, algoritmos predictivos que identifican pacientes con alto riesgo de ausencia, reprogramación instantánea ante posibles cancelaciones, y gestión eficiente de listas de espera para cubrir huecos."
    },
    {
      question: "¿Con qué sistemas de gestión sanitaria es compatible IAEVA?",
      answer: "IAEVA puede funcionar de forma independiente con su propio sistema de gestión de citas o, si se prefiere, puede evaluarse la integración con sistemas existentes. Cada caso se estudia individualmente, priorizando siempre la seguridad de los datos y cumpliendo estrictamente con la normativa de protección de datos sanitarios."
    }
  ]);
  
  // Migas de pan para SEO y navegación
  const breadcrumbs = generateBreadcrumbs([
    { name: "Inicio", url: "/" },
    { name: "Gestión de pacientes", url: "/patient-management-solutions" }
  ]);

  return (
    <PageLayout>
      <SEOHead 
        title="🏥 Soluciones de gestión de pacientes | IAEVA"
        description="🤖 Transforme la gestión de pacientes en su centro médico con IAEVA. Reducción de ausencias, optimización de agendas y comunicación multicanal automatizada."
        canonicalUrl="/patient-management-solutions"
        ogImage="/images/patient-management-solutions.jpg"
        keywords="gestión pacientes, reducción ausencias médicas, optimización agenda clínica, comunicación automatizada pacientes, asistente virtual sanitario, eficiencia operativa sanidad"
        structuredData={[organizationSchema]}
        socialProfiles={socialProfiles}
        breadcrumbs={breadcrumbs}
        hreflang={[
          { lang: 'es', url: '/patient-management-solutions' },
          { lang: 'fr', url: '/fr/patient-management-solutions' }
        ]}
      />
      
      {/* Cabecera de la página */}
      <section className="pt-20 pb-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <UserCog className="h-8 w-8 text-iaeva-blue" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Soluciones de gestión de pacientes
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Transforme la comunicación con sus pacientes, optimice la gestión de citas y 
              mejore la eficiencia operativa de su centro médico con nuestro asistente virtual inteligente.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <CTAButton 
                className="px-6 py-3 rounded-full text-white font-medium bg-gradient-to-r from-iaeva-blue to-iaeva-purple hover:opacity-90 transition-opacity"
                text="Solicitar demo" 
                path={SIGNUP_URL} 
                variant="primary"
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
              <h3 className="text-4xl font-bold text-iaeva-blue mb-2">-60%</h3>
              <p className="text-gray-700">Reducción de ausencias de pacientes</p>
            </motion.div>
            
            <motion.div 
              className="bg-green-50 p-6 rounded-xl text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-4xl font-bold text-green-600 mb-2">+35%</h3>
              <p className="text-gray-700">Aumento en eficiencia administrativa</p>
            </motion.div>
            
            <motion.div 
              className="bg-purple-50 p-6 rounded-xl text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-4xl font-bold text-purple-600 mb-2">24/7</h3>
              <p className="text-gray-700">Atención automatizada a pacientes</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Características principales */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Soluciones completas para la gestión de pacientes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Bot className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Asistente virtual multicanal</h3>
              <p className="text-gray-600">
                Comunicación automatizada con pacientes a través de WhatsApp, email, SMS y llamadas 
                para gestión de citas, recordatorios y resolución de consultas frecuentes.
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
              <h3 className="text-xl font-semibold mb-3">Gestión inteligente de citas</h3>
              <p className="text-gray-600">
                Sistema avanzado que optimiza agendas según parámetros clínicos y operativos, 
                facilita la programación y reprogramación, y gestiona cancelaciones de forma eficiente.
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
                <BellRing className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Prevención de ausencias</h3>
              <p className="text-gray-600">
                Algoritmos predictivos que identifican pacientes con riesgo de no asistir, 
                combinados con recordatorios personalizados y confirmación simplificada.
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
              <h3 className="text-xl font-semibold mb-3">Comunicación personalizada</h3>
              <p className="text-gray-600">
                Mensajes adaptados al perfil del paciente, tipo de cita, y preferencias de 
                comunicación, aumentando la efectividad y mejorando la experiencia.
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
                <Users className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Experiencia del paciente</h3>
              <p className="text-gray-600">
                Mejora integral de la interacción del paciente con su centro médico, desde la 
                reserva de citas hasta el seguimiento post-consulta, con atención 24/7.
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
              <h3 className="text-xl font-semibold mb-3">Analítica y mejora continua</h3>
              <p className="text-gray-600">
                Dashboard con métricas clave sobre asistencia, comunicaciones y satisfacción, 
                permitiendo una optimización continua basada en datos reales.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Especialidades */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Soluciones para cada especialidad médica</h2>
            <p className="text-lg text-gray-600">
              IAEVA se adapta a las necesidades específicas de cada tipo de centro médico, 
              con funcionalidades personalizadas para maximizar su eficacia.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="w-2 h-2 rounded-full bg-iaeva-blue mr-2"></span>
                <Link to="/dental-clinic-assistant">Clínicas dentales</Link>
              </h3>
              <p className="text-gray-600">Gestión de citas, recordatorios de tratamientos y seguimiento personalizado.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="w-2 h-2 rounded-full bg-iaeva-blue mr-2"></span>
                <Link to="/physiotherapy-practice-management">Fisioterapia</Link>
              </h3>
              <p className="text-gray-600">Programación de sesiones, seguimiento de tratamientos y recordatorios de ejercicios.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="w-2 h-2 rounded-full bg-iaeva-blue mr-2"></span>
                <Link to="/ophthalmology-patient-care">Oftalmología</Link>
              </h3>
              <p className="text-gray-600">Gestión de citas, recordatorios para revisiones y seguimiento post-operatorio.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="w-2 h-2 rounded-full bg-iaeva-blue mr-2"></span>
                Clínicas estéticas
              </h3>
              <p className="text-gray-600">Reservas, consultas sobre procedimientos y seguimiento personalizado.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="w-2 h-2 rounded-full bg-iaeva-blue mr-2"></span>
                Centros diagnósticos
              </h3>
              <p className="text-gray-600">Recordatorios para preparación previa y comunicación de resultados.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="w-2 h-2 rounded-full bg-iaeva-blue mr-2"></span>
                <Link to="/medical-center-efficiency">Centros médicos generales</Link>
              </h3>
              <p className="text-gray-600">Gestión integral de pacientes, especialidades y servicios médicos.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Estudio de caso */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-gradient-to-br from-iaeva-blue to-iaeva-purple p-12 text-white">
                <div className="text-2xl font-bold mb-4">Análisis del sector sanitario</div>
                <h3 className="text-3xl font-bold mb-6">Su centro con asistencia virtual</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">→</span>
                    <span>Reducción de hasta 60% en ausencias de pacientes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">→</span>
                    <span>Aumento proyectado del 35% en eficiencia administrativa</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">→</span>
                    <span>Atención automatizada 24/7 a consultas de pacientes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">→</span>
                    <span>Integración flexible con sus sistemas actuales</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 p-12">
                <h3 className="text-xl font-bold mb-6">Investigación del sector sanitario</h3>
                <blockquote className="italic text-gray-600 mb-6">
                  "Según estudios recientes del sector sanitario, la implementación de asistentes virtuales 
                  especializados puede reducir significativamente la carga administrativa del personal 
                  médico, permitiéndoles centrarse en la atención al paciente. Los centros sanitarios 
                  que automatizan la comunicación y gestión de citas mejoran tanto sus resultados operativos 
                  como la experiencia del paciente, logrando un aumento significativo en la retención y 
                  satisfacción."
                </blockquote>
                <div className="mb-6">
                  <p className="font-bold">Equipo de investigación de IAEVA</p>
                  <p className="text-gray-500">Basado en análisis de múltiples sectores sanitarios</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <p className="text-xl font-bold text-iaeva-blue">78%</p>
                    <p className="text-sm text-gray-600">de pacientes prefieren recordatorios automatizados</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <p className="text-xl font-bold text-iaeva-purple">92%</p>
                    <p className="text-sm text-gray-600">mayor precisión en confirmaciones</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Transforme la gestión de pacientes de su centro</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Descubra cómo IAEVA puede ayudarle a automatizar comunicaciones, 
            reducir ausencias y mejorar la experiencia tanto de pacientes como de profesionales.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <CTAButton 
              className="px-8 py-3 rounded-full bg-white text-iaeva-blue font-medium hover:bg-opacity-90 transition-opacity"
              text="Solicitar demostración" 
              path={SIGNUP_URL} 
              variant="white"
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

export default PatientManagementSolutions; 