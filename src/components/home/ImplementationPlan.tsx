
import { useEffect, useRef, useState } from 'react';

interface StepProps {
  number: number;
  title: string;
  description: string;
  delay?: number;
}

const Step = ({ number, title, description }: StepProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-white shadow-soft flex items-center justify-center mb-4 relative z-10">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-iaeva-blue to-iaeva-purple flex items-center justify-center">
          <span className="text-white font-bold">{number}</span>
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-2 text-center">{title}</h3>
      <p className="text-sm text-gray-600 text-center max-w-[200px]">{description}</p>
    </div>
  );
};

const ImplementationPlan = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div 
          ref={sectionRef}
          className={`text-center mb-12 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-iaeva-bg-light text-iaeva-blue font-medium text-sm mb-3">
            Proceso sencillo
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Implementación <span className="gradient-text"> sin complicaciones</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sabemos lo valioso que es el tiempo en un centro de salud. Por eso, hemos diseñado un proceso de implementación 
            para IAEVA que es rápido, sencillo y sin interrupciones en tu flujo de trabajo.
          </p>
        </div>

        <div className="relative">
          {/* Línea de conexión */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-iaeva-blue to-iaeva-purple hidden md:block"></div>
          
          {/* Pasos */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-4 relative z-10">
            <Step 
              number={1} 
              title="Análisis de Requisitos" 
              description="Identificamos las necesidades específicas de tu centro médico"
            />
            <Step 
              number={2} 
              title="Diseño del Sistema" 
              description="Creamos la arquitectura técnica y funcional adaptada a tus procesos"
            />
            <Step 
              number={3} 
              title="Desarrollo" 
              description="Adaptamos el sistema: CRM, módulo de citas, WhatsApp, etc."
            />
            <Step 
              number={4} 
              title="Integración" 
              description="Conectamos IAEVA con tus sistemas existentes (HIS, CRM)"
            />
            <Step 
              number={5} 
              title="Capacitación" 
              description="Formamos a tu equipo para aprovechar todas las funcionalidades"
            />
            <Step 
              number={6} 
              title="Lanzamiento" 
              description="Implementamos con monitoreo continuo y mejoras regulares"
            />
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-iaeva-blue font-medium mb-2">Tiempo estimado: <span className="font-bold">30 días</span></p>
          <p className="text-gray-600 text-sm max-w-xl mx-auto">
            El proceso está diseñado para minimizar interrupciones y maximizar resultados, 
            adaptándose a las necesidades específicas de tu centro de salud.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImplementationPlan;
