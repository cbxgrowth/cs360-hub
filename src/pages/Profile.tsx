
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileNavigation } from '@/components/profile/ProfileNavigation';
import { PersonalInfoSection } from '@/components/profile/PersonalInfoSection';
import { SecuritySection } from '@/components/profile/SecuritySection';
import { NotificationsSection } from '@/components/profile/NotificationsSection';
import { PreferencesSection } from '@/components/profile/PreferencesSection';

export default function Profile() {
  const [activeSection, setActiveSection] = useState('personal');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfoSection />;
      case 'security':
        return <SecuritySection />;
      case 'notifications':
        return <NotificationsSection />;
      case 'preferences':
        return <PreferencesSection />;
      default:
        return <PersonalInfoSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors">
      <Sidebar />
      <div className="transition-all duration-300 peer-data-[state=collapsed]:ml-20 ml-72 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <ProfileHeader />
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <ProfileNavigation 
                  activeSection={activeSection} 
                  onSectionChange={setActiveSection} 
                />
              </div>
              
              <div className="lg:col-span-3">
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl shadow-xl">
                  {renderActiveSection()}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
