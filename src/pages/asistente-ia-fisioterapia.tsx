import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, CalendarDays, Smartphone, Clock, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import FAQSection from "@/components/shared/FAQSection";

const AsistenteIAFisioterapia = () => {
    const faqData = [
        {
            question: "¿Puede IAEVA gestionar mis clases grupales de Pilates o Yoga?",
            answer: "Sí. IAEVA puede gestionar inscripciones tanto para sesiones individuales de fisioterapia como para grupos reducidos o clases, controlando el aforo máximo de cada sesión automáticamente."
        },
        {
            question: "¿Cómo maneja las cancelaciones de última hora?",
            answer: "Las cancelaciones son críticas en fiosterapia. Cuando un paciente cancela, IAEVA ofrece ese hueco instantáneamente a tu lista de espera automatizada, ayudándote a mantener la agenda llena."
        },
        {
            question: "¿Entiende IAEVA terminología específica de fisioterapia?",
            answer: "Sí, el asistente está entrenado con vocabulario clínico. Entiende términos como 'punción seca', 'descarga', 'EPI', o 'rehabilitación de suelo pélvico' para asignar la duración correcta a cada tipo de cita."
        },
        {
            question: "¿Puede dar recomendaciones pre-cita a los pacientes?",
            answer: "Correcto. Puedes configurarlo para que recuerde a los pacientes traer ropa cómoda, resonancias previas o toalla, dependiendo del tipo de tratamiento que han reservado."
        },
        {
            question: "¿Es rentable para un fisioterapeuta autónomo?",
            answer: "Totalmente. Muchos de nuestros clientes son fisios que trabajan solos y no pueden parar un masaje para contestar el teléfono. IAEVA se paga sola con recuperar solo 2 citas al mes."
        }
    ];

    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "SoftwareApplication",
                "name": "IAEVA Asistente para Fisioterapia",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Cloud",
                "offers": {
                    "@type": "Offer",
                    "price": "89.00",
                    "priceCurrency": "EUR"
                },
                "description": "Asistente virtual de IA especializado para fisioterapeutas y clínicas de rehabilitación. Gestiona agenda, clases grupales y recordatorios automáticos.",
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

    return (
        <PageLayout>
            <Helmet>
                <title>Asistente IA para Fisioterapeutas y Osteópatas | Agenda Automática</title>
                <meta
                    name="description"
                    content="Deja de interrumpir tus sesiones para contestar al teléfono. IAEVA gestiona tus citas, cambios y recordatorios de rehabilitación automáticamente."
                />
                <meta name="keywords" content="asistente ia fisioterapia, software fisioterapeutas, agenda online fisio, recordatorios citas whatsapp" />
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            </Helmet>

            {/* Hero Section - Dark & Professional but on-brand */}
            <section className="relative pt-32 pb-24 overflow-hidden bg-iaeva-bg-dark text-white">
                <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5"></div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-iaeva-teal/10 blur-[100px] rounded-bl-full"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="md:w-1/2 space-y-8 animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-iaeva-teal/10 border border-iaeva-teal/30 text-iaeva-teal text-sm font-medium">
                                <Activity className="w-4 h-4" />
                                Especial para Fisioterapeutas y Osteópatas
                            </div>
                            <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight">
                                Tus manos en el paciente, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-iaeva-teal to-iaeva-blue">tu mente tranquila.</span>
                            </h1>
                            <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                                La primera IA que gestiona tus citas recurrentes y planes de rehabilitación sin que tengas que tocar el móvil ni interrumpir tu sesión.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Link to="/contacto">
                                    <Button size="lg" className="bg-iaeva-teal hover:bg-iaeva-teal/90 text-white rounded-full px-8 h-14 text-lg shadow-glow transition-all hover:-translate-y-0.5">
                                        Probar Gratis
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                                <Link to="/calculadora-roi">
                                    <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent">
                                        Ver Demo
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
                                            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Nueva Cita</p>
                                            <p className="text-sm font-bold text-white">Sesión Rehab #3 - 17:00</p>
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
                                            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Tiempo ahorrado hoy</p>
                                            <p className="text-sm font-bold text-white">45 minutos</p>
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
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">Diseñado para tu flujo de trabajo</h2>
                        <p className="text-lg text-gray-600">Funcionalidades pensadas para la práctica clínica diaria.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Sesiones Recurrentes",
                                desc: "IAEVA entiende 'necesito verte dos veces por semana durante un mes' y busca los huecos automáticamente."
                            },
                            {
                                title: "Lista de Espera Inteligente",
                                desc: "Si un paciente cancela, IAEVA avisa automáticamente a los que están esperando para llenar el hueco en minutos."
                            },
                            {
                                title: "Instrucciones Pre-Sesión",
                                desc: "Envía automáticamente recordatorios de 'traer ropa cómoda' o 'radiografías' según el tipo de tratamiento."
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
            <FAQSection items={faqData} title="Preguntas Frecuentes de Fisioterapeutas" subtitle="Resolvemos las dudas específicas de tu profesión." className="bg-white" />

            {/* Simple CTA */}
            <section className="py-24 bg-iaeva-bg-light">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <div className="inline-flex items-center justify-center p-4 rounded-full bg-white shadow-sm mb-6">
                            <Activity className="w-8 h-8 text-iaeva-teal" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-display font-medium text-gray-900 leading-normal">
                            Enfócate en la recuperación de tus pacientes, nosotros nos encargamos de la agenda.
                        </h2>
                        <div className="pt-8">
                            <Link to="/contacto">
                                <Button size="lg" className="bg-iaeva-teal hover:bg-iaeva-teal/90 text-white rounded-full px-12 h-14 text-lg font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                                    Hablar con un consultor
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
};

export default AsistenteIAFisioterapia;
