import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Zap, Users, BarChart3, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
// import { Helmet } from "react-helmet-async";
import SEOHead from "@/components/shared/SEOHead";
import { motion } from "framer-motion";
import FAQSection from "@/components/shared/FAQSection";

const IAParaClinicasFR = () => {
    const faqData = [
        {
            question: "Comment IAEVA aide-t-il à réduire l'absentéisme des patients ?",
            answer: "Notre système envoie des rappels intelligents par WhatsApp et SMS nécessitant une confirmation. Si un patient annule, IAEVA contacte automatiquement les patients sur liste d'attente pour combler ce créneau immédiatement, récupérant jusqu'à 40% des revenus perdus."
        },
        {
            question: "Est-ce difficile à utiliser pour mon personnel administratif ?",
            answer: "Pas du tout. IAEVA fonctionne en pilote automatique. Votre équipe ne reçoit des notifications que lorsqu'il y a une action complexe nécessitant une intervention humaine. De plus, nous incluons une formation initiale gratuite."
        },
        {
            question: "Combien de temps faut-il pour le mettre en œuvre dans ma clinique ?",
            answer: "La configuration de base est prête en 48 heures. L'intégration approfondie avec votre CRM dépend du fournisseur, mais prend généralement entre 5 et 10 jours ouvrables."
        },
        {
            question: "Qu'en est-il de la gestion des paiements ?",
            answer: "Nous pouvons configurer le système pour demander des paiements anticipés ou des cautions pour certains types de rendez-vous afin d'assurer la présence, le tout intégré dans la conversation de chat."
        },
        {
            question: "Est-ce adapté aux petites cliniques ou seulement aux grands centres ?",
            answer: "IAEVA est modulaire. Nous avons des plans spécifiques pour les cabinets individuels qui n'ont besoin que de la gestion des rendez-vous et des plans Enterprise pour les réseaux de cliniques avec plusieurs sites."
        }
    ];

    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "SoftwareApplication",
                "name": "IAEVA Système d'Exploitation Clinique",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Cloud",
                "offers": {
                    "@type": "Offer",
                    "price": "149.00",
                    "priceCurrency": "EUR"
                },
                "description": "Plateforme intégrale d'Intelligence Artificielle pour la gestion de cliniques. Unifie agenda, WhatsApp, marketing et paiements dans un seul système."
            },
            {
                "@type": "FAQPage",
                "mainEntity": faqData.map(item => ({
                    "@type": "Question",
                    "name": item.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": item.answer
                    }
                }))
            }
        ]
    };

    const hreflang = [
        { lang: "es", url: "/ia-para-clinicas" },
        { lang: "fr", url: "/fr/ia-para-clinicas" }
    ];

    return (
        <PageLayout>
            <SEOHead
                title="IA pour Cliniques et Centres Médicaux | Automatisation Totale"
                description="Centralisez la gestion de votre clinique avec l'Intelligence Artificielle. WhatsApp, Rendez-vous, Rappels et Paiements sur une seule plateforme."
                canonicalUrl="/fr/ia-para-clinicas"
                keywords="ia pour cliniques, logiciel gestion clinique, automatisation whatsapp clinique, crm médical ia"
                structuredData={[structuredData]}
                hreflang={hreflang}
            />

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-iaeva-bg-light to-white">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.svg')] opacity-[0.03]"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 space-y-8 animate-fade-in-up">


                            <h1 className="text-5xl md:text-6xl font-display font-extrabold leading-tight tracking-tight text-gray-900">
                                Le système d'exploitation <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-iaeva-blue to-iaeva-purple">intelligent</span> pour votre clinique.
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                                Oubliez d'avoir 5 outils séparés. IAEVA unifie l'agenda, la communication avec les patients et le marketing dans un écosystème propulsé par l'IA.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link to="/fr/contact">
                                    <Button size="lg" className="button-primary h-14 text-lg shadow-button text-white">
                                        Demander une Démo
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                                <div className="flex items-center gap-4 text-sm font-medium text-gray-500 pl-4 border-l-2 border-gray-100">
                                    <span>Compatible avec votre logiciel actuel</span>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-iaeva-blue/20 to-iaeva-purple/20 blur-3xl rounded-full opacity-50 -z-10"></div>
                            <img
                                src="/images/refined/human_ai_medical_team.png"
                                alt="Équipe médicale collaborant avec l'IA"
                                className="relative rounded-2xl shadow-glass border border-white/40 w-full h-auto transform hover:scale-[1.02] transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-white relative">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">Automatisation là où ça compte</h2>
                        <p className="text-xl text-gray-600">Éliminez 80% du travail administratif répétitif avec notre technologie.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <motion.div
                            className="feature-card group"
                            whileHover={{ y: -5 }}
                        >
                            <div className="h-14 w-14 bg-iaeva-bg-light rounded-xl flex items-center justify-center text-iaeva-purple mb-6 group-hover:bg-iaeva-purple group-hover:text-white transition-colors duration-300">
                                <MessageSquare className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 font-display">WhatsApp Business API</h3>
                            <p className="text-gray-600 leading-relaxed">Confirmations automatiques, reprogrammations et questions résolues par WhatsApp officiel. Taux d'ouverture de 98%.</p>
                        </motion.div>

                        <motion.div
                            className="feature-card group"
                            whileHover={{ y: -5 }}
                        >
                            <div className="h-14 w-14 bg-iaeva-bg-light rounded-xl flex items-center justify-center text-iaeva-blue mb-6 group-hover:bg-iaeva-blue group-hover:text-white transition-colors duration-300">
                                <Users className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 font-display">Récupération de Patients</h3>
                            <p className="text-gray-600 leading-relaxed">IAEVA détecte les patients qui ne sont pas venus depuis 6 mois et leur envoie une campagne personnalisée pour un contrôle.</p>
                        </motion.div>

                        <motion.div
                            className="feature-card group"
                            whileHover={{ y: -5 }}
                        >
                            <div className="h-14 w-14 bg-iaeva-bg-light rounded-xl flex items-center justify-center text-iaeva-teal mb-6 group-hover:bg-iaeva-teal group-hover:text-white transition-colors duration-300">
                                <BarChart3 className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 font-display">Analytique Prédictive</h3>
                            <p className="text-gray-600 leading-relaxed">"Combien de non-présentations aurez-vous mardi ?" Notre IA le prédit et suroccupe automatiquement l'agenda pour protéger vos revenus.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Benefits instead of Fake Logos */}
            <section className="py-16 bg-gray-50 border-y border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            "Sécurité des Données",
                            "Assistance 24/7",
                            "Sans Engagement",
                            "Support Prioritaire"
                        ].map((item, idx) => (
                            <div key={idx} className="font-display font-semibold text-gray-400 uppercase tracking-widest text-sm">
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <FAQSection items={faqData} title="Questions sur l'Intelligence Artificielle pour Cliniques" />

            {/* CTA */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-iaeva-bg-dark"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-iaeva-blue/20 to-iaeva-purple/20"></div>
                        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>

                        <div className="relative z-10 p-12 md:p-20 text-center">
                            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">Modernisez votre clinique aujourd'hui</h2>
                            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                                Rejoignez les cliniques qui transforment leur gestion avec notre système intelligent.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link to="/fr/contact">
                                    <Button size="lg" className="bg-white text-iaeva-bg-dark hover:bg-gray-100 rounded-full px-10 h-14 text-lg font-bold shadow-lg transition-transform hover:-translate-y-1">
                                        Parler avec un expert
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
};

export default IAParaClinicasFR;
