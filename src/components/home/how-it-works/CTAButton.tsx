import { ArrowRight } from 'lucide-react';
import { SIGNUP_URL } from '@/config/app-urls';
import { useTranslation } from 'react-i18next';
import CTAButtonShared from '@/components/shared/CTAButton';

const CTAButton = () => {
  const { t } = useTranslation('home');

  return (
    <div className="mt-10">
      <CTAButtonShared
        text={t('vapi_voice.cta_button')}
        path={SIGNUP_URL}
        variant="primary"
        className="bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white px-6 py-3 rounded-full font-medium transition-all hover:shadow-button hover:translate-y-[-2px] inline-flex items-center"
        isCalendarButton={true}
      />
    </div>
  );
};

export default CTAButton;
