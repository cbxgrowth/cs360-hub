
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Shield, Eye, Download, Filter, Calendar, User, Activity, Lock } from 'lucide-react';

const auditLogs = [
  {
    id: '1',
    timestamp: '2024-01-15 14:30:25',
    user: 'João Silva',
    action: 'Login realizado',
    resource: 'Sistema',
    ip: '192.168.1.100',
    severity: 'info',
    details: 'Login bem-sucedido via navegador Chrome'
  },
  {
    id: '2',
    timestamp: '2024-01-15 14:25:10',
    user: 'Maria Santos',
    action: 'Cliente editado',
    resource: 'Cliente #1234',
    ip: '192.168.1.101',
    severity: 'medium',
    details: 'Alteração no campo NPS de 7 para 8'
  },
  {
    id: '3',
    timestamp: '2024-01-15 14:20:05',
    user: 'João Silva',
    action: 'Exportação de dados',
    resource: 'Relatório de Clientes',
    ip: '192.168.1.100',
    severity: 'high',
    details: 'Exportação de 150 registros em formato Excel'
  },
  {
    id: '4',
    timestamp: '2024-01-15 14:15:30',
    user: 'Sistema',
    action: 'Tentativa de login falhada',
    resource: 'Sistema',
    ip: '203.0.113.45',
    severity: 'high',
    details: 'Falha na autenticação para usuário admin@empresa.com'
  },
  {
    id: '5',
    timestamp: '2024-01-15 14:10:15',
    user: 'Maria Santos',
    action: 'Usuário criado',
    resource: 'Usuário #789',
    ip: '192.168.1.101',
    severity: 'medium',
    details: 'Novo usuário Carlos Oliveira criado com perfil CS User'
  }
];

const securityMetrics = [
  { label: 'Logins hoje', value: '28', trend: '+12%', color: 'green' },
  { label: 'Tentativas falhadas', value: '3', trend: '-25%', color: 'red' },
  { label: 'Exportações', value: '7', trend: '+40%', color: 'blue' },
  { label: 'Alterações críticas', value: '2', trend: '0%', color: 'yellow' }
];

export const SecurityAudit = () => {
  const [filter, setFilter] = useState({
    user: '',
    action: '',
    severity: '',
    dateFrom: '',
    dateTo: ''
  });

  const getSeverityBadge = (severity: string) => {
    const colors = {
      info: 'bg-blue-100 text-blue-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    
    const labels = {
      info: 'Informativo',
      medium: 'Médio',
      high: 'Alto'
    };

    return (
      <Badge className={colors[severity as keyof typeof colors]}>
        {labels[severity as keyof typeof labels]}
      </Badge>
    );
  };

  const exportAuditLog = () => {
    console.log('Exportando logs de auditoria...');
  };

  return (
    <div className="space-y-6">
      {/* Métricas de Segurança */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {securityMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
                <div className={`text-sm font-medium ${
                  metric.color === 'green' ? 'text-green-600' :
                  metric.color === 'red' ? 'text-red-600' :
                  metric.color === 'blue' ? 'text-blue-600' :
                  'text-yellow-600'
                }`}>
                  {metric.trend}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Configurações de Segurança */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Status de Segurança</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Criptografia de dados</span>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Autenticação OAuth2</span>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Conformidade LGPD</span>
                <Badge className="bg-green-100 text-green-800">Conforme</Badge>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Backup automático</span>
                <Badge className="bg-green-100 text-green-800">Diário</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Monitoramento 24/7</span>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Firewall avançado</span>
                <Badge className="bg-green-100 text-green-800">Protegido</Badge>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button className="w-full flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>Configurar 2FA</span>
              </Button>
              <Button variant="outline" className="w-full">
                Política de Senhas
              </Button>
              <Button variant="outline" className="w-full">
                Relatório de Conformidade
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logs de Auditoria */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>Logs de Auditoria</span>
          </CardTitle>
          <Button onClick={exportAuditLog} className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </Button>
        </CardHeader>
        <CardContent>
          {/* Filtros */}
          <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="min-w-[200px]">
              <Input 
                placeholder="Filtrar por usuário" 
                value={filter.user}
                onChange={(e) => setFilter({...filter, user: e.target.value})}
              />
            </div>
            <div className="min-w-[200px]">
              <Select value={filter.action} onValueChange={(value) => setFilter({...filter, action: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de ação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas as ações</SelectItem>
                  <SelectItem value="login">Login</SelectItem>
                  <SelectItem value="export">Exportação</SelectItem>
                  <SelectItem value="edit">Edição</SelectItem>
                  <SelectItem value="create">Criação</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="min-w-[150px]">
              <Select value={filter.severity} onValueChange={(value) => setFilter({...filter, severity: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Severidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas</SelectItem>
                  <SelectItem value="info">Informativo</SelectItem>
                  <SelectItem value="medium">Médio</SelectItem>
                  <SelectItem value="high">Alto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Aplicar Filtros</span>
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>Ação</TableHead>
                <TableHead>Recurso</TableHead>
                <TableHead>IP</TableHead>
                <TableHead>Severidade</TableHead>
                <TableHead>Detalhes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map(log => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span>{log.user}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{log.action}</TableCell>
                  <TableCell>{log.resource}</TableCell>
                  <TableCell className="font-mono text-sm">{log.ip}</TableCell>
                  <TableCell>{getSeverityBadge(log.severity)}</TableCell>
                  <TableCell className="max-w-xs truncate" title={log.details}>
                    {log.details}
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
