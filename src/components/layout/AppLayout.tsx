import React, { useState, useEffect } from 'react';
import { Sidebar } from '../Sidebar';
import { Header } from '../Header';
interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  icon?: React.ReactNode;
  gradientColors: string;
  badgeText?: string;
  badgeIcon?: React.ReactNode;
}
export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  title,
  description,
  icon,
  gradientColors,
  badgeText = "Tempo Real",
  badgeIcon
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(false);
      }
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex transition-colors">
      <Sidebar onCollapsedChange={setSidebarCollapsed} />
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-72'} overflow-auto`}>
        <Header />
        <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
          {/* Hero Header */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5 rounded-3xl"></div>
            
          </div>

          {React.cloneElement(children as React.ReactElement, {
          sidebarCollapsed
        })}
        </div>
      </main>
    </div>;
};