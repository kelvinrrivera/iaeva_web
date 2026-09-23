import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calculator, Ruler, Award, Clock, Activity, FileText, AlertTriangle, Wrench, ArrowRightIcon, Scale } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import PageLayout from '@/components/layout/PageLayout';
import SEOHead from '@/components/shared/SEOHead';
import CTAButton from '@/components/shared/CTAButton';
import { collectionPageSchema, generateBreadcrumbs, socialProfiles } from '@/lib/schema';

interface ToolCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  path: string;
  comingSoon?: boolean;
  toolComingSoonText: string;
  toolAccessText: string;
}

const ToolCard = ({ icon, title, description, path, comingSoon = false, toolComingSoonText, toolAccessText }: ToolCardProps) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-iaeva-blue to-iaeva-purple flex items-center justify-center mb-4">
          <div className="text-white">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        {comingSoon ? (
          <div className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
            {toolComingSoonText}
          </div>
        ) : (
          <Link 
            to={path}
            className="inline-flex items-center gap-1 text-iaeva-blue font-medium hover:underline"
          >
            {toolAccessText}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </motion.div>
  );
};

const RessourcesPage = () => {
  const { t, i18n } = useTranslation(['tools', 'common']);
  const [emailSubscribe, setEmailSubscribe] = useState('');

  // FAQ structuré pour améliorer la visibilité dans les recherches
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Tous les outils médicaux d'IAEVA sont-ils gratuits?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, tous les outils disponibles dans la section ressources sont complètement gratuits et conçus pour aider les professionnels de santé dans leur travail quotidien."
        }
      },
      {
        "@type": "Question",
        "name": "Quelle est la précision des outils de calcul?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nos outils utilisent des formules et des standards médicaux internationalement reconnus. La calculatrice d'IMC et le convertisseur d'unités médicales appliquent les formules les plus récentes acceptées par des organisations comme l'OMS."
        }
      },
      {
        "@type": "Question",
        "name": "Quand les prochains outils seront-ils disponibles?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nous travaillons continuellement pour élargir notre collection. Abonnez-vous à notre newsletter pour recevoir des notifications lorsque nous lançons le générateur de régimes, le simulateur d'interactions médicamenteuses et d'autres outils."
        }
      }
    ]
  };

  // Fil d'Ariane pour le SEO et la navigation
  const breadcrumbs = generateBreadcrumbs([
    { name: "Accueil", url: "/fr" },
    { name: "Ressources médicales", url: "/fr/ressources" }
  ]);

  return (
    <PageLayout>
      <SEOHead 
        title="🧰 Ressources médicales gratuites | Outils pour professionnels de santé | IAEVA"
        description="🩺 Accédez à des ressources gratuites pour les professionnels de la santé: calculateur d'IMC avancé, conversion d'unités médicales, générateur de régimes et plus d'outils. Optimisez votre travail clinique quotidien!"
        canonicalUrl="/fr/ressources"
        ogImage="/images/recursos-medicos-og.jpg"
        keywords="outils médicaux gratuits, ressources pour médecins, calculateur IMC avancé, convertisseur unités médicales, outils pour professionnels de santé, calculatrices cliniques, ressources sanitaires en ligne, IAEVA outils de santé, logiciel médical gratuit, applications médicales web"
        structuredData={[collectionPageSchema, faqSchema]}
        socialProfiles={socialProfiles}
        breadcrumbs={breadcrumbs}
        noIndex={true}
      />

      {/* En-tête de la page */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-white via-blue-100 to-green-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-white/10 p-2 inline-block rounded-full mb-4">
              <Wrench className="h-6 w-6 text-gray-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-600">Page en maintenance</h1>
            <p className="text-xl text-gray-600 mb-8">
              Nous travaillons actuellement à l'amélioration de nos outils médicaux. Nous nous excusons pour la gêne occasionnée.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Revenez bientôt pour accéder à nos calculatrices et ressources pour les professionnels de la santé.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <CTAButton
                className="px-4 py-2 rounded-full text-sm font-medium flex items-center transition-all bg-gradient-to-r bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white shadow-md" 
                text={t('tools.cta_contact')} 
                path="/fr/contact" 
                variant="outline"
                dataTestId="tools-contact-cta"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section d'avantages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Besoin d'outils personnalisés pour votre établissement de santé?</h3>
                  <p className="text-gray-600">Nous proposons des solutions sur mesure pour les cliniques et les hôpitaux. Des calculatrices spécifiques aux systèmes complets de gestion des patients avec IA.</p>
                  <Link 
                    to="/fr/contact" 
                    className="inline-flex items-center mt-4 font-medium text-blue-600 hover:underline"
                  >
                    <span>Contactez-nous</span>
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default RessourcesPage; 