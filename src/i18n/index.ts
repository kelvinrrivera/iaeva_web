import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { DEFAULT_LANGUAGE, LANGUAGES } from './languages';

// Importar recursos de traducción
import commonES from './locales/es/common.json';
import contactES from './locales/es/contact.json';
import homeES from './locales/es/home.json';
import useCasesES from './locales/es/use_cases.json';
import roiCalculatorES from './locales/es/roi_calculator.json';
import notFoundES from './locales/es/not_found.json';
import chatES from './locales/es/chat.json';
import blogES from './locales/es/blog.json';
import toolsES from './locales/es/tools.json';
import solutionsES from './locales/es/solutions.json';
import metaES from './locales/es/meta.json';

import commonFR from './locales/fr/common.json';
import contactFR from './locales/fr/contact.json';
import homeFR from './locales/fr/home.json';
import useCasesFR from './locales/fr/use_cases.json';
import roiCalculatorFR from './locales/fr/roi_calculator.json';
import notFoundFR from './locales/fr/not_found.json';
import chatFR from './locales/fr/chat.json';
import blogFR from './locales/fr/blog.json';
import toolsFR from './locales/fr/tools.json';
import solutionsFR from './locales/fr/solutions.json';
import metaFR from './locales/fr/meta.json';

// Configuración y recursos
const resources = {
  es: {
    common: commonES,
    contact: contactES,
    home: homeES,
    use_cases: useCasesES,
    roi_calculator: roiCalculatorES,
    not_found: notFoundES,
    chat: chatES,
    blog: blogES,
    tools: toolsES,
    solutions: solutionsES,
    meta: metaES
  },
  fr: {
    common: commonFR,
    contact: contactFR,
    home: homeFR,
    use_cases: useCasesFR,
    roi_calculator: roiCalculatorFR,
    not_found: notFoundFR,
    chat: chatFR,
    blog: blogFR,
    tools: toolsFR,
    solutions: solutionsFR,
    meta: metaFR
  }
};

// Helper function to check if detected language is supported
const isLanguageSupported = (lng: string) => {
  return Object.keys(LANGUAGES).includes(lng);
};

i18n
  // Detectar idioma del navegador
  .use(LanguageDetector)
  // Pasar instancia de i18n a react-i18next
  .use(initReactI18next)
  // Inicializar i18next
  .init({
    resources,
    lng: DEFAULT_LANGUAGE, // Set default language explicitly
    fallbackLng: DEFAULT_LANGUAGE,
    defaultNS: 'common',
    
    // Si está en desarrollo, muestra las claves faltantes
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // React ya escapa valores
    },
    
    detection: {
      // Orden de detección
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      
      // Nombre del parámetro en la URL
      lookupQuerystring: 'lng',
      
      // Nombre de la cookie
      lookupCookie: 'i18next',
      
      // Nombre en localStorage
      lookupLocalStorage: 'i18nextLng',
      
      // Caché en localStorage
      caches: ['localStorage', 'cookie'],
      
      // Guarda el idioma detectado del navegador en
      // localStorage y cookie para futuras visitas
      cookieExpirationDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 año
      
      // Ensure only supported languages are used
      checkWhitelist: true
    },
    whitelist: Object.keys(LANGUAGES)
  });

// Force default language if detected language is not supported
const detectedLanguage = i18n.language;
if (!isLanguageSupported(detectedLanguage)) {
  i18n.changeLanguage(DEFAULT_LANGUAGE);
}

export default i18n; 