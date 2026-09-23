
import React from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles, Copy, ExternalLink, Check } from "lucide-react";
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

export const SummarizeWithAI: React.FC<{ className?: string }> = ({ className }) => {
    const location = useLocation();
    const [copied, setCopied] = useState(false);

    const handleSummarize = () => {
        // Construct the prompt with production URL
        const currentUrl = `https://iaeva.com${location.pathname}`;
        const prompt = `Por favor, resume los puntos clave de este artículo: ${currentUrl}`;

        // Open ChatGPT with pre-filled query
        window.open(`https://chatgpt.com/?q=${encodeURIComponent(prompt)}`, '_blank');

        // Also copy to clipboard as backup
        navigator.clipboard.writeText(prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`flex flex-col gap-2 p-4 bg-iaeva-bg-light/50 border border-iaeva-purple/20 rounded-xl backdrop-blur-sm ${className}`}>
            <div className="flex items-center gap-2 text-iaeva-purple font-semibold">
                <Sparkles className="w-5 h-5 text-iaeva-purple animate-pulse" />
                <span>Resumir con IA</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
                ¿Tienes poco tiempo? Copia el prompt y obten un resumen instantáneo en ChatGPT.
            </p>
            <Button
                onClick={handleSummarize}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md transition-all group"
            >
                {copied ? (
                    <>
                        <Check className="w-4 h-4 mr-2" />
                        Prompt Copiado
                    </>
                ) : (
                    <>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Abrir ChatGPT
                    </>
                )}
            </Button>
            {copied && (
                <span className="text-xs text-green-600 text-center font-medium animate-in fade-in slide-in-from-bottom-1">
                    Prompt copiado. ¡Ahora pégalo en ChatGPT!
                </span>
            )}
        </div>
    );
};
