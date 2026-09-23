import Step from './Step';
import { useTranslation } from 'react-i18next';

const StepsContainer = () => {
  const { t } = useTranslation('home');
  
  const steps = [
    {
      "number": "1",
      "title": t('customer_service.step1_title', "Interacción Inteligente"),
      "description": t('customer_service.step1_description', "IAEVA atiende consultas en WhatsApp y el chat web, resolviendo dudas en segundos o derivando al equipo humano cuando es necesario."),
      "delay": "0.1s",
      "color": "from-iaeva-blue to-iaeva-teal"
    },
    {
      "number": "2",
      "title": t('customer_service.step2_title', "Transferencia sin fricción"),
      "description": t('customer_service.step2_description', "Si una consulta requiere intervención humana, IAEVA transfiere la conversación con todo el contexto para evitar repetir información."),
      "delay": "0.2s",
      "color": "from-iaeva-teal to-iaeva-purple"
    },
    {
      "number": "3",
      "title": t('customer_service.step3_title', "Gestión avanzada de citas"),
      "description": t('customer_service.step3_description', "Administra, modifica o cancela citas desde el panel, con sincronización automática y envío de recordatorios inteligentes."),
      "delay": "0.3s",
      "color": "from-iaeva-purple to-iaeva-blue"
    },
    {
      "number": "4",
      "title": t('customer_service.step4_title', "Visibilidad y control total"),
      "description": t('customer_service.step4_description', "Tu equipo tiene acceso a todas las interacciones en tiempo real, pudiendo intervenir en cualquier momento para asegurar una experiencia impecable."),
      "delay": "0.4s",
      "color": "from-iaeva-blue to-iaeva-purple"
    }
  ];

  return (
    <div className="space-y-8">
      {steps.map((step, index) => (
        <Step 
          key={index}
          number={step.number}
          title={step.title}
          description={step.description}
          delay={step.delay}
          color={step.color}
        />
      ))}
    </div>
  );
};

export default StepsContainer;
