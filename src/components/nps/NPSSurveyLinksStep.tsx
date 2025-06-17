
import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Copy, 
  ExternalLink, 
  QrCode, 
  Share2, 
  Eye,
  RefreshCw,
  Globe,
  Mail,
  MessageSquare
} from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

interface FormData {
  name: string;
  customLink?: string;
  trackingEnabled: boolean;
  customBranding: boolean;
  redirectUrl?: string;
  anonymous: boolean;
}

interface NPSSurveyLinksStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export const NPSSurveyLinksStep = ({ formData, setFormData }: NPSSurveyLinksStepProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const baseUrl = window.location.origin;
  const surveySlug = formData.customLink || formData.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const surveyUrl = `${baseUrl}/survey/${surveySlug}`;
  const embedCode = `<iframe src="${surveyUrl}?embed=true" width="100%" height="400" frameborder="0"></iframe>`;

  const generateRandomSlug = () => {
    setIsGenerating(true);
    const randomSlug = `survey-${Math.random().toString(36).substr(2, 9)}`;
    setFormData(prev => ({ ...prev, customLink: randomSlug }));
    setTimeout(() => setIsGenerating(false), 500);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: `${type} copiado para a área de transferência.`,
    });
  };

  const previewSurvey = () => {
    window.open(surveyUrl, '_blank');
  };

  const generateQRCode = () => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(surveyUrl)}`;
    window.open(qrUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Links & Distribuição</h3>
      
      {/* Link Personalizado */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            Link Personalizado da Pesquisa
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="md:col-span-2">
              <Label className="text-gray-700 dark:text-gray-300">Slug Personalizado</Label>
              <div className="flex space-x-2">
                <div className="flex-1 flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-50 dark:bg-gray-700 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-md">
                    {baseUrl}/survey/
                  </span>
                  <Input
                    value={formData.customLink}
                    onChange={(e) => setFormData(prev => ({ ...prev, customLink: e.target.value }))}
                    placeholder="minha-pesquisa"
                    className="rounded-l-none bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>
            </div>
            <Button 
              type="button" 
              variant="outline" 
              onClick={generateRandomSlug}
              disabled={isGenerating}
              className="bg-white dark:bg-gray-700"
            >
              {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              Gerar Aleatório
            </Button>
          </div>

          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-300">URL da Pesquisa:</p>
                <p className="text-sm text-blue-600 dark:text-blue-400 break-all">{surveyUrl}</p>
              </div>
              <div className="flex space-x-2 ml-4">
                <Button size="sm" variant="outline" onClick={() => copyToClipboard(surveyUrl, 'Link')}>
                  <Copy className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={previewSurvey}>
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configurações de Distribuição */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Share2 className="w-5 h-5 text-purple-600" />
            Opções de Distribuição
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div>
                <Label className="text-sm font-medium">Rastreamento Avançado</Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">Coleta dados de origem e comportamento</p>
              </div>
              <Switch
                checked={formData.trackingEnabled}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, trackingEnabled: checked }))}
              />
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div>
                <Label className="text-sm font-medium">Branding Personalizado</Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">Remove marca CS360° da pesquisa</p>
              </div>
              <Switch
                checked={formData.customBranding}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, customBranding: checked }))}
              />
            </div>
          </div>

          <div>
            <Label className="text-gray-700 dark:text-gray-300">URL de Redirecionamento (opcional)</Label>
            <Input
              value={formData.redirectUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, redirectUrl: e.target.value }))}
              placeholder="https://seusite.com/obrigado"
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Página para onde o cliente será redirecionado após responder
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Métodos de Distribuição */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-base">Métodos de Distribuição</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <h4 className="font-medium text-gray-900 dark:text-white">Email</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Envio automático para segmentos selecionados
              </p>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                Configurado
              </Badge>
            </div>

            <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <QrCode className="w-5 h-5 text-purple-600" />
                <h4 className="font-medium text-gray-900 dark:text-white">QR Code</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Para uso em materiais impressos ou físicos
              </p>
              <Button size="sm" variant="outline" onClick={generateQRCode}>
                <QrCode className="w-4 h-4 mr-2" />
                Gerar QR
              </Button>
            </div>

            <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <ExternalLink className="w-5 h-5 text-orange-600" />
                <h4 className="font-medium text-gray-900 dark:text-white">Embed</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Incorporar diretamente no seu site
              </p>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => copyToClipboard(embedCode, 'Código de incorporação')}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copiar Código
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview do Email */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-green-600" />
            Preview do Email com Link
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-600">
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-gray-500 dark:text-gray-400">ASSUNTO:</Label>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {formData.name} - Sua opinião é importante!
                </p>
              </div>
              <div>
                <Label className="text-xs text-gray-500 dark:text-gray-400">CONTEÚDO:</Label>
                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <p>Olá [NOME_CLIENTE],</p>
                  <p>Gostaríamos de conhecer sua opinião sobre nossa solução.</p>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-700 my-3">
                    <p className="text-center">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        Responder Pesquisa NPS
                      </Button>
                    </p>
                    <p className="text-xs text-center text-gray-500 mt-2">{surveyUrl}</p>
                  </div>
                  <p>Obrigado pelo seu tempo!</p>
                  <p>Equipe CS360°</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
