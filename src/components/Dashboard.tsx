
import React from 'react';
import { ClientsSection } from './dashboard/ClientsSection';
import { SidebarInfo } from './dashboard/SidebarInfo';
import { useDashboard } from './dashboard/hooks/useDashboard';
import { useAuth } from '@/hooks/useAuth';
import { isSuperAdmin } from '@/utils/userPermissions';
import { DashboardHeader } from './dashboard/DashboardHeader';
import { DashboardQuickInsights } from './dashboard/sections/DashboardQuickInsights';
import { DashboardSmartMetrics } from './dashboard/sections/DashboardSmartMetrics';
import { DashboardMainCharts } from './dashboard/sections/DashboardMainCharts';
import { SuperAdminAccess } from './dashboard/SuperAdminAccess';

interface DashboardProps {
  sidebarCollapsed?: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ sidebarCollapsed = false }) => {
  const { profile } = useAuth();
  const {
    visibleMetrics,
    visibleCharts,
    visibleSections,
    handleToggleMetric,
    handleToggleChart,
    handleToggleSection,
    exportConfiguration,
    importConfiguration,
    resetToDefault
  } = useDashboard();

  const hasSuperAdminAccess = isSuperAdmin(profile);

  return (
    <div className="space-y-6">
      <DashboardHeader
        onToggleMetric={handleToggleMetric}
        onToggleChart={handleToggleChart}
        onToggleSection={handleToggleSection}
        visibleMetrics={visibleMetrics}
        visibleCharts={visibleCharts}
        visibleSections={visibleSections}
        onExportConfig={exportConfiguration}
        onImportConfig={importConfiguration}
        onResetToDefault={resetToDefault}
      />

      {/* Acesso Super Admin - Visível apenas para Super Admins */}
      {hasSuperAdminAccess && (
        <SuperAdminAccess />
      )}

      {/* Quick Insights com IA */}
      {visibleSections.includes('quickInsights') && (
        <DashboardQuickInsights />
      )}

      {/* Métricas Inteligentes */}
      {visibleSections.includes('metrics') && (
        <DashboardSmartMetrics />
      )}

      {/* Layout Principal - Gráficos Avançados + Sidebar */}
      <div className={`grid ${sidebarCollapsed ? 'grid-cols-1 xl:grid-cols-5' : 'grid-cols-1 xl:grid-cols-4'} gap-8 transition-all duration-300`}>
        <DashboardMainCharts
          sidebarCollapsed={sidebarCollapsed}
          visibleSections={visibleSections}
          visibleCharts={visibleCharts}
        />

        {/* Sidebar com Informações */}
        {visibleSections.includes('sidebar') && (
          <div className={`${sidebarCollapsed ? 'xl:col-span-1' : 'xl:col-span-1'} transition-all duration-300`}>
            <SidebarInfo />
          </div>
        )}
      </div>

      {/* Gestão de Clientes - Full Width */}
      {visibleSections.includes('clients') && (
        <ClientsSection />
      )}
    </div>
  );
};
