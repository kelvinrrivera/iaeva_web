import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Phone, Check, Clock, ShieldCheck, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
// import { Helmet } from "react-helmet-async"; // Removed Helmet
import SEOHead from "@/components/shared/SEOHead"; // Added SEOHead
import { motion } from "framer-motion";
import FAQSection from "@/components/shared/FAQSection";

const RecepcionistaVirtualMedicaFR = () => {
    const faqData = [
        {
            question: "Comment IAEVA s'intègre-t-il à mon logiciel de gestion actuel ?",
            answer: "IAEVA se connecte via API ou webhook avec les principaux CRM médicaux du marché (ClinicCloud, Doctoralia, etc.). Si votre logiciel n'a pas d'API ouverte, nous pouvons le configurer pour envoyer les données par e-mail ou WhatsApp sécurisé en temps réel."
        },
        {
            question: "Que se passe-t-il si deux patients appellent en même temps ?",
            answer: "Contrairement à une réceptionniste humaine qui ne peut gérer qu'un seul appel, IAEVA s'adapte automatiquement et peut traiter jusqu'à 100 appels simultanés sans que personne n'entende la tonalité d'occupation."
        },
        {
            question: "Le système peut-il distinguer une véritable urgence médicale ?",
            answer: "Oui. Nous configurons des protocoles de triage personnalisés. Si le patient mentionne une urgence (selon vos mots-clés), le système peut transférer l'appel immédiatement à un mobile de garde ou inviter le patient à appeler les urgences."
        },
        {
            question: "Est-ce sécurisé et conforme au RGPD ?",
            answer: "Absolument. Toutes les données sont cryptées selon les normes bancaires. Nous signons un accord de confidentialité et de traitement des données (DPA) pour garantir que votre clinique est 100% conforme à la réglementation européenne sur la protection des données."
        },
        {
            question: "Dois-je payer un engagement ?",
            answer: "Non. Nous croyons en notre produit. Vous pouvez annuler à tout moment si vous estimez qu'il ne vous apporte pas de valeur. Sans petits caractères ni contrats d'engagement abusifs."
        }
    ];

    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "SoftwareApplication",
                "name": "IAEVA Réceptionniste Virtuelle Médicale",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Cloud",
                "offers": {
                    "@type": "Offer",
                    "price": "99.00",
                    "priceCurrency": "EUR"
                },
                "description": "Réceptionniste virtuelle avec Intelligence Artificielle spécialisée dans les cliniques et centres médicaux. Répond 24/7, prend des rendez-vous et gère les patients automatiquement.",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "ratingCount": "127"
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
        { lang: "es", url: "/recepcionista-virtual-medica" },
        { lang: "fr", url: "/fr/recepcionista-virtual-medica" }
    ];

    return (
        <PageLayout>
            <SEOHead
                title="Réceptionniste Virtuelle Médicale IA | Répond 24/7"
                description="Automatisez l'accueil téléphonique de votre clinique. Notre IA prend les rendez-vous, répond aux questions et filtre les urgences médico-administratives sans intervention humaine."
                canonicalUrl="/fr/recepcionista-virtual-medica"
                keywords="réceptionniste virtuelle médicale, ia pour rendez-vous médicaux, répondeur automatique clinique, prise de rendez-vous automatique"
                structuredData={[structuredData]}
                hreflang={hreflang}
            />

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-iaeva-bg-light to-white">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-iaeva-blue/5 blur-3xl rounded-bl-[100px] -z-10"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 space-y-8 animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-iaeva-blue/10 border border-iaeva-blue/20 text-iaeva-blue font-semibold text-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-iaeva-blue opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-iaeva-blue"></span>
                                </span>
                                Disponible 24/7 sans pause
                            </div>

                            <h1 className="text-5xl md:text-6xl font-display font-extrabold leading-tight text-gray-900 tracking-tight">
                                La réceptionniste qui <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-iaeva-blue to-iaeva-purple">ne dort jamais</span>
                            </h1>

                            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                                Oubliez les appels manqués. IAEVA répond au téléphone, gère votre agenda et priorise les urgences pendant que vous vous concentrez sur vos patients.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Link to="/fr/contact">
                                    <Button size="lg" className="button-primary h-14 text-lg w-full sm:w-auto shadow-button">
                                        Demander une Démo Personnalisée
                                    </Button>
                                </Link>
                                <Link to="/fr/calculatrice-roi">
                                    <Button variant="outline" size="lg" className="h-14 text-lg border-2 border-gray-200 text-gray-700 hover:border-iaeva-blue hover:text-iaeva-blue bg-transparent w-full sm:w-auto">
                                        Calculer l'Économie
                                    </Button>
                                </Link>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-500 pt-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-iaeva-blue/5 text-iaeva-blue text-xs font-bold border border-iaeva-blue/10">
                                    <Check className="w-3 h-3" />
                                    Optimisé pour le Secteur de la Santé
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 relative">
                            <div className="relative z-10 bg-white rounded-2xl shadow-glass border border-white/20 p-6 md:p-8 max-w-md mx-auto transform rotate-1 hover:rotate-0 transition-transform duration-500">
                                <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 bg-gradient-to-br from-iaeva-blue to-iaeva-purple rounded-full flex items-center justify-center text-white font-bold">IA</div>
                                        <div>
                                            <p className="font-bold text-gray-900">Assistant IAEVA</p>
                                            <p className="text-xs text-iaeva-teal flex items-center gap-1">
                                                <span className="h-1.5 w-1.5 bg-iaeva-teal rounded-full"></span> En ligne maintenant
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-400">À l'instant</span>
                                </div>

                                <div className="space-y-4 font-mono text-sm leading-relaxed">
                                    <div className="bg-gray-50 p-3 rounded-lg rounded-tl-none border border-gray-100">
                                        <p className="text-gray-600">Clinique Santé, bonjour. L'assistant virtuel à votre écoute. En quoi puis-je vous aider ?</p>
                                    </div>
                                    <div className="bg-iaeva-blue/5 p-3 rounded-lg rounded-tr-none border border-iaeva-blue/10 ml-auto max-w-[90%]">
                                        <p className="text-gray-800">Bonjour, je voulais un rendez-vous avec le dermatologue pour mardi.</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg rounded-tl-none border border-gray-100">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="h-2 w-2 bg-iaeva-purple rounded-full animate-pulse"></span>
                                            <span className="text-xs font-bold text-iaeva-purple uppercase">Consultation Agenda...</span>
                                        </div>
                                        <p className="text-gray-600">Le Dr. Pérez a un créneau ce mardi à 11h30 ou à 16h00. Lequel préférez-vous ?</p>
                                    </div>
                                </div>

                                <div className="mt-8 pt-4 border-t border-gray-100 flex justify-between items-center">
                                    <div className="flex gap-2">
                                        <span className="h-2 w-2 rounded-full bg-red-400"></span>
                                        <span className="h-2 w-2 rounded-full bg-yellow-400"></span>
                                        <span className="h-2 w-2 rounded-full bg-green-400"></span>
                                    </div>
                                    <span className="text-xs font-medium text-gray-400">IAEVA Voice Engine™</span>
                                </div>
                            </div>

                            {/* Decorative background elements */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-iaeva-purple/20 to-transparent blur-3xl -z-10 opacity-60"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-white relative">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">Plus qu'un simple répondeur</h2>
                        <p className="text-xl text-gray-600">Technologie conçue spécifiquement pour le secteur sanitaire.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Clock className="h-6 w-6 text-white" />,
                                title: "Agenda Intelligent",
                                desc: "Se connecte directement à votre CRM médical pour voir les créneaux réels et planifier sans conflits.",
                                color: "bg-iaeva-blue"
                            },
                            {
                                icon: <ShieldCheck className="h-6 w-6 text-white" />,
                                title: "Triage Basique",
                                desc: "Distingue entre une 'ordonnance', une 'urgence' ou un 'rendez-vous de routine' et dirige l'appel selon vos protocoles.",
                                color: "bg-iaeva-purple"
                            },
                            {
                                icon: <Phone className="h-6 w-6 text-white" />,
                                title: "Zéro Appel Manqué",
                                desc: "Gère plusieurs appels simultanés. Vous n'entendrez plus jamais la tonalité d'occupation à votre réception.",
                                color: "bg-iaeva-teal"
                            }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                className="group p-8 rounded-2xl bg-white border border-gray-100 hover:border-iaeva-blue/30 shadow-soft hover:shadow-glass transition-all duration-300 hover:-translate-y-1"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <div className={`h-12 w-12 ${feature.color} rounded-xl shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-iaeva-blue transition-colors">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section with Brand Color */}
            <section className="py-20 bg-iaeva-bg-dark text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
                        <div className="p-4">
                            <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-iaeva-blue to-iaeva-teal mb-2">40%</div>
                            <div className="text-gray-400 font-medium">Réduction de l'Absentéisme</div>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-iaeva-blue to-iaeva-teal mb-2">+25hrs</div>
                            <div className="text-gray-400 font-medium">Économisées par semaine</div>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-iaeva-blue to-iaeva-teal mb-2">24/7</div>
                            <div className="text-gray-400 font-medium">Disponibilité réelle</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <FAQSection items={faqData} title="Questions Fréquentes sur la Réceptionniste Virtuelle" />

            {/* CTA */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="relative rounded-3xl bg-gradient-to-r from-iaeva-blue to-iaeva-purple p-12 overflow-hidden text-center shadow-xl">
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
                        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">Prêt à transformer votre réception ?</h2>
                            <p className="text-white/90 text-lg">
                                Essayez la démo interactive et écoutez à quoi ressemble l'avenir de votre clinique.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link to="/fr/contact">
                                    <Button size="lg" className="bg-white text-iaeva-purple hover:bg-gray-50 border-0 h-14 px-8 rounded-full text-lg font-semibold shadow-lg">
                                        Écouter Démo Vocale
                                    </Button>
                                </Link>
                                <Link to="/fr/calculatrice-roi">
                                    <Button variant="outline" size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/10 h-14 px-8 rounded-full text-lg">
                                        Calculer le ROI
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

export default RecepcionistaVirtualMedicaFR;
