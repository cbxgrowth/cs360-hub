
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Eye, Edit, TrendingUp, ChevronDown, ChevronRight, MessageSquare } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import type { DisplayClient } from './adapters/clientsAdapter';

interface ClientsTableProps {
  clients: DisplayClient[];
  selectedClients: number[];
  onSelectClient: (clientId: number) => void;
  expandedClient: number | null;
  onExpandClient: (clientId: number | null) => void;
  onEditClient: (client: DisplayClient) => void;
  onViewDetails: (client: DisplayClient) => void;
  onCommentClient: (client: DisplayClient) => void;
  onStrategies: (clientId: number) => void;
  getTierColor: (tier: string) => string;
  getNPSColor: (score: number | null) => string;
  getRiskColor: (score: number) => string;
  getStatusColor: (status: string) => string;
}

export const ClientsTable: React.FC<ClientsTableProps> = ({
  clients,
  selectedClients,
  onSelectClient,
  expandedClient,
  onExpandClient,
  onEditClient,
  onViewDetails,
  onCommentClient,
  onStrategies,
  getTierColor,
  getNPSColor,
  getRiskColor,
  getStatusColor
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12"></TableHead>
          <TableHead className="w-12"></TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Tier</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>MRR</TableHead>
          <TableHead>LTV</TableHead>
          <TableHead>Risk Score</TableHead>
          <TableHead>NPS</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <React.Fragment key={client.id}>
            <TableRow className="hover:bg-muted/50">
              <TableCell>
                <Checkbox
                  checked={selectedClients.includes(client.id)}
                  onCheckedChange={() => onSelectClient(client.id)}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onExpandClient(expandedClient === client.id ? null : client.id)}
                >
                  {expandedClient === client.id ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="font-medium">{client.name}</div>
                  <div className="text-sm text-muted-foreground">{client.email}</div>
                  {client.contact && (
                    <div className="text-xs text-muted-foreground">{client.contact}</div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getTierColor(client.tier)}>
                  Nível {client.tier}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(client.status)}>
                  {client.status}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="font-mono">
                  R$ {client.ltv.toLocaleString()}
                </span>
              </TableCell>
              <TableCell>
                <span className="font-mono">
                  R$ {client.ltvProjected.toLocaleString()}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${getRiskColor(client.riskScore)}`}
                  ></div>
                  <span className="font-medium">{client.riskScore}%</span>
                </div>
              </TableCell>
              <TableCell>
                {client.npsScore !== null ? (
                  <Badge className={getNPSColor(client.npsScore)}>
                    {client.npsScore}/10
                  </Badge>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails(client)}
                    title="Visualizar Detalhes"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditClient(client)}
                    title="Editar Cliente"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onCommentClient(client)}
                    title="Adicionar Comentário"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onStrategies(client.id)}
                    title="Ver Estratégias"
                  >
                    <TrendingUp className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            {expandedClient === client.id && (
              <TableRow>
                <TableCell colSpan={10} className="bg-muted/20">
                  <div className="p-4 space-y-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium">CAC:</span>
                        <div>R$ {client.cac?.toLocaleString() || 'N/A'}</div>
                      </div>
                      <div>
                        <span className="font-medium">Categoria NPS:</span>
                        <div>{client.npsCategory || 'N/A'}</div>
                      </div>
                      <div>
                        <span className="font-medium">Telefone:</span>
                        <div>{client.phone || 'N/A'}</div>
                      </div>
                      <div>
                        <span className="font-medium">Última Interação:</span>
                        <div>{client.lastInteraction || 'N/A'}</div>
                      </div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
};
