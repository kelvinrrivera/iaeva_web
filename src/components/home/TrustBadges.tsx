// Nuevo archivo: src/components/home/TrustBadges.tsx
import React from 'react';
import { Shield, Award, Check, Clock } from 'lucide-react';

const TrustBadges = () => {
  return (
    <section className="py-8 bg-gray-50 dark:bg-gray-900 border-t border-b border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {/* Elemento de confianza: Satisfacción */}
          <div className="flex items-center gap-3">
            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
              <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">97%</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Satisfacción pacientes</div>
            </div>
          </div>
          
          {/* Elemento de confianza: RGPD */}
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
              <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">Cumple RGPD</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Datos protegidos</div>
            </div>
          </div>
          
          {/* Elemento de confianza: Atención */}
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
              <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">Soporte 24/7</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Asistencia continua</div>
            </div>
          </div>
          
          {/* Elemento de confianza: Premiado */}
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-lg">
              <Award className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">Premio 2024</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Innovación en Salud</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
