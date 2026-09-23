import { useTranslation } from 'react-i18next';
import PageLayout from '@/components/layout/PageLayout';
import SEOHead from '@/components/shared/SEOHead';

const TerminosYCondiciones = () => {
  const { t } = useTranslation(['common']);

  return (
    <PageLayout>
      <SEOHead 
        title="Términos y condiciones | IAEVA"
        description="Términos y condiciones de uso de IAEVA: asistente virtual médico para optimizar la gestión de citas y atención al paciente."
        canonicalUrl="/terminos-y-condiciones"
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Términos y condiciones</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Fecha de última actualización: 1 de mayo de 2025
            </p>
            
            <p className="mb-6">
              Le damos la bienvenida a IAEVA, un asistente virtual inteligente para el sector médico desarrollado por KelvinScale Networks, S.L. ("KelvinScale", "nosotros", "nuestro"). Estos Términos y Condiciones ("Términos") rigen su acceso y uso de la plataforma IAEVA, incluyendo cualquier aplicación, funcionalidad, documentación y servicio relacionado (colectivamente, la "Plataforma").
            </p>
            
            <p className="mb-6">
              Al acceder o utilizar la Plataforma, usted acepta estos Términos y nuestra Política de Privacidad. Si no está de acuerdo con estos Términos, no debe acceder ni utilizar la Plataforma.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Definiciones</h2>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>"Cliente"</strong> significa la entidad (clínica, hospital, centro médico o profesional sanitario) que ha contratado el acceso a IAEVA.</li>
              <li><strong>"Usuario"</strong> significa cualquier persona que accede o utiliza la Plataforma, ya sea como empleado o agente del Cliente.</li>
              <li><strong>"Contenido"</strong> significa cualquier información, datos, texto, software, gráficos o materiales proporcionados por nosotros o el Cliente en relación con la Plataforma.</li>
              <li><strong>"Datos del Cliente"</strong> significa cualquier dato, información o material proporcionado o enviado por el Cliente o sus Usuarios a través de la Plataforma.</li>
              <li><strong>"Datos del Paciente"</strong> significa cualquier información relacionada con la salud de pacientes o usuarios finales que interactúan con la Plataforma, si aplica según la configuración del Cliente.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. La Plataforma IAEVA</h2>
            <p className="mb-4">
              IAEVA es un asistente virtual inteligente diseñado específicamente para el sector médico, que ayuda a optimizar la gestión de citas, la atención al paciente y la eficiencia operativa de centros médicos.
            </p>
            <p className="mb-6">
              IAEVA puede incluir funcionalidades como:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Gestión y recordatorio automatizado de citas</li>
              <li>Atención virtual al paciente</li>
              <li>Optimización de agendas médicas</li>
              <li>Formularios pre-consulta</li>
              <li>Herramientas de asistencia para profesionales médicos</li>
              <li>Integración con sistemas de historias clínicas</li>
              <li>Analítica y reportes operativos</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Cuentas y registro</h2>
            <p className="mb-4">
              Para utilizar ciertas funcionalidades de la Plataforma, los Clientes y Usuarios deberán crear una cuenta. Al crear una cuenta, debe proporcionar información precisa y completa. Es responsabilidad del Cliente y sus Usuarios mantener la confidencialidad de las credenciales de acceso.
            </p>
            <p className="mb-6">
              El Cliente es responsable de todas las actividades que ocurran bajo sus cuentas de Usuario y debe notificarnos inmediatamente sobre cualquier uso no autorizado o violación de seguridad.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Licencias y restricciones</h2>
            <h3 className="text-xl font-semibold mt-6 mb-3">4.1 Licencia de uso</h3>
            <p className="mb-4">
              Sujeto a estos Términos y al pago de todas las tarifas aplicables, KelvinScale otorga al Cliente una licencia limitada, no exclusiva, no transferible y revocable para:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Acceder y utilizar la Plataforma para sus operaciones internas</li>
              <li>Permitir a sus Usuarios autorizados acceder y utilizar la Plataforma</li>
              <li>Utilizar la documentación proporcionada como parte de la Plataforma</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">4.2 Restricciones</h3>
            <p className="mb-4">
              El Cliente y sus Usuarios no deben:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Conceder sublicencias, vender, transferir, asignar, distribuir o explotar comercialmente la Plataforma</li>
              <li>Modificar, adaptar, piratear o alterar la Plataforma</li>
              <li>Realizar ingeniería inversa, descompilar o intentar extraer el código fuente</li>
              <li>Utilizar la Plataforma para almacenar o transmitir material ilegal o difamatorio</li>
              <li>Utilizar la Plataforma para almacenar o transmitir virus o código malicioso</li>
              <li>Interferir o interrumpir la integridad o rendimiento de la Plataforma</li>
              <li>Intentar obtener acceso no autorizado a la Plataforma o sus sistemas</li>
              <li>Utilizar la Plataforma de manera que viole las leyes aplicables, incluyendo las leyes de protección de datos y privacidad</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">4.3 Especificidad médica</h3>
            <p className="mb-6">
              El Cliente reconoce específicamente que IAEVA es una herramienta de apoyo y no sustituye el juicio médico profesional. Los Clientes y Usuarios son los únicos responsables de:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Verificar cualquier información proporcionada por IAEVA antes de tomar decisiones clínicas</li>
              <li>Obtener el consentimiento adecuado de los pacientes para el uso de IAEVA cuando sea necesario</li>
              <li>Cumplir con todas las regulaciones sanitarias aplicables</li>
              <li>Mantener la confidencialidad y seguridad adecuadas en el manejo de información médica</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Propiedad intelectual</h2>
            <p className="mb-4">
              KelvinScale y sus licenciantes poseen todos los derechos, títulos e intereses sobre la Plataforma, incluidos todos los derechos de propiedad intelectual relacionados. Estos Términos no otorgan al Cliente ninguna propiedad sobre la Plataforma.
            </p>
            <p className="mb-4">
              El Cliente conserva todos los derechos, títulos e intereses sobre los Datos del Cliente. KelvinScale puede utilizar los Datos del Cliente de forma anónima y agregada para mejorar la Plataforma, siempre que dicho uso no identifique al Cliente o a sus pacientes.
            </p>
            <p className="mb-6">
              El Cliente otorga a KelvinScale una licencia mundial, no exclusiva, libre de regalías para utilizar, modificar, reproducir y distribuir los Datos del Cliente exclusivamente para proporcionar y mejorar la Plataforma.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Confidencialidad y seguridad de datos médicos</h2>
            <p className="mb-4">
              Reconocemos la sensibilidad extrema de los datos médicos. Nos comprometemos a:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Implementar medidas de seguridad técnicas y organizativas adecuadas</li>
              <li>Procesar los Datos del Cliente solo de acuerdo con las instrucciones documentadas del Cliente</li>
              <li>Garantizar que las personas autorizadas para procesar los datos se comprometan a la confidencialidad</li>
              <li>Ayudar al Cliente a cumplir con sus obligaciones respecto a los derechos de los interesados</li>
              <li>Eliminar o devolver todos los datos personales al Cliente después de la prestación de servicios</li>
              <li>Proporcionar al Cliente toda la información necesaria para demostrar el cumplimiento</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Disponibilidad y soporte</h2>
            <p className="mb-4">
              Nos esforzamos por mantener la Plataforma disponible 24/7, pero no garantizamos que la Plataforma esté disponible sin interrupciones o errores. Realizaremos mantenimientos programados y los notificaremos con antelación siempre que sea posible.
            </p>
            <p className="mb-6">
              Proporcionamos soporte técnico según los términos del acuerdo de nivel de servicio contratado por el Cliente.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Responsabilidad profesional y limitaciones</h2>
            <p className="mb-4">
              IAEVA es una herramienta de asistencia y no puede reemplazar el juicio profesional en el ámbito médico. KelvinScale no practica la medicina ni proporciona servicios médicos.
            </p>
            <p className="mb-4">
              <strong>IAEVA NO ESTÁ DISEÑADO PARA PROPORCIONAR DIAGNÓSTICOS MÉDICOS</strong>, y no debe utilizarse como único medio para tomar decisiones clínicas o de tratamiento.
            </p>
            <p className="mb-6">
              Los profesionales sanitarios deben ejercer su juicio profesional independiente en la interpretación y uso de cualquier información proporcionada por IAEVA.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Limitación de responsabilidad</h2>
            <p className="mb-4">
              Hasta el máximo permitido por la ley, KelvinScale no será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos, incluida la pérdida de beneficios, ingresos, datos o uso, derivados de o relacionados con estos Términos o la Plataforma.
            </p>
            <p className="mb-6">
              La responsabilidad total de KelvinScale por reclamaciones derivadas de o relacionadas con estos Términos o la Plataforma, ya sea por contrato, agravio o cualquier otra teoría legal, no excederá las tarifas pagadas por el Cliente en los 12 meses anteriores al evento que da lugar a dicha responsabilidad.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Terminación</h2>
            <p className="mb-4">
              El Cliente puede dejar de usar la Plataforma en cualquier momento. KelvinScale puede terminar o suspender el acceso del Cliente a la Plataforma por incumplimiento material de estos Términos.
            </p>
            <p className="mb-6">
              Tras la terminación, el Cliente debe dejar de utilizar la Plataforma y KelvinScale puede eliminar cualquier Dato del Cliente después del período de retención especificado en nuestra Política de Privacidad, salvo que se requiera su conservación por ley o se acuerde lo contrario.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">11. Cambios en estos términos</h2>
            <p className="mb-6">
              KelvinScale puede modificar estos Términos ocasionalmente. Le notificaremos cualquier cambio significativo y le daremos la oportunidad de revisar los términos modificados antes de que entren en vigor. Su uso continuado de la Plataforma después de la fecha efectiva de cualquier modificación constituye su aceptación de los Términos modificados.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">12. Ley aplicable y resolución de conflictos</h2>
            <p className="mb-4">
              Estos Términos se regirán e interpretarán de acuerdo con las leyes de España, sin tener en cuenta sus disposiciones sobre conflictos de leyes.
            </p>
            <p className="mb-6">
              Cualquier disputa que surja de o en relación con estos Términos se resolverá definitivamente mediante arbitraje de acuerdo con las reglas de la Corte Española de Arbitraje. El lugar del arbitraje será Sevilla, España. El idioma del arbitraje será el español.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">13. Contacto</h2>
            <p className="mb-6">
              Si tiene preguntas sobre estos Términos, puede contactarnos en:
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

export default TerminosYCondiciones;
