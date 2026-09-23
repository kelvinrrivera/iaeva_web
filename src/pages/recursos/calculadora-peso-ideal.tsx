import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import PageLayout from '@/components/layout/PageLayout';
import SEOHead from '@/components/shared/SEOHead';
import IdealWeightCalculator from '@/components/tools/calculators/IdealWeightCalculator';
import { createMedicalAppSchema, generateBreadcrumbs, socialProfiles } from '@/lib/schema';

const IdealWeightPage = () => {
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
    { name: "Inicio", url: "/" },
    { name: "Recursos médicos", url: "/recursos" },
    { name: t('ideal_weight.title'), url: "/recursos/calculadora-peso-ideal" }
  ]);
  
  // Keywords específicas para calculadora de peso ideal
  const keywordsArray = [
    "calculadora peso ideal",
    "peso corporal ideal",
    "calcular peso ideal según altura",
    "peso ideal fórmulas médicas",
    "peso corporal ajustado",
    "fórmula de Devine",
    "fórmula de Robinson",
    "fórmula de Miller",
    "fórmula de Hamwi",
    "peso ideal para dosificación",
    "peso ideal por género",
    "calculadora IBW y ABW",
    "peso ideal para estructura corporal"
  ];
  
  // Schema específico para la aplicación de calculadora de peso ideal
  const appSchema = createMedicalAppSchema(
    t('ideal_weight.title'),
    t('ideal_weight.description'),
    "/recursos/calculadora-peso-ideal",
    "/images/tools/ideal-weight-calculator-preview.jpg",
    keywordsArray
  );
  
  // Schema adicional para HowTo (guía paso a paso)
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Cómo calcular tu peso ideal",
    "description": "Guía paso a paso para calcular e interpretar tu peso corporal ideal correctamente",
    "totalTime": "PT2M",
    "tool": {
      "@type": "HowToTool",
      "name": "Calculadora de Peso Ideal IAEVA"
    },
    "step": [
      {
        "@type": "HowToStep",
        "name": "Seleccionar género",
        "text": "Indica tu género ya que las fórmulas de peso ideal son diferentes para hombres y mujeres",
        "position": 1
      },
      {
        "@type": "HowToStep",
        "name": "Indicar estructura corporal",
        "text": "Selecciona entre pequeña, mediana o grande según tu estructura ósea",
        "position": 2
      },
      {
        "@type": "HowToStep",
        "name": "Ingresar altura",
        "text": "Ingresa tu altura en centímetros o pulgadas según tu preferencia",
        "position": 3
      },
      {
        "@type": "HowToStep",
        "name": "Ingresar peso actual (opcional)",
        "text": "Si deseas calcular el peso corporal ajustado, ingresa tu peso actual",
        "position": 4
      },
      {
        "@type": "HowToStep",
        "name": "Ver resultados",
        "text": "Observa los diferentes resultados según fórmulas médicas reconocidas",
        "position": 5
      }
    ]
  };
  
  return <Navigate to="/recursos" replace />;
};

export default IdealWeightPage; 