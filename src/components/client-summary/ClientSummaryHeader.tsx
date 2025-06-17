
import React from 'react';
import { X, Users } from 'lucide-react';
import { Button } from '../ui/button';

interface ClientSummaryHeaderProps {
  clientName: string;
  onClose: () => void;
}

export const ClientSummaryHeader = ({ clientName, onClose }: ClientSummaryHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{clientName}</h2>
          <p className="text-blue-100">Resumo Completo do Cliente</p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onClose}
        className="text-white hover:bg-white/20 h-10 w-10 p-0"
      >
        <X className="w-5 h-5" />
      </Button>
    </div>
  );
};
