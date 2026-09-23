import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import OptimizedLoader from "@/components/shared/OptimizedLoader";
import Index from "./pages/Index";
import { loadDeferredScripts } from "./utils/deferScripts";
import LanguageRouterProvider from "@/components/layout/LanguageRouterProvider";
import IdealWeightPage from "./pages/recursos/calculadora-peso-ideal";
import IdealWeightPageFR from "./pages/fr/calculatrice-poids-ideal";

// Carga diferida de componentes no críticos
const CasosDeUso = lazy(() => import("./pages/CasosDeUso"));
const Contacto = lazy(() => import("./pages/Contacto"));
const CalculadoraROI = lazy(() => import("./pages/CalculadoraROI"));
const BlogPage = lazy(() => import("./pages/blog/index"));
const BlogPostPage = lazy(() => import("./pages/blog/slug"));
const NotFound = lazy(() => import("./pages/NotFound"));
const NotFoundFR = lazy(() => import("./pages/fr/404"));
const SearchPage = lazy(() => import("./pages/buscar"));
const ResourcesPage = lazy(() => import("./pages/recursos"));
const TermsAndConditions = lazy(() => import("./pages/terminos-y-condiciones"));
const PrivacyPolicy = lazy(() => import("./pages/politica-de-privacidad"));


// Pilares de contenido - Healthcare Virtual Assistant Solutions
const DentalClinicAssistant = lazy(() => import("./pages/dental-clinic-assistant"));
const PhysiotherapyPracticeManagement = lazy(() => import("./pages/physiotherapy-practice-management"));
const OphthalmologyPatientCare = lazy(() => import("./pages/ophthalmology-patient-care"));
const MedicalCenterEfficiency = lazy(() => import("./pages/medical-center-efficiency"));
const PatientManagementSolutions = lazy(() => import("./pages/patient-management-solutions"));
const ReduccionAbsentismo = lazy(() => import("./pages/reduccion-absentismo"));
const RecepcionistaVirtualMedica = lazy(() => import("./pages/recepcionista-virtual-medica"));
const IAParaClinicas = lazy(() => import("./pages/ia-para-clinicas"));
const AsistenteIAFisioterapia = lazy(() => import("./pages/asistente-ia-fisioterapia"));
const GuiaEficienciaClinica = lazy(() => import("./pages/recursos/guia-eficiencia"));

// Versiones en francés - Solutions en français
const DentalClinicAssistantFR = lazy(() => import("./pages/fr/dental-clinic-assistant"));
const PhysiotherapyPracticeManagementFR = lazy(() => import("./pages/fr/physiotherapy-practice-management"));
const OphthalmologyPatientCareFR = lazy(() => import("./pages/fr/ophthalmology-patient-care"));
const MedicalCenterEfficiencyFR = lazy(() => import("./pages/fr/medical-center-efficiency"));
const PatientManagementSolutionsFR = lazy(() => import("./pages/fr/patient-management-solutions"));
const RessourcesPageFR = lazy(() => import("./pages/fr/ressources/index"));
const RecepcionistaVirtualMedicaFR = lazy(() => import("./pages/fr/recepcionista-virtual-medica"));
const IAParaClinicasFR = lazy(() => import("./pages/fr/ia-para-clinicas"));
const AsistenteIAFisioterapiaFR = lazy(() => import("./pages/fr/asistente-ia-fisioterapia"));
const GuiaEficienciaClinicaFR = lazy(() => import("./pages/fr/guia-eficiencia"));
const ReduccionAbsentismoFR = lazy(() => import("./pages/fr/reduccion-absentismo"));
// These pages are not created yet
// const BMICalculatorPageFR = lazy(() => import("./pages/fr/calculatrice-imc"));
// const UnitConverterPageFR = lazy(() => import("./pages/fr/convertisseur-unites"));

// Recursos médicos
const RecursosPage = lazy(() => import("./pages/recursos/index"));
const BMICalculatorPage = lazy(() => import("./pages/recursos/calculadora-imc"));
const UnitConverterPage = lazy(() => import("./pages/recursos/conversor-unidades"));

// Páginas legales
const PoliticaDePrivacidad = lazy(() => import("./pages/PoliticaDePrivacidad"));
const TerminosYCondiciones = lazy(() => import("./pages/TerminosYCondiciones"));
const PoliticaDeCookies = lazy(() => import("./pages/PoliticaDeCookies"));
const PolitiqueDeConfidentialite = lazy(() => import("./pages/PolitiqueDeConfidentialite"));
const ConditionsUtilisation = lazy(() => import("./pages/ConditionsUtilisation"));
const PolitiqueDesCookies = lazy(() => import("./pages/PolitiqueDesCookies"));

// Legal pages in Spanish
// const PrivacyPolicySpanish = lazy(() => import('@/pages/legal/PrivacyPolicy'));

// Componente de carga para rutas
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

// Crear un único cliente de consulta para toda la aplicación
const queryClient = new QueryClient();

// Add this component near the top of the file
const NotFoundRedirect = () => <Navigate to="/404" replace />;

const App = () => {
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const [appReady, setAppReady] = useState(false);

  // Precargar imágenes críticas
  useEffect(() => {
    const preloadImages = [
      "/images/iaeva-assistant.webp?width=380&quality=80"
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

    // Set app ready regardless of image load state after a reasonable timeout
    const timer = setTimeout(() => {
      setAppReady(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Load non-critical third-party scripts
  useEffect(() => {
    if (appReady) {
      loadDeferredScripts([
        // No script references here - they've been removed as unnecessary
        // Add other non-critical scripts here if needed in the future
      ]);
    }
  }, [appReady]);

  // Combine states to determine if we should show the main app
  const showMainApp = appReady || imagesPreloaded;

  return (
    <>
      {!showMainApp && <OptimizedLoader minimumLoadTimeMs={800} />}

      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <LanguageRouterProvider>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/casos-de-uso" element={
                    <Suspense fallback={<PageLoader />}>
                      <CasosDeUso />
                    </Suspense>
                  } />
                  <Route path="/calculadora-roi" element={
                    <Suspense fallback={<PageLoader />}>
                      <CalculadoraROI />
                    </Suspense>
                  } />
                  <Route path="/contacto" element={
                    <Suspense fallback={<PageLoader />}>
                      <Contacto />
                    </Suspense>
                  } />
                  <Route path="/blog" element={
                    <Suspense fallback={<PageLoader />}>
                      <BlogPage />
                    </Suspense>
                  } />
                  <Route path="/blog/:slug" element={
                    <Suspense fallback={<PageLoader />}>
                      <BlogPostPage />
                    </Suspense>
                  } />

                  {/* Pilares de contenido - Healthcare Virtual Assistant Solutions */}
                  <Route path="/dental-clinic-assistant" element={
                    <Suspense fallback={<PageLoader />}>
                      <DentalClinicAssistant />
                    </Suspense>
                  } />
                  <Route path="/physiotherapy-practice-management" element={
                    <Suspense fallback={<PageLoader />}>
                      <PhysiotherapyPracticeManagement />
                    </Suspense>
                  } />
                  <Route path="/ophthalmology-patient-care" element={
                    <Suspense fallback={<PageLoader />}>
                      <OphthalmologyPatientCare />
                    </Suspense>
                  } />
                  <Route path="/medical-center-efficiency" element={
                    <Suspense fallback={<PageLoader />}>
                      <MedicalCenterEfficiency />
                    </Suspense>
                  } />
                  <Route path="/patient-management-solutions" element={
                    <Suspense fallback={<PageLoader />}>
                      <PatientManagementSolutions />
                    </Suspense>
                  } />

                  {/* Versiones en francés - Solutions en français */}
                  <Route path="/fr/dental-clinic-assistant" element={
                    <Suspense fallback={<PageLoader />}>
                      <DentalClinicAssistantFR />
                    </Suspense>
                  } />
                  <Route path="/fr/physiotherapy-practice-management" element={
                    <Suspense fallback={<PageLoader />}>
                      <PhysiotherapyPracticeManagementFR />
                    </Suspense>
                  } />
                  <Route path="/fr/ophthalmology-patient-care" element={
                    <Suspense fallback={<PageLoader />}>
                      <OphthalmologyPatientCareFR />
                    </Suspense>
                  } />
                  <Route path="/fr/medical-center-efficiency" element={
                    <Suspense fallback={<PageLoader />}>
                      <MedicalCenterEfficiencyFR />
                    </Suspense>
                  } />

                  {/* Nuevas Landing Pages SEO */}
                  <Route path="/recepcionista-virtual-medica" element={
                    <Suspense fallback={<PageLoader />}>
                      <RecepcionistaVirtualMedica />
                    </Suspense>
                  } />
                  <Route path="/ia-para-clinicas" element={
                    <Suspense fallback={<PageLoader />}>
                      <IAParaClinicas />
                    </Suspense>
                  } />
                  <Route path="/asistente-ia-fisioterapia" element={
                    <Suspense fallback={<PageLoader />}>
                      <AsistenteIAFisioterapia />
                    </Suspense>
                  } />
                  <Route path="/reduccion-absentismo" element={
                    <Suspense fallback={<PageLoader />}>
                      <ReduccionAbsentismo />
                    </Suspense>
                  } />
                  <Route path="/fr/patient-management-solutions" element={
                    <Suspense fallback={<PageLoader />}>
                      <PatientManagementSolutionsFR />
                    </Suspense>
                  } />

                  {/* Nuevas Landing Pages SEO - Versión Francés */}
                  <Route path="/fr/recepcionista-virtual-medica" element={
                    <Suspense fallback={<PageLoader />}>
                      <RecepcionistaVirtualMedicaFR />
                    </Suspense>
                  } />
                  <Route path="/fr/ia-para-clinicas" element={
                    <Suspense fallback={<PageLoader />}>
                      <IAParaClinicasFR />
                    </Suspense>
                  } />
                  <Route path="/fr/asistente-ia-fisioterapia" element={
                    <Suspense fallback={<PageLoader />}>
                      <AsistenteIAFisioterapiaFR />
                    </Suspense>
                  } />
                  <Route path="/fr/reduccion-absentismo" element={
                    <Suspense fallback={<PageLoader />}>
                      <ReduccionAbsentismoFR />
                    </Suspense>
                  } />
                  <Route path="/fr/recursos/guia-eficiencia-clinica" element={
                    <Suspense fallback={<PageLoader />}>
                      <GuiaEficienciaClinicaFR />
                    </Suspense>
                  } />

                  <Route path="/fr/ressources" element={<NotFoundRedirect />} />

                  {/* Redirecciones temporales a componentes españoles con idioma francés */}
                  <Route path="/fr/calculatrice-roi" element={
                    <Suspense fallback={<PageLoader />}>
                      <CalculadoraROI />
                    </Suspense>
                  } />
                  <Route path="/fr/contact" element={
                    <Suspense fallback={<PageLoader />}>
                      <Contacto />
                    </Suspense>
                  } />
                  <Route path="/fr/cas-usage" element={
                    <Suspense fallback={<PageLoader />}>
                      <CasosDeUso />
                    </Suspense>
                  } />
                  <Route path="/fr/blog" element={<Navigate to="/blog" replace />} />
                  <Route path="/fr/blog/:slug" element={<Navigate to="/blog" replace />} />
                  <Route path="/fr" element={<Index />} />

                  {/* Páginas legales en francés */}
                  <Route path="/fr/politique-de-confidentialite" element={
                    <Suspense fallback={<PageLoader />}>
                      <PolitiqueDeConfidentialite />
                    </Suspense>
                  } />
                  <Route path="/fr/conditions-utilisation" element={
                    <Suspense fallback={<PageLoader />}>
                      <ConditionsUtilisation />
                    </Suspense>
                  } />
                  <Route path="/fr/politique-des-cookies" element={
                    <Suspense fallback={<PageLoader />}>
                      <PolitiqueDesCookies />
                    </Suspense>
                  } />

                  {/* French 404 page */}
                  <Route path="/fr/404" element={
                    <Suspense fallback={<PageLoader />}>
                      <NotFoundFR />
                    </Suspense>
                  } />

                  {/* Rutas de recursos médicos */}
                  <Route path="/recursos" element={<NotFoundRedirect />} />
                  <Route path="/recursos/calculadora-imc" element={<NotFoundRedirect />} />
                  <Route path="/recursos/calculadora-peso-ideal" element={<NotFoundRedirect />} />
                  <Route path="/recursos/conversor-unidades" element={<NotFoundRedirect />} />

                  {/* Nueva Pillar Page */}
                  <Route path="/recursos/guia-eficiencia-clinica" element={
                    <Suspense fallback={<PageLoader />}>
                      <GuiaEficienciaClinica />
                    </Suspense>
                  } />

                  {/* Páginas legales en español */}
                  <Route path="/politica-de-privacidad" element={
                    <Suspense fallback={<PageLoader />}>
                      <PrivacyPolicy />
                    </Suspense>
                  } />
                  <Route path="/terminos-y-condiciones" element={
                    <Suspense fallback={<PageLoader />}>
                      <TermsAndConditions />
                    </Suspense>
                  } />
                  <Route path="/politica-de-cookies" element={
                    <Suspense fallback={<PageLoader />}>
                      <PoliticaDeCookies />
                    </Suspense>
                  } />

                  {/* Search page */}
                  <Route path="/buscar" element={
                    <Suspense fallback={<PageLoader />}>
                      <SearchPage />
                    </Suspense>
                  } />





                  {/* Redirecciones de rutas antiguas */}
                  <Route path="/herramientas" element={<NotFoundRedirect />} />
                  <Route path="/herramientas/calculadora-imc" element={<NotFoundRedirect />} />
                  <Route path="/herramientas/conversor-unidades" element={<NotFoundRedirect />} />
                  <Route path="/iaeva-healthcare-assistant" element={<Navigate to="/patient-management-solutions" replace />} />
                  <Route path="/patient-no-show-prevention" element={<Navigate to="/patient-management-solutions" replace />} />
                  <Route path="/healthcare-efficiency" element={<Navigate to="/medical-center-efficiency" replace />} />
                  <Route path="/ai-healthcare-trends" element={<Navigate to="/" replace />} />
                  <Route path="/medical-tools" element={<NotFoundRedirect />} />
                  <Route path="/terminos-servicio" element={<Navigate to="/terminos-y-condiciones" replace />} />
                  <Route path="/politica-privacidad" element={<Navigate to="/politica-de-privacidad" replace />} />

                  {/* Redirecciones de rutas francesas antiguas a nuevas */}
                  <Route path="/fr/contacto" element={<Navigate to="/fr/contact" replace />} />
                  <Route path="/fr/calculadora-roi" element={<Navigate to="/fr/calculatrice-roi" replace />} />
                  <Route path="/fr/index" element={<Navigate to="/fr" replace />} />
                  <Route path="/politique-de-confidentialite" element={<Navigate to="/fr/politique-de-confidentialite" replace />} />
                  <Route path="/conditions-utilisation" element={<Navigate to="/fr/conditions-utilisation" replace />} />
                  <Route path="/politique-des-cookies" element={<Navigate to="/fr/politique-des-cookies" replace />} />

                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={
                    <Suspense fallback={<PageLoader />}>
                      <NotFound />
                    </Suspense>
                  } />
                </Routes>
              </LanguageRouterProvider>
            </BrowserRouter>
          </TooltipProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
