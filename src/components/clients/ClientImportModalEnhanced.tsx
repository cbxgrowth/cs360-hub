
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
  Users
} from 'lucide-react';

interface ClientImportModalEnhancedProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (data: any[]) => void;
}

export const ClientImportModalEnhanced: React.FC<ClientImportModalEnhancedProps> = ({
  isOpen,
  onClose,
  onImport
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const requiredFields = [
    'name*',
    'email*',
    'tier*',
    'status*',
    'mrr*',
    'ltv*',
    'cac*',
    'riskScore*',
    'company',
    'phone',
    'npsScore',
    'npsCategory',
    'lastInteraction',
    'acquisitionChannel',
    'acquisitionDate',
    'responsibleCS',
    'industry',
    'companySize',
    'notes'
  ];

  const tierOptions = ['A', 'B', 'C'];
  const statusOptions = ['Ativo', 'Risco', 'Inativo'];
  const npsCategories = ['Promotor', 'Passivo', 'Detrator'];

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
      'Maria Silva,maria@techcorp.com,A,Ativo,15000,180000,5000,15,TechCorp LTDA,(11) 99999-9999,9,Promotor,2024-06-01,website,2024-01-15,João Silva,tecnologia,50-100,Cliente muito engajado\n' +
      'João Santos,joao@startupx.com,B,Ativo,8000,96000,3000,25,StartupX,(21) 88888-8888,7,Passivo,2024-05-28,indicacao,2024-02-10,Maria Santos,financeiro,10-50,Potencial para upgrade\n' +
      'Ana Costa,ana@bigcorp.com,A,Risco,25000,300000,8000,45,BigCorp S.A.,(11) 77777-7777,4,Detrator,2024-05-15,evento,2023-12-05,Carlos Lima,manufatura,200+,Necessita atenção urgente';
    
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
          name: 'Cliente Importado 1',
          email: 'cliente1@empresa.com',
          tier: 'A',
          status: 'Ativo',
          mrr: 12000,
          ltv: 144000,
          cac: 4000,
          riskScore: 20
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
            <Users className="w-6 h-6" />
            Importar Clientes
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Instruções */}
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-300">
                <Info className="w-5 h-5" />
                Instruções de Importação - Clientes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-blue-700 dark:text-blue-300">
              <ol className="list-decimal list-inside space-y-2">
                <li>Baixe o modelo de planilha clicando no botão abaixo</li>
                <li>Preencha os dados dos clientes seguindo o formato do exemplo</li>
                <li>Campos marcados com * são obrigatórios</li>
                <li>Use datas no formato AAAA-MM-DD (ex: 2024-12-25)</li>
                <li>Valores numéricos devem ser números inteiros (ex: 15000 para R$ 15.000)</li>
                <li>Scores devem ser números de 0 a 100</li>
                <li>NPS deve ser de 0 a 10</li>
                <li>Telefones no formato (XX) XXXXX-XXXX</li>
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
              Baixar Modelo de Planilha - Clientes
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
              <CardHeader>
                <CardTitle className="text-yellow-800 dark:text-yellow-300">Níveis (Tier)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {tierOptions.map((tier, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                      <span className="text-yellow-700 dark:text-yellow-300">{tier}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="text-green-800 dark:text-green-300">Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {statusOptions.map((status, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-green-700 dark:text-green-300">{status}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
              <CardHeader>
                <CardTitle className="text-purple-800 dark:text-purple-300">NPS Categoria</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {npsCategories.map((category, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-purple-700 dark:text-purple-300">{category}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Regras de Validação */}
          <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
            <CardHeader>
              <CardTitle className="text-orange-800 dark:text-orange-300">Regras de Validação</CardTitle>
            </CardHeader>
            <CardContent className="text-orange-700 dark:text-orange-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium mb-2">MRR (Receita Mensal):</p>
                  <p>• Mínimo: 0</p>
                  <p>• Máximo: 999999</p>
                  <p>• Formato: número inteiro</p>
                </div>
                <div>
                  <p className="font-medium mb-2">LTV (Lifetime Value):</p>
                  <p>• Mínimo: 0</p>
                  <p>• Deve ser maior que MRR</p>
                  <p>• Formato: número inteiro</p>
                </div>
                <div>
                  <p className="font-medium mb-2">CAC (Custo Aquisição):</p>
                  <p>• Mínimo: 0</p>
                  <p>• Máximo: 999999</p>
                  <p>• Formato: número inteiro</p>
                </div>
                <div>
                  <p className="font-medium mb-2">Risk Score:</p>
                  <p>• Mínimo: 0</p>
                  <p>• Máximo: 100</p>
                  <p>• Formato: número inteiro</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exemplos de Formatação */}
          <Card className="bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800">
            <CardHeader>
              <CardTitle className="text-indigo-800 dark:text-indigo-300">Exemplos de Formatação</CardTitle>
            </CardHeader>
            <CardContent className="text-indigo-700 dark:text-indigo-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium mb-2">Email:</p>
                  <p>✅ usuario@empresa.com</p>
                  <p>❌ usuario@empresa</p>
                </div>
                <div>
                  <p className="font-medium mb-2">Telefone:</p>
                  <p>✅ (11) 99999-9999</p>
                  <p>❌ 11999999999</p>
                </div>
                <div>
                  <p className="font-medium mb-2">Datas:</p>
                  <p>✅ 2024-12-25</p>
                  <p>❌ 25/12/2024</p>
                </div>
                <div>
                  <p className="font-medium mb-2">Valores monetários:</p>
                  <p>✅ 15000</p>
                  <p>❌ R$ 15.000,00</p>
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
