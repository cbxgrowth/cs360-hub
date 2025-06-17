
import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface FormData {
  name: string;
  description: string;
  anonymous: boolean;
}

interface NPSSurveyConfigStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export const NPSSurveyConfigStep = ({ formData, setFormData }: NPSSurveyConfigStepProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Configuração da Pesquisa</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Nome da Pesquisa *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Ex: Pesquisa Trimestral Q3"
            required
            className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="anonymous"
              checked={formData.anonymous}
              onChange={(e) => setFormData(prev => ({ ...prev, anonymous: e.target.checked }))}
              className="rounded"
            />
            <Label htmlFor="anonymous" className="text-gray-700 dark:text-gray-300">Pesquisa Anônima</Label>
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="description" className="text-gray-700 dark:text-gray-300">Descrição</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Objetivo da pesquisa e observações"
          rows={3}
          className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        />
      </div>
    </div>
  );
};
