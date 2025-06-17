
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Download, Share2, Copy, ExternalLink, Image, FileText, 
  Video, Megaphone, Mail, MessageSquare, Instagram, 
  Linkedin, Facebook, Twitter, Link, QrCode, Palette
} from 'lucide-react';

export const PartnerMarketing = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const marketingMaterials = [
    {
      id: 1,
      title: "Kit de Apresentação CS360°",
      description: "Apresentação completa com cases de sucesso e funcionalidades",
      type: "presentation",
      category: "presentations",
      size: "15.2 MB",
      downloads: 1247,
      format: "PPTX",
      updated: "2024-01-10"
    },
    {
      id: 2,
      title: "Vídeo Demo - Dashboard 360°",
      description: "Demonstração das principais funcionalidades do dashboard",
      type: "video",
      category: "videos",
      size: "45.8 MB",
      downloads: 892,
      format: "MP4",
      updated: "2024-01-08"
    },
    {
      id: 3,
      title: "E-book: Guia Completo CS",
      description: "Material educativo sobre Customer Success para prospects",
      type: "ebook",
      category: "documents",
      size: "8.4 MB",
      downloads: 2156,
      format: "PDF",
      updated: "2024-01-05"
    },
    {
      id: 4,
      title: "Posts para LinkedIn",
      description: "Pack com 20 posts prontos para suas redes sociais",
      type: "social",
      category: "social",
      size: "12.1 MB",
      downloads: 734,
      format: "ZIP",
      updated: "2024-01-12"
    },
    {
      id: 5,
      title: "Banners para Website",
      description: "Banners em diferentes tamanhos para seu site",
      type: "banner",
      category: "graphics",
      size: "25.6 MB",
      downloads: 456,
      format: "PNG/JPG",
      updated: "2024-01-09"
    },
    {
      id: 6,
      title: "Template de Proposta",
      description: "Modelo de proposta comercial personalizado",
      type: "document",
      category: "documents",
      size: "2.8 MB",
      downloads: 1089,
      format: "DOCX",
      updated: "2024-01-11"
    }
  ];

  const socialMediaTemplates = [
    {
      platform: "LinkedIn",
      icon: Linkedin,
      color: "text-blue-600",
      templates: 15,
      description: "Posts profissionais e cases de sucesso"
    },
    {
      platform: "Instagram",
      icon: Instagram,
      color: "text-pink-600",
      templates: 12,
      description: "Stories e posts visuais"
    },
    {
      platform: "Facebook",
      icon: Facebook,
      color: "text-blue-700",
      templates: 8,
      description: "Posts informativos e educativos"
    },
    {
      platform: "Twitter",
      icon: Twitter,
      color: "text-sky-500",
      templates: 10,
      description: "Tweets curtos e impactantes"
    }
  ];

  const linkTools = [
    {
      name: "Link Personalizado",
      description: "Crie links com sua marca",
      icon: Link,
      action: "customize_link"
    },
    {
      name: "QR Code",
      description: "Gere QR codes para materiais físicos",
      icon: QrCode,
      action: "generate_qr"
    },
    {
      name: "Landing Page",
      description: "Página personalizada para campanhas",
      icon: Palette,
      action: "create_landing"
    }
  ];

  const getTypeIcon = (type: string) => {
    const icons = {
      presentation: FileText,
      video: Video,
      ebook: FileText,
      social: Share2,
      banner: Image,
      document: FileText
    };
    return icons[type as keyof typeof icons] || FileText;
  };

  const filteredMaterials = selectedCategory === 'all' 
    ? marketingMaterials 
    : marketingMaterials.filter(material => material.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header with Quick Stats */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-0">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Central de Marketing</h2>
              <p className="text-gray-600">
                Acesse materiais profissionais para impulsionar suas vendas
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">47</p>
                <p className="text-sm text-gray-600">Materiais</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">1.2K</p>
                <p className="text-sm text-gray-600">Downloads</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">89%</p>
                <p className="text-sm text-gray-600">Taxa Conversão</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <Tabs defaultValue="materials" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="materials" className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Materiais</span>
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center space-x-2">
            <Share2 className="w-4 h-4" />
            <span>Redes Sociais</span>
          </TabsTrigger>
          <TabsTrigger value="links" className="flex items-center space-x-2">
            <Link className="w-4 h-4" />
            <span>Links & QR</span>
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="flex items-center space-x-2">
            <Megaphone className="w-4 h-4" />
            <span>Campanhas</span>
          </TabsTrigger>
        </TabsList>

        {/* Materials Tab */}
        <TabsContent value="materials" className="space-y-6">
          {/* Category Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('all')}
                >
                  Todos
                </Button>
                <Button 
                  variant={selectedCategory === 'presentations' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('presentations')}
                >
                  Apresentações
                </Button>
                <Button 
                  variant={selectedCategory === 'videos' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('videos')}
                >
                  Vídeos
                </Button>
                <Button 
                  variant={selectedCategory === 'documents' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('documents')}
                >
                  Documentos
                </Button>
                <Button 
                  variant={selectedCategory === 'graphics' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('graphics')}
                >
                  Gráficos
                </Button>
                <Button 
                  variant={selectedCategory === 'social' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('social')}
                >
                  Social Media
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Materials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((material) => {
              const IconComponent = getTypeIcon(material.type);
              return (
                <Card key={material.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <IconComponent className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{material.title}</CardTitle>
                          <p className="text-sm text-gray-500 mt-1">{material.description}</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{material.format}</span>
                        <span>{material.size}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <span className="text-gray-500">{material.downloads} downloads</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Atualizado em {new Date(material.updated).toLocaleDateString('pt-BR')}
                        </Badge>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          Baixar
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Social Media Tab */}
        <TabsContent value="social" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialMediaTemplates.map((platform, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="p-4 bg-gray-50 rounded-2xl">
                        <platform.icon className={`w-8 h-8 ${platform.color}`} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{platform.platform}</h3>
                      <p className="text-sm text-gray-600 mt-1">{platform.description}</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{platform.templates}</p>
                      <p className="text-sm text-gray-500">templates disponíveis</p>
                    </div>
                    <Button className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Baixar Pack
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Copy className="w-6 h-6" />
                  <span>Copiar Texto Pronto</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Image className="w-6 h-6" />
                  <span>Gerar Imagem</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Share2 className="w-6 h-6" />
                  <span>Compartilhar Direto</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Links & QR Tab */}
        <TabsContent value="links" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {linkTools.map((tool, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="p-4 bg-blue-50 rounded-2xl">
                        <tool.icon className="w-8 h-8 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{tool.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
                    </div>
                    <Button className="w-full">
                      Criar Agora
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Links */}
          <Card>
            <CardHeader>
              <CardTitle>Links Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { url: 'cs360.com/r/promo-janeiro', clicks: 156, created: '2024-01-10' },
                  { url: 'cs360.com/r/webinar-cs', clicks: 89, created: '2024-01-08' },
                  { url: 'cs360.com/r/demo-especial', clicks: 234, created: '2024-01-05' }
                ].map((link, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{link.url}</p>
                      <p className="text-sm text-gray-500">{link.clicks} cliques • {link.created}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <QrCode className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Megaphone className="w-5 h-5 mr-2 text-purple-600" />
                Campanhas Ativas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Promoção Janeiro 2024",
                    description: "Desconto de 30% no primeiro mês",
                    status: "Ativa",
                    conversions: 12,
                    clicks: 156
                  },
                  {
                    name: "Webinar CS Strategies",
                    description: "Evento educativo sobre Customer Success",
                    status: "Agendada",
                    conversions: 0,
                    clicks: 45
                  }
                ].map((campaign, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{campaign.name}</h4>
                        <p className="text-sm text-gray-600">{campaign.description}</p>
                      </div>
                      <Badge className={campaign.status === 'Ativa' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                        {campaign.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span>{campaign.clicks} cliques</span>
                        <span>{campaign.conversions} conversões</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Editar</Button>
                        <Button size="sm" variant="outline">Relatório</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
