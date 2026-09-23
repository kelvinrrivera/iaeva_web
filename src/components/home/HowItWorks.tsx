import { Check, Clock, Calendar, MessageSquare, Brain, Users, ChevronRight, ArrowRight, Heart, Shield, Award, Activity } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
      className={`flex items-start mb-8 transition-all duration-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
        }`}
      style={{ transitionDelay: `${number * 200}ms` }}
    >
      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-4 transition-all duration-300 ${isActive
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
  const { t } = useTranslation('home');
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
          className={`text-center mb-20 transition-all duration-1000 ${isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 font-medium text-sm mb-4 transform transition-transform hover:scale-105">
            {t('how_it_works.badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
            {t('how_it_works.heading')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {t('how_it_works.description')}
          </p>
        </div>

        <div id="como-funciona" className="mt-24">
          <div className="container mx-auto px-4 md:px-6">
            {/* Contenido reorganizado con mejor estructura y diseño */}
            <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
              {/* Chat window con efectos mejorados */}
              <div
                ref={sectionRef}
                className={`w-full lg:w-1/2 transition-all duration-1000 overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
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
                  {t('how_it_works.heading')}
                </h3>

                <ProcessStep
                  number={1}
                  title={t('how_it_works.steps.step_1.title')}
                  description={t('how_it_works.steps.step_1.description')}
                  isActive={activeStep === 1}
                />

                <ProcessStep
                  number={2}
                  title={t('how_it_works.steps.step_2.title')}
                  description={t('how_it_works.steps.step_2.description')}
                  isActive={activeStep === 2}
                />

                <ProcessStep
                  number={3}
                  title={t('how_it_works.steps.step_3.title')}
                  description={t('how_it_works.steps.step_3.description')}
                  isActive={activeStep === 3}
                />

                {/* Step 4 removed */}
              </div>
            </div>

            {/* CTA final más destacado */}
            {/* CTA removed */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;