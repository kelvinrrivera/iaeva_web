import { useEffect } from 'react';
import { SIGNUP_URL } from '@/config/app-urls';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Bot, Shield, BarChart4, Clock, ListChecks, Users } from 'lucide-react';

import PageLayout from '@/components/layout/PageLayout';
import SEOHead from '@/components/shared/SEOHead';
import CTAButton from '@/components/shared/CTAButton';
import { organizationSchema, createFAQSchema, generateBreadcrumbs, socialProfiles } from '@/lib/schema';

const IAEVAHealthcareAssistant = () => {
  const { t } = useTranslation(['common']);
  
  // Efecto para forzar el scroll al inicio cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // FAQ Schema para mejorar la presencia en los resultados de búsqueda
  const faqData = createFAQSchema([
    {
      question: "¿Qué es un asistente virtual para el sector sanitario?",
      answer: "Un asistente virtual para el sector sanitario es una solución de inteligencia artificial especializada que automatiza tareas administrativas, optimiza la gestión de citas médicas, reduce las ausencias de pacientes y mejora la eficiencia operativa de clínicas y hospitales."
    },
    {
      question: "¿Cómo ayuda IAEVA a reducir las ausencias de pacientes?",
      answer: "IAEVA utiliza algoritmos predictivos para identificar patrones de ausencias, envía recordatorios personalizados por múltiples canales, y ofrece reprogramación instantánea cuando detecta posibles cancelaciones, reduciendo las ausencias hasta en un 60%."
    },
    {
      question: "¿Cuáles son las principales ventajas de IAEVA frente a un asistente virtual genérico?",
      answer: "IAEVA está específicamente diseñado para el sector sanitario, con funcionalidades adaptadas a las necesidades de clínicas y hospitales, cumplimiento de normativas de privacidad médica, integración con sistemas de gestión sanitaria, y un enfoque en la optimización de agendas médicas y reducción de ausencias."
    }
  ]);
  
  // Migas de pan para SEO y navegación
  const breadcrumbs = generateBreadcrumbs([
    { name: "Inicio", url: "/" },
    { name: "Asistente sanitario IAEVA", url: "/iaeva-healthcare-assistant" }
  ]);

  return (
    <PageLayout>
      <SEOHead 
        title="🩺 Asistente virtual inteligente para el sector sanitario | IAEVA"
        description="🤖 IAEVA es el asistente virtual especializado en optimización sanitaria. Reduce ausencias de pacientes hasta un 60%, mejora la eficiencia operativa y automatiza comunicaciones con pacientes."
        canonicalUrl="/iaeva-healthcare-assistant"
        ogImage="/images/iaeva-healthcare-assistant.jpg"
        keywords="asistente virtual sanitario, asistente AI para hospitales, optimización agenda médica, gestión citas médicas, reducción ausencias pacientes, automatización sanitaria, IA sector salud"
        structuredData={[organizationSchema, faqData]}
        socialProfiles={socialProfiles}
        breadcrumbs={breadcrumbs}
      />
      
      {/* Cabecera de la página */}
      <section className="pt-20 pb-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Asistente virtual inteligente para el sector sanitario
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              IAEVA es el asistente virtual especializado que optimiza la operación de clínicas y hospitales, 
              reduce ausencias de pacientes hasta un 60% y mejora la eficiencia administrativa mediante 
              inteligencia artificial avanzada.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <CTAButton 
                className="px-6 py-3 rounded-full text-white font-medium bg-gradient-to-r from-iaeva-blue to-iaeva-purple hover:opacity-90 transition-opacity"
                text="Solicitar demo" 
                path={SIGNUP_URL} 
                variant="primary"
                isCalendarButton={true}
              />
              <CTAButton 
                className="px-6 py-3 rounded-full border border-iaeva-blue text-iaeva-blue font-medium hover:bg-blue-50 transition-colors"
                text="Ver casos de uso" 
                path="/casos-de-uso" 
                variant="outline"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Características principales */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Funcionalidades clave de IAEVA</h2>
          
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
                <Clock className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Optimización de agendas</h3>
              <p className="text-gray-600">
                Algoritmos predictivos que optimizan la programación de citas y reducen hasta un 60% 
                las ausencias, maximizando la ocupación y rentabilidad de la clínica.
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
                <BarChart4 className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Análisis de datos</h3>
              <p className="text-gray-600">
                Dashboard analítico con métricas clave para monitorizar y mejorar continuamente 
                la eficiencia operativa del centro médico.
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
                <Users className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Experiencia del paciente</h3>
              <p className="text-gray-600">
                Personalización de la comunicación según el perfil del paciente, facilidad para 
                confirmar, reprogramar o cancelar citas, y atención 24/7.
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
                <Shield className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Seguridad y cumplimiento</h3>
              <p className="text-gray-600">
                Cumplimiento de normativas de protección de datos sanitarios, cifrado de extremo a extremo 
                y privacidad por diseño en todas las interacciones.
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
                <ListChecks className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Integración con sistemas</h3>
              <p className="text-gray-600">
                Compatibilidad con los principales sistemas de gestión hospitalaria y software médico 
                para una implementación sin complicaciones.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para transformar la operación de tu centro médico?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Descubre cómo IAEVA puede ayudarte a reducir ausencias, optimizar tu agenda y mejorar la experiencia de tus pacientes.
          </p>
          <CTAButton 
            className="px-8 py-3 rounded-full bg-white text-iaeva-blue font-medium hover:bg-opacity-90 transition-opacity"
            text="Solicitar demostración gratuita" 
            path={SIGNUP_URL} 
            variant="white"
            isCalendarButton={true}
          />
        </div>
      </section>
      
      {/* Nota: Esta es una versión básica de la página. Se ampliará con contenido más detallado según la estrategia de contenido */}
    </PageLayout>
  );
};

export default IAEVAHealthcareAssistant; 