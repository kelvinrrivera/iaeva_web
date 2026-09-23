/**
 * Verificación de SEO sobre el build (2026-09-23).
 *
 * Se ejecuta después de prerenderizar. Comprueba lo que se acaba de arreglar, para que
 * no vuelva en silencio: los defectos de metadatos no rompen el build ni dan error en
 * consola — se descubren semanas después mirando el CTR.
 *
 * Falla con código 1 si algo está mal, así que un despliegue automático se detiene.
 */

import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const problemas = [];

/** Recorre `dist/` buscando los HTML prerenderizados. */
async function htmlFiles(dir = DIST, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.name === 'assets' || e.name === 'images') continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) await htmlFiles(full, out);
    else if (e.name === 'index.html') out.push(full);
  }
  return out;
}

const extract = (html, re) => html.match(re)?.[1]?.trim() ?? null;

async function main() {
  const files = await htmlFiles();
  const titles = new Map();
  const descs = new Map();

  for (const f of files) {
    const html = await readFile(f, 'utf-8');
    const ruta = '/' + f.replace(DIST, '').replace(/index\.html$/, '');

    const title = extract(html, /<title[^>]*>(.*?)<\/title>/s);
    const desc = extract(html, /name="description"\s+content="(.*?)"/s);

    // 1. Cada página con título propio.
    if (!title) problemas.push(`${ruta}: sin <title>`);
    else titles.set(ruta, title);

    // 2. Y con descripción.
    if (!desc) problemas.push(`${ruta}: sin meta description`);
    else descs.set(ruta, desc);

    // 3. Una sola de cada: dos `meta description` hacen que Google lea la primera,
    //    que era el defecto original.
    const nDesc = (html.match(/name="description"/g) ?? []).length;
    if (nDesc > 1) problemas.push(`${ruta}: ${nDesc} meta description (debe haber 1)`);

    // 4. Contenido real, no una cáscara de SPA.
    const body = extract(html, /<body[^>]*>([\s\S]*?)<\/body>/);
    if (!body || body.length < 2000) {
      problemas.push(`${ruta}: body de ${body?.length ?? 0} caracteres — ¿prerenderizado?`);
    }

    // 5. El título de arranque no debe quedarse pegado en páginas interiores.
    if (ruta !== '/' && title?.includes('KelvinScale')) {
      problemas.push(`${ruta}: conserva el título por defecto de la home`);
    }

    // 6. Sin claves de traducción sin resolver.
    if (title?.match(/^[a-z_]+\.[a-z_]+$/)) {
      problemas.push(`${ruta}: el título es una clave i18n sin resolver ("${title}")`);
    }
  }

  // 7. Títulos únicos entre sí.
  const repetidos = [...titles.entries()].reduce((acc, [ruta, t]) => {
    (acc[t] ??= []).push(ruta);
    return acc;
  }, {});
  for (const [t, rutas] of Object.entries(repetidos)) {
    if (rutas.length > 1) {
      problemas.push(`título repetido en ${rutas.length} páginas: "${t.slice(0, 50)}"`);
    }
  }

  // 8. Ficheros que deben existir.
  for (const f of ['sitemap.xml', 'robots.txt', 'llms.txt']) {
    if (!existsSync(join(DIST, f))) problemas.push(`falta ${f}`);
  }

  // 9. Ninguna valoración inventada en los datos estructurados.
  for (const f of files) {
    const html = await readFile(f, 'utf-8');
    if (/AggregateRating/i.test(html)) {
      problemas.push(
        `${f.replace(DIST, '/')}: declara AggregateRating. Solo puede estar si esas ` +
        'valoraciones existen de verdad.',
      );
    }
  }

  console.log(`\nSEO: ${files.length} páginas · ${titles.size} títulos · ${descs.size} descripciones`);

  if (problemas.length) {
    console.error(`\n✗ ${problemas.length} problemas:\n`);
    for (const p of problemas) console.error(`   ${p}`);
    process.exit(1);
  }

  console.log('✓ Sin problemas de SEO.\n');
}

main().catch((e) => { console.error(e); process.exit(1); });
