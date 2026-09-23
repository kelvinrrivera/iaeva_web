import React from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, Lock, Activity, Eye, FileCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const SafetyItem = ({ icon: Icon, text }: { icon: any, text: string }) => (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Icon className="w-6 h-6" />
        </div>
        <p className="text-gray-700 font-medium py-1">{text}</p>
    </div>
);

const SafetySection = () => {
    const { t } = useTranslation('home');

    return (
        <section className="py-16 bg-white border-t border-gray-100 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-green-50/50 rounded-full blur-3xl -z-10"></div>

            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
                            {t('safety.title')}
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SafetyItem icon={Activity} text={t('safety.item1')} />
                        <SafetyItem icon={Eye} text={t('safety.item2')} />
                        <SafetyItem icon={Shield} text={t('safety.item3')} />
                        <SafetyItem icon={Lock} text={t('safety.item4')} />
                    </div>

                    <div className="mt-12 p-6 bg-blue-50/50 rounded-2xl flex items-start gap-4 border border-blue-100/50">
                        <div className="p-2 bg-white rounded-full shadow-sm text-blue-600 shrink-0">
                            <FileCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-blue-900 mb-1">Tecnología Auditada</h3>
                            <p className="text-blue-800/80 text-sm leading-relaxed">
                                Nuestros modelos siguen estrictos protocolos de seguridad y no retienen información sensible fuera de los entornos conformes con la normativa vigente. Priorizamos la ética y la privacidad en cada interacción.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SafetySection;
