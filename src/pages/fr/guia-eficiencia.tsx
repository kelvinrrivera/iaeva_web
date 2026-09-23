import React, { useState } from "react";
import GuideLayout from "@/components/guide/GuideLayout";
import InfographicBlock from "@/components/guide/InfographicBlock";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle2, ArrowRight, ShieldCheck, Cpu, Network, Zap, CheckSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const GuiaEficienciaClinicaFR = () => {
    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    const { toast } = useToast();

    // Mock download handler
    const handleDownloadRequest = () => {
        setIsDownloadModalOpen(true);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Guide envoyé !",
            description: `Nous avons envoyé le PDF à ${email}. Vérifiez votre boîte de réception.`,
            variant: "default",
        });
        setIsDownloadModalOpen(false);
        // Here you would hook into your real email marketing tool (e.g. Mailchimp/Resend)
    };

    const toc = [
        { id: "intro", title: "Introduction" },
        { id: "security", title: "1. Sécurité et Conformité" },
        { id: "tech", title: "2. Technologie et Fiabilité" },
        { id: "connectivity", title: "3. Connectivité Totale" },
        { id: "efficiency", title: "4. Renforcer l'Efficacité" },
        { id: "checklist", title: "5. Checklist Finale" },
    ];

    const hreflang = [
        { lang: "es", url: "/recursos/guia-eficiencia-clinica" },
        { lang: "fr", url: "/fr/recursos/guia-eficiencia-clinica" }
    ];

    return (
        <GuideLayout
            title="Guide Ultime : Comment choisir l'assistant IA pour votre clinique"
            description="Apprenez à évaluer la sécurité, la technologie et l'intégration pour éviter des erreurs coûteuses et protéger les données de vos patients."
            onDownload={handleDownloadRequest}
            toc={toc}
            canonicalUrl="/fr/recursos/guia-eficiencia-clinica"
            hreflang={hreflang}
            keywords="efficacité clinique, gestion médicale ia, réduire absentéisme, guide gestion clinique"
        >
            <section id="intro">
                <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 border-l-4 border-iaeva-teal pl-6 italic">
                    "L'Intelligence Artificielle n'est plus une vision du futur, mais un outil puissant qui redéfinit la gestion clinique."
                </p>
                <p>
                    Bienvenue dans l'ère de l'optimisation intelligente. De la prise de rendez-vous 24/7 à l'envoi de rappels personnalisés, un assistant IA peut libérer un temps précieux, réduire les erreurs et améliorer l'expérience patient.
                </p>
                <p>
                    <strong>Mais comment choisir la bonne solution ?</strong> Dans un secteur où la confidentialité et la confiance sont primordiales, un mauvais choix peut signifier des risques de sécurité et de réputation.
                </p>
                <p>
                    Ce guide vous fournira les connaissances nécessaires pour naviguer dans le paysage de l'IA en toute confiance, en évaluant des aspects critiques tels que la sécurité, la conformité réglementaire et la technologie réelle.
                </p>
            </section>

            <section id="security" className="mt-16">
                <div className="flex items-center gap-3 mb-6">
                    <ShieldCheck className="w-8 h-8 text-iaeva-blue" />
                    <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white m-0">
                        1. Sécurité des Données et Conformité
                    </h2>
                </div>
                <p>
                    En santé, la confiance repose sur la protection de l'information. Avant de regarder les fonctionnalités, filtrez par sécurité.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">Souveraineté des Données</h3>
                <ul className="space-y-4 mb-6">
                    <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                            <strong>Conformité Réglementaire (RGPD) :</strong> Votre fournisseur DOIT garantir le respect des lois locales. Demandez la documentation.
                        </div>
                    </li>
                    <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                            <strong>Auto-hébergement (Self-Hosting) :</strong> Privilégiez les solutions qui hébergent les données sur des serveurs sous votre juridiction légale (ex. UE) pour un meilleur contrôle.
                        </div>
                    </li>
                </ul>

                <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-lg border border-green-200 dark:border-green-800 my-6">
                    <h4 className="font-bold text-green-800 dark:text-green-200 mb-2 flex items-center gap-2">
                        💡 IAEVA Insight
                    </h4>
                    <p className="text-sm">
                        Nous priorisons l'auto-hébergement sur des serveurs sécurisés au sein du territoire légal exigé, administrés par notre équipe experte.
                    </p>
                </div>

                <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">Infrastructure Sécurisée</h3>
                <p>Exigez le cryptage (en transit et au repos), des sauvegardes régulières et des audits d'accès.</p>

                <div className="bg-yellow-50 dark:bg-yellow-900/10 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800 mt-6">
                    <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">❓ Questions Clés pour votre Fournisseur</h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                        <li>Où sont hébergées physiquement les données et sous quelle juridiction ?</li>
                        <li>Comment garantissent-ils la conformité RGPD/LOPD avec documentation ?</li>
                        <li>Qui a accès aux données au sein de leur organisation ?</li>
                    </ul>
                </div>
            </section>

            <section id="tech" className="mt-16">
                <div className="flex items-center gap-3 mb-6">
                    <Cpu className="w-8 h-8 text-iaeva-blue" />
                    <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white m-0">
                        2. Technologie : Au-delà du générique
                    </h2>
                </div>
                <p>
                    Tous les assistants ne se valent pas. Le secteur de la santé exige un contrôle, une personnalisation et une fiabilité supérieurs aux outils d'automatisation de base.
                </p>

                <InfographicBlock
                    title="Plateformes Génériques vs. Spécialisées"
                    type="comparison"
                    data={[
                        { traditional: "Automatisation de base (Zapier, Make)", ai: "Workflows complexes (Dify, LangChain)" },
                        { traditional: "Réponses prédéfinies simples", ai: "Compréhension du contexte médical" },
                        { traditional: "Risque d'hallucinations non contrôlé", ai: "Systèmes anti-hallucination (Langfuse)" },
                        { traditional: "Difficile à auditer", ai: "Traçabilité complète des conversations" }
                    ]}
                />

                <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">Minimiser les "Hallucinations"</h3>
                <p>
                    Les modèles d'IA peuvent inventer des informations. Un fournisseur responsable doit sélectionner le modèle adéquat et avoir des processus d'évaluation rigoureux.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-lg border border-blue-200 dark:border-blue-800 my-4">
                    <p className="text-sm">
                        <strong>IAEVA Insight :</strong> Nous évaluons nos assistants avec des outils comme <strong>Langfuse</strong> pour analyser le comportement et minimiser les risques.
                    </p>
                </div>
            </section>

            <section id="connectivity" className="mt-16">
                <div className="flex items-center gap-3 mb-6">
                    <Network className="w-8 h-8 text-iaeva-blue" />
                    <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white m-0">
                        3. Connectivité Totale et Omnicanalité
                    </h2>
                </div>
                <p>
                    Un assistant efficace n'opère pas isolé. Il doit s'intégrer aux canaux qu'utilisent vos patients et à vos systèmes de gestion.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">WhatsApp Officiel</h3>
                <p>
                    L'intégration doit se faire via <strong>WhatsApp Business API Officiel</strong>. Évitez les solutions instables non officielles qui mettent en danger votre numéro.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">Gestion Centralisée</h3>
                <p>
                    Imaginez superviser WhatsApp, Web Chat et d'autres canaux depuis un seul panneau. Cela permet une intervention humaine fluide si nécessaire.
                </p>
                <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-lg border border-green-200 dark:border-green-800 my-6">
                    <h4 className="font-bold text-green-800 dark:text-green-200 mb-2 flex items-center gap-2">
                        💡 IAEVA Insight
                    </h4>
                    <p className="text-sm">
                        Nous intégrons <strong>Chatwoot</strong> auto-hébergé connecté avec Dify, permettant une gestion unifiée et sécurisée de toutes les conversations.
                    </p>
                </div>
            </section>

            <section id="efficiency" className="mt-16">
                <div className="flex items-center gap-3 mb-6">
                    <Zap className="w-8 h-8 text-iaeva-blue" />
                    <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white m-0">
                        4. Renforcer l'Efficacité
                    </h2>
                </div>
                <p>
                    L'assistant doit être un moteur d'efficacité : prendre, modifier et annuler des rendez-vous, en plus d'envoyer des rappels proactifs pour réduire l'absentéisme.
                </p>

                <InfographicBlock
                    title="Impact sur l'Efficacité"
                    type="stat"
                    data={[
                        { value: "24/7", label: "Disponibilité réelle de l'agenda" },
                        { value: "-40%", label: "Réduction typique de l'absentéisme" },
                        { value: "100%", label: "Automatisation des rappels" }
                    ]}
                />

                <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">Intégration avec Systèmes (HIS/EMR)</h3>
                <p>
                    Vérifiez si votre logiciel actuel a une API ouverte. Si l'intégration directe n'est pas viable (coûts, sécurité, systèmes hérités), cherchez des approches modulaires.
                </p>
                <p className="mt-4">
                    <strong>Approche Modulaire IAEVA :</strong> Nous offrons un système de gestion de rendez-vous indépendant qui se synchronise avec Google/Outlook Calendar, agissant comme couche intermédiaire sécurisée si vous ne souhaitez pas toucher le cœur de votre dossier médical.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">Assistants Vocaux (VAPI)</h3>
                <p>
                    Pour les cliniques à la pointe, l'IA vocale peut gérer les appels entrants, répondre aux questions et prendre des rendez-vous en parlant naturellement avec le patient.
                </p>
            </section>

            <section id="checklist" className="mt-16 mb-24">
                <div className="flex items-center gap-3 mb-6">
                    <CheckSquare className="w-8 h-8 text-iaeva-blue" />
                    <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white m-0">
                        5. Checklist Finale d'Évaluation
                    </h2>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardContent className="pt-6">
                            <h4 className="font-bold text-lg mb-4 text-iaeva-blue">Sécurité</h4>
                            <ul className="space-y-2">
                                <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-gray-400 mt-0.5" /> <span>Conformité RGPD démontrée</span></li>
                                <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-gray-400 mt-0.5" /> <span>Auto-hébergement / Serveurs locaux</span></li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <h4 className="font-bold text-lg mb-4 text-iaeva-blue">Technologie</h4>
                            <ul className="space-y-2">
                                <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-gray-400 mt-0.5" /> <span>Plateformes spécialisées (non génériques)</span></li>
                                <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-gray-400 mt-0.5" /> <span>Stratégies anti-hallucination</span></li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <h4 className="font-bold text-lg mb-4 text-iaeva-blue">Fonctionnalité</h4>
                            <ul className="space-y-2">
                                <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-gray-400 mt-0.5" /> <span>WhatsApp API Officiel & Omnicanalité</span></li>
                                <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-gray-400 mt-0.5" /> <span>Gestion complète des rendez-vous et rappels</span></li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <div className="bg-iaeva-bg-dark text-white p-8 rounded-2xl text-center shadow-2xl relative overflow-hidden mt-12">
                    <div className="absolute inset-0 bg-gradient-to-r from-iaeva-blue/20 to-iaeva-teal/20"></div>
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-4">Prêt à transformer votre pratique médicale ?</h3>
                        <p className="mb-8 text-gray-200 max-w-2xl mx-auto">
                            Chez IAEVA, nous avons construit notre solution en pensant méticuleusement à chaque point de ce guide. Sûr, intelligent, intégré et adapté à vous.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-white text-iaeva-bg-dark hover:bg-gray-100 font-bold px-8" asChild>
                                <Link to="/fr/contact">
                                    Contacter Maintenant
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" onClick={handleDownloadRequest}>
                                Télécharger PDF Complet
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Download Modal */}
            <Dialog open={isDownloadModalOpen} onOpenChange={setIsDownloadModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Télécharger le Guide Complet (PDF)</DialogTitle>
                        <DialogDescription>
                            Entrez votre email pour recevoir le PDF imprimable + Checklist d'audit.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleFormSubmit} className="space-y-4 mt-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email professionnel</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="vous@clinique.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="w-full bg-iaeva-blue hover:bg-iaeva-blue/90">
                            Envoyer le Guide à mon Courriel
                        </Button>
                        <p className="text-xs text-center text-gray-500">
                            100% sans spam. Vous pouvez vous désinscrire à tout moment.
                        </p>
                    </form>
                </DialogContent>
            </Dialog>
        </GuideLayout>
    );
};

export default GuiaEficienciaClinicaFR;
