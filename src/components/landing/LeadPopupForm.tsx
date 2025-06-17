
import React from 'react';
import { Button } from '../ui/button';
import { Download, User, Building, Mail, Phone, Clock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface LeadFormData {
  name: string;
  email: string;
  company: string;
  position: string;
  whatsapp: string;
  preferredTime: string;
}

interface LeadPopupFormProps {
  formData: LeadFormData;
  isSubmitting: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isFormValid: boolean;
}

export const LeadPopupForm: React.FC<LeadPopupFormProps> = ({
  formData,
  isSubmitting,
  onInputChange,
  onSelectChange,
  onSubmit,
  isFormValid
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-blue-300" />
          <input
            type="text"
            name="name"
            placeholder="Seu nome"
            value={formData.name}
            onChange={onInputChange}
            className="w-full pl-10 pr-4 py-3 bg-white/15 backdrop-blur-md border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            required
          />
        </div>
        
        <div className="relative">
          <Building className="absolute left-3 top-3 h-4 w-4 text-blue-300" />
          <input
            type="text"
            name="position"
            placeholder="Cargo"
            value={formData.position}
            onChange={onInputChange}
            className="w-full pl-10 pr-4 py-3 bg-white/15 backdrop-blur-md border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>
      </div>

      <div className="relative">
        <Mail className="absolute left-3 top-3 h-4 w-4 text-blue-300" />
        <input
          type="email"
          name="email"
          placeholder="Email corporativo"
          value={formData.email}
          onChange={onInputChange}
          className="w-full pl-10 pr-4 py-3 bg-white/15 backdrop-blur-md border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          required
        />
      </div>

      <div className="relative">
        <Building className="absolute left-3 top-3 h-4 w-4 text-blue-300" />
        <input
          type="text"
          name="company"
          placeholder="Empresa"
          value={formData.company}
          onChange={onInputChange}
          className="w-full pl-10 pr-4 py-3 bg-white/15 backdrop-blur-md border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          required
        />
      </div>

      <div className="relative">
        <Phone className="absolute left-3 top-3 h-4 w-4 text-blue-300" />
        <input
          type="tel"
          name="whatsapp"
          placeholder="WhatsApp"
          value={formData.whatsapp}
          onChange={onInputChange}
          className="w-full pl-10 pr-4 py-3 bg-white/15 backdrop-blur-md border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          required
        />
      </div>

      <div className="relative">
        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-300 z-10" />
        <Select onValueChange={onSelectChange}>
          <SelectTrigger className="w-full pl-10 pr-4 py-3 bg-white/15 backdrop-blur-md border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent">
            <SelectValue placeholder="Preferência de horário" className="text-blue-200" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="manha" className="text-white hover:bg-slate-700">Manhã (8h às 12h)</SelectItem>
            <SelectItem value="tarde" className="text-white hover:bg-slate-700">Tarde (12h às 18h)</SelectItem>
            <SelectItem value="noite" className="text-white hover:bg-slate-700">Noite (18h às 20h)</SelectItem>
            <SelectItem value="qualquer" className="text-white hover:bg-slate-700">Qualquer horário</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        disabled={!isFormValid || isSubmitting}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-4 shadow-xl font-black transform hover:scale-105 transition-all duration-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 mr-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Enviando...
          </>
        ) : (
          <>
            <Download className="w-5 h-5 mr-3" />
            Baixar PlayBook Executivo
          </>
        )}
      </Button>
    </form>
  );
};
