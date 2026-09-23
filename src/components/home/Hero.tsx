import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

import CTAButton from '@/components/shared/CTAButton';


const Hero = () => {
  const { t, i18n } = useTranslation('home');
  const [loading, setLoading] = useState(true);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: heroRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Determinar el archivo de subtítulos según el idioma actual
  const captionsFile = i18n.language === 'fr'
    ? "/video/iaeva-captions-fr.vtt"
    : "/video/iaeva-captions-es.vtt";

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

  // Efecto inicial para la precarga y timeout de fallback
  useEffect(() => {
    // Establecer un tiempo máximo de espera para la carga inicial
    const timeout = setTimeout(() => {
      if (loading) {
        console.warn('Tiempo de espera para la carga del video excedido, mostrando imagen de fallback');
        setLoading(false);
        setVideoFailed(true);
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [loading]);

  // Efecto para aplicar estilos CSS a los subtítulos
  useEffect(() => {
    // Añadir estilos CSS para los subtítulos
    const style = document.createElement('style');
    style.id = 'video-captions-style';
    style.innerHTML = `
      video::cue {
        background-color: rgb(7 150 105, 0.5);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 16px;
        line-height: 1.5;
      }
      
      /* Aplicar margen a los subtítulos para alejarlos del borde inferior */
      video::-webkit-media-text-track-container {
        margin-bottom: 24px !important;
        padding: 0 16px;
      }
      
      /* Estilos específicos para diferentes navegadores */
      video::-webkit-media-text-track-display {
        padding: 4px 8px;
        background-color: rgb(7 150 105, 0.5);
        border-radius: 4px;
      }
      
      /* Firefox */
      @supports (-moz-appearance: none) {
        video::cue {
          background-color: rgb(7 150 105, 0.5);
          padding: 4px 8px;
          margin-bottom: 24px;
        }
      }
    `;

    document.head.appendChild(style);

    // Limpiar el estilo cuando se desmonte el componente
    return () => {
      const existingStyle = document.getElementById('video-captions-style');
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);

  // Efecto para controlar la reproducción del video cuando esté visible
  useEffect(() => {
    if (!videoRef.current || videoFailed) return;

    const videoElement = videoRef.current;

    // Configurar event listeners para el video
    const handleLoadedData = () => {
      console.log('Video cargado correctamente');
      setLoading(false);
    };

    const handleError = (e) => {
      console.error('Error al cargar/reproducir el video:', e);
      setVideoFailed(true);
      setLoading(false);
    };

    const handleEnded = () => {
      // Si el video termina, asegurarnos de que se reinicie
      // (aunque con loop=true no debería ser necesario)
      console.log('Video terminado, reiniciando...');
      videoElement.play().catch(err => {
        console.error('Error al reiniciar video:', err);
      });
    };

    // Configurar los event listeners
    videoElement.addEventListener('loadeddata', handleLoadedData);
    videoElement.addEventListener('error', handleError);
    videoElement.addEventListener('ended', handleEnded);

    // Intentar reproducir el video si está en vista
    if (inView) {
      videoElement.play().catch(error => {
        console.error('Error al reproducir el video automáticamente:', error);
        setVideoFailed(true);
        setLoading(false);
      });
    }

    // Limpiar event listeners cuando se desmonte el componente
    return () => {
      videoElement.removeEventListener('loadeddata', handleLoadedData);
      videoElement.removeEventListener('error', handleError);
      videoElement.removeEventListener('ended', handleEnded);
    };
  }, [inView, videoFailed]);

  // Efecto para actualizar el archivo de subtítulos cuando cambia el idioma
  useEffect(() => {
    if (!videoRef.current || videoFailed) return;

    // Obtener la pista de texto actual y actualizarla
    const tracks = videoRef.current.textTracks;
    if (tracks.length > 0) {
      const track = tracks[0];
      // Desactivar la pista actual
      track.mode = 'hidden';
    }

    // Eliminar todas las pistas existentes
    while (videoRef.current.firstChild) {
      videoRef.current.removeChild(videoRef.current.firstChild);
    }

    // Crear una nueva pista con el idioma correcto
    const newTrack = document.createElement('track');
    newTrack.kind = 'captions';
    newTrack.src = captionsFile;
    newTrack.srclang = i18n.language;
    newTrack.label = i18n.language === 'fr' ? 'Français' : 'Español';
    newTrack.default = true;

    // Añadir la nueva pista al video
    videoRef.current.appendChild(newTrack);

    // Activar la nueva pista
    setTimeout(() => {
      if (tracks.length > 0) {
        const newTrackElement = tracks[0];
        newTrackElement.mode = 'showing';
      }
    }, 100);
  }, [i18n.language, captionsFile, videoFailed]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen pt-16 pb-16 md:pt-28 md:pb-24 overflow-hidden"
      aria-labelledby="hero-heading"
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
            className="flex flex-col lg:flex-row items-center justify-between gap-12 mt-[3%]"
          >
            {/* Contenido izquierdo */}
            <motion.div
              variants={itemVariants}
              className="w-full lg:w-1/2 space-y-8"
            >
              <motion.h1
                id="hero-heading"
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight"
              >
                <span className="relative">
                  <span className="animated-gradient-text">{t('hero.title')}</span>
                  <motion.svg
                    viewBox="0 0 200 20"
                    className="absolute -bottom-2 left-0 w-full h-2 text-iaeva-purple/30"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    aria-hidden="true"
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
                className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed mt-[9%]"
              >
                {t('hero.description')}
              </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-sm md:text-base text-gray-500 max-w-xl italic border-l-4 border-iaeva-teal/30 pl-4 py-1"
            >
              {t('hero.trust_line')}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
                <CTAButton
                  text={t('hero.cta_primary')}
                  path="/contacto"
                  variant="primary"
                  dataTestId="hero-cta-primary"
                  isCalendarButton={true}
                />
                <CTAButton
                  className="px-6 py-3 rounded-full font-medium transition-all duration-300 inline-flex items-center border border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-full text-cyan-600 text-dark"
                  text={t('hero.cta_secondary')}
                  path="/recursos/guia-eficiencia-clinica"
                  variant="outline"
                  dataTestId="hero-cta-secondary"
                />
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

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full aspect-[4/3] md:aspect-[5/3] max-h-[450px] bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded-3xl"
                  aria-label="Cargando video"
                />
              )}

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full h-full max-h-[450px] overflow-hidden rounded-3xl"
              >
                <div className="w-full flex justify-center lg:justify-end">
                  <div className="relative w-full">
                    {/*<img ... />*/}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1.2 }}
                      className="rounded-3xl overflow-hidden shadow-2xl"
                    >
                      {/* Aplicar estilos al contenedor del video para los subtítulos */}
                      <div className="relative">
                        {!videoFailed ? (
                          <video
                            ref={videoRef}
                            src="/video/iaeva-en-accion.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-auto object-cover rounded-3xl transition-all duration-300 hover:scale-[1.02] video-with-captions"
                            width="450"
                            height="338"
                            aria-label="Demostración de IAEVA"
                          >
                            <track
                              kind="captions"
                              src={captionsFile}
                              srcLang={i18n.language}
                              label={i18n.language === 'fr' ? 'Français' : 'Español'}
                              default
                            />
                            Tu navegador no soporta la reproducción de videos.
                          </video>
                        ) : (
                          <img
                            src="/images/iaeva-assistant-front.webp"
                            alt="IAEVA Assistant"
                            className="w-full h-auto object-cover rounded-3xl transition-all duration-300 hover:scale-[1.02]"
                            width="450"
                            height="338"
                            fetchPriority="high"
                            loading="eager"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 pointer-events-none" aria-hidden="true"></div>
                      </div>

                      <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl" aria-hidden="true"></div>
                    </motion.div>

                    <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl" aria-hidden="true"></div>
                  </div>
                </div>
              </motion.div>

              {/* Tarjeta flotante */}
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
                    <p className="text-sm font-medium text-gray-700">{t('hero.attention')}</p>
                    <p className="text-xs text-gray-500">{t('hero.attention_subtitle')}</p>
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
        aria-hidden="true"
      >
        <div className="flex flex-col items-center">
          {/*<span className="text-sm text-gray-500 mb-2">Descubre más</span>*/}
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