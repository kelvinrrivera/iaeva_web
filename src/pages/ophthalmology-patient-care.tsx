import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, Eye, Clock, BarChart4, UserCheck, MessageCircle } from 'lucide-react';

import PageLayout from '@/components/layout/PageLayout';
import SEOHead from '@/components/shared/SEOHead';
import CTAButton from '@/components/shared/CTAButton';
import { organizationSchema, createFAQSchema, generateBreadcrumbs, socialProfiles } from '@/lib/schema';

const OphthalmologyPatientCare = () => {
  const { t } = useTranslation(['common']);
  
  // Efecto para forzar el scroll al inicio cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // FAQ Schema para mejorar la presencia en los resultados de búsqueda
  const faqData = createFAQSchema([
    {
      question: "¿Cómo ayuda IAEVA a las clínicas oftalmológicas a gestionar pacientes?",
      answer: "IAEVA optimiza la gestión de pacientes oftalmológicos automatizando recordatorios de citas, enviando instrucciones personalizadas para pre y post consulta/cirugía, gestionando seguimientos ópticos periódicos, y reduciendo las ausencias hasta un 58% mediante comunicación multicanal adaptada a cada paciente."
    },
    {
      question: "¿Puede IAEVA gestionar el seguimiento post-quirúrgico en oftalmología?",
      answer: "Sí, IAEVA automatiza el seguimiento post-quirúrgico oftalmológico enviando recordatorios sobre la aplicación de colirios, instrucciones de cuidado, detección temprana de complicaciones, y programación de revisiones según protocolos establecidos, mejorando la adherencia al tratamiento y resultados clínicos."
    },
    {
      question: "¿Se integra IAEVA con sistemas de gestión oftalmológica?",
      answer: "IAEVA puede funcionar de forma independiente con su propio sistema de gestión de citas o, si lo prefiere, integrarse con su sistema existente. Cada caso se evalúa individualmente para garantizar la máxima seguridad de datos y confidencialidad según las normativas sanitarias."
    }
  ]);
  
  // Migas de pan para SEO y navegación
  const breadcrumbs = generateBreadcrumbs([
    { name: "Inicio", url: "/" },
    { name: "Atención oftalmológica al paciente", url: "/ophthalmology-patient-care" }
  ]);

  return (
    <PageLayout>
      <SEOHead 
        title="👁️ Atención oftalmológica al paciente | IAEVA"
        description="🤖 Optimice su clínica oftalmológica con nuestro asistente virtual. Reduzca ausencias, automatice seguimientos post-cirugía y mejore la experiencia del paciente."
        canonicalUrl="/ophthalmology-patient-care"
        ogImage="/images/ophthalmology-care.jpg"
        keywords="gestión clínica oftalmológica, software oftalmología, asistente virtual oftalmología, reducción ausencias pacientes, seguimiento post-cirugía ocular, recordatorios colirios, gestión citas oftalmólogo"
        structuredData={[organizationSchema, faqData]}
        socialProfiles={socialProfiles}
        breadcrumbs={breadcrumbs}
      />
      
      {/* Cabecera de la página */}
      <section className="pt-20 pb-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Eye className="h-8 w-8 text-purple-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Atención oftalmológica al paciente
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Optimice la gestión de su clínica oftalmológica, reduzca las ausencias y 
              mejore el seguimiento post-tratamiento con nuestro asistente virtual especializado.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <CTAButton 
                className="px-6 py-3 rounded-full text-blue-600 font-medium bg-gradient-to-r from-iaeva-blue to-iaeva-purple hover:opacity-90 transition-opacity"
                text="Solicitar demo" 
                path="/contacto" 
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
              <h3 className="text-4xl font-bold text-iaeva-blue mb-2">-58%</h3>
              <p className="text-gray-700">Reducción de ausencias en clínicas oftalmológicas</p>
            </motion.div>
            
            <motion.div 
              className="bg-purple-50 p-6 rounded-xl text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-4xl font-bold text-purple-600 mb-2">+45%</h3>
              <p className="text-gray-700">Mejora en adherencia post-tratamiento</p>
            </motion.div>
            
            <motion.div 
              className="bg-blue-50 p-6 rounded-xl text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-4xl font-bold text-blue-600 mb-2">7h</h3>
              <p className="text-gray-700">Ahorro semanal en gestión administrativa</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Funcionalidades principales */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Funcionalidades para clínicas oftalmológicas</h2>
          
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
              <h3 className="text-xl font-semibold mb-3">Gestión especializada de citas</h3>
              <p className="text-gray-600">
                Optimiza la programación de diferentes tipos de consultas (revisiones, cirugías, urgencias), 
                gestionando tiempos específicos según procedimiento y personal especializado.
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
                <Eye className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Seguimiento post-quirúrgico</h3>
              <p className="text-gray-600">
                Envío automatizado de instrucciones para aplicación de colirios, 
                cuidados específicos y detección temprana de complicaciones tras 
                procedimientos oftalmológicos.
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
                enviando recordatorios personalizados y facilitando la confirmación o 
                reprogramación con un solo clic.
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
              <h3 className="text-xl font-semibold mb-3">Recordatorios periódicos</h3>
              <p className="text-gray-600">
                Gestión inteligente de revisiones periódicas para pacientes con patologías 
                crónicas (glaucoma, DMAE, etc.), con recordatorios personalizados según protocolo.
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
                enviar instrucciones pre y post-consulta, y resolver dudas frecuentes.
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
              <h3 className="text-xl font-semibold mb-3">Analítica clínica</h3>
              <p className="text-gray-600">
                Dashboard con métricas clave sobre asistencia, tipos de procedimientos, 
                efectividad de tratamientos y seguimiento para optimizar la práctica clínica.
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
                Para clínicas oftalmológicas sin sistema existente o que prefieran una solución 
                separada, ofrecemos una plataforma completa de agendamiento especializada.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-3">Integración con su sistema actual</h3>
              <p className="text-gray-600">
                Para centros con sistemas propios, evaluamos caso por caso las posibilidades
                de integración, priorizando la confidencialidad y seguridad de datos de pacientes.
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
              <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 p-12 text-white">
                <div className="text-2xl font-bold mb-4">Análisis del sector</div>
                <h3 className="text-3xl font-bold mb-6">Su clínica oftalmológica con IAEVA</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">→</span>
                    <span>Reducción de hasta 58% en ausencias a consultas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">→</span>
                    <span>Aumento proyectado del 45% en adherencia a tratamientos post-cirugía</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">→</span>
                    <span>Optimización estimada del 22% en ocupación de quirófanos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">→</span>
                    <span>Potencial incremento del 20% en los ingresos mensuales</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 p-12">
                <h3 className="text-xl font-bold mb-4">Basado en investigación de mercado</h3>
                <blockquote className="italic text-gray-600 mb-6">
                  "Los datos del sector oftalmológico muestran que las clínicas que implementan 
                  sistemas de gestión automatizada de seguimiento post-quirúrgico y recordatorios 
                  personalizados logran mejoras significativas en la adherencia al tratamiento y 
                  una reducción notable en las ausencias. IAEVA está diseñado específicamente para 
                  resolver estos desafíos en centros oftalmológicos, con el potencial de transformar 
                  tanto la experiencia del paciente como la eficiencia operativa."
                </blockquote>
                <div>
                  <p className="font-bold">Equipo de análisis de IAEVA</p>
                  <p className="text-gray-500">Basado en investigación clínica y tendencias del sector oftalmológico</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Eleve su clínica oftalmológica al siguiente nivel</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Descubra cómo IAEVA puede transformar la gestión de su centro oftalmológico, 
            reducir ausencias y mejorar la adherencia a los tratamientos.
          </p>
          <CTAButton 
            className="px-8 py-3 rounded-full bg-white text-purple-600 font-medium hover:bg-opacity-90 transition-opacity"
            text="Solicitar demostración gratuita" 
            path="/contacto" 
            variant="white"
          />
        </div>
      </section>
    </PageLayout>
  );
};

export default OphthalmologyPatientCare; 