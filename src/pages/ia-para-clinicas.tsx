import React from "react";
import { SIGNUP_URL } from '@/config/app-urls';
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Zap, Users, BarChart3, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import FAQSection from "@/components/shared/FAQSection";

const IAParaClinicas = () => {
    const faqData = [
        {
            question: "¿Cómo ayuda IAEVA a reducir el absentismo de pacientes?",
            answer: "Nuestro sistema envía recordatorios inteligentes por WhatsApp y SMS que requieren confirmación. Si un paciente cancela, IAEVA contacta automáticamente a los pacientes en lista de espera para cubrir ese hueco inmediatamente, recuperando hasta un 40% de ingresos perdidos."
        },
        {
            question: "¿Es difícil de usar para mi personal administrativo?",
            answer: "Para nada. IAEVA funciona en piloto automático. Tu equipo solo recibe notificaciones cuando hay una acción compleja que requiere intervención humana. Además, incluimos formación inicial gratuita."
        },
        {
            question: "¿Cuánto tiempo se tarda en implementar en mi clínica?",
            answer: "La configuración básica está lista en 48 horas. La integración profunda con tu CRM depende del proveedor, pero generalmente entre 5 y 10 días laborables."
        },
        {
            question: "¿Qué pasa con la gestión de pagos?",
            answer: "Podemos configurar el sistema para solicitar pagos por adelantado o fianzas en ciertos tipos de citas para asegurar la asistencia, todo integrado en la conversación de chat."
        },
        {
            question: "¿Sirve para clínicas pequeñas o solo grandes centros?",
            answer: "IAEVA es modular. Tenemos planes específicos para consultorios unipersonales que solo necesitan gestión de citas y planes Enterprise para redes de clínicas con múltiples sedes."
        }
    ];

    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "SoftwareApplication",
                "name": "IAEVA Sistema Operativo Clínico",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Cloud",
                "offers": {
                    "@type": "Offer",
                    "price": "149.00",
                    "priceCurrency": "EUR"
                },
                "description": "Plataforma integral de Inteligencia Artificial para gestión de clínicas. Unifica agenda, WhatsApp, marketing y pagos en un solo sistema.",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.8",
                    "ratingCount": "84"
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

    return (
        <PageLayout>
            <Helmet>
                <title>IA para Clínicas y Centros Médicos | Automatización Total</title>
                <meta
                    name="description"
                    content="Centraliza la gestión de tu clínica con Inteligencia Artificial. WhatsApp, Citas, Recordatorios y Pagos en una sola plataforma."
                />
                <meta name="keywords" content="ia para clinicas, software gestion clinica, automatizacion whatsapp clinica, crm medico ia" />
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            </Helmet>

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-iaeva-bg-light to-white">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.svg')] opacity-[0.03]"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 space-y-8 animate-fade-in-up">


                            <h1 className="text-5xl md:text-6xl font-display font-extrabold leading-tight tracking-tight text-gray-900">
                                El sistema operativo <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-iaeva-blue to-iaeva-purple">inteligente</span> para tu clínica.
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                                Olvídate de tener 5 herramientas separadas. IAEVA unifica agenda, comunicación con pacientes y marketing en un ecosistema impulsado por IA.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <a href={SIGNUP_URL}>
                                    <Button size="lg" className="button-primary h-14 text-lg shadow-button text-white">
                                        Solicitar Demo
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </a>
                                <div className="flex items-center gap-4 text-sm font-medium text-gray-500 pl-4 border-l-2 border-gray-100">
                                    <span>Compatible con tu software actual</span>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-iaeva-blue/20 to-iaeva-purple/20 blur-3xl rounded-full opacity-50 -z-10"></div>
                            <img
                                src="/images/refined/human_ai_medical_team.png"
                                alt="Equipo médico colaborando con IA"
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
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">Automatización donde más importa</h2>
                        <p className="text-xl text-gray-600">Elimina el 80% del trabajo administrativo repetitivo con nuestra tecnología.</p>
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
                            <p className="text-gray-600 leading-relaxed">Confirmaciones automáticas, reprogramaciones y dudas resueltas por WhatsApp oficial. Tasa de apertura del 98%.</p>
                        </motion.div>

                        <motion.div
                            className="feature-card group"
                            whileHover={{ y: -5 }}
                        >
                            <div className="h-14 w-14 bg-iaeva-bg-light rounded-xl flex items-center justify-center text-iaeva-blue mb-6 group-hover:bg-iaeva-blue group-hover:text-white transition-colors duration-300">
                                <Users className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 font-display">Recuperación de Pacientes</h3>
                            <p className="text-gray-600 leading-relaxed">IAEVA detecta pacientes que no han venido en 6 meses y les envía una campaña personalizada para revisión.</p>
                        </motion.div>

                        <motion.div
                            className="feature-card group"
                            whileHover={{ y: -5 }}
                        >
                            <div className="h-14 w-14 bg-iaeva-bg-light rounded-xl flex items-center justify-center text-iaeva-teal mb-6 group-hover:bg-iaeva-teal group-hover:text-white transition-colors duration-300">
                                <BarChart3 className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 font-display">Analítica Predictiva</h3>
                            <p className="text-gray-600 leading-relaxed">"¿Cuántas no-shows tendrás el martes?" Nuestra IA lo predice y sobre-agenda automáticamente para proteger tus ingresos.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Benefits instead of Fake Logos */}
            <section className="py-16 bg-gray-50 border-y border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            "Seguridad de Datos",
                            "Atención 24/7",
                            "Sin Permanencia",
                            "Soporte Prioritario"
                        ].map((item, idx) => (
                            <div key={idx} className="font-display font-semibold text-gray-400 uppercase tracking-widest text-sm">
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <FAQSection items={faqData} title="Preguntas sobre Inteligencia Artificial para Clínicas" />

            {/* CTA */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-iaeva-bg-dark"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-iaeva-blue/20 to-iaeva-purple/20"></div>
                        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>

                        <div className="relative z-10 p-12 md:p-20 text-center">
                            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">Moderniza tu clínica hoy</h2>
                            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                                Únete a las clínicas que están transformando su gestión con nuestro sistema inteligente.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <a href={SIGNUP_URL}>
                                    <Button size="lg" className="bg-white text-iaeva-bg-dark hover:bg-gray-100 rounded-full px-10 h-14 text-lg font-bold shadow-lg transition-transform hover:-translate-y-1">
                                        Hablar con un experto
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
};

export default IAParaClinicas;
