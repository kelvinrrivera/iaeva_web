// Importar el CSS del blog si es necesario
import '@/lib/blog/blog.css';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getAllPostsMetadata, PostMeta } from '@/lib/blog/blog-metadata';
import SEOHead from '@/components/shared/SEOHead';
import { BookOpen } from 'lucide-react';

// Categorías del blog
const blogCategories = [
  'Inteligencia Artificial',
  'Salud Digital',
  'Gestión Médica',
  'Atención al Paciente',
  'Tecnología Sanitaria',
  'Noticias de IAEVA'
];

// Componente para la tarjeta del artículo
const BlogPostCard = ({ post }: { post: PostMeta }) => {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="block group overflow-hidden rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 bg-primary/90 text-white text-xs font-medium py-1 px-2">
          {post.category}
        </div>
      </div>
      <div className="p-5 bg-white dark:bg-gray-800">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary">
          {post.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
          {post.description}
        </p>
        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <span>{new Date(post.date).toLocaleDateString()}</span>
          <span>{post.readingTime}</span>
        </div>
      </div>
    </Link>
  );
};

// Página principal del blog
const BlogPage = () => {
  const { t, i18n } = useTranslation(['blog', 'common']);
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostMeta[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Cargar los artículos
  useEffect(() => {
    const loadPosts = () => {
      setIsLoading(true);
      try {
        // Obtener los posts para el idioma actual
        const allPosts = getAllPostsMetadata('es');
        setPosts(allPosts);
        setFilteredPosts(allPosts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, [i18n.language]);

  // Filtrar por categoría
  const filterByCategory = (category: string) => {
    setSelectedCategory(category);
    if (category === '') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.category === category));
    }
  };

  return (
    <>
      <SEOHead
        title={t('meta.title')}
        description={t('meta.description')}
        keywords={t('meta.keywords')}
        canonicalUrl="/blog"
        structuredData={[{
          "@context": "https://schema.org",
          "@type": "Blog",
          "headline": t('meta.title'),
          "description": t('meta.description'),
          "url": "https://iaeva.com/blog",
          "image": "https://iaeva.com/logo/og-image.png",
          "publisher": {
            "@type": "Organization",
            "name": "IAEVA",
            "logo": {
              "@type": "ImageObject",
              "url": "https://iaeva.com/logo/logo.png"
            }
          },
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": filteredPosts.map((post, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "url": `https://iaeva.com/blog/${post.slug}`
            }))
          },
          "inLanguage": "es"
        }]}
      />

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />

        {/* Header del Blog */}
        <section className="py-16 bg-gradient-to-br from-white via-blue-100 to-green-100">
          <div className="text-center py-8 max-w-3xl mx-auto px-4">
            <div className="bg-white/10 p-2 inline-block rounded-full mb-4">
              <BookOpen className="h-6 w-6 text-gray-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-600 mb-6">
              {t('header.title')}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {t('header.subtitle')}
            </p>
          </div>
        </section>

        {/* Contenido principal */}
        <main className="flex-grow container mx-auto px-4 py-12">
          {/* Filtros */}
          <div className="mb-10">
            <div className="flex items-center justify-center flex-wrap gap-2">
              <button
                onClick={() => filterByCategory('')}
                className={`px-4 py-2 rounded-full text-sm ${selectedCategory === ''
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                  }`}
              >
                {t('filters.all')}
              </button>

              {blogCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => filterByCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm ${selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Lista de artículos */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {t('no_posts')}
              </p>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPage; 