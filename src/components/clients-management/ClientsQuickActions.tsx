
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  Calendar,
  FileText,
  TrendingUp,
  Users,
  AlertTriangle,
  Download,
  Upload
} from 'lucide-react';
import { Badge } from '../ui/badge';
import type { DisplayClient } from './adapters/clientsAdapter';

interface ClientsQuickActionsProps {
  selectedClients: number[];
  clients: DisplayClient[];
  onBulkAction: (action: string, clientIds: number[]) => void;
  onExport: () => void;
  onImport: () => void;
  onNewClient: () => void;
}

export const ClientsQuickActions: React.FC<ClientsQuickActionsProps> = ({
  selectedClients,
  clients,
  onBulkAction,
  onExport,
  onImport,
  onNewClient
}) => {
  const urgentClients = clients.filter(c => c.riskScore > 70).length;
  const lowNPSClients = clients.filter(c => c.npsScore !== null && c.npsScore < 7).length;
  const inactiveClients = clients.filter(c => c.status === 'Inativo').length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Ações Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onNewClient}
              className="flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Novo Cliente
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onImport}
              className="flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Importar
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onExport}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Exportar
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => window.location.href = '/analytics'}
              className="flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Relatórios
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Alerts & Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            Alertas Importantes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {urgentClients > 0 && (
            <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium">Clientes em Risco</span>
              </div>
              <Badge className="bg-red-100 text-red-800">{urgentClients}</Badge>
            </div>
          )}
          
          {lowNPSClients > 0 && (
            <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium">NPS Baixo</span>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">{lowNPSClients}</Badge>
            </div>
          )}

          {inactiveClients > 0 && (
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium">Clientes Inativos</span>
              </div>
              <Badge className="bg-gray-100 text-gray-800">{inactiveClients}</Badge>
            </div>
          )}

          {urgentClients === 0 && lowNPSClients === 0 && inactiveClients === 0 && (
            <div className="text-center text-sm text-muted-foreground py-2">
              Nenhum alerta no momento 🎉
            </div>
          )}
        </CardContent>
      </Card>

      {/* Communication Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Mail className="w-5 h-5 text-green-600" />
            Ferramentas de Comunicação
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start"
              onClick={() => onBulkAction('email', selectedClients.length > 0 ? selectedClients : clients.map(c => c.id))}
            >
              <Mail className="w-4 h-4 mr-2" />
              Campanha de Email
              {selectedClients.length > 0 && (
                <Badge className="ml-auto">{selectedClients.length}</Badge>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start"
              onClick={() => onBulkAction('sms', selectedClients.length > 0 ? selectedClients : clients.map(c => c.id))}
            >
              <Phone className="w-4 h-4 mr-2" />
              Campanha SMS
              {selectedClients.length > 0 && (
                <Badge className="ml-auto">{selectedClients.length}</Badge>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start"
              onClick={() => window.location.href = '/calendar'}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Agendar Reuniões
            </Button>

            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start"
              onClick={() => onBulkAction('survey', selectedClients.length > 0 ? selectedClients : clients.map(c => c.id))}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Pesquisa NPS
            </Button>
          </div>
          
          {selectedClients.length > 0 && (
            <div className="text-xs text-muted-foreground text-center pt-2 border-t">
              {selectedClients.length} cliente(s) selecionado(s)
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
