import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface ArticleData {
  publishedTime: string;
  authors: string[];
  tags: string[];
  category?: string;
  modifiedTime?: string;
  section?: string;
  imageUrl?: string;
}

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  type?: string;
  pageName: string;
  schemaType?: 'website' | 'article' | 'blog' | 'product' | 'organization' | 'service' | 'healthAndBeautyBusiness';
  articleData?: ArticleData;
  schema?: Record<string, any>;
}

// Organization data that remains consistent across all pages
const organizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "IAEVA",
  "url": "https://iaeva.com",
  "logo": "https://iaeva.com/logo/logo.png",
  "sameAs": [
    "https://twitter.com/iaeva_health",
    "https://www.linkedin.com/company/iaeva-health",
    "https://www.facebook.com/iaeva.health"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+34-649-061-730",
    "contactType": "customer service",
    "availableLanguage": ["Spanish", "English", "French"]
  }
};

/**
 * Enhanced SEO component that directly manipulates head elements
 * and adds comprehensive structured data for better search engine ranking
 */
const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonical,
  image = '/logo/og-image.png',
  type = 'website',
  pageName,
  schemaType = 'website',
  articleData,
  schema
}) => {
  const { i18n } = useTranslation('common');
  const lang = i18n.language;
  const langPrefix = lang !== 'es' ? `?lng=${lang}` : '';
  const baseUrl = 'https://iaeva.com';
  const pageUrl = `${baseUrl}/${pageName}${langPrefix}`;
  const canonicalUrl = canonical || pageUrl;
  const locale = lang === 'es' ? 'es_ES' : 'fr_FR';
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  useEffect(() => {
    // Set the document title with brand name for better SEO
    const seoTitle = pageName === '' 
      ? title 
      : `${title} | IAEVA - Soluciones de IA para la Salud`;
    document.title = seoTitle;
    
    // Set language
    document.documentElement.lang = lang.substring(0, 2);
    
    // Helper to create or update meta tags
    const setMetaTag = (name: string, content: string, property?: string) => {
      let meta = document.querySelector(`meta[${property ? 'property' : 'name'}="${property || name}"]`) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };
    
    // Helper to create or update link tags
    const setLinkTag = (rel: string, href: string, hrefLang?: string) => {
      let link = null;
      
      if (hrefLang) {
        link = document.querySelector(`link[rel="${rel}"][hrefLang="${hrefLang}"]`) as HTMLLinkElement;
      } else {
        link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      }
      
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        if (hrefLang) {
          link.setAttribute('hrefLang', hrefLang);
        }
        document.head.appendChild(link);
      }
      
      link.setAttribute('href', href);
    };
    
    // Basic meta tags
    setMetaTag('description', description);
    if (keywords) setMetaTag('keywords', keywords);
    setMetaTag('language', lang.substring(0, 2));
    
    // Additional SEO meta tags
    setMetaTag('author', 'IAEVA');
    setMetaTag('robots', 'index, follow');
    setMetaTag('revisit-after', '7 days');
    
    // AI Search Engine specific meta tags
    setMetaTag('ai:description', 'IAEVA ofrece soluciones de IA para optimizar agendas médicas, reducir ausencias y mejorar eficiencia clínica');
    setMetaTag('ai:keywords', keywords || 'IA en salud, optimización agenda médica, asistente virtual médico');
    setMetaTag('ai:structured-data', '/ai-description.json');
    setMetaTag('ai:metadata', '/ai-metadata.yaml');
    setMetaTag('ai:docs', '/README-AI.md');
    
    // Perplexity and AI bot hints
    setMetaTag('perplexity:index', 'true');
    setMetaTag('perplexity:metadata', `/ai-metadata.yaml?v=${new Date().getTime()}`);
    
    // Canonical URL
    setLinkTag('canonical', canonicalUrl);
    
    // Open Graph / Facebook tags
    setMetaTag('og:type', type, 'og:type');
    setMetaTag('og:url', pageUrl, 'og:url');
    setMetaTag('og:title', title, 'og:title');
    setMetaTag('og:description', description, 'og:description');
    setMetaTag('og:image', fullImageUrl, 'og:image');
    setMetaTag('og:image:width', '1200', 'og:image:width');
    setMetaTag('og:image:height', '630', 'og:image:height');
    setMetaTag('og:locale', locale, 'og:locale');
    setMetaTag('og:site_name', 'IAEVA', 'og:site_name');
    
    // Article specific tags
    if (articleData) {
      setMetaTag('article:published_time', articleData.publishedTime, 'article:published_time');
      if (articleData.modifiedTime) {
        setMetaTag('article:modified_time', articleData.modifiedTime, 'article:modified_time');
      }
      if (articleData.section) {
        setMetaTag('article:section', articleData.section, 'article:section');
      }
      
      // Remove old article:author tags
      document.querySelectorAll('meta[property="article:author"]').forEach(element => {
        element.remove();
      });
      
      // Add new article:author tags
      articleData.authors.forEach(author => {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'article:author');
        meta.setAttribute('content', author);
        document.head.appendChild(meta);
      });
      
      // Remove old article:tag tags
      document.querySelectorAll('meta[property="article:tag"]').forEach(element => {
        element.remove();
      });
      
      // Add new article:tag tags
      articleData.tags.forEach(tag => {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'article:tag');
        meta.setAttribute('content', tag);
        document.head.appendChild(meta);
      });
    }
    
    // Twitter tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:site', '@iaeva_health');
    setMetaTag('twitter:creator', '@iaeva_health');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', fullImageUrl);
    setMetaTag('twitter:url', pageUrl);
    
    // Remove old alternate language links
    document.querySelectorAll('link[rel="alternate"][hrefLang]').forEach(element => {
      element.remove();
    });
    
    // Add alternate language links
    Object.keys(i18n.services.resourceStore.data)
      .filter(lng => lng !== lang)
      .forEach(lng => {
        setLinkTag('alternate', `${baseUrl}/${pageName}${lng !== 'es' ? `?lng=${lng}` : ''}`, lng);
      });
    
    setLinkTag('alternate', `${baseUrl}/${pageName}`, 'x-default');
    
    // Schema.org markup
    let schemaData = schema;
    
    // If it's an article and we have articleData, create ArticleSchema
    if (schemaType === 'article' && articleData) {
      schemaData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "image": articleData.imageUrl || fullImageUrl,
        "datePublished": articleData.publishedTime,
        "dateModified": articleData.modifiedTime || articleData.publishedTime,
        "author": articleData.authors.map(author => ({
          "@type": "Person",
          "name": author
        })),
        "publisher": organizationData,
        "url": pageUrl,
        "inLanguage": lang,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": pageUrl
        },
        "keywords": articleData.tags.join(', ')
      };
    } else if (!schemaData) {
      // Default schema if none provided
      schemaData = {
        "@context": "https://schema.org",
        "@type": schemaType,
        "name": title,
        "description": description,
        "url": pageUrl,
        "image": fullImageUrl,
        "inLanguage": lang
      };
    }
    
    // Always add the organization schema
    const scripts = [
      { type: "application/ld+json", content: JSON.stringify(schemaData) },
      { type: "application/ld+json", content: JSON.stringify(organizationData) }
    ];
    
    // Remove old script tags
    document.querySelectorAll('script[type="application/ld+json"]').forEach(element => {
      element.remove();
    });
    
    // Add new script tags
    scripts.forEach(scriptData => {
      const script = document.createElement('script');
      script.setAttribute('type', scriptData.type);
      script.textContent = scriptData.content;
      document.head.appendChild(script);
    });
    
    // Cleanup function to remove all added elements when component unmounts
    return () => {
      // Optionally remove all tags added by this component
      // In practice, they'll be overwritten by the next page
    };
  }, [
    title, description, keywords, canonical, image, type, 
    pageName, schemaType, articleData, schema, lang, 
    langPrefix, baseUrl, pageUrl, canonicalUrl, locale, i18n, fullImageUrl
  ]);
  
  // This component doesn't render anything visible
  return null;
};

export default SEO; 