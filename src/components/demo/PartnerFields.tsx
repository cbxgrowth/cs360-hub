
import React from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Building2, Users2, UserCheck, Copy } from 'lucide-react';
import { Button } from '../ui/button';

interface PartnerFieldsProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleCheckboxChange: (name: string, checked: boolean) => void;
  referralLink: string;
}

export const PartnerFields = ({ 
  formData, 
  handleInputChange, 
  handleSelectChange, 
  handleCheckboxChange,
  referralLink 
}: PartnerFieldsProps) => {
  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
  };

  return (
    <div className="space-y-6">
      {/* Tipo de Parceria */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Tipo de Parceria</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div 
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              formData.partnerType === 'agency' 
                ? 'border-purple-500 bg-purple-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleSelectChange('partnerType', 'agency')}
          >
            <div className="flex items-center space-x-3">
              <Building2 className="w-5 h-5 text-purple-600" />
              <div>
                <div className="font-semibold">Agência</div>
                <div className="text-sm text-gray-600">Agência digital/marketing</div>
              </div>
            </div>
          </div>
          
          <div 
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              formData.partnerType === 'consulting' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleSelectChange('partnerType', 'consulting')}
          >
            <div className="flex items-center space-x-3">
              <Users2 className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-semibold">Consultoria</div>
                <div className="text-sm text-gray-600">Consultoria empresarial</div>
              </div>
            </div>
          </div>
          
          <div 
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              formData.partnerType === 'referral' 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleSelectChange('partnerType', 'referral')}
          >
            <div className="flex items-center space-x-3">
              <UserCheck className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-semibold">Indicação</div>
                <div className="text-sm text-gray-600">Apenas indicar clientes</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Campos para Agência e Consultoria */}
      {(formData.partnerType === 'agency' || formData.partnerType === 'consulting') && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Quantidade de Clientes Ativos *</Label>
            <Select onValueChange={(value) => handleSelectChange('activeClients', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a quantidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-5">1-5 clientes</SelectItem>
                <SelectItem value="6-15">6-15 clientes</SelectItem>
                <SelectItem value="16-30">16-30 clientes</SelectItem>
                <SelectItem value="31-50">31-50 clientes</SelectItem>
                <SelectItem value="50+">Mais de 50 clientes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="hasProspects"
                checked={formData.hasProspects}
                onCheckedChange={(checked) => handleCheckboxChange('hasProspects', !!checked)}
              />
              <Label htmlFor="hasProspects">
                Possui empresas interessadas na solução de Customer Success
              </Label>
            </div>
            
            {formData.hasProspects && (
              <div className="space-y-2">
                <Label htmlFor="prospectsDescription">Descreva os prospects</Label>
                <Textarea
                  id="prospectsDescription"
                  name="prospectsDescription"
                  value={formData.prospectsDescription}
                  onChange={handleInputChange}
                  placeholder="Conte-nos sobre as empresas interessadas (segmento, porte, necessidades específicas)..."
                  rows={3}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Campos para Indicação */}
      {formData.partnerType === 'referral' && (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">Dados do Cliente Indicado</h4>
            <p className="text-sm text-green-700 mb-4">
              Preencha os dados da empresa que você gostaria de indicar. Geraremos um link personalizado para você.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="referralClientName">Nome do Contato *</Label>
                <Input
                  id="referralClientName"
                  name="referralClientName"
                  value={formData.referralClientName}
                  onChange={handleInputChange}
                  placeholder="Nome completo do contato"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="referralClientEmail">E-mail do Contato *</Label>
                <Input
                  id="referralClientEmail"
                  name="referralClientEmail"
                  type="email"
                  value={formData.referralClientEmail}
                  onChange={handleInputChange}
                  placeholder="email@empresa.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="referralClientCompany">Nome da Empresa *</Label>
                <Input
                  id="referralClientCompany"
                  name="referralClientCompany"
                  value={formData.referralClientCompany}
                  onChange={handleInputChange}
                  placeholder="Nome da empresa indicada"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="referralClientPhone">Telefone do Contato</Label>
                <Input
                  id="referralClientPhone"
                  name="referralClientPhone"
                  value={formData.referralClientPhone}
                  onChange={handleInputChange}
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>
          </div>

          {/* Link de Indicação Gerado */}
          {referralLink && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Link de Indicação Gerado</h4>
              <p className="text-sm text-blue-700 mb-3">
                Compartilhe este link com o cliente indicado:
              </p>
              <div className="flex items-center space-x-2">
                <Input 
                  value={referralLink} 
                  readOnly 
                  className="bg-white border-blue-300"
                />
                <Button 
                  type="button"
                  variant="outline" 
                  size="sm"
                  onClick={copyReferralLink}
                  className="border-blue-300 text-blue-600 hover:bg-blue-100"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
