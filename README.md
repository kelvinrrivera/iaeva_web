# IAEVA Landing Page

![IAEVA Logo](public/logo/logo.png)

## Descripción

IAEVA (Inteligencia Artificial Especializada en Valoración y Asistencia) es un asistente virtual inteligente diseñado para empresas del sector salud que mejora la atención al paciente y optimiza la gestión de citas médicas las 24 horas.

Este repositorio contiene el código fuente de la landing page oficial de IAEVA, desarrollada con React, Vite y TailwindCSS.

## Características

- Diseño moderno y responsivo optimizado para todos los dispositivos
- Soporte multilingüe (Español y Francés)
- Animaciones fluidas con Framer Motion
- Blog integrado con artículos informativos
- Calculadora de ROI para clientes potenciales
- Optimización SEO avanzada
- Alto rendimiento en métricas Core Web Vitals

## Tecnologías Utilizadas

- **React**: Biblioteca JavaScript para construir interfaces de usuario
- **TypeScript**: Superset de JavaScript con tipado estático
- **Vite**: Herramienta de construcción y servidor de desarrollo
- **TailwindCSS**: Framework CSS para diseño rápido y responsivo
- **Framer Motion**: Biblioteca para animaciones fluidas
- **React Router**: Para la navegación entre páginas
- **i18next**: Sistema de internacionalización
- **React Query**: Para gestión eficiente de datos
- **Radix UI**: Componentes primitivos accesibles
- **Embla Carousel**: Para presentaciones de contenido
- **MDX Bundle**: Para el contenido del blog estructurado

## Estructura del Proyecto

```
iaeva_landing/
├── dist/              # Archivos de producción generados
├── public/            # Activos estáticos públicos
│   ├── images/        # Imágenes e iconos del sitio
│   └── logo/          # Logotipos y recursos de marca
├── src/               # Código fuente
│   ├── components/    # Componentes reutilizables
│   │   ├── blog/      # Componentes específicos del blog
│   │   ├── home/      # Componentes de la página principal
│   │   ├── layout/    # Componentes de estructura (header, footer)
│   │   ├── shared/    # Componentes compartidos
│   │   ├── tools/     # Componentes de herramientas (calculadora)
│   │   └── ui/        # Componentes UI base
│   ├── content/       # Contenido estructurado
│   │   └── blog/      # Artículos del blog en formato MDX
│   ├── hooks/         # Custom React hooks
│   ├── i18n/          # Configuración de internacionalización
│   │   └── locales/   # Traducciones (es, fr)
│   ├── lib/           # Bibliotecas y utilidades
│   ├── pages/         # Componentes de páginas
│   ├── types/         # Definiciones de tipos TypeScript
│   └── utils/         # Funciones de utilidad
└── vite.config.ts     # Configuración de Vite
```

## Rendimiento y Optimizaciones

Este proyecto ha sido altamente optimizado para lograr excelentes métricas de rendimiento:

- Carga diferida de componentes y rutas
- Optimización de imágenes con srcset y compresión
- CSS crítico inline y carga no bloqueante
- Precargas estratégicas de recursos clave
- División de código y agrupación en chunks lógicos
- Minificación agresiva de JavaScript y CSS

Para más detalles, consulte [performance-optimizations.md](performance-optimizations.md).

## Cómo ejecutar el proyecto

### Requisitos previos

- Node.js (v16 o superior)
- npm (v7 o superior)

### Instalación

1. Clone el repositorio:
   ```bash
   git clone https://github.com/KelvinScale/iaeva-landing.git
   cd iaeva-landing
   ```

2. Instale las dependencias:
   ```bash
   npm install
   ```

3. Inicie el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Visite `http://localhost:8080` en su navegador.

### Comandos disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la versión de producción
- `npm run build:dev`: Construye con modo de desarrollo
- `npm run preview`: Vista previa local de la versión de producción
- `npm run deploy`: Construye y publica en el servidor

## Licencia

Propiedad de KelvinScale - Todos los derechos reservados

## Contacto

Para más información, contacte a KelvinScale en:
- Sitio web: https://kelvinscale.net
- Email: info@kelvinscale.net
