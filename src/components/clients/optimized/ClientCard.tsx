
import React, { memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { User, Mail, Building2, MoreHorizontal } from 'lucide-react';
import type { Client } from '@/hooks/useClients';

interface ClientCardProps {
  client: Client;
  onEdit: (client: Client) => void;
  onDelete: (id: string) => void;
  onView: (client: Client) => void;
}

const ClientCard = memo<ClientCardProps>(({ client, onEdit, onDelete, onView }) => {
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'A': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'B': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'C': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Risco': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Inativo': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold truncate">
            {client.name}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge className={getTierColor(client.tier || 'C')}>
              Tier {client.tier || 'C'}
            </Badge>
            <Button variant="ghost" size="sm" onClick={() => onView(client)}>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Mail className="w-4 h-4" />
          <span className="truncate">{client.email}</span>
        </div>
        
        {client.company && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Building2 className="w-4 h-4" />
            <span className="truncate">{client.company}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <Badge className={getStatusColor(client.status || 'Ativo')}>
            {client.status || 'Ativo'}
          </Badge>
          
          {client.mrr && (
            <div className="text-sm font-medium">
              MRR: R$ {client.mrr.toLocaleString()}
            </div>
          )}
        </div>
        
        <div className="flex space-x-2 pt-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(client)} className="flex-1">
            Editar
          </Button>
          <Button variant="outline" size="sm" onClick={() => onView(client)} className="flex-1">
            Ver Detalhes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});

ClientCard.displayName = 'ClientCard';

export default ClientCard;
