
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Database, Download, Upload, Trash2, Calendar, HardDrive, FileText, Shield } from 'lucide-react';

const dataTypes = [
  { name: 'Dados de Clientes', size: '2.4 GB', records: '1,247', lastBackup: '2024-01-15 02:00' },
  { name: 'Histórico de Contratos', size: '890 MB', records: '3,456', lastBackup: '2024-01-15 02:00' },
  { name: 'Métricas de Performance', size: '1.2 GB', records: '45,678', lastBackup: '2024-01-15 02:00' },
  { name: 'Logs de Sistema', size: '650 MB', records: '12,890', lastBackup: '2024-01-15 02:00' },
  { name: 'Documentos e Anexos', size: '3.8 GB', records: '789', lastBackup: '2024-01-15 02:00' }
];

const exportHistory = [
  {
    id: '1',
    type: 'Relatório de Clientes',
    format: 'Excel',
    size: '2.4 MB',
    date: '2024-01-15 14:30',
    user: 'João Silva',
    status: 'completed'
  },
  {
    id: '2',
    type: 'Dados de NPS',
    format: 'CSV',
    size: '890 KB',
    date: '2024-01-15 10:15',
    user: 'Maria Santos',
    status: 'completed'
  },
  {
    id: '3',
    type: 'Análise de Churn',
    format: 'PDF',
    size: '1.2 MB',
    date: '2024-01-14 16:45',
    user: 'Carlos Oliveira',
    status: 'failed'
  }
];

export const DataManagement = () => {
  const [selectedDataType, setSelectedDataType] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');
  
  const totalStorage = 9.94; // GB
  const usedStorage = 8.95; // GB
  const storagePercent = (usedStorage / totalStorage) * 100;

  const handleExportData = () => {
    console.log('Iniciando exportação:', { type: selectedDataType, format: selectedFormat });
  };

  const getStatusBadge = (status: string) => {
    const configs = {
      completed: { label: 'Concluído', className: 'bg-green-100 text-green-800' },
      failed: { label: 'Falhou', className: 'bg-red-100 text-red-800' },
      processing: { label: 'Processando', className: 'bg-blue-100 text-blue-800' }
    };

    const config = configs[status as keyof typeof configs] || configs.processing;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Uso de Armazenamento */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <HardDrive className="w-5 h-5" />
            <span>Uso de Armazenamento</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Armazenamento Total</span>
                <span className="text-2xl font-bold">{usedStorage} GB / {totalStorage} GB</span>
              </div>
              <Progress value={storagePercent} className="h-3" />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Usado</p>
                  <p className="font-semibold">{usedStorage} GB ({Math.round(storagePercent)}%)</p>
                </div>
                <div>
                  <p className="text-gray-600">Disponível</p>
                  <p className="font-semibold">{(totalStorage - usedStorage).toFixed(2)} GB</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Distribuição por Tipo</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Dados de Clientes</span>
                  <span className="text-sm font-medium">2.4 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Documentos</span>
                  <span className="text-sm font-medium">3.8 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Métricas</span>
                  <span className="text-sm font-medium">1.2 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Outros</span>
                  <span className="text-sm font-medium">1.55 GB</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exportação de Dados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Exportação de Dados</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo de Dados</label>
              <Select value={selectedDataType} onValueChange={setSelectedDataType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clients">Dados de Clientes</SelectItem>
                  <SelectItem value="contracts">Contratos</SelectItem>
                  <SelectItem value="nps">Dados de NPS</SelectItem>
                  <SelectItem value="performance">Métricas de Performance</SelectItem>
                  <SelectItem value="logs">Logs de Sistema</SelectItem>
                  <SelectItem value="all">Todos os Dados</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Formato</label>
              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o formato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                  <SelectItem value="csv">CSV (.csv)</SelectItem>
                  <SelectItem value="json">JSON (.json)</SelectItem>
                  <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button 
                onClick={handleExportData} 
                className="w-full flex items-center space-x-2"
                disabled={!selectedDataType || !selectedFormat}
              >
                <Download className="w-4 h-4" />
                <span>Exportar</span>
              </Button>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-2">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Conformidade LGPD</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Todos os dados exportados seguem as diretrizes da LGPD. Os dados pessoais são anonimizados 
                  quando necessário e o acesso é registrado nos logs de auditoria.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detalhamento dos Dados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="w-5 h-5" />
            <span>Detalhamento dos Dados</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo de Dados</TableHead>
                <TableHead>Tamanho</TableHead>
                <TableHead>Registros</TableHead>
                <TableHead>Último Backup</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataTypes.map((dataType, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{dataType.name}</TableCell>
                  <TableCell>{dataType.size}</TableCell>
                  <TableCell>{dataType.records}</TableCell>
                  <TableCell className="text-sm text-gray-500">{dataType.lastBackup}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Upload className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Histórico de Exportações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Histórico de Exportações</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Formato</TableHead>
                <TableHead>Tamanho</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exportHistory.map(export_ => (
                <TableRow key={export_.id}>
                  <TableCell className="font-medium">{export_.type}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{export_.format}</Badge>
                  </TableCell>
                  <TableCell>{export_.size}</TableCell>
                  <TableCell className="text-sm text-gray-500">{export_.date}</TableCell>
                  <TableCell>{export_.user}</TableCell>
                  <TableCell>{getStatusBadge(export_.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {export_.status === 'completed' && (
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
