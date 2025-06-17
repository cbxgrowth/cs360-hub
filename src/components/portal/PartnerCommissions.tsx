
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Upload, Download } from 'lucide-react';

export const PartnerCommissions = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Solicitar Pagamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground">
              Saldo disponível para saque: <span className="font-semibold text-green-600">R$ 1.794,00</span>
            </div>
            <Button className="w-full">
              <Upload className="w-4 h-4 mr-2" />
              Enviar Nota Fiscal
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Histórico de Pagamentos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground">
              Último pagamento: <span className="font-semibold">R$ 1.245,00</span> em 15/05/2024
            </div>
            <Button variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Baixar Relatório
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
