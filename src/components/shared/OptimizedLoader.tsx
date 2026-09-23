import { useEffect, useState } from 'react';

interface OptimizedLoaderProps {
  minimumLoadTimeMs?: number;
}

const OptimizedLoader = ({ minimumLoadTimeMs = 500 }: OptimizedLoaderProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Ensure loader stays visible for a minimum time to avoid flashes
    const timer = setTimeout(() => {
      setVisible(false);
    }, minimumLoadTimeMs);

    return () => clearTimeout(timer);
  }, [minimumLoadTimeMs]);

  if (!visible) return null;

  return (
    <div 
      className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center"
      style={{
        transition: 'opacity 0.5s ease-in-out',
        opacity: 1,
      }}
    >
      <div className="relative">
        {/* Simple, lightweight spinner that doesn't require images */}
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        
        {/* Optional logo overlay in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-primary text-lg font-bold">IA</span>
        </div>
      </div>
    </div>
  );
};

export default OptimizedLoader; 