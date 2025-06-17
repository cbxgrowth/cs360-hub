
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  Upload, 
  Download, 
  FileSpreadsheet, 
  CheckCircle, 
  AlertTriangle,
  Info
} from 'lucide-react';

interface ClientImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (data: any[]) => void;
}

export const ClientImportModal: React.FC<ClientImportModalProps> = ({
  isOpen,
  onClose,
  onImport
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const requiredFields = [
    'companyName*',
    'contactName*',
    'email*',
    'tier*',
    'profile*',
    'industry*',
    'phone',
    'address',
    'city',
    'state',
    'monthlyRevenue',
    'acquisitionChannel',
    'acquisitionDate',
    'customerSuccess',
    'notes'
  ];

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
      'TechCorp LTDA,Maria Silva,maria@techcorp.com,A,Arrojado,tecnologia,(11) 99999-9999,Rua das Flores 123,São Paulo,SP,15000,website,2024-01-15,João Silva,Cliente muito engajado\n' +
      'StartupX,João Santos,joao@startupx.com,B,Moderado,financeiro,(21) 88888-8888,Av. Paulista 456,Rio de Janeiro,RJ,8000,indicacao,2024-02-10,Maria Santos,Potencial para upgrade';
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "template_clientes.csv");
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
          companyName: 'Empresa Importada 1',
          contactName: 'Contato 1',
          email: 'contato1@empresa1.com',
          tier: 'A',
          profile: 'Arrojado'
        },
        {
          companyName: 'Empresa Importada 2',
          contactName: 'Contato 2', 
          email: 'contato2@empresa2.com',
          tier: 'B',
          profile: 'Moderado'
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
      <DialogContent className="max-w-3xl bg-white dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Upload className="w-6 h-6" />
            Importar Clientes
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Instruções */}
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-300">
                <Info className="w-5 h-5" />
                Instruções de Importação
              </CardTitle>
            </CardHeader>
            <CardContent className="text-blue-700 dark:text-blue-300">
              <ol className="list-decimal list-inside space-y-2">
                <li>Baixe o modelo de planilha clicando no botão abaixo</li>
                <li>Preencha os dados dos clientes seguindo o formato do exemplo</li>
                <li>Campos marcados com * são obrigatórios</li>
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
              Baixar Modelo de Planilha
            </Button>
          </div>

          {/* Required Fields */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Campos Necessários</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                {requiredFields.map((field, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {field.includes('*') ? (
                      <AlertTriangle className="w-3 h-3 text-red-500" />
                    ) : (
                      <CheckCircle className="w-3 h-3 text-green-500" />
                    )}
                    <span className={`${field.includes('*') ? 'text-red-600 dark:text-red-400 font-medium' : 'text-gray-600 dark:text-gray-400'}`}>
                      {field.replace('*', '')}
                    </span>
                  </div>
                ))}
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
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
            >
              {importing ? 'Importando...' : 'Importar Clientes'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
