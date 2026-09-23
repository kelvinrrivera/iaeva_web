
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '../public');
const SITEMAP_PATH = path.join(PUBLIC_DIR, 'sitemap.xml');
const BLOG_ARTICLES_PATH = path.join(PUBLIC_DIR, 'blog-articles.json');

// Base URL
const BASE_URL = 'https://iaeva.com';

// Static routes configuration (migrated from existing sitemap.xml)
const staticRoutes = [
    { loc: '/', changefreq: 'daily', priority: '1.0', alternate: { fr: '/fr' } },
    { loc: '/casos-de-uso', changefreq: 'weekly', priority: '0.8' },
    { loc: '/calculadora-roi', changefreq: 'monthly', priority: '0.7' },
    // /contacto retirado del sitemap (2026-09-23). La ruta sigue respondiendo —hay
    // enlaces externos y 57 impresiones que no conviene convertir en 404— pero lleva
    // `noIndex` y deja de ofrecerse a Google: el camino del SaaS es registrarse.
    { loc: '/blog', changefreq: 'daily', priority: '0.8' },
    { loc: '/buscar', changefreq: 'monthly', priority: '0.5' },

    // Solutions / Pillar Pages
    { loc: '/recepcionista-virtual-medica', changefreq: 'weekly', priority: '0.9' },
    { loc: '/ia-para-clinicas', changefreq: 'weekly', priority: '0.9' },
    { loc: '/asistente-ia-fisioterapia', changefreq: 'weekly', priority: '0.9' },
    { loc: '/reduccion-absentismo', changefreq: 'weekly', priority: '0.9' },
    { loc: '/dental-clinic-assistant', changefreq: 'monthly', priority: '0.8' },
    { loc: '/physiotherapy-practice-management', changefreq: 'monthly', priority: '0.8' },
    { loc: '/ophthalmology-patient-care', changefreq: 'monthly', priority: '0.8' },
    { loc: '/medical-center-efficiency', changefreq: 'monthly', priority: '0.8' },
    { loc: '/patient-management-solutions', changefreq: 'monthly', priority: '0.8' },
    { loc: '/guia-definitiva-ia-salud', changefreq: 'monthly', priority: '0.9' },
    { loc: '/recursos/guia-eficiencia-clinica', changefreq: 'monthly', priority: '0.8' },

    // French Pages
    { loc: '/fr', changefreq: 'weekly', priority: '0.9', alternate: { es: '/' } },
    { loc: '/fr/dental-clinic-assistant', changefreq: 'monthly', priority: '0.8' },
    { loc: '/fr/physiotherapy-practice-management', changefreq: 'monthly', priority: '0.8' },
    { loc: '/fr/ophthalmology-patient-care', changefreq: 'monthly', priority: '0.8' },
    { loc: '/fr/medical-center-efficiency', changefreq: 'monthly', priority: '0.8' },
    { loc: '/fr/patient-management-solutions', changefreq: 'monthly', priority: '0.8' },
    { loc: '/fr/calculatrice-roi', changefreq: 'monthly', priority: '0.7' },
    // Ídem para la versión francesa.
    { loc: '/fr/blog', changefreq: 'daily', priority: '0.8' },
    { loc: '/fr/guide-definitif-ia-sante', changefreq: 'monthly', priority: '0.9' },

    // Legal Pages (Spanish)
    { loc: '/politica-de-privacidad', changefreq: 'yearly', priority: '0.3' },
    { loc: '/terminos-y-condiciones', changefreq: 'yearly', priority: '0.3' },
    { loc: '/politica-de-cookies', changefreq: 'yearly', priority: '0.3' },

    // Legal Pages (French)
    { loc: '/fr/politique-de-confidentialite', changefreq: 'yearly', priority: '0.3' },
    { loc: '/fr/conditions-utilisation', changefreq: 'yearly', priority: '0.3' },
    { loc: '/fr/politique-des-cookies', changefreq: 'yearly', priority: '0.3' },
];

function generateSitemap() {
    console.log('Generating sitemap...');

    let blogPosts = [];
    try {
        if (fs.existsSync(BLOG_ARTICLES_PATH)) {
            const data = fs.readFileSync(BLOG_ARTICLES_PATH, 'utf8');
            const json = JSON.parse(data);
            if (json.itemListElement) {
                blogPosts = json.itemListElement.map(post => {
                    // Extract relative slug from full URL if present, or use url as is if it's already a slug logic (it seems to be full url in json)
                    // JSON url: https://iaeva.com/blog/slug
                    // We want to ensure consistent domain: https://iaeva.es/blog/slug
                    // The JSON has iaeva.com, but sitemap uses iaeva.es. We should standardize to BASE_URL.
                    const urlObj = new URL(post.url);
                    const relativePath = urlObj.pathname;
                    return {
                        loc: relativePath,
                        lastmod: post.datePublished,
                        changefreq: 'monthly',
                        priority: '0.7'
                    };
                });
            }
        }
    } catch (error) {
        console.error('Error reading blog articles:', error);
    }

    // Combine static routes and blog posts
    // Deduplicate by loc just in case
    const allRoutes = new Map();

    staticRoutes.forEach(route => {
        allRoutes.set(route.loc, route);
    });

    blogPosts.forEach(post => {
        // Blog posts from JSON might duplicate /blog static route? No, they are /blog/slug
        allRoutes.set(post.loc, post);
    });

    // Generate XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

    allRoutes.forEach(route => {
        xml += '  <url>\n';
        xml += `    <loc>${BASE_URL}${route.loc}</loc>\n`;
        if (route.lastmod) {
            xml += `    <lastmod>${route.lastmod}</lastmod>\n`;
        }
        if (route.changefreq) {
            xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
        }
        if (route.priority) {
            xml += `    <priority>${route.priority}</priority>\n`;
        }
        if (route.alternate) {
            // Handle alternate languages
            // Logic: specific to the simplified structure above
            if (route.alternate.fr) {
                xml += `    <xhtml:link rel="alternate" hreflang="es" href="${BASE_URL}${route.loc}" />\n`;
                xml += `    <xhtml:link rel="alternate" hreflang="fr" href="${BASE_URL}${route.alternate.fr}" />\n`;
            }
            if (route.alternate.es) {
                xml += `    <xhtml:link rel="alternate" hreflang="es" href="${BASE_URL}${route.alternate.es}" />\n`;
                xml += `    <xhtml:link rel="alternate" hreflang="fr" href="${BASE_URL}${route.loc}" />\n`;
            }
        }
        xml += '  </url>\n';
    });

    xml += '</urlset>';

    fs.writeFileSync(SITEMAP_PATH, xml);
    console.log(`Sitemap generated at ${SITEMAP_PATH} with ${allRoutes.size} URLs.`);
}

generateSitemap();
