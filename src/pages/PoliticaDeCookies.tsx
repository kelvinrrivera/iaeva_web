import { useTranslation } from 'react-i18next';
import PageLayout from '@/components/layout/PageLayout';
import SEOHead from '@/components/shared/SEOHead';

const PoliticaDeCookies = () => {
  const { t } = useTranslation(['common']);

  return (
    <PageLayout>
      <SEOHead 
        title="Política de cookies | IAEVA"
        description="Política de cookies de IAEVA: información sobre cómo utilizamos cookies y tecnologías similares en nuestra plataforma."
        canonicalUrl="/politica-de-cookies"
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Política de cookies</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Fecha de última actualización: 1 de mayo de 2025
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. ¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (ordenador, tableta o móvil) cuando visita un sitio web. Las cookies son ampliamente utilizadas para hacer que los sitios web funcionen de manera más eficiente, proporcionar información a los propietarios del sitio y mejorar la experiencia del usuario.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Tipos de cookies que utilizamos</h2>
            <p>
              IAEVA utiliza diferentes tipos de cookies por diversas razones:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento básico del sitio web. Le permiten navegar por el sitio y utilizar sus funciones. Sin estas cookies, no podríamos proporcionar los servicios que ha solicitado.</li>
              <li><strong>Cookies de rendimiento:</strong> Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web recopilando información de forma anónima. Esto nos permite mejorar continuamente nuestro sitio y su experiencia.</li>
              <li><strong>Cookies de funcionalidad:</strong> Permiten al sitio web recordar las elecciones que usted hace (como su nombre de usuario, idioma o región) y proporcionar funciones más personales.</li>
              <li><strong>Cookies de publicidad/seguimiento:</strong> Utilizadas para entregar publicidad más relevante para usted y sus intereses, limitar el número de veces que ve un anuncio y ayudar a medir la efectividad de las campañas publicitarias.</li>
              <li><strong>Cookies de medios sociales:</strong> Permiten que el sitio web interactúe con servicios de redes sociales como Facebook, Twitter o LinkedIn.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Cookies específicas que utilizamos</h2>
            <p>
              A continuación, se detallan las cookies específicas que utilizamos en nuestro sitio web:
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">3.1 Cookies esenciales</h3>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>i18next:</strong> Almacena sus preferencias de idioma.</li>
              <li><strong>auth:</strong> Gestiona su sesión de autenticación.</li>
              <li><strong>CSRF-Token:</strong> Ayuda a proteger contra ataques de falsificación de solicitudes entre sitios.</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">3.2 Cookies de rendimiento</h3>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>_ga, _gid, _gat (Google Analytics):</strong> Recopilan información sobre cómo utiliza nuestro sitio web. Todas las informaciones recopiladas son anónimas.</li>
              <li><strong>hotjar:</strong> Ayuda a entender cómo los usuarios interactúan con nuestro sitio mediante análisis de comportamiento.</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">3.3 Cookies de funcionalidad</h3>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>preferences:</strong> Recuerda sus preferencias de visualización y personalización.</li>
              <li><strong>recently_viewed:</strong> Mantiene un registro de las páginas que ha visitado recientemente.</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">3.4 Cookies de publicidad/seguimiento</h3>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>_fbp (Facebook Pixel):</strong> Utilizado por Facebook para ofrecer una serie de productos publicitarios.</li>
              <li><strong>_gcl_au (Google AdSense):</strong> Utilizado por Google AdSense para experimentar con la eficiencia publicitaria.</li>
              <li><strong>ads/ga-audiences (Google Ads):</strong> Utilizado por Google Ads para reconectar con visitantes que tienen probabilidades de convertirse en clientes.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Control de cookies</h2>
            <p>
              Puede decidir si acepta o rechaza las cookies. La mayoría de los navegadores web aceptan cookies automáticamente, pero normalmente puede modificar la configuración de su navegador para rechazar cookies si lo prefiere. Esto podría afectar a la funcionalidad de nuestro sitio web.
            </p>
            <p className="mb-6">
              Puede configurar o ajustar los controles de su navegador para que le notifique cuando recibe una cookie, o puede elegir rechazar automáticamente ciertos tipos de cookies. Consulte la sección de ayuda de su navegador para obtener más información:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Chrome: <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-iaeva-blue hover:underline">https://support.google.com/chrome/answer/95647</a></li>
              <li>Firefox: <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-iaeva-blue hover:underline">https://support.mozilla.org/es/kb/cookies</a></li>
              <li>Safari: <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-iaeva-blue hover:underline">https://support.apple.com/es-es/guide/safari/sfri11471/mac</a></li>
              <li>Edge: <a href="https://support.microsoft.com/es-es/help/4468242/microsoft-edge-browsing-data-and-privacy" target="_blank" rel="noopener noreferrer" className="text-iaeva-blue hover:underline">https://support.microsoft.com/es-es/help/4468242</a></li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Uso de servicios de terceros</h2>
            <p>
              Utilizamos servicios de terceros en nuestro sitio web, como Google Analytics, Facebook Pixel y HotJar, que también utilizan cookies. Estos servicios nos ayudan a mejorar nuestro sitio web y a ofrecerle una mejor experiencia de usuario.
            </p>
            <p className="mb-6">
              Para más información sobre cómo estos servicios utilizan cookies, visite sus respectivas políticas de privacidad y cookies:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Google Analytics: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-iaeva-blue hover:underline">https://policies.google.com/privacy</a></li>
              <li>Facebook: <a href="https://www.facebook.com/policy/cookies" target="_blank" rel="noopener noreferrer" className="text-iaeva-blue hover:underline">https://www.facebook.com/policy/cookies</a></li>
              <li>HotJar: <a href="https://help.hotjar.com/hc/en-us/articles/115011789248-Hotjar-Cookie-Information" target="_blank" rel="noopener noreferrer" className="text-iaeva-blue hover:underline">https://help.hotjar.com/hc/en-us/articles/115011789248</a></li>
      </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Cambios en nuestra política de cookies</h2>
            <p>
              Podemos actualizar nuestra Política de Cookies ocasionalmente. Le notificaremos cualquier cambio publicando la nueva Política de Cookies en esta página. Le recomendamos que consulte periódicamente esta Política de Cookies para estar informado sobre cómo utilizamos las cookies.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contacto</h2>
            <p className="mb-6">
              Si tiene alguna pregunta sobre nuestra Política de Cookies, contáctenos en:
            </p>
            <p className="mb-8">
              <strong>KelvinScale</strong><br />
              Email: <a href="mailto:contacto@kelvinscale.net" className="text-iaeva-blue hover:underline">contacto@kelvinscale.net</a><br />
            </p>
            
            <hr className="my-12 border-gray-300" />
            
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} KelvinScale - Todos los derechos reservados.
            </p>
          </div>
        </div>
    </div>
    </PageLayout>
  );
};

export default PoliticaDeCookies;
