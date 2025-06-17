
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { 
  Upload, 
  Download, 
  FileSpreadsheet, 
  CheckCircle, 
  AlertTriangle,
  Info,
  FileText
} from 'lucide-react';

interface ContractImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (data: any[]) => void;
}

export const ContractImportModal: React.FC<ContractImportModalProps> = ({
  isOpen,
  onClose,
  onImport
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const requiredFields = [
    'contractNumber*',
    'clientId*',
    'startDate*',
    'endDate*',
    'value*',
    'status*',
    'renewalStatus*',
    'clientName',
    'services',
    'description',
    'paymentTerms',
    'deliveryAddress',
    'responsibleManager'
  ];

  const statusOptions = ['Ativo', 'Encerrado', 'Suspenso', 'Cancelado'];
  const renewalStatusOptions = ['Renovado', 'Pendente', 'Em Negociação', 'Rejeitado'];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const downloadTemplate = () => {
    const csvContent = requiredFields.join(',') + '\n' +
      'CT-2024-001,client-123,2024-01-15,2024-12-15,120000,Ativo,Pendente,TechCorp LTDA,"Premium;Support",Contrato anual premium,30 dias,Rua das Flores 123,João Silva\n' +
      'CT-2024-002,client-456,2024-03-01,2025-02-28,60000,Ativo,Renovado,StartupX,"Basic;Analytics",Contrato básico com analytics,15 dias,Av. Paulista 456,Maria Santos\n' +
      'CT-2024-003,client-789,2024-02-10,2024-08-10,200000,Encerrado,Em Negociação,BigCorp S.A.,"Enterprise;Premium Support;Custom",Contrato enterprise customizado,60 dias,Centro Empresarial 789,Carlos Lima';
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "template_contratos.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImport = async () => {
    if (!file) return;
    
    setImporting(true);
    
    // Simular processamento do arquivo
    setTimeout(() => {
      const mockData = [
        {
          contractNumber: 'CT-2024-004',
          clientId: 'client-001',
          startDate: '2024-06-01',
          endDate: '2025-05-31',
          value: 150000,
          status: 'Ativo',
          renewalStatus: 'Pendente'
        }
      ];
      
      onImport(mockData);
      setImporting(false);
      setFile(null);
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-white dark:bg-gray-900 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <FileText className="w-6 h-6" />
            Importar Contratos
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Instruções */}
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-300">
                <Info className="w-5 h-5" />
                Instruções de Importação - Contratos
              </CardTitle>
            </CardHeader>
            <CardContent className="text-blue-700 dark:text-blue-300">
              <ol className="list-decimal list-inside space-y-2">
                <li>Baixe o modelo de planilha clicando no botão abaixo</li>
                <li>Preencha os dados dos contratos seguindo o formato do exemplo</li>
                <li>Campos marcados com * são obrigatórios</li>
                <li>Use datas no formato AAAA-MM-DD (ex: 2024-12-25)</li>
                <li>Para serviços múltiplos, separe com ponto e vírgula (ex: "Premium;Support")</li>
                <li>Valores devem ser números sem pontos ou vírgulas (ex: 120000 para R$ 120.000)</li>
                <li>Salve o arquivo em formato CSV ou Excel</li>
                <li>Faça o upload do arquivo preenchido</li>
              </ol>
            </CardContent>
          </Card>

          {/* Download Template */}
          <div className="text-center">
            <Button 
              onClick={downloadTemplate}
              variant="outline"
              className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <Download className="w-4 h-4 mr-2" />
              Baixar Modelo de Planilha - Contratos
            </Button>
          </div>

          {/* Campos e Validações */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Required Fields */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Campos Obrigatórios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {requiredFields.filter(field => field.includes('*')).map((field, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <AlertTriangle className="w-3 h-3 text-red-500" />
                      <span className="text-red-600 dark:text-red-400 font-medium">
                        {field.replace('*', '')}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Optional Fields */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Campos Opcionais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {requiredFields.filter(field => !field.includes('*')).map((field, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {field}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Valores Válidos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
              <CardHeader>
                <CardTitle className="text-yellow-800 dark:text-yellow-300">Status Válidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {statusOptions.map((status, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                      <span className="text-yellow-700 dark:text-yellow-300">{status}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="text-green-800 dark:text-green-300">Status de Renovação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {renewalStatusOptions.map((status, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-green-700 dark:text-green-300">{status}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Exemplos de Formatação */}
          <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
            <CardHeader>
              <CardTitle className="text-purple-800 dark:text-purple-300">Exemplos de Formatação</CardTitle>
            </CardHeader>
            <CardContent className="text-purple-700 dark:text-purple-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium mb-2">Datas:</p>
                  <p>✅ 2024-12-25</p>
                  <p>❌ 25/12/2024</p>
                </div>
                <div>
                  <p className="font-medium mb-2">Valores:</p>
                  <p>✅ 120000</p>
                  <p>❌ R$ 120.000,00</p>
                </div>
                <div>
                  <p className="font-medium mb-2">Serviços múltiplos:</p>
                  <p>✅ "Premium;Support;Analytics"</p>
                  <p>❌ Premium, Support, Analytics</p>
                </div>
                <div>
                  <p className="font-medium mb-2">IDs de Cliente:</p>
                  <p>✅ client-123 ou UUID válido</p>
                  <p>❌ Cliente 123</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
            />
            
            {file ? (
              <div className="space-y-4">
                <FileSpreadsheet className="w-12 h-12 mx-auto text-green-600" />
                <div>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">{file.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <Button
                  onClick={() => setFile(null)}
                  variant="outline"
                  size="sm"
                  className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
                >
                  Remover Arquivo
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-12 h-12 mx-auto text-gray-400" />
                <div>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    Arraste e solte seu arquivo aqui
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    ou clique para selecionar
                  </p>
                </div>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  Selecionar Arquivo
                </Button>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4 justify-end">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleImport}
              disabled={!file || importing}
              className="bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700 disabled:opacity-50"
            >
              {importing ? 'Importando...' : 'Importar Contratos'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
