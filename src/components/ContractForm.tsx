
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../lib/utils';

interface ContractFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  contract?: any;
  registeredClients: Array<{ id: number; name: string; tier: string; }>;
  registeredServices: Array<{ id: number; name: string; category: string; }>;
  suggestedContractNumber: string;
}

export const ContractForm = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  contract, 
  registeredClients,
  registeredServices,
  suggestedContractNumber 
}: ContractFormProps) => {
  const [formData, setFormData] = useState({
    clientId: contract?.clientId || '',
    contractNumber: contract?.contractNumber || suggestedContractNumber,
    startDate: contract?.startDate ? new Date(contract.startDate) : new Date(),
    endDate: contract?.endDate ? new Date(contract.endDate) : null,
    contractValue: contract?.contractValue || '',
    billingCycle: contract?.billingCycle || 'anual',
    services: contract?.services || [],
    observations: contract?.observations || '',
    paymentTerms: contract?.paymentTerms || '30',
    autoRenewal: contract?.autoRenewal || false,
    discountPercentage: contract?.discountPercentage || '0',
    setupFee: contract?.setupFee || '0'
  });

  const [selectedServices, setSelectedServices] = useState<string[]>(contract?.services || []);

  useEffect(() => {
    if (!contract && suggestedContractNumber) {
      setFormData(prev => ({ ...prev, contractNumber: suggestedContractNumber }));
    }
  }, [suggestedContractNumber, contract]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedClient = registeredClients.find(c => c.id.toString() === formData.clientId);
    const submitData = {
      ...formData,
      clientName: selectedClient?.name || '',
      services: selectedServices,
      startDate: formData.startDate ? format(formData.startDate, 'yyyy-MM-dd') : '',
      endDate: formData.endDate ? format(formData.endDate, 'yyyy-MM-dd') : ''
    };
    onSubmit(submitData);
    onClose();
  };

  const handleServiceToggle = (serviceId: string) => {
    const service = registeredServices.find(s => s.id.toString() === serviceId);
    if (!service) return;

    setSelectedServices(prev => {
      if (prev.includes(service.name)) {
        return prev.filter(s => s !== service.name);
      } else {
        return [...prev, service.name];
      }
    });
  };

  const removeService = (serviceName: string) => {
    setSelectedServices(prev => prev.filter(s => s !== serviceName));
  };

  const calculateEndDate = (startDate: Date, billingCycle: string) => {
    const start = new Date(startDate);
    switch (billingCycle) {
      case 'mensal':
        start.setMonth(start.getMonth() + 1);
        break;
      case 'trimestral':
        start.setMonth(start.getMonth() + 3);
        break;
      case 'semestral':
        start.setMonth(start.getMonth() + 6);
        break;
      case 'anual':
        start.setFullYear(start.getFullYear() + 1);
        break;
      default:
        start.setFullYear(start.getFullYear() + 1);
    }
    return start;
  };

  const handleStartDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData(prev => ({
        ...prev,
        startDate: date,
        endDate: calculateEndDate(date, prev.billingCycle)
      }));
    }
  };

  const handleBillingCycleChange = (cycle: string) => {
    setFormData(prev => ({
      ...prev,
      billingCycle: cycle,
      endDate: prev.startDate ? calculateEndDate(prev.startDate, cycle) : null
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            {contract ? 'Editar Contrato' : 'Novo Contrato'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informações Básicas */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Informações do Contrato</h3>
              
              <div>
                <Label htmlFor="contractNumber" className="text-gray-700 dark:text-gray-300">Número do Contrato *</Label>
                <Input
                  id="contractNumber"
                  value={formData.contractNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, contractNumber: e.target.value }))}
                  placeholder="CT-2024-001"
                  required
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                />
              </div>

              <div>
                <Label htmlFor="client" className="text-gray-700 dark:text-gray-300">Cliente *</Label>
                <Select value={formData.clientId} onValueChange={(value) => setFormData(prev => ({ ...prev, clientId: value }))}>
                  <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                    <SelectValue placeholder="Selecione o cliente" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                    {registeredClients.map((client) => (
                      <SelectItem key={client.id} value={client.id.toString()}>
                        <div className="flex items-center justify-between w-full">
                          <span>{client.name}</span>
                          <Badge variant="outline" className="ml-2">Tier {client.tier}</Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-700 dark:text-gray-300">Data de Início *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600",
                          !formData.startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.startDate ? format(formData.startDate, 'dd/MM/yyyy') : 'Selecionar data'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                      <Calendar
                        mode="single"
                        selected={formData.startDate}
                        onSelect={handleStartDateChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label className="text-gray-700 dark:text-gray-300">Data de Término</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600",
                          !formData.endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.endDate ? format(formData.endDate, 'dd/MM/yyyy') : 'Selecionar data'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                      <Calendar
                        mode="single"
                        selected={formData.endDate}
                        onSelect={(date) => setFormData(prev => ({ ...prev, endDate: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div>
                <Label htmlFor="billingCycle" className="text-gray-700 dark:text-gray-300">Ciclo de Cobrança</Label>
                <Select value={formData.billingCycle} onValueChange={handleBillingCycleChange}>
                  <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                    <SelectItem value="mensal">Mensal</SelectItem>
                    <SelectItem value="trimestral">Trimestral</SelectItem>
                    <SelectItem value="semestral">Semestral</SelectItem>
                    <SelectItem value="anual">Anual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Valores e Termos */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Valores e Termos</h3>
              
              <div>
                <Label htmlFor="contractValue" className="text-gray-700 dark:text-gray-300">Valor do Contrato (R$) *</Label>
                <Input
                  id="contractValue"
                  type="number"
                  step="0.01"
                  value={formData.contractValue}
                  onChange={(e) => setFormData(prev => ({ ...prev, contractValue: e.target.value }))}
                  placeholder="0.00"
                  required
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="discountPercentage" className="text-gray-700 dark:text-gray-300">Desconto (%)</Label>
                  <Input
                    id="discountPercentage"
                    type="number"
                    step="0.01"
                    max="100"
                    value={formData.discountPercentage}
                    onChange={(e) => setFormData(prev => ({ ...prev, discountPercentage: e.target.value }))}
                    placeholder="0.00"
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  />
                </div>

                <div>
                  <Label htmlFor="setupFee" className="text-gray-700 dark:text-gray-300">Taxa de Setup (R$)</Label>
                  <Input
                    id="setupFee"
                    type="number"
                    step="0.01"
                    value={formData.setupFee}
                    onChange={(e) => setFormData(prev => ({ ...prev, setupFee: e.target.value }))}
                    placeholder="0.00"
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="paymentTerms" className="text-gray-700 dark:text-gray-300">Prazo de Pagamento (dias)</Label>
                <Select value={formData.paymentTerms} onValueChange={(value) => setFormData(prev => ({ ...prev, paymentTerms: value }))}>
                  <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                    <SelectItem value="0">À vista</SelectItem>
                    <SelectItem value="15">15 dias</SelectItem>
                    <SelectItem value="30">30 dias</SelectItem>
                    <SelectItem value="45">45 dias</SelectItem>
                    <SelectItem value="60">60 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="autoRenewal"
                  checked={formData.autoRenewal}
                  onChange={(e) => setFormData(prev => ({ ...prev, autoRenewal: e.target.checked }))}
                  className="rounded"
                />
                <Label htmlFor="autoRenewal" className="text-gray-700 dark:text-gray-300">Renovação Automática</Label>
              </div>
            </div>
          </div>

          {/* Serviços */}
          <div>
            <Label className="text-gray-700 dark:text-gray-300">Serviços Contratados *</Label>
            <div className="mt-2 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
                {registeredServices.map((service) => (
                  <div
                    key={service.id}
                    className={cn(
                      "p-3 border rounded-lg cursor-pointer transition-colors",
                      selectedServices.includes(service.name)
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                        : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-blue-300"
                    )}
                    onClick={() => handleServiceToggle(service.id.toString())}
                  >
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service.name)}
                        onChange={() => {}}
                        className="rounded"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{service.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{service.category}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedServices.length > 0 && (
                <div>
                  <Label className="text-sm text-gray-600 dark:text-gray-400">Serviços Selecionados:</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedServices.map((service) => (
                      <Badge key={service} variant="secondary" className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                        {service}
                        <X
                          className="w-3 h-3 cursor-pointer hover:text-red-600"
                          onClick={() => removeService(service)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Observações */}
          <div>
            <Label htmlFor="observations" className="text-gray-700 dark:text-gray-300">Observações</Label>
            <Textarea
              id="observations"
              value={formData.observations}
              onChange={(e) => setFormData(prev => ({ ...prev, observations: e.target.value }))}
              placeholder="Observações adicionais sobre o contrato"
              rows={3}
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button type="button" variant="outline" onClick={onClose} className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600">
              Cancelar
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              {contract ? 'Atualizar Contrato' : 'Criar Contrato'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
