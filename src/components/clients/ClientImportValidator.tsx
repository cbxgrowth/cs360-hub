
import React from 'react';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  validRows: number;
  totalRows: number;
}

interface ClientImportValidatorProps {
  data: any[];
  onValidationComplete: (result: ValidationResult) => void;
}

export const ClientImportValidator: React.FC<ClientImportValidatorProps> = ({
  data,
  onValidationComplete
}) => {
  const validateData = React.useCallback(() => {
    const errors: string[] = [];
    const warnings: string[] = [];
    let validRows = 0;

    const requiredFields = ['name', 'email', 'tier', 'status', 'mrr', 'ltv', 'cac', 'riskScore'];
    const validTiers = ['A', 'B', 'C'];
    const validStatuses = ['Ativo', 'Risco', 'Inativo'];
    const validNPSCategories = ['Promotor', 'Passivo', 'Detrator'];

    data.forEach((row, index) => {
      const rowNumber = index + 1;
      let rowValid = true;

      // Verificar campos obrigatórios
      requiredFields.forEach(field => {
        if (!row[field] || row[field] === '') {
          errors.push(`Linha ${rowNumber}: Campo '${field}' é obrigatório`);
          rowValid = false;
        }
      });

      // Validar email
      if (row.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) {
        errors.push(`Linha ${rowNumber}: Email inválido`);
        rowValid = false;
      }

      // Validar tier
      if (row.tier && !validTiers.includes(row.tier)) {
        errors.push(`Linha ${rowNumber}: Tier deve ser A, B ou C`);
        rowValid = false;
      }

      // Validar status
      if (row.status && !validStatuses.includes(row.status)) {
        errors.push(`Linha ${rowNumber}: Status deve ser Ativo, Risco ou Inativo`);
        rowValid = false;
      }

      // Validar valores numéricos
      ['mrr', 'ltv', 'cac', 'riskScore'].forEach(field => {
        if (row[field] && isNaN(Number(row[field]))) {
          errors.push(`Linha ${rowNumber}: ${field} deve ser um número`);
          rowValid = false;
        }
      });

      // Validar NPS score
      if (row.npsScore && (isNaN(Number(row.npsScore)) || Number(row.npsScore) < 0 || Number(row.npsScore) > 10)) {
        errors.push(`Linha ${rowNumber}: NPS Score deve ser entre 0 e 10`);
        rowValid = false;
      }

      // Validar NPS categoria
      if (row.npsCategory && !validNPSCategories.includes(row.npsCategory)) {
        warnings.push(`Linha ${rowNumber}: NPS Categoria inválida, será ignorada`);
      }

      // Validar telefone brasileiro
      if (row.phone && !/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(row.phone)) {
        warnings.push(`Linha ${rowNumber}: Formato de telefone recomendado: (XX) XXXXX-XXXX`);
      }

      // Validar se LTV é maior que MRR
      if (row.ltv && row.mrr && Number(row.ltv) < Number(row.mrr)) {
        warnings.push(`Linha ${rowNumber}: LTV deve ser maior que MRR`);
      }

      if (rowValid) validRows++;
    });

    const result: ValidationResult = {
      isValid: errors.length === 0,
      errors,
      warnings,
      validRows,
      totalRows: data.length
    };

    onValidationComplete(result);
  }, [data, onValidationComplete]);

  React.useEffect(() => {
    validateData();
  }, [validateData]);

  return null;
};

export const ValidationSummary: React.FC<{ result: ValidationResult }> = ({ result }) => {
  if (!result) return null;

  return (
    <div className="space-y-4">
      {/* Status Geral */}
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div className="flex items-center space-x-3">
          {result.isValid ? (
            <CheckCircle className="w-6 h-6 text-green-500" />
          ) : (
            <XCircle className="w-6 h-6 text-red-500" />
          )}
          <div>
            <h3 className="font-semibold">
              {result.isValid ? 'Dados válidos para importação' : 'Erros encontrados'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {result.validRows} de {result.totalRows} registros válidos
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Badge variant={result.isValid ? "default" : "destructive"}>
            {result.validRows}/{result.totalRows}
          </Badge>
        </div>
      </div>

      {/* Erros */}
      {result.errors.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-1">
              <strong>Erros que impedem a importação:</strong>
              <ul className="list-disc list-inside text-sm space-y-1">
                {result.errors.slice(0, 5).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
                {result.errors.length > 5 && (
                  <li className="text-muted-foreground">
                    ... e mais {result.errors.length - 5} erros
                  </li>
                )}
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Avisos */}
      {result.warnings.length > 0 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-1">
              <strong>Avisos (não impedem a importação):</strong>
              <ul className="list-disc list-inside text-sm space-y-1">
                {result.warnings.slice(0, 3).map((warning, index) => (
                  <li key={index}>{warning}</li>
                ))}
                {result.warnings.length > 3 && (
                  <li className="text-muted-foreground">
                    ... e mais {result.warnings.length - 3} avisos
                  </li>
                )}
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
