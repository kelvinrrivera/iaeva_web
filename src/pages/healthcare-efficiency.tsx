import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Gauge, Users, Clock, Bot, ClipboardList, Settings } from 'lucide-react';

import PageLayout from '@/components/layout/PageLayout';
import SEOHead from '@/components/shared/SEOHead';
import CTAButton from '@/components/shared/CTAButton';
import { organizationSchema, createFAQSchema, generateBreadcrumbs, socialProfiles } from '@/lib/schema';

const HealthcareEfficiency = () => {
  const { t } = useTranslation(['common']);
  
  // Efecto para forzar el scroll al inicio cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // FAQ Schema para mejorar la presencia en los resultados de búsqueda
  const faqData = createFAQSchema([
    {
      question: "¿Cómo medir la eficiencia operativa en un centro médico?",
      answer: "La eficiencia operativa en centros médicos se mide a través de indicadores clave como la tasa de ocupación de agendas, tiempo medio de espera, coste por paciente atendido, tasa de reprogramaciones, tiempo dedicado a tareas administrativas, y satisfacción tanto de pacientes como de profesionales sanitarios."
    },
    {
      question: "¿Qué beneficios aporta la automatización en la gestión sanitaria?",
      answer: "La automatización en gestión sanitaria reduce hasta un 70% el tiempo dedicado a tareas administrativas, minimiza errores humanos, optimiza la asignación de recursos, mejora la experiencia del paciente con atención 24/7, y libera al personal sanitario para centrarse en la atención clínica, resultando en una mayor calidad asistencial y mejor rentabilidad."
    },
    {
      question: "¿Cómo ayuda IAEVA a mejorar la eficiencia operativa sanitaria?",
      answer: "IAEVA mejora la eficiencia operativa mediante la automatización de comunicaciones con pacientes, optimización inteligente de agendas, análisis predictivo para prevenir ausencias, digitalización de procesos administrativos y generación de informes analíticos que permiten una toma de decisiones basada en datos para la mejora continua."
    }
  ]);
  
  // Migas de pan para SEO y navegación
  const breadcrumbs = generateBreadcrumbs([
    { name: "Inicio", url: "/" },
    { name: "Eficiencia operativa sanitaria", url: "/healthcare-efficiency" }
  ]);

  return (
    <PageLayout>
      <SEOHead 
        title="⚡ Eficiencia operativa en salud | Optimización sanitaria con IA | IAEVA"
        description="🏥 Optimice la eficiencia operativa de su centro médico con inteligencia artificial. Automatice procesos administrativos, mejore la asignación de recursos y aumente la productividad hasta un 35%."
        canonicalUrl="/healthcare-efficiency"
        ogImage="/images/healthcare-efficiency.jpg"
        keywords="eficiencia operativa sanitaria, optimización procesos sanitarios, automatización tareas administrativas salud, gestión eficiente hospital, productividad sanitaria, asignación recursos sanitarios, eficiencia clínica, optimización flujo pacientes"
        structuredData={[organizationSchema, faqData]}
        socialProfiles={socialProfiles}
        breadcrumbs={breadcrumbs}
      />
      
      {/* Cabecera de la página */}
      <section className="pt-20 pb-16 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Eficiencia operativa en el sector sanitario
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Soluciones de inteligencia artificial para optimizar la operación de centros médicos, 
              reducir costes administrativos, mejorar la asignación de recursos y aumentar 
              la productividad hasta un 35%.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <CTAButton 
                className="px-6 py-3 rounded-full text-white font-medium bg-gradient-to-r from-iaeva-blue to-iaeva-purple hover:opacity-90 transition-opacity"
                text="Solicitar consultoría gratuita" 
                path="/contacto" 
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
      
      {/* Áreas de mejora */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Áreas clave para optimizar la eficiencia sanitaria</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Gauge className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Optimización de agendas</h3>
              <p className="text-gray-600">
                Algoritmos inteligentes que maximizan la ocupación de las agendas médicas, 
                reducen tiempos muertos y mejoran la distribución de citas según criterios 
                clínicos y operativos.
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
                <Users className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Asignación de recursos</h3>
              <p className="text-gray-600">
                Distribución óptima de personal sanitario, equipamiento y espacios basada en 
                demanda histórica, patrones estacionales y prioridades clínicas.
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
                <Bot className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Automatización administrativa</h3>
              <p className="text-gray-600">
                Digitalización y automatización de procesos administrativos como gestión de citas, 
                recordatorios, formularios, y comunicaciones rutinarias con pacientes.
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
              <h3 className="text-xl font-semibold mb-3">Flujo de pacientes</h3>
              <p className="text-gray-600">
                Análisis y optimización del recorrido del paciente desde su llegada hasta su salida, 
                minimizando tiempos de espera y mejorando la experiencia asistencial.
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
                <ClipboardList className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Gestión de inventario</h3>
              <p className="text-gray-600">
                Control inteligente de suministros médicos, medicamentos y equipamiento con 
                predicción de necesidades y alertas de reposición automáticas.
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
                <Settings className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Análisis de operaciones</h3>
              <p className="text-gray-600">
                Monitorización continua de indicadores operativos clave con identificación 
                de áreas de mejora y recomendaciones basadas en IA.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Estadísticas de impacto */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Impacto real en la operación sanitaria</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-4xl font-bold text-iaeva-blue mb-2">-70%</h3>
              <p className="text-gray-700">Reducción en tiempo dedicado a tareas administrativas</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-4xl font-bold text-iaeva-blue mb-2">+35%</h3>
              <p className="text-gray-700">Incremento en productividad del personal sanitario</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-4xl font-bold text-iaeva-blue mb-2">-45%</h3>
              <p className="text-gray-700">Reducción en tiempos de espera para pacientes</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-4xl font-bold text-iaeva-blue mb-2">+25%</h3>
              <p className="text-gray-700">Mejora en la satisfacción de pacientes y profesionales</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Metodología */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Nuestra metodología de optimización</h2>
            
            <ol className="space-y-12">
              <motion.li 
                className="relative pl-20"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-iaeva-blue text-white font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Análisis de situación actual</h3>
                <p className="text-gray-600">
                  Evaluación exhaustiva de procesos, flujos de trabajo, asignación de recursos 
                  y métricas actuales para identificar áreas de mejora y oportunidades de optimización.
                </p>
              </motion.li>
              
              <motion.li 
                className="relative pl-20"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-iaeva-blue text-white font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Diseño de plan de optimización</h3>
                <p className="text-gray-600">
                  Desarrollo de una estrategia personalizada según las necesidades específicas 
                  del centro médico, priorizando intervenciones de alto impacto y rápido retorno.
                </p>
              </motion.li>
              
              <motion.li 
                className="relative pl-20"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-iaeva-blue text-white font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Implementación tecnológica</h3>
                <p className="text-gray-600">
                  Integración de soluciones de IA y automatización con los sistemas existentes, 
                  formación del personal y configuración de parámetros específicos.
                </p>
              </motion.li>
              
              <motion.li 
                className="relative pl-20"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-iaeva-blue text-white font-bold text-xl">
                  4
                </div>
                <h3 className="text-xl font-semibold mb-2">Medición y ajuste continuo</h3>
                <p className="text-gray-600">
                  Monitorización constante de indicadores de rendimiento, análisis de resultados 
                  y refinamiento continuo de estrategias para maximizar la eficiencia.
                </p>
              </motion.li>
            </ol>
          </div>
        </div>
      </section>
      
      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Transforme la eficiencia operativa de su centro médico</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Descubra cómo IAEVA puede ayudarle a optimizar procesos, reducir costes y mejorar 
            la experiencia tanto de pacientes como de profesionales sanitarios.
          </p>
          <CTAButton 
            className="px-8 py-3 rounded-full bg-white text-iaeva-blue font-medium hover:bg-opacity-90 transition-opacity"
            text="Solicitar consultoría gratuita" 
            path="/contacto" 
            variant="white"
          />
        </div>
      </section>
      
      {/* Nota: Esta es una versión básica de la página. Se ampliará con contenido más detallado según la estrategia de contenido */}
    </PageLayout>
  );
};

export default HealthcareEfficiency; 