import { useEffect, useRef, useState } from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Import subcomponents
import AgentChatWindow from './how-it-works/AgentChatWindow';
import StepsContainer from './how-it-works/StepsContainer';
import HowItWorksTitle from './how-it-works/HowItWorksTitle';
import CTAButton from './how-it-works/CTAButton';

// Main component with enhanced structure
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

    // Rotate active steps automatically
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
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 md:px-6">
        <div 
          ref={titleRef} 
          className={`text-center mb-20 transition-all duration-1000 ${
            isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <HowItWorksTitle />
        </div>

        <div id="como-funciona" className="mt-24">
          <div className="container mx-auto px-4 md:px-6">
            {/* Content reorganized with better structure and design */}
            <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
              {/* Chat window with enhanced effects */}
              <div
                ref={sectionRef}
                className={`w-full lg:w-1/2 transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
              >
                <div className="relative h-[600px] w-full transform perspective-1000 hover:rotate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl transform -rotate-2 scale-[0.97] opacity-20 blur-xl"></div>
                  <div className="relative h-full z-10">
                    <AgentChatWindow />
                  </div>
                </div>
              </div>

              {/* Steps with animation and visual enhancement */}
              <div className="w-full lg:w-1/2">
                <StepsContainer />
                
                {/*<div className="mt-8">
                  <Link 
                    to="/solicitar-demo" 
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <span>Solicitar una demostración</span>
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>*/}
              </div>
            </div>

            {/* Statistics with animation */}
            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent mb-4">95%</div>
                <p className="text-gray-600">Satisfacción de pacientes con IAEVA</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent mb-4">+60%</div>
                <p className="text-gray-600">Reducción en tiempos de espera</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent mb-4">24/7</div>
                <p className="text-gray-600">Disponibilidad para atención inmediata</p>
              </div>
            </div>

            {/* Enhanced final CTA */}
            <div className="text-center mt-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-10 shadow-inner">
              <h3 className="text-2xl font-bold mb-4">¿Listo para transformar la experiencia de tus pacientes?</h3>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                Únete a las clínicas y hospitales que ya están aprovechando IAEVA para mejorar la atención y satisfacción de sus pacientes.
              </p>
              <CTAButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;