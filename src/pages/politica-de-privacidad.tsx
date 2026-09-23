import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PageLayout from '@/components/layout/PageLayout';
import SEOHead from '@/components/shared/SEOHead';
import { organizationSchema, socialProfiles } from '@/lib/schema';

const PrivacyPolicy = () => {
  const { t } = useTranslation('common');
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Breadcrumbs for SEO
  const breadcrumbs = [
    { name: t('navbar.home'), url: "/" },
    { name: "Política de privacidad", url: "/politica-de-privacidad" }
  ];
  
  return (
    <PageLayout>
      <SEOHead 
        title="Política de privacidad | IAEVA"
        description="Política de privacidad de IAEVA. Conozca cómo recopilamos, utilizamos y protegemos sus datos personales cuando utiliza nuestros servicios y herramientas."
        canonicalUrl="/politica-de-privacidad"
        ogImage="/images/legal-og-image.jpg"
        keywords="privacidad IAEVA, protección datos, política privacidad asistente virtual, RGPD IAEVA, datos personales"
        structuredData={[organizationSchema]}
        socialProfiles={socialProfiles}
        breadcrumbs={breadcrumbs}
        hreflang={[
          { lang: 'es', url: '/politica-de-privacidad' },
          { lang: 'fr', url: '/fr/politique-de-confidentialite' }
        ]}
      />
      
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Política de privacidad</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-500 mb-8">Última actualización: 1 de junio de 2023</p>
              
              <p>En IAEVA, respetamos su privacidad y nos comprometemos a proteger sus datos personales. Esta política de privacidad le informará sobre cómo cuidamos sus datos personales cuando visita nuestro sitio web o utiliza nuestros servicios, y le informará sobre sus derechos de privacidad y cómo la ley le protege.</p>
              
              <h2>1. Información importante y quiénes somos</h2>
              <p>Esta política de privacidad se aplica a todos los datos personales procesados por IAEVA Technologies S.L. a través de nuestro sitio web, aplicaciones, herramientas y servicios.</p>
              
              <h2>2. Los datos que recopilamos sobre usted</h2>
              <p>Podemos recopilar, utilizar, almacenar y transferir diferentes tipos de datos personales sobre usted:</p>
              <ul>
                <li><strong>Datos de identidad:</strong> Nombre, apellidos, nombre de usuario o identificador similar.</li>
                <li><strong>Datos de contacto:</strong> Dirección de correo electrónico y números de teléfono.</li>
                <li><strong>Datos técnicos:</strong> Dirección IP, datos de inicio de sesión, tipo y versión del navegador, configuración de zona horaria y ubicación, tipos y versiones de plug-ins del navegador, sistema operativo y plataforma.</li>
                <li><strong>Datos de perfil:</strong> Su nombre de usuario y contraseña, sus interacciones con el servicio, sus preferencias, comentarios y respuestas a encuestas.</li>
                <li><strong>Datos de uso:</strong> Información sobre cómo utiliza nuestro sitio web, productos y servicios.</li>
              </ul>
              
              <h3>2.1 Datos de salud</h3>
              <p>Cuando utiliza nuestras herramientas médicas como calculadoras de IMC o convertidores de unidades, puede ingresar información relacionada con la salud. Esta información se procesa localmente en su dispositivo y no la almacenamos en nuestros servidores, a menos que opte expresamente por guardar sus cálculos en su cuenta.</p>
              
              <h2>3. Cómo recopilamos sus datos personales</h2>
              <p>Utilizamos diferentes métodos para recopilar datos de y sobre usted, incluyendo:</p>
              <ul>
                <li><strong>Interacciones directas:</strong> Cuando se registra en nuestro sitio, utiliza nuestras herramientas, suscribe a nuestro servicio o boletín, solicita información, o nos proporciona comentarios.</li>
                <li><strong>Tecnologías automatizadas:</strong> A medida que interactúa con nuestro sitio, podemos recopilar automáticamente datos técnicos sobre su equipo, acciones de navegación y patrones. Recopilamos estos datos mediante cookies y otras tecnologías similares.</li>
              </ul>
              
              <h2>4. Cómo utilizamos sus datos personales</h2>
              <p>Solo utilizaremos sus datos personales cuando la ley nos lo permita. Más comúnmente, utilizaremos sus datos personales en las siguientes circunstancias:</p>
              <ul>
                <li>Cuando necesitemos ejecutar el contrato que estamos a punto de celebrar o hemos celebrado con usted.</li>
                <li>Cuando sea necesario para nuestros intereses legítimos y sus intereses y derechos fundamentales no prevalezcan sobre esos intereses.</li>
                <li>Cuando debamos cumplir con una obligación legal o regulatoria.</li>
                <li>Con su consentimiento.</li>
              </ul>
              
              <h2>5. Divulgación de sus datos personales</h2>
              <p>Podemos compartir sus datos personales con las partes especificadas a continuación para los fines establecidos en la sección 4:</p>
              <ul>
                <li>Proveedores de servicios que proporcionan servicios de TI y administración de sistemas.</li>
                <li>Asesores profesionales incluyendo abogados, banqueros, auditores y aseguradores.</li>
                <li>Autoridades fiscales, reguladoras y otras autoridades.</li>
              </ul>
              <p>Exigimos a todos los terceros que respeten la seguridad de sus datos personales y los traten de acuerdo con la ley. No permitimos a nuestros proveedores de servicios utilizar sus datos personales para sus propios fines y solo les permitimos procesar sus datos personales para fines específicos y de acuerdo con nuestras instrucciones.</p>
              
              <h2>6. Transferencias internacionales</h2>
              <p>Algunos de nuestros proveedores de servicios externos se encuentran fuera del Espacio Económico Europeo (EEE), por lo que el procesamiento de sus datos personales implicará una transferencia de datos fuera del EEE. Siempre que transferimos sus datos personales fuera del EEE, nos aseguramos de que se les brinde un grado similar de protección asegurándonos de implementar al menos una de las siguientes salvaguardas:</p>
              <ul>
                <li>Solo transferiremos sus datos personales a países que la Comisión Europea ha considerado que proporcionan un nivel adecuado de protección de datos personales.</li>
                <li>Donde utilicemos ciertos proveedores de servicios, podemos utilizar contratos específicos aprobados por la Comisión Europea.</li>
              </ul>
              
              <h2>7. Seguridad de datos</h2>
              <p>Hemos implementado medidas de seguridad apropiadas para evitar que sus datos personales se pierdan, utilicen o accedan accidentalmente de manera no autorizada, se alteren o divulguen. Además, limitamos el acceso a sus datos personales a aquellos empleados, agentes, contratistas y otros terceros que tienen una necesidad comercial de conocer. Solo procesarán sus datos personales según nuestras instrucciones y están sujetos a un deber de confidencialidad.</p>
              
              <h2>8. Sus derechos legales</h2>
              <p>Bajo ciertas circunstancias, usted tiene derechos bajo las leyes de protección de datos en relación con sus datos personales, incluyendo:</p>
              <ul>
                <li>Solicitar acceso a sus datos personales.</li>
                <li>Solicitar la corrección de sus datos personales.</li>
                <li>Solicitar la eliminación de sus datos personales.</li>
                <li>Oponerse al procesamiento de sus datos personales.</li>
                <li>Solicitar la restricción del procesamiento de sus datos personales.</li>
                <li>Solicitar la transferencia de sus datos personales.</li>
                <li>Retirar el consentimiento.</li>
              </ul>
              <p>Si desea ejercer cualquiera de los derechos establecidos anteriormente, contáctenos a través de dpo@iaeva.com.</p>
              
              <h2>9. Cookies</h2>
              <p>Utilizamos cookies y tecnologías similares para distinguirlo de otros usuarios de nuestro sitio web. Esto nos ayuda a brindarle una buena experiencia cuando navega por nuestro sitio web y también nos permite mejorarlo. Puede configurar su navegador para que rechace todas o algunas cookies, o para que le avise cuando los sitios web establecen o acceden a cookies. Para más información, consulte nuestra política de cookies.</p>
              
              <h2>10. Cambios a esta política de privacidad</h2>
              <p>Esta versión fue actualizada por última vez en la fecha indicada al principio de esta política. Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Le notificaremos cualquier cambio publicando la nueva política de privacidad en esta página.</p>
              
              <h2>11. Contacto</h2>
              <p>Si tiene preguntas sobre esta política de privacidad o nuestras prácticas de privacidad, contáctenos en dpo@iaeva.com.</p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PrivacyPolicy; 