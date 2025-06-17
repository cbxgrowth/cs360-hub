import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useToast } from '../hooks/use-toast';
import { ReportsHeader } from './reports/ReportsHeader';
import { ReportsOverview } from './reports/ReportsOverview';
import { ReportsTemplates } from './reports/ReportsTemplates';
import { ReportsScheduler } from './reports/ReportsScheduler';
import { GoalsReports } from './goals/GoalsReports';
import { NPSLinksReports } from './nps/NPSLinksReports';
import { StrategyRecommendations } from './strategies/StrategyRecommendations';
import { CustomReportBuilder } from './reports/CustomReportBuilder';
import { ReportsDashboard } from './reports/ReportsDashboard';
import { ReportsAnalytics } from './reports/ReportsAnalytics';
import { BarChart3, FileText, Calendar, Target, MessageSquare, TrendingUp, Settings, Plus, Download, Share2, Filter, PieChart, Activity, Users, DollarSign } from 'lucide-react';
export const ReportsManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30d');
  const [isExporting, setIsExporting] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    department: 'all',
    type: 'all',
    status: 'all'
  });
  const {
    toast
  } = useToast();
  const handleRefresh = () => {
    console.log('Refreshing reports...');
    toast({
      title: "Relatórios Atualizados",
      description: "Todos os dados foram sincronizados com sucesso"
    });
  };
  const handleExportAll = async () => {
    setIsExporting(true);
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "Exportação Concluída",
        description: "Todos os relatórios foram exportados para o seu email"
      });
    } catch (error) {
      toast({
        title: "Erro na Exportação",
        description: "Não foi possível exportar os relatórios",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };
  const handleShareReport = () => {
    toast({
      title: "Link de Compartilhamento",
      description: "Link copiado para a área de transferência"
    });
  };
  const handleCreateCustomReport = () => {
    setActiveTab('custom-builder');
    toast({
      title: "Construtor de Relatórios",
      description: "Crie relatórios personalizados com dados específicos"
    });
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ReportsOverview dateRange={dateRange} filters={selectedFilters} />;
      case 'dashboard':
        return <ReportsDashboard dateRange={dateRange} />;
      case 'analytics':
        return <ReportsAnalytics dateRange={dateRange} filters={selectedFilters} />;
      case 'templates':
        return <ReportsTemplates onCreateCustom={handleCreateCustomReport} />;
      case 'custom-builder':
        return <CustomReportBuilder />;
      case 'goals':
        return <GoalsReports />;
      case 'nps':
        return <NPSLinksReports onNewCampaignClick={handleCreateCustomReport} />;
      case 'strategies':
        return <StrategyRecommendations />;
      case 'scheduler':
        return <ReportsScheduler />;
      default:
        return <ReportsOverview dateRange={dateRange} filters={selectedFilters} />;
    }
  };
  const tabs = [{
    id: 'overview',
    label: 'Visão Geral',
    icon: BarChart3,
    color: 'from-blue-500 to-cyan-500'
  }, {
    id: 'dashboard',
    label: 'Dashboard',
    icon: PieChart,
    color: 'from-purple-500 to-pink-500'
  }, {
    id: 'analytics',
    label: 'Analytics',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-500'
  }, {
    id: 'templates',
    label: 'Templates',
    icon: FileText,
    color: 'from-orange-500 to-red-500'
  }, {
    id: 'custom-builder',
    label: 'Construtor',
    icon: Plus,
    color: 'from-indigo-500 to-purple-500'
  }, {
    id: 'goals',
    label: 'Metas',
    icon: Target,
    color: 'from-pink-500 to-rose-500'
  }, {
    id: 'nps',
    label: 'NPS',
    icon: MessageSquare,
    color: 'from-teal-500 to-cyan-500'
  }, {
    id: 'strategies',
    label: 'Estratégias',
    icon: Activity,
    color: 'from-violet-500 to-purple-500'
  }, {
    id: 'scheduler',
    label: 'Agendador',
    icon: Calendar,
    color: 'from-amber-500 to-orange-500'
  }];
  return <div className="space-y-6">
      {/* Redesigned Header to match reference */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-[#f7faff] to-[#f4faff] dark:from-slate-900 dark:to-blue-900">
        <CardContent className="p-8 pb-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            {/* Left: Title, Description & Badges */}
            <div>
              <div className="flex items-center gap-4 mb-3">
                {/* Gradient Icon Circle */}
                
                <div>
                  <h1 className="font-bold text-green-500 my-0 py-0 mx-0 px-[100px] text-4xl">Central de Relatórios</h1>
                  <p className="text-gray-700 text-base mt-1 max-w-xs">
                    Analytics avançados,<br />
                    relatórios automáticos e<br />
                    insights inteligentes
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <div className="flex items-center bg-green-100 text-green-800 font-medium rounded-full px-4 py-1 text-sm">
                  <span className="mr-1">⤷</span> Tempo Real
                </div>
                <div className="flex items-center bg-blue-100 text-blue-800 font-medium rounded-full px-4 py-1 text-sm">
                  <span className="mr-1">🧑‍💼</span> 127 Relatórios Ativos
                </div>
                <div className="flex items-center bg-purple-100 text-purple-800 font-medium rounded-full px-4 py-1 text-sm">
                  <span className="mr-1">💲</span> R$ 2.4M Trackados
                </div>
              </div>
            </div>
            {/* Right: Filters and Actions */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 ml-auto">
              <select value={dateRange} onChange={e => setDateRange(e.target.value)} className="h-12 px-5 py-2 border border-gray-300 rounded-lg text-base bg-white shadow min-w-[170px]" style={{
              fontWeight: 500
            }}>
                <option value="7d">Últimos 7 dias</option>
                <option value="30d">Últimos 30 dias</option>
                <option value="90d">Últimos 90 dias</option>
                <option value="6m">Últimos 6 meses</option>
                <option value="1y">Último ano</option>
                <option value="custom">Personalizado</option>
              </select>
              <Button variant="outline" onClick={handleRefresh} className="h-12 px-7 text-base flex items-center gap-2 bg-white font-semibold border">
                <BarChart3 className="w-4 h-4 mr-2" />
                Atualizar
              </Button>
              <Button variant="outline" className="h-12 px-7 text-base flex items-center gap-2 bg-white font-semibold border">
                <span className="mr-2"><svg width="18" height="18" fill="none" stroke="#7c7d85" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18M6 6v12M6 6l3-3m9 3v12m0-12-3-3" /></svg></span>
                Filtros
              </Button>
              <Button variant="outline" onClick={handleShareReport} className="h-12 px-7 text-base flex items-center gap-2 bg-white font-semibold border">
                <span className="mr-2">
                  <svg width="18" height="18" fill="none" stroke="#7c7d85" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 12v3a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4v-3" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
                </span>
                Compartilhar
              </Button>
              <Button onClick={handleExportAll} disabled={isExporting} className="h-12 px-7 text-base flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-md hover:shadow-lg" style={{
              minWidth: 180
            }}>
                <span className="mr-2">
                  <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14m7-7H5" /></svg>
                </span>
                {isExporting ? 'Exportando...' : 'Exportar Tudo'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Navigation Tabs */}
      <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
        <CardContent className="p-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-9 bg-slate-100/50 dark:bg-slate-800/50 rounded-xl p-1 gap-1">
              {tabs.map(tab => {
              const Icon = tab.icon;
              return <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2 rounded-lg data-[state=active]:shadow-lg transition-all duration-200">
                    <div className={`p-1.5 rounded-md bg-gradient-to-r ${tab.color} ${activeTab === tab.id ? 'text-white' : 'text-gray-600'}`}>
                      <Icon className="w-3 h-3" />
                    </div>
                    <span className="text-xs font-medium">{tab.label}</span>
                  </TabsTrigger>;
            })}
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* Tab Content */}
      <div className="min-h-96">
        {renderTabContent()}
      </div>

      {/* Quick Actions Floating Panel */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        <Button onClick={handleCreateCustomReport} className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg hover:shadow-xl transition-all duration-200">
          <Plus className="w-6 h-6" />
        </Button>
        
        <Button variant="outline" onClick={() => setActiveTab('scheduler')} className="w-14 h-14 rounded-full bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-200">
          <Calendar className="w-6 h-6" />
        </Button>
      </div>
    </div>;
};