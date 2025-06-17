
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Upload, 
  FileText, 
  Download, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  FileSpreadsheet,
  FileJson
} from 'lucide-react';

interface ClientImportGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileSelect: (file: File) => void;
}

export const ClientImportGuideModal = ({ isOpen, onClose, onFileSelect }: ClientImportGuideModalProps) => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const requiredFields = [
    { field: 'name', description: 'Nome do cliente (obrigatório)', type: 'Texto' },
    { field: 'email', description: 'Email do cliente (obrigatório)', type: 'Email' },
    { field: 'company', description: 'Nome da empresa', type: 'Texto' },
    { field: 'phone', description: 'Telefone de contato', type: 'Texto' },
    { field: 'tier', description: 'Nível do cliente (A, B, C)', type: 'Texto' },
    { field: 'status', description: 'Status (Ativo, Risco, Inativo)', type: 'Texto' },
    { field: 'mrr', description: 'Receita Recorrente Mensal', type: 'Número' },
    { field: 'ltv', description: 'Lifetime Value', type: 'Número' },
    { field: 'cac', description: 'Custo de Aquisição', type: 'Número' },
    { field: 'acquisition_channel', description: 'Canal de aquisição', type: 'Texto' },
    { field: 'responsible_cs', description: 'CS responsável', type: 'Texto' }
  ];

  const sampleData = {
    json: `[
  {
    "name": "João Silva",
    "email": "joao@empresa.com",
    "company": "Tech Solutions",
    "phone": "(11) 99999-9999",
    "tier": "A",
    "status": "Ativo",
    "mrr": 2500,
    "ltv": 30000,
    "cac": 1200,
    "acquisition_channel": "Indicação",
    "responsible_cs": "Maria Santos"
  }
]`,
    excel: 'name,email,company,phone,tier,status,mrr,ltv,cac,acquisition_channel,responsible_cs\nJoão Silva,joao@empresa.com,Tech Solutions,(11) 99999-9999,A,Ativo,2500,30000,1200,Indicação,Maria Santos'
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = [
        'application/json',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'text/csv'
      ];
      
      if (validTypes.includes(file.type) || file.name.endsWith('.csv')) {
        setSelectedFile(file);
      } else {
        toast({
          title: "Arquivo inválido",
          description: "Por favor, selecione um arquivo JSON, Excel ou CSV",
          variant: "destructive"
        });
      }
    }
  };

  const handleImport = () => {
    if (selectedFile) {
      onFileSelect(selectedFile);
      onClose();
      toast({
        title: "Importação iniciada",
        description: "O arquivo está sendo process  ado..."
      });
    }
  };

  const downloadTemplate = (format: 'json' | 'excel') => {
    const data = format === 'json' ? sampleData.json : sampleData.excel;
    const blob = new Blob([data], { 
      type: format === 'json' ? 'application/json' : 'text/csv' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `template_clientes.${format === 'json' ? 'json' : 'csv'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Template baixado",
      description: `Template ${format.toUpperCase()} baixado com sucesso`
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Upload className="w-6 h-6" />
            <span>Importar Clientes</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="guide" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="guide">Guia de Importação</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="upload">Upload Arquivo</TabsTrigger>
          </TabsList>

          <TabsContent value="guide" className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Para uma importação bem-sucedida, certifique-se de que seus dados seguem a estrutura correta.
                Os campos obrigatórios são: <strong>name</strong> e <strong>email</strong>.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Campos Disponíveis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {requiredFields.map((field, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="flex items-center space-x-2">
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">{field.field}</code>
                        {['name', 'email'].includes(field.field) && (
                          <Badge variant="destructive" className="text-xs">Obrigatório</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{field.description}</p>
                    </div>
                    <Badge variant="outline">{field.type}</Badge>
                  </div>
                ))}
              </div>
            </div>

            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Formatos aceitos:</strong> JSON, Excel (.xlsx, .xls) e CSV
              </AlertDescription>
            </Alert>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Importante:</strong> Certifique-se de que os emails sejam únicos para evitar duplicatas.
                Clientes com emails já existentes serão atualizados.
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <h3 className="text-lg font-semibold">Templates de Exemplo</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <FileJson className="w-5 h-5 text-blue-600" />
                  <h4 className="font-medium">Template JSON</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Formato JSON estruturado para importação de dados de clientes.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => downloadTemplate('json')}
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Baixar Template JSON
                </Button>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <FileSpreadsheet className="w-5 h-5 text-green-600" />
                  <h4 className="font-medium">Template Excel/CSV</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Planilha Excel ou CSV com cabeçalhos para importação de dados.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => downloadTemplate('excel')}
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Baixar Template CSV
                </Button>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Exemplo de dados JSON:</h4>
              <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">
                {sampleData.json}
              </pre>
            </div>
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Selecione o arquivo para importar</h3>
              <p className="text-gray-500 mb-4">
                Formatos aceitos: JSON, Excel (.xlsx, .xls), CSV
              </p>
              
              <input
                type="file"
                accept=".json,.xlsx,.xls,.csv"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
              >
                <Upload className="w-4 h-4 mr-2" />
                Escolher Arquivo
              </label>
              
              {selectedFile && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm">
                    <strong>Arquivo selecionado:</strong> {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    Tamanho: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}
            </div>

            {selectedFile && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Arquivo pronto para importação. Clique em "Importar Clientes" para processar os dados.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          
          {selectedFile && (
            <Button onClick={handleImport}>
              <Upload className="w-4 h-4 mr-2" />
              Importar Clientes
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
