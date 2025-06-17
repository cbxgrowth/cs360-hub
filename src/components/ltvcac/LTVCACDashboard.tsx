import React from 'react';
import { LTVCACMetrics } from './LTVCACMetrics';
import { LTVCACFiltersComponent } from './LTVCACFilters';
import { LTVCACInsights } from './LTVCACInsights';
import { LTVCACHeader } from './components/LTVCACHeader';
import { LTVCACStatusBar } from './components/LTVCACStatusBar';
import { LTVCACTabs } from './components/LTVCACTabs';
import { useLTVCAC } from '@/hooks/useLTVCAC';
import { useLTVCACDashboard } from './hooks/useLTVCACDashboard';

export const LTVCACDashboard: React.FC = () => {
  const {
    filters,
    filteredData,
    currentMetrics,
    insights,
    isLoading,
    updateFilter,
    resetFilters,
    exportData
  } = useLTVCAC();

  const {
    activeTab,
    setActiveTab,
    showFilters,
    setShowFilters,
    showConfigModal,
    setShowConfigModal,
    handleOptimizeCAC,
    handleModelChange,
    handleInsightAction,
    handleRefreshData,
    handleImportData,
    handleRecommendationAction
  } = useLTVCACDashboard();

  return (
    <div className="space-y-6">
      <LTVCACHeader
        filters={filters}
        isLoading={isLoading}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        onRefreshData={handleRefreshData}
        onImportData={handleImportData}
        onExportData={exportData}
        onOpenConfig={() => setShowConfigModal(true)}
      />

      <LTVCACStatusBar filters={filters} />

      {showFilters && (
        <LTVCACFiltersComponent
          filters={filters}
          onFilterChange={updateFilter}
          onResetFilters={resetFilters}
          isExpanded={showFilters}
          onToggleExpanded={() => setShowFilters(!showFilters)}
        />
      )}

      <LTVCACMetrics
        currentLTV={currentMetrics.currentLTV}
        currentCAC={currentMetrics.currentCAC}
        ltvCacRatio={currentMetrics.ltvCacRatio}
        ltvChange={currentMetrics.ltvChange}
        cacChange={currentMetrics.cacChange}
        customers={currentMetrics.customers}
        revenue={currentMetrics.revenue}
        paybackPeriod={currentMetrics.paybackPeriod}
      />

      <LTVCACInsights
        insights={insights}
        onActionClick={handleInsightAction}
      />

      <LTVCACTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentLTV={currentMetrics.currentLTV}
        currentCAC={currentMetrics.currentCAC}
        ltvCacRatio={currentMetrics.ltvCacRatio}
        ltvChange={currentMetrics.ltvChange}
        cacChange={currentMetrics.cacChange}
        onConfigureParameters={() => setShowConfigModal(true)}
        onOptimizeCAC={handleOptimizeCAC}
        onModelChange={handleModelChange}
        onRecommendationAction={handleRecommendationAction}
      />
    </div>
  );
};
