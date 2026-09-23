import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Map of URL paths between language versions
const pathLanguageMap = {
  // Spanish (default) paths and their French equivalents
  'dental-clinic-assistant': '/fr/dental-clinic-assistant',
  'physiotherapy-practice-management': '/fr/physiotherapy-practice-management',
  'ophthalmology-patient-care': '/fr/ophthalmology-patient-care',
  'medical-center-efficiency': '/fr/medical-center-efficiency',
  'patient-management-solutions': '/fr/patient-management-solutions',
  'recursos': '/fr/ressources',
  'recursos/calculadora-imc': '/fr/calculatrice-imc',
  'recursos/calculadora-peso-ideal': '/fr/calculatrice-poids-ideal',
  'recursos/conversor-unidades': '/fr/convertisseur-unites',
  'calculadora-roi': '/fr/calculatrice-roi',
  'blog': '/fr/blog',
  'contacto': '/fr/contact',
  'politica-de-privacidad': '/fr/politique-de-confidentialite',
  'terminos-y-condiciones': '/fr/conditions-utilisation',
  'politica-de-cookies': '/fr/politique-des-cookies',

  '': '/fr',

  // French paths and their Spanish equivalents
  'fr/dental-clinic-assistant': '/dental-clinic-assistant',
  'fr/physiotherapy-practice-management': '/physiotherapy-practice-management',
  'fr/ophthalmology-patient-care': '/ophthalmology-patient-care',
  'fr/medical-center-efficiency': '/medical-center-efficiency',
  'fr/patient-management-solutions': '/patient-management-solutions',
  'fr/ressources': '/recursos',
  'fr/calculatrice-imc': '/recursos/calculadora-imc',
  'fr/calculatrice-poids-ideal': '/recursos/calculadora-peso-ideal',
  'fr/convertisseur-unites': '/recursos/conversor-unidades',
  'fr/calculatrice-roi': '/calculadora-roi',
  'fr/blog': '/blog',
  'fr/contact': '/contacto',
  'fr/politique-de-confidentialite': '/politica-de-privacidad',
  'fr/conditions-utilisation': '/terminos-y-condiciones',
  'fr/politique-des-cookies': '/politica-de-cookies',

  'fr': '/',
};

// Mapping for language code to language path prefix
const languagePrefix = {
  'es': '',  // Default language has no prefix
  'fr': '/fr'
};

/**
 * Custom hook to handle language-based routing and redirects
 */
export const useLanguageRouter = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // Translate the current path to the new language's equivalent path
  const translatePath = (path: string, targetLang: string): string => {
    // Remove leading slash for consistent matching
    const normalizedPath = path.startsWith('/') ? path.substring(1) : path;

    // Check if we have a direct mapping for this path
    if (pathLanguageMap[normalizedPath]) {
      return pathLanguageMap[normalizedPath];
    }

    // If we don't have a direct mapping, try to determine the language from the current path
    // and construct a new path for the target language
    const langPrefix = Object.values(languagePrefix);
    let currentLangPrefix = '';
    let pathWithoutLang = normalizedPath;

    for (const prefix of langPrefix) {
      if (prefix && normalizedPath.startsWith(prefix.substring(1))) {
        currentLangPrefix = prefix;
        pathWithoutLang = normalizedPath.substring(prefix.length);
        break;
      }
    }

    // Construct the new path with the target language prefix
    return `${languagePrefix[targetLang as keyof typeof languagePrefix]}/${pathWithoutLang}`;
  };

  // Handle language change and update URL if needed
  const changeLanguage = (lang: string) => {
    if (i18n.language === lang) return;

    const currentPath = location.pathname;
    const newPath = translatePath(currentPath, lang);

    i18n.changeLanguage(lang).then(() => {
      navigate(newPath);
    });
  };

  // Listen for language changes and update URL accordingly
  useEffect(() => {
    const handleLanguageChanged = () => {
      const currentLang = i18n.language.split('-')[0];
      const currentPath = location.pathname;

      // Check if the current URL matches the language
      const expectedPrefix = languagePrefix[currentLang as keyof typeof languagePrefix] || '';
      const pathWithoutLeadingSlash = currentPath.startsWith('/') ? currentPath.substring(1) : currentPath;

      // If French is active but URL doesn't start with '/fr', or
      // If Spanish is active but URL starts with '/fr'
      if ((currentLang === 'fr' && !pathWithoutLeadingSlash.startsWith('fr/')) ||
        (currentLang === 'es' && pathWithoutLeadingSlash.startsWith('fr/'))) {

        // Redirect to the appropriate language version
        const newPath = translatePath(currentPath, currentLang);
        navigate(newPath);
      }
    };

    handleLanguageChanged();

    // Listen for language changes
    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n, location.pathname, navigate]);

  return { changeLanguage };
}; 