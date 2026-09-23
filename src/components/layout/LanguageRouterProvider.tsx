import { ReactNode } from 'react';
import { useLanguageRouter } from '@/utils/languageUtils';

interface LanguageRouterProviderProps {
  children: ReactNode;
}

/**
 * Provider component that handles language changes and automatically redirects
 * to the appropriate language-specific path when necessary.
 */
const LanguageRouterProvider: React.FC<LanguageRouterProviderProps> = ({ children }) => {
  // Initialize the language router hook to set up language change listeners
  useLanguageRouter();
  
  // Just render children - the hook handles all the language change logic
  return <>{children}</>;
};

export default LanguageRouterProvider; 