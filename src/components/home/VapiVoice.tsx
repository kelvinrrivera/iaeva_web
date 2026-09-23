import React from 'react';
import { Check, Clock, Calendar, MessageSquare, Brain, Users, ChevronRight, ArrowRight, Heart, Shield, Award, Activity } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

import ErrorBoundary from '@/components/ErrorBoundary';

const VapiVoicePhone = React.lazy(() => import('./how-it-works/VapiVoicePhone'));

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
const VapiVoice = () => {
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
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 md:px-6">
        <div
          ref={titleRef}
          className={`text-center mb-20 transition-all duration-1000 ${isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 font-medium text-sm mb-4 transform transition-transform hover:scale-105">
            {t('vapi_voice.badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
            {t('vapi_voice.heading')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {t('vapi_voice.description')}
          </p>
        </div>

        <div id="como-funciona" className="mt-24">
          <div className="container mx-auto px-4 md:px-6">
            {/* Contenido reorganizado con mejor estructura y diseño */}
            <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
              {/* Chat window con efectos mejorados */}
              <div
                ref={sectionRef}
                className={`w-full lg:w-1/2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                  }`}
              >
                <div className="relative h-[576px] w-[320px] mx-auto transform perspective-1000 hover:rotate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-r bg-gradient-to-r from-iaeva-blue to-iaeva-purple rounded-2xl transform -rotate-2 scale-[0.98] opacity-20 blur-lg"></div>
                  <div className="relative h-full z-10">
                    <ErrorBoundary>
                      <React.Suspense fallback={<div>{t('common:loading')}</div>}>
                        <VapiVoicePhone />
                      </React.Suspense>
                    </ErrorBoundary>
                  </div>
                </div>
              </div>

              {/* Steps con animación y mejora visual */}
              <div className="w-full lg:w-1/2">
                <h3 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
                  {t('vapi_voice.steps_title')}
                </h3>

                <ProcessStep
                  number={1}
                  title={t('vapi_voice.step1_title')}
                  description={t('vapi_voice.step1_description')}
                  isActive={activeStep === 1}
                />

                <ProcessStep
                  number={2}
                  title={t('vapi_voice.step2_title')}
                  description={t('vapi_voice.step2_description')}
                  isActive={activeStep === 2}
                />

                <ProcessStep
                  number={3}
                  title={t('vapi_voice.step3_title')}
                  description={t('vapi_voice.step3_description')}
                  isActive={activeStep === 3}
                />

                <ProcessStep
                  number={4}
                  title={t('vapi_voice.step4_title')}
                  description={t('vapi_voice.step4_description')}
                  isActive={activeStep === 4}
                />
              </div>
            </div>

            {/* Estadísticas con animación */}
            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-500 to-green-600 bg-clip-text text-transparent mb-4">{t('vapi_voice.stats.stat1_value')}</div>
                <p className="text-gray-600">{t('vapi_voice.stats.stat1')}</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-500 to-green-600 bg-clip-text text-transparent mb-4">{t('vapi_voice.stats.stat2_value')}</div>
                <p className="text-gray-600">{t('vapi_voice.stats.stat2')}</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-500 to-green-600 bg-clip-text text-transparent mb-4">{t('vapi_voice.stats.stat3_value')}</div>
                <p className="text-gray-600">{t('vapi_voice.stats.stat3')}</p>
              </div>
            </div>

            <div className="mt-8 text-center px-4">
              <p className="text-xs md:text-sm text-gray-500 italic max-w-3xl mx-auto">
                {t('vapi_voice.disclaimer')}
              </p>
            </div>

            {/* CTA final mejorado */}
            <div className="text-center mt-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-10 shadow-inner">
              <h3 className="text-2xl font-bold mb-4">{t('vapi_voice.cta_title')}</h3>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                {t('vapi_voice.cta_description')}
              </p>
              <Link
                to="/contacto"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-lg"
              >
                <span>{t('vapi_voice.cta_button')}</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VapiVoice;