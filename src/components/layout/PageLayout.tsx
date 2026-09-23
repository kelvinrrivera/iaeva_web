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

        <script type="text/javascript">
          {`
            (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.eu/embed/embed.js", "init");
            Cal("init", "30min", {origin:"https://app.cal.eu"});
            
            Cal.ns["30min"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
          `}
        </script>
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