import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Calculator, MessageSquare } from 'lucide-react';

interface BlogCTAProps {
    category: string;
}

const BlogCTA = ({ category }: BlogCTAProps) => {
    const getCTAContent = (cat: string) => {
        switch (cat) {
            case 'Odontología':
                return {
                    title: 'Transforma tu Clínica Dental con IA',
                    description: 'Descubre cómo nuestro asistente especializado puede llenar tu agenda y reducir ausencias en tu consultorio dental.',
                    link: '/dental-clinic-assistant',
                    label: 'Ver Solución Dental',
                    icon: <Calendar className="w-6 h-6" />
                };
            case 'Gestión Médica':
            case 'Eficiencia':
            case 'Casos prácticos':
                return {
                    title: '¿Cuántas citas pierde tu centro al mes?',
                    description: 'Calcula exactamente cuánto dinero estás perdiendo por ausencias y llamadas no atendidas con nuestra calculadora ROI.',
                    link: '/calculadora-roi',
                    label: 'Calcular Pérdidas Ahora',
                    icon: <Calculator className="w-6 h-6" />
                };
            case 'Legal':
                return {
                    title: 'Cumplimiento AI Act Asegurado',
                    description: 'Nuestra tecnología cumple con todas las normativas europeas. Agenda una demo para ver la seguridad en acción.',
                    link: '/contacto',
                    label: 'Solicitar Demo Segura',
                    icon: <MessageSquare className="w-6 h-6" />
                }
            case 'Fisioterapia': // Assuming this might exist or be mapped
                return {
                    title: 'Asistente Virtual para Fisioterapeutas',
                    description: 'Permite que tus pacientes agenden 24/7 mientras tú te centras en la terapia. Sin interrupciones.',
                    link: '/asistente-ia-fisioterapia',
                    label: 'Ver Solución Fisioterapia',
                    icon: <Calendar className="w-6 h-6" />
                }
            default:
                return {
                    title: 'Moderniza la Atención al Paciente',
                    description: 'Implementa una recepcionista virtual inteligente que atiende llamadas, WhatsApp y agenda citas 24/7.',
                    link: '/recepcionista-virtual-medica',
                    label: 'Conocer a la Recepcionista Virtual',
                    icon: <MessageSquare className="w-6 h-6" />
                };
        }
    };

    const content = getCTAContent(category);

    return (
        <div className="my-12 bg-gradient-to-r from-iaeva-blue/10 to-iaeva-purple/10 border border-iaeva-blue/20 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-iaeva-blue/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-32 h-32 bg-iaeva-purple/20 rounded-full blur-2xl"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                <div>
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                        <div className="bg-white dark:bg-gray-800 p-2 rounded-lg text-iaeva-blue shadow-sm">
                            {content.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {content.title}
                        </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 max-w-xl">
                        {content.description}
                    </p>
                </div>
                <Link
                    to={content.link}
                    className="whitespace-nowrap inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white font-semibold hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                    {content.label}
                    <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
            </div>
        </div>
    );
};

export default BlogCTA;
