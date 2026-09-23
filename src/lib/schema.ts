/**
 * Datos estructurados centralizados para Schema.org
 * Mejora la visualización en los resultados de búsqueda (SERP)
 */

// Esquema de la organización para Knowledge Graph de Google
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://iaeva.com/#organization",
  "name": "IAEVA",
  "url": "https://iaeva.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://iaeva.com/logo/iaeva-logo.png",
    "width": 600,
    "height": 60
  },
  "description": "Asistente virtual inteligente especializado en optimización sanitaria para clínicas y hospitales. Mejora la eficiencia operativa y reduce ausencias de pacientes hasta un 60%.",
  "sameAs": [
    "https://www.linkedin.com/in/kelvinrrivera/"
  ],
  "founder": {
    "@type": "Person",
    "name": "Kelvin Rivera"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+34-649-06-17-30",
    "contactType": "customer service",
    "email": "info@iaeva.com",
    "availableLanguage": ["Spanish", "French"]
  }
};

// Cajas de búsqueda en sitio para búsquedas de marca
export const sitelinksSearchBoxSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://iaeva.com/#website",
  "url": "https://iaeva.com",
  "name": "IAEVA - Asistente Virtual Inteligente para Salud",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://iaeva.com/buscar?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

// FAQ Schema para páginas con preguntas frecuentes
export const createFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// Schema para herramientas/aplicaciones médicas
export const createMedicalAppSchema = (
  name: string, 
  description: string, 
  url: string, 
  imageUrl: string,
  keywords: string[] = []
) => ({
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "@id": `https://iaeva.com${url}#webpage`,
  "url": `https://iaeva.com${url}`,
  "name": name,
  "description": description,
  "image": {
    "@type": "ImageObject",
    "url": `https://iaeva.com${imageUrl}`,
    "width": 1200,
    "height": 630
  },
  "primaryImageOfPage": {
    "@type": "ImageObject", 
    "url": `https://iaeva.com${imageUrl}`
  },
  "specialty": ["Medicina General", "Gestión Sanitaria"],
  "keywords": keywords.join(", "),
  "audience": {
    "@type": "Audience",
    "audienceType": "Profesionales Sanitarios"
  },
  "publisher": {
    "@type": "Organization",
    "@id": "https://iaeva.com/#organization",
    "name": "IAEVA",
    "logo": {
      "@type": "ImageObject",
      "url": "https://iaeva.com/logo/iaeva-logo.png"
    }
  }
});

// Schema para páginas de herramientas/recursos
export const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://iaeva.com/recursos#webpage",
  "url": "https://iaeva.com/recursos",
  "name": "Recursos y Herramientas Médicas Gratuitas | IAEVA",
  "description": "🩺 Accede a recursos gratuitos para profesionales sanitarios: calculadora IMC avanzada, conversión de unidades médicas y más. ¡Optimiza tu trabajo diario!",
  "isPartOf": {
    "@id": "https://iaeva.com/#website"
  },
  "about": {
    "@type": "Thing",
    "name": "Herramientas médicas gratuitas",
    "description": "Colección de herramientas y recursos gratuitos para profesionales del sector salud"
  },
  "publisher": {
    "@id": "https://iaeva.com/#organization"
  }
};

// Generador de breadcrumbs para SEOHead
export const generateBreadcrumbs = (
  paths: Array<{ name: string; url: string }>
) => paths;

// Social profiles para SEOHead
export const socialProfiles = {
  linkedin: "https://www.linkedin.com/in/kelvinrrivera/"
}; 