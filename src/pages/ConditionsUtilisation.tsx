import { useTranslation } from 'react-i18next';
import PageLayout from '@/components/layout/PageLayout';
import SEOHead from '@/components/shared/SEOHead';

const ConditionsUtilisation = () => {
  const { t } = useTranslation(['common']);

  return (
    <PageLayout>
      <SEOHead 
        title="Conditions d'utilisation | IAEVA"
        description="Conditions d'utilisation d'IAEVA: assistant virtuel médical pour optimiser la gestion des rendez-vous et le service aux patients."
        canonicalUrl="/conditions-utilisation"
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Conditions d'utilisation</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Date de dernière mise à jour: 1 mai 2025
            </p>
            
            <p className="mb-6">
              Bienvenue sur IAEVA, un assistant virtuel intelligent pour le secteur médical développé par KelvinScale Networks, S.L. ("KelvinScale", "nous", "notre"). Ces Conditions d'Utilisation ("Conditions") régissent votre accès et utilisation de la plateforme IAEVA, y compris toute application, fonctionnalité, documentation et service associé (collectivement, la "Plateforme").
            </p>
            
            <p className="mb-6">
              En accédant ou en utilisant la Plateforme, vous acceptez ces Conditions et notre Politique de Confidentialité. Si vous n'acceptez pas ces Conditions, vous ne devez pas accéder ou utiliser la Plateforme.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Définitions</h2>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>"Client"</strong> désigne l'entité (clinique, hôpital, centre médical ou professionnel de santé) qui a souscrit à l'accès à IAEVA.</li>
              <li><strong>"Utilisateur"</strong> désigne toute personne qui accède ou utilise la Plateforme, que ce soit en tant qu'employé ou agent du Client.</li>
              <li><strong>"Contenu"</strong> désigne toute information, donnée, texte, logiciel, graphique ou matériel fourni par nous ou le Client en lien avec la Plateforme.</li>
              <li><strong>"Données du Client"</strong> désigne toute donnée, information ou matériel fourni ou soumis par le Client ou ses Utilisateurs via la Plateforme.</li>
              <li><strong>"Données du Patient"</strong> désigne toute information liée à la santé des patients ou utilisateurs finaux qui interagissent avec la Plateforme, si applicable selon la configuration du Client.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. La Plateforme IAEVA</h2>
            <p className="mb-4">
              IAEVA est un assistant virtuel intelligent conçu spécifiquement pour le secteur médical, qui aide à optimiser la gestion des rendez-vous, le service aux patients et l'efficacité opérationnelle des centres médicaux.
            </p>
            <p className="mb-6">
              IAEVA peut inclure des fonctionnalités comme:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Gestion et rappel automatisé des rendez-vous</li>
              <li>Service virtuel aux patients</li>
              <li>Optimisation des agendas médicaux</li>
              <li>Formulaires pré-consultation</li>
              <li>Outils d'assistance pour les professionnels médicaux</li>
              <li>Intégration avec les systèmes de dossiers médicaux</li>
              <li>Analyse et rapports opérationnels</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Comptes et inscription</h2>
            <p className="mb-4">
              Pour utiliser certaines fonctionnalités de la Plateforme, les Clients et Utilisateurs devront créer un compte. En créant un compte, vous devez fournir des informations précises et complètes. Il est de la responsabilité du Client et de ses Utilisateurs de maintenir la confidentialité des identifiants de connexion.
            </p>
            <p className="mb-6">
              Le Client est responsable de toutes les activités qui se produisent sous ses comptes d'Utilisateur et doit nous informer immédiatement de toute utilisation non autorisée ou violation de sécurité.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Licences et restrictions</h2>
            <h3 className="text-xl font-semibold mt-6 mb-3">4.1 Licence d'utilisation</h3>
            <p className="mb-4">
              Sous réserve de ces Conditions et du paiement de tous les frais applicables, KelvinScale accorde au Client une licence limitée, non exclusive, non transférable et révocable pour:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Accéder et utiliser la Plateforme pour ses opérations internes</li>
              <li>Permettre à ses Utilisateurs autorisés d'accéder et d'utiliser la Plateforme</li>
              <li>Utiliser la documentation fournie dans le cadre de la Plateforme</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">4.2 Restrictions</h3>
            <p className="mb-4">
              Le Client et ses Utilisateurs ne doivent pas:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Accorder des sous-licences, vendre, transférer, céder, distribuer ou exploiter commercialement la Plateforme</li>
              <li>Modifier, adapter, pirater ou altérer la Plateforme</li>
              <li>Effectuer de l'ingénierie inverse, décompiler ou tenter d'extraire le code source</li>
              <li>Utiliser la Plateforme pour stocker ou transmettre du matériel illégal ou diffamatoire</li>
              <li>Utiliser la Plateforme pour stocker ou transmettre des virus ou du code malveillant</li>
              <li>Interférer avec ou perturber l'intégrité ou les performances de la Plateforme</li>
              <li>Tenter d'obtenir un accès non autorisé à la Plateforme ou à ses systèmes</li>
              <li>Utiliser la Plateforme d'une manière qui viole les lois applicables, y compris les lois sur la protection des données et la vie privée</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">4.3 Spécificité médicale</h3>
            <p className="mb-6">
              Le Client reconnaît spécifiquement qu'IAEVA est un outil de support et ne remplace pas le jugement médical professionnel. Les Clients et Utilisateurs sont seuls responsables de:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Vérifier toute information fournie par IAEVA avant de prendre des décisions cliniques</li>
              <li>Obtenir le consentement approprié des patients pour l'utilisation d'IAEVA lorsque nécessaire</li>
              <li>Se conformer à toutes les réglementations sanitaires applicables</li>
              <li>Maintenir la confidentialité et la sécurité appropriées dans le traitement des informations médicales</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Propriété intellectuelle</h2>
            <p className="mb-4">
              KelvinScale et ses concédants possèdent tous les droits, titres et intérêts sur la Plateforme, y compris tous les droits de propriété intellectuelle associés. Ces Conditions n'accordent au Client aucune propriété sur la Plateforme.
            </p>
            <p className="mb-4">
              Le Client conserve tous les droits, titres et intérêts sur les Données du Client. KelvinScale peut utiliser les Données du Client de manière anonyme et agrégée pour améliorer la Plateforme, à condition que cette utilisation n'identifie pas le Client ou ses patients.
            </p>
            <p className="mb-6">
              Le Client accorde à KelvinScale une licence mondiale, non exclusive, libre de redevances pour utiliser, modifier, reproduire et distribuer les Données du Client exclusivement pour fournir et améliorer la Plateforme.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Confidentialité et sécurité des données médicales</h2>
            <p className="mb-4">
              Nous reconnaissons l'extrême sensibilité des données médicales. Nous nous engageons à:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Mettre en œuvre des mesures de sécurité techniques et organisationnelles appropriées</li>
              <li>Traiter les Données du Client uniquement conformément aux instructions documentées du Client</li>
              <li>Garantir que les personnes autorisées à traiter les données s'engagent à respecter la confidentialité</li>
              <li>Aider le Client à respecter ses obligations concernant les droits des personnes concernées</li>
              <li>Supprimer ou restituer toutes les données personnelles au Client après la prestation des services</li>
              <li>Fournir au Client toutes les informations nécessaires pour démontrer la conformité</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Disponibilité et support</h2>
            <p className="mb-4">
              Nous nous efforçons de maintenir la Plateforme disponible 24h/24 et 7j/7, mais ne garantissons pas que la Plateforme sera disponible sans interruption ou erreur. Nous effectuerons des maintenances programmées et vous en informerons à l'avance dans la mesure du possible.
            </p>
            <p className="mb-6">
              Nous fournissons un support technique selon les termes de l'accord de niveau de service souscrit par le Client.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Responsabilité professionnelle et limitations</h2>
            <p className="mb-4">
              IAEVA est un outil d'assistance et ne peut pas remplacer le jugement professionnel dans le domaine médical. KelvinScale ne pratique pas la médecine et ne fournit pas de services médicaux.
            </p>
            <p className="mb-4">
              <strong>IAEVA N'EST PAS CONÇU POUR FOURNIR DES DIAGNOSTICS MÉDICAUX</strong>, et ne doit pas être utilisé comme seul moyen pour prendre des décisions cliniques ou de traitement.
            </p>
            <p className="mb-6">
              Les professionnels de santé doivent exercer leur jugement professionnel indépendant dans l'interprétation et l'utilisation de toute information fournie par IAEVA.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Limitation de responsabilité</h2>
            <p className="mb-4">
              Dans la mesure maximale autorisée par la loi, KelvinScale ne sera pas responsable des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs, y compris la perte de bénéfices, de revenus, de données ou d'utilisation, découlant de ou liés à ces Conditions ou à la Plateforme.
            </p>
            <p className="mb-6">
              La responsabilité totale de KelvinScale pour les réclamations découlant de ou liées à ces Conditions ou à la Plateforme, que ce soit par contrat, délit ou toute autre théorie juridique, ne dépassera pas les frais payés par le Client au cours des 12 mois précédant l'événement donnant lieu à cette responsabilité.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Résiliation</h2>
            <p className="mb-4">
              Le Client peut cesser d'utiliser la Plateforme à tout moment. KelvinScale peut résilier ou suspendre l'accès du Client à la Plateforme pour violation substantielle de ces Conditions.
            </p>
            <p className="mb-6">
              Après la résiliation, le Client doit cesser d'utiliser la Plateforme et KelvinScale peut supprimer toute Donnée du Client après la période de conservation spécifiée dans notre Politique de Confidentialité, sauf si la conservation est requise par la loi ou convenue autrement.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">11. Modifications de ces conditions</h2>
            <p className="mb-6">
              KelvinScale peut modifier ces Conditions de temps à autre. Nous vous informerons de tout changement significatif et vous donnerons l'opportunité de réviser les conditions modifiées avant leur entrée en vigueur. Votre utilisation continue de la Plateforme après la date effective de toute modification constitue votre acceptation des Conditions modifiées.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">12. Loi applicable et résolution des litiges</h2>
            <p className="mb-4">
              Ces Conditions seront régies et interprétées conformément aux lois d'Espagne, sans tenir compte de ses dispositions relatives aux conflits de lois.
            </p>
            <p className="mb-6">
              Tout litige découlant de ou en relation avec ces Conditions sera résolu définitivement par arbitrage conformément aux règles de la Cour Espagnole d'Arbitrage. Le lieu de l'arbitrage sera Séville, Espagne. La langue de l'arbitrage sera l'espagnol.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">13. Contact</h2>
            <p className="mb-6">
              Si vous avez des questions concernant ces Conditions, vous pouvez nous contacter à:
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

export default ConditionsUtilisation; 