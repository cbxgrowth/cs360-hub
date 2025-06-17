
import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';
import { Play, CheckCircle, Rocket, Users, BarChart3, Target } from 'lucide-react';

interface WelcomeStepProps {
  onComplete: () => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onComplete }) => {
  const [videoWatched, setVideoWatched] = useState(false);

  const features = [
    { icon: BarChart3, title: 'Dashboard 360°', description: 'Visão completa dos seus clientes' },
    { icon: Users, title: 'Gestão de Equipe', description: 'Organize usuários e permissões' },
    { icon: Target, title: 'IA Preditiva', description: 'Previna churn com precisão' },
    { icon: Rocket, title: 'Automação', description: 'Workflows inteligentes' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🎉 Bem-vindo ao CS360°!
        </h2>
        <p className="text-gray-600 mb-6">
          Você está prestes a revolucionar seu Customer Success. Vamos começar com uma visão geral rápida.
        </p>
      </div>

      {/* Video Section */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Vídeo de Introdução (1 min)</h3>
            {videoWatched && (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
          </div>
          
          <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center mb-4">
            <Button 
              onClick={() => setVideoWatched(true)}
              className="bg-blue-600 hover:bg-blue-700 rounded-full p-4"
            >
              <Play className="w-8 h-8 text-white" />
            </Button>
          </div>
          
          <p className="text-sm text-gray-600 text-center">
            Descubra como o CS360° vai transformar seus resultados em apenas 1 minuto
          </p>
        </CardContent>
      </Card>

      {/* Features Overview */}
      <div className="grid grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ready to Start */}
      <div className="text-center">
        <p className="text-gray-600 mb-4">
          {videoWatched ? '✅ Perfeito! Agora você está pronto para configurar sua conta.' : '👀 Assista ao vídeo para continuar'}
        </p>
        <Button 
          onClick={onComplete}
          disabled={!videoWatched}
          className="bg-gradient-to-r from-blue-600 to-purple-600"
        >
          Começar Configuração
        </Button>
      </div>
    </div>
  );
};
