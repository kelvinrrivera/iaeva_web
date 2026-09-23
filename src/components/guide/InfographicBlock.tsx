import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface InfographicBlockProps {
    title: string;
    type: "stat" | "process" | "comparison";
    data: any;
    className?: string;
}

const InfographicBlock: React.FC<InfographicBlockProps> = ({ title, type, data, className }) => {
    return (
        <Card className={cn("border-iaeva-blue/20 bg-gradient-to-br from-white to-iaeva-blue/5 dark:from-gray-900 dark:to-iaeva-blue/10 overflow-hidden my-8", className)}>
            <CardHeader className="bg-iaeva-blue/5 border-b border-iaeva-blue/10">
                <CardTitle className="text-lg font-bold text-center text-iaeva-blue dark:text-iaeva-teal uppercase tracking-wide">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                {type === "stat" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.map((item: any, idx: number) => (
                            <div key={idx} className="text-center p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-iaeva-blue/10">
                                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-iaeva-blue to-iaeva-teal mb-2">
                                    {item.value}
                                </div>
                                <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {type === "comparison" && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white font-bold">
                                <tr>
                                    <th className="p-3">Proceso Tradicional</th>
                                    <th className="p-3 text-iaeva-teal">Con IAEVA (IA)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {data.map((item: any, idx: number) => (
                                    <tr key={idx}>
                                        <td className="p-3 text-red-500/80 bg-red-50/50 dark:bg-red-900/10 font-medium">❌ {item.traditional}</td>
                                        <td className="p-3 text-teal-600 dark:text-teal-400 bg-teal-50/50 dark:bg-teal-900/10 font-bold">✅ {item.ai}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default InfographicBlock;
