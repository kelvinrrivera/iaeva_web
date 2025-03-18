import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import CTAButton from '@/components/shared/CTAButton';

const Hero = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const { ref: heroRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  };

  useEffect(() => {
    const heroImage = new Image();
    heroImage.src = "/images/iaeva-assistant.webp";
    heroImage.onload = () => setImagesLoaded(true);
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden"
    >
      {/* Elementos de fondo animados */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-iaeva-purple/20 to-transparent opacity-30 blur-3xl transform rotate-12 animate-pulse-soft"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-iaeva-blue/20 to-transparent opacity-30 blur-3xl transform -rotate-12 animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.05 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 bg-noise-pattern"
        ></motion.div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col lg:flex-row items-center justify-between gap-12"
        >
          {/* Contenido izquierdo */}
          <motion.div 
            variants={itemVariants}
            className="w-full lg:w-1/2 space-y-6"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-iaeva-blue/10 to-iaeva-purple/10 text-iaeva-blue font-medium text-sm mb-2 border border-iaeva-blue/20"
            >
              Revolucionando la atención médica
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight"
            >
               Asistente virtual 
              <br />
              <span className="relative">
              IA para <span className="animated-gradient-text">gestión de citas médicas </span>y atención al paciente            
                <motion.svg
                  viewBox="0 0 200 20"
                  className="absolute -bottom-2 left-0 w-full h-2 text-iaeva-purple/30"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                >
                  <motion.path
                    d="M 0 10 Q 50 0 100 10 Q 150 20 200 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </motion.svg>
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed"
            >
              IAEVA automatiza la gestión de citas médicas, reduce ausencias en un 60% y optimiza la comunicación con pacientes vía WhatsApp y web para que tu equipo se enfoque en lo que realmente importa: el cuidado del paciente.
            </motion.p>

            <motion.ul 
              variants={itemVariants}
              className="space-y-3"
            >
              {[].map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-center space-x-2 text-gray-600"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { delay: index * 0.2 }
                    }
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-iaeva-blue to-iaeva-purple"></span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
                <CTAButton 
                  text="Solicitar demo gratis" 
                  path="/contacto" 
                  variant="primary" 
                  dataTestId="hero-cta-primary"
                />
                {/*<CTAButton 
                  text="Ver casos de éxito" 
                  path="/casos-de-uso" 
                  variant="outline" 
                  dataTestId="hero-cta-secondary"
                />*/}
              </div>
            </motion.div>
          </motion.div>
          
          {/* Imagen derecha */}
          <motion.div 
            variants={itemVariants}
            className="w-full lg:w-1/2"
          >
            <div className="relative h-full">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute inset-0 bg-gradient-radial from-iaeva-blue/10 to-transparent rounded-3xl"
              ></motion.div>

              {!imagesLoaded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full aspect-[4/3] md:aspect-[5/3] max-h-[450px] bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded-3xl"
                />
              )}

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full h-full max-h-[450px] overflow-hidden rounded-3xl"
              >
                <img 
                  //src="https://kelvinscale.net/wp-content/uploads/2025/01/mixto-image-ks-header.svg"
                  src="/images/iaeva-assistant.webp" 
                  alt="IAEVA atención al cliente con IA" 
                  className={`w-full h-auto max-h-[450px] object-contain rounded-3xl shadow-soft z-10 transition-all duration-300 ${!imagesLoaded ? 'hidden' : 'hover:scale-102'}`}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
              </motion.div>
              
              {/* Tarjetas flotantes */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -bottom-6 -left-6 lg:-left-20 p-4 glass-panel animate-float"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-iaeva-blue to-iaeva-purple flex items-center justify-center">
                    <span className="text-white font-bold">97%</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Satisfacción</p>
                    <p className="text-xs text-gray-500">de pacientes</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="absolute top-10 -right-6 lg:-right-10 p-4 glass-panel animate-float"
                style={{ animationDelay: '1s' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-iaeva-teal to-iaeva-blue flex items-center justify-center">
                    <span className="text-white font-bold">24/7</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Atención</p>
                    <p className="text-xs text-gray-500">continua</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Nueva tarjeta flotante multilingüe */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="absolute -bottom-4 -right-6 lg:-right-12 p-4 glass-panel animate-float"
                style={{ animationDelay: '1.5s' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-iaeva-purple to-iaeva-teal flex items-center justify-center">
                    <Globe size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Multilingüe</p>
                    <p className="text-xs text-gray-500">+20 idiomas</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 mb-2">Descubre más</span>
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-6 h-10 border-2 border-iaeva-blue/30 rounded-full p-1"
          >
            <motion.div
              animate={{
                y: [0, 16, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-2 h-2 bg-iaeva-blue rounded-full mx-auto"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;