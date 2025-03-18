
import { useEffect, useRef, useState } from 'react';

interface StepProps {
  number: string;
  title: string;
  description: string;
  delay?: string;
  color?: string;
}

const Step = ({ number, title, description, delay = "0s", color = "from-iaeva-blue to-iaeva-purple" }: StepProps) => {
  const stepRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      className={`relative flex gap-5 transition-all duration-500 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: delay }}
    >
      <div className="flex-shrink-0">
        <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r ${color} text-white font-bold`}>
          {number}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default Step;
