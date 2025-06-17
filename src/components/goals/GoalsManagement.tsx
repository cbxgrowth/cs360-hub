import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { GoalsDashboard } from './GoalsDashboard';
import { GoalsCreation } from './GoalsCreation';
import { GoalsTracking } from './GoalsTracking';
import { GoalsTeam } from './GoalsTeam';
import { GoalsReports } from './GoalsReports';
import { GoalsSettings } from './GoalsSettings';
import { GoalsMetricsCards } from './components/GoalsMetricsCards';
import { BarChart3, Plus, TrendingUp, Users, Award, Settings } from 'lucide-react';
export const GoalsManagement = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  return <div className="space-y-6">
      <GoalsMetricsCards />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 shadow-sm bg-transparent">
          <TabsTrigger value="dashboard" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="creation" className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Criar Metas</span>
          </TabsTrigger>
          <TabsTrigger value="tracking" className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Acompanhamento</span>
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Equipe</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center space-x-2">
            <Award className="w-4 h-4" />
            <span>Relatórios</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Configurações</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <GoalsDashboard />
        </TabsContent>

        <TabsContent value="creation">
          <GoalsCreation />
        </TabsContent>

        <TabsContent value="tracking">
          <GoalsTracking />
        </TabsContent>

        <TabsContent value="team">
          <GoalsTeam />
        </TabsContent>

        <TabsContent value="reports">
          <GoalsReports />
        </TabsContent>

        <TabsContent value="settings">
          <GoalsSettings />
        </TabsContent>
      </Tabs>
    </div>;
};