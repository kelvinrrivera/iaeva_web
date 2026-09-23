import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Download, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StickyDownloadBarProps {
    onDownload: () => void;
    pdfTitle?: string;
}

const StickyDownloadBar: React.FC<StickyDownloadBarProps> = ({
    onDownload,
    pdfTitle = "Guía Completa de Eficiencia Clínica"
}) => {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${totalScroll / windowHeight}`;
            const scrollPercentage = Number(scroll);

            setProgress(scrollPercentage * 100);

            // Show after scrolling 10%
            if (scrollPercentage > 0.1) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 shadow-2xl safe-p-b"
                >
                    {/* Progress Bar */}
                    <Progress value={progress} className="h-1 w-full rounded-none absolute top-0 left-0 bg-transparent [&>div]:bg-iaeva-teal" />

                    <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 hidden md:flex">
                            <div className="p-2 bg-iaeva-blue/10 rounded-lg">
                                <FileText className="h-5 w-5 text-iaeva-blue" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-tight">
                                    {pdfTitle}
                                </p>
                                <p className="text-xs text-gray-500">Lectura gratuita • Descarga disponible</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 flex-1 md:flex-none justify-end">
                            <span className="text-xs font-medium text-gray-500 hidden sm:inline-block">
                                {Math.round(progress)}% leído
                            </span>
                            <Button
                                onClick={onDownload}
                                className="bg-iaeva-teal hover:bg-iaeva-teal/90 text-white font-semibold shadow-glow-sm"
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Descargar PDF
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default StickyDownloadBar;
