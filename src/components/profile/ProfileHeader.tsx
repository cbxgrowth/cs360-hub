
import React from 'react';
import { Camera, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const ProfileHeader = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Banner */}
      <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative">
        <Button 
          variant="ghost" 
          size="sm"
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
        >
          <Edit className="w-4 h-4 mr-2" />
          Editar banner
        </Button>
      </div>
      
      {/* Profile Info */}
      <div className="px-6 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6 -mt-16">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-4xl font-bold text-white shadow-lg ring-4 ring-white dark:ring-gray-800">
              JS
            </div>
            <Button 
              size="sm" 
              className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 p-0 bg-blue-600 hover:bg-blue-700"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>
          
          {/* User Info */}
          <div className="mt-4 sm:mt-0 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  João Silva
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  joao.silva@empresa.com
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="outline" className="text-blue-600 border-blue-200">
                    Gestor CS
                  </Badge>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    Ativo
                  </Badge>
                </div>
              </div>
              
              <div className="mt-4 sm:mt-0 flex space-x-3">
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Editar perfil
                </Button>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">127</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Clientes ativos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">95%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Taxa de sucesso</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">2.5 anos</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Na empresa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
