import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, MessageCircle, TrendingDown, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

import PageLayout from '@/components/layout/PageLayout';
import SEOHead from '@/components/shared/SEOHead';
import CTAButton from '@/components/shared/CTAButton';
import { organizationSchema, generateBreadcrumbs, socialProfiles } from '@/lib/schema';

const ReduccionAbsentismo = () => {
    const { t } = useTranslation(['common']);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const breadcrumbs = generateBreadcrumbs([
        { name: "Inicio", url: "/" },
        { name: "Reducción de absentismo", url: "/reduccion-absentismo" }
    ]);

    return (
        <PageLayout>
            <SEOHead
                title="Cómo reducir absentismo de pacientes en clínicas | IAEVA"
                description="Reduce las citas perdidas hasta un 60% con recordatorios automáticos por WhatsApp. La solución de IA para clínicas médicas y dentales."
                canonicalUrl="/reduccion-absentismo"
                keywords="reducir absentismo pacientes, recordatorios citas whatsapp, no-show clinica, confirmar citas automaticamente, gestion citas medicas ia"
                structuredData={[organizationSchema]}
                socialProfiles={socialProfiles}
                breadcrumbs={breadcrumbs}
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
                                Deja de perder dinero por <span className="text-iaeva-blue">pacientes que no asisten</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                                El absentismo cuesta a las clínicas miles de euros al mes. IAEVA confirma citas automáticamente por WhatsApp y recupera los huecos libres al instante.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <CTAButton
                                    text="Calcular cuánto pierdes"
                                    path="/calculadora-roi"
                                    variant="primary"
                                    className="px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all"
                                />
                                <CTAButton
                                    text="Ver demo en vivo"
                                    path="/contacto"
                                    variant="outline"
                                    className="px-8 py-4 text-lg"
                                />
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
                                    <TrendingDown className="h-6 w-6" /> El problema real
                                </h3>
                                <ul className="space-y-4 text-gray-600">
                                    <li className="flex gap-3">
                                        <span className="text-red-400">✕</span>
                                        Los SMS se ignoran y los emails van a spam.
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-red-400">✕</span>
                                        Tu recepcionista pierde 15 horas/semana llamando para confirmar.
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-red-400">✕</span>
                                        Cuando un paciente falla, ese hueco se pierde para siempre.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold mb-6">¿Por qué fallan los recordatorios tradicionales?</h2>
                            <p className="text-gray-600 mb-6 text-lg">
                                La mayoría de clínicas confían en métodos pasivos. Si el paciente olvida la cita, tú asumes el coste del personal y el gabinete vacío.
                            </p>
                            <p className="text-gray-600 mb-6 text-lg">
                                IAEVA cambia esto: <strong>inicia una conversación real</strong>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Solution Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Confirmación inteligente por WhatsApp</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Nuestro agente de IA no solo "avisa", sino que gestiona la agenda.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <MessageCircle className="h-8 w-8 text-green-500" />,
                                title: "Interacción natural",
                                desc: "El paciente responde por WhatsApp como si hablara con una persona. 'Sí, iré' o 'Prefiero cambiarlo'."
                            },
                            {
                                icon: <Clock className="h-8 w-8 text-blue-500" />,
                                title: "Reprogramación inmediata",
                                desc: "Si el paciente cancela, IAEVA le ofrece huecos libres automáticamente sin molestar a tu equipo."
                            },
                            {
                                icon: <ShieldCheck className="h-8 w-8 text-purple-500" />,
                                title: "Lista de espera activa",
                                desc: "Si queda un hueco libre, IAEVA contacta a pacientes en lista de espera para llenarlo al instante."
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
                    <h2 className="text-3xl font-bold mb-12">Resultados probados</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-5xl font-bold mb-2">-60%</div>
                            <div className="text-blue-200">En tasa de absentismo</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2">+24%</div>
                            <div className="text-blue-200">Ingresos recuperados</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2">0h</div>
                            <div className="text-blue-200">Tiempo dedicado a confirmar</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 bg-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6">Deja de perder ingresos hoy mismo</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Prueba IAEVA y mira cómo tu agenda se llena sola.
                    </p>
                    <CTAButton
                        text="Solicitar demostración"
                        path="/contacto"
                        variant="primary"
                        className="px-10 py-4 text-lg rounded-full shadow-emerald-200 shadow-xl"
                    />
                </div>
            </section>
        </PageLayout>
    );
};

export default ReduccionAbsentismo;
