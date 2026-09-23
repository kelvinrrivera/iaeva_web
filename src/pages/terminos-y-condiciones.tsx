import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PageLayout from '@/components/layout/PageLayout';
import SEOHead from '@/components/shared/SEOHead';
import { organizationSchema, socialProfiles } from '@/lib/schema';

const TermsAndConditions = () => {
  const { t } = useTranslation('common');
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Breadcrumbs for SEO
  const breadcrumbs = [
    { name: t('navbar.home'), url: "/" },
    { name: "Términos y condiciones", url: "/terminos-y-condiciones" }
  ];
  
  return (
    <PageLayout>
      <SEOHead 
        title="Términos y condiciones | IAEVA"
        description="Términos y condiciones de uso de IAEVA, el asistente virtual para el sector sanitario. Conozca las normas que rigen el uso de nuestros servicios y herramientas."
        canonicalUrl="/terminos-y-condiciones"
        ogImage="/images/legal-og-image.jpg"
        keywords="términos uso IAEVA, condiciones servicio, términos legales, políticas uso asistente virtual, acuerdo usuario IAEVA"
        structuredData={[organizationSchema]}
        socialProfiles={socialProfiles}
        breadcrumbs={breadcrumbs}
        hreflang={[
          { lang: 'es', url: '/terminos-y-condiciones' },
          { lang: 'fr', url: '/fr/conditions-utilisation' }
        ]}
      />
      
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Términos y condiciones</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-500 mb-8">Última actualización: 1 de junio de 2023</p>
              
              <p>Bienvenido a IAEVA. Los siguientes términos y condiciones rigen el uso de nuestro sitio web, aplicaciones, herramientas y servicios. Al acceder o utilizar IAEVA, usted acepta estar legalmente vinculado por estos términos y condiciones. Si no está de acuerdo con alguno de estos términos, no deberá utilizar nuestros servicios.</p>
              
              <h2>1. Definiciones</h2>
              <ul>
                <li><strong>"IAEVA"</strong> se refiere a nuestro sitio web, aplicaciones, herramientas y servicios operados por IAEVA Technolgies S.L.</li>
                <li><strong>"Usuario"</strong> se refiere a cualquier individuo o entidad que acceda o utilice IAEVA.</li>
                <li><strong>"Contenido"</strong> se refiere a toda la información, texto, gráficos, imágenes, y otros materiales que puedan ser vistos o accedidos a través de IAEVA.</li>
              </ul>
              
              <h2>2. Uso del servicio</h2>
              <p>IAEVA proporciona herramientas y servicios destinados a profesionales sanitarios y pacientes. Usted se compromete a utilizar nuestros servicios únicamente para fines legítimos y de acuerdo con estos términos y condiciones.</p>
              
              <h3>2.1 Restricciones de uso</h3>
              <p>Usted acepta no:</p>
              <ul>
                <li>Utilizar IAEVA para cualquier propósito ilegal o prohibido por estos términos.</li>
                <li>Intentar acceder, alterar o interferir con la seguridad, integridad o disponibilidad de IAEVA.</li>
                <li>Utilizar robots, spiders, scrapers u otros medios automáticos para acceder a IAEVA sin nuestro permiso expreso.</li>
                <li>Eludir las limitaciones técnicas de IAEVA o descompilar, desensamblar o aplicar ingeniería inversa a cualquier software o código utilizado en IAEVA.</li>
              </ul>
              
              <h2>3. Cuentas de usuario</h2>
              <p>Algunas funciones de IAEVA pueden requerir registro. Al crear una cuenta, usted acepta proporcionar información precisa y completa. Usted es responsable de mantener la confidencialidad de su contraseña y de todas las actividades que ocurran bajo su cuenta.</p>
              
              <h2>4. Propiedad intelectual</h2>
              <p>IAEVA y su contenido son propiedad de IAEVA Technologies S.L. y están protegidos por leyes de propiedad intelectual. No se concede ningún derecho o licencia sobre nuestro contenido excepto el derecho a utilizar IAEVA de acuerdo con estos términos.</p>
              
              <h2>5. Limitación de responsabilidad</h2>
              <p>IAEVA se proporciona "tal cual" y "según disponibilidad". No garantizamos que IAEVA sea ininterrumpido, seguro o libre de errores. En la medida máxima permitida por la ley, IAEVA Technologies S.L. no será responsable por daños directos, indirectos, incidentales, especiales, consecuentes o punitivos relacionados con el uso o imposibilidad de uso de IAEVA.</p>
              
              <h3>5.1 Uso médico</h3>
              <p>Las herramientas y calculadoras proporcionadas por IAEVA están diseñadas como ayudas informativas y no sustituyen el consejo, diagnóstico o tratamiento médico profesional. Siempre consulte a un profesional de la salud cualificado para cuestiones médicas.</p>
              
              <h2>6. Indemnización</h2>
              <p>Usted acepta indemnizar y mantener indemne a IAEVA Technologies S.L. y sus directores, empleados y agentes de cualquier reclamación o demanda, incluyendo honorarios razonables de abogados, hecha por terceros debido a su violación de estos términos.</p>
              
              <h2>7. Enlaces a terceros</h2>
              <p>IAEVA puede contener enlaces a sitios web o servicios de terceros. Estos enlaces se proporcionan únicamente para su conveniencia. IAEVA Technologies S.L. no respalda ni tiene control sobre el contenido de estos sitios y no será responsable de cualquier daño o pérdida relacionada con su uso.</p>
              
              <h2>8. Modificaciones</h2>
              <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Es su responsabilidad revisar periódicamente estos términos. Su uso continuado de IAEVA después de cualquier modificación constituye su aceptación de los nuevos términos.</p>
              
              <h2>9. Ley aplicable</h2>
              <p>Estos términos se regirán e interpretarán de acuerdo con las leyes de España, sin tener en cuenta sus principios de conflicto de leyes.</p>
              
              <h2>10. Contacto</h2>
              <p>Si tiene alguna pregunta sobre estos términos, por favor contáctenos a través de legal@iaeva.com.</p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default TermsAndConditions; 