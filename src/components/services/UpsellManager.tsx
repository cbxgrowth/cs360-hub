
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useUpsellOpportunities } from '../../hooks/useUpsellOpportunities';
import { Target, TrendingUp, DollarSign, Users, Play, Pause, Eye, Settings, Calendar, BarChart3 } from 'lucide-react';

export const UpsellManager = () => {
  const { 
    opportunities, 
    campaigns, 
    loading, 
    createCampaign, 
    updateOpportunityStatus,
    updateCampaignStatus 
  } = useUpsellOpportunities();
  
  const [selectedOpportunity, setSelectedOpportunity] = useState<string | null>(null);
  const [campaignForm, setCampaignForm] = useState({
    name: '',
    budget: '',
    duration: '30',
    targetAudience: 'all'
  });

  const handleCreateCampaign = async (opportunityId: string) => {
    const opportunity = opportunities.find(o => o.id === opportunityId);
    if (!opportunity) return;

    const result = await createCampaign(opportunityId, {
      name: campaignForm.name || `Campanha ${opportunity.service}`,
      budget: Number(campaignForm.budget) || 10000,
      endDate: new Date(Date.now() + Number(campaignForm.duration) * 24 * 60 * 60 * 1000),
      targetAudience: [campaignForm.targetAudience]
    });

    if (result.data) {
      setCampaignForm({ name: '', budget: '', duration: '30', targetAudience: 'all' });
      setSelectedOpportunity(null);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="opportunities" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="opportunities">Oportunidades de Upsell</TabsTrigger>
          <TabsTrigger value="campaigns">Campanhas Ativas</TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Oportunidades</p>
                    <p className="text-3xl font-bold text-blue-600">{opportunities.length}</p>
                  </div>
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receita Potencial</p>
                    <p className="text-3xl font-bold text-green-600">
                      R$ {opportunities.reduce((sum, opp) => sum + opp.estimatedRevenue, 0).toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Taxa Média de Conversão</p>
                    <p className="text-3xl font-bold text-purple-600">
                      {(opportunities.reduce((sum, opp) => sum + opp.rate, 0) / opportunities.length).toFixed(1)}%
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Campanhas Ativas</p>
                    <p className="text-3xl font-bold text-orange-600">
                      {campaigns.filter(c => c.status === 'active').length}
                    </p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Lista de Oportunidades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {opportunities.map((opportunity) => (
                  <div key={opportunity.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {opportunity.service}
                          </h3>
                          <Badge className={getPriorityColor(opportunity.priority)}>
                            {opportunity.priority}
                          </Badge>
                          <Badge className={getStatusColor(opportunity.status)}>
                            {opportunity.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">
                          Cliente: {opportunity.clientName}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Potencial</p>
                        <p className="font-semibold">{opportunity.potential}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Convertidos</p>
                        <p className="font-semibold">{opportunity.converted}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Taxa de Conversão</p>
                        <p className="font-semibold text-green-600">{opportunity.rate}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Receita Estimada</p>
                        <p className="font-semibold">R$ {opportunity.estimatedRevenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Progresso</p>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${opportunity.rate}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Ver Detalhes
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => updateOpportunityStatus(
                          opportunity.id, 
                          opportunity.status === 'active' ? 'paused' : 'active'
                        )}
                      >
                        {opportunity.status === 'active' ? (
                          <>
                            <Pause className="w-4 h-4 mr-1" />
                            Pausar
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-1" />
                            Ativar
                          </>
                        )}
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm"
                            onClick={() => setSelectedOpportunity(opportunity.id)}
                          >
                            <Target className="w-4 h-4 mr-1" />
                            Criar Campanha
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Criar Campanha - {opportunity.service}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="campaignName">Nome da Campanha</Label>
                              <Input
                                id="campaignName"
                                placeholder={`Campanha ${opportunity.service}`}
                                value={campaignForm.name}
                                onChange={(e) => setCampaignForm(prev => ({ ...prev, name: e.target.value }))}
                              />
                            </div>
                            <div>
                              <Label htmlFor="budget">Orçamento (R$)</Label>
                              <Input
                                id="budget"
                                type="number"
                                placeholder="10000"
                                value={campaignForm.budget}
                                onChange={(e) => setCampaignForm(prev => ({ ...prev, budget: e.target.value }))}
                              />
                            </div>
                            <div>
                              <Label htmlFor="duration">Duração (dias)</Label>
                              <Select 
                                value={campaignForm.duration} 
                                onValueChange={(value) => setCampaignForm(prev => ({ ...prev, duration: value }))}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="15">15 dias</SelectItem>
                                  <SelectItem value="30">30 dias</SelectItem>
                                  <SelectItem value="60">60 dias</SelectItem>
                                  <SelectItem value="90">90 dias</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="audience">Público-Alvo</Label>
                              <Select 
                                value={campaignForm.targetAudience} 
                                onValueChange={(value) => setCampaignForm(prev => ({ ...prev, targetAudience: value }))}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">Todos os Clientes</SelectItem>
                                  <SelectItem value="starter">Plano Starter</SelectItem>
                                  <SelectItem value="professional">Plano Professional</SelectItem>
                                  <SelectItem value="enterprise">Plano Enterprise</SelectItem>
                                  <SelectItem value="growing">Clientes em Crescimento</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Button 
                              onClick={() => selectedOpportunity && handleCreateCampaign(selectedOpportunity)}
                              className="w-full"
                            >
                              Criar Campanha
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campanhas de Upsell</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {campaign.name}
                          </h3>
                          <Badge className={getStatusColor(campaign.status)}>
                            {campaign.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">
                          {campaign.startDate.toLocaleDateString()} - {campaign.endDate.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Orçamento</p>
                        <p className="font-semibold">R$ {campaign.budget.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Gasto</p>
                        <p className="font-semibold">R$ {campaign.spent.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Conversões</p>
                        <p className="font-semibold text-green-600">{campaign.conversions}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">ROI</p>
                        <p className="font-semibold text-blue-600">{campaign.roi}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Progresso do Orçamento</p>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        Relatório
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-1" />
                        Configurar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => updateCampaignStatus(
                          campaign.id, 
                          campaign.status === 'active' ? 'paused' : 'active'
                        )}
                      >
                        {campaign.status === 'active' ? (
                          <>
                            <Pause className="w-4 h-4 mr-1" />
                            Pausar
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-1" />
                            Ativar
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
