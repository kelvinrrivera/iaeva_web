import { useEffect } from 'react';
import { SIGNUP_URL } from '@/config/app-urls';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Brain, Zap, Stethoscope, LineChart, MessagesSquare, Database } from 'lucide-react';

import PageLayout from '@/components/layout/PageLayout';
import SEOHead from '@/components/shared/SEOHead';
import CTAButton from '@/components/shared/CTAButton';
import { organizationSchema, createFAQSchema, generateBreadcrumbs, socialProfiles } from '@/lib/schema';

const AIHealthcareTrends = () => {
  const { t } = useTranslation(['common']);
  
  // Efecto para forzar el scroll al inicio cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // FAQ Schema para mejorar la presencia en los resultados de búsqueda
  const faqData = createFAQSchema([
    {
      question: "¿Cuáles son las principales tendencias de IA en el sector sanitario?",
      answer: "Las principales tendencias incluyen: asistentes virtuales para gestión administrativa, análisis predictivo para prevención de enfermedades, algoritmos de diagnóstico basados en imágenes médicas, optimización de procesos clínicos, medicina personalizada basada en datos, y automatización de tareas repetitivas para reducir la carga del personal sanitario."
    },
    {
      question: "¿Cómo está transformando la IA la experiencia del paciente?",
      answer: "La IA está transformando la experiencia del paciente mediante sistemas conversacionales 24/7 para resolver dudas y gestionar citas, monitorización remota con alertas preventivas, seguimiento personalizado de tratamientos, reducción de tiempos de espera y diagnósticos más rápidos y precisos, y comunicación personalizada según el perfil de cada paciente."
    },
    {
      question: "¿Cuáles son los desafíos en la implementación de IA en entornos sanitarios?",
      answer: "Los principales desafíos incluyen garantizar la privacidad y cumplimiento normativo (RGPD, HIPAA), integración con sistemas existentes, resistencia al cambio entre los profesionales, calidad y representatividad de los datos de entrenamiento, validación clínica de los algoritmos, y establecer límites éticos claros sobre el papel de la IA en la toma de decisiones médicas."
    }
  ]);
  
  // Migas de pan para SEO y navegación
  const breadcrumbs = generateBreadcrumbs([
    { name: "Inicio", url: "/" },
    { name: "Tendencias de IA en salud", url: "/ai-healthcare-trends" }
  ]);

  return (
    <PageLayout>
      <SEOHead 
        title="🧠 Tendencias de IA en el sector sanitario | Innovación médica | IAEVA"
        description="🔮 Descubra las últimas tendencias en inteligencia artificial aplicada al sector sanitario. Asistentes virtuales, análisis predictivo, diagnóstico por imagen y optimización de procesos clínicos."
        canonicalUrl="/ai-healthcare-trends"
        ogImage="/images/ai-healthcare-trends.jpg"
        keywords="tendencias IA salud, inteligencia artificial sanitaria, innovación sector médico, futuro asistencia sanitaria, IA diagnóstico médico, automatización procesos clínicos, transformación digital salud, machine learning medicina"
        structuredData={[organizationSchema, faqData]}
        socialProfiles={socialProfiles}
        breadcrumbs={breadcrumbs}
      />
      
      {/* Cabecera de la página */}
      <section className="pt-20 pb-16 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Tendencias de inteligencia artificial en el sector sanitario
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Explore cómo la IA está revolucionando la atención médica, desde la gestión administrativa 
              hasta el diagnóstico clínico, y cómo estas innovaciones están mejorando la 
              eficiencia y calidad asistencial.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <CTAButton 
                className="px-6 py-3 rounded-full text-white font-medium bg-gradient-to-r from-iaeva-blue to-iaeva-purple hover:opacity-90 transition-opacity"
                text="Descubrir IAEVA" 
                path="/" 
                variant="primary"
              />
              <CTAButton 
                className="px-6 py-3 rounded-full border border-iaeva-blue text-iaeva-blue font-medium hover:bg-blue-50 transition-colors"
                text="Explorar recursos" 
                path="/recursos" 
                variant="outline"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Tendencias principales */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Tendencias transformadoras en el sector sanitario</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <MessagesSquare className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Asistentes virtuales sanitarios</h3>
              <p className="text-gray-600">
                Sistemas conversacionales especializados que automatizan la gestión de citas, 
                seguimiento de pacientes y tareas administrativas, mejorando la eficiencia 
                operativa y reduciendo costes.
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
                <LineChart className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Análisis predictivo</h3>
              <p className="text-gray-600">
                Algoritmos que analizan patrones en datos sanitarios para predecir riesgos clínicos, 
                tendencias epidemiológicas y comportamiento de pacientes, facilitando 
                intervenciones preventivas.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Stethoscope className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Diagnóstico asistido por IA</h3>
              <p className="text-gray-600">
                Sistemas de visión artificial y procesamiento de datos clínicos que mejoran 
                la precisión y velocidad en el diagnóstico de enfermedades, especialmente 
                en radiología y dermatología.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Medicina personalizada</h3>
              <p className="text-gray-600">
                Algoritmos que analizan el perfil genético, biométrico y conductual de cada 
                paciente para desarrollar tratamientos personalizados con mayor efectividad 
                y menos efectos secundarios.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Optimización de procesos</h3>
              <p className="text-gray-600">
                Sistemas inteligentes que analizan y optimizan flujos de trabajo clínicos, 
                asignación de recursos y programación de personal, maximizando la 
                eficiencia y calidad asistencial.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Integración de datos sanitarios</h3>
              <p className="text-gray-600">
                Plataformas que unifican información fragmentada de diferentes sistemas 
                sanitarios, creando historiales médicos completos y accesibles para 
                mejorar la continuidad asistencial.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Estadísticas de adopción */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">El impacto de la IA en el sector sanitario</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-4xl font-bold text-iaeva-blue mb-2">+86%</h3>
              <p className="text-gray-700">De centros sanitarios implementarán soluciones de IA para 2025</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-4xl font-bold text-iaeva-blue mb-2">$45B</h3>
              <p className="text-gray-700">Valor del mercado global de IA en salud previsto para 2026</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-4xl font-bold text-iaeva-blue mb-2">-30%</h3>
              <p className="text-gray-700">Reducción media de costes operativos con implementación de IA</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-4xl font-bold text-iaeva-blue mb-2">+40%</h3>
              <p className="text-gray-700">Aumento de productividad del personal sanitario con asistentes IA</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Desafíos y consideraciones */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Desafíos en la implementación de IA sanitaria</h2>
            
            <div className="space-y-8">
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-3">Privacidad y protección de datos</h3>
                <p className="text-gray-600">
                  Garantizar la confidencialidad y seguridad de la información sanitaria sensible, 
                  cumpliendo con normativas como RGPD, HIPAA y regulaciones específicas del sector médico.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-3">Integración con sistemas existentes</h3>
                <p className="text-gray-600">
                  Compatibilidad e interoperabilidad con los diversos sistemas de gestión hospitalaria, 
                  historiales clínicos electrónicos y equipamiento médico actualmente en uso.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-3">Formación y adaptación</h3>
                <p className="text-gray-600">
                  Capacitación del personal sanitario para trabajar eficazmente con sistemas de IA, 
                  superando la resistencia al cambio y maximizando la adopción tecnológica.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-3">Consideraciones éticas</h3>
                <p className="text-gray-600">
                  Establecer límites claros sobre el papel de la IA en la toma de decisiones médicas, 
                  garantizando transparencia, equidad y responsabilidad en los algoritmos.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Prepárese para el futuro de la atención sanitaria</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Descubra cómo IAEVA está implementando estas tendencias para transformar 
            la gestión sanitaria y mejorar la experiencia tanto de pacientes como profesionales.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <CTAButton 
              className="px-8 py-3 rounded-full bg-white text-iaeva-blue font-medium hover:bg-opacity-90 transition-opacity"
              text="Conocer IAEVA" 
              path="/" 
              variant="white"
            />
            <CTAButton 
              className="px-8 py-3 rounded-full border border-white text-white font-medium hover:bg-opacity-10 hover:bg-white transition-colors"
              text="Contactar con un especialista" 
              path={SIGNUP_URL} 
              variant="outline-white"
            />
          </div>
        </div>
      </section>
      
      {/* Nota: Esta es una versión básica de la página. Se ampliará con contenido más detallado según la estrategia de contenido */}
    </PageLayout>
  );
};

export default AIHealthcareTrends;