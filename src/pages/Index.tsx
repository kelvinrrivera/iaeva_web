import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import HowItWorks from '@/components/home/HowItWorks';
import ImplementationPlan from '@/components/home/ImplementationPlan';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';
import IAEVAWhatsApp from '@/components/home/IAEVAWhatsApp';
import CustomerServiceHub from '@/components/home/CustomerServiceHub';
import VapiVoice from '@/components/home/VapiVoice';
import FAQ from '@/components/home/FAQ';
import TrustBadges from '@/components/home/TrustBadges';
import GuidePromotion from '@/components/home/GuidePromotion';
import SafetySection from '@/components/home/SafetySection';
import SEOHead from '@/components/shared/SEOHead';
import { organizationSchema, sitelinksSearchBoxSchema, socialProfiles } from '@/lib/schema';
import PageLayout from '@/components/layout/PageLayout';

const Index = () => {
  const { t, i18n } = useTranslation(['home', 'common']);

  // Efecto para forzar el scroll al inicio cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0);

    // Prevenir el scroll automático al cargar la página
    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  const currentYear = new Date().getFullYear();

  // FAQ data para rich snippets
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": t('faq.question1'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('faq.answer1')
        }
      },
      {
        "@type": "Question",
        "name": t('faq.question2'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('faq.answer2')
        }
      },
      {
        "@type": "Question",
        "name": t('faq.question3'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('faq.answer3')
        }
      },
      {
        "@type": "Question",
        "name": t('faq.question4'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('faq.answer4')
        }
      },
      {
        "@type": "Question",
        "name": t('faq.question5'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('faq.answer5')
        }
      }
    ]
  };

  // Schema.org for Rich Snippets
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "IAEVA",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web, iOS, Android",
    "description": t('meta.description'),
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "127"
    },
    "featureList": "Reducción de ausencias médicas hasta un 60%, Gestión inteligente de citas, Comunicación multicanal (WhatsApp, email, llamadas), Atención al paciente 24/7",
    "keywords": "asistente virtual médico, reducción ausencias, gestión citas médicas, IA sanitaria",
    "publisher": {
      "@type": "Organization",
      "@id": "https://iaeva.com/#organization"
    }
  };

  return (
    <PageLayout>
      <SEOHead
        title={`${t('meta.title')} 🩺 | ${t('meta.siteName')}`}
        description={`🤖 ${t('meta.description')} ✅ ${t('meta.tagline')} 📈 ${t('meta.benefits')}`}
        keywords={t('meta.keywords')}
        structuredData={[
          organizationSchema,
          sitelinksSearchBoxSchema,
          softwareAppSchema,
          faqData
        ]}
        socialProfiles={socialProfiles}
        canonicalUrl={i18n.language === 'es' ? '/' : '/fr'}
        hreflang={[
          { lang: 'es', url: '/' },
          { lang: 'fr', url: '/fr' }
        ]}
        ogImage="/images/iaeva-homepage-preview.jpg"
      />

      <main>
        <Hero />
        <TrustBadges />
        <Features />
        <GuidePromotion />
        <IAEVAWhatsApp />
        <HowItWorks />
        <VapiVoice />
        <CustomerServiceHub />
        <SafetySection />
        <ImplementationPlan />
        {/* <Testimonials /> */}
        <FAQ />
        <CTASection />
      </main>
    </PageLayout>
  );
};


export default Index;
