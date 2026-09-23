import { useEffect, useRef, useState } from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

// Import subcomponents
import AgentChatWindow from './how-it-works/AgentChatWindow';
import StepsContainer from './how-it-works/StepsContainer';
import HowItWorksTitle from './how-it-works/HowItWorksTitle';
import CTAButton from './how-it-works/CTAButton';
import CTAButtonShared from '@/components/shared/CTAButton';

// Main component with enhanced structure
const CustomerServiceHub = () => {
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
          className={`text-center mb-20 transition-all duration-1000 ${isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
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
                className={`w-full lg:w-1/2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                  }`}
              >
                <div className="relative h-[600px] w-full transform perspective-1000 hover:rotate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl transform -rotate-2 scale-[0.97] opacity-20 blur-xl"></div>
                  <div className="relative h-full z-10 borde">
                    <AgentChatWindow />
                  </div>
                </div>
              </div>

              {/* Steps with animation and visual enhancement */}
              <div className="w-full lg:w-1/2">
                <StepsContainer />


              </div>
            </div>

            {/* Statistics with animation */}
            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-green-600 bg-clip-text text-transparent mb-4">{t('hub_stats.satisfaction.value')}</div>
                <p className="text-gray-600">{t('hub_stats.satisfaction.label')}</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-green-600 bg-clip-text text-transparent mb-4">{t('hub_stats.wait_time.value')}</div>
                <p className="text-gray-600">{t('hub_stats.wait_time.label')}</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-green-600 bg-clip-text text-transparent mb-4">{t('hub_stats.availability.value')}</div>
                <p className="text-gray-600">{t('hub_stats.availability.label')}</p>
              </div>
            </div>

            {/* Enhanced final CTA */}
            <div className="text-center mt-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-10 shadow-inner">
              <h3 className="text-2xl font-bold mb-4">{t('vapi_voice.cta_title', '¿Listo para transformar la experiencia de tus pacientes?')}</h3>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                {t('vapi_voice.cta_description', 'Únete a las clínicas y hospitales que ya están aprovechando IAEVA para mejorar la atención y satisfacción de sus pacientes.')}
              </p>
              <CTAButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerServiceHub;