import { useTranslation } from 'react-i18next';
import PageLayout from '@/components/layout/PageLayout';
import SEOHead from '@/components/shared/SEOHead';

const PoliticaDePrivacidad = () => {
  const { t } = useTranslation(['common']);

  return (
    <PageLayout>
      <SEOHead 
        title="Política de privacidad | IAEVA"
        description="Política de privacidad de IAEVA: asistente virtual médico con enfoque en la protección de datos sensibles del sector salud."
        canonicalUrl="/politica-de-privacidad"
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Política de privacidad</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Fecha de última actualización: 1 de mayo de 2025
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introducción</h2>
            <p>
              IAEVA es un asistente virtual inteligente para el sector médico desarrollado por KelvinScale Networks, S.L. ("nosotros", "nuestro" o "KelvinScale"). Esta Política de Privacidad explica cómo recopilamos, utilizamos, procesamos, transferimos y protegemos la información obtenida a través de la plataforma IAEVA, con especial atención a la sensibilidad de los datos médicos y del sector salud.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Datos que podemos recopilar</h2>
            <p>
              Dependiendo del uso que haga de nuestra plataforma y de los servicios contratados, podemos recopilar:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Datos de identidad:</strong> Nombre, apellido, nombre de usuario o identificador similar.</li>
              <li><strong>Datos de contacto:</strong> Dirección de correo electrónico, número de teléfono, dirección postal.</li>
              <li><strong>Datos de uso:</strong> Información sobre cómo utiliza nuestra plataforma y servicios.</li>
              <li><strong>Datos de configuración:</strong> Preferencias y ajustes realizados en la plataforma.</li>
              <li><strong>Datos operativos:</strong> Información generada a través del uso de IAEVA en su centro médico, como estadísticas de citas, cancelaciones, o métricas de interacción.</li>
            </ul>
            <p>
              <strong>Nota importante sobre datos médicos:</strong> IAEVA está diseñado para funcionar como un asistente en entornos médicos, pero el sistema está configurado para <strong>no almacenar datos médicos sensibles de pacientes</strong> por defecto. Cualquier tratamiento de datos de salud requeriría configuración explícita por parte del centro médico y estaría sujeto a medidas de seguridad adicionales y acuerdos específicos para cumplir con normativas aplicables (RGPD, LOPD-GDD, HIPAA si aplica).
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Cómo utilizamos sus datos</h2>
            <p>Utilizamos los datos recopilados para:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Proporcionar, operar y mantener nuestra plataforma.</li>
              <li>Mejorar, personalizar y ampliar nuestra plataforma.</li>
              <li>Entender y analizar cómo utiliza nuestra plataforma.</li>
              <li>Desarrollar nuevos productos, servicios y funcionalidades.</li>
              <li>Comunicarnos con usted para fines de servicio al cliente, actualizaciones y mensajes informativos.</li>
              <li>Proporcionar soporte técnico y formación.</li>
              <li>Detectar, prevenir y abordar problemas técnicos.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Base legal para el tratamiento</h2>
            <p>Procesamos sus datos personales con las siguientes bases legales:</p>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Ejecución de un contrato:</strong> Cuando sea necesario para cumplir con los términos de servicio acordados.</li>
              <li><strong>Consentimiento:</strong> Cuando nos haya dado su consentimiento explícito para un fin específico.</li>
              <li><strong>Intereses legítimos:</strong> Cuando sea necesario para nuestros intereses legítimos (mejora de servicios, seguridad) y no prevalezcan sus derechos fundamentales.</li>
              <li><strong>Obligación legal:</strong> Cuando sea necesario para cumplir con una obligación legal.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Seguridad de datos en el sector médico</h2>
            <p>
              Entendemos la extrema sensibilidad de los datos en el sector médico. Por ello, IAEVA implementa:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Cifrado de extremo a extremo</strong> en todas las comunicaciones.</li>
              <li><strong>Aislamiento de datos</strong> por cliente (arquitectura multi-tenant segura).</li>
              <li><strong>Almacenamiento en servidores ubicados en la UE</strong> para clientes europeos.</li>
              <li><strong>Acceso basado en roles</strong> con autenticación multifactor.</li>
              <li><strong>Registros de auditoría</strong> detallados para todas las operaciones.</li>
              <li><strong>Evaluaciones de seguridad y tests de penetración</strong> regulares.</li>
              <li><strong>Opción de despliegue en infraestructura privada</strong> para centros médicos con requisitos específicos.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Compartición de datos</h2>
            <p>
              No vendemos ni alquilamos sus datos personales a terceros. Podemos compartir información con:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Proveedores de servicios:</strong> Empresas que nos ayudan a proporcionar nuestros servicios (hosting, análisis, atención al cliente).</li>
              <li><strong>Entidades afiliadas:</strong> Empresas de nuestro grupo empresarial que cumplen con los mismos estándares de protección de datos.</li>
              <li><strong>Por requisito legal:</strong> Cuando estemos obligados por ley, proceso judicial o solicitud gubernamental.</li>
            </ul>
            <p>
              Todos nuestros proveedores y socios han firmado acuerdos de protección de datos y cumplen con nuestros estándares de seguridad y confidencialidad.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Transferencias internacionales</h2>
            <p>
              Preferimos procesar los datos dentro del Espacio Económico Europeo (EEE). Cuando sea necesario transferir datos fuera del EEE, lo haremos utilizando mecanismos legales adecuados como Cláusulas Contractuales Estándar o decisiones de adecuación.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Conservación de datos</h2>
            <p>
              Conservamos sus datos personales solo durante el tiempo necesario para los fines establecidos en esta política, para cumplir con obligaciones legales o durante el período necesario para resolver disputas.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Sus derechos</h2>
            <p>Dependiendo de su ubicación, puede tener los siguientes derechos:</p>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Acceso:</strong> Derecho a saber qué datos personales procesamos sobre usted.</li>
              <li><strong>Rectificación:</strong> Derecho a solicitar la corrección de datos inexactos.</li>
              <li><strong>Supresión:</strong> Derecho a solicitar la eliminación de sus datos ("derecho al olvido").</li>
              <li><strong>Limitación:</strong> Derecho a solicitar la restricción del procesamiento de sus datos.</li>
              <li><strong>Portabilidad:</strong> Derecho a recibir sus datos en un formato estructurado.</li>
              <li><strong>Oposición:</strong> Derecho a oponerse al procesamiento basado en interés legítimo.</li>
              <li><strong>Retirada del consentimiento:</strong> Derecho a retirar el consentimiento en cualquier momento.</li>
            </ul>
            <p>
              Para ejercer estos derechos, contáctenos en <a href="mailto:privacidad@kelvinscale.net" className="text-iaeva-blue hover:underline">privacidad@kelvinscale.net</a>.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Cookies y tecnologías similares</h2>
            <p>
              Utilizamos cookies y tecnologías similares para mejorar su experiencia en nuestra plataforma. Para más información, consulte nuestra <a href="/politica-de-cookies" className="text-iaeva-blue hover:underline">Política de Cookies</a>.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">11. Cambios en esta política</h2>
            <p>
              Podemos actualizar esta política periódicamente. Le notificaremos cualquier cambio significativo publicando la nueva política en esta página y, si los cambios son significativos, proporcionaremos un aviso más destacado.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">12. Contacto</h2>
            <p>
              Si tiene preguntas sobre esta política o nuestras prácticas de privacidad, contáctenos en:
            </p>
            <p className="mb-8">
              <strong>KelvinScale</strong><br />
              Atención: Delegado de Protección de Datos<br />
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

export default PoliticaDePrivacidad;
