
import React from 'react';
import { AdvancedDashboardCustomizer } from '../customizer/AdvancedDashboardCustomizer';
import { SuperAdminAccess } from '../SuperAdminAccess';

interface DashboardHeaderProps {
  hasSuperAdminAccess: boolean;
  onToggleMetric: (metric: string) => void;
  onToggleChart: (chart: string) => void;
  onToggleSection: (section: string) => void;
  visibleMetrics: string[];
  visibleCharts: string[];
  visibleSections: string[];
  onExportConfig: () => void;
  onImportConfig: (file: File) => void;
  onResetToDefault: () => void;
}

export const DashboardHeader = ({
  hasSuperAdminAccess,
  onToggleMetric,
  onToggleChart,
  onToggleSection,
  visibleMetrics,
  visibleCharts,
  visibleSections,
  onExportConfig,
  onImportConfig,
  onResetToDefault
}: DashboardHeaderProps) => {
  return (
    <div className="w-full">
      <div className="relative rounded-3xl bg-blue-50 dark:bg-blue-900/10 px-8 py-6 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-5 flex-1">
          {/* Ícone à esquerda */}
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 shadow-lg">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="13" width="4" height="7" rx="2" fill="#fff" opacity="0.26"/>
              <rect x="10" y="7" width="4" height="13" rx="2" fill="#fff" opacity="0.46"/>
              <rect x="16" y="2" width="4" height="18" rx="2" fill="#fff" opacity="0.8"/>
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                Dashboard Principal
              </h2>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-full bg-green-400 mr-1.5"></span>
                Tempo Real
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium flex items-center gap-1">
                <svg className="w-4 h-4 mr-1" viewBox="0 0 16 16" fill="none"><path d="M2 8c2-6 8 6 12-2" stroke="#2563eb" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
                IA Ativa
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mt-1 text-base">
              Visão geral completa do seu Customer Success
            </p>
          </div>
        </div>
        {/* Botão Personalizar alinhado à direita dentro do card */}
        <div className="mt-6 md:mt-0 md:ml-4 flex-shrink-0 flex items-start justify-end">
          <AdvancedDashboardCustomizer
            onToggleMetric={onToggleMetric}
            onToggleChart={onToggleChart}
            onToggleSection={onToggleSection}
            visibleMetrics={visibleMetrics}
            visibleCharts={visibleCharts}
            visibleSections={visibleSections}
            onExportConfig={onExportConfig}
            onImportConfig={onImportConfig}
            onResetToDefault={onResetToDefault}
          />
        </div>
      </div>

      {/* Acesso Super Admin - Visível apenas para Super Admins */}
      {hasSuperAdminAccess && (
        <div className="mt-6">
          <SuperAdminAccess />
        </div>
      )}
    </div>
  );
};
