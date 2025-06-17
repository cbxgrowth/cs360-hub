
import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar } from 'lucide-react';

interface SchedulingFieldsProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

export const SchedulingFields = ({ formData, handleInputChange, handleSelectChange }: SchedulingFieldsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-2">
        <Calendar className="w-4 h-4 text-blue-600" />
        <Label className="text-base font-semibold">Preferência de Agendamento</Label>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="preferredDate">Data Preferida *</Label>
          <Input
            id="preferredDate"
            name="preferredDate"
            type="date"
            value={formData.preferredDate}
            onChange={handleInputChange}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label>Horário Preferido *</Label>
          <Select onValueChange={(value) => handleSelectChange('preferredTime', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o horário" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="09:00">09:00 - 10:00</SelectItem>
              <SelectItem value="10:00">10:00 - 11:00</SelectItem>
              <SelectItem value="11:00">11:00 - 12:00</SelectItem>
              <SelectItem value="14:00">14:00 - 15:00</SelectItem>
              <SelectItem value="15:00">15:00 - 16:00</SelectItem>
              <SelectItem value="16:00">16:00 - 17:00</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
