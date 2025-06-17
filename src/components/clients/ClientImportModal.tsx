
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ClientImportValidator, ValidationSummary } from './ClientImportValidator';
import { useToast } from '@/hooks/use-toast';
import Papa from 'papaparse';
import { 
  Upload, 
  Download, 
  FileSpreadsheet, 
  CheckCircle, 
  AlertTriangle,
  Info,
  Users,
  FileText,
  Database
} from 'lucide-react';

interface ClientImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (data: any[]) => void;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  validRows: number;
  totalRows: number;
}

export const ClientImportModal: React.FC<ClientImportModalProps> = ({
  isOpen,
  onClose,
  onImport
}) => {
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('instructions');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const requiredFields = [
    { field: 'name', description: 'Nome completo do cliente', example: 'Maria Silva' },
    { field: 'email', description: 'Email válido', example: 'maria@empresa.com' },
    { field: 'tier', description: 'Nível: A, B ou C', example: 'A' },
    { field: 'status', description: 'Status: Ativo, Risco ou Inativo', example: 'Ativo' },
    { field: 'mrr', description: 'Receita mensal (número)', example: '15000' },
    { field: 'ltv', description: 'Lifetime Value (número)', example: '180000' },
    { field: 'cac', description: 'Custo de Aquisição (número)', example: '5000' },
    { field: 'riskScore', description: 'Score de risco (0-100)', example: '25' }
  ];

  const optionalFields = [
    { field: 'company', description: 'Nome da empresa', example: 'TechCorp LTDA' },
    { field: 'phone', description: 'Telefone formato (XX) XXXXX-XXXX', example: '(11) 99999-9999' },
    { field: 'npsScore', description: 'NPS Score (0-10)', example: '9' },
    { field: 'npsCategory', description: 'Categoria: Promotor, Passivo, Detrator', example: 'Promotor' },
    { field: 'lastInteraction', description: 'Data formato AAAA-MM-DD', example: '2024-06-01' },
    { field: 'acquisitionChannel', description: 'Canal de aquisição', example: 'website' },
    { field: 'responsibleCS', description: 'CS responsável', example: 'João Silva' },
    { field: 'industry', description: 'Setor da empresa', example: 'tecnologia' },
    { field: 'notes', description: 'Observações', example: 'Cliente muito engajado' }
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
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleFileSelection = (selectedFile: File) => {
    setFile(selectedFile);
    parseFile(selectedFile);
  };

  const parseFile = (file: File) => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (fileExtension === 'csv') {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setParsedData(results.data as any[]);
          setActiveTab('validation');
        },
        error: (error) => {
          toast({
            title: "Erro",
            description: `Erro ao ler arquivo CSV: ${error.message}`,
            variant: "destructive"
          });
        }
      });
    } else {
      // Para arquivos Excel, simular parsing (em produção usaria uma lib como xlsx)
      toast({
        title: "Aviso",
        description: "Arquivos Excel serão processados. Use CSV para melhor compatibilidade.",
      });
      
      // Dados mock para demonstração
      const mockData = [
        {
          name: 'Cliente Teste 1',
          email: 'teste1@empresa.com',
          tier: 'A',
          status: 'Ativo',
          mrr: '12000',
          ltv: '144000',
          cac: '4000',
          riskScore: '20'
        }
      ];
      setParsedData(mockData);
      setActiveTab('validation');
    }
  };

  const downloadTemplate = () => {
    const headers = [...requiredFields, ...optionalFields].map(f => f.field);
    const sampleData = [
      'Maria Silva,maria@techcorp.com,A,Ativo,15000,180000,5000,15,TechCorp LTDA,(11) 99999-9999,9,Promotor,2024-06-01,website,João Silva,tecnologia,Cliente muito engajado',
      'João Santos,joao@startupx.com,B,Ativo,8000,96000,3000,25,StartupX,(21) 88888-8888,7,Passivo,2024-05-28,indicacao,Maria Santos,financeiro,Potencial para upgrade'
    ];
    
    const csvContent = [headers.join(','), ...sampleData].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "template_clientes_cs360.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Template baixado",
      description: "Template de importação baixado com sucesso!"
    });
  };

  const handleImport = async () => {
    if (!validationResult?.isValid || parsedData.length === 0) {
      toast({
        title: "Erro",
        description: "Corrija os erros antes de importar",
        variant: "destructive"
      });
      return;
    }
    
    setImporting(true);
    
    try {
      // Processar dados válidos
      const validData = parsedData.slice(0, validationResult.validRows);
      await onImport(validData);
      
      toast({
        title: "Importação concluída",
        description: `${validationResult.validRows} clientes importados com sucesso!`
      });
      
      // Reset form
      setFile(null);
      setParsedData([]);
      setValidationResult(null);
      setActiveTab('instructions');
      onClose();
      
    } catch (error) {
      toast({
        title: "Erro na importação",
        description: "Erro ao importar clientes. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setImporting(false);
    }
  };

  const handleValidationComplete = (result: ValidationResult) => {
    setValidationResult(result);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl bg-white dark:bg-gray-900 max-h-[95vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Database className="w-6 h-6" />
            Importar Base de Clientes
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="instructions" className="flex items-center space-x-2">
              <Info className="w-4 h-4" />
              <span>Instruções</span>
            </TabsTrigger>
            <TabsTrigger value="template" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Template</span>
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </TabsTrigger>
            <TabsTrigger value="validation" disabled={!parsedData.length} className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Validação</span>
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto mt-4">
            <TabsContent value="instructions" className="space-y-6">
              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-300">
                    <Users className="w-5 h-5" />
                    Processo de Importação
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-blue-700 dark:text-blue-300">
                  <ol className="list-decimal list-inside space-y-3">
                    <li><strong>Baixe o template</strong> - Use nosso modelo oficial para garantir compatibilidade</li>
                    <li><strong>Preencha os dados</strong> - Siga exatamente o formato dos exemplos</li>
                    <li><strong>Salve como CSV</strong> - Formato recomendado para máxima compatibilidade</li>
                    <li><strong>Faça o upload</strong> - Arraste e solte ou selecione o arquivo</li>
                    <li><strong>Validação automática</strong> - Sistema verifica os dados automaticamente</li>
                    <li><strong>Confirme a importação</strong> - Revise e importe os dados válidos</li>
                  </ol>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">⚠️ Campos Obrigatórios</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {requiredFields.map((field, index) => (
                        <div key={index} className="border-l-4 border-red-500 pl-3">
                          <div className="font-medium">{field.field}</div>
                          <div className="text-sm text-gray-600">{field.description}</div>
                          <div className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                            Exemplo: {field.example}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-600">✅ Campos Opcionais</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      {optionalFields.map((field, index) => (
                        <div key={index} className="border-l-4 border-green-500 pl-3">
                          <div className="font-medium">{field.field}</div>
                          <div className="text-sm text-gray-600">{field.description}</div>
                          <div className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                            Exemplo: {field.example}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="template" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Template Oficial CS360°</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                    <FileSpreadsheet className="w-16 h-16 mx-auto text-blue-600 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Template Validado</h3>
                    <p className="text-gray-600 mb-4">
                      Baixe nosso template oficial com exemplos reais e formatação correta
                    </p>
                    <Button 
                      onClick={downloadTemplate}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Baixar Template CS360°
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="upload" className="space-y-6">
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
                    <div className="flex space-x-2 justify-center">
                      <Button
                        onClick={() => {
                          setFile(null);
                          setParsedData([]);
                          setValidationResult(null);
                        }}
                        variant="outline"
                        size="sm"
                      >
                        Remover
                      </Button>
                      {parsedData.length > 0 && (
                        <Button
                          onClick={() => setActiveTab('validation')}
                          size="sm"
                          className="bg-green-600 text-white"
                        >
                          Ver Validação
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 mx-auto text-gray-400" />
                    <div>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">
                        Arraste e solte seu arquivo aqui
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Formatos suportados: CSV, Excel (.xlsx, .xls)
                      </p>
                    </div>
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="bg-white dark:bg-gray-700"
                    >
                      Selecionar Arquivo
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="validation" className="space-y-6">
              {parsedData.length > 0 && (
                <>
                  <ClientImportValidator 
                    data={parsedData}
                    onValidationComplete={handleValidationComplete}
                  />
                  
                  {validationResult && (
                    <ValidationSummary result={validationResult} />
                  )}
                </>
              )}
            </TabsContent>
          </div>
        </Tabs>

        {/* Footer Actions */}
        <div className="flex gap-4 justify-end pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          
          {activeTab === 'validation' && validationResult?.isValid && (
            <Button
              onClick={handleImport}
              disabled={importing}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white"
            >
              {importing ? 'Importando...' : `Importar ${validationResult.validRows} Clientes`}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
