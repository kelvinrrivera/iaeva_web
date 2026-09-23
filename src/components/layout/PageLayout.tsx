import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import Footer from './Footer';
import { organizationSchema } from '@/lib/schema';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Layout base para las páginas de la aplicación
 * Incluye el navbar y footer con contenido flexible en el centro
 * Asegura que todas las páginas tengan la información básica de organización para SEO
 */
const PageLayout: React.FC<PageLayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen flex flex-col bg-background ${className}`}>
      <Helmet>
        {/* Asegurar que todas las páginas incluyen la información de organización */}
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>

        {/*
          Script de Cal.com retirado (2026-09-23, T28).

          Se inyectaba en **todas** las páginas desde aquí, y cargaba un script de un
          tercero (`app.cal.eu`) en cada visita. El calendario de reserva de demos ya se
          retiró al adaptar el producto al modelo SaaS, así que no quedaba nada que
          mostrar: solo la petición externa.

          Importa por dos motivos. Uno de privacidad: es un tercero que ve la IP de cada
          visitante sin que nadie lo haya consentido, y sin él la landing **no necesita
          banner de cookies** porque no queda ningún tracker. Y uno de rendimiento: una
          petición bloqueante a otro dominio en cada carga.

          Si vuelven las demos agendadas, el script se carga solo en la página que lo use,
          no en todas.
        */}
      </Helmet>

      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout; 