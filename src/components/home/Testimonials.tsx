import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
}

const Testimonials = () => {
  const { t } = useTranslation('home');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const testimonials: Testimonial[] = [
    {
      "id": 1,
      "name": t('testimonials.person1.name'),
      "role": t('testimonials.person1.role'),
      "company": t('testimonials.person1.company'),
      "image": "/testimonials/dra-ana-rodriguez.webp",
      "quote": t('testimonials.person1.quote'),
      "rating": 5
    },
    {
      "id": 2,
      "name": t('testimonials.person2.name'),
      "role": t('testimonials.person2.role'),
      "company": t('testimonials.person2.company'),
      "image": "/testimonials/dr-carlos-mendez.webp",
      "quote": t('testimonials.person2.quote'),
      "rating": 5
    },
    {
      "id": 3,
      "name": t('testimonials.person3.name'),
      "role": t('testimonials.person3.role'),
      "company": t('testimonials.person3.company'),
      "image": "/testimonials/laura-fernandez.webp",
      "quote": t('testimonials.person3.quote'),
      "rating": 4
    }
  ];

  const nextTestimonial = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevTestimonial = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);

    return () => clearInterval(interval);
  }, [activeIndex, isAnimating]);

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
    <section className="py-20 bg-iaeva-bg-light overflow-hidden">
      <div 
        ref={sectionRef}
        className={`container mx-auto px-4 md:px-6 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white text-iaeva-blue font-medium text-sm mb-3">
            {t('testimonials.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            {t('testimonials.title')} <span className="gradient-text">{t('testimonials.title_highlighted')}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('testimonials.description')}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Controles de navegación */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 hidden md:block">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center text-gray-600 hover:text-iaeva-blue transition-colors"
              aria-label={t('testimonials.previous_button')}
            >
              <ChevronLeft size={20} />
            </button>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 hidden md:block">
            <button
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center text-gray-600 hover:text-iaeva-blue transition-colors"
              aria-label={t('testimonials.next_button')}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Carrusel de testimonios */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-2xl p-8 shadow-soft">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-iaeva-purple/20">
                        <img 
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/placeholder.svg";
                          }}
                        />
                      </div>
                      
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            size={18}
                            className={cn(
                              "mx-0.5",
                              i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            )}
                          />
                        ))}
                      </div>
                      
                      <blockquote className="mb-6">
                        <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                      </blockquote>
                      
                      <div>
                        <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                        <p className="text-gray-600 text-sm">{testimonial.role} {testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicadores */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all",
                  activeIndex === index 
                    ? "bg-gradient-to-r from-iaeva-blue to-iaeva-purple w-6" 
                    : "bg-gray-300 hover:bg-gray-400"
                )}
                aria-label={t('testimonials.goto_testimonial', { number: index + 1 })}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
