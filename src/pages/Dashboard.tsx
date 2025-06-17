
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { QuickInsights } from '@/components/dashboard/QuickInsights';
import { DashboardCharts } from '@/components/dashboard/DashboardCharts';
import { AnalyticsCharts } from '@/components/dashboard/AnalyticsCharts';
import { ClientsSection } from '@/components/dashboard/ClientsSection';
import { SidebarInfo } from '@/components/dashboard/SidebarInfo';
import { SmartMetricsGrid } from '@/components/dashboard/advanced/SmartMetricsGrid';
import { InteractiveChart } from '@/components/dashboard/advanced/InteractiveChart';
import { useDashboard } from '@/components/dashboard/hooks/useDashboard';
import { AdvancedDashboardCustomizer } from '@/components/dashboard/customizer/AdvancedDashboardCustomizer';
import { SuperAdminAccess } from '@/components/dashboard/SuperAdminAccess';
import { useAuth } from '@/hooks/useAuth';
import { isSuperAdmin } from '@/utils/userPermissions';
import { BarChart3, Brain, Sparkles, TrendingUp, Activity, Users, Eye } from 'lucide-react';

interface DashboardProps {
  sidebarCollapsed?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ sidebarCollapsed = false }) => {
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

  const chartData = [
    { name: 'Jan', value: 420, predicted: 435, target: 450, anomaly: false },
    { name: 'Fev', value: 445, predicted: 460, target: 450, anomaly: false },
    { name: 'Mar', value: 465, predicted: 480, target: 450, anomaly: false },
    { name: 'Abr', value: 485, predicted: 500, target: 450, anomaly: false },
    { name: 'Mai', value: 512, predicted: 525, target: 450, anomaly: true },
    { name: 'Jun', value: 535, predicted: 550, target: 450, anomaly: false }
  ];

  return (
    <div className="space-y-8 w-full overflow-x-hidden">
      {/* Header com Customização Avançada */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex items-center space-x-4">
          <div></div>
        </div>

        <div className="flex items-center space-x-4">
          {hasSuperAdminAccess && <SuperAdminAccess />}
          <AdvancedDashboardCustomizer 
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
        </div>
      </div>

      {/* Quick Insights com IA */}
      {visibleSections.includes('quickInsights') && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-8 border border-blue-200/50 dark:border-blue-700/50">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Insights Inteligentes</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Análises automáticas baseadas em IA</p>
            </div>
          </div>
          <QuickInsights />
        </div>
      )}

      {/* Métricas Inteligentes */}
      {visibleSections.includes('metrics') && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Métricas Inteligentes</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">KPIs com insights de IA e predições</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Eye className="w-4 h-4" />
              <span>{visibleMetrics.length} métricas ativas</span>
            </div>
          </div>
          
          <SmartMetricsGrid visibleMetrics={visibleMetrics} />
        </div>
      )}

      {/* Layout Principal - Gráficos Avançados + Sidebar */}
      <div className={`grid ${sidebarCollapsed ? 'grid-cols-1 xl:grid-cols-5' : 'grid-cols-1 xl:grid-cols-4'} gap-8 transition-all duration-300`}>
        {/* Gráficos e Analytics */}
        <div className={`${sidebarCollapsed ? 'xl:col-span-4' : 'xl:col-span-3'} space-y-8 transition-all duration-300`}>
          {/* Gráfico Interativo Principal */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <InteractiveChart 
              title="Crescimento de Receita com IA" 
              subtitle="Análise preditiva com detecção de anomalias" 
              data={chartData} 
              type="area" 
              color="#3B82F6" 
              gradient={['from-blue-500', 'to-purple-500']} 
              showPrediction={true} 
              showAnomalies={true} 
              showTarget={true} 
              isRealtime={true} 
              height={350} 
            />
          </div>

          {/* Análise Visual - Seção Unificada */}
          {visibleSections.includes('charts') && (
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
              <DashboardCharts visibleCharts={visibleCharts} />
            </div>
          )}
          
          {/* Analytics Avançado - Seção Unificada */}
          {visibleSections.includes('analytics') && (
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
              <AnalyticsCharts visibleCharts={visibleCharts} />
            </div>
          )}
        </div>

        {/* Sidebar com Informações */}
        {visibleSections.includes('sidebar') && (
          <div className={`${sidebarCollapsed ? 'xl:col-span-1' : 'xl:col-span-1'} transition-all duration-300`}>
            <SidebarInfo />
          </div>
        )}
      </div>

      {/* Gestão de Clientes - Seção Única e Simplificada */}
      {visibleSections.includes('clients') && (
        <ClientsSection />
      )}
    </div>
  );
};

export default Dashboard;
