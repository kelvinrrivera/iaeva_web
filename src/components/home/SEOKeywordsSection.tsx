import React from 'react';

const SEOKeywordsSection = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Soluciones completas para la atención médica digital</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Sistema de citas médicas online</h3>
            <p className="mb-4">Nuestro sistema de reserva de citas médicas optimiza la agenda digital de tu clínica, permitiendo programación, confirmación y recordatorios automáticos para reducir ausencias.</p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <li>• Gestión de citas clínicas sin llamadas</li>
              <li>• Calendario médico online sincronizado</li>
              <li>• Recordatorios automáticos de citas médicas</li>
              <li>• Programación de citas hospitalarias</li>
              <li>• Agenda médica digital optimizada</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Inteligencia artificial para sector salud</h3>
            <p className="mb-4">IAEVA implementa tecnología de IA conversacional específicamente entrenada para el sector médico, capaz de entender consultas y gestionar procesos sanitarios.</p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <li>• IA para hospitales y clínicas médicas</li>
              <li>• Automatización de procesos sanitarios</li>
              <li>• Asistente virtual para profesionales médicos</li>
              <li>• Optimización de recursos hospitalarios</li>
              <li>• Transformación digital del sector salud</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Comunicación médica vía WhatsApp</h3>
            <p className="mb-4">Integra el canal de mensajería más utilizado por los pacientes para mejorar la comunicación médica, con confirmaciones automáticas y atención 24/7.</p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <li>• Chatbot WhatsApp para centros médicos</li>
              <li>• Confirmación de citas por WhatsApp</li>
              <li>• Recordatorios médicos automatizados</li>
              <li>• Consultas médicas vía mensajería</li>
              <li>• Atención al paciente multicanal</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOKeywordsSection;
