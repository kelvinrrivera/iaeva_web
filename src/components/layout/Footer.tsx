import { Link } from 'react-router-dom';
import { SIGNUP_URL } from '@/config/app-urls';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logo from "/logo/logo.svg"; // Vite accede a /public directamente
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const { t, i18n } = useTranslation('home');
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  // Determine which legal pages to link to based on current language
  const getLegalLinks = () => {
    const language = i18n.language;

    if (language.startsWith('fr')) {
      return {
        privacy: '/fr/politique-de-confidentialite',
        terms: '/fr/conditions-utilisation',
        cookies: '/fr/politique-des-cookies'
      };
    } else {
      // Default to Spanish for any other language
      return {
        privacy: '/politica-de-privacidad',
        terms: '/terminos-y-condiciones',
        cookies: '/politica-de-cookies'
      };
    }
  };

  const legalLinks = getLegalLinks();

  return (
    <footer className="bg-iaeva-bg-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="flex items-center space-x-2"
              aria-label="IAEVA"
            >
              <div className="text-2xl font-display font-extrabold pb-4">
                <img src={logo} alt="IAEVA Logo" className="h-8 w-auto" />
              </div>
            </Link>
            <p className="text-gray-300 mb-4">
              {t('footer.description', 'Transformando la atención al cliente en el sector médico con inteligencia artificial humanizada y gestión inteligente de citas.')}
            </p>
            <div className="flex space-x-4">
              {/*<a href="#" className="text-gray-400 hover:text-iaeva-light-blue transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-iaeva-light-blue transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>*/}
              <div className="flex items-center space-x-3">
                <span className="text-gray-400 text-sm hidden sm:inline-block">
                  {t('footer.contact_founder', 'Contactar con el fundador')}
                </span>
                <a href="https://www.linkedin.com/in/kelvinrrivera/" className="text-gray-400 hover:text-iaeva-light-blue transition-colors" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={20} />
                </a>
              </div>
              {/*<a href="#" className="text-gray-400 hover:text-iaeva-light-blue transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>*/}
            </div>
          </div>

          {/* Soluciones */}
          <div className="mb-8">
            <h3 className="text-white text-lg font-semibold mb-4">{t('footer.solutions_title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dental-clinic-assistant" className="text-gray-300 hover:text-iaeva-light-blue transition-colors">
                  {t('footer.links.solutions.dental')}
                </Link>
              </li>
              <li>
                <Link to="/physiotherapy-practice-management" className="text-gray-300 hover:text-iaeva-light-blue transition-colors">
                  {t('footer.links.solutions.physio')}
                </Link>
              </li>
              <li>
                <Link to="/ophthalmology-patient-care" className="text-gray-300 hover:text-iaeva-light-blue transition-colors">
                  {t('footer.links.solutions.ophthalmology')}
                </Link>
              </li>
              <li>
                <Link to="/medical-center-efficiency" className="text-gray-300 hover:text-iaeva-light-blue transition-colors">
                  {t('footer.links.solutions.medical')}
                </Link>
              </li>
              <li>
                <Link to="/patient-management-solutions" className="text-gray-300 hover:text-iaeva-light-blue transition-colors">
                  {t('footer.links.solutions.patient')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Información corporativa y contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.company_title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-iaeva-light-blue transition-colors">
                  {t('footer.links.company.home')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-iaeva-light-blue transition-colors">
                  {t('footer.links.company.blog')}
                </Link>
              </li>
              <li>
                <Link to="/calculadora-roi" className="text-gray-300 hover:text-iaeva-light-blue transition-colors">
                  {t('footer.links.company.calculator')}
                </Link>
              </li>
              <li>
                <a href={SIGNUP_URL} className="text-gray-300 hover:text-iaeva-light-blue transition-colors">
                  {t('footer.links.company.contact')}
                </a>
              </li>
              <li className="mt-4 flex items-center">
                <Mail className="mr-2 text-iaeva-light-blue flex-shrink-0" size={18} />
                <a href="mailto:info@iaeva.com" className="text-gray-300 hover:text-iaeva-light-blue transition-colors">
                  info@iaeva.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              {t('footer.copyright', { year: currentYear })}
            </p>

            {/* Made with love text */}
            <div className="text-gray-400 text-sm my-4 md:my-0 flex items-center justify-center">
              Made with
              <span className="mx-1 inline-block">
                <span className="heart-animation">❤</span>
              </span>
              and AI by
              <a href="https://kelvinscale.net" target="_blank" rel="noopener noreferrer" className="ml-1 hover:text-iaeva-light-blue transition-colors">
                KelvinScale
              </a>
            </div>

            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to={legalLinks.privacy} className="text-gray-400 hover:text-iaeva-light-blue text-sm transition-colors">
                {t('footer.privacy_policy')}
              </Link>
              <Link to={legalLinks.terms} className="text-gray-400 hover:text-iaeva-light-blue text-sm transition-colors">
                {t('footer.terms_of_service')}
              </Link>
              <Link to={legalLinks.cookies} className="text-gray-400 hover:text-iaeva-light-blue text-sm transition-colors">
                {t('footer.cookies', 'Cookies')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CSS para la animación del corazón */}
      <style>
        {`
          @keyframes heartBeat {
            0% {
              transform: scale(1);
              color: #4ade80; /* Verde */
            }
            25% {
              transform: scale(1.2);
            }
            50% {
              transform: scale(1);
              color: #3b82f6; /* Azul */
            }
            75% {
              transform: scale(1.2);
            }
            100% {
              transform: scale(1);
              color: #4ade80; /* Verde */
            }
          }
          
          .heart-animation {
            display: inline-block;
            animation: heartBeat 2s infinite;
            color: #4ade80;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
