
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ClientSummaryHeader } from './client-summary/ClientSummaryHeader';
import { ClientMetricsCards } from './client-summary/ClientMetricsCards';
import { OverviewTab } from './client-summary/tabs/OverviewTab';
import { ContractsTab } from './client-summary/tabs/ContractsTab';
import { InteractionsTab } from './client-summary/tabs/InteractionsTab';
import { OpportunitiesTab } from './client-summary/tabs/OpportunitiesTab';

interface ClientSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: any;
}

export const ClientSummaryModal = ({ isOpen, onClose, client }: ClientSummaryModalProps) => {
  if (!isOpen || !client) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <ClientSummaryHeader clientName={client.name} onClose={onClose} />

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6">
            <ClientMetricsCards client={client} />

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="contracts">Contratos</TabsTrigger>
                <TabsTrigger value="interactions">Interações</TabsTrigger>
                <TabsTrigger value="opportunities">Oportunidades</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <OverviewTab client={client} />
              </TabsContent>

              <TabsContent value="contracts" className="mt-6">
                <ContractsTab client={client} />
              </TabsContent>

              <TabsContent value="interactions" className="mt-6">
                <InteractionsTab client={client} />
              </TabsContent>

              <TabsContent value="opportunities" className="mt-6">
                <OpportunitiesTab client={client} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};
