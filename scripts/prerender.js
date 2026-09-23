/**
 * Prerenderizado de la landing (2026-09-23).
 *
 * ## El problema
 *
 * La landing es una SPA. El HTML que se sirve —a personas y a rastreadores— es
 * `<div id="root"></div>` con 176 caracteres, y **el título de la home en las 40 páginas**.
 * Los títulos por ruta existen y son buenos, pero `react-helmet-async` los escribe en el
 * navegador: demasiado tarde para el HTML que recibe un rastreador.
 *
 * Medido en Search Console: **CTR del 1,01% con posición media 15**, cuando lo esperable
 * en esa posición es 2-3%. Y `asistente ia clínicas dentales` está en posición 3,12 con
 * 138 impresiones y **cero clics**: el resultado se ve, pero el título no corresponde a la
 * consulta, así que nadie entra.
 *
 * ## Qué hace
 *
 * Levanta un servidor sobre `dist/`, visita cada ruta con un navegador real, espera a que
 * React haya escrito el `<head>`, y guarda el HTML completo en `dist/<ruta>/index.html`.
 * Cloudflare Pages sirve esos ficheros directamente.
 *
 * Google ejecuta JavaScript, así que esto no cambia *si* indexa — cambia *qué* indexa en
 * la primera pasada. Para Bing y los rastreadores de modelos de lenguaje, que ejecutan
 * JavaScript mucho peor, la diferencia es entre ver la página y no verla.
 *
 * ## Por qué un script propio
 *
 * `vite-plugin-prerender` no es compatible con ESM (`require is not defined`). Escribirlo
 * a mano son 60 líneas y da control sobre lo que más importa: **verificar que cada página
 * salió con su título**, en vez de confiar en que el plugin lo hiciera.
 */

import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import puppeteer from 'puppeteer';

const DIST = new URL('../dist/', import.meta.url).pathname;
const PORT = 41234;

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.xml': 'application/xml',
  '.mp4': 'video/mp4', '.vtt': 'text/vtt',
};

/** Rutas del sitemap: una sola fuente, para que no puedan divergir. */
async function routes() {
  const xml = await readFile(join(DIST, 'sitemap.xml'), 'utf-8');
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)]
    .map((m) => m[1].replace('https://iaeva.com', '') || '/');
}

/** Servidor estático con fallback a index.html, como hace Cloudflare Pages. */
function serve() {
  return createServer(async (req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0]);
    let file = join(DIST, url);

    if (!existsSync(file) || !extname(file)) file = join(DIST, 'index.html');

    try {
      const body = await readFile(file);
      res.writeHead(200, { 'Content-Type': MIME[extname(file)] ?? 'text/html' });
      res.end(body);
    } catch {
      res.writeHead(404).end('not found');
    }
  }).listen(PORT);
}

async function main() {
  const server = serve();
  const list = await routes();
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  console.log(`Prerenderizando ${list.length} rutas…\n`);

  const titles = new Map();
  let fallos = 0;

  for (const route of list) {
    const page = await browser.newPage();
    try {
      await page.goto(`http://127.0.0.1:${PORT}${route}`, {
        waitUntil: 'networkidle0',
        timeout: 45000,
      });

      // Esperar a que Helmet haya escrito un título distinto del de arranque.
      await page.waitForFunction(
        () => document.title && document.querySelector('#root')?.children.length > 0,
        { timeout: 15000 },
      ).catch(() => {});

      const html = await page.content();
      const title = await page.title();

      const dest = route === '/'
        ? join(DIST, 'index.html')
        : join(DIST, route, 'index.html');

      await mkdir(dirname(dest), { recursive: true });
      await writeFile(dest, html);

      titles.set(route, title);
      console.log(`  ✓ ${route.padEnd(48)} ${title.slice(0, 55)}`);
    } catch (e) {
      fallos++;
      console.error(`  ✗ ${route} — ${e.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();

  // ── Comprobación que da sentido a todo esto ────────────────────────────────
  //
  // Si las páginas salieran con el mismo título, el prerenderizado no habría arreglado
  // nada y el build debe fallar en vez de publicar un sitio que parece corregido.
  const unicos = new Set(titles.values()).size;
  console.log(`\n${titles.size} páginas · ${unicos} títulos distintos · ${fallos} fallos`);

  if (fallos > 0) {
    console.error('\n✗ Hubo rutas que no se pudieron prerenderizar.');
    process.exit(1);
  }

  if (titles.size > 3 && unicos < titles.size * 0.5) {
    console.error(
      '\n✗ Más de la mitad de las páginas comparten título. El prerenderizado no está ' +
      'capturando lo que escribe Helmet.',
    );
    process.exit(1);
  }

  console.log('✓ Prerenderizado completo.\n');
}

main().catch((e) => { console.error(e); process.exit(1); });
