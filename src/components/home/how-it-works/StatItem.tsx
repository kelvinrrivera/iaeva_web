import { useRef, useState, useEffect } from 'react';

const StatItem = ({ value, description }) => {
  const itemRef = useRef(null);
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

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={itemRef}
      className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent mb-4">
        {value}
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default StatItem;