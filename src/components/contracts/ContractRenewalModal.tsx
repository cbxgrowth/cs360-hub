
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon, RefreshCw } from 'lucide-react';
import { format, addYears } from 'date-fns';
import { cn } from '../../lib/utils';
import { formatCurrency } from './utils/contractUtils';

interface ContractRenewalModalProps {
  isOpen: boolean;
  onClose: () => void;
  contract: any;
  onRenew: (data: any) => void;
}

export const ContractRenewalModal: React.FC<ContractRenewalModalProps> = ({
  isOpen,
  onClose,
  contract,
  onRenew
}) => {
  const [renewalData, setRenewalData] = useState({
    newEndDate: contract ? addYears(new Date(contract.end_date), 1) : new Date(),
    newValue: contract?.value || 0,
    valueAdjustment: 0,
    adjustmentType: 'percentage',
    renewalTerm: '12',
    renewalNotes: '',
    autoRenewal: false
  });

  if (!contract) return null;

  const calculateNewValue = () => {
    const baseValue = parseFloat(contract.value.toString()) || 0;
    const adjustment = parseFloat(renewalData.valueAdjustment.toString()) || 0;
    
    if (renewalData.adjustmentType === 'percentage') {
      return baseValue * (1 + adjustment / 100);
    } else {
      return baseValue + adjustment;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const renewedContract = {
      ...contract,
      end_date: format(renewalData.newEndDate, 'yyyy-MM-dd'),
      value: calculateNewValue(),
      renewal_status: 'renewed',
      updated_at: new Date().toISOString()
    };
    
    onRenew(renewedContract);
    onClose();
  };

  const handleTermChange = (term: string) => {
    const months = parseInt(term);
    const newEndDate = new Date(contract.end_date);
    newEndDate.setMonth(newEndDate.getMonth() + months);
    
    setRenewalData(prev => ({
      ...prev,
      renewalTerm: term,
      newEndDate
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            Renovar Contrato - {contract.contract_number}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Atuais */}
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Contrato Atual</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Cliente:</span>
                <span className="ml-2 text-gray-900 dark:text-white">{contract.clients?.name}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Valor:</span>
                <span className="ml-2 text-gray-900 dark:text-white">{formatCurrency(parseFloat(contract.value.toString()))}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Vence em:</span>
                <span className="ml-2 text-gray-900 dark:text-white">{format(new Date(contract.end_date), 'dd/MM/yyyy')}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Status:</span>
                <span className="ml-2 text-gray-900 dark:text-white">{contract.status}</span>
              </div>
            </div>
          </div>

          {/* Configurações de Renovação */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 dark:text-white">Configurações de Renovação</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="renewalTerm" className="text-gray-700 dark:text-gray-300">Prazo de Renovação</Label>
                <Select value={renewalData.renewalTerm} onValueChange={handleTermChange}>
                  <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                    <SelectItem value="6">6 meses</SelectItem>
                    <SelectItem value="12">12 meses</SelectItem>
                    <SelectItem value="24">24 meses</SelectItem>
                    <SelectItem value="36">36 meses</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-700 dark:text-gray-300">Nova Data de Término</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600",
                        !renewalData.newEndDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {renewalData.newEndDate ? format(renewalData.newEndDate, 'dd/MM/yyyy') : 'Selecionar data'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                    <Calendar
                      mode="single"
                      selected={renewalData.newEndDate}
                      onSelect={(date) => date && setRenewalData(prev => ({ ...prev, newEndDate: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Ajuste de Valor */}
            <div className="space-y-3">
              <Label className="text-gray-700 dark:text-gray-300">Ajuste de Valor</Label>
              <div className="grid grid-cols-3 gap-3">
                <Select 
                  value={renewalData.adjustmentType} 
                  onValueChange={(value) => setRenewalData(prev => ({ ...prev, adjustmentType: value }))}
                >
                  <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                    <SelectItem value="percentage">Percentual (%)</SelectItem>
                    <SelectItem value="fixed">Valor Fixo (R$)</SelectItem>
                  </SelectContent>
                </Select>
                
                <Input
                  type="number"
                  step="0.01"
                  placeholder={renewalData.adjustmentType === 'percentage' ? '0.00' : '0.00'}
                  value={renewalData.valueAdjustment}
                  onChange={(e) => setRenewalData(prev => ({ ...prev, valueAdjustment: parseFloat(e.target.value) || 0 }))}
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                />
                
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Novo valor: {formatCurrency(calculateNewValue())}
                  </span>
                </div>
              </div>
            </div>

            {/* Observações */}
            <div>
              <Label htmlFor="renewalNotes" className="text-gray-700 dark:text-gray-300">Observações da Renovação</Label>
              <Textarea
                id="renewalNotes"
                value={renewalData.renewalNotes}
                onChange={(e) => setRenewalData(prev => ({ ...prev, renewalNotes: e.target.value }))}
                placeholder="Observações sobre a renovação..."
                rows={3}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>

            {/* Renovação Automática */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="autoRenewal"
                checked={renewalData.autoRenewal}
                onChange={(e) => setRenewalData(prev => ({ ...prev, autoRenewal: e.target.checked }))}
                className="rounded"
              />
              <Label htmlFor="autoRenewal" className="text-gray-700 dark:text-gray-300">
                Ativar renovação automática para próximos períodos
              </Label>
            </div>
          </div>

          {/* Resumo da Renovação */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Resumo da Renovação</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-700 dark:text-blue-400">Valor Atual:</span>
                <span className="text-blue-900 dark:text-blue-300">{formatCurrency(parseFloat(contract.value.toString()))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700 dark:text-blue-400">Novo Valor:</span>
                <span className="text-blue-900 dark:text-blue-300 font-medium">{formatCurrency(calculateNewValue())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700 dark:text-blue-400">Nova Data de Término:</span>
                <span className="text-blue-900 dark:text-blue-300">{format(renewalData.newEndDate, 'dd/MM/yyyy')}</span>
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
              <RefreshCw className="w-4 h-4 mr-2" />
              Renovar Contrato
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
