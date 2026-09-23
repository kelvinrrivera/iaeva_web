import { useTranslation } from 'react-i18next';
import PageLayout from '@/components/layout/PageLayout';
import SEOHead from '@/components/shared/SEOHead';

const PolitiqueDesCookies = () => {
  const { t } = useTranslation(['common']);

  return (
    <PageLayout>
      <SEOHead 
        title="Politique des cookies | IAEVA"
        description="Politique des cookies d'IAEVA: informations sur la façon dont nous utilisons les cookies et technologies similaires sur notre plateforme."
        canonicalUrl="/politique-des-cookies"
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Politique des cookies</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Date de dernière mise à jour: 1 mai 2025
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Que sont les cookies?</h2>
            <p>
              Les cookies sont de petits fichiers texte qui sont stockés sur votre appareil (ordinateur, tablette ou mobile) lorsque vous visitez un site web. Les cookies sont largement utilisés pour faire fonctionner les sites web de manière plus efficace, fournir des informations aux propriétaires du site et améliorer l'expérience utilisateur.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Types de cookies que nous utilisons</h2>
            <p>
              IAEVA utilise différents types de cookies pour diverses raisons:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Cookies essentiels:</strong> Nécessaires au fonctionnement de base du site web. Ils vous permettent de naviguer sur le site et d'utiliser ses fonctionnalités. Sans ces cookies, nous ne pourrions pas fournir les services que vous avez demandés.</li>
              <li><strong>Cookies de performance:</strong> Ils nous aident à comprendre comment les visiteurs interagissent avec notre site web en recueillant des informations de manière anonyme. Cela nous permet d'améliorer continuellement notre site et votre expérience.</li>
              <li><strong>Cookies de fonctionnalité:</strong> Ils permettent au site web de se souvenir des choix que vous faites (comme votre nom d'utilisateur, langue ou région) et de fournir des fonctionnalités plus personnalisées.</li>
              <li><strong>Cookies de publicité/suivi:</strong> Utilisés pour diffuser des publicités plus pertinentes pour vous et vos intérêts, limiter le nombre de fois que vous voyez une publicité et aider à mesurer l'efficacité des campagnes publicitaires.</li>
              <li><strong>Cookies de médias sociaux:</strong> Ils permettent au site web d'interagir avec les services de réseaux sociaux comme Facebook, Twitter ou LinkedIn.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Cookies spécifiques que nous utilisons</h2>
            <p>
              Voici les cookies spécifiques que nous utilisons sur notre site web:
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">3.1 Cookies essentiels</h3>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>i18next:</strong> Stocke vos préférences linguistiques.</li>
              <li><strong>auth:</strong> Gère votre session d'authentification.</li>
              <li><strong>CSRF-Token:</strong> Aide à protéger contre les attaques de falsification de requêtes intersites.</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">3.2 Cookies de performance</h3>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>_ga, _gid, _gat (Google Analytics):</strong> Recueillent des informations sur la façon dont vous utilisez notre site web. Toutes les informations recueillies sont anonymes.</li>
              <li><strong>hotjar:</strong> Aide à comprendre comment les utilisateurs interagissent avec notre site grâce à l'analyse comportementale.</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">3.3 Cookies de fonctionnalité</h3>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>preferences:</strong> Mémorise vos préférences d'affichage et de personnalisation.</li>
              <li><strong>recently_viewed:</strong> Conserve un registre des pages que vous avez récemment visitées.</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">3.4 Cookies de publicité/suivi</h3>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>_fbp (Facebook Pixel):</strong> Utilisé par Facebook pour offrir une série de produits publicitaires.</li>
              <li><strong>_gcl_au (Google AdSense):</strong> Utilisé par Google AdSense pour expérimenter l'efficacité publicitaire.</li>
              <li><strong>ads/ga-audiences (Google Ads):</strong> Utilisé par Google Ads pour reconnecter avec les visiteurs susceptibles de devenir clients.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Contrôle des cookies</h2>
            <p>
              Vous pouvez décider si vous acceptez ou refusez les cookies. La plupart des navigateurs web acceptent automatiquement les cookies, mais vous pouvez généralement modifier les paramètres de votre navigateur pour refuser les cookies si vous le préférez. Cela pourrait affecter la fonctionnalité de notre site web.
            </p>
            <p className="mb-6">
              Vous pouvez configurer ou ajuster les contrôles de votre navigateur pour être notifié lorsque vous recevez un cookie, ou vous pouvez choisir de rejeter automatiquement certains types de cookies. Consultez la section d'aide de votre navigateur pour plus d'informations:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Chrome: <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-iaeva-blue hover:underline">https://support.google.com/chrome/answer/95647</a></li>
              <li>Firefox: <a href="https://support.mozilla.org/fr/kb/protection-renforcee-contre-pistage-firefox-ordinateur" target="_blank" rel="noopener noreferrer" className="text-iaeva-blue hover:underline">https://support.mozilla.org/fr/kb/cookies</a></li>
              <li>Safari: <a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-iaeva-blue hover:underline">https://support.apple.com/fr-fr/guide/safari/sfri11471/mac</a></li>
              <li>Edge: <a href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-iaeva-blue hover:underline">https://support.microsoft.com/fr-fr/microsoft-edge</a></li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Utilisation des services tiers</h2>
            <p>
              Nous utilisons des services tiers sur notre site web, tels que Google Analytics, Facebook Pixel et HotJar, qui utilisent également des cookies. Ces services nous aident à améliorer notre site web et à vous offrir une meilleure expérience utilisateur.
            </p>
            <p className="mb-6">
              Pour plus d'informations sur la façon dont ces services utilisent les cookies, consultez leurs politiques de confidentialité et de cookies respectives:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Google Analytics: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-iaeva-blue hover:underline">https://policies.google.com/privacy</a></li>
              <li>Facebook: <a href="https://www.facebook.com/policy/cookies" target="_blank" rel="noopener noreferrer" className="text-iaeva-blue hover:underline">https://www.facebook.com/policy/cookies</a></li>
              <li>HotJar: <a href="https://help.hotjar.com/hc/en-us/articles/115011789248-Hotjar-Cookie-Information" target="_blank" rel="noopener noreferrer" className="text-iaeva-blue hover:underline">https://help.hotjar.com/hc/en-us/articles/115011789248</a></li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Modifications de notre politique de cookies</h2>
            <p>
              Nous pouvons mettre à jour notre Politique de Cookies occasionnellement. Nous vous informerons de tout changement en publiant la nouvelle Politique de Cookies sur cette page. Nous vous recommandons de consulter périodiquement cette Politique de Cookies pour être informé de la façon dont nous utilisons les cookies.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact</h2>
            <p className="mb-6">
              Si vous avez des questions concernant notre Politique de Cookies, contactez-nous à:
            </p>
            <p className="mb-8">
              <strong>KelvinScale</strong><br />
              Email: <a href="mailto:contacto@kelvinscale.net" className="text-iaeva-blue hover:underline">contacto@kelvinscale.net</a><br />
            </p>
            
            <hr className="my-12 border-gray-300" />
            
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} KelvinScale - Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PolitiqueDesCookies; 