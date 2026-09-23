import { Link } from 'react-router-dom';
import { PostMeta } from '@/lib/blog/blog-metadata';
import { ArrowRight } from 'lucide-react';

interface RelatedPostsProps {
    currentPost: PostMeta;
    allPosts: PostMeta[];
    maxPosts?: number;
}

const RelatedPosts = ({ currentPost, allPosts, maxPosts = 3 }: RelatedPostsProps) => {
    // Logic to find related posts
    const relatedPosts = allPosts
        .filter(post => post.slug !== currentPost.slug) // Exclude current post
        .map(post => {
            // Calculate relevance score
            let score = 0;
            if (post.category === currentPost.category) score += 5;
            const sharedTags = post.tags.filter(tag => currentPost.tags.includes(tag));
            score += sharedTags.length * 2;
            return { post, score };
        })
        .sort((a, b) => b.score - a.score) // Sort by relevance
        .slice(0, maxPosts)
        .map(item => item.post);

    if (relatedPosts.length === 0) return null;

    return (
        <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-10">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Artículos relacionados
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
                    <Link
                        key={post.slug}
                        to={`/blog/${post.slug}`}
                        className="group flex flex-col h-full bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-md transition-all"
                    >
                        <div className="aspect-video w-full overflow-hidden">
                            <img
                                src={post.coverImage}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                                {post.category}
                            </span>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                {post.title}
                            </h4>
                            <div className="mt-auto pt-4 flex items-center text-sm text-gray-500 font-medium">
                                Leer artículo <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RelatedPosts;
