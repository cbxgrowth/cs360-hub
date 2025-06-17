
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  MessageCircle, 
  X, 
  Headphones,
  Calendar,
  ExternalLink
} from 'lucide-react';

export const SupportWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      icon: MessageCircle,
      title: 'Chat ao Vivo',
      description: 'Fale conosco agora',
      action: () => {
        window.open('https://wa.me/88988432310?text=Olá! Gostaria de saber mais sobre o CS360°', '_blank');
      },
      color: 'from-green-500 to-green-600',
      available: true
    },
    {
      icon: Calendar,
      title: 'Agendar Demo',
      description: 'Demonstração executiva',
      action: () => {
        window.location.href = '/executive-demo';
      },
      color: 'from-orange-500 to-orange-600',
      available: true
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Widget expandido */}
      {isOpen && (
        <Card className="mb-4 w-80 shadow-2xl border-0 animate-in slide-in-from-bottom-2 duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Como podemos ajudar?</CardTitle>
                <p className="text-sm opacity-90">Escolha a melhor forma de contato</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-4 space-y-3">
            {contactOptions.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start h-auto p-4 hover:shadow-md transition-all duration-200"
                onClick={option.action}
              >
                <div className={`w-10 h-10 bg-gradient-to-r ${option.color} rounded-full flex items-center justify-center mr-3 flex-shrink-0`}>
                  <option.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{option.title}</span>
                    {option.available && (
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                        Online
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </Button>
            ))}
            
            <div className="text-center pt-2 border-t">
              <p className="text-xs text-gray-500">
                Horário de atendimento: Segunda a Sexta, 8h às 18h
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Botão flutuante */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 ${
          isOpen ? 'rotate-45' : 'hover:scale-110'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <div className="relative">
            <Headphones className="w-6 h-6 text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        )}
      </Button>
    </div>
  );
};
