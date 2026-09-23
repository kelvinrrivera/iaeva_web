// Nuevo archivo: src/components/home/ConversionFunnel.tsx
import React from 'react';
import CTAButton from '@/components/shared/CTAButton';
import { Brain, Calendar, Check, Clock } from 'lucide-react';

const ConversionFunnel = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-semibold text-iaeva-blue dark:text-iaeva-teal uppercase tracking-wider mb-2">
            Mejora la atención médica con IAEVA
          </h2>
          <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            En solo 4 pasos hacia la transformación digital
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Descubre cómo IAEVA puede ayudarte a mejorar la experiencia de tus pacientes y optimizar la gestión de tu centro médico.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Fase 1: Conocimiento */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl relative">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-iaeva-blue text-white rounded-full flex items-center justify-center font-bold">1</div>
            <div className="mb-4">
              <Brain className="h-8 w-8 text-iaeva-blue" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Conoce IAEVA</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Descubre cómo nuestro asistente virtual IA revoluciona la atención médica y mejora la experiencia del paciente.
            </p>
            <CTAButton
              text="Ver demostraciones"
              path="/demostraciones"
              variant="secondary"
              icon={false}
              className="text-sm px-4 py-2"
              dataTestId="funnel-step1-cta"
            />
          </div>

          {/* Fase 2: Interés */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl relative">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-iaeva-blue text-white rounded-full flex items-center justify-center font-bold">2</div>
            <div className="mb-4">
              <Calendar className="h-8 w-8 text-iaeva-blue" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Explora casos de uso</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Conoce cómo otros centros médicos están optimizando sus procesos y mejorando resultados con IAEVA.
            </p>
            <CTAButton
              text="Casos de éxito"
              path="/casos-de-uso"
              variant="secondary"
              icon={false}
              className="text-sm px-4 py-2"
              dataTestId="funnel-step2-cta"
            />
          </div>

          {/* Fase 3: Consideración */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl relative">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-iaeva-blue text-white rounded-full flex items-center justify-center font-bold">3</div>
            <div className="mb-4">
              <Clock className="h-8 w-8 text-iaeva-blue" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Calcula tu ROI</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Descubre el retorno de inversión específico para tu centro médico con nuestra calculadora.
            </p>
            <CTAButton
              text="Calculadora ROI"
              path="/calculadora-roi"
              variant="secondary"
              icon={false}
              className="text-sm px-4 py-2"
              dataTestId="funnel-step3-cta"
            />
          </div>

          {/* Fase 4: Conversión */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl relative">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-iaeva-blue text-white rounded-full flex items-center justify-center font-bold">4</div>
            <div className="mb-4">
              <Check className="h-8 w-8 text-iaeva-blue" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Solicita una demo</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Agenda una demostración personalizada con uno de nuestros expertos para tu centro médico.
            </p>
            <CTAButton
              text="Solicitar demo"
              path="/contacto"
              variant="primary"
              icon={false}
              className="text-sm px-4 py-2"
              dataTestId="funnel-step4-cta"
              isCalendarButton={true}
            />
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Más de 200 centros médicos ya han mejorado su atención al paciente con IAEVA
          </p>
          <CTAButton
            text="Solicita tu demo personalizada"
            path="/contacto"
            variant="primary"
            className="px-8 py-4 text-lg"
            dataTestId="funnel-main-cta"
            isCalendarButton={true}
          />
        </div>
      </div>
    </section>
  );
};

export default ConversionFunnel;
