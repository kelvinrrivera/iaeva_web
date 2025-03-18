
import { Check, Clock, Calendar, MessageSquare, Brain, Users, ChevronRight, ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay?: string;
  className?: string;
}

const FeatureCard = ({ icon, title, description, color, delay = "0s", className }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={cn(
        "bg-white rounded-2xl p-6 border border-gray-100 shadow-soft transition-all hover:shadow-lg",
        isVisible ? "opacity-100 animate-fade-in-up" : "opacity-0",
        className
      )}
      style={{ animationDelay: delay, animationFillMode: 'forwards' }}
    >
      <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center mb-5`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const [isTitleVisible, setIsTitleVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTitleVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  const features = [
    {
      icon: <Brain className="h-7 w-7 text-white" />,
      title: "IA conversacional médica",
      description: "Agentes de IA entrenados específicamente para el sector salud, capaces de gestionar citas y mantener conversaciones empáticas con los pacientes.",
      color: "bg-iaeva-blue",
      delay: "0.1s"
    },
    {
      icon: <Calendar className="h-7 w-7 text-white" />,
      title: "Sistema de citas médicas online",
      description: "Plataforma completa para programar, modificar y cancelar citas médicas, con optimización automática de horarios para maximizar la eficiencia.",
      color: "bg-iaeva-purple",
      delay: "0.2s"
    },
    {
      icon: <MessageSquare className="h-7 w-7 text-white" />,
      title: "Integración con WhatsApp",
      description: "Comunicación fluida a través de WhatsApp para confirmaciones, recordatorios y consultas, mejorando la accesibilidad y la satisfacción del paciente.",
      color: "bg-iaeva-teal",
      delay: "0.3s"
    },
    {
      icon: <Clock className="h-7 w-7 text-white" />,
      title: "Recordatorios automáticos",
      description: "Sistema de notificaciones para reducir las ausencias a citas programadas, con confirmación y opción para reagendar con anticipación.",
      color: "bg-iaeva-blue",
      delay: "0.4s"
    },
    {
      icon: <Users className="h-7 w-7 text-white" />,
      title: "Colaboración IA-humano",
      description: "Transferencia inteligente a agentes humanos cuando sea necesario, manteniendo todo el contexto de la conversación para una experiencia sin interrupciones.",
      color: "bg-iaeva-purple",
      delay: "0.5s"
    },
    {
      icon: <Check className="h-7 w-7 text-white" />,
      title: "CRM integrado",
      description: "Sistema centralizado para gestionar todas las interacciones con pacientes, permitiendo un seguimiento personalizado y una atención de calidad.",
      color: "bg-iaeva-teal",
      delay: "0.6s"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-iaeva-bg-light">
      <div className="container mx-auto px-4 md:px-6">
        <div 
          ref={titleRef} 
          className={`text-center mb-16 transition-opacity duration-500 ${isTitleVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-iaeva-bg-light text-iaeva-blue font-medium text-sm mb-3">
            Características principales
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            <span className="gradient-text">Soluciones inteligentes</span> para el sector médico
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            IAEVA integra tecnologías de vanguardia para ofrecer una atención al cliente excepcional, optimizar la gestión de citas y mejorar la experiencia del paciente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              delay={feature.delay}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            to="/casos-de-uso" 
            className="inline-flex items-center text-white bg-gradient-to-r from-iaeva-blue to-iaeva-purple transition-colors font-medium px-6 py-3 rounded-full"
          >
            Ver todos los casos de uso
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;
