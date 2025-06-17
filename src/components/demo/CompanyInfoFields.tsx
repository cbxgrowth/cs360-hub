
import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface CompanyInfoFieldsProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

export const CompanyInfoFields = ({ formData, handleInputChange, handleSelectChange }: CompanyInfoFieldsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="company">Nome da Empresa *</Label>
        <Input
          id="company"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          placeholder="Nome da sua empresa"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Número de Funcionários</Label>
          <Select onValueChange={(value) => handleSelectChange('employees', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o porte" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-10">1-10 funcionários</SelectItem>
              <SelectItem value="11-50">11-50 funcionários</SelectItem>
              <SelectItem value="51-200">51-200 funcionários</SelectItem>
              <SelectItem value="201-1000">201-1000 funcionários</SelectItem>
              <SelectItem value="1000+">Mais de 1000 funcionários</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Faturamento Anual</Label>
          <Select onValueChange={(value) => handleSelectChange('revenue', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a faixa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="até-1mi">Até R$ 1 milhão</SelectItem>
              <SelectItem value="1-5mi">R$ 1-5 milhões</SelectItem>
              <SelectItem value="5-20mi">R$ 5-20 milhões</SelectItem>
              <SelectItem value="20-100mi">R$ 20-100 milhões</SelectItem>
              <SelectItem value="100mi+">Mais de R$ 100 milhões</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
