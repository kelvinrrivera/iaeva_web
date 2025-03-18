// Nuevo archivo: src/components/shared/CTAButton.tsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CTAButtonProps {
  text: string;
  path: string;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: boolean;
  className?: string;
  dataTestId?: string; // Para A/B testing
}

const CTAButton = ({ 
  text, 
  path, 
  variant = 'primary', 
  icon = true, 
  className = '',
  dataTestId 
}: CTAButtonProps) => {
  
  const baseClasses = "px-6 py-3 rounded-full font-medium transition-all duration-300 inline-flex items-center";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white hover:shadow-lg",
    secondary: "bg-white text-iaeva-blue border border-iaeva-blue hover:bg-iaeva-blue/10",
    outline: "border border-white/30 text-white hover:bg-white/10"
  };
  
  return (
    <Link 
      to={path} 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      data-test-id={dataTestId}
    >
      {text}
      {icon && <ArrowRight className="ml-2 h-5 w-5" />}
    </Link>
  );
};

export default CTAButton;
