// Importar el CSS del blog si es necesario
import '@/lib/blog/blog.css';

import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPostMetadataBySlug, getAllPostsMetadata, PostMeta } from '@/lib/blog/blog-metadata';
import { getArticleContent } from '@/lib/blog/blog-content';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEOHead from '@/components/shared/SEOHead';
import { CalendarIcon, ClockIcon, TagIcon, ChevronLeftIcon, ShareIcon } from 'lucide-react';

import { SummarizeWithAI } from '@/components/tools/SummarizeWithAI';
import RelatedPosts from '@/components/blog/RelatedPosts';
import BlogCTA from '@/components/blog/BlogCTA';

// Interfaz para una sección del artículo
interface ArticleSection {
  title: string;
  content: string;
  bulletPoints?: string[];
  quote?: string;
}

// Interfaz para un elemento del índice de contenido
interface TocItem {
  id: string;
  text: string;
}

// Componente de sección del artículo
const ArticleSection = ({ section }: { section: ArticleSection }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        {section.title}
      </h2>

      <p className="my-4 text-gray-700 dark:text-gray-300 leading-relaxed">
        {section.content}
      </p>

      {section.bulletPoints && (
        <ul className="my-6 list-disc pl-6 text-gray-700 dark:text-gray-300">
          {section.bulletPoints.map((point, i) => (
            <li key={i} className="mb-2">{point}</li>
          ))}
        </ul>
      )}

      {section.quote && (
        <blockquote className="pl-4 border-l-4 border-primary italic my-6 text-gray-700 dark:text-gray-300">
          {section.quote}
        </blockquote>
      )}
    </div>
  );
};

// Componente de índice de contenido como sidebar
const TableOfContents = ({ items }: { items: TocItem[] }) => {
  const [activeId, setActiveId] = useState<string>("");
  const { t } = useTranslation(['blog']);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px" }
    );

    // Observar todas las secciones que tenemos en el índice
    items.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      // Limpiar observadores cuando se desmonte el componente
      items.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [items]);

  return (
    <nav className="hidden lg:block sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pr-6 pb-12 text-sm w-72">
      <SummarizeWithAI className="mb-6" />
      <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
        <h3 className="font-bold text-gray-700 border-b border-gray-200 pb-3 mb-4 text-base flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2 text-primary">
            <path d="M4 6h16"></path>
            <path d="M4 12h16"></path>
            <path d="M4 18h12"></path>
          </svg>
          {t('post.table_of_contents')}
        </h3>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block py-2 px-3 rounded-md transition-colors border-l-2 ${activeId === item.id
                  ? "border-primary text-primary font-medium bg-blue-50"
                  : "border-transparent text-gray-600 hover:text-primary hover:bg-gray-100"
                  }`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

// Página de artículo individual del blog
const BlogPostPage = () => {
  const { t, i18n } = useTranslation(['blog', 'common']);
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);

  const [post, setPost] = useState<PostMeta | null>(null);
  const [content, setContent] = useState<string>('');
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [allPosts, setAllPosts] = useState<PostMeta[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extraer enlaces del TOC del HTML
  useEffect(() => {
    if (contentRef.current) {
      // Buscar el toc en el contenido
      const tocElement = contentRef.current.querySelector('.article-toc');
      const items: TocItem[] = [];

      if (tocElement) {
        // Encontrar todos los enlaces dentro del TOC
        const links = tocElement.querySelectorAll('a');
        links.forEach((link) => {
          const href = link.getAttribute('href');
          if (href && href.startsWith('#')) {
            const id = href.substring(1);
            items.push({
              id,
              text: link.textContent || ''
            });
          }
        });

        setTocItems(items);
      }
    }
  }, [content]);

  useEffect(() => {
    if (!slug) {
      navigate('/blog');
      return;
    }

    const loadPost = () => {
      setIsLoading(true);
      try {
        // Buscar el post por slug e idioma
        const postData = getPostMetadataBySlug(slug, 'es');

        if (postData) {
          setPost(postData);

          // Cargar el contenido HTML del artículo
          const htmlContent = getArticleContent(slug, 'es');
          setContent(htmlContent);

          // Cargar todos los posts para relacionados
          const posts = getAllPostsMetadata('es');
          setAllPosts(posts);

          setError(null);
        } else {
          throw new Error(`No post found for slug: ${slug}`);
        }
      } catch (err) {
        console.error('Error loading blog post:', err);
        setError(t('post.error_loading'));
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [slug, i18n.language, navigate, t]);

  // Compartir el artículo
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.description,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error al compartir:', err);
      }
    } else {
      // Fallback para navegadores que no soportan la API de compartir
      navigator.clipboard.writeText(window.location.href);
      alert(t('post.copied_link'));
    }
  };

  return (
    <>
      {post && (
        <SEOHead
          title={post.title}
          description={post.description}
          keywords={post.tags.join(', ')}
          canonicalUrl={`/blog/${slug}`}
          ogImage={post.coverImage}
          structuredData={[{
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.description,
            "image": post.coverImage.startsWith('http') ? post.coverImage : `https://iaeva.com${post.coverImage}`,
            "datePublished": post.date,
            "author": {
              "@type": "Person",
              "name": post.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "IAEVA",
              "logo": {
                "@type": "ImageObject",
                "url": "https://iaeva.com/logo/logo.png"
              }
            },
            "inLanguage": "es"
          }]}
        />
      )}

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />

        <main className="flex-grow">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="container mx-auto px-4 py-20 text-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{error}</h2>
              <Link
                to="/blog"
                className="inline-flex items-center text-primary hover:underline"
              >
                <ChevronLeftIcon className="w-4 h-4 mr-1" />
                {t('post.back_to_blog')}
              </Link>
            </div>
          ) : post ? (
            <>
              {/* Hero con imagen de portada */}
              <div className="w-full relative bg-gradient-to-br from-white via-blue-100 to-green-100 py-16">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-6">
                    <div className="bg-white/10 p-2 inline-block rounded-full mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-gray-600">
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="max-w-4xl mx-auto">
                    <span className="inline-block bg-primary text-white px-3 py-1 text-sm font-medium rounded mb-4">
                      {post.category}
                    </span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-6">
                      {post.title}
                    </h1>
                    <p className="text-xl text-gray-700 mb-6">
                      {post.description}
                    </p>
                    <div className="flex flex-wrap items-center text-gray-600 mb-4 gap-6 text-sm">
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        <span>{new Date(post.date).toLocaleDateString(i18n.language === 'fr' ? 'fr-FR' : 'es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        <span>{post.readingTime}</span>
                      </div>
                      <button
                        onClick={handleShare}
                        className="flex items-center text-primary hover:underline"
                      >
                        <ShareIcon className="w-4 h-4 mr-1" />
                        <span>{t('post.share')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contenido del artículo con sidebar */}
              <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row">
                  {/* Sidebar con TOC */}
                  {tocItems.length > 0 && <TableOfContents items={tocItems} />}

                  {/* Contenido principal */}
                  <div className="lg:flex-1 max-w-4xl mx-auto lg:mx-0">
                    {/* Botón volver al blog */}
                    <div className="mb-6">
                      <Link
                        to="/blog"
                        className="inline-flex items-center text-primary hover:underline"
                      >
                        <ChevronLeftIcon className="w-4 h-4 mr-1" />
                        {t('post.back_to_blog')}
                      </Link>
                    </div>

                    {/* Imagen de portada */}
                    {post.coverImage && (
                      <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-auto object-cover max-h-[500px]"
                        />
                      </div>
                    )}

                    {/* Contenido HTML del artículo */}
                    <div
                      ref={contentRef}
                      className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-primary blog-content"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />

                    {/* Etiquetas */}
                    {post.tags.length > 0 && (
                      <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center flex-wrap gap-2">
                          <TagIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          {post.tags.map(tag => (
                            <span
                              key={tag}
                              className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 text-sm rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTA Contextual */}
                    <BlogCTA category={post.category} />

                  </div>
                </div>

                {/* Artículos relacionados */}
                {post && allPosts.length > 0 && (
                  <RelatedPosts
                    currentPost={post}
                    allPosts={allPosts}
                  />
                )}

              </div>
            </>
          ) : null}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPostPage; 