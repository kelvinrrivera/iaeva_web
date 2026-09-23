import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Globe } from 'lucide-react';
import { LANGUAGES, Language, DEFAULT_LANGUAGE } from '@/i18n/languages';
import { useLanguageRouter } from '@/utils/languageUtils';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'default' | 'mobile';
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  className = '', 
  variant = 'default' 
}) => {
  const { t, i18n } = useTranslation();
  const { changeLanguage } = useLanguageRouter();
  const [isOpen, setIsOpen] = useState(false);
  
  // Ensure default language is set on component mount
  useEffect(() => {
    // If language is not set or doesn't match available languages, set to default
    const currentLang = i18n.language;
    if (!currentLang || !Object.keys(LANGUAGES).includes(currentLang)) {
      changeLanguage(DEFAULT_LANGUAGE);
    }
  }, [i18n, changeLanguage]);
  
  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const handleLanguageChange = (lng: Language) => {
    changeLanguage(lng);
    setIsOpen(false);
  };
  
  // Ensure we always have a valid language, falling back to DEFAULT_LANGUAGE
  const currentLanguage = Object.keys(LANGUAGES).includes(i18n.language) 
    ? i18n.language as Language 
    : DEFAULT_LANGUAGE;
  
  // Mobile variant has different styling
  const isMobile = variant === 'mobile';
  
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={toggleDropdown}
        className={`flex items-center space-x-1 px-3 py-2 rounded-md ${
          isMobile 
            ? "bg-white/10 hover:bg-white/20 text-white" 
            : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600"
        } transition-colors`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={t('language_switcher.language')}
      >
        <Globe size={18} className={isMobile ? "text-white" : "text-gray-600"} />
        <span className="text-sm font-medium">{LANGUAGES[currentLanguage]?.flag}</span>
        <ChevronDown 
          size={16} 
          className={`${isMobile ? "text-white" : "text-gray-500"} transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute ${isMobile ? "left-0 right-0 mx-auto w-48" : "right-0"} mt-2 w-40 bg-white dark:bg-gray-900 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50`}
          >
            <div className="py-1" role="menu" aria-orientation="vertical">
              {Object.entries(LANGUAGES).map(([code, { nativeName, flag }]) => (
                <button
                  key={code}
                  onClick={() => handleLanguageChange(code as Language)}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${currentLanguage === code ? 'bg-gray-100 dark:bg-gray-800 font-medium' : ''}`}
                  role="menuitem"
                >
                  <span>{flag}</span>
                  <span>{nativeName}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher; 