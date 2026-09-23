import React, { useState } from "react";
import GuideLayout from "@/components/guide/GuideLayout";
import InfographicBlock from "@/components/guide/InfographicBlock";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle2, ArrowRight, ShieldCheck, Cpu, Network, Zap, CheckSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const GuiaEficienciaClinica = () => {
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
            title: "¡Guía enviada!",
            description: `Hemos enviado el PDF a ${email}. Revisa tu bandeja de entrada.`,
            variant: "default",
        });
        setIsDownloadModalOpen(false);
        // Here you would hook into your real email marketing tool (e.g. Mailchimp/Resend)
    };

    const toc = [
        { id: "intro", title: "Introducción" },
        { id: "security", title: "1. Seguridad y Cumplimiento" },
        { id: "tech", title: "2. Tecnología y Fiabilidad" },
        { id: "connectivity", title: "3. Conectividad Total" },
        { id: "efficiency", title: "4. Potenciando la Eficiencia" },
        { id: "checklist", title: "5. Checklist Final" },
    ];

    return (
        <GuideLayout
            title="Guía Definitiva: Cómo elegir el asistente de IA para tu clínica"
            description="Aprende a evaluar seguridad, tecnología e integración para evitar errores costosos y proteger los datos de tus pacientes."
            onDownload={handleDownloadRequest}
            toc={toc}
        >
            <section id="intro">
                <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 border-l-4 border-iaeva-teal pl-6 italic">
                    "La Inteligencia Artificial ya no es una visión de futuro, sino una herramienta poderosa que redefine la gestión clínica."
                </p>
                <p>
                    Bienvenido a la era de la optimización inteligente. Desde agendar citas 24/7 hasta enviar recordatorios personalizados, un asistente de IA puede liberar tiempo valioso, reducir errores y mejorar la experiencia del paciente.
                </p>
                <p>
                    <strong>Pero, ¿cómo elegir la solución adecuada?</strong> En un sector donde la confidencialidad y la confianza son primordiales, una mala elección puede significar riesgos de seguridad y reputación.
                </p>
                <p>
                    Esta guía te proporcionará el conocimiento para navegar el panorama de la IA con confianza, evaluando aspectos críticos como seguridad, cumplimiento normativo y tecnología real.
                </p>
            </section>

            <section id="security" className="mt-16">
                <div className="flex items-center gap-3 mb-6">
                    <ShieldCheck className="w-8 h-8 text-iaeva-blue" />
                    <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white m-0">
                        1. Seguridad de Datos y Cumplimiento
                    </h2>
                </div>
                <p>
                    En salud, la confianza se basa en la protección de la información. Antes de mirar funcionalidades, filtra por seguridad.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">Soberanía de los Datos</h3>
                <ul className="space-y-4 mb-6">
                    <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                            <strong>Cumplimiento Normativo (RGPD):</strong> Tu proveedor DEBE garantizar el cumplimiento de las leyes locales. Solicita documentación.
                        </div>
                    </li>
                    <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                            <strong>Autoalojamiento (Self-Hosting):</strong> Prioriza soluciones que alojen datos en servidores bajo tu jurisdicción legal (ej. UE) para mayor control.
                        </div>
                    </li>
                </ul>

                <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-lg border border-green-200 dark:border-green-800 my-6">
                    <h4 className="font-bold text-green-800 dark:text-green-200 mb-2 flex items-center gap-2">
                        💡 IAEVA Insight
                    </h4>
                    <p className="text-sm">
                        Priorizamos el autoalojamiento en servidores seguros dentro del territorio legal exigido, administrados por nuestro equipo experto.
                    </p>
                </div>

                <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">Infraestructura Segura</h3>
                <p>Exige encriptación (en tránsito y reposo), backups regulares y auditorías de acceso.</p>

                <div className="bg-yellow-50 dark:bg-yellow-900/10 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800 mt-6">
                    <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">❓ Preguntas Clave para tu Proveedor</h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                        <li>¿Dónde se alojan físicamente los datos y bajo qué jurisdicción?</li>
                        <li>¿Cómo garantizan el cumplimiento RGPD/LOPD con documentación?</li>
                        <li>¿Quién tiene acceso a los datos dentro de su organización?</li>
                    </ul>
                </div>
            </section>

            <section id="tech" className="mt-16">
                <div className="flex items-center gap-3 mb-6">
                    <Cpu className="w-8 h-8 text-iaeva-blue" />
                    <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white m-0">
                        2. Tecnología: Más allá de lo genérico
                    </h2>
                </div>
                <p>
                    No todos los asistentes son iguales. El sector salud demanda control, personalización y fiabilidad superior a las herramientas de automatización básicas.
                </p>

                <InfographicBlock
                    title="Plataformas Genéricas vs. Especializadas"
                    type="comparison"
                    data={[
                        { traditional: "Automatización básica (Zapier, Make)", ai: "Workflows complejos (Dify, LangChain)" },
                        { traditional: "Respuestas predefinidas simples", ai: "Comprensión de contexto médico" },
                        { traditional: "Riesgo de 'alucinaciones' no controlado", ai: "Sistemas anti-alucinación (Langfuse)" },
                        { traditional: "Difícil de auditar", ai: "Trazabilidad completa de conversaciones" }
                    ]}
                />

                <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">Minimizando "Alucinaciones"</h3>
                <p>
                    Los modelos de IA pueden inventar información. Un proveedor responsable debe seleccionar el modelo adecuado y tener procesos de evaluación rigurosos.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-lg border border-blue-200 dark:border-blue-800 my-4">
                    <p className="text-sm">
                        <strong>IAEVA Insight:</strong> Evaluamos nuestros asistentes con herramientas como <strong>Langfuse</strong> para analizar comportamiento y minimizar riesgos.
                    </p>
                </div>
            </section>

            <section id="connectivity" className="mt-16">
                <div className="flex items-center gap-3 mb-6">
                    <Network className="w-8 h-8 text-iaeva-blue" />
                    <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white m-0">
                        3. Conectividad Total y Omnicanalidad
                    </h2>
                </div>
                <p>
                    Un asistente eficaz no opera aislado. Debe integrarse con los canales que usan tus pacientes y tus sistemas de gestión.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">WhatsApp Oficial</h3>
                <p>
                    La integración debe ser via <strong>WhatsApp Business API Oficial</strong>. Evita soluciones inestables no oficiales que ponen en riesgo tu número.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">Gestión Centralizada</h3>
                <p>
                    Imagina supervisar WhatsApp, Web Chat y otros canales desde un solo panel. Esto permite intervención humana fluida cuando es necesario.
                </p>
                <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-lg border border-green-200 dark:border-green-800 my-6">
                    <h4 className="font-bold text-green-800 dark:text-green-200 mb-2 flex items-center gap-2">
                        💡 IAEVA Insight
                    </h4>
                    <p className="text-sm">
                        Integramos <strong>Chatwoot</strong> autoalojado conectado con Dify, permitiendo gestión unificada y segura de todas las conversaciones.
                    </p>
                </div>
            </section>

            <section id="efficiency" className="mt-16">
                <div className="flex items-center gap-3 mb-6">
                    <Zap className="w-8 h-8 text-iaeva-blue" />
                    <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white m-0">
                        4. Potenciando la Eficiencia
                    </h2>
                </div>
                <p>
                    El asistente debe ser un motor de eficiencia: agendar, modificar y cancelar citas, además de enviar recordatorios proactivos para reducir el absentismo.
                </p>

                <InfographicBlock
                    title="Impacto en Eficiencia"
                    type="stat"
                    data={[
                        { value: "24/7", label: "Disponibilidad real de agenda" },
                        { value: "-40%", label: "Reducción típica de absentismo" },
                        { value: "100%", label: "Automatización de recordatorios" }
                    ]}
                />

                <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">Integración con Sistemas (HIS/EMR)</h3>
                <p>
                    Verifica si tu software actual tiene API abierta. Si no es viable la integración directa (costos, seguridad, sistemas legacy), busca enfoques modulares.
                </p>
                <p className="mt-4">
                    <strong>Enfoque Modular IAEVA:</strong> Ofrecemos un sistema de gestión de citas independiente que sincroniza con Google/Outlook Calendar, actuando como capa intermedia segura si no deseas tocar el núcleo de tu historial clínico.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">Asistentes de Voz (VAPI)</h3>
                <p>
                    Para clínicas a la vanguardia, la IA de voz puede gestionar llamadas entrantes, responder dudas y agendar citas hablando naturalmente con el paciente.
                </p>
            </section>

            <section id="checklist" className="mt-16 mb-24">
                <div className="flex items-center gap-3 mb-6">
                    <CheckSquare className="w-8 h-8 text-iaeva-blue" />
                    <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white m-0">
                        5. Checklist Final de Evaluación
                    </h2>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardContent className="pt-6">
                            <h4 className="font-bold text-lg mb-4 text-iaeva-blue">Seguridad</h4>
                            <ul className="space-y-2">
                                <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-gray-400 mt-0.5" /> <span>Cumplimiento RGPD demostrado</span></li>
                                <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-gray-400 mt-0.5" /> <span>Autoalojamiento / Servidores locales</span></li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <h4 className="font-bold text-lg mb-4 text-iaeva-blue">Tecnología</h4>
                            <ul className="space-y-2">
                                <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-gray-400 mt-0.5" /> <span>Plataformas especializadas (no genéricas)</span></li>
                                <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-gray-400 mt-0.5" /> <span>Estrategias anti-alucinación</span></li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <h4 className="font-bold text-lg mb-4 text-iaeva-blue">Funcionalidad</h4>
                            <ul className="space-y-2">
                                <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-gray-400 mt-0.5" /> <span>WhatsApp API Oficial & Omnicanalidad</span></li>
                                <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-gray-400 mt-0.5" /> <span>Gestión completa de citas y recordatorios</span></li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <div className="bg-iaeva-bg-dark text-white p-8 rounded-2xl text-center shadow-2xl relative overflow-hidden mt-12">
                    <div className="absolute inset-0 bg-gradient-to-r from-iaeva-blue/20 to-iaeva-teal/20"></div>
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-4">¿Listo para transformar tu práctica médica?</h3>
                        <p className="mb-8 text-gray-200 max-w-2xl mx-auto">
                            En IAEVA hemos construido nuestra solución pensando meticulosamente en cada punto de esta guía. Seguro, inteligente, integrado y adaptado a ti.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-white text-iaeva-bg-dark hover:bg-gray-100 font-bold px-8">
                                <a href="https://iaeva.com/contacto" target="_blank" rel="noreferrer">Contactar Ahora</a>
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" onClick={handleDownloadRequest}>
                                Descargar PDF Completo
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Download Modal */}
            <Dialog open={isDownloadModalOpen} onOpenChange={setIsDownloadModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Descargar la Guía Completa (PDF)</DialogTitle>
                        <DialogDescription>
                            Introduce tu email para recibir el PDF imprimible + Checklist de auditoría.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleFormSubmit} className="space-y-4 mt-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email profesional</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="tu@clinica.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="w-full bg-iaeva-blue hover:bg-iaeva-blue/90">
                            Enviar Guía a mi Correo
                        </Button>
                        <p className="text-xs text-center text-gray-500">
                            100% libre de spam. Puedes darte de baja cuando quieras.
                        </p>
                    </form>
                </DialogContent>
            </Dialog>
        </GuideLayout>
    );
};

export default GuiaEficienciaClinica;
