import { useEffect } from 'react';
import { SIGNUP_URL } from '@/config/app-urls';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Activity, Calculator, Ruler, Scale, ArrowRight } from 'lucide-react';

import PageLayout from '@/components/layout/PageLayout';
import SEOHead from '@/components/shared/SEOHead';
import { organizationSchema, socialProfiles } from '@/lib/schema';

const ResourcesPage = () => {
  const { t } = useTranslation(['common', 'tools']);
  
  // Breadcrumbs for SEO
  const breadcrumbs = [
    { name: t('navbar.home'), url: "/" },
    { name: t('navbar.resources'), url: "/recursos" }
  ];
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // List of tools for display
  const tools = [
    {
      id: 'bmi',
      title: t('bmi.title'),
      description: t('tools:medical_unit_converter.description'),
      icon: <Calculator className="h-6 w-6 text-white" />,
      color: 'bg-blue-500',
      link: '/recursos/calculadora-imc'
    },
    {
      id: 'ideal-weight',
      title: t('ideal_weight.title'),
      description: t('tools:diet_generator.description'),
      icon: <Scale className="h-6 w-6 text-white" />,
      color: 'bg-green-500',
      link: '/recursos/calculadora-peso-ideal'
    },
    {
      id: 'unit-converter',
      title: t('unit_converter.title'),
      description: t('tools:medical_unit_converter.description'),
      icon: <Ruler className="h-6 w-6 text-white" />,
      color: 'bg-purple-500',
      link: '/recursos/conversor-unidades'
    }
  ];
  
  return (
    <PageLayout>
      <SEOHead 
        title="Recursos y herramientas médicas | IAEVA"
        description="Acceda a nuestras calculadoras y herramientas médicas gratuitas para profesionales de la salud y pacientes. Incluye calculadora de IMC, peso ideal y convertidor de unidades médicas."
        canonicalUrl="/recursos"
        ogImage="/images/resources-og-image.jpg"
        keywords="calculadora IMC, calculadora peso ideal, convertidor unidades médicas, herramientas médicas, recursos sanitarios"
        structuredData={[organizationSchema]}
        socialProfiles={socialProfiles}
        breadcrumbs={breadcrumbs}
        hreflang={[
          { lang: 'es', url: '/recursos' },
          { lang: 'fr', url: '/fr/ressources' }
        ]}
        noIndex={true}
      />
      
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Página en mantenimiento</h1>
            <p className="text-xl text-gray-600 mb-8">
              Estamos trabajando para mejorar nuestras herramientas médicas. Disculpe las molestias.
            </p>
            <p className="text-lg text-gray-600">
              Vuelva pronto para acceder a nuestras calculadoras y recursos para profesionales de la salud.
            </p>
          </div>
          
          <div className="mt-16 max-w-4xl mx-auto bg-blue-50 rounded-xl p-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">¿Necesita herramientas personalizadas para su centro médico?</h2>
                <p className="text-gray-600 mb-4">
                  Ofrecemos soluciones a medida para clínicas y hospitales. Desde calculadoras específicas hasta sistemas 
                  completos de gestión de pacientes con IA.
                </p>
                <a href={SIGNUP_URL} 
                  className="inline-flex items-center font-medium text-blue-600 hover:underline"
                >
                  <span>Contáctenos</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ResourcesPage; 