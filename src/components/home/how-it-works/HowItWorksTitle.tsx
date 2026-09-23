import React from 'react';
import { useTranslation } from 'react-i18next';

interface HowItWorksTitleProps {
  className?: string;
}

const HowItWorksTitle: React.FC<HowItWorksTitleProps> = ({ className = "" }) => {
  const { t } = useTranslation('home');
  
  return (
    <div className={className}>
      <span className="inline-block px-4 py-1.5 rounded-full bg-iaeva-bg-light text-iaeva-blue font-medium text-sm mb-3">
        {t('agent_chat.hub_badge')}
      </span>
      <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
        {t('agent_chat.hub_heading')}
      </h2>
      <p className="text-gray-600 mb-8">
        {t('agent_chat.hub_description')}
      </p>
    </div>
  );
};

export default HowItWorksTitle;
