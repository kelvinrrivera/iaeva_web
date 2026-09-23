import { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Download, FileText, Shield, CheckCircle, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const GuidePromotion = () => {
  const { t, i18n } = useTranslation(['common']);
  const location = useLocation();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Determinar si estamos en la versión francesa
  const isFrench = i18n.language === 'fr' || location.pathname.includes('/fr/');

  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const benefitPoints = !isFrench ? [
    {
      icon: <Shield className="w-5 h-5 text-iaeva-blue" />,
      text: "Seguridad de datos y cumplimiento RGPD/LOPD"
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-iaeva-blue" />,
      text: "Tecnología para evitar 'alucinaciones' de la IA"
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-iaeva-blue" />,
      text: "Integración omnicanal con WhatsApp oficial"
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-iaeva-blue" />,
      text: "Optimización de gestión de citas y recordatorios"
    }
  ] : [
    {
      icon: <Shield className="w-5 h-5 text-iaeva-blue" />,
      text: "Sécurité des données et conformité RGPD"
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-iaeva-blue" />,
      text: "Technologie pour éviter les 'hallucinations' de l'IA"
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-iaeva-blue" />,
      text: "Intégration omnicanale avec WhatsApp officiel"
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-iaeva-blue" />,
      text: "Optimisation de la gestion des rendez-vous et rappels"
    }
  ];

  const guidePath = "/recursos/guia-eficiencia-clinica";
  const guideTitle = isFrench
    ? "Le guide définitif pour choisir votre assistant IA en santé"
    : "La guía definitiva para elegir tu asistente IA en salud";

  const guideDescription = isFrench
    ? "Tout ce que vous devez savoir pour implémenter avec succès l'intelligence artificielle dans votre clinique ou centre médical. Protection des données de vos patients et optimisation de l'efficacité."
    : "Todo lo que necesitas saber para implementar con éxito la inteligencia artificial en tu clínica o centro médico. Protegiendo los datos de tus pacientes y optimizando la eficiencia.";

  const guideBadgeText = isFrench ? "Guide stratégique" : "Guía estratégica";
  const downloadButtonText = isFrench ? "Lire le guide stratégique" : "Leer guía estratégica";
  const imageAltText = isFrench
    ? "Professionnel médical intégrant un assistant IA dans sa clinique"
    : "Profesional médico integrando un asistente IA en su clínica";



  return (
    <section ref={ref} className="py-20 bg-iaeva-blue/5 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-iaeva-purple/10 to-transparent opacity-60 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-iaeva-blue/10 to-transparent opacity-60 blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex flex-col lg:flex-row items-center gap-12"
        >
          {/* Contenido izquierdo */}
          <motion.div variants={itemVariants} className="lg:w-1/2 space-y-6">
            <motion.div variants={itemVariants} className="inline-flex items-center px-4 py-1.5 rounded-full bg-iaeva-purple/10 border border-iaeva-purple/30 text-iaeva-purple font-medium text-sm">
              <FileText className="w-4 h-4 mr-2" />
              {guideBadgeText}
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-display font-bold leading-tight text-gray-900">
              {guideTitle}
            </motion.h2>

            <motion.p variants={itemVariants} className="text-lg text-gray-600 leading-relaxed">
              {guideDescription}
            </motion.p>

            <motion.ul variants={itemVariants} className="space-y-3 mt-4">
              {benefitPoints.map((point, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-center gap-3"
                >
                  {point.icon}
                  <span className="text-gray-700">{point.text}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={itemVariants} className="pt-4">
              <Link
                to={guidePath}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white px-8 py-3.5 rounded-full font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
              >
                <BookOpen className="w-5 h-5" />
                {downloadButtonText}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </motion.div>


          </motion.div>

          {/* Imagen ilustrativa a la derecha */}
          <motion.div variants={itemVariants} className="lg:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-iaeva-blue/20 to-iaeva-purple/20 rounded-2xl blur-xl transform rotate-3"></div>
              <img
                src="/guide/doctor-integration-ai-chatbot.webp"
                alt={imageAltText}
                className="relative rounded-2xl shadow-2xl w-full border border-white/20 transform transition-transform hover:scale-[1.02] duration-500"
              />

              {/* Badge flotante */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 hidden md:block animate-float">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{isFrench ? "Lecture gratuite" : "Lectura gratuita"}</p>
                    <p className="text-xs text-gray-500">{isFrench ? "Accès immédiat" : "Acceso inmediato"}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default GuidePromotion; 