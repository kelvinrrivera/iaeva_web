import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Home } from 'lucide-react';

import PageLayout from '@/components/layout/PageLayout';
import SEOHead from '@/components/shared/SEOHead';

const NotFound = () => {
  const { t, i18n } = useTranslation('common');
  const isSpanish = i18n.language === 'es' || i18n.language === 'es-ES';
  
  // Use the effect hook to set the HTTP status code to 404
  useEffect(() => {
    // This approach works with React Router and SSR frameworks
    const metaStatus = document.createElement('meta');
    metaStatus.httpEquiv = 'status';
    metaStatus.content = '404';
    document.head.appendChild(metaStatus);
    
    return () => {
      document.head.removeChild(metaStatus);
    };
  }, []);
  
  return (
    <PageLayout>
      <SEOHead 
        title={t('404.title')}
        description={t('404.description')}
        canonicalUrl={isSpanish ? "/404" : "/fr/404"}
        noIndex={true}
      />
      
      <div className="container mx-auto px-4 py-32 min-h-screen flex items-center justify-center">
        <div className="max-w-md text-center">
          <h1 className="text-9xl font-bold text-gray-200 mb-4">404</h1>
          <h2 className="text-2xl font-bold mb-6">{t('404.heading')}</h2>
          <p className="text-gray-600 mb-8">{t('404.message')}</p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <button 
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-iaeva-blue hover:bg-blue-700"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              {t('404.back')}
            </button>
            
            <Link 
              to={isSpanish ? "/" : "/fr"}
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-iaeva-blue bg-blue-50 hover:bg-blue-100"
            >
              <Home className="mr-2 h-5 w-5" />
              {t('404.home')}
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFound;
