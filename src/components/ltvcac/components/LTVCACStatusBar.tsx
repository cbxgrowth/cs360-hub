
import React from 'react';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import type { LTVCACFilters } from '@/hooks/useLTVCAC';

interface LTVCACStatusBarProps {
  filters: LTVCACFilters;
}

export const LTVCACStatusBar: React.FC<LTVCACStatusBarProps> = ({ filters }) => {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Dados em tempo real</span>
            </div>
            <Badge variant="outline">
              Última atualização: agora
            </Badge>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <span>Período: {filters.timeRange}</span>
            <span>Segmento: {filters.segment}</span>
            <span>Modelo: {filters.model === 1 ? 'Tradicional' : filters.model === 2 ? 'IA Preditivo' : 'Cohort'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
