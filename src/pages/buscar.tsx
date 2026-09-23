import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';

import PageLayout from '@/components/layout/PageLayout';
import SEOHead from '@/components/shared/SEOHead';

const SearchPage = () => {
  const { t } = useTranslation('common');
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<any[]>([]);
  
  useEffect(() => {
    // Simulate a search API call
    setIsLoading(true);
    
    // In a real implementation, you would call your search API here
    const timer = setTimeout(() => {
      // Placeholder results - in a real implementation, this would come from your search API
      setResults([]);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [query]);
  
  return (
    <PageLayout>
      <SEOHead 
        title={`Búsqueda: ${query} | IAEVA`}
        description="Resultados de búsqueda en IAEVA - Asistente virtual para el sector sanitario"
        noIndex={true}
      />
      
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Resultados de búsqueda</h1>
            <p className="text-gray-600">
              {query ? `Mostrando resultados para "${query}"` : 'Ingrese un término de búsqueda para encontrar contenido'}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto mb-8">
            <form className="relative">
              <input
                type="text"
                placeholder="Buscar en IAEVA..."
                defaultValue={query}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-iaeva-blue focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-iaeva-blue text-white px-4 py-1 rounded-md"
              >
                Buscar
              </button>
            </form>
          </div>
          
          <div className="mt-12">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-iaeva-blue"></div>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-8">
                {results.map((result, index) => (
                  <div key={index} className="border-b pb-6">
                    <h2 className="text-xl font-semibold mb-2">{result.title}</h2>
                    <p className="text-gray-600 mb-3">{result.description}</p>
                    <a href={result.url} className="text-iaeva-blue hover:underline">Leer más</a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mb-4">
                  <Search className="h-16 w-16 text-gray-300 mx-auto" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">No se encontraron resultados</h2>
                <p className="text-gray-600">
                  No pudimos encontrar resultados para "{query}". Intente con otros términos o explore nuestras secciones principales.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default SearchPage; 