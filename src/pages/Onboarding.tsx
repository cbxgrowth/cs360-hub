
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingLauncher } from '../components/onboarding/OnboardingLauncher';
import { useAuth } from '../hooks/useAuth';
import { usePermissions } from '../hooks/usePermissions';

const Onboarding = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { userTypeLabel } = usePermissions();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
          <p className="text-sm text-gray-600">Carregando seu onboarding...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Bem-vindo ao CS360°
          </h1>
          <p className="text-sm text-gray-600">
            Onboarding personalizado para {userTypeLabel}
          </p>
        </div>
      </div>
      <OnboardingLauncher />
    </div>
  );
};

export default Onboarding;
