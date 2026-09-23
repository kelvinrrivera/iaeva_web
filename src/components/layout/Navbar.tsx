import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import logo from "/logo/logo.svg";
import LanguageSwitcher from './LanguageSwitcher';
import { TFunction } from 'i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && isMenuOpen) {
        setIsMenuOpen(false);
      }
      if (navRef.current && !navRef.current.contains(event.target as Node) && activeDropdown) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, activeDropdown]);

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const menuVariants = {
    closed: {
      clipPath: "circle(0px at calc(100% - 40px) 40px)",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      clipPath: "circle(2000px at calc(100% - 40px) 40px)",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2
      }
    }
  };

  const staggerMenuItems = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  const menuItemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 }
      }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    pressed: { scale: 0.95 }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, height: 0 },
    visible: {
      opacity: 1,
      y: 0,
      height: 'auto',
      transition: {
        duration: 0.2,
        staggerChildren: 0.05
      }
    }
  };

  const dropdownItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  // Elementos de navegación con sus traducciones
  const navItems = [
    { path: '/', label: t('navbar.home') },
    {
      label: 'Soluciones',
      isDropdown: true,
      children: [
        { path: '/recepcionista-virtual-medica', label: 'Recepcionista Virtual Médica' },
        { path: '/ia-para-clinicas', label: 'IA para Clínicas' },
        { path: '/asistente-ia-fisioterapia', label: 'Asistente IA Fisioterapia' },
        { path: '/dental-clinic-assistant', label: 'Asistente para clínicas dentales' },
        { path: '/physiotherapy-practice-management', label: 'Gestión de fisioterapia' },
        { path: '/ophthalmology-patient-care', label: 'Atención oftalmológica' },
        { path: '/medical-center-efficiency', label: 'Eficiencia en centros médicos' },
        { path: '/patient-management-solutions', label: 'Gestión de pacientes' }
      ]
    },
    {
      label: 'Recursos',
      isDropdown: true,
      children: [
        { path: '/recursos/guia-eficiencia-clinica', label: 'Guía Eficiencia Clínica' }
      ]
    },
    { path: '/calculadora-roi', label: t('navbar.roi_calculator') },
    ...(i18n.language === 'es' || i18n.language.startsWith('es') ? [{ path: '/blog', label: t('navbar.blog') }] : []),
    { path: '/contacto', label: t('navbar.contact') }
  ];

  // Función para verificar si la ruta actual es parte de un dropdown
  const isDropdownActive = (item: any) => {
    const childPaths = item.children?.map((child: any) => child.path) || [];
    return childPaths.includes(location.pathname);
  };

  function getMenuItems(lang: string, t: TFunction<['common', 'navbar']>) {
    // Resources/recursos item removed
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "bg-white/90 backdrop-blur-lg shadow-soft py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2 z-50"
            aria-label="IAEVA"
          >
            <motion.div
              className="text-2xl font-display font-extrabold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img src={logo} alt="IAEVA Logo" className="h-8 w-auto" />
            </motion.div>
          </Link>

          {/* Navegación escritorio */}
          <nav ref={navRef} className="hidden md:flex items-center space-x-1">
            {navItems.map((item, i) => (
              item.isDropdown ? (
                <motion.div
                  key={`dropdown-${item.label}`}
                  className="relative"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <button
                    className={cn(
                      "nav-link flex items-center gap-1 px-3 py-2 font-medium transition-colors",
                      isDropdownActive(item) ? "text-iaeva-purple" : "text-gray-700 hover:text-iaeva-blue"
                    )}
                    onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                    aria-expanded={activeDropdown === item.label}
                  >
                    {item.label}
                    <ChevronDown size={16} className={cn("transition-transform", activeDropdown === item.label && "rotate-180")} />
                    {isDropdownActive(item) && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-iaeva-blue to-iaeva-purple"
                        layoutId="underline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </button>
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg py-2 z-50"
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        {item.children.map((child) => (
                          <motion.div key={child.path} variants={dropdownItemVariants}>
                            <Link
                              to={child.path}
                              className={cn(
                                "block px-4 py-2 text-sm hover:bg-gray-50",
                                location.pathname === child.path ? "text-iaeva-purple font-medium" : "text-gray-700"
                              )}
                            >
                              {child.label}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div key={item.path} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Link
                    to={item.path}
                    className={cn(
                      "nav-link relative px-3 py-2 font-medium transition-colors",
                      location.pathname === item.path
                        ? "text-iaeva-purple"
                        : "text-gray-700 hover:text-iaeva-blue"
                    )}
                  >
                    {item.label}
                    {location.pathname === item.path && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-iaeva-blue to-iaeva-purple"
                        layoutId="underline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.div>
              )
            ))}

            {/* Selector de idioma */}
            <LanguageSwitcher className="ml-2" />
          </nav>

          {/* Botón CTA */}
          <div className="hidden md:block">
            <motion.div
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="pressed"
            >
              <Link
                to="/contacto"
                className="bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white px-6 py-2.5 rounded-full font-medium transition-all hover:shadow-button hover:translate-y-[-2px]"
              >
                {t('navbar.contact_us')}
              </Link>
            </motion.div>
          </div>

          {/* Botón menú móvil con z-index más alto y posición más explícita */}
          <div className="md:hidden z-[100] absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
            <motion.button
              className={`p-2 rounded-full ${isMenuOpen
                ? "bg-white text-iaeva-purple"
                : "bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white"
                } shadow-md`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>


      {/* Menú móvil moderno */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            className="fixed inset-0 md:hidden bg-gradient-to-br from-iaeva-customTeal via-iaeva-purple to-iaeva-blue flex flex-col justify-center items-center z-40"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.div
              className="flex flex-col space-y-4 w-full px-6 py-16"
              variants={staggerMenuItems}
            >
              {/* Items simples del menú móvil */}
              {navItems.map((item) => (
                item.isDropdown ? (
                  <motion.div key={`mobile-dropdown-${item.label}`} variants={menuItemVariants} className="overflow-hidden">
                    <button
                      className="flex items-center justify-between text-white text-2xl font-display font-bold py-4 border-b border-white/20 w-full"
                      onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={24}
                        className={cn(
                          "transition-transform text-white/70",
                          activeDropdown === item.label && "rotate-180"
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          className="pl-4 mt-2 space-y-2"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.children.map((child: any) => (
                            <motion.div
                              key={child.path}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Link
                                to={child.path}
                                className={cn(
                                  "flex items-center justify-between text-white/90 text-xl font-medium py-3 border-b border-white/10",
                                  location.pathname === child.path && "text-yellow-300"
                                )}
                              >
                                <span>{child.label}</span>
                                <ChevronRight size={20} className="text-white/50" />
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div
                    key={item.path}
                    variants={menuItemVariants}
                    whileHover={{ x: 20 }}
                    className="overflow-hidden"
                  >
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center justify-between text-white text-2xl font-display font-bold py-4 border-b border-white/20",
                        location.pathname === item.path && "text-yellow-300"
                      )}
                    >
                      <span>{item.label}</span>
                      <ChevronRight
                        size={24}
                        className={cn(
                          "transition-transform",
                          location.pathname === item.path ? "rotate-90 text-yellow-300" : "text-white/70"
                        )}
                      />
                    </Link>
                  </motion.div>
                )
              ))}
            </motion.div>

            {/* Versión móvil del selector de idioma */}
            <motion.div
              variants={menuItemVariants}
              className="absolute bottom-8 w-full flex justify-center"
            >
              <LanguageSwitcher variant="mobile" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
