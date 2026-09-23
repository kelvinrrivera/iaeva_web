import { useEffect } from 'react';
import { SIGNUP_URL } from '@/config/app-urls';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calculator, Ruler, Pill, FileSpreadsheet, Scale, HeartPulse } from 'lucide-react';

import PageLayout from '@/components/layout/PageLayout';
import SEOHead from '@/components/shared/SEOHead';
import CTAButton from '@/components/shared/CTAButton';
import { organizationSchema, createFAQSchema, generateBreadcrumbs, socialProfiles } from '@/lib/schema';

const MedicalTools = () => {
  const { t } = useTranslation(['common']);
  
  // Efecto para forzar el scroll al inicio cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // FAQ Schema para mejorar la presencia en los resultados de búsqueda
  const faqData = createFAQSchema([
    {
      question: "¿Qué herramientas médicas digitales ofrece IAEVA?",
      answer: "IAEVA ofrece una amplia gama de herramientas médicas digitales gratuitas, incluyendo: calculadora de IMC avanzada, conversor de unidades médicas, calculadora de dosis de medicamentos, herramientas de evaluación de riesgo cardiovascular, convertidor de códigos CIE-10/CIE-11, y calculadoras específicas para especialidades como pediatría, cardiología y nutrición."
    },
    {
      question: "¿Son fiables las herramientas médicas de IAEVA?",
      answer: "Todas las herramientas médicas de IAEVA están desarrolladas siguiendo protocolos médicos validados y estándares internacionales. El equipo de desarrollo cuenta con asesoramiento de profesionales sanitarios para asegurar la precisión de los cálculos y resultados. Sin embargo, siempre se recomienda que los resultados sean interpretados por un profesional sanitario cualificado."
    },
    {
      question: "¿Puedo integrar estas herramientas médicas en mi sitio web o aplicación?",
      answer: "Sí, IAEVA ofrece opciones de integración para clínicas, hospitales y profesionales sanitarios que deseen incluir estas herramientas en sus propias plataformas digitales. Contacte con nuestro equipo para obtener información sobre API, widgets y opciones de personalización disponibles."
    }
  ]);
  
  // Migas de pan para SEO y navegación
  const breadcrumbs = generateBreadcrumbs([
    { name: "Inicio", url: "/" },
    { name: "Herramientas médicas", url: "/medical-tools" }
  ]);

  return (
    <PageLayout>
      <SEOHead 
        title="🧰 Herramientas médicas gratuitas | Calculadoras y conversores | IAEVA"
        description="📊 Utilice nuestras herramientas médicas gratuitas: calculadora IMC avanzada, conversor unidades médicas, calculadora dosis, códigos CIE-10/11 y más recursos para profesionales sanitarios."
        canonicalUrl="/medical-tools"
        ogImage="/images/medical-tools.jpg"
        keywords="herramientas médicas online, calculadora IMC, conversor unidades médicas, calculadora dosis medicamentos, recursos sanitarios gratuitos, instrumentos clínicos digitales, herramientas salud profesionales, convertidor códigos CIE"
        structuredData={[organizationSchema, faqData]}
        socialProfiles={socialProfiles}
        breadcrumbs={breadcrumbs}
      />
      
      {/* Cabecera de la página */}
      <section className="pt-20 pb-16 bg-gradient-to-r from-teal-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Herramientas médicas gratuitas
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Acceda a nuestra colección de calculadoras, conversores y recursos digitales 
              diseñados para profesionales sanitarios y centros médicos. Herramientas 
              precisas, fáciles de usar y basadas en estándares médicos internacionales.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <CTAButton 
                className="px-6 py-3 rounded-full text-white font-medium bg-gradient-to-r from-iaeva-blue to-iaeva-purple hover:opacity-90 transition-opacity"
                text="Explorar herramientas" 
                path="#herramientas" 
                variant="primary"
              />
              <CTAButton 
                className="px-6 py-3 rounded-full border border-iaeva-blue text-iaeva-blue font-medium hover:bg-blue-50 transition-colors"
                text="Solicitar integración personalizada" 
                path={SIGNUP_URL} 
                variant="outline"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Destacados */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="bg-blue-50 p-6 rounded-xl text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-full mx-auto bg-blue-100 flex items-center justify-center mb-4">
                <Scale className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Precisión médica</h3>
              <p className="text-gray-700">Calculadoras basadas en las últimas directrices clínicas y validadas por profesionales sanitarios</p>
            </motion.div>
            
            <motion.div 
              className="bg-teal-50 p-6 rounded-xl text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-12 h-12 rounded-full mx-auto bg-teal-100 flex items-center justify-center mb-4">
                <HeartPulse className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Uso gratuito</h3>
              <p className="text-gray-700">Todas nuestras herramientas están disponibles sin coste para profesionales y pacientes</p>
            </motion.div>
            
            <motion.div 
              className="bg-purple-50 p-6 rounded-xl text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-12 h-12 rounded-full mx-auto bg-purple-100 flex items-center justify-center mb-4">
                <FileSpreadsheet className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Integrables</h3>
              <p className="text-gray-700">Posibilidad de integrar las herramientas en su propio sitio web o sistema sanitario</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Catálogo de herramientas */}
      <section id="herramientas" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestras herramientas médicas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Calculator className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Calculadora IMC avanzada</h3>
              <p className="text-gray-600 mb-4">
                Evalúe el índice de masa corporal con análisis detallado por edad, género y 
                complexión física. Incluye recomendaciones personalizadas.
              </p>
              <CTAButton 
                className="w-full py-2 text-center rounded-md bg-blue-50 text-blue-600 font-medium hover:bg-blue-100 transition-colors"
                text="Calcular IMC" 
                path="/recursos/calculadora-imc" 
                variant="secondary"
              />
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Ruler className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Conversor de unidades médicas</h3>
              <p className="text-gray-600 mb-4">
                Convierta entre diferentes unidades de medición para laboratorio, medicación, 
                temperatura corporal, presión arterial y otros parámetros clínicos.
              </p>
              <CTAButton 
                className="w-full py-2 text-center rounded-md bg-green-50 text-green-600 font-medium hover:bg-green-100 transition-colors"
                text="Convertir unidades" 
                path="/recursos/conversor-unidades" 
                variant="secondary"
              />
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <Pill className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Calculadora de dosis</h3>
              <p className="text-gray-600 mb-4">
                Calcule dosis de medicamentos según peso, edad y parámetros clínicos 
                del paciente. Especialmente útil para pediatría y geriatría.
              </p>
              <CTAButton 
                className="w-full py-2 text-center rounded-md bg-amber-50 text-amber-600 font-medium hover:bg-amber-100 transition-colors"
                text="Próximamente" 
                path="#" 
                variant="secondary"
              />
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <HeartPulse className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Evaluación de riesgo cardiovascular</h3>
              <p className="text-gray-600 mb-4">
                Valore el riesgo cardiovascular del paciente según múltiples factores: 
                presión arterial, colesterol, tabaquismo, edad y comorbilidades.
              </p>
              <CTAButton 
                className="w-full py-2 text-center rounded-md bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-colors"
                text="Próximamente" 
                path="#" 
                variant="secondary"
              />
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <FileSpreadsheet className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Convertidor CIE-10/CIE-11</h3>
              <p className="text-gray-600 mb-4">
                Herramienta para traducir códigos entre versiones de la Clasificación 
                Internacional de Enfermedades, con búsqueda inteligente y sugerencias.
              </p>
              <CTAButton 
                className="w-full py-2 text-center rounded-md bg-purple-50 text-purple-600 font-medium hover:bg-purple-100 transition-colors"
                text="Próximamente" 
                path="#" 
                variant="secondary"
              />
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center mb-4">
                <Scale className="h-6 w-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Calculadora nutricional</h3>
              <p className="text-gray-600 mb-4">
                Evalúe necesidades calóricas, composición de macronutrientes y planificación 
                dietética según perfil del paciente y objetivos terapéuticos.
              </p>
              <CTAButton 
                className="w-full py-2 text-center rounded-md bg-cyan-50 text-cyan-600 font-medium hover:bg-cyan-100 transition-colors"
                text="Próximamente" 
                path="#" 
                variant="secondary"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Sección para profesionales */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6">Para profesionales y centros sanitarios</h2>
            <p className="text-xl text-center text-gray-600 mb-10">
              Ofrecemos soluciones de integración para incorporar nuestras herramientas 
              en sus plataformas digitales y sistemas sanitarios.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-3">Integración en sitios web</h3>
                <p className="text-gray-600 mb-4">
                  Widgets personalizables para incluir nuestras calculadoras y herramientas 
                  en su página web o portal del paciente, manteniendo su imagen corporativa.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-3">API para software médico</h3>
                <p className="text-gray-600 mb-4">
                  Conecte su sistema de gestión sanitaria directamente con nuestras 
                  herramientas a través de nuestra API segura y documentada.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-3">Personalización avanzada</h3>
                <p className="text-gray-600 mb-4">
                  Desarrollo de herramientas a medida según las necesidades específicas 
                  de su especialidad médica o centro sanitario.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-3">Soporte especializado</h3>
                <p className="text-gray-600 mb-4">
                  Asesoramiento técnico y médico para la implementación y uso óptimo 
                  de nuestras herramientas en su entorno profesional.
                </p>
              </motion.div>
            </div>
            
            <div className="mt-10 text-center">
              <CTAButton 
                className="px-8 py-3 rounded-full text-white font-medium bg-gradient-to-r from-iaeva-blue to-iaeva-purple hover:opacity-90 transition-opacity"
                text="Solicitar información para profesionales" 
                path={SIGNUP_URL} 
                variant="primary"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Potencia tu práctica médica con herramientas digitales</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Descubre cómo nuestras herramientas pueden ayudarte a ofrecer una atención 
            más precisa y eficiente a tus pacientes.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <CTAButton 
              className="px-8 py-3 rounded-full bg-white text-iaeva-blue font-medium hover:bg-opacity-90 transition-opacity"
              text="Explorar herramientas" 
              path="#herramientas" 
              variant="white"
            />
            <CTAButton 
              className="px-8 py-3 rounded-full border border-white text-white font-medium hover:bg-opacity-10 hover:bg-white transition-colors"
              text="Conocer IAEVA" 
              path="/" 
              variant="outline-white"
            />
          </div>
        </div>
      </section>
      
      {/* Nota: Esta es una versión básica de la página. Se ampliará con contenido más detallado según la estrategia de contenido */}
    </PageLayout>
  );
};

export default MedicalTools; 