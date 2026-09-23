import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import PageLayout from '@/components/layout/PageLayout';
import SEOHead from '@/components/shared/SEOHead';
import BMICalculator from '@/components/tools/calculators/BMICalculator';
import { createMedicalAppSchema, generateBreadcrumbs, socialProfiles } from '@/lib/schema';

const BMIPage = () => {
  const { t } = useTranslation('tools');
  
  // FAQ Schema para calculadora IMC
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": t('bmi.faq.what_is_bmi.q'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('bmi.faq.what_is_bmi.a')
        }
      },
      {
        "@type": "Question",
        "name": t('bmi.faq.how_to_interpret.q'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('bmi.faq.how_to_interpret.a')
        }
      },
      {
        "@type": "Question",
        "name": t('bmi.faq.bf_accuracy.q'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('bmi.faq.bf_accuracy.a')
        }
      },
      {
        "@type": "Question",
        "name": t('bmi.faq.bmi_validity.q'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('bmi.faq.bmi_validity.a')
        }
      }
    ]
  };
  
  // Migas de pan para SEO y navegación
  const breadcrumbs = generateBreadcrumbs([
    { name: "Inicio", url: "/" },
    { name: "Recursos médicos", url: "/recursos" },
    { name: t('bmi.title'), url: "/recursos/calculadora-imc" }
  ]);
  
  // Keywords específicas para calculadora IMC
  const keywordsArray = [
    "calculadora IMC avanzada", 
    "índice de masa corporal", 
    "calcular peso ideal", 
    "grasa corporal estimada", 
    "IMC profesional sanitario", 
    "calculadora peso ideal", 
    "IMC por edad y género", 
    "interpretación IMC médica", 
    "calculadora IMC para médicos", 
    "herramientas médicas gratuitas",
    "rango saludable de peso",
    "obesidad diagnóstico IMC"
  ];
  
  // Schema específico para la aplicación de calculadora IMC
  const appSchema = createMedicalAppSchema(
    t('bmi.title'),
    t('bmi.description'),
    "/recursos/calculadora-imc",
    "/images/tools/bmi-calculator-preview.jpg",
    keywordsArray
  );
  
  // Schema adicional para HowTo (guía paso a paso)
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Cómo calcular tu IMC (Índice de Masa Corporal)",
    "description": "Guía paso a paso para calcular e interpretar tu IMC correctamente",
    "totalTime": "PT2M",
    "tool": {
      "@type": "HowToTool",
      "name": "Calculadora IMC IAEVA"
    },
    "step": [
      {
        "@type": "HowToStep",
        "name": "Ingresar altura",
        "text": "Ingresa tu altura en centímetros o pies/pulgadas según tu preferencia",
        "position": 1
      },
      {
        "@type": "HowToStep",
        "name": "Ingresar peso",
        "text": "Ingresa tu peso en kilogramos o libras según tu preferencia",
        "position": 2
      },
      {
        "@type": "HowToStep",
        "name": "Añadir información opcional",
        "text": "Si lo deseas, añade tu edad y género para obtener resultados más precisos",
        "position": 3
      },
      {
        "@type": "HowToStep",
        "name": "Ver resultados",
        "text": "Interpreta tu IMC, categoría de peso y recomendaciones personalizadas",
        "position": 4
      }
    ]
  };
  
  return <Navigate to="/recursos" replace />;
};

export default BMIPage; 