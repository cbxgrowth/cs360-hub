
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/hooks/useAuth';
import { SuperAdminProvider } from '@/hooks/useSuperAdmin';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

// Pages
import Landing from './pages/Landing';
import DashboardApp from './pages/App';
import Clients from './pages/Clients';
import Contracts from './pages/Contracts';
import Reports from './pages/Reports';
import Goals from './pages/Goals';
import Services from './pages/Services';
import NPS from './pages/NPS';
import LTVCAC from './pages/LTVCAC';
import Strategies from './pages/Strategies';
import Automation from './pages/Automation';
import Partners from './pages/Partners';
import Campaigns from './pages/Campaigns';
import PartnerPortalPage from './pages/PartnerPortalPage';
import Admin from './pages/Admin';
import SuperAdmin from './pages/SuperAdmin';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import PartnersProgram from './pages/PartnersProgram';
import PartnerPortalWebsite from './pages/PartnerPortalWebsite';
import Login from './pages/Login';
import Register from './pages/Register';
import ExecutiveDemo from './pages/ExecutiveDemo';
import Onboarding from './pages/Onboarding';
import SuperAdminLogin from './pages/SuperAdminLogin';
import Profile from './pages/Profile';
import Summary from './pages/Summary';

// New Detail Pages
import NPSDetails from './pages/NPSDetails';
import ChurnStrategies from './pages/ChurnStrategies';

// New Category Pages
import CategoryTechnology from './pages/CategoryTechnology';
import CategoryHealth from './pages/CategoryHealth';
import CategoryFinancial from './pages/CategoryFinancial';
import CategoryEcommerce from './pages/CategoryEcommerce';

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
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <SuperAdminProvider>
            <Router>
              <div className="App">
                <Routes>
                  {/* Public Website Routes */}
                  <Route path="/" element={<Landing />} />
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
                      <DashboardApp />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/goals" element={
                    <ProtectedRoute>
                      <Goals />
                    </ProtectedRoute>
                  } />
                  <Route path="/clients" element={
                    <ProtectedRoute>
                      <Clients />
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
                      <Reports />
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
                <Toaster />
              </div>
            </Router>
          </SuperAdminProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
