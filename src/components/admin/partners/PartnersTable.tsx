
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { MoreHorizontal, Eye, Edit, UserCheck } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/dropdown-menu';

interface PartnersTableProps {
  filters: {
    type: string;
    level: string;
    status: string;
  };
}

export const PartnersTable: React.FC<PartnersTableProps> = ({ filters }) => {
  const mockPartners = [
    {
      id: "1",
      name: "Digital Solutions",
      email: "contato@digitalsolutions.com",
      type: "revenda",
      level: "gold",
      status: "approved",
      activeClients: 12,
      mrr: 5980,
      nps: 8.5,
      certifications: 3
    },
    {
      id: "2", 
      name: "Tech Partners",
      email: "hello@techpartners.com",
      type: "implementadora",
      level: "platinum",
      status: "approved",
      activeClients: 25,
      mrr: 12450,
      nps: 9.1,
      certifications: 4
    }
  ];

  const getTypeLabel = (type: string) => {
    const types: { [key: string]: string } = {
      'indicacao': 'Indicação',
      'revenda': 'Revenda',
      'implementadora': 'Implementadora',
      'white-label': 'White Label'
    };
    return types[type] || type;
  };

  const getLevelBadge = (level: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      'starter': 'outline',
      'member': 'secondary',
      'gold': 'default',
      'platinum': 'default',
      'elite': 'default'
    };
    return <Badge variant={variants[level]}>{level.toUpperCase()}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      'approved': 'default',
      'pending': 'outline',
      'suspended': 'destructive'
    };
    const labels: { [key: string]: string } = {
      'approved': 'Aprovado',
      'pending': 'Pendente',
      'suspended': 'Suspenso'
    };
    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Parceiros</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Parceiro</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Nível</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Clientes</TableHead>
              <TableHead>MRR</TableHead>
              <TableHead>NPS</TableHead>
              <TableHead>Cert.</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPartners.map((partner) => (
              <TableRow key={partner.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{partner.name}</div>
                    <div className="text-sm text-muted-foreground">{partner.email}</div>
                  </div>
                </TableCell>
                <TableCell>{getTypeLabel(partner.type)}</TableCell>
                <TableCell>{getLevelBadge(partner.level)}</TableCell>
                <TableCell>{getStatusBadge(partner.status)}</TableCell>
                <TableCell>{partner.activeClients}</TableCell>
                <TableCell>R$ {partner.mrr.toLocaleString()}</TableCell>
                <TableCell>{partner.nps}</TableCell>
                <TableCell>{partner.certifications}/5</TableCell>
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
                        <UserCheck className="mr-2 h-4 w-4" />
                        Certificações
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
