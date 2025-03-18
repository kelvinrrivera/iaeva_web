
import React from 'react';

interface HowItWorksTitleProps {
  className?: string;
}

const HowItWorksTitle: React.FC<HowItWorksTitleProps> = ({ className = "" }) => {
  return (
    <div className={className}>
      <span className="inline-block px-4 py-1.5 rounded-full bg-iaeva-bg-light text-iaeva-blue font-medium text-sm mb-3">
        Una solusión centrada en el paciente
      </span>
      <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
        Centraliza y <span className="gradient-text">optimiza</span> la atención al paciente
      </h2>
      <p className="text-gray-600 mb-8">
        Gestiona todas las conversaciones en un solo lugar con nuestro Panel de Administración. Un ecosistema diseñado para que tu equipo y IAEVA trabajen juntos de manera eficiente.
      </p>
    </div>
  );
};

export default HowItWorksTitle;
