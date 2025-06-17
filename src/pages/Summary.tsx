
import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { SummaryHeader } from '../components/summary/SummaryHeader';
import { ExecutiveMetrics } from '../components/summary/ExecutiveMetrics';
import { PriorityActions } from '../components/summary/PriorityActions';
import { ExecutivePerformance } from '../components/summary/ExecutivePerformance';
import { RecentActivities } from '../components/summary/RecentActivities';
import { TodaySchedule } from '../components/summary/TodaySchedule';
import { QuickInsights } from '../components/summary/QuickInsights';
import { ExecutiveQuickActions } from '../components/summary/ExecutiveQuickActions';

const Summary = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex transition-colors">
      <Sidebar />
      <main className="flex-1 transition-all duration-300 peer-data-[state=collapsed]:ml-20 ml-72 overflow-auto">
        <Header />
        <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
          {/* Hero Header */}
          <SummaryHeader />

          {/* Executive Metrics Cards */}
          <ExecutiveMetrics />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="xl:col-span-2 space-y-6">
              {/* Priority Actions */}
              <PriorityActions />

              {/* Executive Performance Dashboard */}
              <ExecutivePerformance />

              {/* Recent Activities */}
              <RecentActivities />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Today's Schedule */}
              <TodaySchedule />

              {/* Quick Insights */}
              <QuickInsights />

              {/* Executive Quick Actions */}
              <ExecutiveQuickActions />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Summary;
