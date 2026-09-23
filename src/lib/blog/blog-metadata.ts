// Metadatos de los artículos del blog
export interface PostMeta {
  title: string;
  description: string;
  date: string;
  slug: string;
  author: string;
  coverImage: string;
  readingTime: string;
  language: string;
  category: string;
  tags: string[];
}

// Datos de todos los artículos
export const blogPostsMetadata: PostMeta[] = [
  // Artículo sobre optimización de agenda médica (español)
  {
    title: "Caso práctico: optimización de la agenda médica con inteligencia artificial",
    description: "Descubre cómo la IA aplicada a la gestión de agendas médicas puede transformar la eficiencia, reducir ausencias y mejorar la experiencia tanto para pacientes como para profesionales de la salud.",
    date: "2025-05-17",
    slug: "caso-practico-optimizacion-agenda-medica-ia",
    author: "Dr. Alejandro Vega",
    coverImage: "/images/blog/post-3/agenda_medica_ia_flujo.webp",
    readingTime: "8 min de lectura",
    language: "es",
    category: "Casos prácticos",
    tags: ["optimización agenda médica", "inteligencia artificial", "eficiencia clínica", "gestión sanitaria", "transformación digital"]
  },

  // Artículo sobre asistentes virtuales con IA (español)
  {
    title: "10 ventajas de implementar un asistente virtual con IA en la gestión de citas",
    description: "Descubre los beneficios tangibles de incorporar asistentes virtuales inteligentes en la gestión de citas médicas y cómo pueden transformar la eficiencia y la experiencia en centros de salud.",
    date: "2025-05-15",
    slug: "ventajas-asistente-virtual-ia-gestion-citas",
    author: "Dr. Alejandro Vega",
    coverImage: "/images/blog/post-2/asistente_virtual_multicanal.webp",
    readingTime: "10 min de lectura",
    language: "es",
    category: "Tecnología Sanitaria",
    tags: ["asistente virtual", "IA en salud", "citas médicas", "digitalización", "eficiencia clínica"]
  },

  // Artículo sobre automatización (español)
  {
    title: "Cómo la automatización reduce las ausencias en clínicas y hospitales: estrategias probadas para 2025",
    description: "Descubre cómo la automatización inteligente puede reducir hasta un 60% las ausencias de pacientes en centros médicos, optimizando recursos y mejorando la rentabilidad.",
    date: "2025-05-13",
    slug: "automatizacion-reduce-ausencias-clinicas",
    author: "Dr. Alejandro Vega",
    coverImage: "/images/blog/evolución_tecnológica_citas_medicas.webp",
    readingTime: "12 min de lectura",
    language: "es",
    category: "Gestión Médica",
    tags: ["automatización sanitaria", "gestión de citas", "eficiencia hospitalaria", "reducción de ausencias", "optimización de recursos"]
  },

  // Artículos 2026 (Estrategia SEO)
  {
    title: "Guía 2026: cómo reducir el 'no-show' en tu clínica un 40%",
    description: "Absentismo en citas médicas: el silencioso ladrón de ingresos en clínicas españolas. Descubre estrategias probadas para 2026.",
    date: "2026-01-10",
    slug: "guia-2026-reducir-no-show",
    author: "IAEVA Team",
    coverImage: "/images/blog/no_show_clinic_waiting_room.png",
    readingTime: "10 min de lectura",
    language: "es",
    category: "Gestión Médica",
    tags: ["absentismo", "no-show", "gestión clínica", "rentabilidad"]
  },
  {
    title: "Por qué tu clínica pierde dinero en el teléfono en 2026 (y cómo arreglarlo)",
    description: "Las clínicas pierden el 42% de las llamadas. Descubre cómo la IA resuelve este problema 24/7 sin saturar a tu equipo.",
    date: "2026-01-12",
    slug: "clinica-pierde-dinero-telefono-2026",
    author: "IAEVA Team",
    coverImage: "/images/blog/receptionist_overwhelmed_phone.png",
    readingTime: "8 min de lectura",
    language: "es",
    category: "Eficiencia",
    tags: ["atención al paciente", "recepción", "pérdida de llamadas", "IA voz"]
  },
  {
    title: "IA y equipo humano: el modelo híbrido eficiente para 2026",
    description: "La combinación de inteligencia artificial y supervisión humana redefine la eficiencia clínica. Descubre cómo este modelo mejora la atención.",
    date: "2026-01-15",
    slug: "ia-vs-call-center-costes-2026",
    author: "IAEVA Analytics",
    coverImage: "/images/blog/ai_vs_call_center_comparison.png",
    readingTime: "12 min de lectura",
    language: "es",
    category: "Estrategia",
    tags: ["eficiencia", "trabajo en equipo", "modelo híbrido", "automatización"]
  },
  {
    title: "Las 5 herramientas de IA que toda clínica dental necesita en 2026",
    description: "La IA revoluciona la odontología: desde la detección de caries hasta la gestión de citas. Descubre el stack tecnológico esencial para 2026.",
    date: "2026-01-20",
    slug: "5-herramientas-ia-clinica-dental-2026",
    author: "IAEVA Dental Tech",
    coverImage: "/images/blog/dental_ai_tools_futuristic.png",
    readingTime: "9 min de lectura",
    language: "es",
    category: "Odontología",
    tags: ["dental", "tecnología", "herramientas IA", "diagnóstico"]
  },
  {
    title: "IA en atención médica: cumplir AI Act 2026 en clínicas europeas",
    description: "Guía esencial sobre el AI Act para clínicas: gestión de riesgos, oversight humano y cómo evitar multas de hasta 35M€.",
    date: "2026-02-01",
    slug: "cumplir-ai-act-2026-clinicas",
    author: "IAEVA Legal & Compliance",
    coverImage: "/images/blog/ia-medicine-cover.jpg",
    readingTime: "15 min de lectura",
    language: "es",
    category: "Legal",
    tags: ["AI Act", "compliance", "normativa europea", "high-risk"]
  },
  {
    title: "Colaboración IA + humanos: atención médica sin riesgos AI Act",
    description: "El modelo híbrido reduce errores un 60% y asegura el cumplimiento legal. Descubre por qué la IA no sustituye, sino que potencia.",
    date: "2026-02-05",
    slug: "colaboracion-ia-humanos-salud",
    author: "IAEVA Analytics",
    coverImage: "/images/blog/doctor-using-iaeva.jpg",
    readingTime: "10 min de lectura",
    language: "es",
    category: "Tendencias",
    tags: ["modelo híbrido", "HITL", "seguridad clínica", "eficiencia"]
  }
];

// Funciones de utilidad para obtener artículos
export function getAllPostsMetadata(locale: string = 'es'): PostMeta[] {
  return blogPostsMetadata.filter(post => post.language === locale);
}

export function getPostMetadataBySlug(slug: string, locale: string = 'es'): PostMeta | undefined {
  return blogPostsMetadata.find(post => post.slug === slug && post.language === locale);
} 