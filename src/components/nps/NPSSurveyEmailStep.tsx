
import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../../lib/utils';
import { emailTemplates } from './NPSSurveyTemplates';

interface FormData {
  emailTemplate: string;
  customSubject: string;
  customContent: string;
  scheduledDate: Date;
  expiryDate: Date | null;
  reminderEnabled: boolean;
  reminderDays: number;
}

interface NPSSurveyEmailStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export const NPSSurveyEmailStep = ({ formData, setFormData }: NPSSurveyEmailStepProps) => {
  const selectedTemplate = emailTemplates.find(t => t.id === formData.emailTemplate);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Email & Agendamento</h3>
      
      <div>
        <Label className="text-gray-700 dark:text-gray-300">Template de Email</Label>
        <Select value={formData.emailTemplate} onValueChange={(value) => setFormData(prev => ({ ...prev, emailTemplate: value }))}>
          <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
            {emailTemplates.map((template) => (
              <SelectItem key={template.id} value={template.id}>
                {template.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="text-gray-700 dark:text-gray-300">Assunto (opcional)</Label>
          <Input
            value={formData.customSubject}
            onChange={(e) => setFormData(prev => ({ ...prev, customSubject: e.target.value }))}
            placeholder={selectedTemplate?.subject}
            className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="reminderEnabled"
              checked={formData.reminderEnabled}
              onChange={(e) => setFormData(prev => ({ ...prev, reminderEnabled: e.target.checked }))}
              className="rounded"
            />
            <Label htmlFor="reminderEnabled" className="text-gray-700 dark:text-gray-300">Lembrete automático</Label>
          </div>
          {formData.reminderEnabled && (
            <Input
              type="number"
              value={formData.reminderDays}
              onChange={(e) => setFormData(prev => ({ ...prev, reminderDays: parseInt(e.target.value) }))}
              className="w-20 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              min="1"
              max="30"
            />
          )}
        </div>
      </div>

      <div>
        <Label className="text-gray-700 dark:text-gray-300">Personalizar Conteúdo (opcional)</Label>
        <Textarea
          value={formData.customContent}
          onChange={(e) => setFormData(prev => ({ ...prev, customContent: e.target.value }))}
          placeholder={selectedTemplate?.content}
          rows={6}
          className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="text-gray-700 dark:text-gray-300">Data de Envio</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600",
                  !formData.scheduledDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.scheduledDate ? format(formData.scheduledDate, 'dd/MM/yyyy') : 'Selecionar data'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
              <Calendar
                mode="single"
                selected={formData.scheduledDate}
                onSelect={(date) => setFormData(prev => ({ ...prev, scheduledDate: date || new Date() }))}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label className="text-gray-700 dark:text-gray-300">Data de Expiração</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600",
                  !formData.expiryDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.expiryDate ? format(formData.expiryDate, 'dd/MM/yyyy') : 'Sem expiração'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
              <Calendar
                mode="single"
                selected={formData.expiryDate}
                onSelect={(date) => setFormData(prev => ({ ...prev, expiryDate: date }))}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};
