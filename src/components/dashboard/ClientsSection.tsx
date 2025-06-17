
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ClientsManagement } from '../ClientsManagement';
import { Users, Upload, Download, Eye } from 'lucide-react';

export const ClientsSection = () => {
  const handleNavigateToClients = () => {
    window.location.href = '/clients';
  };

  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Gestão de Clientes</CardTitle>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <Upload className="w-4 h-4 mr-2" />
              Importar
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
              onClick={handleNavigateToClients}
            >
              <Eye className="w-4 h-4 mr-2" />
              Ver Todos
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ClientsManagement />
      </CardContent>
    </Card>
  );
};
