import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importar todos os componentes e páginas
import { ThemeProvider } from './contexts/ThemeContext';
import { LoadingProvider } from './contexts/LoadingContext';
import { SuperAdminProvider } from './hooks/useSuperAdmin';
import { ProtectedRoute } from './components/ProtectedRoute';

// Lazy loading para todas as páginas
const Landing = React.lazy(() => import('./pages/Landing'));
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
const NPSDetails = React.lazy(() => import('./pages/NPSDetails'));
const ChurnStrategies = React.lazy(() => import('./pages/ChurnStrategies'));
const CategoryTechnology = React.lazy(() => import('./pages/CategoryTechnology'));
const CategoryHealth = React.lazy(() => import('./pages/CategoryHealth'));
const CategoryFinancial = React.lazy(() => import('./pages/CategoryFinancial'));
const CategoryEcommerce = React.lazy(() => import('./pages/CategoryEcommerce'));

// App principal
const DashboardApp = React.lazy(() => import('./pages/App'));
const Clients = React.lazy(() => import('./pages/Clients'));
const Contracts = React.lazy(() => import('./pages/Contracts'));
const Reports = React.lazy(() => import('./pages/Reports'));
const Goals = React.lazy(() => import('./pages/Goals'));
const Services = React.lazy(() => import('./pages/Services'));
const Strategies = React.lazy(() => import('./pages/Strategies'));
const Automation = React.lazy(() => import('./pages/Automation'));
const Partners = React.lazy(() => import('./pages/Partners'));
const Campaigns = React.lazy(() => import('./pages/Campaigns'));
const PartnerPortalPage = React.lazy(() => import('./pages/PartnerPortalPage'));
const Admin = React.lazy(() => import('./pages/Admin'));
const SuperAdmin = React.lazy(() => import('./pages/SuperAdmin'));
const NPS = React.lazy(() => import('./pages/NPS'));
const LTVCAC = React.lazy(() => import('./pages/LTVCAC'));

// Componentes de loading
const LoadingState = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontFamily: 'Arial, sans-serif'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid rgba(255,255,255,0.3)',
        borderTop: '4px solid white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 20px'
      }}></div>
      <h2 style={{ margin: '0', fontWeight: '500' }}>CS360° Hub</h2>
      <p style={{ margin: '10px 0 0 0', opacity: 0.8 }}>Carregando aplicação...</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  </div>
);

const DashboardLoadingState = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f8fafc',
    color: '#64748b',
    fontFamily: 'Arial, sans-serif'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid #e2e8f0',
        borderTop: '4px solid #3b82f6',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 20px'
      }}></div>
      <h2 style={{ margin: '0', fontWeight: '500' }}>Carregando Dashboard...</h2>
      <p style={{ margin: '10px 0 0 0', opacity: 0.8 }}>Preparando sua experiência...</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  </div>
);

const ClientsLoadingState = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f8fafc',
    color: '#64748b',
    fontFamily: 'Arial, sans-serif'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid #e2e8f0',
        borderTop: '4px solid #3b82f6',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 20px'
      }}></div>
      <h2 style={{ margin: '0', fontWeight: '500' }}>Carregando Clientes...</h2>
      <p style={{ margin: '10px 0 0 0', opacity: 0.8 }}>Preparando dados dos clientes...</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  </div>
);

const ReportsLoadingState = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f8fafc',
    color: '#64748b',
    fontFamily: 'Arial, sans-serif'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid #e2e8f0',
        borderTop: '4px solid #3b82f6',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 20px'
      }}></div>
      <h2 style={{ margin: '0', fontWeight: '500' }}>Carregando Relatórios...</h2>
      <p style={{ margin: '10px 0 0 0', opacity: 0.8 }}>Preparando análises...</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  </div>
);

// Preloader para rotas críticas
const RoutePreloader = () => {
  React.useEffect(() => {
    // Preload critical routes
    import('./pages/App');
    import('./pages/Clients');
    import('./pages/Reports');
  }, []);
  
  return null;
};

// App principal com todas as funcionalidades
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LoadingProvider>
        <SuperAdminProvider>
          <Router>
            <div className="App">
              <RoutePreloader />
              <Suspense fallback={<LoadingState />}>
                <Routes>
                  {/* Public Website Routes */}
                  <Route path="/" element={<Landing />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/partners-program" element={<PartnersProgram />} />
                  <Route path="/partner-portal-website" element={<PartnerPortalWebsite />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/executive-demo" element={<ExecutiveDemo />} />
                  <Route path="/onboarding" element={<Onboarding />} />
                  <Route path="/super-admin-login" element={<SuperAdminLogin />} />
                  
                  {/* Protected Routes */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Suspense fallback={<DashboardLoadingState />}>
                        <DashboardApp />
                      </Suspense>
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
                      <Suspense fallback={<DashboardLoadingState />}>
                        <Contracts />
                      </Suspense>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/reports" element={
                    <ProtectedRoute>
                      <Suspense fallback={<ReportsLoadingState />}>
                        <Reports />
                      </Suspense>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/goals" element={
                    <ProtectedRoute>
                      <Suspense fallback={<DashboardLoadingState />}>
                        <Goals />
                      </Suspense>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/services" element={
                    <ProtectedRoute>
                      <Suspense fallback={<DashboardLoadingState />}>
                        <Services />
                      </Suspense>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/strategies" element={
                    <ProtectedRoute>
                      <Suspense fallback={<DashboardLoadingState />}>
                        <Strategies />
                      </Suspense>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/automation" element={
                    <ProtectedRoute>
                      <Suspense fallback={<DashboardLoadingState />}>
                        <Automation />
                      </Suspense>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/partners" element={
                    <ProtectedRoute>
                      <Suspense fallback={<DashboardLoadingState />}>
                        <Partners />
                      </Suspense>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/campaigns" element={
                    <ProtectedRoute>
                      <Suspense fallback={<DashboardLoadingState />}>
                        <Campaigns />
                      </Suspense>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/partner-portal" element={
                    <ProtectedRoute>
                      <Suspense fallback={<DashboardLoadingState />}>
                        <PartnerPortalPage />
                      </Suspense>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/admin" element={
                    <ProtectedRoute>
                      <Suspense fallback={<DashboardLoadingState />}>
                        <Admin />
                      </Suspense>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/super-admin" element={
                    <ProtectedRoute>
                      <Suspense fallback={<DashboardLoadingState />}>
                        <SuperAdmin />
                      </Suspense>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/nps" element={
                    <ProtectedRoute>
                      <Suspense fallback={<DashboardLoadingState />}>
                        <NPS />
                      </Suspense>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/ltvcac" element={
                    <ProtectedRoute>
                      <Suspense fallback={<DashboardLoadingState />}>
                        <LTVCAC />
                      </Suspense>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Suspense fallback={<DashboardLoadingState />}>
                        <Profile />
                      </Suspense>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/summary" element={
                    <ProtectedRoute>
                      <Suspense fallback={<DashboardLoadingState />}>
                        <Summary />
                      </Suspense>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/nps-details" element={
                    <ProtectedRoute>
                      <Suspense fallback={<DashboardLoadingState />}>
                        <NPSDetails />
                      </Suspense>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/churn-strategies" element={
                    <ProtectedRoute>
                      <Suspense fallback={<DashboardLoadingState />}>
                        <ChurnStrategies />
                      </Suspense>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/category-technology" element={
                    <ProtectedRoute>
                      <Suspense fallback={<DashboardLoadingState />}>
                        <CategoryTechnology />
                      </Suspense>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/category-health" element={
                    <ProtectedRoute>
                      <Suspense fallback={<DashboardLoadingState />}>
                        <CategoryHealth />
                      </Suspense>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/category-financial" element={
                    <ProtectedRoute>
                      <Suspense fallback={<DashboardLoadingState />}>
                        <CategoryFinancial />
                      </Suspense>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/category-ecommerce" element={
                    <ProtectedRoute>
                      <Suspense fallback={<DashboardLoadingState />}>
                        <CategoryEcommerce />
                      </Suspense>
                    </ProtectedRoute>
                  } />
                  
                  {/* Redirect root to dashboard if authenticated, otherwise to landing */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </div>
          </Router>
        </SuperAdminProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
};

export default App;