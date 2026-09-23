import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    title?: string;
    subtitle?: string;
    items: FAQItem[];
    className?: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({
    title = "Preguntas Frecuentes",
    subtitle = "Resolvemos tus dudas sobre la implementación de IA en tu clínica.",
    items,
    className
}) => {
    return (
        <section className={cn("py-20 bg-white", className)}>
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-3xl font-display font-bold text-gray-900">{title}</h2>
                    <p className="text-lg text-gray-600">{subtitle}</p>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {items.map((item, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className="bg-gray-50 px-6 rounded-2xl border-none data-[state=open]:bg-white data-[state=open]:shadow-md transition-all duration-200"
                        >
                            <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline py-6">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 text-base leading-relaxed pb-6">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
};

export default FAQSection;
