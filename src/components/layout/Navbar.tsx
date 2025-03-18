import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import logo from "/logo/logo.svg";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

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
  }, [location.pathname]);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

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
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { path: '/', label: 'Inicio' },
              { path: '/casos-de-uso', label: 'Casos de uso' },
              { path: '/calculadora-roi', label: 'Calculadora de ROI' },
              { path: '/contacto', label: 'Contacto' }
            ].map((item, i) => (
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
            ))}
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
                Contáctanos
              </Link>
            </motion.div>
          </div>
          
          {/* Botón menú móvil con z-index más alto y posición más explícita */}
          <div className="md:hidden z-[100] absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
            <motion.button 
              className={`p-2 rounded-full ${
                isMenuOpen 
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
              {[
                { path: '/', label: 'Inicio' },
                { path: '/casos-de-uso', label: 'Casos de uso' },
                { path: '/calculadora-roi', label: 'Calculadora de ROI' },
                { path: '/contacto', label: 'Contacto' }
              ].map((item) => (
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
              ))}
              
              <motion.div 
                variants={menuItemVariants}
                className="pt-8"
                whileHover={{ scale: 1.05 }}
              >
                <Link 
                  to="/contacto" 
                  className="block w-full bg-white text-iaeva-purple text-center px-6 py-4 rounded-full font-bold text-lg shadow-lg"
                >
                  Contáctanos ahora
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
