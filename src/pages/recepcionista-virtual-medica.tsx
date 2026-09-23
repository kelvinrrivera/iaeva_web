import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Phone, Check, Clock, ShieldCheck, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import FAQSection from "@/components/shared/FAQSection";

const RecepcionistaVirtualMedica = () => {
    const faqData = [
        {
            question: "¿Cómo se integra IAEVA con mi software de gestión actual?",
            answer: "IAEVA se conecta vía API o webhook con los principales CRMs médicos del mercado (ClinicCloud, Doctoralia, etc.). Si tu software no tiene API abierta, podemos configurarlo para que envíe los datos por correo o WhatsApp seguro en tiempo real."
        },
        {
            question: "¿Qué ocurre si llaman dos pacientes a la vez?",
            answer: "A diferencia de una recepcionista humana que solo puede atender una llamada, IAEVA escala automáticamente y puede atender hasta 100 llamadas simultáneas sin que nadie escuche la señal de comunicando."
        },
        {
            question: "¿Puede el sistema distinguir una urgencia médica real?",
            answer: "Sí. Configuramos protocolos de triaje personalizados. Si el paciente menciona una urgencia (según tus palabras clave), el sistema puede transferir la llamada inmediatamente a un móvil de guardia o instruir al paciente para llamar a emergencias."
        },
        {
            question: "¿Es seguro y cumple con la RGPD?",
            answer: "Absolutamente. Todos los datos están encriptados con estándares bancarios. Firmamos un contrato de confidencialidad y tratamiento de datos (DPA) para asegurar que tu clínica cumple 100% con la normativa europea de protección de datos."
        },
        {
            question: "¿Tengo que pagar permanencia?",
            answer: "No. Creemos en nuestro producto. Puedes cancelar en cualquier momento si sientes que no te aporta valor. Sin letras pequeñas ni contratos de permanencia abusivos."
        }
    ];

    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "SoftwareApplication",
                "name": "IAEVA Recepcionista Virtual Médica",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Cloud",
                "offers": {
                    "@type": "Offer",
                    "price": "99.00",
                    "priceCurrency": "EUR"
                },
                "description": "Recepcionista virtual con Inteligencia Artificial especializada en clínicas y centros médicos. Responde 24/7, agenda citas y gestiona pacientes automáticamente.",
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

    return (
        <PageLayout>
            <Helmet>
                <title>Recepcionista Virtual Médica con IA | Responde 24/7</title>
                <meta
                    name="description"
                    content="Automatiza la atención telefónica de tu clínica. Nuestra IA agenda citas, resuelve dudas y filtra urgencias médico-administrativas sin intervención humana."
                />
                <meta name="keywords" content="recepcionista virtual medica, ia para citas medicas, contestador automatico clinica, agendamiento automatico" />
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            </Helmet>

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
                                Disponible 24/7 sin descanso
                            </div>

                            <h1 className="text-5xl md:text-6xl font-display font-extrabold leading-tight text-gray-900 tracking-tight">
                                La recepcionista que <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-iaeva-blue to-iaeva-purple">nunca duerme</span>
                            </h1>

                            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                                Olvídate de las llamadas perdidas. IAEVA contesta al teléfono, gestiona tu agenda y prioriza urgencias mientras tú te enfocas en tus pacientes.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Link to="/contacto">
                                    <Button size="lg" className="button-primary h-14 text-lg w-full sm:w-auto shadow-button">
                                        Solicitar Demo Personalizada
                                    </Button>
                                </Link>
                                <Link to="/calculadora-roi">
                                    <Button variant="outline" size="lg" className="h-14 text-lg border-2 border-gray-200 text-gray-700 hover:border-iaeva-blue hover:text-iaeva-blue bg-transparent w-full sm:w-auto">
                                        Calcular Ahorro
                                    </Button>
                                </Link>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-500 pt-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-iaeva-blue/5 text-iaeva-blue text-xs font-bold border border-iaeva-blue/10">
                                    <Check className="w-3 h-3" />
                                    Optimizado para el Sector Sanitario
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 relative">
                            <div className="relative z-10 bg-white rounded-2xl shadow-glass border border-white/20 p-6 md:p-8 max-w-md mx-auto transform rotate-1 hover:rotate-0 transition-transform duration-500">
                                <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 bg-gradient-to-br from-iaeva-blue to-iaeva-purple rounded-full flex items-center justify-center text-white font-bold">IA</div>
                                        <div>
                                            <p className="font-bold text-gray-900">Asistente IAEVA</p>
                                            <p className="text-xs text-iaeva-teal flex items-center gap-1">
                                                <span className="h-1.5 w-1.5 bg-iaeva-teal rounded-full"></span> En línea ahora
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-400">Ahora mismo</span>
                                </div>

                                <div className="space-y-4 font-mono text-sm leading-relaxed">
                                    <div className="bg-gray-50 p-3 rounded-lg rounded-tl-none border border-gray-100">
                                        <p className="text-gray-600">Clinica Salud, buenas tardes. Le atiende el asistente virtual. ¿En qué puedo ayudarle?</p>
                                    </div>
                                    <div className="bg-iaeva-blue/5 p-3 rounded-lg rounded-tr-none border border-iaeva-blue/10 ml-auto max-w-[90%]">
                                        <p className="text-gray-800">Hola, quería cita con el dermatólogo para el martes.</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg rounded-tl-none border border-gray-100">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="h-2 w-2 bg-iaeva-purple rounded-full animate-pulse"></span>
                                            <span className="text-xs font-bold text-iaeva-purple uppercase">Consultando Agenda...</span>
                                        </div>
                                        <p className="text-gray-600">El Dr. Pérez tiene un hueco este martes a las 11:30 o a las 16:00. ¿Cuál prefiere?</p>
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
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">Más que una contestadora</h2>
                        <p className="text-xl text-gray-600">Tecnología diseñada específicamente para el sector sanitario.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Clock className="h-6 w-6 text-white" />,
                                title: "Agenda Inteligente",
                                desc: "Se conecta directamente a tu CRM médico para ver huecos reales y agendar sin conflictos.",
                                color: "bg-iaeva-blue"
                            },
                            {
                                icon: <ShieldCheck className="h-6 w-6 text-white" />,
                                title: "Triaje Básico",
                                desc: "Distingue entre una 'receta', una 'urgencia' o una 'cita rutinaria' y deriva la llamada según tus protocolos.",
                                color: "bg-iaeva-purple"
                            },
                            {
                                icon: <Phone className="h-6 w-6 text-white" />,
                                title: "Cero Llamadas Perdidas",
                                desc: "Maneja múltiples llamadas simultáneas. Nunca más escucharás el tono de ocupado en tu recepción.",
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
                            <div className="text-gray-400 font-medium">Reducción de Absentismo</div>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-iaeva-blue to-iaeva-teal mb-2">+25hrs</div>
                            <div className="text-gray-400 font-medium">Ahorradas a la semana</div>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-iaeva-blue to-iaeva-teal mb-2">24/7</div>
                            <div className="text-gray-400 font-medium">Disponibilidad real</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <FAQSection items={faqData} title="Preguntas Frecuentes sobre la Recepcionista Virtual" />

            {/* CTA */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="relative rounded-3xl bg-gradient-to-r from-iaeva-blue to-iaeva-purple p-12 overflow-hidden text-center shadow-xl">
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
                        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">¿Listo para transformar tu recepción?</h2>
                            <p className="text-white/90 text-lg">
                                Prueba la demo interactiva y escucha cómo suena el futuro de tu clínica.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link to="/contacto">
                                    <Button size="lg" className="bg-white text-iaeva-purple hover:bg-gray-50 border-0 h-14 px-8 rounded-full text-lg font-semibold shadow-lg">
                                        Escuchar Demo Voice
                                    </Button>
                                </Link>
                                <Link to="/calculadora-roi">
                                    <Button variant="outline" size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/10 h-14 px-8 rounded-full text-lg">
                                        Calcular ROI
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

export default RecepcionistaVirtualMedica;
