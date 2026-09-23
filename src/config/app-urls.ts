/**
 * URLs de la aplicación SaaS.
 *
 * La landing vive en Cloudflare Pages (`iaeva.com`) y la aplicación en Vercel
 * (`app.iaeva.com`). Son despliegues independientes a propósito: así un cambio en el
 * producto no puede tumbar la landing, que es lo que atrae el tráfico.
 *
 * Se centralizan aquí porque antes estaban repartidas por 33 ficheros apuntando a
 * `/contacto`. Cambiar el destino de los CTAs significaba editarlos uno a uno, y bastaba
 * olvidar uno para dejar un botón principal llevando a ninguna parte.
 */

/** Raíz de la aplicación. */
export const APP_URL = 'https://app.iaeva.com';

/**
 * Alta de cuenta. **Destino por defecto de los CTAs de captación.**
 *
 * Se usa `/signup` y no `/login` a propósito: un botón que dice «Empieza gratis» y lleva a
 * un formulario de acceso pide contraseña a quien todavía no tiene cuenta, que es
 * exactamente el punto donde la gente abandona.
 */
export const SIGNUP_URL = `${APP_URL}/signup`;

/** Acceso para quien ya es cliente. Solo donde el texto lo pida. */
export const LOGIN_URL = `${APP_URL}/login`;

/** ¿Esta ruta sale del sitio? Distingue navegación interna de enlace externo. */
export function isExternalUrl(path: string): boolean {
  return /^https?:\/\//.test(path);
}
