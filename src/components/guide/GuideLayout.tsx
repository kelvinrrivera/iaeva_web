import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import StickyDownloadBar from "./StickyDownloadBar";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
// import { Helmet } from "react-helmet-async";
import SEOHead from "@/components/shared/SEOHead";
import { SummarizeWithAI } from "@/components/tools/SummarizeWithAI";

interface GuideLayoutProps {
    children: React.ReactNode;
    title: string;
    description: string;
    onDownload: () => void;
    toc?: { id: string; title: string }[];
    canonicalUrl?: string;
    hreflang?: { lang: string; url: string }[];
    keywords?: string;
}

const GuideLayout: React.FC<GuideLayoutProps> = ({
    children,
    title,
    description,
    onDownload,
    toc,
    canonicalUrl,
    hreflang,
    keywords
}) => {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <PageLayout>
            <SEOHead
                title={`${title} | Guía IAEVA`}
                description={description}
                canonicalUrl={canonicalUrl}
                hreflang={hreflang}
                keywords={keywords}
            />

            {/* Hero Header */}
            <div className="bg-iaeva-bg-dark text-white pt-32 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
                    <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-iaeva-teal uppercase bg-iaeva-teal/10 rounded-full border border-iaeva-teal/20">
                        Guía Profesional 2026
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
                        {title}
                    </h1>
                    <p className="text-xl text-gray-300 md:text-2xl font-light mb-8 max-w-2xl mx-auto">
                        {description}
                    </p>
                    <Button
                        onClick={onDownload}
                        size="lg"
                        className="bg-white text-iaeva-bg-dark hover:bg-gray-100 font-bold rounded-full px-8 shadow-xl"
                    >
                        <Download className="mr-2 h-5 w-5" />
                        Descargar PDF Completo
                    </Button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12 relative">
                {/* Table of Contents (Sticky Sidebar) */}
                {toc && (
                    <aside className="lg:w-1/4 hidden lg:block h-fit sticky top-24">
                        <SummarizeWithAI className="mb-6" />
                        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4 uppercase text-xs tracking-wider">Contenido</h3>
                            <nav className="space-y-1">
                                {toc.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className="block w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-iaeva-blue dark:hover:text-iaeva-teal hover:bg-iaeva-blue/5 rounded-md transition-colors"
                                    >
                                        {item.title}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </aside>
                )}

                {/* Main Content */}
                <main className="flex-1 max-w-3xl mx-auto prose prose-lg prose-slate dark:prose-invert prose-headings:font-display prose-headings:font-bold prose-a:text-iaeva-blue">
                    {children}
                </main>
            </div>

            <StickyDownloadBar onDownload={onDownload} />
        </PageLayout>
    );
};

export default GuideLayout;
