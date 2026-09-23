import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import PageLayout from '@/components/layout/PageLayout';
import SEOHead from '@/components/shared/SEOHead';
import UnitConverter from '@/components/tools/calculators/UnitConverter';
import { createMedicalAppSchema, generateBreadcrumbs, socialProfiles } from '@/lib/schema';

const UnitConverterPage = () => {
  const { t } = useTranslation('tools');
  
  // FAQ Schema para conversor de unidades médicas
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": t('unit_converter.faq.accurate.q'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('unit_converter.faq.accurate.a')
        }
      },
      {
        "@type": "Question",
        "name": t('unit_converter.faq.regional.q'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('unit_converter.faq.regional.a')
        }
      },
      {
        "@type": "Question",
        "name": t('unit_converter.faq.reference.q'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('unit_converter.faq.reference.a')
        }
      },
      {
        "@type": "Question",
        "name": t('unit_converter.faq.missing.q'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('unit_converter.faq.missing.a')
        }
      }
    ]
  };
  
  // Migas de pan para SEO y navegación
  const breadcrumbs = generateBreadcrumbs([
    { name: "Inicio", url: "/" },
    { name: "Recursos médicos", url: "/recursos" },
    { name: t('unit_converter.title'), url: "/recursos/conversor-unidades" }
  ]);
  
  // Keywords específicas para conversor de unidades
  const keywordsArray = [
    "conversor unidades médicas", 
    "unidades laboratorio médico", 
    "conversor valores analítica", 
    "conversión mg/dl a mmol/l", 
    "unidades médicas internacionales", 
    "conversor temperatura médica", 
    "conversor presión arterial", 
    "conversor unidades concentración", 
    "herramientas médicas gratuitas",
    "conversor SI a unidades convencionales",
    "valores de referencia laboratorio"
  ];
  
  // Schema específico para la aplicación de conversión de unidades
  const appSchema = createMedicalAppSchema(
    t('unit_converter.title'),
    t('unit_converter.description'),
    "/recursos/conversor-unidades",
    "/images/tools/unit-converter-preview.jpg",
    keywordsArray
  );
  
  return <Navigate to="/recursos" replace />;
};

export default UnitConverterPage; 