
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { 
  Palette, 
  Upload, 
  Settings, 
  Globe, 
  Shield, 
  Bell, 
  Database,
  Eye,
  Save,
  RefreshCw,
  Image,
  Brush,
  Monitor
} from 'lucide-react';

export const AdvancedSettings = () => {
  const [companyLogo, setCompanyLogo] = useState('/api/placeholder/120/40');
  const [primaryColor, setPrimaryColor] = useState('#3B82F6');
  const [secondaryColor, setSecondaryColor] = useState('#10B981');
  const [companyName, setCompanyName] = useState('Empresa CS360°');
  const [customDomain, setCustomDomain] = useState('');
  const [theme, setTheme] = useState('modern');

  const predefinedColors = [
    { name: 'Azul Corporativo', value: '#3B82F6' },
    { name: 'Verde Moderno', value: '#10B981' },
    { name: 'Roxo Inovador', value: '#8B5CF6' },
    { name: 'Laranja Energético', value: '#F59E0B' },
    { name: 'Vermelho Impacto', value: '#EF4444' },
    { name: 'Índigo Profissional', value: '#6366F1' }
  ];

  const themes = [
    { id: 'modern', name: 'Moderno', description: 'Design clean e minimalista' },
    { id: 'classic', name: 'Clássico', description: 'Visual tradicional corporativo' },
    { id: 'dark', name: 'Escuro', description: 'Tema escuro para baixa luminosidade' },
    { id: 'vibrant', name: 'Vibrante', description: 'Cores vivas e energéticas' }
  ];

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCompanyLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveSettings = () => {
    console.log('Salvando configurações:', {
      companyLogo,
      primaryColor,
      secondaryColor,
      companyName,
      customDomain,
      theme
    });
    // Implementar lógica de salvamento
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Configurações Avançadas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="branding">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="branding" className="flex items-center space-x-2">
                <Palette className="w-4 h-4" />
                <span className="hidden sm:inline">Marca</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center space-x-2">
                <Monitor className="w-4 h-4" />
                <span className="hidden sm:inline">Visual</span>
              </TabsTrigger>
              <TabsTrigger value="domain" className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">Domínio</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Segurança</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center space-x-2">
                <Bell className="w-4 h-4" />
                <span className="hidden sm:inline">Notificações</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="branding" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Image className="w-5 h-5" />
                      <span>Logo da Empresa</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                        {companyLogo ? (
                          <img src={companyLogo} alt="Logo" className="max-w-full max-h-full object-contain" />
                        ) : (
                          <Upload className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="logo-upload" className="cursor-pointer">
                          <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                            <Upload className="w-6 h-6 mx-auto text-blue-500 mb-2" />
                            <p className="text-sm text-blue-600">Clique para enviar logo</p>
                            <p className="text-xs text-gray-500">PNG, JPG até 2MB</p>
                          </div>
                          <input
                            id="logo-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="hidden"
                          />
                        </Label>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Nome da Empresa</Label>
                      <Input
                        id="company-name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Digite o nome da empresa"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Brush className="w-5 h-5" />
                      <span>Cores da Marca</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="primary-color">Cor Primária</Label>
                        <div className="flex items-center space-x-3 mt-1">
                          <input
                            type="color"
                            id="primary-color"
                            value={primaryColor}
                            onChange={(e) => setPrimaryColor(e.target.value)}
                            className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
                          />
                          <Input
                            value={primaryColor}
                            onChange={(e) => setPrimaryColor(e.target.value)}
                            className="font-mono text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="secondary-color">Cor Secundária</Label>
                        <div className="flex items-center space-x-3 mt-1">
                          <input
                            type="color"
                            id="secondary-color"
                            value={secondaryColor}
                            onChange={(e) => setSecondaryColor(e.target.value)}
                            className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
                          />
                          <Input
                            value={secondaryColor}
                            onChange={(e) => setSecondaryColor(e.target.value)}
                            className="font-mono text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Cores Predefinidas</Label>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {predefinedColors.map((color) => (
                          <Button
                            key={color.value}
                            variant="outline"
                            size="sm"
                            onClick={() => setPrimaryColor(color.value)}
                            className="flex items-center space-x-2 h-auto p-2"
                          >
                            <div
                              className="w-4 h-4 rounded border"
                              style={{ backgroundColor: color.value }}
                            ></div>
                            <span className="text-xs">{color.name}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Preview da Personalização</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-4" style={{ backgroundColor: primaryColor + '20' }}>
                      <div className="flex items-center space-x-3 p-3">
                        {companyLogo && (
                          <img src={companyLogo} alt="Logo" className="h-8 object-contain" />
                        )}
                        <span className="font-semibold" style={{ color: primaryColor }}>
                          {companyName}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-8 h-8 rounded-full" style={{ backgroundColor: primaryColor }}></div>
                        <div className="w-8 h-8 rounded-full" style={{ backgroundColor: secondaryColor }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 rounded" style={{ backgroundColor: primaryColor + '40', width: '60%' }}></div>
                      <div className="h-2 rounded" style={{ backgroundColor: secondaryColor + '40', width: '40%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tema da Interface</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {themes.map((themeOption) => (
                      <div
                        key={themeOption.id}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          theme === themeOption.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setTheme(themeOption.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{themeOption.name}</h4>
                          {theme === themeOption.id && (
                            <Badge className="bg-blue-100 text-blue-800">Ativo</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{themeOption.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="domain" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="w-5 h-5" />
                    <span>Configuração de Domínio</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="custom-domain">Domínio Personalizado</Label>
                    <Input
                      id="custom-domain"
                      value={customDomain}
                      onChange={(e) => setCustomDomain(e.target.value)}
                      placeholder="meudominio.com.br"
                      className="mt-1"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Configure um domínio personalizado para sua aplicação
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Configuração DNS</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-700">Tipo:</span>
                        <span className="font-mono bg-white px-2 py-1 rounded">CNAME</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Nome:</span>
                        <span className="font-mono bg-white px-2 py-1 rounded">@</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Valor:</span>
                        <span className="font-mono bg-white px-2 py-1 rounded">cs360.app</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Configurações de Segurança</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Autenticação de Dois Fatores</h4>
                      <p className="text-sm text-gray-600">Exigir 2FA para todos os usuários</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Log de Auditoria</h4>
                      <p className="text-sm text-gray-600">Registrar todas as ações dos usuários</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Sessão Única</h4>
                      <p className="text-sm text-gray-600">Permitir apenas uma sessão por usuário</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="w-5 h-5" />
                    <span>Configurações de Notificações</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Notificações de Sistema</h4>
                      <p className="text-sm text-gray-600">Alertas de performance e erros</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Notificações de Usuário</h4>
                      <p className="text-sm text-gray-600">Novos logins e ações importantes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Relatórios por Email</h4>
                      <p className="text-sm text-gray-600">Envio automático de relatórios</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Restaurar Padrões
            </Button>
            <Button onClick={saveSettings}>
              <Save className="w-4 h-4 mr-2" />
              Salvar Configurações
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
