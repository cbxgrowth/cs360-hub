
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/hooks/useAuth';
import { SuperAdminProvider } from '@/hooks/useSuperAdmin';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { LoadingState, DashboardLoadingState, ClientsLoadingState, ReportsLoadingState } from '@/components/ui/loading-state';
import { RoutePreloader } from '@/utils/routePreloader';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Pages (Lazy Loading)
const Landing = React.lazy(() => import('./pages/Landing'));
// Fallback simples para debug
const SimpleLanding = React.lazy(() => import('./components/SimpleLanding').then(module => ({ default: module.SimpleLanding })));
// Fallback ultra-simples para debug profundo
const UltraSimpleLanding = React.lazy(() => import('./components/UltraSimpleLanding').then(module => ({ default: module.UltraSimpleLanding })));
// Componente de diagnóstico para identificar problemas
const DiagnosticLanding = React.lazy(() => import('./components/DiagnosticLanding').then(module => ({ default: module.DiagnosticLanding })));
// Componente MÍNIMO - sem hooks, sem imports complexos
const MinimalLanding = React.lazy(() => import('./components/MinimalLanding').then(module => ({ default: module.MinimalLanding })));
// Componente ESTÁTICO - HTML puro com debug
const StaticLanding = React.lazy(() => import('./components/StaticLanding').then(module => ({ default: module.StaticLanding })));
// Componente que SEMPRE funciona - resolve tela branca
const WorkingLanding = React.lazy(() => import('./components/WorkingLanding').then(module => ({ default: module.WorkingLanding })));
const DashboardApp = React.lazy(() => import('./pages/App'));
const Clients = React.lazy(() => import('./pages/Clients'));
const Contracts = React.lazy(() => import('./pages/Contracts'));
const Reports = React.lazy(() => import('./pages/Reports'));
const Goals = React.lazy(() => import('./pages/Goals'));
const Services = React.lazy(() => import('./pages/Services'));
const NPS = React.lazy(() => import('./pages/NPS'));
const LTVCAC = React.lazy(() => import('./pages/LTVCAC'));
const Strategies = React.lazy(() => import('./pages/Strategies'));
const Automation = React.lazy(() => import('./pages/Automation'));
const Partners = React.lazy(() => import('./pages/Partners'));
const Campaigns = React.lazy(() => import('./pages/Campaigns'));
const PartnerPortalPage = React.lazy(() => import('./pages/PartnerPortalPage'));
const Admin = React.lazy(() => import('./pages/Admin'));
const SuperAdmin = React.lazy(() => import('./pages/SuperAdmin'));
const Features = React.lazy(() => import('./pages/Features'));
const Pricing = React.lazy(() => import('./pages/Pricing'));
const PartnersProgram = React.lazy(() => import('./pages/PartnersProgram'));
const PartnerPortalWebsite = React.lazy(() => import('./pages/PartnerPortalWebsite'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const ExecutiveDemo = React.lazy(() => import('./pages/ExecutiveDemo'));
const Onboarding = React.lazy(() => import('./pages/Onboarding'));
const SuperAdminLogin = React.lazy(() => import('./pages/SuperAdminLogin'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Summary = React.lazy(() => import('./pages/Summary'));

// New Detail Pages
const NPSDetails = React.lazy(() => import('./pages/NPSDetails'));
const ChurnStrategies = React.lazy(() => import('./pages/ChurnStrategies'));

// New Category Pages
const CategoryTechnology = React.lazy(() => import('./pages/CategoryTechnology'));
const CategoryHealth = React.lazy(() => import('./pages/CategoryHealth'));
const CategoryFinancial = React.lazy(() => import('./pages/CategoryFinancial'));
const CategoryEcommerce = React.lazy(() => import('./pages/CategoryEcommerce'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  // Precarregar rotas críticas em background
  React.useEffect(() => {
    RoutePreloader.preloadCriticalRoutes();
  }, []);

  return (
    // <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <SuperAdminProvider>
              <Router>
                <div className="App">
                  <Suspense fallback={<LoadingState />}>
                    <Routes>
                  {/* Public Website Routes */}
                  <Route path="/" element={<WorkingLanding />} />
                  <Route path="/static" element={<StaticLanding />} />
                  <Route path="/minimal" element={<MinimalLanding />} />
                  <Route path="/diagnostic" element={<DiagnosticLanding />} />
                  <Route path="/ultra-simple" element={<UltraSimpleLanding />} />
                  <Route path="/landing-simple" element={<SimpleLanding />} />
                  <Route path="/landing-full" element={<Landing />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/partners-program" element={<PartnersProgram />} />
                  <Route path="/partner-portal-website" element={<PartnerPortalWebsite />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  {/* Super Admin dedicated login */}
                  <Route path="/super-admin-login" element={<SuperAdminLogin />} />
                  <Route path="/executive-demo" element={<ExecutiveDemo />} />

                  {/* Onboarding Route */}
                  <Route path="/onboarding" element={
                    <ProtectedRoute>
                      <Onboarding />
                    </ProtectedRoute>
                  } />

                  {/* Protected Application Routes */}
                  <Route path="/app" element={
                    <ProtectedRoute>
                      <Suspense fallback={<DashboardLoadingState />}>
                        <DashboardApp />
                      </Suspense>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/goals" element={
                    <ProtectedRoute>
                      <Goals />
                    </ProtectedRoute>
                  } />
                  <Route path="/clients" element={
                    <ProtectedRoute>
                      <Suspense fallback={<ClientsLoadingState />}>
                        <Clients />
                      </Suspense>
                    </ProtectedRoute>
                  } />
                  <Route path="/contracts" element={
                    <ProtectedRoute>
                      <Contracts />
                    </ProtectedRoute>
                  } />
                  <Route path="/services" element={
                    <ProtectedRoute>
                      <Services />
                    </ProtectedRoute>
                  } />
                  <Route path="/nps" element={
                    <ProtectedRoute>
                      <NPS />
                    </ProtectedRoute>
                  } />
                  <Route path="/ltvcac" element={
                    <ProtectedRoute>
                      <LTVCAC />
                    </ProtectedRoute>
                  } />
                  <Route path="/strategies" element={
                    <ProtectedRoute>
                      <Strategies />
                    </ProtectedRoute>
                  } />
                  <Route path="/automation" element={
                    <ProtectedRoute>
                      <Automation />
                    </ProtectedRoute>
                  } />
                  <Route path="/reports" element={
                    <ProtectedRoute>
                      <Suspense fallback={<ReportsLoadingState />}>
                        <Reports />
                      </Suspense>
                    </ProtectedRoute>
                  } />

                  {/* Protected Partner Management Routes */}
                  <Route path="/partners" element={
                    <ProtectedRoute>
                      <Partners />
                    </ProtectedRoute>
                  } />
                  <Route path="/campaigns" element={
                    <ProtectedRoute>
                      <Campaigns />
                    </ProtectedRoute>
                  } />
                  <Route path="/partner-portal" element={
                    <ProtectedRoute>
                      <PartnerPortalPage />
                    </ProtectedRoute>
                  } />

                  {/* Protected Admin Routes */}
                  <Route path="/admin" element={
                    <ProtectedRoute>
                      <Admin />
                    </ProtectedRoute>
                  } />
                  <Route path="/super-admin" element={
                    <ProtectedRoute>
                      <SuperAdmin />
                    </ProtectedRoute>
                  } />

                  {/* Profile and Summary routes */}
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                  <Route path="/resumo" element={
                    <ProtectedRoute>
                      <Summary />
                    </ProtectedRoute>
                  } />

                  {/* Detail Pages Routes */}
                  <Route path="/nps-details" element={
                    <ProtectedRoute>
                      <NPSDetails />
                    </ProtectedRoute>
                  } />
                  <Route path="/churn-strategies" element={
                    <ProtectedRoute>
                      <ChurnStrategies />
                    </ProtectedRoute>
                  } />

                  {/* Category Pages Routes */}
                  <Route path="/category-technology" element={
                    <ProtectedRoute>
                      <CategoryTechnology />
                    </ProtectedRoute>
                  } />
                  <Route path="/category-health" element={
                    <ProtectedRoute>
                      <CategoryHealth />
                    </ProtectedRoute>
                  } />
                  <Route path="/category-financial" element={
                    <ProtectedRoute>
                      <CategoryFinancial />
                    </ProtectedRoute>
                  } />
                  <Route path="/category-ecommerce" element={
                    <ProtectedRoute>
                      <CategoryEcommerce />
                    </ProtectedRoute>
                  } />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
                <Toaster />
              </div>
            </Router>
          </SuperAdminProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
    // </ErrorBoundary>
  );
}

export default App;
