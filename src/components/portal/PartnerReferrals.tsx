
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Copy, ExternalLink } from 'lucide-react';

export const PartnerReferrals = () => {
  const referrals = [
    {
      id: "1",
      email: "cliente@empresa.com",
      name: "Empresa ABC",
      status: "converted",
      plan: "Professional",
      value: "R$ 499",
      date: "2024-06-15",
      commission: "R$ 149,70"
    },
    {
      id: "2",
      email: "contato@startup.com", 
      name: "Startup XYZ",
      status: "pending",
      plan: "Growth",
      value: "R$ 999",
      date: "2024-06-20",
      commission: "R$ 299,70"
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      'converted': 'default',
      'pending': 'outline',
      'expired': 'destructive'
    };
    const labels: { [key: string]: string } = {
      'converted': 'Convertido',
      'pending': 'Pendente',
      'expired': 'Expirado'
    };
    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Links Gerados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">+5 este mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25.5%</div>
            <p className="text-xs text-muted-foreground">+2.1% vs anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Comissão Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 4.492</div>
            <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Suas Indicações</CardTitle>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <Copy className="w-4 h-4 mr-2" />
                Copiar Link
              </Button>
              <Button size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Comissão</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referrals.map((referral) => (
                <TableRow key={referral.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{referral.name}</div>
                      <div className="text-sm text-muted-foreground">{referral.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(referral.status)}</TableCell>
                  <TableCell>{referral.plan}</TableCell>
                  <TableCell>{referral.value}</TableCell>
                  <TableCell>{new Date(referral.date).toLocaleDateString()}</TableCell>
                  <TableCell className="font-medium">{referral.commission}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
