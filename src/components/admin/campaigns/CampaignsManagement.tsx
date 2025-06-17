
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Button } from '../../ui/button';
import { Plus, Gift, Users, Zap } from 'lucide-react';
import { CampaignsList } from './CampaignsList';
import { CreateCampaignForm } from './CreateCampaignForm';

export const CampaignsManagement = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Campanhas e Benefícios</h2>
          <p className="text-muted-foreground">Gerencie campanhas de indicação e recompensas para parceiros e clientes</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Campanha
        </Button>
      </div>

      <Tabs defaultValue="partner-campaigns" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="partner-campaigns" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Campanhas de Parceiros</span>
          </TabsTrigger>
          <TabsTrigger value="client-campaigns" className="flex items-center space-x-2">
            <Gift className="w-4 h-4" />
            <span>Indicação por Clientes</span>
          </TabsTrigger>
          <TabsTrigger value="ai-credits" className="flex items-center space-x-2">
            <Zap className="w-4 h-4" />
            <span>Créditos de IA</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="partner-campaigns">
          <CampaignsList type="partner" />
        </TabsContent>

        <TabsContent value="client-campaigns">
          <CampaignsList type="client" />
        </TabsContent>

        <TabsContent value="ai-credits">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Créditos de IA</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Configure pacotes de IA e monitore o consumo por workspace.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {showCreateForm && (
        <CreateCampaignForm onClose={() => setShowCreateForm(false)} />
      )}
    </div>
  );
};
