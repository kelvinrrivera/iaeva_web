import { useTranslation } from 'react-i18next';
import PageLayout from '@/components/layout/PageLayout';
import SEOHead from '@/components/shared/SEOHead';

const PolitiqueDeConfidentialite = () => {
  const { t } = useTranslation(['common']);

  return (
    <PageLayout>
      <SEOHead 
        title="Politique de confidentialité | IAEVA"
        description="Politique de confidentialité d'IAEVA: assistant virtuel médical axé sur la protection des données sensibles du secteur de la santé."
        canonicalUrl="/politique-de-confidentialite"
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Politique de confidentialité</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Date de dernière mise à jour: 1 mai 2025
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>
              IAEVA est un assistant virtuel intelligent pour le secteur médical développé par KelvinScale Networks, S.L. ("nous", "notre" ou "KelvinScale"). Cette Politique de Confidentialité explique comment nous collectons, utilisons, traitons, transférons et protégeons les informations obtenues via la plateforme IAEVA, avec une attention particulière à la sensibilité des données médicales et du secteur de la santé.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Données que nous pouvons collecter</h2>
            <p>
              Selon l'utilisation que vous faites de notre plateforme et des services contractés, nous pouvons collecter:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Données d'identité:</strong> Nom, prénom, nom d'utilisateur ou identifiant similaire.</li>
              <li><strong>Données de contact:</strong> Adresse e-mail, numéro de téléphone, adresse postale.</li>
              <li><strong>Données d'utilisation:</strong> Informations sur la façon dont vous utilisez notre plateforme et services.</li>
              <li><strong>Données de configuration:</strong> Préférences et réglages effectués sur la plateforme.</li>
              <li><strong>Données opérationnelles:</strong> Informations générées par l'utilisation d'IAEVA dans votre centre médical, comme les statistiques de rendez-vous, annulations ou métriques d'interaction.</li>
            </ul>
            <p>
              <strong>Note importante sur les données médicales:</strong> IAEVA est conçu pour fonctionner comme un assistant dans des environnements médicaux, mais le système est configuré pour <strong>ne pas stocker de données médicales sensibles des patients</strong> par défaut. Tout traitement de données de santé nécessiterait une configuration explicite de la part du centre médical et serait soumis à des mesures de sécurité supplémentaires et des accords spécifiques pour se conformer aux réglementations applicables (RGPD, LOPD-GDD, HIPAA le cas échéant).
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Comment nous utilisons vos données</h2>
            <p>Nous utilisons les données collectées pour:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Fournir, exploiter et maintenir notre plateforme.</li>
              <li>Améliorer, personnaliser et étendre notre plateforme.</li>
              <li>Comprendre et analyser comment vous utilisez notre plateforme.</li>
              <li>Développer de nouveaux produits, services et fonctionnalités.</li>
              <li>Communiquer avec vous à des fins de service client, mises à jour et messages informatifs.</li>
              <li>Fournir un support technique et de la formation.</li>
              <li>Détecter, prévenir et résoudre les problèmes techniques.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Base légale du traitement</h2>
            <p>Nous traitons vos données personnelles sur les bases légales suivantes:</p>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Exécution d'un contrat:</strong> Lorsque c'est nécessaire pour respecter les conditions de service convenues.</li>
              <li><strong>Consentement:</strong> Lorsque vous nous avez donné votre consentement explicite pour une finalité spécifique.</li>
              <li><strong>Intérêts légitimes:</strong> Lorsque c'est nécessaire pour nos intérêts légitimes (amélioration des services, sécurité) et que vos droits fondamentaux ne prévalent pas.</li>
              <li><strong>Obligation légale:</strong> Lorsque c'est nécessaire pour nous conformer à une obligation légale.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Sécurité des données dans le secteur médical</h2>
            <p>
              Nous comprenons l'extrême sensibilité des données dans le secteur médical. Par conséquent, IAEVA met en œuvre:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Chiffrement de bout en bout</strong> dans toutes les communications.</li>
              <li><strong>Isolation des données</strong> par client (architecture multi-tenant sécurisée).</li>
              <li><strong>Stockage sur des serveurs situés dans l'UE</strong> pour les clients européens.</li>
              <li><strong>Accès basé sur les rôles</strong> avec authentification multifacteur.</li>
              <li><strong>Journaux d'audit</strong> détaillés pour toutes les opérations.</li>
              <li><strong>Évaluations de sécurité et tests de pénétration</strong> réguliers.</li>
              <li><strong>Option de déploiement sur infrastructure privée</strong> pour les centres médicaux ayant des exigences spécifiques.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Partage de données</h2>
            <p>
              Nous ne vendons ni ne louons vos données personnelles à des tiers. Nous pouvons partager des informations avec:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Prestataires de services:</strong> Entreprises qui nous aident à fournir nos services (hébergement, analyse, service client).</li>
              <li><strong>Entités affiliées:</strong> Entreprises de notre groupe qui respectent les mêmes normes de protection des données.</li>
              <li><strong>Par obligation légale:</strong> Lorsque nous y sommes obligés par la loi, une procédure judiciaire ou une demande gouvernementale.</li>
            </ul>
            <p>
              Tous nos fournisseurs et partenaires ont signé des accords de protection des données et respectent nos normes de sécurité et de confidentialité.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Transferts internationaux</h2>
            <p>
              Nous préférons traiter les données au sein de l'Espace Économique Européen (EEE). Lorsqu'il est nécessaire de transférer des données en dehors de l'EEE, nous le ferons en utilisant des mécanismes légaux appropriés tels que les Clauses Contractuelles Types ou les décisions d'adéquation.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Conservation des données</h2>
            <p>
              Nous conservons vos données personnelles uniquement pendant la durée nécessaire aux finalités établies dans cette politique, pour nous conformer aux obligations légales ou pendant la période nécessaire pour résoudre les litiges.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Vos droits</h2>
            <p>Selon votre localisation, vous pouvez avoir les droits suivants:</p>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Accès:</strong> Droit de savoir quelles données personnelles nous traitons vous concernant.</li>
              <li><strong>Rectification:</strong> Droit de demander la correction des données inexactes.</li>
              <li><strong>Suppression:</strong> Droit de demander l'effacement de vos données ("droit à l'oubli").</li>
              <li><strong>Limitation:</strong> Droit de demander la restriction du traitement de vos données.</li>
              <li><strong>Portabilité:</strong> Droit de recevoir vos données dans un format structuré.</li>
              <li><strong>Opposition:</strong> Droit de vous opposer au traitement basé sur l'intérêt légitime.</li>
              <li><strong>Retrait du consentement:</strong> Droit de retirer le consentement à tout moment.</li>
            </ul>
            <p>
              Pour exercer ces droits, contactez-nous à <a href="mailto:privacidad@kelvinscale.net" className="text-iaeva-blue hover:underline">privacidad@kelvinscale.net</a>.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Cookies et technologies similaires</h2>
            <p>
              Nous utilisons des cookies et des technologies similaires pour améliorer votre expérience sur notre plateforme. Pour plus d'informations, consultez notre <a href="/politique-des-cookies" className="text-iaeva-blue hover:underline">Politique des Cookies</a>.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">11. Modifications de cette politique</h2>
            <p>
              Nous pouvons mettre à jour cette politique périodiquement. Nous vous informerons de tout changement significatif en publiant la nouvelle politique sur cette page et, si les changements sont importants, nous fournirons un avis plus visible.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">12. Contact</h2>
            <p>
              Si vous avez des questions concernant cette politique ou nos pratiques de confidentialité, contactez-nous à:
            </p>
            <p className="mb-8">
              <strong>KelvinScale</strong><br />
              Attention: Délégué à la Protection des Données<br />
              Email: <a href="mailto:contacto@kelvinscale.net" className="text-iaeva-blue hover:underline">contacto@kelvinscale.net</a><br />
            </p>
            
            <hr className="my-12 border-gray-300" />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PolitiqueDeConfidentialite; 