import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import PageLayout from '@/components/layout/PageLayout';
import SEOHead from '@/components/shared/SEOHead';
import IdealWeightCalculator from '@/components/tools/calculators/IdealWeightCalculator';
import { createMedicalAppSchema, generateBreadcrumbs, socialProfiles } from '@/lib/schema';

const IdealWeightPageFR = () => {
  const { t } = useTranslation('tools');
  
  // FAQ Schema para calculadora de peso ideal
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": t('ideal_weight.faq.what_is_ibw.q'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('ideal_weight.faq.what_is_ibw.a')
        }
      },
      {
        "@type": "Question",
        "name": t('ideal_weight.faq.what_is_abw.q'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('ideal_weight.faq.what_is_abw.a')
        }
      },
      {
        "@type": "Question",
        "name": t('ideal_weight.faq.formula_differences.q'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('ideal_weight.faq.formula_differences.a')
        }
      },
      {
        "@type": "Question",
        "name": t('ideal_weight.faq.frame_size.q'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('ideal_weight.faq.frame_size.a')
        }
      }
    ]
  };
  
  // Migas de pan para SEO y navegación
  const breadcrumbs = generateBreadcrumbs([
    { name: "Accueil", url: "/fr" },
    { name: "Ressources médicales", url: "/fr/ressources" },
    { name: t('ideal_weight.title'), url: "/fr/calculatrice-poids-ideal" }
  ]);
  
  // Keywords específicas para calculadora de peso ideal
  const keywordsArray = [
    "calculateur poids idéal",
    "poids corporel idéal",
    "calculer poids idéal selon taille",
    "poids idéal formules médicales",
    "poids corporel ajusté",
    "formule de Devine",
    "formule de Robinson",
    "formule de Miller",
    "formule de Hamwi",
    "poids idéal pour dosage",
    "poids idéal par genre",
    "calculateur IBW et ABW",
    "poids idéal pour corpulence"
  ];
  
  // Schema específico para la aplicación de calculadora de peso ideal
  const appSchema = createMedicalAppSchema(
    t('ideal_weight.title'),
    t('ideal_weight.description'),
    "/fr/calculatrice-poids-ideal",
    "/images/tools/ideal-weight-calculator-preview.jpg",
    keywordsArray
  );
  
  // Schema adicional para HowTo (guía paso a paso)
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Comment calculer votre poids idéal",
    "description": "Guide étape par étape pour calculer et interpréter correctement votre poids corporel idéal",
    "totalTime": "PT2M",
    "tool": {
      "@type": "HowToTool",
      "name": "Calculateur de Poids Idéal IAEVA"
    },
    "step": [
      {
        "@type": "HowToStep",
        "name": "Sélectionner le genre",
        "text": "Indiquez votre genre car les formules de poids idéal sont différentes pour les hommes et les femmes",
        "position": 1
      },
      {
        "@type": "HowToStep",
        "name": "Indiquer la corpulence",
        "text": "Sélectionnez entre petite, moyenne ou grande selon votre structure osseuse",
        "position": 2
      },
      {
        "@type": "HowToStep",
        "name": "Entrer la taille",
        "text": "Entrez votre taille en centimètres ou en pouces selon votre préférence",
        "position": 3
      },
      {
        "@type": "HowToStep",
        "name": "Entrer le poids actuel (optionnel)",
        "text": "Si vous souhaitez calculer le poids corporel ajusté, entrez votre poids actuel",
        "position": 4
      },
      {
        "@type": "HowToStep",
        "name": "Voir les résultats",
        "text": "Observez les différents résultats selon des formules médicales reconnues",
        "position": 5
      }
    ]
  };
  
  return (
    <PageLayout>
      <SEOHead 
        title={`⚖️ ${t('ideal_weight.title')} | ${t('page_title')} | IAEVA`}
        description={`📊 ${t('ideal_weight.description')} 🔍 Inclut différentes formules médicales selon le genre et la corpulence.`}
        canonicalUrl="/fr/calculatrice-poids-ideal"
        ogImage="/images/tools/ideal-weight-calculator-preview.jpg"
        keywords={keywordsArray.join(", ")}
        structuredData={[appSchema, faqSchema, howToSchema]}
        socialProfiles={socialProfiles}
        breadcrumbs={breadcrumbs}
      />
      
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link to="/fr/ressources" className="inline-flex items-center text-gray-600 hover:text-iaeva-blue transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>{t('back_to_tools')}</span>
            </Link>
          </div>
          
          <div className="mb-12 max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('ideal_weight.title')}</h1>
            <p className="text-gray-600">
              {t('ideal_weight.description')}
            </p>
          </div>
          
          <IdealWeightCalculator />
          
          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">{t('ideal_weight.faq.title')}</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">{t('ideal_weight.faq.what_is_ibw.q')}</h3>
                <p className="text-gray-600">
                  {t('ideal_weight.faq.what_is_ibw.a')}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">{t('ideal_weight.faq.what_is_abw.q')}</h3>
                <p className="text-gray-600">
                  {t('ideal_weight.faq.what_is_abw.a')}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">{t('ideal_weight.faq.formula_differences.q')}</h3>
                <p className="text-gray-600">
                  {t('ideal_weight.faq.formula_differences.a')}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">{t('ideal_weight.faq.frame_size.q')}</h3>
                <p className="text-gray-600">
                  {t('ideal_weight.faq.frame_size.a')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default IdealWeightPageFR; 