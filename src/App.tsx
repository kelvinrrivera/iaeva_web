
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import CasosDeUso from "./pages/CasosDeUso";
import Contacto from "./pages/Contacto";
import CalculadoraROI from "./pages/CalculadoraROI";
import NotFound from "./pages/NotFound";
import "./App.css";

// Crear un único cliente de consulta para toda la aplicación
const queryClient = new QueryClient();

const App = () => {
  const [imagesPreloaded, setImagesPreloaded] = useState(false);

  // Precargar imágenes críticas
  useEffect(() => {
    const preloadImages = [
      "/images/Dr. Carlos Méndez.webp",
      "/images/Dra. Ana Rodríguez.webp",
      "/images/iaeva-assistant-front.webp",
      "/images/iaeva-assistant.webp",
      "public/images/Laura Fernández.webp"
    ];
    
    let loadedCount = 0;
    
    preloadImages.forEach(src => {
      const img = new Image();
      img.onload = () => {
        loadedCount += 1;
        if (loadedCount === preloadImages.length) {
          setImagesPreloaded(true);
        }
      };
      img.onerror = () => {
        loadedCount += 1;
        if (loadedCount === preloadImages.length) {
          setImagesPreloaded(true);
        }
      };
      img.src = src;
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/casos-de-uso" element={<CasosDeUso />} />
            <Route path="/calculadora-roi" element={<CalculadoraROI />} />
            <Route path="/contacto" element={<Contacto />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
