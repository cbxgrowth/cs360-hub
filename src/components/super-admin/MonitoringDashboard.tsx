
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Activity, 
  Server, 
  Database, 
  Wifi,
  Cpu,
  HardDrive,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Globe,
  Shield
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';

export const MonitoringDashboard = () => {
  const systemHealth = [
    { name: 'CPU', value: 24, status: 'normal', icon: Cpu, color: 'text-green-600' },
    { name: 'RAM', value: 67, status: 'normal', icon: HardDrive, color: 'text-green-600' },
    { name: 'Disk I/O', value: 43, status: 'normal', icon: Database, color: 'text-green-600' },
    { name: 'Network', value: 89, status: 'warning', icon: Wifi, color: 'text-yellow-600' },
    { name: 'API Response', value: 245, status: 'normal', icon: Server, color: 'text-green-600', unit: 'ms' },
    { name: 'Database', value: 12, status: 'normal', icon: Database, color: 'text-green-600', unit: 'ms' }
  ];

  const performanceData = [
    { time: '00:00', cpu: 15, memory: 45, network: 234 },
    { time: '04:00', cpu: 22, memory: 52, network: 267 },
    { time: '08:00', cpu: 35, memory: 61, network: 445 },
    { time: '12:00', cpu: 28, memory: 58, network: 389 },
    { time: '16:00', cpu: 42, memory: 65, network: 523 },
    { time: '20:00', cpu: 31, memory: 59, network: 401 },
    { time: '23:59', cpu: 24, memory: 48, network: 298 }
  ];

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Alta latência detectada',
      description: 'Servidor US-East reportando latência acima de 500ms',
      time: '15 min atrás',
      status: 'open'
    },
    {
      id: 2,
      type: 'error',
      title: 'Falha na conexão com banco',
      description: 'Timeout na conexão com replica secundária',
      time: '32 min atrás',
      status: 'resolved'
    },
    {
      id: 3,
      type: 'info',
      title: 'Deploy realizado',
      description: 'Nova versão v2.1.4 implantada com sucesso',
      time: '1h atrás',
      status: 'resolved'
    }
  ];

  const serviceStatus = [
    { name: 'API Gateway', status: 'online', uptime: '99.98%', responseTime: '156ms' },
    { name: 'Database Primary', status: 'online', uptime: '99.95%', responseTime: '12ms' },
    { name: 'Database Replica', status: 'warning', uptime: '98.23%', responseTime: '34ms' },
    { name: 'Redis Cache', status: 'online', uptime: '99.99%', responseTime: '3ms' },
    { name: 'File Storage', status: 'online', uptime: '99.89%', responseTime: '89ms' },
    { name: 'Email Service', status: 'online', uptime: '99.67%', responseTime: '234ms' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      case 'offline': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'info': return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Monitoramento do Sistema</h2>
          <p className="text-muted-foreground">Status em tempo real da infraestrutura</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-green-100 text-green-800">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
            Sistema Online
          </Badge>
          <Button variant="outline" size="sm">
            <Activity className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
        </div>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {systemHealth.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <metric.icon className={`w-5 h-5 ${metric.color}`} />
                  <span className="text-sm font-medium">{metric.name}</span>
                </div>
              </div>
              <div className="text-xl font-bold">
                {metric.value}{metric.unit || '%'}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full ${
                    metric.status === 'normal' ? 'bg-green-500' : 
                    metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(metric.value, 100)}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Performance (24h)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="cpu" stroke="#3B82F6" name="CPU %" />
                <Line type="monotone" dataKey="memory" stroke="#10B981" name="Memory %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Network Traffic */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Tráfego de Rede</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} MB/s`, 'Tráfego']} />
                <Area type="monotone" dataKey="network" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Service Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Server className="w-5 h-5" />
            <span>Status dos Serviços</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviceStatus.map((service, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">{service.name}</span>
                  <Badge className={getStatusBadge(service.status)}>
                    {service.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Uptime:</span>
                    <span className="font-medium">{service.uptime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Response:</span>
                    <span className="font-medium">{service.responseTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Alertas do Sistema</span>
            <Badge variant="outline">
              {alerts.filter(alert => alert.status === 'open').length} ativos
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                <div className="flex-shrink-0 mt-1">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">{alert.title}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge variant={alert.status === 'open' ? 'destructive' : 'outline'}>
                        {alert.status === 'open' ? 'Aberto' : 'Resolvido'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                  {alert.status === 'open' && (
                    <div className="flex space-x-2 mt-2">
                      <Button size="sm" variant="outline">
                        Investigar
                      </Button>
                      <Button size="sm" variant="outline">
                        Resolver
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
