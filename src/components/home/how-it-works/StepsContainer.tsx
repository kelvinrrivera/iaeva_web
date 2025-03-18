
import Step from './Step';

const StepsContainer = () => {
  const steps = [
    {
      "number": "1",
      "title": "Interacción Inteligente",
      "description": "IAEVA atiende consultas en WhatsApp y el chat web, resolviendo dudas en segundos o derivando al equipo humano cuando es necesario.",
      "delay": "0.1s",
      "color": "from-iaeva-blue to-iaeva-teal"
    },
    {
      "number": "2",
      "title": "Transferencia sin fricción",
      "description": "Si una consulta requiere intervención humana, IAEVA transfiere la conversación con todo el contexto para evitar repetir información.",
      "delay": "0.2s",
      "color": "from-iaeva-teal to-iaeva-purple"
    },
    {
      "number": "3",
      "title": "Gestión avanzada de citas",
      "description": "Administra, modifica o cancela citas desde el panel, con sincronización automática y envío de recordatorios inteligentes.",
      "delay": "0.3s",
      "color": "from-iaeva-purple to-iaeva-blue"
    },
    {
      "number": "4",
      "title": "Visibilidad y control total",
      "description": "Tu equipo tiene acceso a todas las interacciones en tiempo real, pudiendo intervenir en cualquier momento para asegurar una experiencia impecable.",
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
