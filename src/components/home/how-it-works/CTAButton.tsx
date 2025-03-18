
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTAButton = () => {
  return (
    <div className="mt-10">
      <Link 
        to="/contacto" 
        className="bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white px-6 py-3 rounded-full font-medium transition-all hover:shadow-button hover:translate-y-[-2px] inline-flex items-center"
      >
        Solicitar demo personalizada <ArrowRight className="ml-2" size={18} />
      </Link>
    </div>
  );
};

export default CTAButton;
