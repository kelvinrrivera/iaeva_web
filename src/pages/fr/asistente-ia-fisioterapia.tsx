import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, CalendarDays, Smartphone, Clock, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
// import { Helmet } from "react-helmet-async";
import SEOHead from "@/components/shared/SEOHead";
import { motion } from "framer-motion";
import FAQSection from "@/components/shared/FAQSection";

const AsistenteIAFisioterapiaFR = () => {
    const faqData = [
        {
            question: "IAEVA peut-il gérer mes cours collectifs de Pilates ou de Yoga ?",
            answer: "Oui. IAEVA peut gérer les inscriptions aussi bien pour des séances individuelles de physiothérapie que pour des petits groupes ou des cours, en contrôlant automatiquement la capacité maximale de chaque session."
        },
        {
            question: "Comment gère-t-il les annulations de dernière minute ?",
            answer: "Les annulations sont critiques en physiothérapie. Lorsqu'un patient annule, IAEVA propose instantanément ce créneau à votre liste d'attente automatisée, vous aidant à maintenir votre agenda plein."
        },
        {
            question: "IAEVA comprend-il la terminologie spécifique à la physiothérapie ?",
            answer: "Oui, l'assistant est formé avec un vocabulaire clinique. Il comprend des termes comme 'puncture sèche', 'décharge', 'épi', ou 'rééducation périnéale' pour attribuer la durée correcte à chaque type de rendez-vous."
        },
        {
            question: "Peut-il donner des recommandations pré-rendez-vous aux patients ?",
            answer: "Exactement. Vous pouvez le configurer pour rappeler aux patients d'apporter des vêtements confortables, des IRM précédentes ou une serviette, selon le type de traitement qu'ils ont réservé."
        },
        {
            question: "Est-ce rentable pour un physiothérapeute indépendant ?",
            answer: "Absolument. Beaucoup de nos clients sont des kinés qui travaillent seuls et ne peuvent pas arrêter un massage pour répondre au téléphone. IAEVA se rentabilise en récupérant seulement 2 rendez-vous par mois."
        }
    ];

    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "SoftwareApplication",
                "name": "IAEVA Assistant pour Physiothérapie",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Cloud",
                "offers": {
                    "@type": "Offer",
                    "price": "89.00",
                    "priceCurrency": "EUR"
                },
                "description": "Assistant virtuel IA spécialisé pour physiothérapeutes et cliniques de rééducation. Gère l'agenda, les cours collectifs et les rappels automatiques.",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.95",
                    "ratingCount": "42"
                }
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
        { lang: "es", url: "/asistente-ia-fisioterapia" },
        { lang: "fr", url: "/fr/asistente-ia-fisioterapia" }
    ];

    return (
        <PageLayout>
            <SEOHead
                title="Assistant IA pour Physiothérapeutes et Ostéopathes | Agenda Automatique"
                description="Arrêtez d'interrompre vos séances pour répondre au téléphone. IAEVA gère vos rendez-vous, changements et rappels de rééducation automatiquement."
                canonicalUrl="/fr/asistente-ia-fisioterapia"
                keywords="assistant ia physiothérapie, logiciel physiothérapeutes, agenda en ligne kiné, rappels rendez-vous whatsapp"
                structuredData={[structuredData]}
                hreflang={hreflang}
            />

            {/* Hero Section - Dark & Professional but on-brand */}
            <section className="relative pt-32 pb-24 overflow-hidden bg-iaeva-bg-dark text-white">
                <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5"></div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-iaeva-teal/10 blur-[100px] rounded-bl-full"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="md:w-1/2 space-y-8 animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-iaeva-teal/10 border border-iaeva-teal/30 text-iaeva-teal text-sm font-medium">
                                <Activity className="w-4 h-4" />
                                Spécial pour Physiothérapeutes et Ostéopathes
                            </div>
                            <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight">
                                Vos mains sur le patient, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-iaeva-teal to-iaeva-blue">votre esprit tranquille.</span>
                            </h1>
                            <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                                La première IA qui gère vos rendez-vous récurrents et plans de rééducation sans que vous ayez à toucher votre mobile ni interrompre votre séance.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Link to="/fr/contact">
                                    <Button size="lg" className="bg-iaeva-teal hover:bg-iaeva-teal/90 text-white rounded-full px-8 h-14 text-lg shadow-glow transition-all hover:-translate-y-0.5">
                                        Essayer Gratuitement
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                                <Link to="/fr/calculatrice-roi">
                                    <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent">
                                        Voir Démo
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Visual: Abstract calming representation of balance/structure */}
                        <div className="md:w-1/2 flex justify-center relative">
                            <div className="relative z-10 w-full max-w-md aspect-square bg-white/5 rounded-full flex items-center justify-center border border-white/10 backdrop-blur-md shadow-glass">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Activity className="h-32 w-32 text-iaeva-teal/80 animate-pulse-soft" />
                                </div>
                                {/* Floating Cards */}
                                <motion.div
                                    className="absolute top-10 right-0 bg-gray-900/90 backdrop-blur-xl p-5 rounded-2xl border border-white/10 shadow-2xl"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-iaeva-teal/20 flex items-center justify-center border border-iaeva-teal/30">
                                            <CalendarDays className="h-5 w-5 text-iaeva-teal" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Nouveau RDV</p>
                                            <p className="text-sm font-bold text-white">Séance Rééduc #3 - 17:00</p>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="absolute bottom-10 left-0 bg-gray-900/90 backdrop-blur-xl p-5 rounded-2xl border border-white/10 shadow-2xl"
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-iaeva-blue/20 flex items-center justify-center border border-iaeva-blue/30">
                                            <Clock className="h-5 w-5 text-iaeva-blue" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Temps économisé aujourd'hui</p>
                                            <p className="text-sm font-bold text-white">45 minutes</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Glow effect behind circle */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-iaeva-teal/20 blur-[80px] -z-10 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pain Points Grid */}
            <section className="py-24 bg-white relative">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">Conçu pour votre flux de travail</h2>
                        <p className="text-lg text-gray-600">Fonctionnalités pensées pour la pratique clinique quotidienne.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Séances Récurrentes",
                                desc: "IAEVA comprend 'je dois vous voir deux fois par semaine pendant un mois' et trouve les créneaux automatiquement."
                            },
                            {
                                title: "Liste d'Attente Intelligente",
                                desc: "Si un patient annule, IAEVA prévient automatiquement ceux qui attendent pour combler le vide en quelques minutes."
                            },
                            {
                                title: "Instructions Pré-Séance",
                                desc: "Envoie automatiquement des rappels pour 'apporter des vêtements confortables' ou 'radiographies' selon le type de traitement."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="group p-8 border border-gray-100 rounded-3xl bg-white hover:border-iaeva-teal/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <div className="h-2 w-12 bg-gray-100 rounded-full mb-6 group-hover:bg-iaeva-teal transition-colors"></div>
                                <h3 className="text-xl font-bold mb-4 text-gray-900">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <FAQSection items={faqData} title="Questions Fréquentes de Physiothérapeutes" subtitle="Nous résolvons les doutes spécifiques à votre profession." className="bg-white" />

            {/* Simple CTA */}
            <section className="py-24 bg-iaeva-bg-light">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <div className="inline-flex items-center justify-center p-4 rounded-full bg-white shadow-sm mb-6">
                            <Activity className="w-8 h-8 text-iaeva-teal" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-display font-medium text-gray-900 leading-normal">
                            Concentrez-vous sur la récupération de vos patients, nous nous occupons de l'agenda.
                        </h2>
                        <div className="pt-8">
                            <Link to="/fr/contact">
                                <Button size="lg" className="bg-iaeva-teal hover:bg-iaeva-teal/90 text-white rounded-full px-12 h-14 text-lg font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                                    Parler avec un consultant
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
};

export default AsistenteIAFisioterapiaFR;
