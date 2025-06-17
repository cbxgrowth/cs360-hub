
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  MapPin,
  DollarSign,
  Calendar,
  Star,
  Target,
  Briefcase,
  Users,
  Plus,
  X
} from 'lucide-react';

interface ClientFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  client?: any;
}

export const ClientForm = ({ isOpen, onClose, onSubmit, client }: ClientFormProps) => {
  const [formData, setFormData] = useState({
    // Informações Básicas
    name: client?.name || '',
    tradingName: client?.tradingName || '',
    cnpj: client?.cnpj || '',
    segment: client?.segment || '',
    size: client?.size || '',
    foundedYear: client?.foundedYear || '',
    
    // Contato Principal
    contactName: client?.contactName || '',
    contactPosition: client?.contactPosition || '',
    contactEmail: client?.contactEmail || '',
    contactPhone: client?.contactPhone || '',
    
    // Endereço
    address: client?.address || '',
    city: client?.city || '',
    state: client?.state || '',
    zipCode: client?.zipCode || '',
    country: client?.country || 'Brasil',
    
    // Informações Comerciais
    tier: client?.tier || 'B',
    profile: client?.profile || 'Moderado',
    status: client?.status || 'Ativo',
    
    // Métricas Iniciais
    estimatedLTV: client?.estimatedLTV || '',
    estimatedCAC: client?.estimatedCAC || '',
    initialNPS: client?.initialNPS || '',
    
    // Informações Adicionais
    website: client?.website || '',
    linkedin: client?.linkedin || '',
    notes: client?.notes || '',
    tags: client?.tags || [],
    
    // Equipe do Cliente
    teamSize: client?.teamSize || '',
    decisionMakers: client?.decisionMakers || [],
    
    // Histórico
    leadSource: client?.leadSource || '',
    acquisitionDate: client?.acquisitionDate || '',
    firstContractDate: client?.firstContractDate || ''
  });

  const [newTag, setNewTag] = useState('');
  const [newDecisionMaker, setNewDecisionMaker] = useState({ name: '', position: '', email: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addDecisionMaker = () => {
    if (newDecisionMaker.name.trim()) {
      setFormData(prev => ({
        ...prev,
        decisionMakers: [...prev.decisionMakers, { ...newDecisionMaker, id: Date.now() }]
      }));
      setNewDecisionMaker({ name: '', position: '', email: '' });
    }
  };

  const removeDecisionMaker = (id: number) => {
    setFormData(prev => ({
      ...prev,
      decisionMakers: prev.decisionMakers.filter(dm => dm.id !== id)
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            {client ? 'Editar Cliente' : 'Novo Cliente'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Básicas da Empresa */}
          <Card className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-white">
                <Building2 className="w-5 h-5" />
                Informações da Empresa
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Razão Social *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="tradingName" className="text-gray-700 dark:text-gray-300">Nome Fantasia</Label>
                <Input
                  id="tradingName"
                  value={formData.tradingName}
                  onChange={(e) => setFormData(prev => ({ ...prev, tradingName: e.target.value }))}
                  className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <Label htmlFor="cnpj" className="text-gray-700 dark:text-gray-300">CNPJ</Label>
                <Input
                  id="cnpj"
                  value={formData.cnpj}
                  onChange={(e) => setFormData(prev => ({ ...prev, cnpj: e.target.value }))}
                  className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <Label htmlFor="segment" className="text-gray-700 dark:text-gray-300">Segmento</Label>
                <select
                  id="segment"
                  value={formData.segment}
                  onChange={(e) => setFormData(prev => ({ ...prev, segment: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                >
                  <option value="">Selecione o segmento</option>
                  <option value="Tecnologia">Tecnologia</option>
                  <option value="Saúde">Saúde</option>
                  <option value="Educação">Educação</option>
                  <option value="Varejo">Varejo</option>
                  <option value="Serviços">Serviços</option>
                  <option value="Manufatura">Manufatura</option>
                  <option value="Financeiro">Financeiro</option>
                </select>
              </div>
              <div>
                <Label htmlFor="size" className="text-gray-700 dark:text-gray-300">Porte da Empresa</Label>
                <select
                  id="size"
                  value={formData.size}
                  onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                >
                  <option value="">Selecione o porte</option>
                  <option value="Micro">Micro (até 9 funcionários)</option>
                  <option value="Pequeno">Pequeno (10-49 funcionários)</option>
                  <option value="Médio">Médio (50-499 funcionários)</option>
                  <option value="Grande">Grande (500+ funcionários)</option>
                </select>
              </div>
              <div>
                <Label htmlFor="foundedYear" className="text-gray-700 dark:text-gray-300">Ano de Fundação</Label>
                <Input
                  id="foundedYear"
                  type="number"
                  value={formData.foundedYear}
                  onChange={(e) => setFormData(prev => ({ ...prev, foundedYear: e.target.value }))}
                  className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contato Principal */}
          <Card className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-white">
                <User className="w-5 h-5" />
                Contato Principal
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactName" className="text-gray-700 dark:text-gray-300">Nome Completo *</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                  className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="contactPosition" className="text-gray-700 dark:text-gray-300">Cargo</Label>
                <Input
                  id="contactPosition"
                  value={formData.contactPosition}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactPosition: e.target.value }))}
                  className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <Label htmlFor="contactEmail" className="text-gray-700 dark:text-gray-300">Email *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                  className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="contactPhone" className="text-gray-700 dark:text-gray-300">Telefone</Label>
                <Input
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                  className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Classificação e Status */}
          <Card className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-white">
                <Star className="w-5 h-5" />
                Classificação e Status
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="tier" className="text-gray-700 dark:text-gray-300">Nível do Cliente</Label>
                <select
                  id="tier"
                  value={formData.tier}
                  onChange={(e) => setFormData(prev => ({ ...prev, tier: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                >
                  <option value="A">Nível A - Estratégico</option>
                  <option value="B">Nível B - Importante</option>
                  <option value="C">Nível C - Regular</option>
                </select>
              </div>
              <div>
                <Label htmlFor="profile" className="text-gray-700 dark:text-gray-300">Perfil de Risco</Label>
                <select
                  id="profile"
                  value={formData.profile}
                  onChange={(e) => setFormData(prev => ({ ...prev, profile: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                >
                  <option value="Arrojado">Arrojado</option>
                  <option value="Moderado">Moderado</option>
                  <option value="Conservador">Conservador</option>
                </select>
              </div>
              <div>
                <Label htmlFor="status" className="text-gray-700 dark:text-gray-300">Status</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Prospect">Prospect</option>
                  <option value="Risco">Risco</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-white">
                <Target className="w-5 h-5" />
                Tags e Classificações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Adicionar tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
                  />
                  <Button type="button" onClick={addTag} variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações Adicionais */}
          <Card className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-white">
                <Briefcase className="w-5 h-5" />
                Informações Comerciais
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="estimatedLTV" className="text-gray-700 dark:text-gray-300">LTV Estimado (R$)</Label>
                <Input
                  id="estimatedLTV"
                  type="number"
                  value={formData.estimatedLTV}
                  onChange={(e) => setFormData(prev => ({ ...prev, estimatedLTV: e.target.value }))}
                  className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <Label htmlFor="estimatedCAC" className="text-gray-700 dark:text-gray-300">CAC Estimado (R$)</Label>
                <Input
                  id="estimatedCAC"
                  type="number"
                  value={formData.estimatedCAC}
                  onChange={(e) => setFormData(prev => ({ ...prev, estimatedCAC: e.target.value }))}
                  className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <Label htmlFor="initialNPS" className="text-gray-700 dark:text-gray-300">NPS Inicial</Label>
                <Input
                  id="initialNPS"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.initialNPS}
                  onChange={(e) => setFormData(prev => ({ ...prev, initialNPS: e.target.value }))}
                  className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Observações */}
          <div>
            <Label htmlFor="notes" className="text-gray-700 dark:text-gray-300">Observações</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
              className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
              placeholder="Informações adicionais sobre o cliente..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-600">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              {client ? 'Atualizar Cliente' : 'Cadastrar Cliente'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
