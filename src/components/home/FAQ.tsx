import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems: FAQItem[] = [
    {
      question: "¿Cómo ayuda IAEVA a reducir las ausencias a citas médicas?",
      answer: "IAEVA envía recordatorios automáticos por WhatsApp y realiza llamadas de confirmación cuando es necesario. Si un paciente no puede asistir, puede reprogramar instantáneamente, permitiendo que el sistema asigne ese espacio a otro paciente. Esta gestión inteligente de citas médicas reduce las ausencias hasta en un 60%."
    },
    {
      question: "¿En qué idiomas puede atender IAEVA a los pacientes?",
      answer: "IAEVA puede comunicarse con pacientes en más de 20 idiomas, incluyendo español, inglés, francés, portugués, alemán, italiano, árabe, chino, entre otros. Esto permite atender a una población diversa de pacientes sin barreras de idioma."
    },
    {
      question: "¿Cómo se integra IAEVA con los sistemas de gestión médica existentes?",
      answer: "IAEVA se integra fácilmente con los principales sistemas de gestión médica mediante APIs seguras. Puede sincronizarse con tu calendario de citas existente, historias clínicas digitales y otros sistemas, minimizando cambios en tus procesos actuales mientras optimizas la atención al paciente."
    },
    {
      question: "¿Cuánto tiempo lleva implementar IAEVA en mi centro médico?",
      answer: "La implementación básica de IAEVA puede completarse en 1-2 semanas. Esto incluye la integración con tus sistemas actuales, personalización según tus protocolos médicos y capacitación del personal. Para implementaciones más complejas en hospitales grandes, el proceso puede extenderse hasta 4 semanas."
    },
    {
      question: "¿IAEVA cumple con las normativas de protección de datos médicos?",
      answer: "Sí, IAEVA cumple con RGPD, HIPAA y otras normativas de protección de datos médicos. Implementamos encriptación de extremo a extremo, acceso restringido a información sensible y procesos de anonimización de datos para garantizar la confidencialidad y seguridad de la información médica."
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-sm font-semibold text-iaeva-blue dark:text-iaeva-teal uppercase tracking-wider mb-2">
            Preguntas frecuentes
          </h2>
          <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Todo lo que necesitas saber sobre la gestión de citas médicas con IA
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Respuestas a las dudas más comunes sobre la implementación y beneficios del asistente virtual IAEVA en tu centro médico.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          {faqItems.map((item, index) => (
            <div key={index} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0">
              <button
                className="flex justify-between items-center w-full p-6 text-left"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-medium text-gray-900 dark:text-white">{item.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 p-6 pt-0" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 dark:text-gray-300">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            ¿No encuentras respuesta a tu pregunta? Contáctanos directamente
          </p>
          <a
            href="/contacto"
            className="px-6 py-3 bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white rounded-full hover:bg-opacity-90 transition-all"
          >
            Contactar con soporte
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
