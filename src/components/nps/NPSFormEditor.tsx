
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { 
  Palette, 
  Eye, 
  Settings, 
  Star, 
  Type, 
  Image,
  Smartphone,
  Monitor,
  Save,
  Play,
  ThumbsUp,
  Smile
} from 'lucide-react';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';

interface NPSFormEditorProps {
  isOpen: boolean;
  onClose: () => void;
  formConfig: any;
  onSave: (config: any) => void;
}

export const NPSFormEditor: React.FC<NPSFormEditorProps> = ({
  isOpen,
  onClose,
  formConfig,
  onSave
}) => {
  const [config, setConfig] = useState(formConfig || {
    title: 'Como você avaliaria nossa plataforma?',
    subtitle: 'Sua opinião é muito importante para nós',
    thankYouMessage: 'Obrigado pelo seu feedback!',
    followUpQuestion: 'O que podemos melhorar?',
    branding: {
      primaryColor: '#3B82F6',
      backgroundColor: '#FFFFFF',
      textColor: '#1F2937',
      logoUrl: '',
      companyName: 'CS360'
    },
    settings: {
      showLogo: true,
      showProgress: true,
      requireEmail: false,
      anonymousMode: false,
      autoSubmit: false,
      showLabels: true,
      customScaleLabels: false
    },
    customization: {
      buttonText: 'Enviar Avaliação',
      scaleType: 'stars',
      animation: 'fade',
      language: 'pt-BR'
    }
  });

  const [previewMode, setPreviewMode] = useState('desktop');

  const handleSave = () => {
    onSave(config);
    onClose();
  };

  const updateConfig = (path: string, value: any) => {
    const keys = path.split('.');
    const newConfig = { ...config };
    let current: any = newConfig;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    setConfig(newConfig);
  };
  
  const renderScale = () => {
    const scaleItems = Array.from({ length: 10 }, (_, i) => i + 1);

    const renderItem = (item: number) => {
      switch(config.customization.scaleType) {
        case 'stars':
          return <Star className="w-7 h-7 text-yellow-400 fill-yellow-400" />;
        case 'emojis':
          if (item <= 4) return <Smile className="w-7 h-7 text-red-500" />;
          if (item <= 7) return <Smile className="w-7 h-7 text-yellow-500" />;
          return <Smile className="w-7 h-7 text-green-500" />;
        case 'thumbs':
          return <ThumbsUp className="w-7 h-7" />;
        case 'numbers':
        default:
          return <span className="font-semibold text-lg">{item}</span>;
      }
    };

    return (
      <div className="flex justify-center items-center gap-x-1 sm:gap-x-2 mb-8">
        {scaleItems.map((num) => (
          <button
            key={num}
            className={`w-10 h-10 flex items-center justify-center rounded-md transition-all duration-200 hover:scale-110 hover:shadow-lg ${config.customization.scaleType !== 'numbers' ? 'border-none' : 'border-2'}`}
            style={{ borderColor: config.branding.primaryColor }}
          >
            {renderItem(num)}
          </button>
        ))}
      </div>
    );
  };


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Editor Avançado de Formulários NPS
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-1">
          {/* Configuration Panel */}
          <div className="space-y-4">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="content">
                  <Type className="w-4 h-4 mr-1" />
                  Conteúdo
                </TabsTrigger>
                <TabsTrigger value="design">
                  <Palette className="w-4 h-4 mr-1" />
                  Design
                </TabsTrigger>
                <TabsTrigger value="behavior">
                  <Settings className="w-4 h-4 mr-1" />
                  Comportamento
                </TabsTrigger>
                <TabsTrigger value="advanced">
                  <Star className="w-4 h-4 mr-1" />
                  Avançado
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Textos do Formulário</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Título Principal</Label>
                      <Input
                        value={config.title}
                        onChange={(e) => updateConfig('title', e.target.value)}
                        placeholder="Digite o título..."
                      />
                    </div>
                    <div>
                      <Label>Subtítulo</Label>
                      <Input
                        value={config.subtitle}
                        onChange={(e) => updateConfig('subtitle', e.target.value)}
                        placeholder="Digite o subtítulo..."
                      />
                    </div>
                    <div>
                      <Label>Pergunta de Seguimento</Label>
                      <Textarea
                        value={config.followUpQuestion}
                        onChange={(e) => updateConfig('followUpQuestion', e.target.value)}
                        placeholder="Pergunta opcional após a avaliação..."
                      />
                    </div>
                    <div>
                      <Label>Mensagem de Agradecimento</Label>
                      <Textarea
                        value={config.thankYouMessage}
                        onChange={(e) => updateConfig('thankYouMessage', e.target.value)}
                        placeholder="Mensagem exibida após envio..."
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="design" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Cores e Branding</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Cor Primária</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="color"
                            value={config.branding.primaryColor}
                            onChange={(e) => updateConfig('branding.primaryColor', e.target.value)}
                            className="w-16 h-10 p-1"
                          />
                          <Input
                            value={config.branding.primaryColor}
                            onChange={(e) => updateConfig('branding.primaryColor', e.target.value)}
                            placeholder="#3B82F6"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Cor de Fundo</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="color"
                            value={config.branding.backgroundColor}
                            onChange={(e) => updateConfig('branding.backgroundColor', e.target.value)}
                            className="w-16 h-10 p-1"
                          />
                          <Input
                            value={config.branding.backgroundColor}
                            onChange={(e) => updateConfig('branding.backgroundColor', e.target.value)}
                            placeholder="#FFFFFF"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label>URL do Logo</Label>
                      <Input
                        value={config.branding.logoUrl}
                        onChange={(e) => updateConfig('branding.logoUrl', e.target.value)}
                        placeholder="https://exemplo.com/logo.png"
                      />
                    </div>
                    <div>
                      <Label>Nome da Empresa</Label>
                      <Input
                        value={config.branding.companyName}
                        onChange={(e) => updateConfig('branding.companyName', e.target.value)}
                        placeholder="Nome da sua empresa"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="behavior" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Configurações de Comportamento</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Mostrar Logo</Label>
                      <Switch
                        checked={config.settings.showLogo}
                        onCheckedChange={(checked) => updateConfig('settings.showLogo', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Mostrar Barra de Progresso</Label>
                      <Switch
                        checked={config.settings.showProgress}
                        onCheckedChange={(checked) => updateConfig('settings.showProgress', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Requerer Email</Label>
                      <Switch
                        checked={config.settings.requireEmail}
                        onCheckedChange={(checked) => updateConfig('settings.requireEmail', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Modo Anônimo</Label>
                      <Switch
                        checked={config.settings.anonymousMode}
                        onCheckedChange={(checked) => updateConfig('settings.anonymousMode', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Envio Automático</Label>
                      <Switch
                        checked={config.settings.autoSubmit}
                        onCheckedChange={(checked) => updateConfig('settings.autoSubmit', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Configurações Avançadas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Tipo de Escala</Label>
                      <select 
                        className="w-full p-2 border rounded bg-background"
                        value={config.customization.scaleType}
                        onChange={(e) => updateConfig('customization.scaleType', e.target.value)}
                      >
                        <option value="stars">Estrelas</option>
                        <option value="numbers">Números</option>
                        <option value="emojis">Emojis</option>
                        <option value="thumbs">Polegar</option>
                      </select>
                    </div>
                    <div>
                      <Label>Animação</Label>
                      <select 
                        className="w-full p-2 border rounded bg-background"
                        value={config.customization.animation}
                        onChange={(e) => updateConfig('customization.animation', e.target.value)}
                      >
                        <option value="none">Nenhuma</option>
                        <option value="fade">Fade</option>
                        <option value="slide">Slide</option>
                        <option value="bounce">Bounce</option>
                      </select>
                    </div>
                    <div>
                      <Label>Texto do Botão</Label>
                      <Input
                        value={config.customization.buttonText}
                        onChange={(e) => updateConfig('customization.buttonText', e.target.value)}
                        placeholder="Texto do botão de envio"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Visualização
              </h3>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={previewMode === 'desktop' ? 'secondary' : 'ghost'}
                  onClick={() => setPreviewMode('desktop')}
                >
                  <Monitor className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant={previewMode === 'mobile' ? 'secondary' : 'ghost'}
                  onClick={() => setPreviewMode('mobile')}
                >
                  <Smartphone className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className={`border rounded-lg overflow-hidden transition-all duration-300 ${
              previewMode === 'mobile' ? 'max-w-sm mx-auto' : 'w-full'
            }`}>
              <div 
                className="p-8 text-center"
                style={{ 
                  backgroundColor: config.branding.backgroundColor,
                  color: config.branding.textColor 
                }}
              >
                {config.settings.showLogo && config.branding.logoUrl && (
                  <img 
                    src={config.branding.logoUrl} 
                    alt="Logo" 
                    className="h-8 mx-auto mb-6"
                  />
                )}
                
                {config.settings.showProgress && (
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-6">
                    <div 
                      className="h-1.5 rounded-full" 
                      style={{ 
                        backgroundColor: config.branding.primaryColor,
                        width: '50%' 
                      }}
                    ></div>
                  </div>
                )}

                <h2 className="text-2xl font-bold mb-2">{config.title}</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8">{config.subtitle}</p>

                {renderScale()}

                <Textarea
                  placeholder={config.followUpQuestion}
                  className="w-full p-3 border rounded-md mb-6 bg-transparent"
                  rows={3}
                  style={{ borderColor: config.branding.textColor + '33' }}
                />

                <Button
                  className="px-8 py-3 rounded-md text-lg font-semibold"
                  style={{ 
                    backgroundColor: config.branding.primaryColor,
                    color: config.branding.backgroundColor,
                  }}
                >
                  {config.customization.buttonText}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <div className="flex gap-2">
            <Button variant="outline">
              <Play className="w-4 h-4 mr-2" />
              Testar
            </Button>
            <Button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <Save className="w-4 h-4 mr-2" />
              Salvar Configurações
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
