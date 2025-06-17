
import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface PersonalInfoFieldsProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const PersonalInfoFields = ({ formData, handleInputChange }: PersonalInfoFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome Completo *</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Seu nome completo"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="position">Cargo/Posição *</Label>
        <Input
          id="position"
          name="position"
          value={formData.position}
          onChange={handleInputChange}
          placeholder="CEO, Diretor, etc."
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">E-mail Corporativo *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="seu.email@empresa.com"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Telefone/WhatsApp *</Label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="(11) 99999-9999"
          required
        />
      </div>
    </div>
  );
};
