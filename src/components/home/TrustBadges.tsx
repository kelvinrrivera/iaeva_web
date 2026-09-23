import React from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, Award, Check, Clock, ArrowDown, Lock, Globe } from 'lucide-react';

const TrustBadges = () => {
  const { t } = useTranslation('home');

  return (
    <section className="py-8 bg-gray-50 dark:bg-gray-900 border-t border-b border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {/* Elemento de confianza: Reducción de ausencias */}
          <div className="flex items-center gap-3">
            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
              <ArrowDown className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{t('trust_badges.absences.value')}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{t('trust_badges.absences.label')}</div>
            </div>
          </div>

          {/* Elemento de confianza: Seguridad de datos */}
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
              <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">{t('trust_badges.security.value')}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{t('trust_badges.security.label')}</div>
            </div>
          </div>

          {/* Elemento de confianza: Multilingüe */}
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-lg">
              <Globe className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">{t('trust_badges.multilingual.value')}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{t('trust_badges.multilingual.label')}</div>
            </div>
          </div>

          {/* Elemento de confianza: Atención */}
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
              <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">{t('trust_badges.support.value')}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{t('trust_badges.support.label')}</div>
            </div>
          </div>

          {/* Elemento de confianza: Eficiencia */}
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-lg">
              <Award className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">{t('trust_badges.efficiency.value')}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{t('trust_badges.efficiency.label')}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-[10px] text-gray-400 dark:text-gray-500 max-w-3xl mx-auto italic">
            {t('metrics_disclaimer')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
