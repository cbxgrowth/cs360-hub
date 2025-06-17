
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { User, Building, Mail, Phone, TrendingUp, DollarSign, Target } from 'lucide-react';
import type { DisplayClient } from '../clients-management/adapters/clientsAdapter';

interface ClientFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  client?: DisplayClient | null;
}

export const ClientForm: React.FC<ClientFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  client
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    tier: 'B',
    status: 'Ativo',
    mrr: '',
    ltv: '',
    cac: '',
    riskScore: '',
    npsScore: '',
    npsCategory: 'Passivo',
    acquisitionChannel: '',
    responsibleCS: '',
    industry: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name || '',
        email: client.email || '',
        company: client.contact || '',
        phone: client.phone || '',
        tier: client.tier || 'B',
        status: client.status || 'Ativo',
        mrr: client.ltv?.toString() || '',
        ltv: client.ltvProjected?.toString() || '',
        cac: client.cac?.toString() || '',
        riskScore: client.riskScore?.toString() || '',
        npsScore: client.npsScore?.toString() || '',
        npsCategory: client.npsCategory || 'Passivo',
        acquisitionChannel: '',
        responsibleCS: '',
        industry: '',
        notes: ''
      });
    } else {
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        tier: 'B',
        status: 'Ativo',
        mrr: '',
        ltv: '',
        cac: '',
        riskScore: '',
        npsScore: '',
        npsCategory: 'Passivo',
        acquisitionChannel: '',
        responsibleCS: '',
        industry: '',
        notes: ''
      });
    }
  }, [client, isOpen]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        tier: formData.tier,
        status: formData.status,
        mrr: formData.mrr ? parseFloat(formData.mrr) : 0,
        ltv: formData.ltv ? parseFloat(formData.ltv) : 0,
        cac: formData.cac ? parseFloat(formData.cac) : 0,
        risk_score: formData.riskScore ? parseFloat(formData.riskScore) : 0,
        nps_score: formData.npsScore ? parseFloat(formData.npsScore) : null,
        acquisition_channel: formData.acquisitionChannel,
        industry: formData.industry,
        notes: formData.notes
      };

      await onSubmit(submitData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <User className="w-6 h-6" />
            {client ? 'Editar Cliente' : 'Novo Cliente'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Informações Básicas
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome Completo *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Nome do cliente"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="email@exemplo.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="company">Empresa</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Nome da empresa"
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="(11) 99999-9999"
                />
              </div>
            </CardContent>
          </Card>

          {/* Classificação */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Classificação
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="tier">Nível (Tier) *</Label>
                <Select value={formData.tier} onValueChange={(value) => handleInputChange('tier', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Nível A</SelectItem>
                    <SelectItem value="B">Nível B</SelectItem>
                    <SelectItem value="C">Nível C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status *</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Risco">Risco</SelectItem>
                    <SelectItem value="Inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="npsCategory">Categoria NPS</Label>
                <Select value={formData.npsCategory} onValueChange={(value) => handleInputChange('npsCategory', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Promotor">Promotor</SelectItem>
                    <SelectItem value="Passivo">Passivo</SelectItem>
                    <SelectItem value="Detrator">Detrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Métricas Financeiras */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Métricas Financeiras
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="mrr">MRR (R$)</Label>
                <Input
                  id="mrr"
                  type="number"
                  value={formData.mrr}
                  onChange={(e) => handleInputChange('mrr', e.target.value)}
                  placeholder="15000"
                />
              </div>
              <div>
                <Label htmlFor="ltv">LTV (R$)</Label>
                <Input
                  id="ltv"
                  type="number"
                  value={formData.ltv}
                  onChange={(e) => handleInputChange('ltv', e.target.value)}
                  placeholder="180000"
                />
              </div>
              <div>
                <Label htmlFor="cac">CAC (R$)</Label>
                <Input
                  id="cac"
                  type="number"
                  value={formData.cac}
                  onChange={(e) => handleInputChange('cac', e.target.value)}
                  placeholder="5000"
                />
              </div>
            </CardContent>
          </Card>

          {/* Scores e Métricas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Scores e Avaliações
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="riskScore">Score de Risco (0-100)</Label>
                <Input
                  id="riskScore"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.riskScore}
                  onChange={(e) => handleInputChange('riskScore', e.target.value)}
                  placeholder="25"
                />
              </div>
              <div>
                <Label htmlFor="npsScore">NPS Score (0-10)</Label>
                <Input
                  id="npsScore"
                  type="number"
                  min="0"
                  max="10"
                  value={formData.npsScore}
                  onChange={(e) => handleInputChange('npsScore', e.target.value)}
                  placeholder="9"
                />
              </div>
            </CardContent>
          </Card>

          {/* Informações Adicionais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Informações Adicionais
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="acquisitionChannel">Canal de Aquisição</Label>
                <Input
                  id="acquisitionChannel"
                  value={formData.acquisitionChannel}
                  onChange={(e) => handleInputChange('acquisitionChannel', e.target.value)}
                  placeholder="website, indicação, evento..."
                />
              </div>
              <div>
                <Label htmlFor="industry">Setor</Label>
                <Input
                  id="industry"
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  placeholder="tecnologia, financeiro..."
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Informações adicionais sobre o cliente..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
            >
              {isSubmitting ? 'Salvando...' : client ? 'Atualizar Cliente' : 'Criar Cliente'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
