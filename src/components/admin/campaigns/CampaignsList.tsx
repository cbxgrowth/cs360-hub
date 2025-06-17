
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { MoreHorizontal, Eye, Edit, Copy } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/dropdown-menu';

interface CampaignsListProps {
  type: 'partner' | 'client';
}

export const CampaignsList: React.FC<CampaignsListProps> = ({ type }) => {
  const mockCampaigns = [
    {
      id: "1",
      name: "Indique e Ganhe - Julho 2024",
      description: "10.000 tokens IA + 1 integração extra",
      status: "active",
      validFrom: "2024-07-01",
      validTo: "2024-07-31",
      conversions: 45,
      totalRewards: "R$ 2.250"
    },
    {
      id: "2",
      name: "Black Friday Partners",
      description: "Cashback de 25% nas primeiras vendas",
      status: "scheduled",
      validFrom: "2024-11-25",
      validTo: "2024-11-30",
      conversions: 0,
      totalRewards: "R$ 0"
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      'active': 'default',
      'scheduled': 'secondary',
      'expired': 'outline'
    };
    const labels: { [key: string]: string } = {
      'active': 'Ativa',
      'scheduled': 'Agendada',
      'expired': 'Expirada'
    };
    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {type === 'partner' ? 'Campanhas para Parceiros' : 'Campanhas de Indicação por Clientes'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campanha</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Período</TableHead>
              <TableHead>Conversões</TableHead>
              <TableHead>Total Recompensas</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCampaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{campaign.name}</div>
                    <div className="text-sm text-muted-foreground">{campaign.description}</div>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{new Date(campaign.validFrom).toLocaleDateString()}</div>
                    <div className="text-muted-foreground">até {new Date(campaign.validTo).toLocaleDateString()}</div>
                  </div>
                </TableCell>
                <TableCell>{campaign.conversions}</TableCell>
                <TableCell>{campaign.totalRewards}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
