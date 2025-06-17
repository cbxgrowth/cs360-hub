
import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { PartnerPortal } from '../components/portal/PartnerPortal';

const PartnerPortalPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex transition-colors">
      <Sidebar />
      <main className="flex-1 transition-all duration-300 peer-data-[state=collapsed]:ml-20 ml-72 overflow-auto">
        <Header />
        <div className="p-6 space-y-6">
          <PartnerPortal />
        </div>
      </main>
    </div>
  );
};

export default PartnerPortalPage;
