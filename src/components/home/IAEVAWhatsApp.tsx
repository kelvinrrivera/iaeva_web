import { Check, Clock, Phone, MessageSquare, Brain, Camera, ChevronRight, ArrowRight, /*MicrophoneIcon,*/ Paperclip, Smile, SendHorizontal } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
//import { cn } from '@/lib/utils';

// Componente para la ventana de WhatsApp mejorada
const WhatsAppChatWindow = () => {
  return (
    <div className="relative h-full w-full rounded-3xl shadow-xl overflow-hidden border border-gray-200 bg-white transform transition-transform hover:scale-[1.02]">
      {/* Barra de estado del teléfono */}
      <div className="bg-gray-800 p-2 flex items-center justify-between text-white text-xs">
        <div>10:15</div>
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-white"></div>
          <div className="h-2 w-2 rounded-full bg-white"></div>
          <div className="h-2 w-2 rounded-full bg-white"></div>
          <div className="h-2 w-2 rounded-full bg-white"></div>
        </div>
        <div className="flex items-center space-x-1">
          <div>100%</div>
          <div className="h-3 w-5 border border-white rounded-sm"></div>
        </div>
      </div>
      
      {/* Header del chat de WhatsApp */}
      <div className="bg-emerald-600 p-3 text-white">
        <div className="flex items-center">
          <button className="mr-2">
            <ChevronRight className="rotate-180" size={24} />
          </button>
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-3">
            <Brain className="text-white" size={20} />
          </div>
          <div className="flex-grow">
            <h3 className="font-semibold">IAEVA - (IA)</h3>
            <p className="text-xs text-white/80">En línea</p>
          </div>
          <div className="flex space-x-4">
            <Phone size={20} />
            <Camera size={20} />
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Fondo de WhatsApp */}
      <div className="bg-[url('/whatsapp-bg.png')] bg-repeat h-96 overflow-y-auto p-4" style={{ backgroundImage: "linear-gradient(rgba(230, 230, 230, 0.95), rgba(230, 230, 230, 0.95)), url('/whatsapp-bg.png')" }}>
        {/* Fecha */}
        <div className="flex justify-center my-2">
          <span className="text-xs bg-white text-gray-500 rounded-lg px-3 py-1 shadow-sm">HOY</span>
        </div>

        {/* Mensaje de IAEVA */}
        <div className="flex mb-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="max-w-[80%]">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <p className="text-sm text-gray-800">Hola, soy IAEVA, asistente virtual de la Clínica San Rafael. ¿En qué puedo ayudarte hoy?</p>
              <span className="text-xs text-gray-500 text-right block">10:05 <Check className="inline ml-1 text-gray-400" size={14} /></span>
            </div>
          </div>
        </div>

        {/* Mensaje del usuario */}
        <div className="flex mb-4 justify-end animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <div className="max-w-[80%]">
            <div className="bg-emerald-100 rounded-lg p-3 shadow-sm">
              <p className="text-sm text-gray-800">Hola, necesito reservar una cita con el oftalmólogo lo antes posible. Tengo un problema en el ojo izquierdo.</p>
              <span className="text-xs text-gray-500 text-right block">10:06 <Check className="inline ml-1 text-emerald-500" size={14} /></span>
            </div>
          </div>
        </div>

        {/* Respuesta de IAEVA */}
        <div className="flex mb-4 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <div className="max-w-[80%]">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <p className="text-sm text-gray-800">Entiendo, lo siento por tu molestia. Para agendar una cita con oftalmología necesito confirmar algunos datos. ¿Ya eres paciente de la Clínica San Rafael? Si es así, ¿podrías indicarme tu nombre completo y número de identificación?</p>
              <span className="text-xs text-gray-500 text-right block">10:07 <Check className="inline ml-1 text-gray-400" size={14} /></span>
            </div>
          </div>
        </div>

        {/* Mensaje del usuario */}
        <div className="flex mb-4 justify-end animate-fade-in" style={{ animationDelay: "1.0s" }}>
          <div className="max-w-[80%]">
            <div className="bg-emerald-100 rounded-lg p-3 shadow-sm">
              <p className="text-sm text-gray-800">Sí, soy paciente. Me llamo Carlos Rodríguez y mi número de identificación es 12345678.</p>
              <span className="text-xs text-gray-500 text-right block">10:08 <Check className="inline ml-1 text-emerald-500" size={14} /></span>
            </div>
          </div>
        </div>

        {/* Respuesta de IAEVA */}
        <div className="flex mb-4 animate-fade-in" style={{ animationDelay: "1.2s" }}>
          <div className="max-w-[80%]">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <p className="text-sm text-gray-800">Gracias Carlos. He encontrado tu información en el sistema. Para el área de oftalmología, tenemos disponibilidad en los siguientes horarios:</p>
              <ul className="text-sm text-gray-800 my-2 pl-4 list-disc">
                <li>Mañana, 11 de marzo a las 9:30 AM con Dr. Méndez</li>
                <li>Mañana, 11 de marzo a las 15:00 PM con Dra. González</li>
                <li>Pasado mañana, 12 de marzo a las 11:00 AM con Dr. Méndez</li>
              </ul>
              <p className="text-sm text-gray-800">¿Alguno de estos horarios te funciona?</p>
              <span className="text-xs text-gray-500 text-right block">10:09 <Check className="inline ml-1 text-gray-400" size={14} /></span>
            </div>
          </div>
        </div>

        {/* Mensaje del usuario */}
        <div className="flex mb-4 justify-end animate-fade-in" style={{ animationDelay: "1.4s" }}>
          <div className="max-w-[80%]">
            <div className="bg-emerald-100 rounded-lg p-3 shadow-sm">
              <p className="text-sm text-gray-800">La de mañana a las 9:30 AM me viene bien.</p>
              <span className="text-xs text-gray-500 text-right block">10:10 <Check className="inline ml-1 text-emerald-500" size={14} /></span>
            </div>
          </div>
        </div>

        {/* Confirmación de IAEVA */}
        <div className="flex mb-4 animate-fade-in" style={{ animationDelay: "1.6s" }}>
          <div className="max-w-[80%]">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <p className="text-sm text-gray-800">Perfecto, Carlos. He reservado tu cita para mañana 11 de marzo a las 9:30 AM con el Dr. Méndez en el área de oftalmología.</p>
              <p className="text-sm text-gray-800 mt-2">Recuerda que debes llegar 15 minutos antes para el proceso de admisión y traer tu documento de identidad. ¿Necesitas indicaciones para llegar a la clínica?</p>
              <span className="text-xs text-gray-500 text-right block">10:11 <Check className="inline ml-1 text-gray-400" size={14} /></span>
            </div>
          </div>
        </div>

        {/* Mensaje del usuario */}
        <div className="flex mb-4 justify-end animate-fade-in" style={{ animationDelay: "1.8s" }}>
          <div className="max-w-[80%]">
            <div className="bg-emerald-100 rounded-lg p-3 shadow-sm">
              <p className="text-sm text-gray-800">No, gracias. Conozco el camino. ¿Me llegará algún recordatorio de la cita?</p>
              <span className="text-xs text-gray-500 text-right block">10:12 <Check className="inline ml-1 text-emerald-500" size={14} /></span>
            </div>
          </div>
        </div>

        {/* Respuesta final de IAEVA */}
        <div className="flex mb-4 animate-fade-in" style={{ animationDelay: "2.0s" }}>
          <div className="max-w-[80%]">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <p className="text-sm text-gray-800">Sí, te enviaré un recordatorio 24 horas antes de tu cita y otro recordatorio 2 horas antes. También puedes escribirme en cualquier momento si necesitas reprogramar o cancelar.</p>
              <p className="text-sm text-gray-800 mt-2">Te he enviado un resumen de tu cita al correo registrado. ¿Hay algo más en lo que pueda ayudarte?</p>
              <span className="text-xs text-gray-500 text-right block">10:13 <Check className="inline ml-1 text-gray-400" size={14} /></span>
            </div>
          </div>
        </div>

        {/* Mensaje de procesamiento */}
        <div className="flex mb-4">
          <div className="max-w-[80%]">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Input de WhatsApp */}
      <div className="bg-gray-100 p-2">
        <div className="flex items-center">
          <button className="mx-2 w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200">
            <Smile size={24} />
          </button>
          <button className="mx-1 w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200">
            <Paperclip size={24} />
          </button>
          <input 
            type="text" 
            placeholder="Escribe un mensaje" 
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-transparent"
          />
          <button className="ml-2 w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-emerald-600">
            <SendHorizontal size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente para el paso del proceso de WhatsApp
const WhatsAppProcessStep = ({ number, title, description, isActive = false }) => {
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
          ? "bg-gradient-to-r from-emerald-500 to-blue-600 text-white shadow-lg shadow-emerald-200"
          : "bg-gray-100 text-gray-500"
      }`}>
        {number}
      </div>
      <div>
        <h3 className={`text-xl font-bold mb-2 ${isActive ? "text-emerald-600" : "text-gray-800"}`}>{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

// Componente de beneficios de WhatsApp
const WhatsAppBenefit = ({ icon, title, description }) => {
  const benefitRef = useRef(null);
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

    if (benefitRef.current) {
      observer.observe(benefitRef.current);
    }

    return () => {
      if (benefitRef.current) {
        observer.unobserve(benefitRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={benefitRef}
      className={`bg-white rounded-2xl p-6 border border-gray-100 shadow-soft transition-all duration-500 hover:shadow-lg hover:translate-y-[-5px] ${
        isVisible ? "opacity-100 animate-fade-in-up" : "opacity-0"
      }`}
    >
      <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

// Componente principal de WhatsApp
const IAEVAWhatsApp = () => {
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
    <section className="py-20 bg-gradient-to-b from-white to-emerald-50">
      <div className="container mx-auto px-4 md:px-6">
        <div 
          ref={titleRef} 
          className={`text-center mb-20 transition-all duration-1000 ${
            isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-600 font-medium text-sm mb-4 transform transition-transform hover:scale-105">
            WhatsApp Integration
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
            IAEVA en <span className="bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent">WhatsApp</span> para tu centro de salud
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Lleva la experiencia IAEVA al canal más utilizado por los pacientes. Atiende consultas, gestiona citas y da seguimiento desde WhatsApp con nuestra IA integrada.
          </p>
        </div>

        <div id="iaeva-whatsapp" className="mt-24">
          <div className="container mx-auto px-4 md:px-6">
            {/* Contenido reorganizado con mejor estructura y diseño */}
            <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
              {/* Chat window con efectos mejorados */}
              <div
                ref={sectionRef}
                className={`w-full lg:w-1/2 transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
              >
                <div className="relative h-[650px] w-full max-w-[350px] mx-auto transform perspective-1000 hover:rotate-y-1">
                  {/* Capa de decoración para el teléfono */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-[40px] transform -rotate-2 scale-[0.97] opacity-20 blur-xl"></div>
                  {/* Marco del teléfono */}
                  <div className="absolute inset-0 bg-gray-900 rounded-[40px] transform scale-[1.02] z-0"></div>
                  {/* Notch del teléfono */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-7 bg-gray-900 rounded-b-2xl z-20"></div>
                  {/* Pantalla */}
                  <div className="relative h-full z-10 rounded-[35px] overflow-hidden mx-2 my-2">
                    <WhatsAppChatWindow />
                  </div>
                </div>
              </div>

              {/* Steps con animación y mejora visual */}
              <div className="w-full lg:w-1/2">
                <h3 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
                  <span className="mr-2">💬</span> IAEVA en WhatsApp: citas médicas al instante
                </h3>
                
                <WhatsAppProcessStep 
                  number={1} 
                  title="Contacto Inmediato" 
                  description="El paciente envía un mensaje a través de WhatsApp. IAEVA responde al instante, identificando al paciente si está registrado o iniciando un nuevo registro."
                  isActive={activeStep === 1}
                />
                
                <WhatsAppProcessStep 
                  number={2} 
                  title="Gestión de Citas" 
                  description="IAEVA permite consultar disponibilidad, agendar, modificar o cancelar citas directamente desde WhatsApp, sin necesidad de llamadas o visitas."
                  isActive={activeStep === 2}
                />
                
                <WhatsAppProcessStep 
                  number={3} 
                  title="Confirmación y Recordatorios" 
                  description="El sistema envía confirmaciones automáticas y recordatorios personalizados 24 horas y 2 horas antes de la cita programada."
                  isActive={activeStep === 3}
                />
                
                <WhatsAppProcessStep 
                  number={4} 
                  title="Seguimiento Post-Consulta" 
                  description="Después de la cita, IAEVA envía encuestas de satisfacción y facilita la programación de citas de seguimiento o la solicitud de resultados médicos."
                  isActive={activeStep === 4}
                />
                
                {/*<div className="mt-8">
                  <Link 
                    to="/solicitar-demo" 
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 to-green-600-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <span>Solicitar una demostración</span>
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>*/}
              </div>
            </div>

            {/* Beneficios de la integración con WhatsApp */}
            <div className="mt-24">
              <h3 className="text-2xl md:text-3xl font-bold mb-10 text-center text-gray-800">
                Beneficios de IAEVA en WhatsApp
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <WhatsAppBenefit 
                  icon={<Clock className="text-emerald-600" size={28} />}
                  title="Ahorro de Tiempo"
                  description="Reduce el tiempo de gestión de citas en un 70% para tu personal y tus pacientes."
                />
                <WhatsAppBenefit 
                  icon={<Check className="text-emerald-600" size={28} />}
                  title="Reducción de No-Shows"
                  description="Disminuye en un 60% las inasistencias a citas gracias a recordatorios automáticos personalizados."
                />
                <WhatsAppBenefit 
                  icon={<MessageSquare className="text-emerald-600" size={28} />}
                  title="Canal Preferido"
                  description="Comunícate con tus pacientes en la plataforma que ya utilizan a diario, sin necesidad de descargar apps adicionales."
                />
              </div>
            </div>

            {/* CTA final más destacado */}
            <div className="text-center mt-20 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-3xl p-10 shadow-inner">
              <h3 className="text-2xl font-bold mb-4">Lleva la atención de tu clínica al siguiente nivel</h3>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                Únete a las clínicas y hospitales que ya están utilizando WhatsApp para mejorar la experiencia de sus pacientes y optimizar sus procesos.
              </p>
              <Link 
                to="/contacto" 
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r  from-iaeva-blue to-iaeva-purple text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-lg"
              >
                <span>Integra IAEVA en tu WhatsApp</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IAEVAWhatsApp;