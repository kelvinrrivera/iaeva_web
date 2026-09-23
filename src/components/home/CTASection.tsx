import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CTAButton from '@/components/shared/CTAButton';

const CTASection = () => {
  const { t } = useTranslation('home');
  const ctaRef = useRef<HTMLDivElement>(null);
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

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current);
      }
    };
  }, []);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div
          ref={ctaRef}
          className={`relative rounded-3xl overflow-hidden bg-gradient-to-r from-iaeva-blue to-iaeva-purple py-16 px-8 md:px-12 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Elementos decorativos */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"></div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton
                text={t('cta.primary_button')}
                path="/contacto"
                variant="white"
                className="bg-white text-iaeva-blue px-8 py-3.5 rounded-full font-medium transition-all hover:shadow-lg hover:translate-y-[-2px] inline-flex items-center justify-center"
                isCalendarButton={true}
              />
              <Link
                to="/recursos/guia-eficiencia-clinica"
                className="bg-iaeva-purple/20 text-white border border-white/30 px-8 py-3.5 rounded-full font-medium transition-all hover:bg-iaeva-purple/30 inline-flex items-center justify-center gap-2"
              >
                Leer guía estratégica
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
