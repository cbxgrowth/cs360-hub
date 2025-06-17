import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent } from './ui/card';
import { ServiceForm } from './ServiceForm';
import { ServicesHeader } from './services/ServicesHeader';
import { ServicesMetrics } from './services/ServicesMetrics';
import { ServicesTable } from './services/ServicesTable';
import { ServiceViewModal } from './services/ServiceViewModal';
import { UpsellManager } from './services/UpsellManager';
import { useServices } from '../hooks/useServices';
import { useServicesFilters } from '../hooks/useServicesFilters';
import { useToast } from '../hooks/use-toast';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { BarChart3, Package, Target, TrendingUp } from 'lucide-react';
import type { Service } from '../hooks/useServices';

// Sample data for analytics (in a real app, this would come from your backend)
const performanceData = [
  { month: 'Jan', planos: 85, addons: 60, implementacao: 23, treinamento: 15 },
  { month: 'Fev', planos: 89, addons: 67, implementacao: 25, treinamento: 18 },
  { month: 'Mar', planos: 92, addons: 70, implementacao: 28, treinamento: 20 },
  { month: 'Abr', planos: 95, addons: 75, implementacao: 30, treinamento: 22 },
  { month: 'Mai', planos: 98, addons: 78, implementacao: 32, treinamento: 25 },
  { month: 'Jun', planos: 102, addons: 82, implementacao: 35, treinamento: 28 }
];

const upsellData = [
  { service: 'Analytics Pro', potential: 89, converted: 67, rate: 75.3 },
  { service: 'Premium Upgrade', potential: 156, converted: 23, rate: 14.7 },
  { service: 'Support Plus', potential: 245, converted: 56, rate: 22.9 },
  { service: 'Custom Training', potential: 89, converted: 12, rate: 13.5 }
];

export const ServicesManagement = () => {
  const { services, loading, error, createService, updateService, deleteService, refetch } = useServices();
  const { 
    filters, 
    filteredServices, 
    updateFilter, 
    resetFilters 
  } = useServicesFilters(services);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  const handleServiceSubmit = async (data: any) => {
    try {
      if (selectedService) {
        const result = await updateService(selectedService.id, data);
        if (result.error) throw new Error(result.error);
        toast({
          title: "Sucesso",
          description: "Serviço atualizado com sucesso",
        });
      } else {
        const result = await createService(data);
        if (result.error) throw new Error(result.error);
        toast({
          title: "Sucesso",
          description: "Serviço criado com sucesso",
        });
      }
      setIsFormOpen(false);
      setSelectedService(null);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao salvar serviço",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setIsFormOpen(true);
  };

  const handleView = (service: Service) => {
    setSelectedService(service);
    setIsViewModalOpen(true);
  };

  const handleDelete = async (serviceIds: string[]) => {
    try {
      for (const id of serviceIds) {
        const result = await deleteService(id);
        if (result.error) throw new Error(result.error);
      }
      toast({
        title: "Sucesso",
        description: `${serviceIds.length} serviço(s) excluído(s) com sucesso`,
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao excluir serviços",
        variant: "destructive",
      });
    }
  };

  const handleDuplicate = (service: Service) => {
    const duplicatedService = {
      ...service,
      name: `${service.name} - Cópia`,
      id: undefined
    };
    setSelectedService(duplicatedService);
    setIsFormOpen(true);
  };

  const handleExport = () => {
    const csvContent = [
      ['Nome', 'Categoria', 'Preço', 'Status', 'Descrição'],
      ...filteredServices.map(service => [
        service.name,
        service.category,
        service.price.toString(),
        service.active ? 'Ativo' : 'Inativo',
        service.description || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'servicos.csv';
    a.click();

    toast({
      title: "Sucesso",
      description: "Serviços exportados com sucesso",
    });
  };

  const handleImport = () => {
    toast({
      title: "Em Desenvolvimento",
      description: "Funcionalidade de importação será implementada em breve",
    });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600">
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center space-x-2 mb-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {entry.name}: {entry.name === 'value' ? `R$ ${(entry.value/1000).toFixed(0)}k` : entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">Erro ao carregar serviços: {error}</div>
        <button 
          onClick={refetch}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  const revenueData = services.map(service => ({
    name: service.name,
    value: Number(service.price) * (Math.floor(Math.random() * 100) + 10),
    color: ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4'][Math.floor(Math.random() * 6)]
  }));

  return (
    <div className="space-y-6">
      <ServicesMetrics services={services} />

      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-lg">
        <CardContent className="p-6">
          <ServicesHeader
            searchTerm={filters.search}
            onSearchChange={(term) => updateFilter('search', term)}
            categoryFilter={filters.category}
            onCategoryChange={(category) => updateFilter('category', category)}
            statusFilter={filters.status}
            onStatusChange={(status) => updateFilter('status', status)}
            onNewService={() => setIsFormOpen(true)}
            onImport={handleImport}
            onExport={handleExport}
            onRefresh={refetch}
            totalServices={services.length}
            activeServices={services.filter(s => s.active).length}
          />

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className="grid w-full grid-cols-4 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Visão Geral
              </TabsTrigger>
              <TabsTrigger value="services" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Serviços
              </TabsTrigger>
              <TabsTrigger value="performance" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Performance
              </TabsTrigger>
              <TabsTrigger value="upsell" className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                Upsell
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg">
                        <BarChart3 className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Distribuição de Receita
                      </h3>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <defs>
                          <linearGradient id="pieGradient1" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.6}/>
                          </linearGradient>
                        </defs>
                        <Pie
                          data={revenueData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: R$${(value/1000).toFixed(0)}k`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {revenueData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend 
                          wrapperStyle={{ paddingTop: '20px' }}
                          iconType="circle"
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        Performance dos Serviços
                      </h3>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <defs>
                          <linearGradient id="planosGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                          </linearGradient>
                          <linearGradient id="addonsGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                          </linearGradient>
                          <linearGradient id="implementacaoGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#EC4899" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#EC4899" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.4} />
                        <XAxis 
                          dataKey="month" 
                          tick={{ fontSize: 12, fill: '#6B7280' }}
                          axisLine={{ stroke: '#D1D5DB' }}
                          tickLine={{ stroke: '#D1D5DB' }}
                        />
                        <YAxis 
                          tick={{ fontSize: 12, fill: '#6B7280' }}
                          axisLine={{ stroke: '#D1D5DB' }}
                          tickLine={{ stroke: '#D1D5DB' }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend 
                          wrapperStyle={{ paddingTop: '20px' }}
                          iconType="circle"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="planos" 
                          stroke="#3B82F6" 
                          strokeWidth={3} 
                          name="Planos"
                          dot={{ fill: '#3B82F6', strokeWidth: 2, r: 5 }}
                          activeDot={{ r: 7, fill: '#3B82F6', strokeWidth: 2 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="addons" 
                          stroke="#8B5CF6" 
                          strokeWidth={3} 
                          name="Add-ons"
                          dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 5 }}
                          activeDot={{ r: 7, fill: '#8B5CF6', strokeWidth: 2 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="implementacao" 
                          stroke="#EC4899" 
                          strokeWidth={3} 
                          name="Implementação"
                          dot={{ fill: '#EC4899', strokeWidth: 2, r: 5 }}
                          activeDot={{ r: 7, fill: '#EC4899', strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="services" className="mt-6">
              <ServicesTable
                services={filteredServices}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
                onDuplicate={handleDuplicate}
              />
            </TabsContent>

            <TabsContent value="performance" className="mt-6">
              <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Evolução de Clientes por Categoria
                    </h3>
                  </div>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <defs>
                        <linearGradient id="planosBarGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.9}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.6}/>
                        </linearGradient>
                        <linearGradient id="addonsBarGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.9}/>
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.6}/>
                        </linearGradient>
                        <linearGradient id="implementacaoBarGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#EC4899" stopOpacity={0.9}/>
                          <stop offset="95%" stopColor="#EC4899" stopOpacity={0.6}/>
                        </linearGradient>
                        <linearGradient id="treinamentoBarGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.9}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0.6}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.4} />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fontSize: 12, fill: '#6B7280' }}
                        axisLine={{ stroke: '#D1D5DB' }}
                        tickLine={{ stroke: '#D1D5DB' }}
                      />
                      <YAxis 
                        tick={{ fontSize: 12, fill: '#6B7280' }}
                        axisLine={{ stroke: '#D1D5DB' }}
                        tickLine={{ stroke: '#D1D5DB' }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend 
                        wrapperStyle={{ paddingTop: '20px' }}
                        iconType="circle"
                      />
                      <Bar 
                        dataKey="planos" 
                        fill="url(#planosBarGradient)" 
                        name="Planos"
                        radius={[4, 4, 0, 0]}
                        strokeWidth={1}
                        stroke="#3B82F6"
                      />
                      <Bar 
                        dataKey="addons" 
                        fill="url(#addonsBarGradient)" 
                        name="Add-ons"
                        radius={[4, 4, 0, 0]}
                        strokeWidth={1}
                        stroke="#8B5CF6"
                      />
                      <Bar 
                        dataKey="implementacao" 
                        fill="url(#implementacaoBarGradient)" 
                        name="Implementação"
                        radius={[4, 4, 0, 0]}
                        strokeWidth={1}
                        stroke="#EC4899"
                      />
                      <Bar 
                        dataKey="treinamento" 
                        fill="url(#treinamentoBarGradient)" 
                        name="Treinamento"
                        radius={[4, 4, 0, 0]}
                        strokeWidth={1}
                        stroke="#10B981"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="upsell" className="mt-6">
              <UpsellManager />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <ServiceForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedService(null);
        }}
        onSubmit={handleServiceSubmit}
        service={selectedService}
      />

      <ServiceViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        service={selectedService}
      />
    </div>
  );
};
