// Nuevo archivo: src/components/shared/CTAButton.tsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { isExternalUrl } from '@/config/app-urls';

interface CTAButtonProps {
  text: string;
  path: string;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: boolean;
  className?: string;
  dataTestId?: string; // Para A/B testing
  isCalendarButton?: boolean; // Nueva prop para indicar si es un botón de calendario
}

const CTAButton = ({
  text,
  path,
  variant = 'primary',
  icon = true,
  className = '',
  dataTestId,
  isCalendarButton = false
}: CTAButtonProps) => {

  const baseClasses = "px-6 py-3 rounded-full font-medium transition-all duration-300 inline-flex items-center";

  const variantClasses = {
    primary: "bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white hover:shadow-lg",
    secondary: "bg-white text-iaeva-blue border border-iaeva-blue hover:bg-iaeva-blue/10",
    outline: "border border-white/30 text-white hover:bg-white/10"
  };

  // Si es un botón de calendario, usamos un botón simple en lugar de un Link
  if (isCalendarButton) {
    return (
      <button
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        data-test-id={dataTestId}
        data-cal-link="kelvinscale/30min"
        data-cal-namespace="30min"
        data-cal-config='{"layout":"month_view","theme":"light"}'
      >
        {text}
        {icon && <ArrowRight className="ml-2 h-5 w-5" />}
      </button>
    );
  }

  // La aplicación vive en otro dominio (app.iaeva.com), así que un `Link` de React Router
  // no sirve: intentaría navegar dentro de la SPA y dejaría al usuario en una ruta que no
  // existe. Un enlace externo necesita un `<a>` de verdad.
  if (isExternalUrl(path)) {
    return (
      <a
        href={path}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        data-test-id={dataTestId}
      >
        {text}
        {icon && <ArrowRight className="ml-2 h-5 w-5" />}
      </a>
    );
  }

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
