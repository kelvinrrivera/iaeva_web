import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, MessageCircle, TrendingDown, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

import PageLayout from '@/components/layout/PageLayout';
import SEOHead from '@/components/shared/SEOHead';
import CTAButton from '@/components/shared/CTAButton';
import { organizationSchema, generateBreadcrumbs, socialProfiles } from '@/lib/schema';
import { Link } from 'react-router-dom';

const ReduccionAbsentismoFR = () => {
    const { t } = useTranslation(['common']);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const breadcrumbs = generateBreadcrumbs([
        { name: "Accueil", url: "/fr" },
        { name: "Réduction de l'absentéisme", url: "/fr/reduccion-absentismo" }
    ]);

    const hreflang = [
        { lang: "es", url: "/reduccion-absentismo" },
        { lang: "fr", url: "/fr/reduccion-absentismo" }
    ];

    return (
        <PageLayout>
            <SEOHead
                title="Réduire l'absentéisme des patients en clinique | IAEVA"
                description="Réduisez les rendez-vous manqués jusqu'à 60% avec des rappels automatiques via WhatsApp. La solution IA pour cliniques médicales et dentaires."
                canonicalUrl="/fr/reduccion-absentismo"
                keywords="réduire absentéisme patients, rappels rendez-vous whatsapp, no-show clinique, confirmer rendez-vous automatiquement, gestion rendez-vous médicaux ia"
                structuredData={[organizationSchema]}
                socialProfiles={socialProfiles}
                breadcrumbs={breadcrumbs}
                hreflang={hreflang}
            />

            {/* Hero Section */}
            <section className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                Arrêtez de perdre de l'argent à cause des <span className="text-iaeva-blue">patients absents</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                                L'absentéisme coûte des milliers d'euros par mois aux cliniques. IAEVA confirme automatiquement les rendez-vous par WhatsApp et récupère les créneaux libres instantanément.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/fr/calculatrice-roi">
                                    <div className="inline-flex h-10 items-center justify-center rounded-md bg-iaeva-blue px-8 py-4 text-lg font-medium text-white shadow transition-colors hover:bg-iaeva-blue/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-auto py-3">
                                        Calculer combien vous perdez
                                    </div>
                                </Link>
                                <Link to="/fr/contact">
                                    <div className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 py-4 text-lg font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-auto py-3">
                                        Ver demo en vivo
                                    </div>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Problem Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-red-50 rounded-full blur-3xl opacity-30"></div>
                            <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-red-100">
                                <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
                                    <TrendingDown className="h-6 w-6" /> Le vrai problème
                                </h3>
                                <ul className="space-y-4 text-gray-600">
                                    <li className="flex gap-3">
                                        <span className="text-red-400">✕</span>
                                        Les SMS sont ignorés et les emails finissent dans les spams.
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-red-400">✕</span>
                                        Votre réceptionniste perd 15 heures/semaine à appeler pour confirmer.
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-red-400">✕</span>
                                        Lorsqu'un patient ne vient pas, ce créneau est perdu à jamais.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold mb-6">Pourquoi les rappels traditionnels échouent-ils ?</h2>
                            <p className="text-gray-600 mb-6 text-lg">
                                La plupart des cliniques s'appuient sur des méthodes passives. Si le patient oublie son rendez-vous, vous en assumez le coût du personnel et du fauteuil vide.
                            </p>
                            <p className="text-gray-600 mb-6 text-lg">
                                IAEVA change cela : <strong>elle initie une véritable conversation</strong>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Solution Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Confirmation intelligente par WhatsApp</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Notre agent IA ne se contente pas d'"avertir", il gère l'agenda.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <MessageCircle className="h-8 w-8 text-green-500" />,
                                title: "Interaction naturelle",
                                desc: "Le patient répond sur WhatsApp comme s'il parlait à une personne. 'Oui, je viendrai' ou 'Je préfère changer'."
                            },
                            {
                                icon: <Clock className="h-8 w-8 text-blue-500" />,
                                title: "Reprogrammation immédiate",
                                desc: "Si le patient annule, IAEVA lui propose automatiquement des créneaux libres sans déranger votre équipe."
                            },
                            {
                                icon: <ShieldCheck className="h-8 w-8 text-purple-500" />,
                                title: "Liste d'attente active",
                                desc: "S'il reste un créneau libre, IAEVA contacte les patients sur liste d'attente pour le remplir instantanément."
                            }
                        ].map((feature, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Proof */}
            <section className="py-16 bg-iaeva-blue text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-12">Résultats prouvés</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-5xl font-bold mb-2">-60%</div>
                            <div className="text-blue-200">De taux d'absentéisme</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2">+24%</div>
                            <div className="text-blue-200">Revenus récupérés</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2">0h</div>
                            <div className="text-blue-200">Temps dédié à la confirmation</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 bg-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6">Arrêtez de perdre des revenus dès aujourd'hui</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Essayez IAEVA et regardez votre agenda se remplir tout seul.
                    </p>
                    <Link to="/fr/contact">
                        <div className="inline-flex h-10 items-center justify-center rounded-full bg-iaeva-blue px-10 py-4 text-lg font-medium text-white shadow-xl shadow-emerald-200 transition-colors hover:bg-iaeva-blue/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-auto py-4">
                            Demander une démonstration
                        </div>
                    </Link>
                </div>
            </section>
        </PageLayout>
    );
};

export default ReduccionAbsentismoFR;
