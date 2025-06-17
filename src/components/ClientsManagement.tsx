
import React, { useState } from 'react';
import { ClientForm } from './clients/ClientForm';
import { ClientImportModal } from './clients/ClientImportModal';
import { ClientImportGuideModal } from './clients/ClientImportGuideModal';
import { ClientSummaryModal } from './ClientSummaryModal';
import { ClientCommentModal } from './clients-management/ClientCommentModal';
import { ClientsHeader } from './clients-management/ClientsHeader';
import { ClientsStats } from './clients-management/ClientsStats';
import { ClientsQuickActions } from './clients-management/ClientsQuickActions';
import { ClientsSearchBar } from './clients-management/ClientsSearchBar';
import { ClientsBulkActions } from './clients-management/ClientsBulkActions';
import { ClientsTable } from './clients-management/ClientsTable';
import { ClientsPagination } from './clients-management/ClientsPagination';
import { useClients } from '@/hooks/useClients';
import { useClientFilters } from '@/hooks/useClientFilters';
import { convertToDisplayClient, type DisplayClient } from './clients-management/adapters/clientsAdapter';
import { 
  getRiskColor, 
  getTierColor, 
  getNPSColor, 
  getStatusColor 
} from './clients-management/utils/clientsUtils';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ClientsManagement = () => {
  const { toast } = useToast();
  const [isClientFormOpen, setIsClientFormOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<DisplayClient | null>(null);
  const [expandedClient, setExpandedClient] = useState<number | null>(null);
  const [selectedClients, setSelectedClients] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isExporting, setIsExporting] = useState(false);
  const [isImportGuideOpen, setIsImportGuideOpen] = useState(false);

  const { clients, loading, createClient, updateClient, deleteClient, isUpdating } = useClients();

  // Convert clients from database to display format
  const displayClients: DisplayClient[] = clients.map(convertToDisplayClient);

  // Use custom filters hook
  const {
    filters,
    filteredClients,
    updateFilter,
    resetFilters,
    getFilterCounts,
    sortBy,
    sortOrder,
    handleSortChange
  } = useClientFilters(displayClients);

  // Pagination
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClients = filteredClients.slice(startIndex, startIndex + itemsPerPage);

  const handleClientSubmit = (data: any) => {
    if (selectedClient) {
      const originalClient = clients.find(c => 
        parseInt(c.id.slice(0, 8), 16) === selectedClient.id
      );
      if (originalClient) {
        updateClient({ id: originalClient.id, updates: data }, {
          onSuccess: () => {
            setIsClientFormOpen(false);
            setSelectedClient(null);
          }
        });
      } else {
        toast({ title: "Erro", description: "Cliente original não encontrado.", variant: "destructive" });
      }
    } else {
      createClient(data, {
        onSuccess: () => {
          setIsClientFormOpen(false);
          setSelectedClient(null);
        }
      });
    }
  };

  const handleImport = (data: any[]) => {
    let importedCount = 0;
    let failedCount = 0;
    
    const importPromises = data.map(clientData => 
      new Promise<void>((resolve) => {
        createClient(clientData, {
          onSuccess: () => {
            importedCount++;
            resolve();
          },
          onError: (error) => {
            failedCount++;
            console.error('Erro ao importar cliente:', clientData, error);
            resolve();
          }
        });
      })
    );
    
    Promise.all(importPromises).then(() => {
      toast({
        title: "Importação concluída",
        description: `${importedCount} clientes importados${failedCount > 0 ? `, ${failedCount} falharam` : ''}`
      });
    });
  };

  const handleImportWithGuide = (file: File) => {
    // Processar o arquivo importado
    console.log('Processando arquivo:', file.name);
    
    // Aqui você implementaria a lógica de processamento do arquivo
    // Por exemplo, ler JSON/CSV/Excel e converter para formato de cliente
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        let data;
        if (file.type === 'application/json') {
          data = JSON.parse(e.target?.result as string);
        } else if (file.name.endsWith('.csv')) {
          // Processar CSV
          const csv = e.target?.result as string;
          const lines = csv.split('\n');
          const headers = lines[0].split(',');
          data = lines.slice(1).map(line => {
            const values = line.split(',');
            const obj: any = {};
            headers.forEach((header, index) => {
              obj[header.trim()] = values[index]?.trim();
            });
            return obj;
          });
        }
        
        if (data && Array.isArray(data)) {
          handleImport(data);
        }
      } catch (error) {
        toast({
          title: "Erro na importação",
          description: "Erro ao processar o arquivo. Verifique o formato.",
          variant: "destructive"
        });
      }
    };
    
    if (file.type === 'application/json' || file.name.endsWith('.csv')) {
      reader.readAsText(file);
    } else {
      // Para arquivos Excel, você precisaria de uma biblioteca como xlsx
      toast({
        title: "Formato não suportado ainda",
        description: "Por favor, use arquivos JSON ou CSV por enquanto.",
        variant: "destructive"
      });
    }
  };

  const handleEditClient = (client: DisplayClient) => {
    setSelectedClient(client);
    setIsClientFormOpen(true);
  };

  const handleViewDetails = (client: DisplayClient) => {
    setSelectedClient(client);
    setIsSummaryModalOpen(true);
  };

  const handleCommentClient = (client: DisplayClient) => {
    setSelectedClient(client);
    setIsCommentModalOpen(true);
  };

  const handleCommentSubmit = (clientId: number, notes: string) => {
    const originalClient = clients.find(c => 
      parseInt(c.id.slice(0, 8), 16) === clientId
    );
    if (originalClient) {
      updateClient({ id: originalClient.id, updates: { notes } }, {
        onSuccess: () => {
          toast({
            title: "Sucesso",
            description: "Comentário salvo com sucesso.",
          });
          setIsCommentModalOpen(false);
          setSelectedClient(null);
        },
        onError: () => {
           toast({
            title: "Erro",
            description: "Não foi possível salvar o comentário.",
            variant: "destructive"
          });
        }
      });
    } else {
      toast({
        title: "Erro",
        description: "Cliente não encontrado para salvar o comentário.",
        variant: "destructive"
      });
    }
  };

  const handleStrategies = (clientId: number) => {
    window.location.href = `/strategies?client=${clientId}`;
    toast({
      title: "Redirecionando...",
      description: "Abrindo estratégias para o cliente"
    });
  };

  const handleSelectClient = (clientId: number) => {
    setSelectedClients(prev => 
      prev.includes(clientId) 
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  const handleSelectAll = () => {
    const allIds = paginatedClients.map(client => client.id);
    setSelectedClients(prev => 
      prev.length === allIds.length ? [] : allIds
    );
  };

  const handleClearSelection = () => {
    setSelectedClients([]);
  };

  const handleBulkAction = (action: string, clientIds: number[]) => {
    console.log(`Ação em lote: ${action} para clientes:`, clientIds);
    
    switch (action) {
      case 'export':
        handleBulkExport(clientIds);
        break;
      case 'email':
        handleBulkEmail(clientIds);
        break;
      case 'sms':
        handleBulkSMS(clientIds);
        break;
      case 'survey':
        handleBulkSurvey(clientIds);
        break;
      case 'delete':
        handleBulkDelete(clientIds);
        break;
      case 'updateTier':
        handleBulkUpdateTier(clientIds);
        break;
      case 'updateStatus':
        handleBulkUpdateStatus(clientIds);
        break;
      default:
        toast({
          title: "Ação aplicada",
          description: `${action} aplicada a ${clientIds.length} clientes`
        });
    }
  };

  const handleBulkExport = (clientIds: number[]) => {
    setIsExporting(true);
    try {
      const selectedClientsData = filteredClients.filter(client => 
        clientIds.includes(client.id)
      );
      
      const headers = ['Nome', 'Email', 'Empresa', 'Tier', 'Status', 'MRR', 'LTV', 'CAC', 'Score Risco', 'NPS'];
      const csvContent = [
        headers.join(','),
        ...selectedClientsData.map(client => [
          client.name,
          client.email,
          client.contact || '',
          client.tier,
          client.status,
          client.ltv,
          client.ltvProjected,
          client.cac || 0,
          client.riskScore,
          client.npsScore || ''
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `clientes_cs360_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Exportação concluída",
        description: `${selectedClientsData.length} clientes exportados`
      });
    } catch (error) {
      toast({
        title: "Erro na exportação",
        description: "Erro ao exportar clientes",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleBulkEmail = (clientIds: number[]) => {
    toast({
      title: "Campanha de Email",
      description: `Preparando envio para ${clientIds.length} clientes...`,
    });
  };

  const handleBulkSMS = (clientIds: number[]) => {
    toast({
      title: "Campanha SMS",
      description: `Preparando SMS para ${clientIds.length} clientes...`,
    });
  };

  const handleBulkSurvey = (clientIds: number[]) => {
    toast({
      title: "Pesquisa NPS",
      description: `Enviando pesquisa para ${clientIds.length} clientes...`,
    });
  };

  const handleBulkDelete = (clientIds: number[]) => {
    if (window.confirm(`Deseja realmente excluir ${clientIds.length} clientes?`)) {
      const clientsToDelete = clientIds
          .map(id => clients.find(c => parseInt(c.id.slice(0, 8), 16) === id))
          .filter((c): c is NonNullable<typeof c> => !!c);
      
      if (clientsToDelete.length > 0) {
          clientsToDelete.forEach(client => {
              deleteClient(client.id);
          });
          // The hook useClients handles individual toasts.
          // A global toast here confirms the batch action was started.
          toast({
            title: "Exclusão em lote iniciada",
            description: `A exclusão de ${clientsToDelete.length} clientes foi iniciada.`,
          });
          setSelectedClients([]);
      } else {
          toast({
            title: "Nenhum cliente encontrado",
            description: "Não foi possível encontrar os clientes selecionados para exclusão.",
            variant: "destructive"
          });
      }
    }
  };

  const handleBulkUpdateTier = (clientIds: number[]) => {
    toast({
      title: "Atualização de Tier",
      description: `Atualizando tier para ${clientIds.length} clientes...`
    });
  };

  const handleBulkUpdateStatus = (clientIds: number[]) => {
    toast({
      title: "Atualização de Status",
      description: `Atualizando status para ${clientIds.length} clientes...`
    });
  };

  const handleExport = async () => {
    await handleBulkExport(filteredClients.map(c => c.id));
  };

  const handleExportAdvanced = async (format: 'json' | 'excel') => {
    setIsExporting(true);
    try {
      const dataToExport = filteredClients.map(client => ({
        name: client.name,
        email: client.email,
        company: client.contact || '',
        phone: client.phone || '',
        tier: client.tier,
        status: client.status,
        mrr: client.ltv,
        ltv: client.ltvProjected,
        cac: client.cac || 0,
        risk_score: client.riskScore,
        nps_score: client.npsScore || '',
        acquisition_channel: '',  // Not available in DisplayClient, setting as empty
        responsible_cs: ''        // Not available in DisplayClient, setting as empty
      }));

      if (format === 'json') {
        const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { 
          type: 'application/json' 
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `clientes_cs360_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        // Criar CSV para Excel
        const headers = ['Nome', 'Email', 'Empresa', 'Telefone', 'Tier', 'Status', 'MRR', 'LTV', 'CAC', 'Score Risco', 'NPS', 'Canal Aquisição', 'CS Responsável'];
        const csvContent = [
          headers.join(','),
          ...dataToExport.map(client => [
            client.name,
            client.email,
            client.company,
            client.phone,
            client.tier,
            client.status,
            client.mrr,
            client.ltv,
            client.cac,
            client.risk_score,
            client.nps_score,
            client.acquisition_channel,
            client.responsible_cs
          ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `clientes_cs360_${new Date().toISOString().split('T')[0]}.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      toast({
        title: "Exportação concluída",
        description: `${filteredClients.length} clientes exportados em formato ${format.toUpperCase()}`
      });
    } catch (error) {
      toast({
        title: "Erro na exportação",
        description: "Erro ao exportar clientes",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedClients([]);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
    setSelectedClients([]);
  };

  if (loading) {
    return (
      <div className="bg-card rounded-xl shadow-sm border border-border p-8 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <ClientsHeader
        onImport={() => setIsImportGuideOpen(true)}
        onExport={() => handleExportAdvanced('excel')}
        onNewClient={() => {
          setSelectedClient(null);
          setIsClientFormOpen(true);
        }}
      />

      {/* Stats Overview */}
      <ClientsStats clients={clients} />

      {/* Quick Actions */}
      <ClientsQuickActions
        selectedClients={selectedClients}
        clients={displayClients}
        onBulkAction={handleBulkAction}
        onExport={handleExport}
        onImport={() => setIsImportModalOpen(true)}
        onNewClient={() => {
          setSelectedClient(null);
          setIsClientFormOpen(true);
        }}
      />

      {/* Advanced Search */}
      <ClientsSearchBar
        searchTerm={filters.search}
        onSearchChange={(term) => updateFilter('search', term)}
        filters={filters}
        onFilterChange={updateFilter}
        onResetFilters={resetFilters}
        totalResults={filteredClients.length}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      />

      {/* Bulk Actions */}
      <ClientsBulkActions
        clients={paginatedClients}
        selectedClients={selectedClients}
        onSelectClient={handleSelectClient}
        onSelectAll={handleSelectAll}
        onClearSelection={handleClearSelection}
        onBulkAction={handleBulkAction}
      />

      {/* Main Table Card */}
      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <ClientsTable
            clients={paginatedClients}
            selectedClients={selectedClients}
            onSelectClient={handleSelectClient}
            expandedClient={expandedClient}
            onExpandClient={setExpandedClient}
            onEditClient={handleEditClient}
            onViewDetails={handleViewDetails}
            onCommentClient={handleCommentClient}
            onStrategies={handleStrategies}
            getTierColor={getTierColor}
            getNPSColor={getNPSColor}
            getRiskColor={getRiskColor}
            getStatusColor={getStatusColor}
          />
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-border">
          <ClientsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalClients={filteredClients.length}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      </div>

      {/* Modals */}
      <ClientForm
        isOpen={isClientFormOpen}
        onClose={() => {
          setIsClientFormOpen(false);
          setSelectedClient(null);
        }}
        onSubmit={handleClientSubmit}
        client={selectedClient}
      />

      <ClientImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImport}
      />

      <ClientImportGuideModal
        isOpen={isImportGuideOpen}
        onClose={() => setIsImportGuideOpen(false)}
        onFileSelect={handleImportWithGuide}
      />

      <ClientSummaryModal
        isOpen={isSummaryModalOpen}
        onClose={() => {
          setIsSummaryModalOpen(false);
          setSelectedClient(null);
        }}
        client={selectedClient}
      />

      <ClientCommentModal
        isOpen={isCommentModalOpen}
        isSaving={isUpdating}
        onClose={() => {
          setIsCommentModalOpen(false);
          setSelectedClient(null);
        }}
        onSubmit={handleCommentSubmit}
        client={selectedClient}
      />
    </div>
  );
};
