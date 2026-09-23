/**
 * Contacto — versión reducida (2026-09-23).
 *
 * La página anterior embebía un chat de IA en vivo (`IAEVAChat`) y un calendario de
 * Cal.com para agendar demostraciones. Ambos venían de la etapa en que IAEVA era un
 * servicio a medida: el camino del cliente era hablar con alguien y reservar una llamada.
 *
 * Con un SaaS autónomo ese camino es otro —registrarse y probar— así que los CTAs del
 * sitio llevan ahora a `app.iaeva.com/signup` y esta página deja de ser un destino.
 *
 * ## Por qué no se borra
 *
 * Tiene 57 impresiones y posición 11,47 en Search Console, y hay enlaces externos y
 * artículos del blog que apuntan aquí. Devolver un 404 desperdiciaría esas visitas y
 * dejaría enlaces rotos fuera de nuestro control.
 *
 * Así que la ruta sigue respondiendo, con `noindex` para que Google deje de ofrecerla, y
 * el contenido se reduce a lo único que un SaaS necesita: cómo escribirnos y cómo empezar.
 *
 * Cuando se decida abrir el chat o las demostraciones, se recupera de
 * `respaldo/estado-produccion-2026-09-23`.
 */

import { useTranslation } from 'react-i18next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Mail, ArrowRight } from 'lucide-react';
import SEOHead from '@/components/shared/SEOHead';
import { SIGNUP_URL } from '@/config/app-urls';

const Contacto = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Contacto | IAEVA"
        description="Escríbenos si tienes dudas sobre IAEVA, el asistente de agenda por WhatsApp para clínicas."
        // Fuera del índice: la vía de entrada es el registro, no esta página.
        noIndex
      />
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Hablamos?
          </h1>

          <p className="text-lg text-gray-600 mb-10">
            Puedes empezar a usar IAEVA ahora mismo, sin tarjeta y sin llamadas.
            Si prefieres preguntarnos algo antes, escríbenos.
          </p>

          <a
            href={SIGNUP_URL}
            className="inline-flex items-center px-8 py-4 rounded-full font-medium text-white bg-gradient-to-r from-iaeva-blue to-iaeva-purple hover:shadow-lg transition-all duration-300"
          >
            Empezar gratis
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>

          <div className="mt-14 pt-10 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">¿Dudas antes de empezar?</p>
            <a
              href="mailto:hola@iaeva.com"
              className="inline-flex items-center text-iaeva-blue hover:underline font-medium"
            >
              <Mail className="mr-2 h-5 w-5" />
              hola@iaeva.com
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contacto;
