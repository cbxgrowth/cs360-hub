
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Settings, 
  Brain, 
  Zap, 
  Target, 
  Database,
  Shield,
  Cpu,
  Activity,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  TrendingUp,
  BarChart3,
  RefreshCw,
  Download,
  Upload
} from 'lucide-react';
import { useAICredits } from '../../hooks/useAICredits';

interface AIModel {
  id: string;
  name: string;
  type: 'classification' | 'regression' | 'clustering' | 'nlp';
  accuracy: number;
  status: 'training' | 'active' | 'inactive' | 'error';
  lastTrained: string;
  dataPoints: number;
}

const aiModels: AIModel[] = [
  {
    id: 'model_churn',
    name: 'Predição de Churn',
    type: 'classification',
    accuracy: 94.2,
    status: 'active',
    lastTrained: '2024-06-10',
    dataPoints: 15420
  },
  {
    id: 'model_ltv',
    name: 'Cálculo de LTV',
    type: 'regression',
    accuracy: 89.7,
    status: 'active',
    lastTrained: '2024-06-08',
    dataPoints: 12890
  },
  {
    id: 'model_segment',
    name: 'Segmentação de Clientes',
    type: 'clustering',
    accuracy: 87.3,
    status: 'training',
    lastTrained: '2024-06-05',
    dataPoints: 18900
  },
  {
    id: 'model_sentiment',
    name: 'Análise de Sentimento',
    type: 'nlp',
    accuracy: 91.8,
    status: 'active',
    lastTrained: '2024-06-09',
    dataPoints: 8750
  }
];

export const AIAdvancedFeatures = () => {
  const [models, setModels] = useState(aiModels);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [autoRetrain, setAutoRetrain] = useState(true);
  const [confidenceThreshold, setConfidenceThreshold] = useState([85]);
  const [dataQualityThreshold, setDataQualityThreshold] = useState([90]);
  const [isRetraining, setIsRetraining] = useState<string | null>(null);
  const { consumeCredits, credits } = useAICredits();

  const handleRetrainModel = async (modelId: string) => {
    const success = await consumeCredits(100, 'Retreinar Modelo IA');
    if (success) {
      setIsRetraining(modelId);
      setModels(prev => prev.map(model => 
        model.id === modelId ? { ...model, status: 'training' } : model
      ));
      
      setTimeout(() => {
        setModels(prev => prev.map(model => 
          model.id === modelId ? { 
            ...model, 
            status: 'active',
            accuracy: Math.min(98, model.accuracy + Math.random() * 3),
            lastTrained: new Date().toISOString().split('T')[0]
          } : model
        ));
        setIsRetraining(null);
      }, 5000);
    }
  };

  const handleOptimizeModel = async (modelId: string) => {
    const success = await consumeCredits(75, 'Otimizar Modelo IA');
    if (success) {
      // Simular otimização
      setTimeout(() => {
        setModels(prev => prev.map(model => 
          model.id === modelId ? { 
            ...model, 
            accuracy: Math.min(98, model.accuracy + Math.random() * 2)
          } : model
        ));
      }, 3000);
    }
  };

  const handleExportModel = async (modelId: string) => {
    const success = await consumeCredits(50, 'Exportar Modelo IA');
    if (success) {
      // Simular exportação
      console.log(`Exportando modelo ${modelId}...`);
    }
  };

  const getModelStatusColor = (status: string) => {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'training': 'bg-yellow-100 text-yellow-800',
      'inactive': 'bg-gray-100 text-gray-800',
      'error': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getModelIcon = (type: string) => {
    const icons = {
      'classification': Target,
      'regression': TrendingUp,
      'clustering': BarChart3,
      'nlp': Brain
    };
    return icons[type as keyof typeof icons] || Brain;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold flex items-center space-x-2">
            <Settings className="w-6 h-6 text-blue-600" />
            <span>Configurações Avançadas de IA</span>
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Gerencie modelos, otimizações e configurações avançadas
          </p>
        </div>
        <Badge className="bg-purple-100 text-purple-800">
          {models.filter(m => m.status === 'active').length} modelos ativos
        </Badge>
      </div>

      {/* Global AI Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <span>Configurações Globais</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Auto-retreinamento</Label>
                  <p className="text-xs text-gray-600">Retreinar modelos automaticamente</p>
                </div>
                <Switch checked={autoRetrain} onCheckedChange={setAutoRetrain} />
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Limite de Confiança: {confidenceThreshold[0]}%
                </Label>
                <Slider
                  value={confidenceThreshold}
                  onValueChange={setConfidenceThreshold}
                  max={100}
                  min={50}
                  step={5}
                  className="w-full"
                />
                <p className="text-xs text-gray-600">
                  Predições abaixo deste limite serão marcadas como incertas
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Qualidade dos Dados: {dataQualityThreshold[0]}%
                </Label>
                <Slider
                  value={dataQualityThreshold}
                  onValueChange={setDataQualityThreshold}
                  max={100}
                  min={70}
                  step={5}
                  className="w-full"
                />
                <p className="text-xs text-gray-600">
                  Limite mínimo de qualidade para usar dados no treinamento
                </p>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Frequência de Retreinamento</Label>
                <Select defaultValue="weekly">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Diário</SelectItem>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="monthly">Mensal</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Models Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-blue-600" />
            <span>Gerenciamento de Modelos</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {models.map((model) => {
              const ModelIcon = getModelIcon(model.type);
              const isRetrainingModel = isRetraining === model.id;
              
              return (
                <Card key={model.id} className="border-2 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <ModelIcon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{model.name}</h4>
                          <p className="text-sm text-gray-600 capitalize">{model.type}</p>
                        </div>
                      </div>
                      <Badge className={getModelStatusColor(model.status)}>
                        {model.status === 'active' ? 'Ativo' :
                         model.status === 'training' ? 'Treinando' :
                         model.status === 'inactive' ? 'Inativo' : 'Erro'}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Precisão</p>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">{model.accuracy.toFixed(1)}%</span>
                          <Progress value={model.accuracy} className="h-2 flex-1" />
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-600">Dados</p>
                        <p className="font-semibold">{model.dataPoints.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <p className="text-gray-600">Último treinamento</p>
                      <p className="font-semibold">{model.lastTrained}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleRetrainModel(model.id)}
                        disabled={isRetrainingModel || model.status === 'training' || credits < 100}
                        className="flex-1"
                      >
                        <RefreshCw className={`w-4 h-4 mr-1 ${isRetrainingModel ? 'animate-spin' : ''}`} />
                        {isRetrainingModel ? 'Treinando...' : 'Retreinar (100)'}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleOptimizeModel(model.id)}
                        disabled={credits < 75}
                      >
                        <Zap className="w-4 h-4 mr-1" />
                        Otimizar (75)
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleExportModel(model.id)}
                        disabled={credits < 50}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Exportar (50)
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Model Performance Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-green-600" />
            <span>Analytics de Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600">Média de Precisão</p>
                    <p className="text-2xl font-bold text-blue-700">90.8%</p>
                  </div>
                  <Target className="w-8 h-8 text-blue-500" />
                </div>
                <p className="text-xs text-blue-600 mt-2">+2.3% vs mês anterior</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-green-50 to-green-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600">Predições Hoje</p>
                    <p className="text-2xl font-bold text-green-700">1,247</p>
                  </div>
                  <Brain className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-xs text-green-600 mt-2">+18% vs ontem</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-purple-50 to-purple-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600">Modelos Ativos</p>
                    <p className="text-2xl font-bold text-purple-700">{models.filter(m => m.status === 'active').length}</p>
                  </div>
                  <Cpu className="w-8 h-8 text-purple-500" />
                </div>
                <p className="text-xs text-purple-600 mt-2">3 novos este mês</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-orange-600" />
            <span>Configurações Avançadas</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Limite de Rate Limiting (por minuto)</Label>
                <Input type="number" defaultValue="1000" className="mt-1" />
                <p className="text-xs text-gray-600 mt-1">
                  Máximo de predições por minuto
                </p>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Timeout de Predição (segundos)</Label>
                <Input type="number" defaultValue="30" className="mt-1" />
                <p className="text-xs text-gray-600 mt-1">
                  Tempo limite para gerar uma predição
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Política de Logs</Label>
                <Select defaultValue="detailed">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minimal">Mínimo</SelectItem>
                    <SelectItem value="standard">Padrão</SelectItem>
                    <SelectItem value="detailed">Detalhado</SelectItem>
                    <SelectItem value="debug">Debug</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Backup de Modelos</Label>
                <Select defaultValue="weekly">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Diário</SelectItem>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="monthly">Mensal</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline">
              Restaurar Padrões
            </Button>
            <Button>
              Salvar Configurações
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
