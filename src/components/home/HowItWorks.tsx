import { Check, Clock, Calendar, MessageSquare, Brain, Users, ChevronRight, ArrowRight, Heart, Shield, Award, Activity } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import FloatingChat from './how-it-works/FloatingChat';

const FeatureCard = ({ icon, title, description, color, delay = "0s", className = "" }) => {
  const cardRef = useRef(null);
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
        "bg-white rounded-2xl p-6 border border-gray-100 shadow-soft transition-all duration-500 hover:shadow-lg hover:translate-y-[-5px] hover:border-blue-200",
        isVisible ? "opacity-100 animate-fade-in-up" : "opacity-0",
        className
      )}
      style={{ animationDelay: delay, animationFillMode: 'forwards' }}
    >
      <div className={`w-16 h-16 rounded-xl ${color} flex items-center justify-center mb-5 transform transition-all duration-300 hover:rotate-12`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

// Componente para el paso del proceso con animación
const ProcessStep = ({ number, title, description, isActive = false }) => {
  const stepRef = useRef(null);
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

    if (stepRef.current) {
      observer.observe(stepRef.current);
    }

    return () => {
      if (stepRef.current) {
        observer.unobserve(stepRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={stepRef}
      className={`flex items-start mb-8 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
      }`}
      style={{ transitionDelay: `${number * 200}ms` }}
    >
      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-4 transition-all duration-300 ${
        isActive 
          ? "bg-gradient-to-r from-blue-500 to-green-600 text-white shadow-lg shadow-blue-200"
          : "bg-gray-100 text-gray-500"
      }`}>
        {number}
      </div>
      <div>
        <h3 className={`text-xl font-bold mb-2 ${isActive ? "text-blue-600" : "text-gray-800"}`}>{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

// Componente principal mejorado
const HowItWorks = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef(null);
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const titleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTitleVisible(true);
          titleObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    if (titleRef.current) {
      titleObserver.observe(titleRef.current);
    }

    // Rotar automáticamente los pasos activos
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < 4 ? prev + 1 : 1));
    }, 3000);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (titleRef.current) {
        titleObserver.unobserve(titleRef.current);
      }
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50 overflow-x-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div 
          ref={titleRef} 
          className={`text-center mb-20 transition-all duration-1000 ${
            isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 font-medium text-sm mb-4 transform transition-transform hover:scale-105">
            Mas que un chatbot
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
          💬 IEVA en <span className="bg-gradient-to-r from-blue-500 to-green-600 bg-clip-text text-transparent">la web</span> de tu establecimiento
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Convierte la página web de tu centro médico en un canal de atención 24/7 con el widget de IAEVA. Un chat intuitivo que guía a los pacientes, responde dudas y facilita la gestión de citas sin que tengan que hacer llamadas.
          </p>
        </div>

        <div id="como-funciona" className="mt-24">
          <div className="container mx-auto px-4 md:px-6">
            {/* Contenido reorganizado con mejor estructura y diseño */}
            <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
              {/* Chat window con efectos mejorados */}
              <div
                ref={sectionRef}
                className={`w-full lg:w-1/2 transition-all duration-1000 overflow-hidden ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
              >
                <div className="relative h-[500px] md:h-[600px] w-full max-w-[448px] mx-auto transform perspective-1000 hover:rotate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-r bg-gradient-to-r from-iaeva-blue to-iaeva-purple rounded-2xl transform -rotate-2 scale-[0.98] opacity-20 blur-lg"></div>
                  <div className="relative h-full z-10">
                    <FloatingChat />
                  </div>
                </div>
              </div>

              {/* Steps con animación y mejora visual */}
              <div className="w-full lg:w-1/2">
                <h3 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
                  <span className="mr-2">✨</span> ¿Por qué necesitas que IAEVA esté disponible desde tu web?
                </h3>
                
                <ProcessStep 
                  number={1} 
                  title="Atención inmediata" 
                  description="Responde preguntas frecuentes sin esperas."
                  isActive={activeStep === 1}
                />
                
                <ProcessStep 
                  number={2} 
                  title="Reserva de citas sin complicaciones" 
                  description="Sin formularios largos ni llamadas innecesarias."
                  isActive={activeStep === 2}
                />
                
                <ProcessStep 
                  number={3} 
                  title="Escalabilidad" 
                  description="Maneja múltiples consultas a la vez sin sobrecargar al personal."
                  isActive={activeStep === 3}
                />
                
                <ProcessStep 
                  number={4} 
                  title="Transferencia fluida" 
                  description="Si es necesario, transfiere a un agente humano sin perder el contexto."
                  isActive={activeStep === 4}
                />
              </div>
            </div>


            {/* CTA final más destacado */}
            <div className="text-center mt-20 bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl p-10 shadow-inner">
              <h3 className="text-2xl font-bold mb-4">💡 Activa el chat inteligente en tu web hoy</h3>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                Ofrece atención inmediata y gestiona citas sin esfuerzo. Únete a los centros médicos que ya optimizan su atención con IA.
              </p>
              <Link 
                to="/contacto" 
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-lg"
              >
                <span>Solicita una demo gratis</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;