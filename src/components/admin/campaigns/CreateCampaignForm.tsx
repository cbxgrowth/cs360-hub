
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Textarea } from '../../ui/textarea';
import { X } from 'lucide-react';

interface CreateCampaignFormProps {
  onClose: () => void;
}

export const CreateCampaignForm: React.FC<CreateCampaignFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    rewardType: '',
    rewardValue: '',
    validFrom: '',
    validTo: ''
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Criar Nova Campanha</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome da Campanha</Label>
              <Input 
                placeholder="Ex: Indique e Ganhe - Agosto 2024"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Tipo de Campanha</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="partner">Para Parceiros</SelectItem>
                  <SelectItem value="client">Indicação por Clientes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Descrição</Label>
            <Textarea 
              placeholder="Descreva os benefícios da campanha..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tipo de Recompensa</Label>
              <Select value={formData.rewardType} onValueChange={(value) => setFormData({...formData, rewardType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cashback">Cashback</SelectItem>
                  <SelectItem value="tokens">Tokens IA</SelectItem>
                  <SelectItem value="features">Features Extras</SelectItem>
                  <SelectItem value="integrations">Integrações</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Valor da Recompensa</Label>
              <Input 
                placeholder="Ex: 10000 (tokens) ou 25 (% cashback)"
                value={formData.rewardValue}
                onChange={(e) => setFormData({...formData, rewardValue: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Data de Início</Label>
              <Input 
                type="date"
                value={formData.validFrom}
                onChange={(e) => setFormData({...formData, validFrom: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Data de Término</Label>
              <Input 
                type="date"
                value={formData.validTo}
                onChange={(e) => setFormData({...formData, validTo: e.target.value})}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button>
              Criar Campanha
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
