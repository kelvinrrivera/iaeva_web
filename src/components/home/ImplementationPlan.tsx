import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('home');
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
          <span className="inline-block px-4 py-1.5 rounded-full bg-iaeva-bg-light text-iaeva-blue-dark font-medium text-sm mb-3">
            {t('implementation.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            {t('implementation.title')} <span className="gradient-text"> {t('implementation.title_highlighted')}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('implementation.description')}
          </p>
        </div>

        <div className="relative">
          {/* Línea de conexión */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-iaeva-blue to-iaeva-purple hidden md:block"></div>
          
          {/* Pasos */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-4 relative z-10">
            <Step 
              number={1} 
              title={t('implementation.step1_title')} 
              description={t('implementation.step1_description')}
            />
            <Step 
              number={2} 
              title={t('implementation.step2_title')}
              description={t('implementation.step2_description')}
            />
            <Step 
              number={3} 
              title={t('implementation.step3_title')}
              description={t('implementation.step3_description')}
            />
            <Step 
              number={4} 
              title={t('implementation.step4_title')}
              description={t('implementation.step4_description')}
            />
            <Step 
              number={5} 
              title={t('implementation.step5_title')}
              description={t('implementation.step5_description')}
            />
            <Step 
              number={6} 
              title={t('implementation.step6_title')}
              description={t('implementation.step6_description')}
            />
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-iaeva-blue-dark font-medium mb-2">{t('implementation.estimated_time_label')} <span className="font-bold">{t('implementation.estimated_time_value')}</span></p>
          <p className="text-gray-600 text-sm max-w-xl mx-auto">
            {t('implementation.final_note')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImplementationPlan;
