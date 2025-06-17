
import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Card, CardContent } from '../../ui/card';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Building2, Upload, Clock, Globe } from 'lucide-react';

interface CompanySetupStepProps {
  onComplete: () => void;
}

export const CompanySetupStep: React.FC<CompanySetupStepProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    timezone: '',
    logo: null as File | null
  });

  const industries = [
    'SaaS/Software',
    'E-commerce',
    'Serviços Financeiros',
    'Educação',
    'Saúde',
    'Consultoria',
    'Marketing/Agência',
    'Outro'
  ];

  const timezones = [
    'America/Sao_Paulo',
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo'
  ];

  const isFormValid = formData.companyName && formData.industry && formData.timezone;

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, logo: file }));
    }
  };

  const handleSubmit = () => {
    if (isFormValid) {
      // Save company data
      localStorage.setItem('cs360-company-setup', JSON.stringify(formData));
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Building2 className="w-12 h-12 mx-auto text-blue-600 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Configure seu Workspace
        </h2>
        <p className="text-gray-600">
          Vamos personalizar a plataforma para sua empresa
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div>
            <Label htmlFor="companyName">Nome da Empresa *</Label>
            <Input
              id="companyName"
              placeholder="Ex: Minha Empresa Ltda"
              value={formData.companyName}
              onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="industry">Setor de Atuação *</Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione seu setor" />
              </SelectTrigger>
              <SelectContent>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="timezone">Fuso Horário *</Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, timezone: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione seu fuso horário" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/Sao_Paulo">
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    São Paulo (UTC-3)
                  </div>
                </SelectItem>
                <SelectItem value="America/New_York">
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    Nova York (UTC-5)
                  </div>
                </SelectItem>
                <SelectItem value="Europe/London">
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    Londres (UTC+0)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="logo">Logo da Empresa (Opcional)</Label>
            <div className="mt-2">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    {formData.logo ? formData.logo.name : 'Clique para fazer upload do logo'}
                  </p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleLogoUpload}
                />
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span>Tempo estimado: 2 minutos</span>
        </div>
        
        <Button 
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="bg-gradient-to-r from-green-600 to-emerald-600"
        >
          Salvar e Continuar
        </Button>
      </div>
    </div>
  );
};
