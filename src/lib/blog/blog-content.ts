// Contenido HTML de los artículos del blog
import { automatizacionHTMLPart2, automatizacionHTMLPart3 } from './blog-content-part2';
import { asistenteVirtualHTML } from './blog-content-asistente-virtual.js';
import { agendaMedicaHTML } from './blog-content-agenda-ia';
import {
  guiaNoShowHTML,
  perdidaLlamadasHTML,
  comparativaCostesHTML,
  herramientasDentalHTML,
  aiActComplianceHTML,
  humanAICollaborationHTML
} from './blog-content-2026';

export type BlogContent = {
  [key: string]: {
    [locale: string]: string;
  };
};

// Contenido del artículo sobre automatización para reducir ausencias
const automatizacionHTML = {
  es: `
    <div class="article-content">
      <div itemscope itemtype="https://schema.org/Article">
        <meta itemprop="headline" content="Cómo la Automatización Reduce las Ausencias en Clínicas y Hospitales: Estrategias Probadas para 2025">
        <meta itemprop="description" content="Descubre cómo la automatización inteligente puede reducir hasta un 60% las ausencias de pacientes en centros médicos, optimizando recursos y mejorando la rentabilidad.">
        <meta itemprop="image" content="https://iaeva.com/images/blog/Impacto_de_ausencias_citas_medicas.webp">
        <meta itemprop="datePublished" content="2025-05-13">
        <div itemprop="author" itemscope itemtype="https://schema.org/Person">
          <meta itemprop="name" content="Dr. Alejandro Vega">
        </div>
        <div itemprop="publisher" itemscope itemtype="https://schema.org/Organization">
          <meta itemprop="name" content="IAEVA">
          <div itemprop="logo" itemscope itemtype="https://schema.org/ImageObject">
            <meta itemprop="url" content="https://iaeva.com/logo.png">
          </div>
        </div>
      </div>

      <div class="article-toc">
        <h3>Índice</h3>
        <ul>
          <li><a href="#impacto">El impacto real de las ausencias en la sanidad</a></li>
          <li><a href="#razones">¿Por qué los pacientes no acuden a sus citas?</a></li>
          <li><a href="#automatizacion">La automatización como solución: más allá de los SMS</a></li>
          <li><a href="#estrategias">Estrategias automatizadas que funcionan</a></li>
          <li><a href="#implementacion">Implementación paso a paso</a></li>
          <li><a href="#medicion">Medición de resultados: KPIs esenciales</a></li>
          <li><a href="#casos">Casos de éxito verificados</a></li>
          <li><a href="#conclusiones">Conclusiones y próximos pasos</a></li>
          <li><a href="#referencias">Referencias y recursos adicionales</a></li>
          <li><a href="#faq">Preguntas frecuentes</a></li>
        </ul>
      </div>

      <section id="impacto">
        <h2>El impacto real de las ausencias en la sanidad</h2>
        <p>Si diriges un centro médico, conoces perfectamente la frustración: consultas vacías, especialistas esperando y recursos desperdiciados. Las ausencias no programadas de pacientes representan uno de los mayores desafíos operativos en el sector sanitario actual.</p>
        
        <p>Los números hablan por sí solos:</p>
        <ul>
          <li>Entre el 15% y el 30% de las citas médicas programadas terminan en ausencias no justificadas 📉 </li>
          <li>Cada cita perdida supone un coste medio de 80€ a 200€ para el centro médico 💸</li>
          <li>Un especialista puede perder hasta 4 horas semanales debido a pacientes que no se presentan ⏱️</li>
          <li>La cascada de reprogramaciones genera una sobrecarga administrativa equivalente a 0,5 FTE (empleado a tiempo completo) por cada 10 médicos 🧑‍💼</li>
        </ul>
        
        <img src="/images/blog/Impacto_de_ausencias_citas_medicas.webp" alt="Gráfico del impacto de ausencias en citas médicas" class="blog-image" />
        
        <blockquote>
          "Las ausencias no son solo un problema económico, sino también asistencial: retrasan diagnósticos, complican seguimientos y generan ineficiencias en cascada que afectan a toda la organización sanitaria." - Dr. Alejandro Vega
        </blockquote>
        
        <h3>Consecuencias más allá del coste directo</h3>
        <p>El impacto negativo va mucho más allá de la pérdida económica inmediata:</p>
        <ul>
          <li>Tiempo de espera promedio más largo para primeras consultas</li>
          <li>Deterioro de la experiencia del paciente</li>
          <li>Posible agravamiento de condiciones médicas por demoras</li>
          <li>Pérdida de competitividad frente a otros centros más eficientes</li>
        </ul>
      </section>

      <section id="razones">
        <h2>¿Por qué los pacientes no acuden a sus citas?</h2>
        <p>Antes de implementar soluciones, es fundamental entender las causas. Un estudio realizado en 2024 por la Universidad Complutense de Madrid analizó más de 50.000 ausencias, identificando estos motivos principales:</p>
        
        <table class="blog-table">
          <thead>
            <tr>
              <th>Motivo de ausencia</th>
              <th>Porcentaje</th>
              <th>¿Automatizable?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Simple olvido</td>
              <td>42%</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>Confusión de fecha/hora</td>
              <td>23%</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>Imposibilidad de cancelar/reprogramar</td>
              <td>15%</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>Mejora del estado clínico</td>
              <td>12%</td>
              <td>⚠️ Parcial</td>
            </tr>
            <tr>
              <td>Insatisfacción con atención previa</td>
              <td>8%</td>
              <td>⚠️ Parcial</td>
            </tr>
          </tbody>
        </table>
        
        <p>Lo más revelador: el 80% de las ausencias son potencialmente evitables con sistemas adecuados de comunicación y gestión 🎯</p>
      </section>

      <section id="automatizacion">
        <h2>La automatización como solución: más allá de los SMS</h2>
        <p>La buena noticia es que la tecnología actual permite abordar este problema de manera integral. Pero cuidado: no todos los sistemas de automatización son iguales.</p>
        
        <h3>Evolución de los sistemas de recordatorio</h3>
        <p class="text-highlight">SMS básicos (2000s) → Emails automatizados (2010s) → Sistemas multicanal con IA (Actualidad)</p>
        
      
        <p>Los sistemas tradicionales de recordatorio tienen importantes limitaciones:</p>
        <ul>
          <li>SMS simples: Unidireccionales, sin posibilidad de interacción</li>
          <li>Emails automatizados: Bajas tasas de apertura (22-35%)</li>
          <li>Llamadas manuales: Alto coste en personal y baja escalabilidad</li>
        </ul>
        
        <h3>La nueva generación: automatización inteligente</h3>
        <p>Los sistemas actuales de automatización para centros médicos integran:</p>
        <ul>
          <li>🤖 Inteligencia artificial conversacional que comprende lenguaje natural</li>
          <li>📱 Comunicación multicanal (WhatsApp, web, app, SMS)</li>
          <li>🔄 Capacidad bidireccional para gestionar cambios y confirmaciones</li>
          <li>📊 Análisis predictivo para identificar perfiles con alto riesgo de ausencia</li>
          <li>🔗 Integración con sistemas HIS/CRM existentes del centro</li>
        </ul>
        
        <p>💡 Dato clave: Según Cibernova, los sistemas de recordatorios automáticos pueden reducir la tasa de ausencias hasta un 70%, permitiendo a las clínicas disminuir las citas perdidas a menos del 5% con recordatorios estratégicos.</p>
      </section>

      ${automatizacionHTMLPart2}
      ${automatizacionHTMLPart3}
    </div>
  `
};

// Registro de todos los artículos con sus contenidos HTML
export const blogContent: BlogContent = {
  "ventajas-asistente-virtual-ia-gestion-citas": asistenteVirtualHTML,
  "automatizacion-reduce-ausencias-clinicas": automatizacionHTML,
  "caso-practico-optimizacion-agenda-medica-ia": agendaMedicaHTML,
  // 2026 Articles
  "guia-2026-reducir-no-show": guiaNoShowHTML,
  "clinica-pierde-dinero-telefono-2026": perdidaLlamadasHTML,
  "ia-vs-call-center-costes-2026": comparativaCostesHTML,
  "5-herramientas-ia-clinica-dental-2026": herramientasDentalHTML,
  "cumplir-ai-act-2026-clinicas": aiActComplianceHTML,
  "colaboracion-ia-humanos-salud": humanAICollaborationHTML
};

// Función para obtener el contenido HTML de un artículo por slug y locale
export function getArticleContent(slug: string, locale: string = 'es'): string {
  const articleContent = blogContent[slug];
  if (!articleContent) return '';

  // Si no existe el contenido para el idioma solicitado, devuelve el español como fallback
  return articleContent[locale] || articleContent['es'] || '';
} 