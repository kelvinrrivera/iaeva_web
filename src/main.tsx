import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Importar configuración de i18n (debe ser antes de cualquier componente que use traducciones)
import './i18n';

// Asegurar que React esté disponible globalmente para todos los componentes
if (typeof window !== 'undefined') {
  window.React = React;
}

// Función para verificar que React esté cargado correctamente
function checkReactLoaded() {
  if (!React || !React.createContext) {
    console.error('React no está cargado correctamente. Reintentando...');
    return false;
  }
  return true;
}

// Función para renderizar la aplicación con manejo de errores
function renderApp() {
  if (!checkReactLoaded()) {
    // Si React no está cargado, reintentamos después de un breve retraso
    setTimeout(renderApp, 50);
    return;
  }

  try {
    const rootElement = document.getElementById('root');
    if (rootElement) {
      const root = createRoot(rootElement);
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    } else {
      console.error('No se pudo encontrar el elemento raíz para renderizar la aplicación.');
    }
  } catch (error) {
    console.error('Error al renderizar la aplicación:', error);
    
    // Intentar recuperación si fue un error relacionado con React
    if (error instanceof Error && error.message.includes('createContext')) {
      console.warn('Intentando recuperación por error de React Context...');
      setTimeout(renderApp, 100);
    }
  }
}

// Asegurar que el DOM esté cargado antes de intentar renderizar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}
