import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, MessageCircle, Clock, BarChart4, UserCheck, PhoneCall, Stethoscope } from 'lucide-react';

import PageLayout from '@/components/layout/PageLayout';
import SEOHead from '@/components/shared/SEOHead';
import CTAButton from '@/components/shared/CTAButton';
import { organizationSchema, createFAQSchema, generateBreadcrumbs, socialProfiles } from '@/lib/schema';

const DentalClinicAssistant = () => {
  const { t } = useTranslation(['common']);

  // Efecto para forzar el scroll al inicio cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // FAQ Schema para mejorar la presencia en los resultados de búsqueda
  const faqData = createFAQSchema([
    {
      question: "¿Cómo ayuda IAEVA a las clínicas dentales a reducir ausencias?",
      answer: "IAEVA reduce las ausencias en clínicas dentales hasta un 60% mediante recordatorios automatizados personalizados enviados por WhatsApp, SMS o email, confirmación simplificada de citas, y algoritmos predictivos que identifican pacientes con alto riesgo de ausencia para aplicar protocolos específicos de recordatorio."
    },
    {
      question: "¿Puede IAEVA integrarse con el software de gestión de mi clínica dental?",
      answer: "IAEVA puede funcionar de forma independiente con su propio sistema de gestión de citas o, si lo prefiere, puede evaluarse la posibilidad de integración con su sistema existente. Cada caso se estudia individualmente, priorizando siempre la seguridad de los datos y la integridad de su infraestructura."
    },
    {
      question: "¿Qué tipo de comunicaciones automatiza IAEVA en una clínica dental?",
      answer: "IAEVA automatiza múltiples comunicaciones: recordatorios de citas, instrucciones pre y post tratamiento, seguimiento post-operatorio, recordatorios de revisiones periódicas, felicitaciones de cumpleaños, ofertas y promociones, encuestas de satisfacción, y respuestas a preguntas frecuentes sobre tratamientos y precios."
    }
  ]);

  // Migas de pan para SEO y navegación
  const breadcrumbs = generateBreadcrumbs([
    { name: "Inicio", url: "/" },
    { name: "Asistente para clínicas dentales", url: "/dental-clinic-assistant" }
  ]);

  return (
    <PageLayout>
      <SEOHead
        title="Asistente virtual para clínicas dentales | Gestión de citas | IAEVA"
        description="Optimice la gestión de pacientes en su clínica dental con IAEVA. Reduzca el absentismo y confirme citas automáticamente por WhatsApp."
        canonicalUrl="/dental-clinic-assistant"
        ogImage="/images/dental-clinic-assistant.jpg"
        keywords="asistente virtual clínica dental, gestión citas odontología, reducción ausencias dentistas, recordatorios pacientes dentales, software clínica dental, automatización comunicación pacientes, whatsapp clínica dental"
        structuredData={[organizationSchema, faqData]}
        socialProfiles={socialProfiles}
        breadcrumbs={breadcrumbs}
      />

      {/* Cabecera de la página */}
      <section className="pt-20 pb-16 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Stethoscope className="h-8 w-8 text-cyan-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Asistente virtual para clínicas dentales
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Optimice la gestión de pacientes, reduzca las ausencias y mejore la experiencia
              en su clínica dental con nuestro asistente virtual especializado en odontología.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <CTAButton
                className="px-6 py-3 rounded-full text-white font-medium bg-gradient-to-r from-iaeva-blue to-iaeva-purple hover:opacity-90 transition-opacity"
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
              <h3 className="text-4xl font-bold text-iaeva-blue mb-2">-60%</h3>
              <p className="text-gray-700">Reducción de ausencias en clínicas dentales que usan IAEVA</p>
            </motion.div>

            <motion.div
              className="bg-cyan-50 p-6 rounded-xl text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-4xl font-bold text-cyan-600 mb-2">+30%</h3>
              <p className="text-gray-700">Aumento en la satisfacción del paciente dental</p>
            </motion.div>

            <motion.div
              className="bg-green-50 p-6 rounded-xl text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-4xl font-bold text-green-600 mb-2">5h</h3>
              <p className="text-gray-700">Ahorro semanal en gestión de citas para el personal</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Funcionalidades principales */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Funcionalidades para clínicas dentales</h2>

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
              <h3 className="text-xl font-semibold mb-3">Gestión inteligente de citas</h3>
              <p className="text-gray-600">
                Sistema avanzado de agendamiento que optimiza los horarios de los odontólogos,
                facilita la programación según tipo de tratamiento y gestiona eficientemente
                los cambios y cancelaciones.
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
                <MessageCircle className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Comunicación multicanal</h3>
              <p className="text-gray-600">
                Interacción con pacientes a través de WhatsApp, email y SMS para confirmaciones,
                recordatorios e instrucciones pre y post tratamiento, adaptándose a las preferencias
                de cada paciente.
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
                Algoritmos predictivos que identifican pacientes con riesgo de no asistir,
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
              <h3 className="text-xl font-semibold mb-3">Automatización de seguimiento</h3>
              <p className="text-gray-600">
                Envío automático de instrucciones post-tratamiento, recordatorios de revisión
                periódica y seguimiento personalizado para mejorar la adherencia a los tratamientos
                dentales.
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
                <PhoneCall className="h-6 w-6 text-iaeva-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Asistente virtual 24/7</h3>
              <p className="text-gray-600">
                Atención automatizada que responde a preguntas frecuentes sobre tratamientos,
                precios, horarios y procedimientos, proporcionando información inmediata incluso
                fuera del horario de la clínica.
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
              <h3 className="text-xl font-semibold mb-3">Analítica y reportes</h3>
              <p className="text-gray-600">
                Dashboard con métricas clave sobre la gestión de citas, tasas de asistencia,
                satisfacción del paciente y efectividad de los recordatorios para optimizar
                continuamente los procesos.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integración con sistemas dentales */}
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
                Para clínicas dentales sin sistema existente o que prefieran una solución
                separada, ofrecemos una plataforma completa de agendamiento especializada.
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
              <div className="md:w-1/2 bg-gradient-to-br from-iaeva-blue to-iaeva-purple p-12 text-white">
                <div className="text-2xl font-bold mb-4">Análisis del sector</div>
                <h3 className="text-3xl font-bold mb-6">Su clínica dental con IAEVA</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">→</span>
                    <span>Reducción de hasta 60% en ausencias de pacientes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">→</span>
                    <span>Ahorro estimado de 42 horas mensuales en gestión administrativa</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">→</span>
                    <span>Aumento proyectado del 24% en la satisfacción del paciente</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">→</span>
                    <span>Potencial incremento del 15% en los ingresos mensuales</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 p-12">
                <h3 className="text-xl font-bold mb-4">Basado en investigación de mercado</h3>
                <blockquote className="italic text-gray-600 mb-6">
                  "Nuestro análisis del sector dental muestra que las clínicas que implementan
                  sistemas de gestión automatizada de pacientes experimentan una significativa
                  reducción en ausencias y un aumento en eficiencia operativa.
                  IAEVA ha sido diseñado específicamente para abordar estos desafíos en clínicas
                  dentales, con resultados potenciales que transformarán su operación diaria."
                </blockquote>
                <div>
                  <p className="font-bold">Equipo de análisis de IAEVA</p>
                  <p className="text-gray-500">Basado en investigación de mercado y mejores prácticas del sector</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Optimice la gestión de su clínica dental</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Descubra cómo IAEVA puede transformar la operación de su centro dental,
            reducir ausencias y mejorar la satisfacción de sus pacientes.
          </p>
          <CTAButton
            className="px-8 py-3 rounded-full bg-white text-iaeva-blue font-medium hover:bg-opacity-90 transition-opacity"
            text="Solicitar demostración gratuita"
            path="/contacto"
            variant="white"
          />
        </div>
      </section>
    </PageLayout>
  );
};

export default DentalClinicAssistant; 