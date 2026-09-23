import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  noIndex?: boolean;
  keywords?: string;
  structuredData?: Record<string, any>[];
  socialProfiles?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    pinterest?: string;
  };
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
  hreflang?: Array<{
    lang: string;
    url: string;
  }>;
}

/**
 * Componente para gestionar los metadatos SEO de cada página
 * Versión mejorada con soporte para rich snippets
 */
const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalUrl,
  ogImage = '/images/iaeva-og-image.jpg',
  noIndex = false,
  keywords,
  structuredData,
  socialProfiles,
  breadcrumbs,
  hreflang
}) => {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'es';

  // Construir la URL canónica completa
  const siteUrl = 'https://iaeva.com';
  const canonical = canonicalUrl ? `${siteUrl}${canonicalUrl}` : undefined;

  // Generar JSON-LD para migas de pan si están definidas
  const breadcrumbsStructuredData = breadcrumbs && breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `${siteUrl}${crumb.url}`
    }))
  } : null;

  // Combinar todos los datos estructurados
  const allStructuredData = [
    ...(structuredData || []),
    ...(breadcrumbsStructuredData ? [breadcrumbsStructuredData] : [])
  ];

  return (
    <Helmet>
      {/* Metadatos básicos */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="language" content={lang} />

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Hreflang tags for internationalization */}
      {/* Hreflang tags for internationalization */}
      {hreflang && hreflang.map((item) => (
        <link
          key={item.lang}
          rel="alternate"
          hrefLang={item.lang}
          href={`${siteUrl}${item.url}`}
        />
      ))}

      {/* x-default hreflang - pointing to Spanish version as default */}
      {hreflang && hreflang.find(h => h.lang === 'es') && (
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${siteUrl}${hreflang.find(h => h.lang === 'es')?.url}`}
        />
      )}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`} />
      <meta property="og:locale" content={lang === 'es' ? 'es_ES' : 'fr_FR'} />
      <meta property="og:site_name" content="IAEVA" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`} />

      {/* Social Profiles */}
      {socialProfiles?.linkedin && <meta property="og:see_also" content={socialProfiles.linkedin} />}

      {/* No indexación si es necesario */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Structured Data / Schema.org */}
      {allStructuredData.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead; 